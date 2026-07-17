const PANEL_BASE_PATH = "/central-control-panel";

export function panelClientPath(path: string) {
  if (typeof window === "undefined") return path;
  return window.location.pathname.startsWith(PANEL_BASE_PATH) ? `${PANEL_BASE_PATH}${path}` : path;
}
