import asyncio
import json
import os
import time
from pathlib import Path
from typing import AsyncIterator, Dict, List
from uuid import uuid4

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware


LOG_PATH = Path(os.environ.get("GROK_UNIFIED_LOG", "~/.grok/logs/unified.jsonl")).expanduser()
REPO_PATH = Path(os.environ.get("GROK_GO_REPO", "~/mining-engine")).expanduser()
GIT_LOG_PATH = Path(os.environ.get("GROK_GO_GIT_LOG", str(REPO_PATH / ".git/logs/HEAD"))).expanduser()
REPLAY_PATH = Path(
    os.environ.get("TERRARIUM_REPLAY_PATH", str(Path(__file__).with_name("study_replay_events.json")))
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
) -> Dict[str, str]:
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
    if "spawn" in lower or "new agent" in lower or "proposed cell" in lower:
        return "cell_spawn"
    if "budget" in lower or "credit" in lower or "watcher" in lower:
        return "immune_signal"
    if "paper" in lower or "research" in lower:
        return "research_output"
    if "commit" in lower or "git" in lower:
        return "epigenetic_memory"
    return "metabolic_pulse"


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


def read_curated_replay() -> List[Dict[str, str]]:
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

    events: List[Dict[str, str]] = []
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


def read_git_replay(limit: int) -> List[Dict[str, str]]:
    if limit <= 0:
        return []
    if not GIT_LOG_PATH.exists():
        return []

    try:
        lines = GIT_LOG_PATH.read_text(encoding="utf-8", errors="ignore").splitlines()
    except OSError:
        return []

    replay: List[Dict[str, str]] = []
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


def replay_events() -> List[Dict[str, str]]:
    curated = read_curated_replay()
    remaining = max(REPLAY_LIMIT - len(curated), 0)
    return curated + read_git_replay(remaining)


async def tail_file(path: Path, label: str) -> AsyncIterator[Dict[str, str]]:
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


@app.get("/health")
async def health() -> Dict[str, str]:
    return {
        "ok": "true",
        "log_path": str(LOG_PATH),
        "git_log_path": str(GIT_LOG_PATH),
        "replay_path": str(REPLAY_PATH),
        "replay_on_connect": str(REPLAY_ON_CONNECT).lower(),
    }


@app.websocket("/ws/terrarium")
async def websocket_endpoint(websocket: WebSocket) -> None:
    await websocket.accept()
    queue: asyncio.Queue[Dict[str, str]] = asyncio.Queue(maxsize=100)

    async def pump(source: AsyncIterator[Dict[str, str]]) -> None:
        async for item in source:
            await queue.put(item)

    tasks = [
        asyncio.create_task(pump(tail_file(LOG_PATH, "grok"))),
        asyncio.create_task(pump(tail_file(GIT_LOG_PATH, "git"))),
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
