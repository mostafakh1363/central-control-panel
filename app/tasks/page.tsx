import { AppShell } from "@/components/app-shell";
import { ReminderChecklist, TaskChecklist } from "@/components/task-controls";
import { Badge, EmptyState, LinkButton, PageTitle, Panel } from "@/components/ui";
import { getRemindersData, getTasksData, sourceLabel, sourceTone } from "@/lib/ai-brain";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const [taskResult, reminderResult] = await Promise.all([getTasksData(), getRemindersData()]);
  const tasks = taskResult.data;
  const reminders = reminderResult.data;

  return (
    <AppShell>
      <PageTitle
        eyebrow="Task OS"
        title="وظایف من"
        description="فقط کارهایی که باید انجام شوند، نه backlog فنی سیستم."
        actions={
          <>
            <Badge tone={sourceTone(taskResult.source)}>{sourceLabel(taskResult.source)}</Badge>
            <LinkButton href="/reminders" variant="secondary" icon="bell">یادآوری‌ها</LinkButton>
            <LinkButton href="/ai" variant="primary" icon="spark">ساخت task با AI</LinkButton>
          </>
        }
      />

      {taskResult.error ? <section className="action-status">{taskResult.error}</section> : null}

      <section className="dashboard-grid">
        <Panel title="کارهای باز" description="از جلسه‌ها، پروژه‌ها و یادآوری‌ها استخراج شده‌اند." className="span-8">
          {tasks.length ? <TaskChecklist tasks={tasks} /> : <EmptyState title="فعلاً وظیفه شخصی باز نداری" description="endpoint وظایف داده قابل انجام برای کاربر برنگرداند." />}
        </Panel>

        <Panel title="یادآوری‌های امروز" description="روی موبایل مثل checklist کار می‌کند." className="span-4">
          {reminders.length ? <ReminderChecklist reminders={reminders} /> : <EmptyState title="یادآوری باز نداری" description="endpoint یادآوری‌ها داده‌ای برای نمایش برنگرداند." />}
        </Panel>
      </section>
    </AppShell>
  );
}
