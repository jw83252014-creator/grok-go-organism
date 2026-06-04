import asyncio
import json
import os
import time
from pathlib import Path
from typing import AsyncIterator, Dict

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware


LOG_PATH = Path(os.environ.get("GROK_UNIFIED_LOG", "~/.grok/logs/unified.jsonl")).expanduser()
REPO_PATH = Path(os.environ.get("GROK_GO_REPO", "~/mining-engine")).expanduser()
GIT_LOG_PATH = Path(os.environ.get("GROK_GO_GIT_LOG", str(REPO_PATH / ".git/logs/HEAD"))).expanduser()

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


def event(event_type: str, data: str) -> Dict[str, str]:
    return {
        "id": f"{int(time.time() * 1000)}",
        "type": event_type,
        "data": data,
        "timestamp": stamp(),
    }


def classify_log_line(line: str) -> str:
    lower = line.lower()
    if "spawn" in lower or "new agent" in lower or "proposed cell" in lower:
        return "cell_spawn"
    if "commit" in lower or "git" in lower:
        return "epigenetic_memory"
    if "budget" in lower or "credit" in lower or "watcher" in lower:
        return "immune_signal"
    if "paper" in lower or "research" in lower:
        return "research_output"
    return "metabolic_pulse"


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
                yield event("epigenetic_memory", clean[-220:])
            else:
                yield event(classify_log_line(clean), clean[-320:])


@app.get("/health")
async def health() -> Dict[str, str]:
    return {
        "ok": "true",
        "log_path": str(LOG_PATH),
        "git_log_path": str(GIT_LOG_PATH),
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
        await websocket.send_json(event("metabolic_pulse", "terrarium telemetry connected"))
        while True:
            item = await queue.get()
            await websocket.send_json(item)
    except WebSocketDisconnect:
        pass
    finally:
        for task in tasks:
            task.cancel()
