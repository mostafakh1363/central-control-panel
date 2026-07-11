import { AppShell } from "@/components/app-shell";
import { Badge, Button, PageTitle, Panel, ProgressBar } from "@/components/ui";
import { servers } from "@/lib/data";

export default function ServersPage() {
  return (
    <AppShell>
      <PageTitle
        eyebrow="VPS Monitoring"
        title="سرورها"
        actions={
          <>
            <Button variant="secondary">Run health check</Button>
            <Button variant="primary">Add server</Button>
          </>
        }
      />

      <section className="dashboard-grid">
        {servers.map((server) => (
          <Panel key={server.name} title={server.name} description={server.ip} className="span-6" action={<Badge tone={server.tone}>{server.status}</Badge>}>
            <div className="resource-stack">
              <div><span>CPU</span><ProgressBar value={server.cpu} tone={server.tone} /><b>{server.cpu}%</b></div>
              <div><span>RAM</span><ProgressBar value={server.ram} tone={server.ram > 70 ? "warning" : "success"} /><b>{server.ram}%</b></div>
              <div><span>Disk</span><ProgressBar value={server.disk} tone={server.disk > 70 ? "warning" : "accent"} /><b>{server.disk}%</b></div>
            </div>
            <div className="row-actions">
              <Button size="sm" variant="secondary">View logs</Button>
              <Button size="sm" variant="secondary">Check service</Button>
              <Button size="sm" variant="danger">Restart</Button>
            </div>
          </Panel>
        ))}
      </section>
    </AppShell>
  );
}
