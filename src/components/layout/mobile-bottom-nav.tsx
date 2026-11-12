"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Sparkles, Wrench } from "lucide-react";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";

const NAV_TABS = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    match: (pathname: string) => pathname === "/",
  },
  {
    label: "Solutions",
    href: "/products",
    icon: Layers,
    match: (pathname: string) =>
      pathname.startsWith("/products") &&
      !pathname.startsWith("/products/ai-video-analytics"),
  },
  {
    label: "AI Vision",
    href: "/products/ai-video-analytics",
    icon: Sparkles,
    match: (pathname: string) =>
      pathname.startsWith("/products/ai-video-analytics"),
  },
  {
    label: "Services",
    href: "/services",
    icon: Wrench,
    match: (pathname: string) => pathname.startsWith("/services"),
  },
];

export function MobileBottomNav() {
  const pathname = usePathname() || "/";

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-[#081424]/95 px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] text-white shadow-[0_-8px_30px_rgba(8,20,36,0.45)] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5 items-center gap-1">
        {NAV_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = tab.match(pathname);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`touch-btn relative flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5 text-center transition-all select-none ${
                active
                  ? "bg-white/10 text-[#00B8D9] shadow-inner"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {active && (
                <span className="absolute top-0.5 h-1 w-6 rounded-full bg-[#00B8D9]" />
              )}
              <Icon
                className={`h-5 w-5 shrink-0 transition-transform ${
                  active ? "scale-110 text-[#00B8D9]" : "text-slate-300"
                }`}
              />
              <span
                className={`truncate text-[11px] leading-none tracking-tight ${
                  active ? "font-bold text-[#00B8D9]" : "font-medium text-slate-300"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}

        {/* Primary Action Tab: Request a Quote Modal Trigger */}
        <div className="flex items-center justify-center pl-0.5">
          <QuoteModalTrigger
            buttonText="Get Quote"
            variant="bottomNav"
          />
        </div>
      </div>
    </nav>
  );
}
