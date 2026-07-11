import { AppShell } from "@/components/app-shell";
import { Badge, Button, PageTitle, Panel } from "@/components/ui";
import { reminders, tasks } from "@/lib/data";

export default function TasksPage() {
  return (
    <AppShell>
      <PageTitle
        eyebrow="Task OS"
        title="وظایف و یادآوری‌ها"
        actions={
          <>
            <Button variant="secondary">Calendar view</Button>
            <Button variant="primary">تسک جدید</Button>
          </>
        }
      />

      <section className="dashboard-grid">
        <Panel title="تسک‌های باز" description="استخراج‌شده از جلسه‌ها، پروژه‌ها و دستورهای روزانه" className="span-8">
          <div className="task-board">
            {tasks.map((task) => (
              <article className="task-card" key={task.title}>
                <Badge tone={task.tone}>{task.project}</Badge>
                <h3>{task.title}</h3>
                <p>مسئول: {task.owner} · موعد: {task.due}</p>
                <div className="row-actions">
                  <Button size="sm" variant="secondary">Done</Button>
                  <Button size="sm" variant="ghost">Reschedule</Button>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="یادآوری‌ها" description="برنامه امروز" className="span-4">
          <div className="reminder-list">
            {reminders.map((item) => (
              <label className="reminder-row" key={item.id}>
                <input type="checkbox" />
                <time>{item.time}</time>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.project}</small>
                </span>
                <i data-priority={item.priority} />
              </label>
            ))}
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
