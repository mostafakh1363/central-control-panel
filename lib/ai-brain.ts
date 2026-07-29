import {
  alerts as fallbackAlerts,
  conversations as fallbackConversations,
  logs as fallbackLogs,
  metrics as fallbackMetrics,
  projects as fallbackProjects,
  reminders as fallbackReminders,
  safeActions as fallbackActions,
  servers as fallbackServers,
  tasks as fallbackTasks,
  workflows as fallbackWorkflows,
  type Alert,
  type Conversation,
  type LogEvent,
  type Metric,
  type Project,
  type Reminder,
  type SafeAction,
  type Server,
  type Task,
  type Tone,
  type Workflow
} from "@/lib/data";

export type ApiObject = Record<string, any>;

export type DataSource = "live" | "fallback";

export type LiveData<T> = {
  source: DataSource;
  data: T;
  error?: string;
};

export type Connection = {
  label: string;
  status: string;
  tone: Tone;
};

export type SettingsValues = {
  theme: string;
  language: string;
  notification: string;
};

type DashboardData = {
  metrics: Metric[];
  projects: Project[];
  servers: Server[];
  reminders: Reminder[];
  logs: LogEvent[];
  alerts: Alert[];
};

const DEFAULT_BASE_URL = "https://ai-brain-api.moe-central.xyz";

export function sourceLabel(source: DataSource) {
  return source === "live" ? "داده زنده AI Brain" : "داده پشتیبان";
}

export function sourceTone(source: DataSource): Tone {
  return source === "live" ? "success" : "warning";
}

export async function getDashboardData(): Promise<LiveData<DashboardData>> {
  const [overview, reminders, logs] = await Promise.all([
    apiGet<ApiObject>("/api/command-center/overview"),
    apiGet<ApiObject>("/api/reminders?status=open&limit=8"),
    apiGet<ApiObject>("/api/logs?source=all&limit=8")
  ]);

  if (!overview.ok) {
    return fallback({
      metrics: fallbackMetrics,
      projects: fallbackProjects,
      servers: fallbackServers,
      reminders: fallbackReminders,
      logs: fallbackLogs,
      alerts: fallbackAlerts
    }, overview.error);
  }

  const servers = mapServers(overview.data.servers || []);
  const projects = mapProjects(overview.data.projects || []);
  const reminderRows = reminders.ok ? mapReminders(reminders.data.reminders || []) : mapReminders(overview.data.reminders || []);
  const logRows = logs.ok ? mapLogs(logs.data.logs || []) : mapLogs(overview.data.recent_activity || []);
  const counts = overview.data.counts || {};

  return live({
    metrics: [
      {
        label: "سلامت سیستم",
        value: servers.some((server) => server.tone === "danger") ? "هشدار" : "خوب",
        description: "از AI Brain API خوانده شد",
        tone: servers.some((server) => server.tone === "danger") ? "danger" : "success",
        href: "/servers",
        icon: "pulse"
      },
      {
        label: "وظایف باز",
        value: String(numberValue(counts.open_tasks, fallbackTasks.length)),
        description: "از فهرست وظایف AI Brain",
        tone: "warning",
        href: "/tasks",
        icon: "check"
      },
      {
        label: "پروژه‌ها",
        value: String(numberValue(counts.projects, projects.length)),
        description: "پروژه‌های متصل به حافظه عملیاتی",
        tone: "accent",
        href: "/projects",
        icon: "folder"
      },
      {
        label: "یادآوری‌ها",
        value: String(numberValue(counts.open_reminders, reminderRows.length)),
        description: "یادآوری‌های باز پنل",
        tone: "accent",
        href: "/reminders",
        icon: "bell"
      }
    ],
    projects,
    servers,
    reminders: reminderRows,
    logs: logRows,
    alerts: deriveAlerts(servers, logRows)
  });
}

export async function getProjectsData(): Promise<LiveData<Project[]>> {
  const response = await apiGet<ApiObject>("/api/command-center/projects?limit=50");
  return response.ok ? live(mapProjects(response.data.projects || [])) : fallback(fallbackProjects, response.error);
}

export async function getServersData(): Promise<LiveData<Server[]>> {
  const response = await apiGet<ApiObject>("/api/command-center/servers");
  return response.ok ? live(mapServers(response.data.servers || [])) : fallback(fallbackServers, response.error);
}

export async function getTasksData(): Promise<LiveData<Task[]>> {
  const response = await apiGet<ApiObject>("/api/tasks/open?limit=50");
  if (!response.ok) return fallback(fallbackTasks, response.error);
  const tasks = mapTasks(response.data.tasks || []).filter(isUserFacingTask);
  return live(tasks);
}

export async function getRemindersData(): Promise<LiveData<Reminder[]>> {
  const response = await apiGet<ApiObject>("/api/reminders?status=open&limit=50");
  return response.ok ? live(mapReminders(response.data.reminders || [])) : fallback(fallbackReminders, response.error);
}

export async function getLogsData(): Promise<LiveData<LogEvent[]>> {
  const response = await apiGet<ApiObject>("/api/logs?source=all&limit=100");
  return response.ok ? live(mapLogs(response.data.logs || [])) : fallback(fallbackLogs, response.error);
}

export async function getWorkflowsData(): Promise<LiveData<Workflow[]>> {
  const response = await apiGet<ApiObject>("/api/n8n/workflows?limit=50");
  return response.ok ? live(mapWorkflows(response.data.workflows || [])) : fallback(fallbackWorkflows, response.error);
}

export async function getConversationsData(): Promise<LiveData<Conversation[]>> {
  const response = await apiGet<ApiObject>("/api/conversations?limit=30");
  return response.ok ? live(mapConversations(response.data.conversations || [])) : fallback(fallbackConversations, response.error);
}

export async function getActionsData(): Promise<LiveData<SafeAction[]>> {
  const response = await apiGet<ApiObject>("/api/actions");
  return response.ok ? live(mapActions(response.data.actions || [])) : fallback(fallbackActions, response.error);
}

export async function getSettingsData(): Promise<LiveData<{ settings: SettingsValues; connections: Connection[] }>> {
  const [settings, connections] = await Promise.all([
    apiGet<ApiObject>("/api/settings"),
    apiGet<ApiObject>("/api/connections/health")
  ]);

  if (!settings.ok && !connections.ok) {
    return fallback({
      settings: {
        theme: "System",
        language: "Persian / RTL",
        notification: "Telegram + PWA"
      },
      connections: [
        { label: "AI Brain API", status: "تنظیم نشده", tone: "warning" },
        { label: "پایگاه داده", status: "نامشخص", tone: "warning" },
        { label: "n8n", status: "نامشخص", tone: "warning" },
        { label: "بات تلگرام", status: "نامشخص", tone: "warning" }
      ]
    }, settings.error || connections.error);
  }

  const values = settings.ok ? settings.data.settings || {} : {};
  return live({
    settings: {
      theme: text(values.theme, "System"),
      language: text(values.language, "Persian / RTL"),
      notification: text(values.notification, "Telegram + PWA")
    },
    connections: mapConnections(connections.ok ? connections.data : null)
  });
}

export async function apiGet<T>(path: string): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  const apiKey = panelApiKey();
  if (!apiKey) return { ok: false, error: "کلید AI Brain API برای پنل تنظیم نشده است." };

  try {
    const response = await fetch(new URL(path, backendBaseUrl()), {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "X-API-Key": apiKey
      }
    });

    if (!response.ok) return { ok: false, error: `AI Brain API با وضعیت ${response.status} پاسخ داد.` };
    return { ok: true, data: (await response.json()) as T };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "درخواست AI Brain API ناموفق بود." };
  }
}

function backendBaseUrl() {
  return process.env.AI_BRAIN_API_BASE_URL || process.env.AI_BRAIN_BACKEND_URL || DEFAULT_BASE_URL;
}

function panelApiKey() {
  return process.env.AI_BRAIN_PANEL_API_KEY || process.env.AI_BRAIN_API_KEY || process.env.COMMAND_CENTER_API_KEY || "";
}

function live<T>(data: T): LiveData<T> {
  return { source: "live", data };
}

function fallback<T>(data: T, error?: string): LiveData<T> {
  return { source: "fallback", data, error };
}

function mapProjects(rows: ApiObject[]): Project[] {
  return rows.map((row, index) => {
    const openTasks = numberValue(row.open_tasks, 0);
    const openReminders = numberValue(row.open_reminders, 0);
    const key = text(row.project || row.key || row.id, `project-${index}`);
    return {
      slug: key,
      name: text(row.name || row.display_name || row.project, key),
      description: text(row.summary || row.description, `${openTasks} وظیفه و ${openReminders} یادآوری باز`),
      status: text(row.status || row.current_status, "فعال"),
      progress: clamp(100 - Math.min(openTasks * 8 + openReminders * 4, 80), 15, 100),
      tone: openTasks > 5 ? "warning" : "accent",
      owner: text(row.owner || row.metadata?.owner, "AI Brain"),
      nextStep: text(row.metadata?.next_step || row.metadata?.nextStep, "بررسی آخرین وضعیت پروژه"),
      openTasks
    };
  });
}

function mapServers(rows: ApiObject[]): Server[] {
  return rows.map((row, index) => {
    const metrics = row.metrics || {};
    const tone = statusTone(row.status);
    const cpu = percent(metrics.cpu_percent);
    const ram = percent(metrics.ram_percent);
    const disk = percent(metrics.disk_percent);
    return {
      id: text(row.id || row.server_id || row.name, `server-${index}`),
      name: text(row.name, `Service ${index + 1}`),
      ip: text(row.metadata?.hostname || row.ip || row.type, "service"),
      cpu,
      ram,
      disk,
      status: statusFa(row.status),
      tone,
      updatedAt: "زنده",
      href: "/servers"
    };
  });
}

function mapTasks(rows: ApiObject[]): Task[] {
  return rows.map((row, index) => ({
    id: text(row.id, `task-${index}`),
      title: text(row.title, "وظیفه بدون عنوان"),
    project: text(row.project, "AI Brain"),
    owner: text(row.owner || row.assignee || row.metadata?.owner || row.metadata?.assignee, "Mostafa"),
    due: formatDateTime(row.due_at || metadataDateTime(row.metadata), "بدون زمان"),
    tone: priorityTone(row.priority),
    ...(row.metadata ? { metadata: row.metadata } : {})
  } as Task & { metadata?: ApiObject }));
}

function mapReminders(rows: ApiObject[]): Reminder[] {
  return rows.map((row, index) => ({
    id: text(row.id, `reminder-${index}`),
    time: formatDateTime(row.reminder_at, "بدون زمان"),
    title: text(row.title, "یادآوری بدون عنوان"),
    project: text(row.project, "AI Brain"),
    priority: priorityValue(row.priority),
    status: String(row.status || "").toLowerCase() === "done" ? "done" : "open"
  }));
}

function mapLogs(rows: ApiObject[]): LogEvent[] {
  return rows.map((row, index) => {
    const id = text(row.id || row.source_id, `log-${index}`);
    const tone = logTone(row.status || row.level);
    return {
      id,
      title: text(row.title || row.event_type, "رخداد AI Brain"),
      description: text(row.description || row.source || row.project, "AI Brain"),
      status: text(row.status || row.level, "info"),
      time: formatDateTime(row.created_at || row.occurred_at, "اخیر"),
      tone,
      href: `/logs`
    };
  });
}

function mapWorkflows(rows: ApiObject[]): Workflow[] {
  return rows.map((row, index) => ({
    id: text(row.id || row.workflow_id || row.name, `workflow-${index}`),
      name: text(row.name || row.title || row.workflow_id || row.id, `گردش‌کار ${index + 1}`),
    project: text(row.project, "n8n"),
    lastRun: formatDateTime(row.updated_at || row.indexed_at || row.created_at, "ثبت نشده"),
    status: statusFa(row.status),
    tone: statusTone(row.status),
    href: "/n8n"
  }));
}

function mapConversations(rows: ApiObject[]): Conversation[] {
  return rows.map((row, index) => ({
    person: text(row.title || row.external_conversation_id, `مکالمه ${index + 1}`),
    project: text(row.project, "AI Brain"),
    summary: text(row.summary, `${numberValue(row.message_count, 0)} پیام در AI Brain ذخیره شده است.`),
    nextAction: formatDateTime(row.last_message_at || row.updated_at, "بررسی مکالمه"),
    tone: statusTone(row.status || "ok")
  }));
}

function mapActions(rows: ApiObject[]): SafeAction[] {
  return rows.map((row, index) => {
    const sensitive = Boolean(row.sensitive || row.approval_required);
    return {
      id: text(row.id, `action-${index}`),
      title: text(row.title, "اقدام"),
      description: text(row.description, "اقدام AI Brain"),
      tone: sensitive ? "warning" : "success",
      sensitive,
      href: "/actions"
    };
  });
}

function mapConnections(response: ApiObject | null): Connection[] {
  if (!response) {
    return [{ label: "AI Brain API", status: "در دسترس نیست", tone: "warning" }];
  }

  return [
    { label: "AI Brain API", status: displayStatus(response.api?.status || response.status), tone: statusTone(response.api?.status || response.status) },
    { label: "پایگاه داده", status: displayStatus(response.database?.status), tone: statusTone(response.database?.status) },
    { label: "Redis", status: displayStatus(response.redis?.status), tone: statusTone(response.redis?.status) },
    { label: "Qdrant", status: displayStatus(response.qdrant?.status), tone: statusTone(response.qdrant?.status) },
    { label: "n8n", status: displayStatus(response.n8n?.status), tone: statusTone(response.n8n?.status) },
    { label: "بک‌اند AI", status: displayStatus(response.ai_backend?.status), tone: statusTone(response.ai_backend?.status) }
  ];
}

function deriveAlerts(servers: Server[], logs: LogEvent[]): Alert[] {
  const serverAlerts = servers
    .filter((server) => server.tone === "warning" || server.tone === "danger")
    .map((server) => ({
      title: `${server.name} نیازمند بررسی است`,
      description: server.status,
      meta: server.disk ? `Disk ${server.disk}%` : "زنده",
      tone: server.tone,
      href: "/servers"
    }));
  const logAlerts = logs
    .filter((log) => log.tone === "warning" || log.tone === "danger")
    .map((log) => ({
      title: log.title,
      description: log.description,
      meta: log.status,
      tone: log.tone,
      href: "/logs"
    }));
  return [...serverAlerts, ...logAlerts].slice(0, 4);
}

function isUserFacingTask(task: Task & { metadata?: ApiObject }) {
  const raw = [
    task.title,
    task.project,
    task.owner,
    task.metadata?.category,
    task.metadata?.source,
    Array.isArray(task.metadata?.tags) ? task.metadata.tags.join(" ") : task.metadata?.tags
  ].join(" ").toLowerCase();

  const explicitlyUser = raw.includes("mostafa") || raw.includes("meeting") || raw.includes("manual") || raw.includes("reminder") || raw.includes("follow");
  const technical = ["ai-brain-server", "mcp", "rag", "qdrant", "redis", "postgres", "backend", "cache", "migration", "implementation"].some((item) => raw.includes(item));
  if (technical && !explicitlyUser) return false;
  return true;
}

function text(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function numberValue(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function percent(value: unknown) {
  return clamp(Math.round(numberValue(value, 0)), 0, 100);
}

function statusTone(status: unknown): Tone {
  const value = String(status || "").toLowerCase();
  if (["ok", "active", "done", "success", "healthy", "configured", "online"].includes(value)) return "success";
  if (["degraded", "pending", "warning"].includes(value)) return "warning";
  if (["unavailable", "error", "failed", "not_connected", "critical"].includes(value)) return "danger";
  return "accent";
}

function priorityTone(priority: unknown): Tone {
  const value = String(priority || "").toLowerCase();
  if (["urgent", "high"].includes(value)) return "danger";
  if (["medium", "pending"].includes(value)) return "warning";
  if (["low", "done"].includes(value)) return "success";
  return "accent";
}

function priorityValue(priority: unknown): Reminder["priority"] {
  const value = String(priority || "").toLowerCase();
  if (value === "high" || value === "urgent") return "high";
  if (value === "low") return "low";
  return "medium";
}

function logTone(level: unknown): Tone {
  const value = String(level || "").toLowerCase();
  if (["ok", "success", "done", "info"].includes(value)) return "success";
  if (["warning", "pending", "degraded"].includes(value)) return "warning";
  if (["error", "failed", "critical", "unavailable"].includes(value)) return "danger";
  return "accent";
}

function statusFa(status: unknown) {
  const value = String(status || "").toLowerCase();
  if (["ok", "active", "success", "healthy", "configured", "online"].includes(value)) return "آنلاین";
  if (["degraded", "pending", "warning"].includes(value)) return "نیازمند بررسی";
  if (["unavailable", "error", "failed", "critical"].includes(value)) return "قطع";
  return text(status, "نامشخص");
}

function displayStatus(status: unknown) {
  const value = String(status || "").toLowerCase();
  if (["ok", "active", "success", "healthy", "configured", "online"].includes(value)) return "متصل";
  if (["degraded", "pending", "warning"].includes(value)) return "نیازمند بررسی";
  if (["unavailable", "error", "failed", "not_connected", "critical"].includes(value)) return "قطع";
  if (value === "unknown" || !value) return "نامشخص";
  return text(status, "نامشخص");
}

function formatDateTime(value: unknown, fallback: string) {
  const date = parseDate(value);
  if (!date) return fallback;
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Tehran"
  }).format(date);
}

function metadataDateTime(metadata: unknown) {
  if (!metadata || typeof metadata !== "object") return null;
  const row = metadata as ApiObject;
  const dateValue = text(row.reminder_date || row.mentioned_date || row.date || row.due_date, "");
  if (!dateValue) return null;
  const timeValue = text(row.reminder_time || row.mentioned_time || row.time || row.due_time, "09:00");
  const normalizedTime = /^\d{1,2}:\d{2}$/.test(timeValue) ? `${timeValue}:00` : timeValue;
  return `${dateValue}T${normalizedTime}+03:30`;
}

function parseDate(value: unknown) {
  if (typeof value !== "string" || !value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
