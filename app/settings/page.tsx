import { AppShell } from "@/components/app-shell";
import { Badge, Button, PageTitle, Panel } from "@/components/ui";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageTitle
        eyebrow="System Settings"
        title="تنظیمات"
        actions={<Button variant="primary">Save changes</Button>}
      />

      <section className="dashboard-grid">
        <Panel title="تنظیمات اپ" description="ظاهر، نوتیفیکیشن و اتصال‌ها" className="span-6">
          <div className="settings-list">
            <label><span>Theme</span><select><option>System</option><option>Light</option><option>Dark</option></select></label>
            <label><span>Language</span><select><option>Persian / RTL</option><option>English / LTR</option></select></label>
            <label><span>Notification channel</span><select><option>Telegram + PWA</option><option>PWA only</option><option>Telegram only</option></select></label>
          </div>
        </Panel>

        <Panel title="اتصال‌ها" description="در نسخه بعدی به API واقعی وصل می‌شود" className="span-6">
          <div className="connection-list">
            <div><span>VPS Assistant</span><Badge tone="success">Ready</Badge></div>
            <div><span>n8n</span><Badge tone="warning">Pending</Badge></div>
            <div><span>Telegram Bot</span><Badge tone="warning">Pending</Badge></div>
            <div><span>GitHub</span><Badge tone="warning">Pending</Badge></div>
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
