"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons";
import { navItems } from "@/lib/data";

export function MobileNav() {
  const pathname = usePathname();
  const items = navItems.filter((item) => item.mobile);

  return (
    <nav className="mobile-nav" aria-label="ناوبری موبایل">
      {items.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link key={item.href} href={item.href} className="mobile-nav__item" data-active={isActive ? "true" : undefined}>
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
