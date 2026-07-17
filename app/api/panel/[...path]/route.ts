import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ path: string[] }> };

type Endpoint = {
  path: string;
  method: string;
};

const DEFAULT_BASE_URL = "https://ai-brain-api.moe-central.xyz";

async function forward(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const endpoint = resolveEndpoint(path, request.method);
  if (!endpoint) {
    return NextResponse.json({ detail: "Panel endpoint is not allowed." }, { status: 404 });
  }

  const apiKey = process.env.AI_BRAIN_PANEL_API_KEY || process.env.AI_BRAIN_API_KEY || process.env.COMMAND_CENTER_API_KEY || "";
  if (!apiKey) {
    return NextResponse.json({ detail: "AI Brain API key is not configured." }, { status: 503 });
  }

  const sourceUrl = new URL(request.url);
  const targetUrl = new URL(endpoint.path, process.env.AI_BRAIN_API_BASE_URL || process.env.AI_BRAIN_BACKEND_URL || DEFAULT_BASE_URL);
  sourceUrl.searchParams.forEach((value, key) => targetUrl.searchParams.set(key, value));

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const body = hasBody ? await request.text() : undefined;
  const headers = new Headers({
    Accept: "application/json",
    "X-API-Key": apiKey
  });

  if (body) {
    headers.set("Content-Type", request.headers.get("Content-Type") || "application/json");
  }

  try {
    const response = await fetch(targetUrl, {
      method: endpoint.method,
      headers,
      body: body || undefined,
      cache: "no-store"
    });
    const responseBody = await response.text();
    return new NextResponse(responseBody || null, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json"
      }
    });
  } catch {
    return NextResponse.json({ detail: "AI Brain API is unavailable." }, { status: 503 });
  }
}

function resolveEndpoint(path: string[], method: string): Endpoint | null {
  const normalizedMethod = method.toUpperCase();
  const [resource, id, action] = path;

  if (normalizedMethod === "GET" && path.length === 1) {
    const readEndpoints: Record<string, string> = {
      overview: "/api/command-center/overview",
      projects: "/api/command-center/projects",
      servers: "/api/command-center/servers",
      tasks: "/api/tasks/open",
      reminders: "/api/reminders",
      logs: "/api/logs",
      workflows: "/api/n8n/workflows",
      conversations: "/api/conversations",
      actions: "/api/actions",
      settings: "/api/settings",
      connections: "/api/connections/health"
    };
    const backendPath = readEndpoints[resource];
    return backendPath ? { path: backendPath, method: "GET" } : null;
  }

  if (normalizedMethod === "POST" && resource === "tasks" && id && action === "done") {
    return { path: `/api/tasks/${encodeURIComponent(id)}/done`, method: "POST" };
  }

  if (normalizedMethod === "POST" && resource === "reminders" && id && action === "done") {
    return { path: `/api/reminders/${encodeURIComponent(id)}/done`, method: "POST" };
  }

  if (normalizedMethod === "POST" && resource === "servers" && id && action === "health-check") {
    return { path: `/api/servers/${encodeURIComponent(id)}/health-check`, method: "POST" };
  }

  if (normalizedMethod === "POST" && resource === "servers" && id && action === "restart-request") {
    return { path: `/api/servers/${encodeURIComponent(id)}/restart-request`, method: "POST" };
  }

  if (normalizedMethod === "POST" && resource === "actions" && id && action === "request-approval") {
    return { path: `/api/actions/${encodeURIComponent(id)}/request-approval`, method: "POST" };
  }

  if (normalizedMethod === "POST" && resource === "workflows" && id && action === "execute-request") {
    return { path: `/api/n8n/workflows/${encodeURIComponent(id)}/execute-request`, method: "POST" };
  }

  if (normalizedMethod === "POST" && resource === "ai" && id === "chat" && !action) {
    return { path: "/api/ai/chat", method: "POST" };
  }

  if (normalizedMethod === "PATCH" && resource === "settings" && !id) {
    return { path: "/api/settings", method: "PATCH" };
  }

  return null;
}

export const GET = forward;
export const POST = forward;
export const PATCH = forward;
