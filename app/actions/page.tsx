import { ActionRunner } from "@/components/action-runner";
import { AppShell } from "@/components/app-shell";
import { Badge, LinkButton, PageTitle, Panel } from "@/components/ui";
import { getActionsData, sourceLabel, sourceTone } from "@/lib/ai-brain";

export const dynamic = "force-dynamic";

export default async function ActionsPage() {
  const result = await getActionsData();

  return (
    <AppShell>
      <PageTitle
        eyebrow="اجرای اقدام امن"
        title="اقدام‌ها"
        description="اقدام‌های خواندنی نتیجه را مستقیم نشان می‌دهند و اقدام‌های حساس فقط درخواست تأیید می‌سازند."
        actions={
          <>
            <Badge tone={sourceTone(result.source)}>{sourceLabel(result.source)}</Badge>
            <LinkButton href="/servers" variant="primary" icon="server">وضعیت سرورها</LinkButton>
          </>
        }
      />

      {result.error ? <section className="action-status">{result.error}</section> : null}

      <section className="dashboard-grid">
        <Panel title="دستورهای امن و حساس" description="لیست اقدام‌ها از بک‌اند خوانده می‌شود و اجرای حساس تأیید جداگانه لازم دارد." className="span-12">
          <ActionRunner actions={result.data} />
        </Panel>
      </section>
    </AppShell>
  );
}
