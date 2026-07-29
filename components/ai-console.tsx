"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui";
import { panelClientPath } from "@/lib/panel-client";

const prompts = [
  "وضعیت همه پروژه‌ها را خلاصه کن",
  "هشدارهای سرور را بررسی کن",
  "از مکالمه آخر وظیفه بساز",
  "کارهای امروز را اولویت‌بندی کن",
  "قدم بعدی Mofanex چیست؟"
];

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

export function AiConsole() {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "اگر کلید پنل روی سرور تنظیم شده باشد، به AI Brain API وصل هستم. سؤال عملیاتی خودت را بفرست."
    }
  ]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();

    if (!text || isSending) {
      return;
    }

    setInput("");
    setIsSending(true);
    setMessages((value) => [...value, { role: "user", text }]);

    const response = await askAi(text);

    setMessages((value) => [
      ...value,
      {
        role: "assistant",
        text: response
      }
    ]);
    setIsSending(false);
  }

  return (
    <div className="chat-shell">
      <div className="chat-history" aria-live="polite">
        {messages.map((message, index) => (
          <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
            <strong>{message.role === "assistant" ? "دستیار AI" : "مصطفی"}</strong>
            <p>{message.text}</p>
          </div>
        ))}
        {isSending ? (
          <div className="chat-message assistant">
            <strong>دستیار AI</strong>
            <p>در حال دریافت پاسخ از AI Brain API...</p>
          </div>
        ) : null}
      </div>

      <div className="prompt-list">
        {prompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => setInput(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <form className="chat-input" onSubmit={sendMessage}>
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="پیام یا دستور عملیاتی بنویس..." />
        <Button variant="primary" type="submit" disabled={isSending}>
          {isSending ? "در حال ارسال" : "ارسال"}
        </Button>
      </form>
    </div>
  );
}

async function askAi(message: string) {
  try {
    const response = await fetch(panelClientPath("/api/panel/ai/chat"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        context_scope: "allowed_projects",
        max_results: 8
      })
    });

    if (!response.ok) {
      return (await readDetail(response)) || "اتصال به AI Brain API ناموفق بود.";
    }

    const data = (await response.json()) as { answer?: string; message?: string; response?: string };
    return data.answer || data.response || data.message || "پاسخ از AI Brain API دریافت شد، ولی متن پاسخ خالی بود.";
  } catch {
    return "مرورگر نتوانست به پراکسی API پنل وصل شود.";
  }
}

async function readDetail(response: Response) {
  try {
    const data = (await response.json()) as { detail?: string; message?: string };
    return data.detail || data.message || "";
  } catch {
    return "";
  }
}
