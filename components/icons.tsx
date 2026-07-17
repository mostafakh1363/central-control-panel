export type IconName =
  | "home"
  | "check"
  | "folder"
  | "server"
  | "spark"
  | "workflow"
  | "message"
  | "logs"
  | "bolt"
  | "settings"
  | "search"
  | "bell"
  | "moon"
  | "pulse"
  | "alert"
  | "plus"
  | "arrow"
  | "shield";

const paths: Record<IconName, string[]> = {
  home: ["M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.5Z"],
  check: ["M5 12.5 9.2 17 19 7"],
  folder: ["M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z"],
  server: ["M5 4h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z", "M5 13h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Z", "M7 7.5h.01M7 16.5h.01"],
  spark: ["M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z", "M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"],
  workflow: ["M7 7h4v4H7V7ZM13 13h4v4h-4v-4Z", "M11 9h3a3 3 0 0 1 3 3v1M13 15h-3a3 3 0 0 1-3-3v-1"],
  message: ["M4 5h16v11H8l-4 4V5Z"],
  logs: ["M6 6h12M6 11h12M6 16h8"],
  bolt: ["M13 2 5 14h6l-1 8 9-13h-6l0-7Z"],
  settings: ["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z", "M4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"],
  search: ["M10.5 18a7.5 7.5 0 1 1 5.3-2.2L21 21"],
  bell: ["M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z", "M10 21h4"],
  moon: ["M20 15.5A8.5 8.5 0 0 1 8.5 4 7 7 0 1 0 20 15.5Z"],
  pulse: ["M3 12h4l2-6 4 12 2-6h6"],
  alert: ["M12 4 21 20H3L12 4Z", "M12 10v4M12 17h.01"],
  plus: ["M12 5v14M5 12h14"],
  arrow: ["M5 12h14M13 6l6 6-6 6"],
  shield: ["M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z"]
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
      {paths[name].map((path, index) => (
        <path key={`${name}-${index}`} d={path} />
      ))}
    </svg>
  );
}
