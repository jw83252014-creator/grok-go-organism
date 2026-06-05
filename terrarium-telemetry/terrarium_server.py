import asyncio
import json
import os
import re
import time
from pathlib import Path
from typing import Any, AsyncIterator, Dict, List
from uuid import uuid4

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware


LOG_PATH = Path(os.environ.get("GROK_UNIFIED_LOG", "~/.grok/logs/unified.jsonl")).expanduser()
REPO_PATH = Path(os.environ.get("GROK_GO_REPO", "~/mining-engine")).expanduser()
GIT_LOG_PATH = Path(os.environ.get("GROK_GO_GIT_LOG", str(REPO_PATH / ".git/logs/HEAD"))).expanduser()
REPLAY_PATH = Path(
    os.environ.get("TERRARIUM_REPLAY_PATH", str(Path(__file__).with_name("study_replay_events.json")))
).expanduser()
RECEIPT_DIR = Path(
    os.environ.get("GROK_GO_RECEIPT_DIR", "/Users/rentamac/agent-comms/research/grok-go")
).expanduser()
REPLAY_ON_CONNECT = os.environ.get("TERRARIUM_REPLAY_ON_CONNECT", "true").lower() not in {
    "0",
    "false",
    "no",
}
REPLAY_LIMIT = int(os.environ.get("TERRARIUM_REPLAY_LIMIT", "70"))

app = FastAPI(title="Grok Go Terrarium Telemetry")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("TERRARIUM_ALLOW_ORIGINS", "*").split(","),
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


def stamp() -> str:
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())


def event(
    event_type: str,
    data: str,
    source: str = "system",
    phase: str = "live",
    timestamp: str | None = None,
) -> Dict[str, Any]:
    return {
        "id": f"{int(time.time() * 1000)}-{uuid4().hex[:8]}",
        "type": event_type,
        "data": data,
        "timestamp": timestamp or stamp(),
        "source": source,
        "phase": phase,
    }


def classify_log_line(line: str) -> str:
    lower = line.lower()
    if any(token in lower for token in ["qwen", "local model", "127.0.0.1:8000", "localhost:8000", "mlx"]):
        return "local_model"
    if "spawn" in lower or "new agent" in lower or "proposed cell" in lower:
        return "cell_spawn"
    if "budget" in lower or "credit" in lower or "watcher" in lower:
        return "immune_signal"
    if "paper" in lower or "research" in lower:
        return "research_output"
    if "commit" in lower or "git" in lower:
        return "epigenetic_memory"
    return "metabolic_pulse"


def clamp(value: int, minimum: int = 0, maximum: int = 5) -> int:
    return max(minimum, min(maximum, value))


def extract_heading(text: str, fallback: str) -> str:
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return fallback


def extract_field(text: str, name: str) -> str:
    pattern = re.compile(rf"^{re.escape(name)}:\s*(.*)$", re.IGNORECASE | re.MULTILINE)
    match = pattern.search(text)
    if not match:
        return ""
    return match.group(1).strip()


def score_receipt(text: str) -> Dict[str, Any]:
    lower = text.lower()
    goal_progress = 2
    if extract_field(text, "Goal advanced"):
        goal_progress = 4
    if any(token in lower for token in ["highest-leverage", "#1 ranked", "primary mission", "ranked goals"]):
        goal_progress = min(5, goal_progress + 1)

    token_efficiency = 1
    if any(token in lower for token in ["token reduction", "context compression", "prefilter", "dedup"]):
        token_efficiency = 4
    if any(token in lower for token in ["5-10x", "100k", "low thousands", "local/offline"]):
        token_efficiency = 5

    local_offload = 0
    if any(token in lower for token in ["local qwen", "qwen", "127.0.0.1:8000", "local model", "local llm"]):
        local_offload = 5
    elif any(token in lower for token in ["local script", "python", "prefilter"]):
        local_offload = 4

    memory_reuse = 1
    if extract_field(text, "Memory used"):
        memory_reuse = 4
    if any(token in lower for token in ["directive", "emergence-marker-primer", "receipt", "goals"]):
        memory_reuse = min(5, memory_reuse + 1)

    tax = 3
    tax_field = extract_field(text, "Infrastructure tax paid").lower()
    if any(token in tax_field for token in ["minimal", "low", "none"]):
        tax = 1
    elif any(token in tax_field for token in ["moderate", "some"]):
        tax = 2
    if any(token in lower for token in ["watcher polish", "continuation polish", "self-polish"]):
        tax = min(5, tax + 1)

    safety = 3
    safety_field = extract_field(text, "Safety gates touched").lower()
    if any(token in safety_field for token in ["none", "pure local", "no money"]):
        safety = 5
    elif any(token in safety_field for token in ["money", "account", "credential", "posting", "trading"]):
        safety = 2

    queue = "warn" if any(token in lower for token in ["queue", "blocked", "stack"]) else "clean"
    vitality = clamp(goal_progress + token_efficiency + local_offload + memory_reuse + safety - tax, 0, 25)

    return {
        "vitality": round((vitality / 25) * 100),
        "goal_progress": goal_progress,
        "token_efficiency": token_efficiency,
        "local_offload": local_offload,
        "memory_reuse": memory_reuse,
        "infrastructure_tax": tax,
        "safety": safety,
        "queue_health": queue,
    }


def receipt_events(path: Path) -> List[Dict[str, Any]]:
    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return []
    if not text.strip():
        return []

    title = extract_heading(text, path.name)
    primary = extract_field(text, "Primary action")
    next_move = extract_field(text, "Next highest-leverage move")
    summary = primary or next_move or "research receipt updated"
    short = re.sub(r"\s+", " ", summary).strip()[:260]
    score = score_receipt(text)

    pulse = event(
        "research_pulse",
        f"{title}: {short}",
        source="live_receipt",
        phase="live",
    )
    assay = event(
        "assay_score",
        (
            f"vitality {score['vitality']} | goal {score['goal_progress']}/5 | "
            f"token {score['token_efficiency']}/5 | local {score['local_offload']}/5 | "
            f"tax {score['infrastructure_tax']}/5 | queue {score['queue_health']}"
        ),
        source="live_receipt",
        phase="live",
    )
    assay["score"] = score
    return [pulse, assay]


def classify_commit_message(message: str) -> str:
    lower = message.lower()
    if any(
        token in lower
        for token in [
            "watcher",
            "continuation",
            "fallback",
            "banner",
            "clipboard",
            "session-guide",
            "~/.grok/go",
            "stop instruction",
            "alias",
        ]
    ):
        return "immune_signal"
    if "research" in lower or "paper" in lower or "source" in lower:
        return "research_output"
    return "epigenetic_memory"


def read_curated_replay() -> List[Dict[str, Any]]:
    if not REPLAY_PATH.exists():
        return []
    try:
        payload = json.loads(REPLAY_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return [
            event(
                "immune_signal",
                f"study replay file could not be read: {REPLAY_PATH}",
                source="study_replay",
                phase="historical_replay",
            )
        ]
    if not isinstance(payload, list):
        return []

    events: List[Dict[str, Any]] = []
    for item in payload:
        if not isinstance(item, dict):
            continue
        events.append(
            event(
                str(item.get("type") or "metabolic_pulse"),
                str(item.get("data") or "historical replay pulse"),
                source=str(item.get("source") or "study_replay"),
                phase="historical_replay",
                timestamp=str(item.get("timestamp") or stamp()),
            )
        )
    return events


def read_git_replay(limit: int) -> List[Dict[str, Any]]:
    if limit <= 0:
        return []
    if not GIT_LOG_PATH.exists():
        return []

    try:
        lines = GIT_LOG_PATH.read_text(encoding="utf-8", errors="ignore").splitlines()
    except OSError:
        return []

    replay: List[Dict[str, Any]] = []
    for line in lines[-limit:]:
        if "\tcommit: " not in line:
            continue
        message = line.split("\tcommit: ", 1)[1].strip()
        if not message:
            continue
        replay.append(
            event(
                classify_commit_message(message),
                f"git memory replay: {message[:220]}",
                source="historical_git",
                phase="historical_replay",
            )
        )
    return replay


def read_receipt_replay(limit: int = 4) -> List[Dict[str, Any]]:
    if limit <= 0 or not RECEIPT_DIR.exists():
        return []

    files = sorted(
        (path for path in RECEIPT_DIR.glob("*.md") if path.is_file() and path.name != "README.md"),
        key=lambda item: item.stat().st_mtime,
    )[-limit:]
    replay: List[Dict[str, Any]] = []
    for path in files:
        replay.extend(receipt_events(path))
    return replay


def replay_events() -> List[Dict[str, Any]]:
    curated = read_curated_replay()
    receipts = read_receipt_replay()
    remaining = max(REPLAY_LIMIT - len(curated), 0)
    return curated + read_git_replay(remaining) + receipts


async def tail_file(path: Path, label: str) -> AsyncIterator[Dict[str, Any]]:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.touch(exist_ok=True)

    with path.open("r", encoding="utf-8", errors="ignore") as handle:
        handle.seek(0, os.SEEK_END)
        while True:
            line = handle.readline()
            if not line:
                await asyncio.sleep(0.25)
                continue
            clean = line.strip()
            if not clean:
                continue
            if label == "git":
                message = clean.split("\tcommit: ", 1)[-1].strip()
                yield event(classify_commit_message(message), f"live git memory: {message[-220:]}", "live_git")
            else:
                lower = clean.lower()
                if any(secretish in lower for secretish in ["key_prefix", "api_key", "authorization", "bearer"]):
                    continue
                yield event(classify_log_line(clean), clean[-320:], "live_grok")


async def watch_receipts(path: Path) -> AsyncIterator[Dict[str, Any]]:
    path.mkdir(parents=True, exist_ok=True)
    seen = {
        item: item.stat().st_mtime
        for item in path.glob("*.md")
        if item.is_file()
    }
    while True:
        for item in sorted(path.glob("*.md")):
            if not item.is_file():
                continue
            try:
                mtime = item.stat().st_mtime
            except OSError:
                continue
            if seen.get(item) == mtime:
                continue
            seen[item] = mtime
            for pulse in receipt_events(item):
                yield pulse
        await asyncio.sleep(1.25)


@app.get("/health")
async def health() -> Dict[str, str]:
    return {
        "ok": "true",
        "log_path": str(LOG_PATH),
        "git_log_path": str(GIT_LOG_PATH),
        "receipt_dir": str(RECEIPT_DIR),
        "replay_path": str(REPLAY_PATH),
        "replay_on_connect": str(REPLAY_ON_CONNECT).lower(),
    }


@app.websocket("/ws/terrarium")
async def websocket_endpoint(websocket: WebSocket) -> None:
    await websocket.accept()
    queue: asyncio.Queue[Dict[str, Any]] = asyncio.Queue(maxsize=100)

    async def pump(source: AsyncIterator[Dict[str, Any]]) -> None:
        async for item in source:
            await queue.put(item)

    tasks = [
        asyncio.create_task(pump(tail_file(LOG_PATH, "grok"))),
        asyncio.create_task(pump(tail_file(GIT_LOG_PATH, "git"))),
        asyncio.create_task(pump(watch_receipts(RECEIPT_DIR))),
    ]

    try:
        await websocket.send_json(event("metabolic_pulse", "terrarium telemetry connected", "system"))
        if REPLAY_ON_CONNECT:
            for item in replay_events():
                await websocket.send_json(item)
                await asyncio.sleep(0.035)
        while True:
            item = await queue.get()
            await websocket.send_json(item)
    except WebSocketDisconnect:
        pass
    finally:
        for task in tasks:
            task.cancel()
