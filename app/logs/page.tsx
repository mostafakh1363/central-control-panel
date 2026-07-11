import { AppShell } from "@/components/app-shell";
import { Badge, Button, PageTitle, Panel } from "@/components/ui";
import { logs } from "@/lib/data";

export default function LogsPage() {
  return (
    <AppShell>
      <PageTitle
        eyebrow="Operational Logs"
        title="لاگ‌ها"
        actions={
          <>
            <Button variant="secondary">Filter</Button>
            <Button variant="primary">Export</Button>
          </>
        }
      />

      <section className="dashboard-grid">
        <Panel title="لاگ‌های سیستم" description="خلاصه‌شده و قابل فهم برای تصمیم‌گیری" className="span-12">
          <div className="data-table">
            <div className="data-table__row data-table__head">
              <span>Time</span><span>Event</span><span>Source</span><span>Status</span><span>Action</span>
            </div>
            {logs.map((log) => (
              <div className="data-table__row" key={`${log.time}-${log.title}`}>
                <time>{log.time}</time>
                <strong>{log.title}</strong>
                <span>{log.description}</span>
                <Badge tone={log.tone}>{log.status}</Badge>
                <Button size="sm" variant="secondary">Open</Button>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
