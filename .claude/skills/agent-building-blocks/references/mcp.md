# MCP servers — config shape

From `inventory-management/.claude/mcp-config.json`. MCP servers expose external tools to
the agent (browser control, GitHub, a RAG index, etc.).

## Config
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}" }
    }
  }
}
```

## Notes
- Reference secrets via `${ENV_VAR}` — never inline a token.
- Then set usage rules in `CLAUDE.md` so the agent actually prefers the MCP tools, e.g.
  "ALWAYS use `mcp__github__*` for GitHub operations" / "ALWAYS use `mcp__playwright__*` for
  browser testing."
- This environment already provides `context7` (live library docs — see the `anthropic-docs`
  skill) and `playwright`. Only add servers you'll actually use; each one adds tools the
  model must reason over.

## When a RAG server makes sense
If the corpus you need to consult grows beyond what fits in skills/references, an MCP RAG
server (a `search` + `list_sources` tool pair over an indexed store) is the pattern — the
agent queries it on demand. For this hackathon's prep pack it was deliberately *not* built:
the distilled skills cover the material, and a running server is one more thing to babysit.
Revisit only if free-text recall across a large corpus becomes the bottleneck.
