import { BookOpen, Compass, LayoutDashboard, PenLine, Sparkles, UserRound } from "lucide-react";
export const primaryNavigation = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/posts/the-craft-of-independent-publishing", label: "Featured", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];
export const commandItems = [
  { href: "/explore", label: "Explore publications", icon: Sparkles },
  { href: "/dashboard/editor", label: "Write a new post", icon: PenLine },
  { href: "/dashboard", label: "Open writer dashboard", icon: LayoutDashboard },
  { href: "/publications/sahyogi-review", label: "View publication", icon: UserRound },
];
