import { AppShell } from "@/components/app-shell";
import { WorkflowActions } from "@/components/workflow-actions";
import { Badge, EmptyState, LinkButton, PageTitle, Panel } from "@/components/ui";
import { getWorkflowsData, sourceLabel, sourceTone } from "@/lib/ai-brain";

export const dynamic = "force-dynamic";

export default async function N8nPage() {
  const result = await getWorkflowsData();
  const workflows = result.data;

  return (
    <AppShell>
      <PageTitle
        eyebrow="مرکز اتوماسیون"
        title="اتوماسیون n8n"
        description="آخرین اجرا، پروژه مرتبط و مسیر بررسی هر گردش‌کار از API خوانده می‌شود."
        actions={
          <>
            <Badge tone={sourceTone(result.source)}>{sourceLabel(result.source)}</Badge>
            <LinkButton href="/logs" variant="secondary" icon="logs">لاگ‌های n8n</LinkButton>
            <LinkButton href="/actions" variant="primary" icon="bolt">اقدام‌ها</LinkButton>
          </>
        }
      />

      {result.error ? <section className="action-status">{result.error}</section> : null}

      <section className="dashboard-grid">
        <Panel title="گردش‌کارها" description="هر ردیف روی موبایل به کارت ساده تبدیل می‌شود و درخواست اجرا به بک‌اند ارسال می‌شود." className="span-12">
          {workflows.length ? (
            <div className="data-table">
              <div className="data-table__row data-table__head">
                <span>گردش‌کار</span><span>پروژه</span><span>آخرین اجرا</span><span>وضعیت</span><span>اقدام</span>
              </div>
              {workflows.map((workflow) => (
                <div className="data-table__row" key={workflow.id || workflow.name}>
                  <strong>{workflow.name}</strong>
                  <span>{workflow.project}</span>
                  <span>{workflow.lastRun}</span>
                  <Badge tone={workflow.tone}>{workflow.status}</Badge>
                  <WorkflowActions workflowId={workflow.id || workflow.name} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="گردش‌کاری پیدا نشد" description="مسیر API مربوط به n8n داده‌ای برای نمایش برنگرداند." />
          )}
        </Panel>
      </section>
    </AppShell>
  );
}
