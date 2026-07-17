"use client";

import { useState } from "react";
import { Badge, Button } from "@/components/ui";
import { panelClientPath } from "@/lib/panel-client";
import type { Reminder, Task } from "@/lib/data";

type StatusState = {
  pendingId?: string;
  message?: string;
};

export function TaskChecklist({ tasks }: { tasks: Task[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<StatusState>({});

  async function toggleTask(task: Task) {
    const nextDone = !done[task.id];
    setDone((value) => ({ ...value, [task.id]: nextDone }));
    setStatus({ pendingId: task.id, message: "در حال ثبت وضعیت وظیفه در `AI Brain`..." });

    const result = await postPanel(`/api/panel/tasks/${encodeURIComponent(task.id)}/done`, { done: nextDone });

    if (!result.ok) {
      setDone((value) => ({ ...value, [task.id]: !nextDone }));
      setStatus({ message: result.message });
      return;
    }

    setStatus({ message: nextDone ? "وظیفه در `AI Brain` انجام‌شده ثبت شد." : "وظیفه دوباره باز شد." });
  }

  return (
    <div className="task-board">
      {tasks.map((task) => {
        const isDone = Boolean(done[task.id]);
        const isPending = status.pendingId === task.id;

        return (
          <article className="task-card" key={task.id} data-done={isDone ? "true" : undefined}>
            <div className="task-card__top">
              <Badge tone={task.tone}>{task.project}</Badge>
              <span>{task.due}</span>
            </div>
            <h3>{task.title}</h3>
            <p>مسئول: {task.owner}</p>
            <div className="row-actions">
              <Button size="sm" variant={isDone ? "secondary" : "primary"} disabled={isPending} onClick={() => toggleTask(task)}>
                {isPending ? "در حال ثبت" : isDone ? "بازگردانی" : "انجام شد"}
              </Button>
              <Button size="sm" variant="ghost" disabled={isPending} onClick={() => setStatus({ message: "برای زمان‌بندی دوباره، مسیر `API` باید در بک‌اند فعال شود." })}>
                زمان‌بندی دوباره
              </Button>
            </div>
          </article>
        );
      })}
      {status.message ? (
        <section className="action-status" aria-live="polite">
          {status.message}
        </section>
      ) : null}
    </div>
  );
}

export function ReminderChecklist({ reminders }: { reminders: Reminder[] }) {
  const [done, setDone] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(reminders.filter((item) => item.status === "done").map((item) => [item.id, true]))
  );
  const [status, setStatus] = useState<StatusState>({});

  async function toggleReminder(item: Reminder) {
    const nextDone = !done[item.id];
    setDone((value) => ({ ...value, [item.id]: nextDone }));
    setStatus({ pendingId: item.id, message: "در حال ثبت وضعیت یادآوری در `AI Brain`..." });

    const result = await postPanel(`/api/panel/reminders/${encodeURIComponent(item.id)}/done`, { done: nextDone });

    if (!result.ok) {
      setDone((value) => ({ ...value, [item.id]: !nextDone }));
      setStatus({ message: result.message });
      return;
    }

    setStatus({ message: nextDone ? "یادآوری در `AI Brain` انجام‌شده ثبت شد." : "یادآوری دوباره باز شد." });
  }

  return (
    <div className="reminder-list">
      {reminders.map((item) => {
        const isDone = Boolean(done[item.id]);
        const isPending = status.pendingId === item.id;

        return (
          <label className="reminder-row" key={item.id} data-done={isDone ? "true" : undefined}>
            <input checked={isDone} disabled={isPending} type="checkbox" onChange={() => toggleReminder(item)} />
            <time>{item.time}</time>
            <span>
              <strong>{item.title}</strong>
              <small>{item.project}</small>
            </span>
            <i data-priority={item.priority} />
          </label>
        );
      })}
      {status.message ? (
        <section className="action-status" aria-live="polite">
          {status.message}
        </section>
      ) : null}
    </div>
  );
}

async function postPanel(path: string, body: unknown): Promise<{ ok: true; message?: string } | { ok: false; message: string }> {
  try {
    const response = await fetch(panelClientPath(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const detail = await readDetail(response);
      return { ok: false, message: detail || "اتصال به `AI Brain API` ناموفق بود." };
    }

    return { ok: true };
  } catch {
    return { ok: false, message: "مرورگر نتوانست به `API proxy` پنل وصل شود." };
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
