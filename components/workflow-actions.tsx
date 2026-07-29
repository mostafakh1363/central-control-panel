"use client";

import { useState } from "react";
import { Button, LinkButton } from "@/components/ui";
import { panelClientPath } from "@/lib/panel-client";

export function WorkflowActions({ workflowId }: { workflowId: string }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function requestExecution() {
    setPending(true);
    setMessage("در حال ثبت درخواست اجرای گردش‌کار...");

    try {
      const response = await fetch(panelClientPath(`/api/panel/workflows/${encodeURIComponent(workflowId)}/execute-request`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "central-control-panel" })
      });

      setMessage(response.ok ? "درخواست اجرای گردش‌کار ثبت شد." : (await readDetail(response)) || "اتصال به AI Brain API ناموفق بود.");
    } catch {
      setMessage("مرورگر نتوانست به پراکسی API پنل وصل شود.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="row-actions row-actions--compact">
      <LinkButton href="/logs" size="sm" variant="secondary">جزئیات</LinkButton>
      <Button size="sm" variant="primary" disabled={pending} onClick={requestExecution}>
        {pending ? "در حال ثبت" : "درخواست اجرا"}
      </Button>
      {message ? <small className="inline-status">{message}</small> : null}
    </div>
  );
}

async function readDetail(response: Response) {
  try {
    const data = (await response.json()) as { detail?: string; message?: string };
    return data.detail || data.message || "";
  } catch {
    return "";
  }
}
