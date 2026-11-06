# PROJECT_CONTEXT

Short context for humans and coding agents working in this repository.
Secrets stay in local `.env` only — never commit tokens, passwords, or private keys.

## Purpose
Mostafa Command Center A multi-page Next.js PWA starter for a personal AI operations command center. The panel includes a server-side AI Brain API adapter and a protected Next.js proxy for live data. If the API key is not configured, pages fall back to local sample data and show the connection error. Included pages

## Stack
Next.js, React, Docker

## Repository
- Local path: `/Users/mostafa/Documents/Codex/2026-09-06/new-chat/projects/central-control-panel`
- Remote: `https://github.com/mostafakh1363/central-control-panel.git`
- Current branch: `main`

## Structure (top level)
```
.dockerignore
AGENTS.md
app/
components/
Dockerfile
docs/
lib/
next-env.d.ts
next.config.mjs
package-lock.json
package.json
public/
README.md
tsconfig.json
```

## How to run / test / deploy
- `npm.cmd run dev`

## Integrations
- Telegram Bot API
- n8n automation

## Current status
- Git status (summary): `## main...origin/main`
- Recent commits:
- cb57a0d feat: add telegram financial monitor and polish panel copy
- 4ea4ec6 fix: serve panel under ai brain domain path
- 42b3e5c build: add docker deployment config
- 2d86f4a feat: connect panel to live ai brain api
- 3a2bbda Add central skill routing instructions for control panel
- 36671ee feat: add central control panel

## Conventions
From AGENTS.md:
1. Apply shared rules from `global/AGENTS.md` in the central registry.
2. Read `registry/projects.yaml` and use the `central-control-panel` profile.
3. Load only approved skills listed in that profile.

## Open tasks / TODOs
- Review recent git commits and README for remaining work.

## Notes
- Do not commit `.env`, credentials, or signing secrets.
- Prefer small, reviewable changes aligned with AGENTS.md / README.
- Keep this file updated when purpose, stack, or major workflows change.
