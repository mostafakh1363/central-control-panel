import type { ReactNode } from "react";
import type { Tone } from "@/lib/data";

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className="badge" data-tone={tone}>{children}</span>;
}

export function Button({
  variant = "secondary",
  size = "md",
  children,
  type = "button"
}: {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  children: ReactNode;
  type?: "button" | "submit";
}) {
  return <button className="button" data-variant={variant} data-size={size} type={type}>{children}</button>;
}

export function MetricCard({
  label,
  value,
  description,
  tone
}: {
  label: string;
  value: string;
  description: string;
  tone: Tone;
}) {
  return (
    <article className="metric-card" data-tone={tone}>
      <div className="metric-card__icon" aria-hidden="true" />
      <div className="metric-card__content">
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{description}</span>
      </div>
    </article>
  );
}

export function Panel({
  title,
  description,
  action,
  children,
  className
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={["panel", className].filter(Boolean).join(" ")}>
      <header className="panel__header">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {action}
      </header>
      <div className="panel__body">{children}</div>
    </section>
  );
}

export function ProgressBar({ value, tone }: { value: number; tone: Tone }) {
  return (
    <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ inlineSize: `${value}%` }} data-tone={tone} />
    </div>
  );
}

export function Logo() {
  return (
    <div className="logo" aria-hidden="true">
      <span>M</span>
    </div>
  );
}

export function PageTitle({
  eyebrow,
  title,
  actions
}: {
  eyebrow: string;
  title: string;
  actions?: ReactNode;
}) {
  return (
    <div className="page-title">
      <div>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      {actions ? <div className="page-title__actions">{actions}</div> : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">+</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </section>
  );
}

export function MobilePreview() {
  return (
    <section className="mobile-preview" aria-label="نمای موبایل">
      <div className="phone-frame">
        <div className="phone-top">
          <span>07:45</span>
          <span>● ● ●</span>
        </div>
        <div className="phone-brand">
          <span className="phone-logo">M</span>
          <div>
            <strong>Mostafa</strong>
            <span>Command Center</span>
          </div>
        </div>
        <div className="phone-metrics">
          <MiniMetric label="سرورها" value="7" />
          <MiniMetric label="پروژه‌ها" value="12" />
          <MiniMetric label="وظایف" value="24" />
          <MiniMetric label="هشدار" value="3" />
        </div>
        <div className="phone-card">
          <strong>امروز</strong>
          <p>۵ تسک مهم و ۱ هشدار فوری در انتظار بررسی است.</p>
        </div>
        <div className="phone-card">
          <strong>AI Summary</strong>
          <p>اولویت امروز: Mofanex، بررسی n8n، و پیگیری یادداشت جلسه.</p>
        </div>
        <nav className="phone-nav">
          <span data-active="true">خانه</span>
          <span>وظایف</span>
          <span>پروژه‌ها</span>
          <span>AI</span>
        </nav>
      </div>
    </section>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="mini-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
