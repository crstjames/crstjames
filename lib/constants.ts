import { Github, Linkedin, Twitter, Mail, MessagesSquare } from "lucide-react";

export const socialLinks = [
  { href: "christopher.stjames@gmail.com", icon: Mail, label: "Email", type: "clipboard" },
  { href: "https://github.com/crstjames", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/crstjames", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/crstjames", icon: Twitter, label: "Twitter" },
  { href: "https://t.me/crstjames", icon: MessagesSquare, label: "Telegram" },
] as const;

// Define the type with optional 'type' property
export type SocialLink = {
  href: string;
  icon: React.ComponentType;
  label: string;
  type?: "clipboard";
};
