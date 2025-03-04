"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import TerminalDrawer from "@/components/TerminalDrawer";
import { TerminalProvider, useTerminal } from "@/contexts/TerminalContext";
import TopNavBar from "@/components/TopNavBar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { isTerminalOpen, setIsTerminalOpen } = useTerminal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsTerminalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsTerminalOpen]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Add the Tron grid background */}
          <div className="tron-grid"></div>

          {/* Only render TopNavBar when client-side is mounted */}
          {mounted && <TopNavBar />}
          <div className="pt-16 relative z-0 pb-10 min-h-[calc(100vh-64px)]">
            <main>{children}</main>
          </div>
          <TerminalDrawer isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
          {mounted && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <TerminalProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </TerminalProvider>
  );
}
