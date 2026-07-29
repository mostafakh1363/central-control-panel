import type { IconName } from "@/components/icons";

export type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

export type NavItem = {
  label: string;
  href: string;
  icon: IconName;
  mobile?: boolean;
};

export type Metric = {
  label: string;
  value: string;
  description: string;
  tone: Tone;
  href: string;
  icon: IconName;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  tone: Tone;
  owner: string;
  nextStep: string;
  openTasks: number;
};

export type Server = {
  id?: string;
  name: string;
  ip: string;
  cpu: number;
  ram: number;
  disk: number;
  status: string;
  tone: Tone;
  updatedAt: string;
  href: string;
};

export type Reminder = {
  id: string;
  time: string;
  title: string;
  project: string;
  priority: "high" | "medium" | "low";
  status: "open" | "done";
};

export type Task = {
  id: string;
  title: string;
  project: string;
  owner: string;
  due: string;
  tone: Tone;
};

export type LogEvent = {
  id: string;
  title: string;
  description: string;
  status: string;
  time: string;
  tone: Tone;
  href: string;
};

export type Alert = {
  title: string;
  description: string;
  meta: string;
  tone: Tone;
  href: string;
};

export type Workflow = {
  id?: string;
  name: string;
  project: string;
  lastRun: string;
  status: string;
  tone: Tone;
  href: string;
};

export type Conversation = {
  person: string;
  project: string;
  summary: string;
  nextAction: string;
  tone: Tone;
};

export type SafeAction = {
  id: string;
  title: string;
  description: string;
  tone: Tone;
  sensitive: boolean;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "خانه", href: "/", icon: "home", mobile: true },
  { label: "وظایف", href: "/tasks", icon: "check", mobile: true },
  { label: "پروژه‌ها", href: "/projects", icon: "folder", mobile: true },
  { label: "سرورها", href: "/servers", icon: "server", mobile: true },
  { label: "دستیار AI", href: "/ai", icon: "spark", mobile: true },
  { label: "مانیتور مالی", href: "/telegram-financial", icon: "pulse" },
  { label: "اتوماسیون", href: "/n8n", icon: "workflow" },
  { label: "مکالمات", href: "/conversations", icon: "message" },
  { label: "لاگ‌ها", href: "/logs", icon: "logs" },
  { label: "اقدام‌ها", href: "/actions", icon: "bolt" },
  { label: "تنظیمات", href: "/settings", icon: "settings" }
];

export const metrics: Metric[] = [
  {
    label: "سلامت سیستم",
    value: "خوب",
    description: "همه سرویس‌های اصلی پاسخ می‌دهند",
    tone: "success",
    href: "/servers",
    icon: "pulse"
  },
  {
    label: "وظایف امروز",
    value: "۶",
    description: "سه مورد نیازمند پیگیری سریع",
    tone: "warning",
    href: "/tasks",
    icon: "check"
  },
  {
    label: "پروژه‌های فعال",
    value: "۵",
    description: "دو پروژه در وضعیت هشدار",
    tone: "accent",
    href: "/projects",
    icon: "folder"
  },
  {
    label: "هشدارهای مهم",
    value: "۳",
    description: "یک هشدار مربوط به n8n است",
    tone: "danger",
    href: "/logs",
    icon: "alert"
  }
];

export const servers: Server[] = [
  {
    name: "AI Brain VPS",
    ip: "103.245.67.89",
    cpu: 24,
    ram: 64,
    disk: 72,
    status: "آنلاین",
    tone: "success",
    updatedAt: "۲ دقیقه پیش",
    href: "/servers"
  },
  {
    name: "Mofanex VPS",
    ip: "103.245.67.90",
    cpu: 18,
    ram: 41,
    disk: 58,
    status: "آنلاین",
    tone: "success",
    updatedAt: "۵ دقیقه پیش",
    href: "/servers"
  },
  {
    name: "سرور n8n",
    ip: "103.245.67.91",
    cpu: 36,
    ram: 78,
    disk: 66,
    status: "نیازمند بررسی",
    tone: "warning",
    updatedAt: "همین حالا",
    href: "/n8n"
  },
  {
    name: "سرور بکاپ",
    ip: "103.245.67.92",
    cpu: 12,
    ram: 28,
    disk: 49,
    status: "آنلاین",
    tone: "success",
    updatedAt: "۹ دقیقه پیش",
    href: "/servers"
  }
];

export const projects: Project[] = [
  {
    slug: "mofanex",
    name: "Mofanex",
    description: "پیگیری تأمین‌کننده‌ها، فرصت‌های صنعتی، ایمیل‌ها و تحلیل بازار تجهیزات.",
    status: "در جریان",
    progress: 72,
    tone: "accent",
    owner: "مصطفی",
    nextStep: "پیگیری تأمین‌کننده‌های باز و تکمیل ایمیل‌های بعدی.",
    openTasks: 8
  },
  {
    slug: "centralestate",
    name: "CentralEstate",
    description: "اتوماسیون محتوا، تحقیق بازار، تأیید انسانی و کنترل کیفیت خروجی.",
    status: "فعال",
    progress: 58,
    tone: "success",
    owner: "مصطفی",
    nextStep: "بررسی چرخه‌های رد و تأیید در n8n.",
    openTasks: 5
  },
  {
    slug: "ai-brain",
    name: "AI Brain",
    description: "حافظه عملیاتی، وظایف، تصمیم‌ها، لاگ‌ها و کنترل امن روی سرور.",
    status: "متصل",
    progress: 84,
    tone: "accent",
    owner: "مصطفی",
    nextStep: "وصل‌کردن کامل پنل به داده‌های زنده سرور.",
    openTasks: 4
  },
  {
    slug: "n8n",
    name: "اتوماسیون‌های n8n",
    description: "اجرای گردش‌کارها، خطاها، گزارش‌ها و اقدام‌های عملیاتی.",
    status: "هشدار",
    progress: 46,
    tone: "warning",
    owner: "مصطفی",
    nextStep: "بررسی آخرین خطای نود Google Sheets.",
    openTasks: 3
  },
  {
    slug: "dr-moshkelani",
    name: "دکتر مشکلانی",
    description: "پدل، تاجیکستان، زمین شمال، پارک فناوری و ایده‌های تجاری جلسه.",
    status: "جدید",
    progress: 18,
    tone: "warning",
    owner: "مصطفی و دکتر",
    nextStep: "تبدیل خلاصه جلسه به برنامه پیگیری قابل اجرا.",
    openTasks: 9
  }
];

export const reminders: Reminder[] = [
  {
    id: "r1",
    time: "09:00",
    title: "پیگیری زمین برای پدل و آماده‌سازی طرح اولیه",
    project: "دکتر مشکلانی",
    priority: "high",
    status: "open"
  },
  {
    id: "r2",
    time: "11:00",
    title: "هماهنگی تاجیکستان و بررسی نیاز بازار",
    project: "تحقیق بازار",
    priority: "medium",
    status: "open"
  },
  {
    id: "r3",
    time: "14:00",
    title: "بررسی کالاهای کمیاب در ایران و اندازه بازار",
    project: "Mofanex",
    priority: "medium",
    status: "open"
  },
  {
    id: "r4",
    time: "16:00",
    title: "پیگیری سرمایه‌گذار برای زمین شمال",
    project: "سرمایه‌گذاری",
    priority: "low",
    status: "open"
  },
  {
    id: "r5",
    time: "18:00",
    title: "ارسال اپ مالی برای دکتر و آماده‌سازی توضیح استفاده",
    project: "اپ مالی",
    priority: "high",
    status: "open"
  }
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "زمین مناسب برای پدل پیدا شود و طرح اولیه آماده شود.",
    project: "دکتر مشکلانی",
    owner: "مصطفی",
    due: "این هفته",
    tone: "warning"
  },
  {
    id: "t2",
    title: "نیاز بازار تاجیکستان بررسی و مسیر هماهنگی مشخص شود.",
    project: "تحقیق بازار",
    owner: "دکتر مشکلانی",
    due: "این هفته",
    tone: "accent"
  },
  {
    id: "t3",
    title: "کالاهای کمیاب ایران و بازار احتمالی آن‌ها تحلیل شود.",
    project: "Mofanex",
    owner: "دکتر مشکلانی",
    due: "باز",
    tone: "accent"
  },
  {
    id: "t4",
    title: "برای زمین شمال سرمایه‌گذار احتمالی پیدا شود.",
    project: "سرمایه‌گذاری",
    owner: "مصطفی",
    due: "باز",
    tone: "warning"
  },
  {
    id: "t5",
    title: "طرح همساده‌ها از نظر بازاریابی، سهم بازار و نمونه خارجی بررسی شود.",
    project: "Hamshadeha",
    owner: "مصطفی",
    due: "باز",
    tone: "success"
  },
  {
    id: "t6",
    title: "پارک فناوری اصفهان و فولادشهر برای گرفتن زمین دنبال شود.",
    project: "زمین و پارک فناوری",
    owner: "مصطفی",
    due: "باز",
    tone: "warning"
  }
];

export const logs: LogEvent[] = [
  {
    id: "l1",
    title: "بکاپ انجام شد",
    description: "سرور بکاپ",
    status: "موفق",
    time: "22:41",
    tone: "success",
    href: "/logs"
  },
  {
    id: "l2",
    title: "گردش‌کار n8n اجرا شد",
    description: "اتوماسیون‌های n8n",
    status: "موفق",
    time: "21:10",
    tone: "success",
    href: "/n8n"
  },
  {
    id: "l3",
    title: "یادداشت جلسه ثبت شد",
    description: "دکتر مشکلانی",
    status: "جدید",
    time: "20:55",
    tone: "accent",
    href: "/conversations"
  },
  {
    id: "l4",
    title: "هشدار در نود Google Sheets",
    description: "CentralEstate Research",
    status: "هشدار",
    time: "18:12",
    tone: "warning",
    href: "/n8n"
  },
  {
    id: "l5",
    title: "اسکن امنیتی انجام شد",
    description: "AI Brain VPS",
    status: "موفق",
    time: "16:34",
    tone: "success",
    href: "/servers"
  }
];

export const alerts: Alert[] = [
  {
    title: "مصرف RAM بالا است",
    description: "n8n Server",
    meta: "۷۸٪",
    tone: "warning",
    href: "/servers"
  },
  {
    title: "فضای دیسک نیازمند بررسی است",
    description: "AI Brain VPS",
    meta: "۷۲٪",
    tone: "warning",
    href: "/servers"
  },
  {
    title: "خطای اخیر گردش‌کار",
    description: "CentralEstate Research",
    meta: "۱ مورد",
    tone: "danger",
    href: "/n8n"
  }
];

export const workflows: Workflow[] = [
  {
    name: "مرکز فرمان تلگرام CentralEstate",
    project: "CentralEstate",
    lastRun: "امروز 09:40",
    status: "موفق",
    tone: "success",
    href: "/n8n"
  },
  {
    name: "موتور تحقیق و ایده‌پردازی",
    project: "CentralEstate",
    lastRun: "امروز 08:10",
    status: "هشدار",
    tone: "warning",
    href: "/logs"
  },
  {
    name: "پیگیری تأمین‌کننده‌های Mofanex",
    project: "Mofanex",
    lastRun: "دیروز 18:00",
    status: "آماده",
    tone: "accent",
    href: "/actions"
  },
  {
    name: "خلاصه روزانه AI Brain",
    project: "AI Brain",
    lastRun: "امروز 07:00",
    status: "موفق",
    tone: "success",
    href: "/ai"
  }
];

export const conversations: Conversation[] = [
  {
    person: "دکتر مشکلانی",
    project: "دکتر مشکلانی",
    summary: "موضوع‌های پدل، تاجیکستان، بازار ایران، زمین شمال، گروه ایتا، همساده‌ها، پارک فناوری و اپ مالی ثبت شد.",
    nextAction: "ساخت وظیفه‌های تفکیک‌شده و برنامه پیگیری.",
    tone: "accent"
  },
  {
    person: "تأمین‌کننده شیرآلات",
    project: "Mofanex",
    summary: "موجودی اولیه بررسی شده و قیمت و امکان تأمین باید پیگیری شود.",
    nextAction: "ارسال ایمیل پیگیری.",
    tone: "warning"
  },
  {
    person: "اپراتور CentralEstate",
    project: "CentralEstate",
    summary: "وضعیت گردش‌کارهای محتوا و چرخه تأیید بررسی شد.",
    nextAction: "تست بازخورد رد محتوا.",
    tone: "success"
  }
];

export const safeActions: SafeAction[] = [
  { id: "check_vps_status", title: "بررسی وضعیت VPS", description: "خواندن وضعیت سرورها بدون تغییر", tone: "success", sensitive: false, href: "/servers" },
  { id: "view_n8n_logs", title: "مشاهده لاگ‌های n8n", description: "دیدن آخرین خطاها و اجرای گردش‌کارها", tone: "accent", sensitive: false, href: "/logs" },
  { id: "run_backup", title: "اجرای بکاپ", description: "نیازمند تأیید قبل از اجرا", tone: "warning", sensitive: true, href: "/actions" },
  { id: "restart_n8n", title: "ری‌استارت n8n", description: "اقدام حساس روی سرور", tone: "danger", sensitive: true, href: "/actions" },
  { id: "generate_daily_summary", title: "ساخت خلاصه روزانه", description: "خلاصه امن از پروژه‌ها و هشدارها", tone: "accent", sensitive: false, href: "/ai" }
];
