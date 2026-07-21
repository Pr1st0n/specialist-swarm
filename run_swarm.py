"""
Run the Deal Desk swarm against ANY RFP and capture rich, per-specialist output.

Generalises run_deal_desk.py:
- Takes an RFP path + supporting-context files (CLI args), not hardcoded to Acme.
- Frames the engagement for the coordinator (so a browser-game RFP gets an
  interactive-studio proposal, not a data-platform one).
- Streams the event fan-out live (the demo visual) AND dumps every raw event.
- After the swarm goes idle, walks the threads API to capture EACH specialist's
  full reply, so the web prototype can show real per-specialist content — not
  just the coordinator's synthesis.
- Downloads produced files (the branded .docx) into the deal's raw output dir.

Usage:
    ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY_NEW" ./.venv/bin/python run_swarm.py \
        --rfp synthetic-data/rfp-11-quacktastic-checkers.md \
        --slug quacktastic-checkers \
        --title "Quacktastic Checkers Arena" \
        --support synthetic-data/interactive/studio-capabilities.md \
        --support synthetic-data/interactive/interactive-references.json \
        --support synthetic-data/interactive/interactive-rate-card.md
"""

import argparse
import json
import os
from pathlib import Path

from anthropic import Anthropic

try:
    from dotenv import load_dotenv
    load_dotenv(".env.local")
    load_dotenv(".env")
except Exception:
    pass

# The Managed-Agents-enabled workspace key lives under ANTHROPIC_API_KEY_NEW
# (see handover). Prefer it; fall back to ANTHROPIC_API_KEY.
if os.environ.get("ANTHROPIC_API_KEY_NEW"):
    os.environ["ANTHROPIC_API_KEY"] = os.environ["ANTHROPIC_API_KEY_NEW"]

BETA = "managed-agents-2026-04-01"


def to_jsonable(obj):
    """Best-effort convert an SDK object/event to something json.dumps can eat."""
    for attr in ("model_dump",):
        fn = getattr(obj, attr, None)
        if callable(fn):
            try:
                return fn(mode="json")
            except TypeError:
                try:
                    return fn()
                except Exception:
                    pass
    if isinstance(obj, (str, int, float, bool)) or obj is None:
        return obj
    if isinstance(obj, dict):
        return {k: to_jsonable(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [to_jsonable(v) for v in obj]
    try:
        return {k: to_jsonable(v) for k, v in vars(obj).items()}
    except TypeError:
        return str(obj)


def load_context(rfp: Path, support: list[Path]) -> str:
    blocks = []
    for path in [rfp, *support]:
        if not path.exists():
            print(f"  WARNING: {path} missing — skipping")
            continue
        print(f"  including {path.name}")
        blocks.append(f"=====  DOCUMENT: {path.name}  =====\n{path.read_text()}")
    return "\n\n".join(blocks)


def build_user_message(context: str) -> str:
    return (
        "An RFP has just landed. Run the standard Deal Desk process, but note the "
        "engagement framing carefully.\n\n"
        "# Engagement framing (important)\n"
        "This RFP is for an INTERACTIVE WEB APPLICATION / BROWSER GAME — a marketing "
        "campaign asset — NOT an enterprise data platform. For this deal, the "
        "authoritative context is the BTS-Synthetic **Interactive Experiences Studio**:\n"
        "- Technical fit is assessed against `studio-capabilities.md` (the interactive "
        "build capability map). The data-platform `product-overview.md` does NOT apply here.\n"
        "- Pricing uses `interactive-rate-card.md` for the numbers, and the "
        "pricing-playbook skill for DISCIPLINE (discount discipline, MFN posture, payment/"
        "term rules). The data-platform tier list does not apply. Cite "
        "`interactive-references.json` as comparable prior builds.\n"
        "- Legal uses the legal-checklist skill as-is against the RFP's contractual "
        "section (liability, IP, audit, termination, subprocessors, SLA) — it transfers "
        "directly.\n"
        "- Competitive: the named competitors in THIS RFP are Waterfowl Analytics Inc., a "
        "boutique indie game studio, and Databricks (who declined). Reason about THESE "
        "actual competitors — ignore the data-platform battlecards (Snowflake/Fabric/"
        "BigQuery) which are irrelevant to a browser game.\n\n"
        "# Process\n"
        "1. Read the RFP yourself.\n"
        "2. Delegate to all four specialists in parallel, each with the framing above.\n"
        "3. Synthesise their replies.\n"
        "4. Produce the final proposal response as a BRANDED Word document (.docx) using "
        "python-docx and/or pandoc in the sandbox — real branding (cover, palette, styled "
        "tables, running header/footer). Follow the RFP's requested response format: "
        "executive summary, technical proposal INCLUDING the proposed real-time "
        "architecture, a 2-year transparent commercial proposal, an implementation plan "
        "working backward from the livestream date, two interactive/game references, and a "
        "note on the board mockup. Save it under /mnt/session/outputs/.\n\n"
        "Move fast — the RFP deadline is real. All four specialists in parallel.\n\n"
        f"{context}"
    )


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--rfp", required=True, type=Path)
    ap.add_argument("--support", action="append", default=[], type=Path)
    ap.add_argument("--slug", required=True)
    ap.add_argument("--title", required=True)
    args = ap.parse_args()

    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise SystemExit("Set ANTHROPIC_API_KEY before running.")
    if not Path(".coordinator_id").exists() or not Path(".environment_id").exists():
        raise SystemExit("Missing .coordinator_id / .environment_id — run setup scripts first.")

    coordinator_id = Path(".coordinator_id").read_text().strip()
    environment_id = Path(".environment_id").read_text().strip()

    out_dir = Path("outputs") / args.slug
    (out_dir / "specialists").mkdir(parents=True, exist_ok=True)
    (out_dir / "threads").mkdir(parents=True, exist_ok=True)

    client = Anthropic(default_headers={"anthropic-beta": BETA})

    print(f"Loading RFP + context for {args.slug}...")
    context = load_context(args.rfp, args.support)

    print(f"\nStarting session against coordinator {coordinator_id}...")
    session = client.beta.sessions.create(
        agent=coordinator_id,
        environment_id=environment_id,
        title=f"Deal Desk — {args.title}",
    )
    Path(".last_session_id").write_text(session.id)
    print(f"  session: {session.id}")

    user_message = build_user_message(context)

    print("\n=== EVENT STREAM (this is the demo) ===\n")
    coordinator_text: list[str] = []
    raw_events: list[dict] = []

    with client.beta.sessions.events.stream(session.id) as stream:
        client.beta.sessions.events.send(
            session.id,
            events=[{"type": "user.message",
                     "content": [{"type": "text", "text": user_message}]}],
        )
        for event in stream:
            raw_events.append(to_jsonable(event))
            t = event.type
            if t == "session.thread_created":
                print(f"  [thread spawned]   {getattr(event, 'agent_name', '?')}", flush=True)
            elif t == "session.thread_status_running":
                print(f"  [thread running]   {getattr(event, 'agent_name', '?')}", flush=True)
            elif t == "agent.thread_message_sent":
                print(f"  [delegate →]       {getattr(event, 'to_agent_name', '?')}", flush=True)
            elif t == "agent.thread_message_received":
                print(f"  [reply ←]          {getattr(event, 'from_agent_name', '?')}", flush=True)
            elif t == "agent.message":
                for block in event.content:
                    if getattr(block, "type", None) == "text":
                        coordinator_text.append(block.text)
                        print(block.text, end="", flush=True)
            elif t == "agent.tool_use":
                print(f"\n  [tool: {getattr(event, 'name', '?')}]", flush=True)
            elif t == "session.status_idle":
                print("\n\n[swarm finished]")
                break

    (out_dir / "coordinator.md").write_text("".join(coordinator_text))
    (out_dir / "raw-events.json").write_text(json.dumps(raw_events, indent=2))
    print(f"\nCoordinator synthesis -> {out_dir/'coordinator.md'}")
    print(f"Raw event log         -> {out_dir/'raw-events.json'} ({len(raw_events)} events)")

    # ---- Capture each specialist's output via the threads API ----
    print("\nCapturing per-specialist threads...")
    try:
        threads = list(client.beta.sessions.threads.list(session.id))
    except Exception as e:  # be resilient — raw-events.json still has the data
        print(f"  threads.list failed ({e}); relying on raw-events.json")
        threads = []

    for th in threads:
        th_id = getattr(th, "id", None)
        agent_name = getattr(th, "agent_name", None) or getattr(th, "title", None) or th_id
        safe = "".join(c if c.isalnum() else "-" for c in str(agent_name)).strip("-").lower()
        try:
            events = [to_jsonable(e) for e in client.beta.sessions.threads.events.list(session.id, thread_id=th_id)]
        except Exception as e:
            print(f"  events.list failed for {agent_name} ({e})")
            events = []
        (out_dir / "threads" / f"{safe}.json").write_text(
            json.dumps({"thread": to_jsonable(th), "events": events}, indent=2)
        )
        # Extract assistant/agent text blocks into a readable .md
        texts: list[str] = []
        for ev in events:
            content = ev.get("content") if isinstance(ev, dict) else None
            if isinstance(content, list):
                for b in content:
                    if isinstance(b, dict) and b.get("type") == "text" and b.get("text"):
                        texts.append(b["text"])
        if texts:
            (out_dir / "specialists" / f"{safe}.md").write_text("\n\n".join(texts))
        print(f"  {agent_name}: {len(events)} events, {len(texts)} text blocks")

    # ---- Download produced files (the docx) ----
    print("\nDownloading deliverables from the session container...")
    files = client.beta.files.list(scope_id=session.id, betas=[BETA])
    n = 0
    for f in files.data:
        dest = out_dir / f.filename
        print(f"  {f.filename} -> {dest}")
        client.beta.files.download(f.id).write_to_file(str(dest))
        n += 1
    print(f"\nDownloaded {n} file(s) into {out_dir}/")
    print(f"\nSession: https://platform.claude.com/sessions/{session.id}")
    print(f"Raw capture in {out_dir}/ — next: author web/public/data/deals/{args.slug}/bundle.json")


if __name__ == "__main__":
    main()
