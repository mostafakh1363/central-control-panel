import { AppShell } from "@/components/app-shell";
import { TelegramFinancialPostActions } from "@/components/telegram-financial-actions";
import { Badge, EmptyState, LinkButton, MetricCard, PageTitle, Panel, StatusDot } from "@/components/ui";
import { getLogsData, sourceTone } from "@/lib/ai-brain";
import { getTelegramFinancialData, telegramSourceLabel, type TelegramFinancialPost } from "@/lib/telegram-financial";

export const dynamic = "force-dynamic";

export default async function TelegramFinancialPage() {
  const [telegramResult, logResult] = await Promise.all([getTelegramFinancialData(), getLogsData()]);
  const { health, sources, posts, analyzedPosts, failedPosts, statusCounts } = telegramResult.data;
  const telegramLogs = logResult.data
    .filter((log) => `${log.title} ${log.description} ${log.status}`.toLowerCase().includes("telegram"))
    .slice(0, 8);

  const metrics = [
    {
      label: "وضعیت مانیتور",
      value: health.status,
      description: health.ingestKeyConfigured ? "کلید دریافت داده تنظیم شده است" : "کلید دریافت داده تنظیم نیست",
      tone: health.status === "ok" ? "success" as const : "warning" as const,
      href: "/telegram-financial",
      icon: "pulse" as const
    },
    {
      label: "کانال‌های مجاز",
      value: String(health.allowlistCount),
      description: `${sources.length} منبع از API دریافت شد`,
      tone: health.allowlistCount > 0 ? "success" as const : "warning" as const,
      href: "/telegram-financial",
      icon: "shield" as const
    },
    {
      label: "پست‌های تحلیل‌شده",
      value: String(analyzedPosts.length),
      description: "آخرین موارد ذخیره‌شده در AI Brain",
      tone: analyzedPosts.length > 0 ? "success" as const : "accent" as const,
      href: "/telegram-financial",
      icon: "spark" as const
    },
    {
      label: "خطاهای اخیر",
      value: String(failedPosts.length),
      description: "پست‌هایی که نیازمند بررسی هستند",
      tone: failedPosts.length > 0 ? "danger" as const : "success" as const,
      href: "/telegram-financial",
      icon: "alert" as const
    }
  ];

  return (
    <AppShell>
      <PageTitle
        eyebrow="هوش مالی تلگرام"
        title="مانیتور مالی تلگرام"
        description="نتیجه تحلیل کانال‌های مالی مجاز، وضعیت جمع‌آوری داده، منابع، خطاها و مسیر بررسی لاگ‌ها در همین پنل نمایش داده می‌شود."
        actions={
          <>
            <Badge tone={sourceTone(telegramResult.source)}>{telegramSourceLabel(telegramResult.source)}</Badge>
            <LinkButton href="/logs" variant="secondary" icon="logs">لاگ‌ها</LinkButton>
            <LinkButton href="/ai" variant="primary" icon="spark">پرسیدن از AI</LinkButton>
          </>
        }
      />

      {telegramResult.error ? <section className="action-status">{telegramResult.error}</section> : null}

      <section className="metrics-grid" aria-label="شاخص‌های مانیتور مالی تلگرام">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="dashboard-grid">
        <Panel title="وضعیت اتصال" description="این بخش فقط از API امن سمت سرور خوانده می‌شود و کلید API به مرورگر ارسال نمی‌شود." className="span-4">
          <dl className="meta-list">
            <MetaItem label="وضعیت OpenAI" value={health.openaiConfigured ? "تنظیم شده" : "تنظیم نیست"} />
            <MetaItem label="مسیر رسانه" value={health.mediaRootExists ? "در دسترس" : "در دسترس نیست"} />
            <MetaItem label="مدل تبدیل گفتار" value={health.transcriptionModel} />
            <MetaItem label="منبع داده" value={telegramSourceLabel(telegramResult.source)} />
          </dl>
        </Panel>

        <Panel title="وضعیت پردازش پست‌ها" description="آمار از آخرین پست‌های برگشتی API محاسبه شده است." className="span-8">
          {statusCounts.length ? (
            <div className="telegram-status-grid">
              {statusCounts.map((item) => (
                <article className="summary-item" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <Badge tone={item.tone}>وضعیت</Badge>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="هنوز پستی برای نمایش نیست" description="وقتی جمع‌کننده داده پست‌های مجاز را دریافت کند، وضعیت‌ها اینجا دیده می‌شوند." />
          )}
        </Panel>

        <Panel title="کانال‌های متصل" description="فقط کانال‌هایی که در فهرست مجاز عددی قرار دارند نمایش داده می‌شوند." className="span-12">
          {sources.length ? (
            <div className="telegram-source-grid">
              {sources.map((source) => (
                <article className="telegram-source-card" key={source.id}>
                  <div>
                    <strong>{source.title}</strong>
                    <span>{source.username ? `@${source.username}` : source.chatId}</span>
                  </div>
                  <dl className="meta-list">
                    <MetaItem label="شناسه گفتگو" value={source.chatId} />
                    <MetaItem label="آخرین پیام" value={source.lastMessageId} />
                    <MetaItem label="آخرین مشاهده" value={source.lastSeenAt} />
                  </dl>
                  <Badge tone={source.tone}>{source.protectedContent ? "محافظت‌شده" : "فعال"}</Badge>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="کانالی از API دریافت نشد" description="اگر سلامت اتصال درست است، فهرست مجاز یا اجرای جمع‌کننده داده را بررسی کن." />
          )}
        </Panel>

        <Panel title="آخرین پست‌ها" description="همه وضعیت‌ها، شامل دریافت‌شده، تحلیل‌شده، خطا، حذف‌شده و نیازمند متن گفتار." className="span-12">
          {posts.length ? (
            <div className="telegram-post-list">
              {posts.map((post) => (
                <TelegramPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState title="پستی برای نمایش نیست" description="جمع‌کننده داده باید حداقل یک پست از کانال‌های مجاز دریافت کند." />
          )}
        </Panel>

        <Panel title="پست‌های تحلیل‌شده" description="مواردی که خلاصه و استخراج ادعا برایشان ذخیره شده است." className="span-8">
          {analyzedPosts.length ? (
            <div className="telegram-post-list telegram-post-list--compact">
              {analyzedPosts.slice(0, 10).map((post) => (
                <TelegramPostCard key={post.id} post={post} compact />
              ))}
            </div>
          ) : (
            <EmptyState title="هنوز تحلیل آماده نیست" description="اگر پست‌ها در وضعیت دریافت‌شده مانده‌اند، لاگ بک‌اند و کلید OpenAI را بررسی کن." />
          )}
        </Panel>

        <Panel title="خطاها و لاگ‌ها" description="خطاهای پردازش و مسیر بررسی جمع‌کننده داده." className="span-4">
          <div className="telegram-log-stack">
            {failedPosts.map((post) => (
              <article className="alert-row" key={post.id}>
                <div className="alert-row__icon" data-tone="danger"><StatusDot tone="danger" /></div>
                <div>
                  <strong>{post.sourceTitle}</strong>
                  <span>{post.errorMessage || post.statusLabel}</span>
                </div>
                <Badge tone="danger">{post.statusLabel}</Badge>
              </article>
            ))}
            {telegramLogs.map((log) => (
              <article className="event-row" key={log.id}>
                <div className="event-row__icon" data-tone={log.tone}><StatusDot tone={log.tone} /></div>
                <div>
                  <strong>{log.title}</strong>
                  <span>{log.description}</span>
                </div>
                <Badge tone={log.tone}>{log.status}</Badge>
              </article>
            ))}
            {!failedPosts.length && !telegramLogs.length ? (
              <EmptyState title="لاگ مرتبطی در API دیده نشد" description="برای دیدن لاگ خام جمع‌کننده داده از دستورهای پایین روی VPS استفاده کن." />
            ) : null}
            <div className="telegram-command-stack" aria-label="دستورهای بررسی روی VPS">
              <code>docker compose logs --tail=150 telegram-financial-collector</code>
              <code>docker compose logs --tail=200 backend</code>
            </div>
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}

function TelegramPostCard({ post, compact = false }: { post: TelegramFinancialPost; compact?: boolean }) {
  const preview = post.summary || post.rawText || post.caption || post.transcript || post.errorMessage || "متن قابل نمایش برای این پست ذخیره نشده است.";
  const canAnalyze = !["deleted", "protected_skipped"].includes(post.status);

  return (
    <article className="telegram-post-card" data-compact={compact ? "true" : undefined}>
      <header className="telegram-post-card__header">
        <div>
          <strong>{post.sourceTitle}</strong>
          <span>{post.publishedAt} · پیام {post.messageId}</span>
        </div>
        <Badge tone={post.tone}>{post.statusLabel}</Badge>
      </header>

      <p>{preview}</p>

      {!compact ? (
        <>
          <dl className="telegram-post-card__meta">
            <MetaItem label="رسانه" value={post.mediaType} />
            <MetaItem label="رخداد" value={post.eventType} />
            <MetaItem label="زمان تحلیل" value={post.analyzedAt} />
            <MetaItem label="اطمینان" value={post.confidence} />
            <MetaItem label="احساس بازار" value={post.sentiment} />
            <MetaItem label="فوریت" value={post.urgency} />
          </dl>

          <SignalList title="موضوعات بازار" items={post.marketTopics} tone="accent" />
          <SignalList title="ریسک‌ها" items={post.riskSignals} tone="warning" />
          <SignalList title="فرصت‌ها" items={post.opportunitySignals} tone="success" />
          <SignalList title="نیاز به راستی‌آزمایی" items={post.verificationNeeds} tone="danger" />

          <div className="row-actions">
            {post.sourceUrl ? <LinkButton href={post.sourceUrl} variant="ghost" size="sm" icon="arrow">باز کردن منبع</LinkButton> : null}
            <TelegramFinancialPostActions postId={post.id} disabled={!canAnalyze} />
          </div>
        </>
      ) : null}
    </article>
  );
}

function SignalList({ title, items, tone }: { title: string; items: string[]; tone: "accent" | "success" | "warning" | "danger" }) {
  if (!items.length) return null;
  return (
    <section className="telegram-signal-list">
      <strong>{title}</strong>
      <div>
        {items.slice(0, 5).map((item) => (
          <Badge key={item} tone={tone}>{item}</Badge>
        ))}
      </div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
