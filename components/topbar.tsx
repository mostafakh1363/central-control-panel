import Link from "next/link";
import { Icon } from "@/components/icons";
import { LinkButton } from "@/components/ui";

export function Topbar() {
  return (
    <header className="topbar">
      <a className="skip-link" href="#main-content">
        رفتن به محتوا
      </a>
      <label className="search" aria-label="جستجو در پنل">
        <Icon name="search" />
        <input placeholder="جستجو در پروژه‌ها، سرورها، وظایف و لاگ‌ها" />
      </label>

      <div className="topbar__meta">
        <span className="live-pill">
          <span aria-hidden="true" />
          زنده
        </span>
        <Link className="icon-button" href="/tasks" aria-label="رفتن به وظایف">
          <Icon name="bell" />
          <small>۳</small>
        </Link>
        <Link className="icon-button" href="/settings" aria-label="رفتن به تنظیمات">
          <Icon name="moon" />
        </Link>
        <LinkButton href="/ai" variant="primary" icon="spark">
          Ask AI
        </LinkButton>
      </div>
    </header>
  );
}
