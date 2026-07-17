"use client";

import { useMemo, useState } from "react";
import { Badge, Button } from "@/components/ui";
import type { LogEvent, Tone } from "@/lib/data";

type LogFilter = "all" | Tone;

const filters: { label: string; value: LogFilter }[] = [
  { label: "همه", value: "all" },
  { label: "موفق", value: "success" },
  { label: "هشدار", value: "warning" },
  { label: "خطا", value: "danger" },
  { label: "اطلاعات", value: "accent" }
];

export function LogList({ logs }: { logs: LogEvent[] }) {
  const [filter, setFilter] = useState<LogFilter>("all");
  const [selected, setSelected] = useState<LogEvent | null>(logs[0] || null);

  const filteredLogs = useMemo(() => {
    if (filter === "all") return logs;
    return logs.filter((log) => log.tone === filter);
  }, [filter, logs]);

  return (
    <div className="log-layout">
      <div className="filter-bar" aria-label="فیلتر لاگ‌ها">
        {filters.map((item) => (
          <Button key={item.value} size="sm" variant={filter === item.value ? "primary" : "secondary"} onClick={() => setFilter(item.value)}>
            {item.label}
          </Button>
        ))}
      </div>

      <div className="data-table">
        <div className="data-table__row data-table__head">
          <span>Time</span><span>Event</span><span>Source</span><span>Status</span><span>Action</span>
        </div>
        {filteredLogs.map((log) => (
          <div className="data-table__row" key={log.id}>
            <time>{log.time}</time>
            <strong>{log.title}</strong>
            <span>{log.description}</span>
            <Badge tone={log.tone}>{log.status}</Badge>
            <Button size="sm" variant="secondary" onClick={() => setSelected(log)}>باز کردن</Button>
          </div>
        ))}
      </div>

      {filteredLogs.length === 0 ? <section className="action-status">برای این فیلتر لاگی پیدا نشد.</section> : null}

      {selected ? (
        <section className="log-detail" aria-live="polite">
          <div>
            <span>جزئیات لاگ</span>
            <strong>{selected.title}</strong>
          </div>
          <p>{selected.description}</p>
          <dl className="meta-list">
            <div><dt>Time</dt><dd>{selected.time}</dd></div>
            <div><dt>Status</dt><dd>{selected.status}</dd></div>
            <div><dt>ID</dt><dd>{selected.id}</dd></div>
          </dl>
        </section>
      ) : null}
    </div>
  );
}
