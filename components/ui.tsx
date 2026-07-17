import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import type { Tone } from "@/lib/data";

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className="badge" data-tone={tone}>
      {children}
    </span>
  );
}

export function Button({
  variant = "secondary",
  size = "md",
  children,
  type = "button",
  onClick,
  disabled
}: {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button className="button" data-variant={variant} data-size={size} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "secondary",
  size = "md",
  icon,
  children
}: {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  icon?: IconName;
  children: ReactNode;
}) {
  return (
    <Link className="button" data-variant={variant} data-size={size} href={href}>
      {icon ? <Icon name={icon} className="button__icon" /> : null}
      <span>{children}</span>
    </Link>
  );
}

export function MetricCard({
  label,
  value,
  description,
  tone,
  href,
  icon
}: {
  label: string;
  value: string;
  description: string;
  tone: Tone;
  href: string;
  icon: IconName;
}) {
  return (
    <Link className="metric-card" data-tone={tone} href={href}>
      <span className="metric-card__icon" aria-hidden="true">
        <Icon name={icon} />
      </span>
      <span className="metric-card__content">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{description}</small>
      </span>
    </Link>
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
        {action ? <div className="panel__action">{action}</div> : null}
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
      <Icon name="shield" />
    </div>
  );
}

export function PageTitle({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="page-title">
      <div>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        {description ? <span>{description}</span> : null}
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
      <div className="empty-state__icon" aria-hidden="true">
        <Icon name="plus" />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </section>
  );
}

export function StatusDot({ tone }: { tone: Tone }) {
  return <span className="status-dot" data-tone={tone} aria-hidden="true" />;
}
