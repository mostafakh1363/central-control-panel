import { AppShell } from "@/components/app-shell";
import { ReminderChecklist } from "@/components/task-controls";
import { Badge, EmptyState, LinkButton, PageTitle, Panel } from "@/components/ui";
import { getRemindersData, sourceLabel, sourceTone } from "@/lib/ai-brain";

export const dynamic = "force-dynamic";

export default async function RemindersPage() {
  const result = await getRemindersData();
  const reminders = result.data;
  const summary = [
    { label: "باز", value: reminders.filter((item) => item.status === "open").length, tone: "warning" as const },
    { label: "اولویت بالا", value: reminders.filter((item) => item.priority === "high").length, tone: "danger" as const },
    { label: "پروژه مرتبط", value: new Set(reminders.map((item) => item.project)).size, tone: "accent" as const }
  ];

  return (
    <AppShell>
      <PageTitle
        eyebrow="مرکز یادآوری"
        title="یادآوری‌ها"
        description="پیگیری‌های زمان‌دار، پیام‌های پیگیری و کارهایی که باید سر وقت دیده شوند."
        actions={
          <>
            <Badge tone={sourceTone(result.source)}>{sourceLabel(result.source)}</Badge>
            <LinkButton href="/tasks" variant="secondary" icon="check">وظایف من</LinkButton>
            <LinkButton href="/ai" variant="primary" icon="spark">ساخت یادآوری با AI</LinkButton>
          </>
        }
      />

      {result.error ? <section className="action-status">{result.error}</section> : null}

      <section className="dashboard-grid">
        <Panel title="خلاصه یادآوری‌ها" description="نمای سریع برای موبایل و دسکتاپ." className="span-4">
          <div className="summary-stack">
            {summary.map((item) => (
              <div className="summary-item" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <Badge tone={item.tone}>فعال</Badge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="یادآوری‌های باز" description="هر مورد با یک لمس انجام‌شده یا دوباره باز می‌شود." className="span-8">
          {reminders.length ? <ReminderChecklist reminders={reminders} /> : <EmptyState title="یادآوری باز نداری" description="مسیر API یادآوری‌ها داده‌ای برای نمایش برنگرداند." />}
        </Panel>
      </section>
    </AppShell>
  );
}
