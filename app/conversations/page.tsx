import { AppShell } from "@/components/app-shell";
import { Badge, Button, PageTitle, Panel } from "@/components/ui";
import { conversations } from "@/lib/data";

export default function ConversationsPage() {
  return (
    <AppShell>
      <PageTitle
        eyebrow="Conversation Memory"
        title="مکالمات"
        actions={
          <>
            <Button variant="secondary">Summarize call</Button>
            <Button variant="primary">Add conversation</Button>
          </>
        }
      />

      <section className="dashboard-grid">
        <Panel title="خلاصه مکالمه‌ها" description="هر مکالمه به پروژه، نتیجه و قدم بعدی وصل می‌شود" className="span-12">
          <div className="cards-grid">
            {conversations.map((conversation) => (
              <article className="conversation-card" key={conversation.person}>
                <div className="project-card__header">
                  <div className="project-row__icon" data-tone={conversation.tone} />
                  <div>
                    <strong>{conversation.person}</strong>
                    <span>{conversation.project}</span>
                  </div>
                  <Badge tone={conversation.tone}>Saved</Badge>
                </div>
                <p>{conversation.summary}</p>
                <div className="next-action">
                  <span>Next action</span>
                  <strong>{conversation.nextAction}</strong>
                </div>
                <div className="row-actions">
                  <Button size="sm" variant="secondary">Create task</Button>
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
