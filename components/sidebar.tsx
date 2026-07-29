"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons";
import { Badge, Logo } from "@/components/ui";
import { navItems } from "@/lib/data";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar" aria-label="ناوبری اصلی">
      <Link className="brand" href="/">
        <Logo />
        <span className="brand__copy">
          <strong>Mostafa</strong>
          <span>Command Center</span>
        </span>
      </Link>

      <nav className="nav" aria-label="بخش‌های پنل">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href} className="nav__item" data-active={isActive ? "true" : undefined}>
              <span className="nav__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__status">
        <section className="status-card">
          <div className="status-card__top">
            <span>وضعیت پنل</span>
            <Badge tone="success">فعال</Badge>
          </div>
          <div className="status-card__brain" aria-hidden="true">
            <Icon name="pulse" />
          </div>
          <p>نمای موبایل و دسکتاپ با داده‌های مشترک پنل هماهنگ است.</p>
          <Link className="button" data-variant="secondary" data-size="sm" href="/servers">
            <span>بررسی سرورها</span>
          </Link>
        </section>

        <section className="user-card">
          <div className="avatar">MK</div>
          <div>
            <strong>Mostafa</strong>
            <span>مدیر سیستم</span>
          </div>
        </section>
      </div>
    </aside>
  );
}
