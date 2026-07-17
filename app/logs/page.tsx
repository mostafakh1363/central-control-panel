import { AppShell } from "@/components/app-shell";
import { LogList } from "@/components/log-list";
import { Badge, EmptyState, LinkButton, PageTitle, Panel } from "@/components/ui";
import { getLogsData, sourceLabel, sourceTone } from "@/lib/ai-brain";

export const dynamic = "force-dynamic";

export default async function LogsPage() {
  const result = await getLogsData();
  const logs = result.data;

  return (
    <AppShell>
      <PageTitle
        eyebrow="Operational Logs"
        title="لاگ‌ها"
        description="رخدادهای سیستم به‌شکل خلاصه، قابل اسکن و قابل پیگیری نمایش داده می‌شوند."
        actions={
          <>
            <Badge tone={sourceTone(result.source)}>{sourceLabel(result.source)}</Badge>
            <LinkButton href="/servers" variant="secondary" icon="server">سرورها</LinkButton>
            <LinkButton href="/ai" variant="primary" icon="spark">تحلیل لاگ</LinkButton>
          </>
        }
      />

      {result.error ? <section className="action-status">{result.error}</section> : null}

      <section className="dashboard-grid">
        <Panel title="لاگ‌های سیستم" description="روی موبایل هر لاگ به کارت قابل لمس تبدیل می‌شود و فیلترها local کار می‌کنند." className="span-12">
          {logs.length ? <LogList logs={logs} /> : <EmptyState title="لاگی پیدا نشد" description="endpoint لاگ‌ها داده‌ای برای نمایش برنگرداند." />}
        </Panel>
      </section>
    </AppShell>
  );
}
