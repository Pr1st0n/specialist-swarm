"""Re-capture per-specialist thread outputs from an existing session (non-billable).

Fixes the events.list() arg order and maps each thread to a specialist by
inspecting its events. Writes readable .md per thread + a mapping summary.
"""
import json
import os
from pathlib import Path

from dotenv import load_dotenv
load_dotenv(".env.local"); load_dotenv(".env")
if os.environ.get("ANTHROPIC_API_KEY_NEW"):
    os.environ["ANTHROPIC_API_KEY"] = os.environ["ANTHROPIC_API_KEY_NEW"]

from anthropic import Anthropic

BETA = "managed-agents-2026-04-01"
OUT = Path("outputs/quacktastic-checkers")
(OUT / "threads-text").mkdir(parents=True, exist_ok=True)


def jsonable(o):
    fn = getattr(o, "model_dump", None)
    if callable(fn):
        try:
            return fn(mode="json")
        except TypeError:
            return fn()
    return o


def main():
    session_id = Path(".last_session_id").read_text().strip()
    client = Anthropic(default_headers={"anthropic-beta": BETA})
    threads = list(client.beta.sessions.threads.list(session_id))
    print(f"session {session_id}: {len(threads)} threads")

    summary = []
    for th in threads:
        tid = th.id
        events = [jsonable(e) for e in client.beta.sessions.threads.events.list(tid, session_id=session_id)]
        (OUT / "threads" / f"{tid}.json").write_text(json.dumps(events, indent=2))
        # collect text blocks + any agent identity hints
        texts, names = [], set()
        for ev in events:
            for f in ("agent_name", "from_agent_name", "to_agent_name"):
                v = ev.get(f) if isinstance(ev, dict) else None
                if v:
                    names.add(v)
            content = ev.get("content") if isinstance(ev, dict) else None
            if isinstance(content, list):
                for b in content:
                    if isinstance(b, dict) and b.get("type") == "text" and b.get("text"):
                        texts.append(b["text"])
        body = "\n\n".join(texts)
        (OUT / "threads-text" / f"{tid}.md").write_text(body)
        # heuristic role from content keywords
        low = body.lower()
        role = "?"
        if "discount" in low or "net 60" in low or "build fee" in low or "$" in body:
            role = "pricing?"
        if "liability" in low or "indemn" in low or "subprocessor" in low:
            role = "legal?" if role == "?" else role + "/legal?"
        if "fit" in low and ("requirement" in low or "architecture" in low):
            role = "technical?" if role == "?" else role
        if "competitor" in low or "waterfowl" in low or "indie" in low:
            role = "competitive?" if role == "?" else role
        summary.append((tid, len(events), len(body), sorted(names), role))

    print("\nthread_id / #events / #chars / names / role-guess")
    for s in summary:
        print(f"  {s[0]}  ev={s[1]:>3} chars={s[2]:>6} names={s[3]} guess={s[4]}")


if __name__ == "__main__":
    main()
