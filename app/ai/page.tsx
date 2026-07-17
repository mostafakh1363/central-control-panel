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
        eyebrow="AI Operations Assistant"
        title="AI Assistant"
        description="چت عملیاتی برای خلاصه پروژه‌ها، ساخت وظیفه، بررسی لاگ و آماده‌سازی اکشن."
        actions={
          <>
            <Badge tone={sourceTone(dashboard.source)}>{sourceLabel(dashboard.source)}</Badge>
            <LinkButton href="/tasks" variant="secondary" icon="check">رفتن به وظایف</LinkButton>
          </>
        }
      />

      <section className="dashboard-grid">
        <Panel title="چت عملیاتی" description="پیام‌ها از مسیر امن proxy به AI backend ارسال می‌شوند." className="span-8">
          <AiConsole />
        </Panel>

        <Panel title="Context فعال" description="Context نمایشی فقط از پروژه‌ها و آیتم‌های قابل دسترسی پنل ساخته می‌شود." className="span-4">
          <div className="context-list">
            <div><strong>Projects</strong><span>{projects.length ? projects.map((project) => project.name).join("، ") : "داده‌ای دریافت نشد"}</span></div>
            <div><strong>Today</strong><span>{reminders.length} reminder، {alerts.length} alert</span></div>
            <div><strong>Safe mode</strong><span>اکشن‌های حساس فقط approval request می‌سازند.</span></div>
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
