import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mostafa Command Center",
  description: "A personal AI operations command center for projects, servers, reminders, logs, and safe actions.",
  applicationName: "Mostafa Command Center",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "MCC",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#f7f8fa",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
