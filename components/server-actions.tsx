"use client";

import { useState } from "react";
import { Button, LinkButton } from "@/components/ui";

type ServerActionState = {
  pending?: "health" | "restart";
  message?: string;
};

export function ServerActions({ serverId }: { serverId: string }) {
  const [state, setState] = useState<ServerActionState>({});

  async function run(action: "health" | "restart") {
    setState({ pending: action, message: "در حال ارسال درخواست به `AI Brain API`..." });
    const endpoint = action === "health" ? "health-check" : "restart-request";

    try {
      const response = await fetch(`/api/panel/servers/${encodeURIComponent(serverId)}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "central-control-panel" })
      });

      if (!response.ok) {
        setState({ message: (await readDetail(response)) || "اتصال به `AI Brain API` ناموفق بود." });
        return;
      }

      setState({
        message: action === "health" ? "درخواست health check ثبت شد." : "درخواست restart برای تأیید ثبت شد."
      });
    } catch {
      setState({ message: "مرورگر نتوانست به `API proxy` پنل وصل شود." });
    }
  }

  return (
    <>
      <div className="row-actions">
        <LinkButton size="sm" variant="secondary" href="/logs">مشاهده لاگ</LinkButton>
        <Button size="sm" variant="secondary" disabled={state.pending === "health"} onClick={() => run("health")}>
          {state.pending === "health" ? "در حال چک" : "چک سرویس"}
        </Button>
        <Button size="sm" variant="danger" disabled={state.pending === "restart"} onClick={() => run("restart")}>
          {state.pending === "restart" ? "در حال ثبت" : "درخواست Restart"}
        </Button>
      </div>
      {state.message ? <section className="action-status">{state.message}</section> : null}
    </>
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
