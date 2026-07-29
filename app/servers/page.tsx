import { ActionRunner } from "@/components/action-runner";
import { AppShell } from "@/components/app-shell";
import { ServerActions } from "@/components/server-actions";
import { Badge, EmptyState, LinkButton, PageTitle, Panel, ProgressBar } from "@/components/ui";
import { getActionsData, getServersData, sourceLabel, sourceTone } from "@/lib/ai-brain";

export const dynamic = "force-dynamic";

export default async function ServersPage() {
  const [serverResult, actionResult] = await Promise.all([getServersData(), getActionsData()]);
  const servers = serverResult.data;

  return (
    <AppShell>
      <PageTitle
        eyebrow="مانیتورینگ سرورها"
        title="سرورها"
        description="وضعیت منابع، بررسی سلامت و اقدام‌های امن سرورها از API واقعی خوانده می‌شود."
        actions={
          <>
            <Badge tone={sourceTone(serverResult.source)}>{sourceLabel(serverResult.source)}</Badge>
            <LinkButton href="/logs" variant="secondary" icon="logs">لاگ‌ها</LinkButton>
            <LinkButton href="/actions" variant="primary" icon="pulse">اقدام‌ها</LinkButton>
          </>
        }
      />

      {serverResult.error ? <section className="action-status">{serverResult.error}</section> : null}

      <section className="dashboard-grid">
        {servers.length ? (
          servers.map((server) => (
            <Panel key={server.id || server.name} title={server.name} description={`${server.ip}، بروزرسانی ${server.updatedAt}`} className="span-6 server-panel" action={<Badge tone={server.tone}>{server.status}</Badge>}>
              <div className="resource-stack">
                <div><span>CPU</span><ProgressBar value={server.cpu} tone={server.tone} /><b>{server.cpu}%</b></div>
                <div><span>RAM</span><ProgressBar value={server.ram} tone={server.ram > 70 ? "warning" : "success"} /><b>{server.ram}%</b></div>
                <div><span>Disk</span><ProgressBar value={server.disk} tone={server.disk > 70 ? "warning" : "accent"} /><b>{server.disk}%</b></div>
              </div>
              <ServerActions serverId={server.id || server.name} />
            </Panel>
          ))
        ) : (
          <Panel title="داده سرور پیدا نشد" description="مسیر API سرورها داده‌ای برای نمایش برنگرداند." className="span-12">
            <EmptyState title="سروری برای نمایش نیست" description="کلید API تنظیم شده، ولی لیست سرورها خالی برگشت." />
          </Panel>
        )}

        <Panel title="اقدام‌های مرتبط" description="اقدام‌های ایمن و حساس از API خوانده می‌شوند و اجرای حساس تأیید جداگانه می‌خواهد." className="span-12">
          <ActionRunner actions={actionResult.data} />
        </Panel>
      </section>
    </AppShell>
  );
}
