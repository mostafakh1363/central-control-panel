import { AppShell } from "@/components/app-shell";
import { Icon } from "@/components/icons";
import { Badge, EmptyState, LinkButton, PageTitle, Panel, ProgressBar } from "@/components/ui";
import { getProjectsData, sourceLabel, sourceTone } from "@/lib/ai-brain";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const result = await getProjectsData();
  const projects = result.data;

  return (
    <AppShell>
      <PageTitle
        eyebrow="ثبت پروژه‌ها"
        title="پروژه‌ها"
        description="هر پروژه جدا دیده می‌شود تا دسترسی، وظایف، لاگ‌ها و قدم بعدی مشخص باشد."
        actions={
          <>
            <Badge tone={sourceTone(result.source)}>{sourceLabel(result.source)}</Badge>
            <LinkButton href="/tasks" variant="secondary" icon="check">وظایف پروژه‌ها</LinkButton>
            <LinkButton href="/ai" variant="primary" icon="spark">تحلیل با AI</LinkButton>
          </>
        }
      />

      {result.error ? <section className="action-status">{result.error}</section> : null}

      <section className="dashboard-grid">
        <Panel title="همه پروژه‌ها" description="وضعیت، مالک، پیشرفت و قدم بعدی پروژه‌ها از داده زنده پنل خوانده می‌شود." className="span-12">
          {projects.length ? (
            <div className="cards-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.slug}>
                  <div className="project-card__header">
                    <div className="project-row__icon" data-tone={project.tone}>
                      <Icon name="folder" />
                    </div>
                    <div>
                      <strong>{project.name}</strong>
                      <span>{project.description}</span>
                    </div>
                    <Badge tone={project.tone}>{project.status}</Badge>
                  </div>
                  <ProgressBar value={project.progress} tone={project.tone} />
                  <dl className="meta-list">
                    <div><dt>مالک</dt><dd>{project.owner}</dd></div>
                    <div><dt>وظایف باز</dt><dd>{project.openTasks}</dd></div>
                    <div><dt>قدم بعدی</dt><dd>{project.nextStep}</dd></div>
                  </dl>
                  <div className="row-actions">
                    <LinkButton size="sm" variant="secondary" href="/tasks">وظایف</LinkButton>
                    <LinkButton size="sm" variant="ghost" href="/ai">پرسش از AI</LinkButton>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="پروژه‌ای پیدا نشد" description="مسیر API پروژه‌ها داده‌ای برای نمایش برنگرداند." />
          )}
        </Panel>
      </section>
    </AppShell>
  );
}
