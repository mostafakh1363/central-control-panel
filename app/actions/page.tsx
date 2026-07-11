import { AppShell } from "@/components/app-shell";
import { Badge, Button, PageTitle, Panel } from "@/components/ui";

const actions = [
  { title: "Check VPS status", description: "Read-only health check", tone: "success" as const, sensitive: false },
  { title: "View n8n logs", description: "Read latest workflow logs", tone: "accent" as const, sensitive: false },
  { title: "Run backup", description: "Requires confirmation", tone: "warning" as const, sensitive: true },
  { title: "Restart n8n", description: "Sensitive server action", tone: "danger" as const, sensitive: true },
  { title: "Reload Nginx", description: "Sensitive service action", tone: "warning" as const, sensitive: true },
  { title: "Generate daily summary", description: "Safe AI summary action", tone: "accent" as const, sensitive: false }
];

export default function ActionsPage() {
  return (
    <AppShell>
      <PageTitle
        eyebrow="Safe Action Runner"
        title="اکشن‌های سریع"
        actions={<Button variant="primary">New action</Button>}
      />

      <section className="dashboard-grid">
        <Panel title="دستورهای امن" description="دستورهای حساس باید قبل از اجرا تأیید شوند" className="span-12">
          <div className="cards-grid">
            {actions.map((action) => (
              <article className="action-card" key={action.title}>
                <div className="project-card__header">
                  <div className="project-row__icon" data-tone={action.tone} />
                  <div>
                    <strong>{action.title}</strong>
                    <span>{action.description}</span>
                  </div>
                  <Badge tone={action.tone}>{action.sensitive ? "Confirm" : "Safe"}</Badge>
                </div>
                <div className="row-actions">
                  <Button size="sm" variant={action.sensitive ? "danger" : "secondary"}>{action.sensitive ? "Request approval" : "Run"}</Button>
                  <Button size="sm" variant="ghost">Details</Button>
                </div>
              </article>
            ))}
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
