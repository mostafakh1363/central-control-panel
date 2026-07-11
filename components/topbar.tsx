import { Button } from "./ui";

export function Topbar() {
  return (
    <header className="topbar">
      <label className="search">
        <span aria-hidden="true">⌕</span>
        <input placeholder="جستجو در پروژه‌ها، سرورها، وظایف، مکالمات..." />
      </label>

      <div className="topbar__meta">
        <time>07:45 · ۱۴۰۴ خرداد ۱۲</time>
        <button className="icon-button" aria-label="نوتیفیکیشن‌ها" type="button">3</button>
        <button className="icon-button" aria-label="تغییر تم" type="button">☼</button>
        <Button variant="primary">Ask AI</Button>
      </div>
    </header>
  );
}
