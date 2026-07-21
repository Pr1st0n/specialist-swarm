# Hooks — shape

From `inventory-management/.claude/hooks/`. A hook is a script fired on a Claude Code
lifecycle event. It reads a JSON event on stdin; **exit 0 to allow** the action to proceed.

## Example: post-tool-use logger
```bash
#!/bin/bash
# Logs every tool call for debugging/tracking.
LOGS_DIR="${CLAUDE_PROJECT_DIR}/logs"
mkdir -p "$LOGS_DIR"
LOG_FILE="${LOGS_DIR}/tool-usage-$(date +%Y-%m-%d).log"

INPUT=$(cat)                                   # JSON event on stdin
if command -v jq &>/dev/null; then
    TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // "unknown"')
    TOOL_INPUT=$(echo "$INPUT" | jq -c '.tool_input // {}')
    {
      echo "=== $(date '+%F %T') ==="
      echo "Tool: $TOOL_NAME"
      echo "Input: $TOOL_INPUT"
      echo ""
    } >> "$LOG_FILE"
else
    { echo "=== $(date '+%F %T') ==="; echo "$INPUT"; echo ""; } >> "$LOG_FILE"
fi
exit 0                                          # always allow the tool to proceed
```

## Notes
- The event JSON carries fields like `tool_name`, `tool_input`, `tool_response`,
  `session_id`. Parse with `jq` and fall back gracefully if it's missing.
- Use `${CLAUDE_PROJECT_DIR}` for paths so the hook works regardless of cwd.
- Keep hooks **fast and non-blocking** — they run on every matching event.
- Exit non-zero only when you deliberately want to *block* an action (a gate); otherwise
  exit 0.
- Register hooks in settings (which event fires which script). Common events: post-tool-use
  (logging/formatting), pre-tool-use (gating), stop (notifications).
