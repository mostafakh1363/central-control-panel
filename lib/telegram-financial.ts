import { apiGet, type ApiObject, type DataSource, type LiveData } from "@/lib/ai-brain";
import type { Tone } from "@/lib/data";

export type TelegramFinancialHealth = {
  status: string;
  ingestKeyConfigured: boolean;
  allowlistCount: number;
  openaiConfigured: boolean;
  transcriptionModel: string;
  mediaRootExists: boolean;
};

export type TelegramFinancialSource = {
  id: string;
  chatId: string;
  title: string;
  username: string;
  protectedContent: boolean;
  lastMessageId: string;
  lastSeenAt: string;
  tone: Tone;
};

export type TelegramFinancialPost = {
  id: string;
  chatId: string;
  messageId: string;
  sourceTitle: string;
  sourceUsername: string;
  sourceUrl: string;
  status: string;
  statusLabel: string;
  tone: Tone;
  eventType: string;
  mediaType: string;
  publishedAt: string;
  analyzedAt: string;
  summary: string;
  rawText: string;
  caption: string;
  transcript: string;
  confidence: string;
  sentiment: string;
  urgency: string;
  timeHorizon: string;
  errorMessage: string;
  marketTopics: string[];
  riskSignals: string[];
  opportunitySignals: string[];
  verificationNeeds: string[];
};

export type TelegramFinancialStatusCount = {
  label: string;
  value: string;
  tone: Tone;
};

export type TelegramFinancialDashboard = {
  health: TelegramFinancialHealth;
  sources: TelegramFinancialSource[];
  posts: TelegramFinancialPost[];
  analyzedPosts: TelegramFinancialPost[];
  failedPosts: TelegramFinancialPost[];
  statusCounts: TelegramFinancialStatusCount[];
};

const emptyHealth: TelegramFinancialHealth = {
  status: "not_configured",
  ingestKeyConfigured: false,
  allowlistCount: 0,
  openaiConfigured: false,
  transcriptionModel: "-",
  mediaRootExists: false
};

export async function getTelegramFinancialData(): Promise<LiveData<TelegramFinancialDashboard>> {
  const [health, sources, posts, analyzedPosts, failedPosts] = await Promise.all([
    apiGet<ApiObject>("/api/telegram-financial/health"),
    apiGet<ApiObject>("/api/telegram-financial/sources"),
    apiGet<ApiObject>("/api/telegram-financial/posts?limit=30"),
    apiGet<ApiObject>("/api/telegram-financial/posts?status=analyzed&limit=20"),
    apiGet<ApiObject>("/api/telegram-financial/posts?status=failed&limit=10")
  ]);

  if (!health.ok) {
    return fallback(emptyDashboard(), health.error);
  }

  const mappedPosts = posts.ok ? mapPosts(posts.data.items || []) : [];
  const mappedAnalyzedPosts = analyzedPosts.ok ? mapPosts(analyzedPosts.data.items || []) : [];
  const mappedFailedPosts = failedPosts.ok ? mapPosts(failedPosts.data.items || []) : [];

  return live({
    health: mapHealth(health.data),
    sources: sources.ok ? mapSources(sources.data.items || []) : [],
    posts: mappedPosts,
    analyzedPosts: mappedAnalyzedPosts,
    failedPosts: mappedFailedPosts,
    statusCounts: buildStatusCounts(mappedPosts)
  });
}

export function telegramSourceLabel(source: DataSource) {
  return source === "live" ? "داده زنده تلگرام" : "داده پشتیبان";
}

function emptyDashboard(): TelegramFinancialDashboard {
  return {
    health: emptyHealth,
    sources: [],
    posts: [],
    analyzedPosts: [],
    failedPosts: [],
    statusCounts: []
  };
}

function mapHealth(row: ApiObject): TelegramFinancialHealth {
  return {
    status: text(row.status, "unknown"),
    ingestKeyConfigured: Boolean(row.ingest_key_configured),
    allowlistCount: numberValue(row.allowlist_count),
    openaiConfigured: Boolean(row.openai_configured),
    transcriptionModel: text(row.transcription_model, "-"),
    mediaRootExists: Boolean(row.media_root_exists)
  };
}

function mapSources(rows: ApiObject[]): TelegramFinancialSource[] {
  return rows.map((row, index) => {
    const protectedContent = Boolean(row.has_protected_content);
    return {
      id: text(row.id, `source-${index}`),
      chatId: String(row.chat_id ?? "-"),
      title: text(row.title, `کانال ${index + 1}`),
      username: text(row.username, ""),
      protectedContent,
      lastMessageId: String(row.last_message_id ?? "-"),
      lastSeenAt: formatDateTime(row.last_seen_at || row.updated_at || row.created_at, "ثبت نشده"),
      tone: protectedContent ? "warning" : "success"
    };
  });
}

function mapPosts(rows: ApiObject[]): TelegramFinancialPost[] {
  return rows.map((row, index) => {
    const analysis = objectValue(row.analysis);
    const status = text(row.status, "unknown");
    return {
      id: text(row.id, `post-${index}`),
      chatId: String(row.chat_id ?? "-"),
      messageId: String(row.message_id ?? "-"),
      sourceTitle: text(row.source_title || row.title, "کانال تلگرام"),
      sourceUsername: text(row.source_username || row.username, ""),
      sourceUrl: text(row.source_url, ""),
      status,
      statusLabel: statusLabel(status),
      tone: statusTone(status),
      eventType: text(row.event_type, "new"),
      mediaType: text(row.media_type, "text"),
      publishedAt: formatDateTime(row.published_at || row.created_at, "زمان نامشخص"),
      analyzedAt: formatDateTime(row.analyzed_at, "تحلیل نشده"),
      summary: text(row.analysis_summary || analysis.summary, ""),
      rawText: text(row.raw_text, ""),
      caption: text(row.caption, ""),
      transcript: text(row.transcript, ""),
      confidence: formatPercent(row.confidence ?? analysis.confidence),
      sentiment: text(analysis.sentiment, "-"),
      urgency: text(analysis.urgency, "-"),
      timeHorizon: text(analysis.time_horizon, "-"),
      errorMessage: text(row.error_message, ""),
      marketTopics: stringArray(analysis.market_topics),
      riskSignals: stringArray(analysis.risk_signals),
      opportunitySignals: stringArray(analysis.opportunity_signals),
      verificationNeeds: stringArray(analysis.verification_needs)
    };
  });
}

function buildStatusCounts(posts: TelegramFinancialPost[]): TelegramFinancialStatusCount[] {
  const counts = new Map<string, { value: number; tone: Tone }>();
  for (const post of posts) {
    const current = counts.get(post.statusLabel) || { value: 0, tone: post.tone };
    counts.set(post.statusLabel, { value: current.value + 1, tone: current.tone });
  }
  return Array.from(counts.entries()).map(([label, item]) => ({
    label,
    value: String(item.value),
    tone: item.tone
  }));
}

function statusTone(status: string): Tone {
  const value = status.toLowerCase();
  if (value === "analyzed") return "success";
  if (value === "failed") return "danger";
  if (["needs_context", "needs_transcript", "received", "analyzing"].includes(value)) return "warning";
  if (["deleted", "protected_skipped"].includes(value)) return "neutral";
  return "accent";
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    received: "دریافت‌شده",
    needs_context: "نیازمند متن",
    needs_transcript: "نیازمند تبدیل صوت",
    analyzing: "در حال تحلیل",
    analyzed: "تحلیل‌شده",
    failed: "خطا",
    protected_skipped: "محافظت‌شده",
    deleted: "حذف‌شده"
  };
  return labels[status] || status;
}

function live<T>(data: T): LiveData<T> {
  return { source: "live", data };
}

function fallback<T>(data: T, error?: string): LiveData<T> {
  return { source: "fallback", data, error };
}

function objectValue(value: unknown): ApiObject {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as ApiObject) : {};
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
}

function text(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function formatPercent(value: unknown) {
  const numeric = typeof value === "number" && Number.isFinite(value) ? value : 0;
  return `${Math.round(numeric * 100)}%`;
}

function formatDateTime(value: unknown, fallback: string) {
  if (typeof value !== "string" || !value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Tehran"
  }).format(date);
}
