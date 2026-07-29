import { AppShell } from "@/components/app-shell";
import { Icon } from "@/components/icons";
import { Badge, EmptyState, LinkButton, PageTitle, Panel } from "@/components/ui";
import { getConversationsData, sourceLabel, sourceTone } from "@/lib/ai-brain";

export const dynamic = "force-dynamic";

export default async function ConversationsPage() {
  const result = await getConversationsData();
  const conversations = result.data;

  return (
    <AppShell>
      <PageTitle
        eyebrow="حافظه مکالمات"
        title="مکالمه‌ها"
        description="هر مکالمه به پروژه، نتیجه و قدم بعدی وصل می‌شود."
        actions={
          <>
            <Badge tone={sourceTone(result.source)}>{sourceLabel(result.source)}</Badge>
            <LinkButton href="/tasks" variant="secondary" icon="check">ساخت وظیفه</LinkButton>
            <LinkButton href="/ai" variant="primary" icon="spark">خلاصه‌سازی با AI</LinkButton>
          </>
        }
      />

      {result.error ? <section className="action-status">{result.error}</section> : null}

      <section className="dashboard-grid">
        <Panel title="خلاصه مکالمه‌ها" description="برای پیگیری جلسه‌ها و تبدیل خروجی مکالمه به کار عملیاتی." className="span-12">
          {conversations.length ? (
            <div className="cards-grid">
              {conversations.map((conversation) => (
                <article className="conversation-card" key={`${conversation.person}-${conversation.project}`}>
                  <div className="project-card__header">
                    <div className="project-row__icon" data-tone={conversation.tone}>
                      <Icon name="message" />
                    </div>
                    <div>
                      <strong>{conversation.person}</strong>
                      <span>{conversation.project}</span>
                    </div>
                    <Badge tone={conversation.tone}>ذخیره‌شده</Badge>
                  </div>
                  <p>{conversation.summary}</p>
                  <div className="next-action">
                    <span>قدم بعدی</span>
                    <strong>{conversation.nextAction}</strong>
                  </div>
                  <div className="row-actions">
                    <LinkButton size="sm" variant="secondary" href="/tasks">ساخت وظیفه</LinkButton>
                    <LinkButton size="sm" variant="ghost" href="/ai">پرسش از AI</LinkButton>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="مکالمه‌ای پیدا نشد" description="مسیر API مکالمه‌ها داده‌ای برای نمایش برنگرداند." />
          )}
        </Panel>
      </section>
    </AppShell>
  );
}
