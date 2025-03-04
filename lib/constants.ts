import { Github, Linkedin, Twitter, Mail, MessagesSquare } from "lucide-react";

// Define the type with optional 'type' property
export type SocialLink = {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  type?: "clipboard";
};

// Create the social links array with the proper type
export const socialLinks: SocialLink[] = [
  { href: "chris@eversaint.com", icon: Mail, label: "Email", type: "clipboard" },
  { href: "https://github.com/crstjames", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/crstjames", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/crstjames", icon: Twitter, label: "Twitter" },
  { href: "https://t.me/crstjames", icon: MessagesSquare, label: "Telegram" },
];
