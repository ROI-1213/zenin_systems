"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Sparkles,
  Wrench,
  Inbox,
  MessageSquareQuote,
  Award,
  Factory,
  FileEdit,
  Image as ImageIcon,
  Settings,
  UserCheck,
  LogOut,
  ExternalLink,
  Cpu,
  Menu,
  X,
} from "lucide-react";
import type { SessionUser } from "@/lib/auth";
import { logoutAdminAction } from "@/lib/actions/admin-actions";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Enquiries & Leads", href: "/admin/enquiries", icon: Inbox },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Product Categories", href: "/admin/categories", icon: Layers },
  { label: "AI Solutions (21)", href: "/admin/ai-solutions", icon: Sparkles },
  { label: "Services (12)", href: "/admin/services", icon: Wrench },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Brands", href: "/admin/brands", icon: Award },
  { label: "Industries & Projects", href: "/admin/industries", icon: Factory },
  { label: "Website Content", href: "/admin/content", icon: FileEdit },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
  { label: "Admin Profile", href: "/admin/profile", icon: UserCheck },
];

interface AdminShellProps {
  user: SessionUser;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function AdminShell({ user, title, subtitle, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAdminAction();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-[#F5F8FC] text-[#172033]">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#0B1730] text-white transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#1877F2] to-[#00B8D9] text-white">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight text-white">
                ZENIN <span className="text-[#00B8D9]">CMS</span>
              </div>
              <div className="text-[10px] tracking-widest text-slate-400 uppercase">
                Admin Portal
              </div>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded p-1 text-slate-400 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                  active
                    ? "bg-[#1877F2] text-white shadow-sm"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 rounded-xl bg-[#142B49] p-3">
            <div className="truncate text-xs font-bold text-white">{user.name}</div>
            <div className="truncate text-[11px] text-slate-300">{user.email}</div>
            <span className="mt-1.5 inline-block rounded bg-[#00B8D9]/20 px-2 py-0.5 text-[10px] font-bold text-[#00B8D9] uppercase">
              {user.role}
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-red-600 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open admin navigation"
              className="rounded-lg border border-[#E2E8F0] p-2 text-[#0B1730] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-[#0B1730] sm:text-lg">
                {title}
              </h1>
              {subtitle && (
                <p className="hidden text-xs text-[#64748B] sm:block">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2 text-xs font-semibold text-[#0B1730] transition hover:border-[#1877F2] hover:text-[#1877F2]"
            >
              <span>View Live Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
