import { AppShell } from "@/components/app-shell";
import { Badge, Button, PageTitle, Panel, ProgressBar } from "@/components/ui";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <AppShell>
      <PageTitle
        eyebrow="Project Registry"
        title="پروژه‌ها"
        actions={
          <>
            <Button variant="secondary">Import</Button>
            <Button variant="primary">پروژه جدید</Button>
          </>
        }
      />

      <section className="dashboard-grid">
        <Panel title="همه پروژه‌ها" description="وضعیت، مالک، پیشرفت و قدم بعدی پروژه‌ها" className="span-12">
          <div className="cards-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.slug}>
                <div className="project-card__header">
                  <div className="project-row__icon" data-tone={project.tone} />
                  <div>
                    <strong>{project.name}</strong>
                    <span>{project.description}</span>
                  </div>
                  <Badge tone={project.tone}>{project.status}</Badge>
                </div>
                <ProgressBar value={project.progress} tone={project.tone} />
                <dl className="meta-list">
                  <div><dt>Owner</dt><dd>{project.owner}</dd></div>
                  <div><dt>Open tasks</dt><dd>{project.openTasks}</dd></div>
                  <div><dt>Next step</dt><dd>{project.nextStep}</dd></div>
                </dl>
                <div className="row-actions">
                  <Button size="sm" variant="secondary">Open</Button>
                  <Button size="sm" variant="ghost">Ask AI</Button>
                </div>
              </article>
            ))}
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
