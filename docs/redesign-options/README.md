# Central Control Panel Redesign Options

This folder contains selectable redesign directions for the Central Control Panel.

## Shared Rules

- Use the Unified Product Design OS token model as the source of truth.
- Keep the interface mobile-first.
- Keep primary mobile navigation to five bottom destinations or fewer.
- Keep all touch targets at least 44px high.
- Avoid decorative clutter, nested cards, gradients, and marketing-style layout.
- Preserve light and dark theme support through semantic tokens.
- Prioritize status, tasks, logs, safe actions, and AI assistance.

## Option A: Command Home

Best when Mostafa uses the panel mostly from mobile during daily work.

Focus:

- Today overview
- Quick actions
- Tasks and reminders
- Project cards
- Bottom navigation

Tradeoff:

- Less dense monitoring on the first screen.

## Option B: Ops Board

Best when server and workflow monitoring is the primary use.

Focus:

- VPS health
- Service status
- Logs and incidents
- Action approvals
- Compact status-first layout

Tradeoff:

- Less personal-task focused.

## Option C: AI Copilot

Best when the panel should feel like an AI command app first.

Focus:

- AI assistant
- Context-aware prompts
- Activity timeline
- Project summaries
- One-tap commands

Tradeoff:

- Monitoring becomes secondary unless pinned in the top strip.

## Recommendation

Use Option A as the base for mobile usability, then borrow the server health strip from Option B and the bottom AI composer from Option C.
