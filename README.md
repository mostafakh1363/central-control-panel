# Mostafa Command Center

A multi-page Next.js PWA starter for a personal AI operations command center.

The panel includes a server-side AI Brain API adapter and a protected Next.js proxy for live data. If the API key is not configured, pages fall back to local sample data and show the connection error.

## Included pages

- `/` Dashboard
- `/projects` Projects
- `/servers` VPS / Servers
- `/n8n` n8n workflows
- `/tasks` Tasks and reminders
- `/reminders` Reminder-focused alias
- `/conversations` Conversation memory
- `/logs` Operational logs
- `/actions` Safe actions
- `/ai` AI Assistant
- `/settings` Settings

## Included UI

- Desktop app shell
- Responsive mobile layout
- Sidebar navigation with active route state
- PWA manifest and app icon
- UPDOS token-based styling
- RTL-safe Persian/English layout
- Product-grade cards, lists, tables, chat, settings, and mobile preview

## Run locally

```bash
npm.cmd run dev
```

Open:

```txt
http://localhost:3000
```

## Notes

Live AI Brain integration is configured through environment variables on the deployment server:

```txt
AI_BRAIN_PANEL_API_KEY=...
AI_BRAIN_API_BASE_URL=https://ai-brain-api.moe-central.xyz
```

The API key must stay server-side. Client components call `/api/panel/...` and the proxy forwards allowed requests to the backend.

Real VPS execution, n8n workflow execution, Telegram approvals, and AI actions depend on the corresponding backend endpoints and permissions.
