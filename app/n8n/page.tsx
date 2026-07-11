import { AppShell } from "@/components/app-shell";
import { Badge, Button, PageTitle, Panel } from "@/components/ui";
import { workflows } from "@/lib/data";

export default function N8nPage() {
  return (
    <AppShell>
      <PageTitle
        eyebrow="Automation Center"
        title="اتوماسیون n8n"
        actions={
          <>
            <Button variant="secondary">Sync workflows</Button>
            <Button variant="primary">Run selected</Button>
          </>
        }
      />

      <section className="dashboard-grid">
        <Panel title="Workflowها" description="وضعیت اجرا، پروژه مرتبط و آخرین run" className="span-12">
          <div className="data-table">
            <div className="data-table__row data-table__head">
              <span>Workflow</span><span>Project</span><span>Last run</span><span>Status</span><span>Action</span>
            </div>
            {workflows.map((workflow) => (
              <div className="data-table__row" key={workflow.name}>
                <strong>{workflow.name}</strong>
                <span>{workflow.project}</span>
                <span>{workflow.lastRun}</span>
                <Badge tone={workflow.tone}>{workflow.status}</Badge>
                <Button size="sm" variant="secondary">Details</Button>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
