"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import { ThemeProvider } from "next-themes";
import TitleBar from "@/components/TitleBar";
import TerminalDrawer from "@/components/TerminalDrawer";
import { TerminalProvider, useTerminal } from "@/contexts/TerminalContext";

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

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TitleBar onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)} isTerminalOpen={isTerminalOpen} />
          <main className="pt-8">{children}</main>
          <NavigationBar />
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
