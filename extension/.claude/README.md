# .claude/ — Claude Code project config

This folder configures Claude Code for the German Reading Helper extension.

## Custom slash commands (`.claude/commands/`)
Type these in a Claude Code session (from the `extension/` directory):

| Command | What it does |
|---|---|
| `/add-language <Name>` | Add a new target translation language end-to-end |
| `/new-context-action <Name>` | Add a new right-click action through the full message flow |
| `/wire-proxy [url]` | Migrate from direct OpenAI (user key) to a FastAPI proxy |
| `/build-and-test` | Build + run logic tests + rebuild demo, report status |
| `/capture-screenshots` | Regenerate Web Store screenshots + promo tiles |
| `/release-checklist` | Run the Web Store publish-readiness checklist |

`$ARGUMENTS` in a command is replaced by whatever you type after the command name.

## Recommended startup context
Claude Code auto-loads `CLAUDE.md` (in this `extension/` folder) as project memory.
It contains the architecture, data flow, conventions, and a "where to change X" table.
Read it before making changes.

## Notes
- Keep the conventions in `CLAUDE.md` (shadow-DOM panel, imperative controller,
  storage-only-via-services, data-testids, strict-JSON prompts, no secrets in code).
- A real MV3 extension can't be driven by headless automation; use the demo build
  for UI verification (see `CLAUDE.md` §8).
