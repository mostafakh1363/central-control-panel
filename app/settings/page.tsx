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
        eyebrow="تنظیمات سیستم"
        title="تنظیمات"
        description="ظاهر، زبان، اعلان‌ها و وضعیت اتصال‌های اصلی پنل."
        actions={
          <>
            <Badge tone={sourceTone(result.source)}>{sourceLabel(result.source)}</Badge>
            <LinkButton href="/" variant="primary" icon="home">بازگشت به داشبورد</LinkButton>
          </>
        }
      />

      {result.error ? <section className="action-status">{result.error}</section> : null}

      <section className="dashboard-grid">
        <Panel title="تنظیمات پنل" description="این کنترل‌ها مقدار را در بک‌اند ذخیره می‌کنند، اگر مسیر API فعال باشد." className="span-6">
          <SettingsControls initialSettings={result.data.settings} />
        </Panel>

        <Panel title="اتصال‌ها" description="وضعیت فعلی مسیرهای API و سرویس‌های مورد نیاز." className="span-6">
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
