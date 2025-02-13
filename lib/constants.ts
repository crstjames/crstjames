import { Github, Linkedin, Twitter, Mail, MessagesSquare } from "lucide-react";

export const socialLinks = [
  { href: "mailto:christopher.stjames@gmail.com", icon: Mail, label: "Email" },
  { href: "https://github.com/crstjames", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/crstjames", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/crstjames", icon: Twitter, label: "Twitter" },
  { href: "https://t.me/crstjames", icon: MessagesSquare, label: "Telegram" },
] as const;

export type SocialLink = (typeof socialLinks)[number];
