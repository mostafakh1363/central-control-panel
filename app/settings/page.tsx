import { AppShell } from "@/components/app-shell";
import { SettingsControls } from "@/components/settings-controls";
import { Badge, LinkButton, PageTitle, Panel } from "@/components/ui";
import { getSettingsData, sourceLabel, sourceTone } from "@/lib/ai-brain";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const result = await getSettingsData();

  return (
    <AppShell>
      <PageTitle
        eyebrow="System Settings"
        title="تنظیمات"
        description="ظاهر، زبان، نوتیفیکیشن و وضعیت اتصال‌های اصلی پنل."
        actions={
          <>
            <Badge tone={sourceTone(result.source)}>{sourceLabel(result.source)}</Badge>
            <LinkButton href="/" variant="primary" icon="home">بازگشت به خانه</LinkButton>
          </>
        }
      />

      {result.error ? <section className="action-status">{result.error}</section> : null}

      <section className="dashboard-grid">
        <Panel title="تنظیمات اپ" description="این کنترل‌ها مقدار را در backend ذخیره می‌کنند، اگر endpoint فعال باشد." className="span-6">
          <SettingsControls initialSettings={result.data.settings} />
        </Panel>

        <Panel title="اتصال‌ها" description="وضعیت فعلی endpoint ها و سرویس‌های مورد نیاز." className="span-6">
          <div className="connection-list">
            {result.data.connections.map((connection) => (
              <div key={connection.label}>
                <span>{connection.label}</span>
                <Badge tone={connection.tone}>{connection.status}</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
