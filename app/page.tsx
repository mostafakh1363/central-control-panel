import { AppShell } from "@/components/app-shell";
import { Icon } from "@/components/icons";
import { ReminderChecklist } from "@/components/task-controls";
import { Badge, EmptyState, LinkButton, MetricCard, PageTitle, Panel, ProgressBar, StatusDot } from "@/components/ui";
import { getDashboardData, sourceLabel, sourceTone } from "@/lib/ai-brain";
import { getTelegramFinancialData } from "@/lib/telegram-financial";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [dashboard, telegramFinancial] = await Promise.all([getDashboardData(), getTelegramFinancialData()]);
  const { alerts, logs, metrics, projects, reminders, servers } = dashboard.data;
  const primaryServer = servers[0];
  const telegram = telegramFinancial.data;

  return (
    <AppShell>
      <PageTitle
        eyebrow="مرکز مانیتورینگ"
        title="وضعیت امروز"
        description="نمای سریع پروژه‌ها، سرورها، وظایف، هشدارها و اقدام‌های روزانه از پنل مرکزی."
        actions={
          <>
            <Badge tone={sourceTone(dashboard.source)}>{sourceLabel(dashboard.source)}</Badge>
            <LinkButton href="/tasks" variant="secondary" icon="plus">ثبت وظیفه</LinkButton>
            <LinkButton href="/servers" variant="secondary" icon="pulse">بررسی سرورها</LinkButton>
            <LinkButton href="/ai" variant="primary" icon="spark">پرسش از AI</LinkButton>
          </>
        }
      />

      {dashboard.error ? <section className="action-status">{dashboard.error}</section> : null}

      {primaryServer ? (
        <section className="mobile-command-card" aria-label="خلاصه وضعیت موبایل">
          <div>
            <span>وضعیت لحظه‌ای</span>
            <strong>{primaryServer.status}</strong>
            <small>{primaryServer.name}، آخرین به‌روزرسانی {primaryServer.updatedAt}</small>
          </div>
          <LinkButton href="/servers" variant="primary" size="sm" icon="arrow">جزئیات</LinkButton>
        </section>
      ) : null}

      <section className="metrics-grid" aria-label="شاخص‌ها">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="dashboard-grid">
        <Panel title="مانیتور مالی تلگرام" description="آخرین وضعیت کانال‌های مالی، پست‌های تحلیل‌شده و خطاهای نیازمند بررسی." action={<LinkButton href="/telegram-financial" variant="ghost" size="sm">مشاهده مانیتور</LinkButton>} className="span-12">
          <div className="telegram-overview-strip">
            <article className="summary-item">
              <span>وضعیت جمع‌آوری داده</span>
              <strong>{telegram.health.status}</strong>
              <Badge tone={telegram.health.status === "ok" ? "success" : "warning"}>{telegramFinancial.source === "live" ? "زنده" : "داده پشتیبان"}</Badge>
            </article>
            <article className="summary-item">
              <span>کانال‌های مجاز</span>
              <strong>{telegram.health.allowlistCount}</strong>
              <Badge tone={telegram.health.allowlistCount ? "success" : "warning"}>منبع</Badge>
            </article>
            <article className="summary-item">
              <span>پست‌های تحلیل‌شده</span>
              <strong>{telegram.analyzedPosts.length}</strong>
              <Badge tone={telegram.analyzedPosts.length ? "success" : "accent"}>تحلیل</Badge>
            </article>
            <article className="summary-item">
              <span>خطاهای اخیر</span>
              <strong>{telegram.failedPosts.length}</strong>
              <Badge tone={telegram.failedPosts.length ? "danger" : "success"}>خطا</Badge>
            </article>
          </div>
        </Panel>
        <Panel title="مانیتورینگ سرورها" description="منابع اصلی و وضعیت پاسخ‌دهی سرویس‌ها." action={<LinkButton href="/servers" variant="ghost" size="sm">مشاهده سرورها</LinkButton>} className="span-6">
          {servers.length ? (
            <div className="server-list">
              {servers.map((server) => (
                <article className="server-row" key={server.name}>
                  <div className="server-row__icon" data-tone={server.tone}>
                    <Icon name="server" />
                  </div>
                  <div>
                    <strong>{server.name}</strong>
                    <span>{server.ip}، {server.updatedAt}</span>
                  </div>
                  <span className="cpu">CPU {server.cpu}%</span>
                  <ProgressBar value={server.cpu} tone={server.tone} />
                  <Badge tone={server.tone}>{server.status}</Badge>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="داده‌ای برای سرورها پیدا نشد" description="اتصال برقرار است، ولی مسیر API سرورها داده‌ای برنگرداند." />
          )}
        </Panel>

        <Panel title="پروژه‌های فعال" description="پروژه‌هایی که الان نیاز به توجه دارند." action={<LinkButton href="/projects" variant="ghost" size="sm">مشاهده پروژه‌ها</LinkButton>} className="span-6">
          {projects.length ? (
            <div className="project-list">
              {projects.slice(0, 4).map((project) => (
                <article className="project-row" key={project.slug}>
                  <div className="project-row__icon" data-tone={project.tone}>
                    <Icon name="folder" />
                  </div>
                  <div>
                    <strong>{project.name}</strong>
                    <span>{project.nextStep}</span>
                  </div>
                  <ProgressBar value={project.progress} tone={project.tone} />
                  <b>{project.progress}%</b>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="پروژه‌ای پیدا نشد" description="مسیر API پروژه‌ها داده‌ای برای نمایش برنگرداند." />
          )}
        </Panel>

        <Panel title="یادآوری‌های امروز" description="این بخش روی موبایل با لمس مستقیم قابل انجام است." action={<LinkButton href="/reminders" variant="ghost" size="sm">مدیریت</LinkButton>} className="span-4">
          {reminders.length ? <ReminderChecklist reminders={reminders.slice(0, 4)} /> : <EmptyState title="یادآوری باز نداری" description="فعلاً یادآوری باز از API دریافت نشد." />}
        </Panel>

        <Panel title="لاگ‌های اخیر" description="رخدادهای مهم سیستم و گردش‌کارها." action={<LinkButton href="/logs" variant="ghost" size="sm">مشاهده لاگ‌ها</LinkButton>} className="span-4">
          {logs.length ? (
            <div className="event-list">
              {logs.slice(0, 4).map((log) => (
                <a className="event-row" href={log.href} key={log.id}>
                  <div className="event-row__icon" data-tone={log.tone}>
                    <StatusDot tone={log.tone} />
                  </div>
                  <div>
                    <strong>{log.title}</strong>
                    <span>{log.description}</span>
                  </div>
                  <Badge tone={log.tone}>{log.status}</Badge>
                </a>
              ))}
            </div>
          ) : (
            <EmptyState title="لاگی پیدا نشد" description="مسیر API لاگ‌ها داده‌ای برای نمایش برنگرداند." />
          )}
        </Panel>

        <Panel title="هشدارهای مهم" description="هشدارهایی که نیازمند تصمیم یا پیگیری هستند." action={<LinkButton href="/actions" variant="ghost" size="sm">اقدام‌ها</LinkButton>} className="span-4">
          {alerts.length ? (
            <div className="alert-list">
              {alerts.map((alert) => (
                <a className="alert-row" href={alert.href} key={`${alert.title}-${alert.meta}`}>
                  <div className="alert-row__icon" data-tone={alert.tone}>
                    <Icon name="alert" />
                  </div>
                  <div>
                    <strong>{alert.title}</strong>
                    <span>{alert.description}</span>
                  </div>
                  <b>{alert.meta}</b>
                </a>
              ))}
            </div>
          ) : (
            <EmptyState title="هشدار مهمی نیست" description="از داده زنده پنل هشدار مهمی استخراج نشد." />
          )}
        </Panel>
      </section>
    </AppShell>
  );
}
