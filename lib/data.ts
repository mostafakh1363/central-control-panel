export type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

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
  name: string;
  ip: string;
  cpu: number;
  ram: number;
  disk: number;
  status: string;
  tone: Tone;
};

export type Reminder = {
  id: string;
  time: string;
  title: string;
  project: string;
  priority: "high" | "medium" | "low";
  status: "open" | "done";
};

export const metrics = [
  {
    label: "سرورهای فعال",
    value: "7",
    description: "همه آنلاین",
    tone: "accent" as Tone
  },
  {
    label: "پروژه‌های فعال",
    value: "12",
    description: "+2 این هفته",
    tone: "success" as Tone
  },
  {
    label: "وظایف امروز",
    value: "24",
    description: "۶ در انتظار",
    tone: "warning" as Tone
  },
  {
    label: "هشدارهای مهم",
    value: "3",
    description: "۱ نیاز به بررسی",
    tone: "danger" as Tone
  }
];

export const projects: Project[] = [
  {
    slug: "mofanex",
    name: "Mofanex",
    description: "پلتفرم تحلیل بازار، supplier follow-up و مدیریت فرصت‌های صنعتی",
    status: "در جریان",
    progress: 72,
    tone: "accent",
    owner: "Mostafa",
    nextStep: "تکمیل follow-up supplierها و اتصال ایمیل‌ها",
    openTasks: 8
  },
  {
    slug: "centralestate",
    name: "CentralEstate",
    description: "سیستم رسانه‌ای، research engine و تولید محتوای فارسی بازار کانادا",
    status: "فعال",
    progress: 58,
    tone: "success",
    owner: "Mostafa",
    nextStep: "بازبینی workflowهای reject و approval",
    openTasks: 5
  },
  {
    slug: "ai-brain",
    name: "AI Brain / VPS",
    description: "حافظه عملیاتی، تسک‌ها، تصمیم‌ها و context پروژه‌ها",
    status: "متصل",
    progress: 84,
    tone: "accent",
    owner: "Mostafa",
    nextStep: "اتصال UI به API واقعی VPS Assistant",
    openTasks: 4
  },
  {
    slug: "n8n",
    name: "n8n Automations",
    description: "اتوماسیون‌ها، اجراها، خطاها و فرمان‌های عملیاتی",
    status: "نیازمند بررسی",
    progress: 46,
    tone: "warning",
    owner: "Mostafa",
    nextStep: "بررسی آخرین خطای Google Sheets node",
    openTasks: 3
  },
  {
    slug: "dr-moshkelani",
    name: "Dr. Moshkelani Initiatives",
    description: "پدل، تاجیکستان، زمین شمال، پارک فناوری و طرح همساده‌ها",
    status: "جدید",
    progress: 18,
    tone: "warning",
    owner: "Mostafa / Dr.",
    nextStep: "تبدیل خلاصه جلسه به taskهای قابل پیگیری",
    openTasks: 9
  }
];

export const servers: Server[] = [
  {
    name: "VPS-01 (AI Brain)",
    ip: "103.245.67.89",
    cpu: 24,
    ram: 64,
    disk: 72,
    status: "آنلاین",
    tone: "success"
  },
  {
    name: "VPS-02 (Mofanex)",
    ip: "103.245.67.90",
    cpu: 18,
    ram: 41,
    disk: 58,
    status: "آنلاین",
    tone: "success"
  },
  {
    name: "VPS-03 (n8n)",
    ip: "103.245.67.91",
    cpu: 36,
    ram: 78,
    disk: 66,
    status: "هشدار",
    tone: "warning"
  },
  {
    name: "VPS-Backup",
    ip: "103.245.67.92",
    cpu: 12,
    ram: 28,
    disk: 49,
    status: "آنلاین",
    tone: "success"
  }
];

export const reminders: Reminder[] = [
  {
    id: "r1",
    time: "09:00",
    title: "بررسی طرح زمین برای پدل",
    project: "دکتر مشکلانی",
    priority: "high",
    status: "open"
  },
  {
    id: "r2",
    time: "11:00",
    title: "هماهنگی تاجیکستان و نیاز بازار",
    project: "Mofanex",
    priority: "medium",
    status: "open"
  },
  {
    id: "r3",
    time: "14:00",
    title: "بررسی اجناس کمیاب در ایران",
    project: "Market Research",
    priority: "medium",
    status: "open"
  },
  {
    id: "r4",
    time: "16:00",
    title: "پیگیری سرمایه‌گذار زمین شمال",
    project: "Investment",
    priority: "low",
    status: "open"
  },
  {
    id: "r5",
    time: "18:00",
    title: "ارسال اپ مالی برای دکتر",
    project: "Financial App",
    priority: "high",
    status: "open"
  }
];

export const tasks = [
  {
    title: "مصطفی پیگیر زمین برای پدل شود و طرح ارائه شود",
    project: "Dr. Moshkelani Initiatives",
    owner: "Mostafa",
    due: "این هفته",
    tone: "warning" as Tone
  },
  {
    title: "دکتر نیاز بازار تاجیکستان را بررسی و هماهنگی کند",
    project: "Dr. Moshkelani Initiatives",
    owner: "Dr. Moshkelani",
    due: "این هفته",
    tone: "accent" as Tone
  },
  {
    title: "بازار اجناس کمیاب ایران بررسی شود",
    project: "Market Research",
    owner: "Dr. Moshkelani",
    due: "باز",
    tone: "accent" as Tone
  },
  {
    title: "برای زمین شمال سرمایه‌گذار پیدا شود",
    project: "Investment",
    owner: "Mostafa",
    due: "باز",
    tone: "warning" as Tone
  },
  {
    title: "طرح همساده‌ها از نظر بازار، سهم بازار و نمونه خارجی بررسی شود",
    project: "Hamshadeha",
    owner: "Mostafa",
    due: "باز",
    tone: "success" as Tone
  },
  {
    title: "پارک فناوری اصفهان / فولادشهر برای گرفتن زمین دنبال شود",
    project: "Land / Tech Park",
    owner: "Mostafa",
    due: "باز",
    tone: "warning" as Tone
  }
];

export const logs = [
  {
    title: "Backup completed",
    description: "VPS-Backup",
    status: "موفق",
    time: "22:41",
    tone: "success" as Tone
  },
  {
    title: "n8n workflow executed",
    description: "n8n Automations",
    status: "موفق",
    time: "21:10",
    tone: "success" as Tone
  },
  {
    title: "New meeting note captured",
    description: "Dr. Moshkelani Initiatives",
    status: "جدید",
    time: "20:55",
    tone: "accent" as Tone
  },
  {
    title: "Google Sheets node warning",
    description: "CentralEstate Research",
    status: "هشدار",
    time: "18:12",
    tone: "warning" as Tone
  },
  {
    title: "Security scan completed",
    description: "VPS-01",
    status: "موفق",
    time: "16:34",
    tone: "success" as Tone
  }
];

export const alerts = [
  {
    title: "CPU Usage High",
    description: "VPS-03 (n8n)",
    meta: "85%",
    tone: "danger" as Tone
  },
  {
    title: "Disk Space Low",
    description: "VPS-02 (Mofanex)",
    meta: "12%",
    tone: "warning" as Tone
  },
  {
    title: "SSL Certificate Expiring",
    description: "CentralEstate.com",
    meta: "۳ روز دیگر",
    tone: "accent" as Tone
  }
];

export const workflows = [
  {
    name: "CentralEstate Telegram Command Center",
    project: "CentralEstate",
    lastRun: "امروز 09:40",
    status: "موفق",
    tone: "success" as Tone
  },
  {
    name: "Research & Idea Intelligence Engine",
    project: "CentralEstate",
    lastRun: "امروز 08:10",
    status: "هشدار",
    tone: "warning" as Tone
  },
  {
    name: "Mofanex Supplier Follow-up",
    project: "Mofanex",
    lastRun: "دیروز 18:00",
    status: "آماده",
    tone: "accent" as Tone
  },
  {
    name: "Daily AI Brain Summary",
    project: "AI Brain / VPS",
    lastRun: "امروز 07:00",
    status: "موفق",
    tone: "success" as Tone
  }
];

export const conversations = [
  {
    person: "دکتر مشکلانی",
    project: "Dr. Moshkelani Initiatives",
    summary: "پدل، تاجیکستان، بازار ایران، زمین شمال، ایتا، همساده‌ها، پارک فناوری و اپ مالی مطرح شد.",
    nextAction: "تبدیل موارد به taskهای تفکیک‌شده",
    tone: "accent" as Tone
  },
  {
    person: "Supplier - Valves",
    project: "Mofanex",
    summary: "موجودی اولیه بررسی شد؛ قیمت و availability باید پیگیری شود.",
    nextAction: "ارسال follow-up email",
    tone: "warning" as Tone
  },
  {
    person: "CentralEstate Operator",
    project: "CentralEstate",
    summary: "وضعیت workflowهای محتوا و approval loop بررسی شد.",
    nextAction: "تست reject feedback",
    tone: "success" as Tone
  }
];

export const navItems = [
  { label: "داشبورد", href: "/" },
  { label: "پروژه‌ها", href: "/projects" },
  { label: "سرورها (VPS)", href: "/servers" },
  { label: "اتوماسیون n8n", href: "/n8n" },
  { label: "وظایف و یادآوری‌ها", href: "/tasks" },
  { label: "مکالمات", href: "/conversations" },
  { label: "لاگ‌ها", href: "/logs" },
  { label: "اکشن‌های سریع", href: "/actions" },
  { label: "AI Assistant", href: "/ai" },
  { label: "تنظیمات", href: "/settings" }
];
