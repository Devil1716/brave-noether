"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Target,
  GraduationCap,
  LineChart,
  LogOut,
  Sparkles
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Curriculum", href: "/curriculum", icon: BookOpen },
  { name: "Timetable", href: "/timetable", icon: CalendarDays },
  { name: "Basket Tracker", href: "/baskets", icon: Target },
  { name: "Graduation Planner", href: "/planner", icon: GraduationCap },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "AI Recommendations", href: "/ai-recommend", icon: Sparkles },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
            <span className="text-primary font-bold">A</span>
          </div>
          Amity Planner
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-3 border-primary/50 text-primary hover:bg-primary/10 rounded-xl"
          onClick={() => {
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then((regs) => {
                regs.forEach(reg => reg.update());
              });
            }
            window.location.reload();
          }}
        >
          <Sparkles className="w-4 h-4" />
          Update App
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl"
          onClick={() => signOut(auth)}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
