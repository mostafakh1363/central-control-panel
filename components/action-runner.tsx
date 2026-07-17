"use client";

import { useState } from "react";
import { Badge, Button, LinkButton } from "@/components/ui";
import { safeActions as fallbackActions, type SafeAction } from "@/lib/data";
import { panelClientPath } from "@/lib/panel-client";

type RunnerState = {
  pendingId?: string;
  message: string;
};

export function ActionRunner({ actions = fallbackActions }: { actions?: SafeAction[] }) {
  const [state, setState] = useState<RunnerState>({ message: "هنوز هیچ اکشنی اجرا نشده است." });

  async function runAction(action: SafeAction) {
    setState({ pendingId: action.id, message: "در حال ارسال درخواست به `AI Brain API`..." });

    const result = action.sensitive ? await requestApproval(action) : await runSafeReadAction(action);

    setState({
      message: result.ok ? result.message : result.message,
      pendingId: undefined
    });
  }

  return (
    <div className="cards-grid">
      {actions.map((action) => {
        const isPending = state.pendingId === action.id;

        return (
          <article className="action-card" key={action.id}>
            <div className="project-card__header">
              <div className="project-row__icon" data-tone={action.tone} />
              <div>
                <strong>{action.title}</strong>
                <span>{action.description}</span>
              </div>
              <Badge tone={action.tone}>{action.sensitive ? "نیازمند تأیید" : "ایمن"}</Badge>
            </div>
            <div className="row-actions">
              <Button size="sm" variant={action.sensitive ? "danger" : "primary"} disabled={isPending} onClick={() => runAction(action)}>
                {isPending ? "در حال اجرا" : action.sensitive ? "درخواست تأیید" : "اجرا"}
              </Button>
              <LinkButton size="sm" variant="ghost" href={action.href}>
                جزئیات
              </LinkButton>
            </div>
          </article>
        );
      })}
      <section className="action-status" aria-live="polite">
        {state.message}
      </section>
    </div>
  );
}

async function runSafeReadAction(action: SafeAction): Promise<{ ok: boolean; message: string }> {
  const path = safeReadPath(action.id);
  const response = await requestPanel(path, { method: "GET" });

  if (!response.ok) {
    return response;
  }

  const count = countPayloadRows(response.data);
  return {
    ok: true,
    message: count > 0 ? `${action.title} از ` + "`AI Brain API`" + ` خوانده شد. تعداد رکورد: ${count}` : `${action.title} از ` + "`AI Brain API`" + " خوانده شد."
  };
}

async function requestApproval(action: SafeAction): Promise<{ ok: boolean; message: string }> {
  const response = await requestPanel(`/api/panel/actions/${encodeURIComponent(action.id)}/request-approval`, {
    method: "POST",
    body: JSON.stringify({
      source: "central-control-panel",
      reason: action.title,
      request_payload: {
        action_id: action.id,
        title: action.title
      }
    })
  });

  if (!response.ok) {
    return response;
  }

  return { ok: true, message: `درخواست تأیید برای ${action.title} در ` + "`AI Brain API`" + " ثبت شد." };
}

async function requestPanel(path: string, init: RequestInit): Promise<{ ok: true; data: unknown } | { ok: false; message: string }> {
  try {
    const response = await fetch(panelClientPath(path), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers || {})
      }
    });

    if (!response.ok) {
      return { ok: false, message: (await readDetail(response)) || "اتصال به `AI Brain API` ناموفق بود." };
    }

    return { ok: true, data: await response.json().catch(() => null) };
  } catch {
    return { ok: false, message: "مرورگر نتوانست به `API proxy` پنل وصل شود." };
  }
}

function safeReadPath(actionId: string) {
  if (actionId.includes("n8n") || actionId.includes("log")) return "/api/panel/logs?source=all&limit=30";
  if (actionId.includes("summary")) return "/api/panel/overview";
  if (actionId.includes("vps") || actionId.includes("server")) return "/api/panel/servers";
  return "/api/panel/actions";
}

function countPayloadRows(data: unknown) {
  if (!data || typeof data !== "object") return 0;
  const value = data as Record<string, unknown>;
  const firstArray = Object.values(value).find(Array.isArray);
  return Array.isArray(firstArray) ? firstArray.length : 0;
}

async function readDetail(response: Response) {
  try {
    const data = (await response.json()) as { detail?: string; message?: string };
    return data.detail || data.message || "";
  } catch {
    return "";
  }
}
