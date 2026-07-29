import { AiConsole } from "@/components/ai-console";
import { AppShell } from "@/components/app-shell";
import { Badge, LinkButton, PageTitle, Panel } from "@/components/ui";
import { getDashboardData, sourceLabel, sourceTone } from "@/lib/ai-brain";

export const dynamic = "force-dynamic";

export default async function AiPage() {
  const dashboard = await getDashboardData();
  const { projects, reminders, alerts } = dashboard.data;

  return (
    <AppShell>
      <PageTitle
        eyebrow="دستیار عملیاتی AI"
        title="دستیار AI"
        description="چت عملیاتی برای خلاصه پروژه‌ها، ساخت وظیفه، بررسی لاگ و آماده‌سازی اقدام."
        actions={
          <>
            <Badge tone={sourceTone(dashboard.source)}>{sourceLabel(dashboard.source)}</Badge>
            <LinkButton href="/tasks" variant="secondary" icon="check">رفتن به وظایف</LinkButton>
          </>
        }
      />

      <section className="dashboard-grid">
        <Panel title="چت عملیاتی" description="پیام‌ها از مسیر امن پراکسی به بک‌اند AI ارسال می‌شوند." className="span-8">
          <AiConsole />
        </Panel>

        <Panel title="زمینه فعال" description="زمینه نمایشی فقط از پروژه‌ها و آیتم‌های قابل دسترسی پنل ساخته می‌شود." className="span-4">
          <div className="context-list">
            <div><strong>پروژه‌ها</strong><span>{projects.length ? projects.map((project) => project.name).join("، ") : "داده‌ای دریافت نشد"}</span></div>
            <div><strong>امروز</strong><span>{reminders.length} یادآوری، {alerts.length} هشدار</span></div>
            <div><strong>حالت امن</strong><span>اقدام‌های حساس فقط درخواست تأیید می‌سازند.</span></div>
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
