"use client";

import { useState } from "react";
import { Badge, Button } from "@/components/ui";
import type { SettingsValues } from "@/lib/ai-brain";
import { panelClientPath } from "@/lib/panel-client";

const defaultSettings: SettingsValues = {
  theme: "System",
  language: "Persian / RTL",
  notification: "Telegram + PWA"
};

export function SettingsControls({ initialSettings = defaultSettings }: { initialSettings?: SettingsValues }) {
  const [settings, setSettings] = useState(initialSettings);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function saveSettings() {
    setStatus("saving");

    try {
      const response = await fetch(panelClientPath("/api/panel/settings"), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });

      setStatus(response.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="settings-list">
      <label>
        <span>Theme</span>
        <select value={settings.theme} onChange={(event) => setSettings((value) => ({ ...value, theme: event.target.value }))}>
          <option>System</option>
          <option>Light</option>
          <option>Dark</option>
        </select>
      </label>
      <label>
        <span>Language</span>
        <select value={settings.language} onChange={(event) => setSettings((value) => ({ ...value, language: event.target.value }))}>
          <option>Persian / RTL</option>
          <option>English / LTR</option>
        </select>
      </label>
      <label>
        <span>Notification channel</span>
        <select value={settings.notification} onChange={(event) => setSettings((value) => ({ ...value, notification: event.target.value }))}>
          <option>Telegram + PWA</option>
          <option>PWA only</option>
          <option>Telegram only</option>
        </select>
      </label>
      <div className="settings-footer">
        <Button variant="primary" disabled={status === "saving"} onClick={saveSettings}>
          {status === "saving" ? "در حال ذخیره" : "ذخیره در `AI Brain`"}
        </Button>
        <Badge tone={status === "saved" ? "success" : status === "error" ? "danger" : "warning"}>
          {status === "saved" ? "ذخیره شد" : status === "error" ? "خطای اتصال" : "ذخیره نشده"}
        </Badge>
      </div>
    </div>
  );
}
