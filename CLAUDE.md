# CLAUDE.md — Mostafa Command Center

Project ID: `central-control-panel`  
Repo: `mostafakh1363/central-control-panel`  
Agent routing / skill registry: see `AGENTS.md`.

## What this is

**Mostafa Command Center** — a multi-page Next.js PWA for a personal AI operations command center (dashboard, projects, servers, n8n, tasks/reminders, conversations, logs, safe actions, AI assistant, Telegram financial monitor, settings).

Stack: Next.js 15, React 19, TypeScript, Docker (`output: "standalone"`). UI uses UPDOS token-based styling; default layout is RTL Persian (`lang="fa"` / `dir="rtl"`) with English-safe support.

## Architecture

1. **Server-side AI Brain adapter** — `lib/ai-brain.ts` loads typed live data from the AI Brain backend. On missing API key or request failure, it returns local sample data from `lib/data.ts` and surfaces the connection error.
2. **Protected panel proxy** — `app/api/panel/[...path]/route.ts` allowlists endpoints and forwards to the backend with `X-API-Key`. The browser never sees the key; clients call `/api/panel/...` (via `lib/panel-client.ts`, which respects `basePath`).
3. **Sample-data fallback** — pages still render without live config; live mode needs env on the deployment host.

Env (server-side only; never commit):

- Key: `AI_BRAIN_PANEL_API_KEY` (fallbacks: `AI_BRAIN_API_KEY`, `COMMAND_CENTER_API_KEY`)
- Base URL: `AI_BRAIN_API_BASE_URL` (fallback: `AI_BRAIN_BACKEND_URL`; default `https://ai-brain-api.moe-central.xyz`)

`next.config.mjs` sets `basePath: "/central-control-panel"` so the panel is served under the AI Brain domain path.

## Key paths

| Path | Role |
| --- | --- |
| `app/` | App Router pages + `app/api/panel/[...path]/` proxy |
| `components/` | Shell, nav, UI primitives, action/console widgets |
| `lib/ai-brain.ts` | Live/fallback data adapter |
| `lib/data.ts` | Types + sample/fallback data |
| `lib/panel-client.ts` | Client paths with `basePath` |
| `lib/telegram-financial.ts` | Telegram financial monitor helpers |
| `public/` | PWA manifest / icons |
| `docs/` | Integration notes, redesign docs |
| `Dockerfile` | Multi-stage production image |
| `AGENTS.md` | Central skill-registry instructions |
| `PROJECT_CONTEXT.md` | Short human/agent context |
| `README.md` | Product overview and local run |

## Run / test / build

```bash
npm run dev        # local Next.js (http://localhost:3000; remember basePath)
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run start      # after build
```

Build works without an API key (fallback data). Live data needs the key on the host.

## Deploy

Docker multi-stage image (`node:22-alpine`, standalone output). Served under the AI Brain domain path (`/central-control-panel`). Runs on Mostafa’s VPS as container `central_control_panel`. Do not document or commit IPs, ports, usernames, key paths, or secrets.

## Current state

Live AI Brain adapter + allowlisted proxy; Docker deploy config; Telegram financial monitor page; panel polished for the AI Brain path. Integrations that still depend on backend permissions: VPS execution, n8n execution, Telegram approvals, AI actions. Prefer small, reviewable changes; keep `PROJECT_CONTEXT.md` accurate when purpose/stack/workflows change.

## Conventions

- Smallest correct change; reuse existing patterns before adding abstractions.
- Design system / product brandbook is authoritative — do not invent visual tokens when the source of truth is available.
- Keep RTL-safe Persian/English layout and copy.
- API keys and credentials stay server-side (env / deployment secrets only).
- Sensitive actions remain approval requests unless the backend explicitly authorizes execution.
- Follow `AGENTS.md`: central registry profile `central-control-panel`, public ai-skills index when applicable.

## Do not touch / never do

- Never commit `.env`, `.env.*`, credentials, API keys, or signing secrets.
- Never execute skills or scripts from `quarantine`.
- Do not expose AI Brain keys to client components or public docs with real values.
- Do not widen the panel proxy into an open forwarder — keep the endpoint allowlist.
- Do not invent production host details (IPs, ports, usernames, key paths).
