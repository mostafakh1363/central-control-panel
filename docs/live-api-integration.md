# Live API Integration

## Overview

The Central Control Panel now reads operational data from the live AI Brain backend through a server-side adapter and a protected Next.js API proxy.

The browser never receives the AI Brain API key. Client components call `/api/panel/...`, and the Next.js route handler forwards the request to the configured backend with the `X-API-Key` header.

## Required environment variables

Set one of these API key variables on the deployment server:

```txt
AI_BRAIN_PANEL_API_KEY=...
```

Fallback variable names are also supported:

```txt
AI_BRAIN_API_KEY=...
COMMAND_CENTER_API_KEY=...
```

The backend URL defaults to:

```txt
https://ai-brain-api.moe-central.xyz
```

Override it only when needed:

```txt
AI_BRAIN_API_BASE_URL=https://ai-brain-api.moe-central.xyz
```

Fallback variable name:

```txt
AI_BRAIN_BACKEND_URL=https://ai-brain-api.moe-central.xyz
```

## Server-side data adapter

The main server-side adapter is:

```txt
lib/ai-brain.ts
```

It exposes typed data loaders for:

- dashboard overview
- projects
- servers
- user-facing tasks
- reminders
- logs
- n8n workflows
- conversations
- actions
- settings and connection health

If the API key is missing or the backend request fails, the adapter returns the existing fallback data and exposes the error to the page.

## Proxy endpoints

The protected proxy route is:

```txt
app/api/panel/[...path]/route.ts
```

Allowed frontend routes include:

- `GET /api/panel/overview`
- `GET /api/panel/projects`
- `GET /api/panel/servers`
- `GET /api/panel/tasks`
- `GET /api/panel/reminders`
- `GET /api/panel/logs`
- `GET /api/panel/workflows`
- `GET /api/panel/conversations`
- `GET /api/panel/actions`
- `GET /api/panel/settings`
- `GET /api/panel/connections`
- `POST /api/panel/tasks/{id}/done`
- `POST /api/panel/reminders/{id}/done`
- `POST /api/panel/servers/{id}/health-check`
- `POST /api/panel/servers/{id}/restart-request`
- `POST /api/panel/workflows/{id}/execute-request`
- `POST /api/panel/actions/{id}/request-approval`
- `POST /api/panel/ai/chat`
- `PATCH /api/panel/settings`

## Security notes

- Do not expose AI Brain API keys to client-side code.
- Do not store production API keys in the repository.
- Keep API keys in deployment environment variables.
- Sensitive actions must remain approval requests unless the backend explicitly authorizes execution.
- The proxy intentionally allowlists endpoints instead of forwarding arbitrary paths.

## Validation status

Current local checks:

- `npm.cmd run typecheck`
- `npm.cmd run build`

The panel can build without the API key because fallback data remains available. Live data requires the API key on the deployment server.
