import type { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="app-shell">
      <Sidebar />
      <section className="workspace" aria-label="داشبورد عملیاتی">
        <Topbar />
        {children}
      </section>
    </main>
  );
}
