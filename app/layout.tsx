"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import TerminalDrawer from "@/components/TerminalDrawer";
import { TerminalProvider, useTerminal } from "@/contexts/TerminalContext";
import Sidebar from "@/components/Sidebar";
import TitleBar from "@/components/TitleBar";
import { useEffect } from "react";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TitleBar />
          <Sidebar />
          <div className="md:pl-16 pt-16 md:pt-0">
            <main>{children}</main>
          </div>
          <TerminalDrawer isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
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
