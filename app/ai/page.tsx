import { AppShell } from "@/components/app-shell";
import { Button, PageTitle, Panel } from "@/components/ui";

export default function AiPage() {
  return (
    <AppShell>
      <PageTitle
        eyebrow="AI Operations Assistant"
        title="AI Assistant"
        actions={<Button variant="primary">New chat</Button>}
      />

      <section className="dashboard-grid">
        <Panel title="چت عملیاتی" description="برای پرسیدن وضعیت، ساخت تسک، خلاصه پروژه و بررسی خطاها" className="span-8">
          <div className="chat-shell">
            <div className="chat-message assistant">
              <strong>AI Assistant</strong>
              <p>امروز ۶ تسک باز داری. مهم‌ترین مورد: تبدیل خلاصه جلسه دکتر مشکلانی به برنامه پیگیری و بررسی خطای n8n.</p>
            </div>
            <div className="chat-message user">
              <strong>Mostafa</strong>
              <p>وضعیت پروژه‌های من را خلاصه کن.</p>
            </div>
            <label className="chat-input">
              <input placeholder="پیام یا دستور عملیاتی بنویس..." />
              <Button variant="primary">Send</Button>
            </label>
          </div>
        </Panel>

        <Panel title="Promptهای سریع" description="دستورهای پرکاربرد" className="span-4">
          <div className="prompt-list">
            <button>وضعیت همه پروژه‌ها را بده</button>
            <button>از مکالمه آخر تسک بساز</button>
            <button>لاگ‌های n8n را بررسی کن</button>
            <button>یادآوری‌های امروز را خلاصه کن</button>
            <button>قدم بعدی Mofanex چیست؟</button>
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
