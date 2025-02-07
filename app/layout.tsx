import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import { ThemeProvider } from "next-themes";
import TitleBar from "@/components/TitleBar";
import Terminal from "@/components/Terminal";
import { TerminalProvider } from "@/contexts/TerminalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "Personal portfolio and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TerminalProvider>
            <TitleBar />
            <Terminal />
            <NavigationBar />
          </TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
