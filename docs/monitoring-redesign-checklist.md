# Monitoring Redesign Checklist

## Overview

This update redesigns the Central Control Panel monitoring experience with a mobile-first shell, clearer dashboard sections, live AI Brain API loading, and protected API proxy interactions for the main operational pages.

## Brandbook application

- Uses semantic product tokens from `app/globals.css` for color, spacing, radius, shadow, focus, typography, and motion.
- Keeps the interface calm, operational, and low-clutter.
- Preserves RTL layout behavior and Persian user-facing copy.
- Avoids visible code formatting markers in user-facing text.
- Keeps mobile touch targets at practical app sizes.

## Routes checked

- `/`
- `/projects`
- `/servers`
- `/n8n`
- `/tasks`
- `/reminders`
- `/conversations`
- `/logs`
- `/actions`
- `/ai`
- `/settings`

## Interaction checks

- Task done buttons call `POST /api/panel/tasks/{id}/done`.
- Reminder checkboxes call `POST /api/panel/reminders/{id}/done`.
- Safe action buttons call read-only panel proxy endpoints.
- Sensitive action buttons call `POST /api/panel/actions/{id}/request-approval`.
- Server health check buttons call `POST /api/panel/servers/{id}/health-check`.
- Server restart buttons call `POST /api/panel/servers/{id}/restart-request`.
- n8n workflow run buttons call `POST /api/panel/workflows/{id}/execute-request`.
- AI Assistant quick prompts fill the input, and send calls `POST /api/panel/ai/chat`.
- Settings controls call `PATCH /api/panel/settings`.
- Log filters work on the loaded log payload, and log open buttons show detail state.

## Live API checks

- Dashboard uses `getDashboardData()`.
- Projects uses `getProjectsData()`.
- Servers uses `getServersData()` and `getActionsData()`.
- Tasks uses `getTasksData()` and `getRemindersData()`.
- Reminders uses `getRemindersData()`.
- Conversations uses `getConversationsData()`.
- Logs uses `getLogsData()`.
- n8n uses `getWorkflowsData()`.
- Actions uses `getActionsData()`.
- AI uses live dashboard context and the chat proxy.
- Settings uses `getSettingsData()`.

## Mobile checks

- Sidebar is hidden on mobile.
- Bottom navigation is visible on mobile.
- Topbar uses a stacked mobile layout.
- Search becomes full-width on mobile.
- Main content has safe bottom spacing above the app navigation.
- Checked routes did not produce horizontal overflow at phone viewport size.

## Known limitations

- Live data requires `AI_BRAIN_PANEL_API_KEY` or one of the supported fallback API key variables.
- Pages intentionally fall back to sample data when the API key is missing or the backend returns an error.
- Sensitive operations are approval requests, not direct destructive execution.
- Authentication and project-based user permissions still need backend integration.
