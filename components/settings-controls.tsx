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
        <span>ظاهر</span>
        <select value={settings.theme} onChange={(event) => setSettings((value) => ({ ...value, theme: event.target.value }))}>
          <option value="System">مطابق سیستم</option>
          <option value="Light">روشن</option>
          <option value="Dark">تاریک</option>
        </select>
      </label>
      <label>
        <span>زبان</span>
        <select value={settings.language} onChange={(event) => setSettings((value) => ({ ...value, language: event.target.value }))}>
          <option value="Persian / RTL">فارسی و راست‌به‌چپ</option>
          <option value="English / LTR">انگلیسی و چپ‌به‌راست</option>
        </select>
      </label>
      <label>
        <span>کانال اعلان</span>
        <select value={settings.notification} onChange={(event) => setSettings((value) => ({ ...value, notification: event.target.value }))}>
          <option value="Telegram + PWA">تلگرام و PWA</option>
          <option value="PWA only">فقط PWA</option>
          <option value="Telegram only">فقط تلگرام</option>
        </select>
      </label>
      <div className="settings-footer">
        <Button variant="primary" disabled={status === "saving"} onClick={saveSettings}>
          {status === "saving" ? "در حال ذخیره" : "ذخیره در AI Brain"}
        </Button>
        <Badge tone={status === "saved" ? "success" : status === "error" ? "danger" : "warning"}>
          {status === "saved" ? "ذخیره شد" : status === "error" ? "خطای اتصال" : "ذخیره نشده"}
        </Badge>
      </div>
    </div>
  );
}
