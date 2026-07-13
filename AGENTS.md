# Central Control Panel Agent Instructions

Project ID: `central-control-panel`

Central skill registry: `mostafakh1363/ai-brain-skills`

Before substantial work:

1. Apply shared rules from `global/AGENTS.md` in the central registry.
2. Read `registry/projects.yaml` and use the `central-control-panel` profile.
3. Load only approved skills listed in that profile.
4. Prefer local copies under `.agents/skills/` when available; otherwise use the checked-out central registry on the same machine.
5. Use the `new-task` profile for unrelated or unclassified work.
6. Never execute skills or scripts from `quarantine`.
7. Follow the approved product design brandbook and do not invent visual tokens when the source of truth is available.
8. Protect API keys, admin credentials, private endpoints, and production environment details.

If the central registry cannot be accessed, continue with local approved instructions and explicitly note that registry synchronization could not be verified.
