"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";
import { Badge, Logo } from "./ui";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar" aria-label="ناوبری اصلی">
      <div className="brand">
        <Logo />
        <div className="brand__copy">
          <strong>Mostafa</strong>
          <span>Command Center</span>
        </div>
      </div>

      <nav className="nav" aria-label="بخش‌های اپ">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href} className="nav__item" data-active={isActive ? "true" : undefined}>
              <span className="nav__icon" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__status">
        <div className="status-card">
          <div className="status-card__top">
            <span>AI Brain Status</span>
            <Badge tone="success">Online</Badge>
          </div>
          <div className="status-card__brain" aria-hidden="true">✣</div>
          <p>همه سیستم‌ها فعال هستند</p>
          <button type="button">جزئیات بیشتر</button>
        </div>

        <div className="user-card">
          <div className="avatar">MK</div>
          <div>
            <strong>Mostafa M.</strong>
            <span>مدیر سیستم</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
