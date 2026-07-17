import type { ReactNode } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="workspace">
        <Topbar />
        <main className="content" id="main-content">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
