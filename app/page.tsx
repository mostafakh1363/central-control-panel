import { AppShell } from "@/components/app-shell";
import { Badge, Button, MetricCard, MobilePreview, PageTitle, Panel, ProgressBar } from "@/components/ui";
import { alerts, logs, metrics, projects, reminders, servers } from "@/lib/data";

export default function HomePage() {
  return (
    <AppShell>
      <PageTitle
        eyebrow="مرکز عملیات پروژه‌ها"
        title="داشبورد"
        actions={
          <>
            <Button variant="secondary">افزودن یادداشت</Button>
            <Button variant="secondary">چک VPS</Button>
            <Button variant="primary">سؤال از AI</Button>
          </>
        }
      />

      <section className="metrics-grid" aria-label="شاخص‌ها">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="dashboard-grid">
        <Panel title="وضعیت سرورها" action={<Button variant="ghost" size="sm">مشاهده همه</Button>} className="span-6">
          <div className="server-list">
            {servers.slice(0, 4).map((server) => (
              <article className="server-row" key={server.name}>
                <div className="server-row__icon" />
                <div>
                  <strong>{server.name}</strong>
                  <span>{server.ip}</span>
                </div>
                <span className="cpu">CPU {server.cpu}%</span>
                <div className="sparkline" aria-hidden="true" />
                <Badge tone={server.tone}>{server.status}</Badge>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="پروژه‌های فعال" action={<Button variant="ghost" size="sm">مشاهده همه</Button>} className="span-6">
          <div className="project-list">
            {projects.slice(0, 4).map((project) => (
              <article className="project-row" key={project.name}>
                <div className="project-row__icon" data-tone={project.tone} />
                <div>
                  <strong>{project.name}</strong>
                  <span>{project.description}</span>
                </div>
                <ProgressBar value={project.progress} tone={project.tone} />
                <b>{project.progress}%</b>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="یادآوری‌های امروز" action={<Button variant="ghost" size="sm">مشاهده همه</Button>} className="span-4">
          <div className="reminder-list">
            {reminders.slice(0, 4).map((item) => (
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
          <Button variant="secondary">افزودن یادآوری جدید</Button>
        </Panel>

        <Panel title="لاگ‌های اخیر" action={<Button variant="ghost" size="sm">مشاهده همه</Button>} className="span-4">
          <div className="event-list">
            {logs.slice(0, 4).map((log) => (
              <article className="event-row" key={log.title}>
                <div className="event-row__icon" data-tone={log.tone} />
                <div>
                  <strong>{log.title}</strong>
                  <span>{log.description}</span>
                </div>
                <Badge tone={log.tone}>{log.status}</Badge>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="هشدارهای مهم" action={<Button variant="ghost" size="sm">مشاهده همه</Button>} className="span-4">
          <div className="alert-list">
            {alerts.map((alert) => (
              <article className="alert-row" key={alert.title}>
                <div className="alert-row__icon" data-tone={alert.tone} />
                <div>
                  <strong>{alert.title}</strong>
                  <span>{alert.description}</span>
                </div>
                <b>{alert.meta}</b>
              </article>
            ))}
          </div>
        </Panel>
      </section>

      <MobilePreview />
    </AppShell>
  );
}
