"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui";
import { panelClientPath } from "@/lib/panel-client";

export function TelegramFinancialPostActions({ postId, disabled }: { postId: string; disabled?: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function requestReanalysis() {
    setMessage("");
    startTransition(async () => {
      try {
        const response = await fetch(panelClientPath(`/api/panel/telegram-financial/posts/${encodeURIComponent(postId)}/analyze`), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: "central-control-panel" })
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload.detail || `درخواست با خطای HTTP ${response.status} ناموفق بود.`);
        }
        setMessage("درخواست تحلیل دوباره ثبت شد.");
        router.refresh();
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "درخواست تحلیل دوباره ناموفق بود.");
      }
    });
  }

  return (
    <div className="row-actions row-actions--compact">
      <Button size="sm" variant="secondary" onClick={requestReanalysis} disabled={disabled || isPending}>
        {isPending ? "در حال ثبت" : "تحلیل دوباره"}
      </Button>
      {message ? <span className="inline-status" aria-live="polite">{message}</span> : null}
    </div>
  );
}
