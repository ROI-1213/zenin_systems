"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Cpu,
  Shield,
  Sparkles,
  Wrench,
  Layers,
} from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";

export interface NavCoreCategory {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  icon: string;
  dedicatedRoute: string | null;
}

export interface NavAICategory {
  id: string;
  code: string;
  name: string;
  slug: string;
  solutions: {
    id: string;
    name: string;
    slug: string;
    isFeatured: boolean;
  }[];
}

export interface NavServiceItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  icon: string;
  isFeatured: boolean;
}

interface HeaderClientProps {
  coreCategories: NavCoreCategory[];
  aiCategories: NavAICategory[];
  services: NavServiceItem[];
  settings: Record<string, string>;
}

export function HeaderClient({
  coreCategories,
  aiCategories,
  services,
  settings,
}: HeaderClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"products" | "services" | null>(
    null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"products" | "services" | null>(
    "products"
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const showBrands = settings.nav_show_brands !== "false";
  const showTestimonials = settings.nav_show_testimonials !== "false";
  const announcementEnabled = settings.announcement_enabled === "true";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {announcementEnabled && settings.announcement_text && (
        <div className="border-b border-white/10 bg-[#081424] px-4 py-2 text-center text-xs text-slate-200">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#00B8D9]" />
            <span>{settings.announcement_text}</span>
            <Link
              href="/contact-us"
              className="font-semibold text-[#00B8D9] underline-offset-4 hover:underline"
            >
              Consult Our Team →
            </Link>
          </div>
        </div>
      )}

      <div className="w-full px-3 pt-2.5 sm:px-6 sm:pt-3.5 lg:px-8">
        <div
          onMouseLeave={() => setActiveDropdown(null)}
          className={`mx-auto max-w-7xl overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-300 ${
            scrolled
              ? "border border-[#E2E8F0] bg-white/95 text-[#0B1730] shadow-xl backdrop-blur-xl"
              : "border border-white/15 bg-[#0B1730]/90 text-white shadow-2xl backdrop-blur-xl"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4 sm:h-22 sm:px-6 lg:px-8">
          {/* LEFT: COMPANY LOGO */}
          <Link href="/" className="group flex min-h-[48px] items-center gap-3 sm:gap-3.5">
            <div className="relative flex h-12 w-auto items-center justify-center overflow-hidden rounded-xl bg-white px-3 py-1.5 shadow-sm transition-transform group-hover:scale-105 sm:h-16 border border-slate-200">
              <Image
                src="/images/logo.png"
                alt="Zenin Systems Solutions LLP"
                width={220}
                height={72}
                priority
                className="h-9 sm:h-13 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-base font-extrabold tracking-tight leading-none sm:text-xl ${
                  scrolled ? "text-[#0B1730]" : "text-white"
                }`}
              >
                ZENIN <span className="text-[#00B8D9]">SYSTEMS</span>
              </span>
              <span
                className={`mt-1 text-[9px] font-semibold tracking-[0.2em] uppercase sm:text-[11px] ${
                  scrolled ? "text-slate-500" : "text-slate-300"
                }`}
              >
                Solutions LLP
              </span>
            </div>
          </Link>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-1 lg:flex xl:gap-2"
          >
            <Link
              href="/"
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive("/")
                  ? "text-[#00B8D9]"
                  : scrolled
                  ? "text-[#172033] hover:bg-slate-100 hover:text-[#1877F2]"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive("/about-us")
                  ? "text-[#00B8D9]"
                  : scrolled
                  ? "text-[#172033] hover:bg-slate-100 hover:text-[#1877F2]"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              About Us
            </Link>

            {/* PRODUCTS & SOLUTIONS MEGA MENU TRIGGER */}
            <div
              onMouseEnter={() => setActiveDropdown("products")}
              className="relative"
            >
              <Link
                href="/products"
                aria-expanded={activeDropdown === "products"}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive("/products")
                    ? "text-[#00B8D9]"
                    : scrolled
                    ? "text-[#172033] hover:bg-slate-100 hover:text-[#1877F2]"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>Products & Solutions</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    activeDropdown === "products" ? "rotate-180 text-[#00B8D9]" : ""
                  }`}
                />
              </Link>
            </div>

            {/* SERVICES MEGA MENU TRIGGER */}
            <div
              onMouseEnter={() => setActiveDropdown("services")}
              className="relative"
            >
              <Link
                href="/services"
                aria-expanded={activeDropdown === "services"}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive("/services")
                    ? "text-[#00B8D9]"
                    : scrolled
                    ? "text-[#172033] hover:bg-slate-100 hover:text-[#1877F2]"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    activeDropdown === "services" ? "rotate-180 text-[#00B8D9]" : ""
                  }`}
                />
              </Link>
            </div>

            {showBrands && (
              <Link
                href="/brands"
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive("/brands")
                    ? "text-[#00B8D9]"
                    : scrolled
                    ? "text-[#172033] hover:bg-slate-100 hover:text-[#1877F2]"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                Brands
              </Link>
            )}

            {showTestimonials && (
              <Link
                href="/testimonials"
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive("/testimonials")
                    ? "text-[#00B8D9]"
                    : scrolled
                    ? "text-[#172033] hover:bg-slate-100 hover:text-[#1877F2]"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                Testimonials
              </Link>
            )}

            <Link
              href="/contact-us"
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive("/contact-us")
                  ? "text-[#00B8D9]"
                  : scrolled
                  ? "text-[#172033] hover:bg-slate-100 hover:text-[#1877F2]"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* RIGHT: PRIMARY REQUEST A QUOTE BUTTON & MOBILE TOGGLE */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <QuoteModalTrigger
                buttonText="Request a Quote"
                variant={scrolled ? "primary" : "cyan"}
                size="md"
              />
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className={`touch-btn inline-flex h-12 w-12 items-center justify-center rounded-xl lg:hidden ${
                scrolled
                  ? "border border-[#E2E8F0] bg-[#F5F8FC] text-[#0B1730] hover:bg-slate-200"
                  : "border border-white/15 bg-white/5 text-white hover:bg-white/15"
              }`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* DESKTOP MEGA MENU: PRODUCTS & SOLUTIONS */}
        {activeDropdown === "products" && (
          <div className="hidden border-t border-[#E2E8F0] bg-white text-[#172033] shadow-2xl lg:block">
            <div className="mx-auto max-w-7xl px-8 py-8">
              <div className="grid grid-cols-12 gap-8">
                {/* 4 CORE SOLUTION GROUPS */}
                <div className="col-span-5 border-r border-[#E2E8F0] pr-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                      <Layers className="h-3.5 w-3.5" />4 Core Solution Pillars
                    </span>
                    <Link
                      href="/products"
                      className="text-xs font-semibold text-[#0B1730] hover:text-[#1877F2]"
                    >
                      Full Catalog →
                    </Link>
                  </div>
                  <div className="space-y-2.5">
                    {coreCategories.map((cat) => {
                      const targetHref = cat.dedicatedRoute || `/products#${cat.slug}`;
                      return (
                        <Link
                          key={cat.id}
                          href={targetHref}
                          className="group flex items-start gap-3.5 rounded-xl border border-transparent p-3 transition hover:border-[#E2E8F0] hover:bg-[#F5F8FC]"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0B1730] text-[#00B8D9] transition group-hover:bg-[#1877F2] group-hover:text-white">
                            <DynamicIcon name={cat.icon} className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#0B1730] group-hover:text-[#1877F2]">
                              {cat.name}
                            </div>
                            <p className="mt-0.5 line-clamp-2 text-xs text-[#64748B]">
                              {cat.shortDescription}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* AI VIDEO ANALYTICS HIERARCHY (5 CATEGORIES & 21 APPLICATIONS) */}
                <div className="col-span-7">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#0095B0] uppercase">
                      <Sparkles className="h-3.5 w-3.5" />
                      AI Video Analytics & Vision Applications (21 Solutions)
                    </span>
                    <Link
                      href="/products/ai-video-analytics"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1877F2] hover:underline"
                    >
                      Explore All AI Solutions <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                    {aiCategories.map((aiCat) => (
                      <div
                        key={aiCat.id}
                        className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-3.5"
                      >
                        <Link
                          href={`/products/ai-video-analytics#${aiCat.slug}`}
                          className="block text-xs font-bold text-[#0B1730] hover:text-[#1877F2]"
                        >
                          {aiCat.name}
                        </Link>
                        <ul className="mt-2 space-y-1.5">
                          {aiCat.solutions.slice(0, 4).map((sol) => (
                            <li key={sol.id}>
                              <Link
                                href={`/products/ai-video-analytics/${sol.slug}`}
                                className="block truncate text-xs text-[#64748B] transition hover:translate-x-0.5 hover:font-medium hover:text-[#1877F2]"
                              >
                                • {sol.name}
                              </Link>
                            </li>
                          ))}
                          {aiCat.solutions.length > 4 && (
                            <li>
                              <Link
                                href={`/products/ai-video-analytics#${aiCat.slug}`}
                                className="text-[11px] font-semibold text-[#1877F2] hover:underline"
                              >
                                +{aiCat.solutions.length - 4} more applications →
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DESKTOP MEGA MENU: 12 SERVICES */}
        {activeDropdown === "services" && (
          <div className="hidden border-t border-[#E2E8F0] bg-white text-[#172033] shadow-2xl lg:block">
            <div className="mx-auto max-w-7xl px-8 py-8">
              <div className="mb-5 flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                    <Wrench className="h-3.5 w-3.5" />
                    Industrial & Facility Engineering Services (12 Verticals)
                  </span>
                  <p className="mt-0.5 text-xs text-[#64748B]">
                    System Integration • Installation • Commissioning • Preventive Maintenance • Technical Support
                  </p>
                </div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 rounded-lg bg-[#0B1730] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1877F2]"
                >
                  <span>View All 12 Services</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 xl:grid-cols-4">
                {services.map((svc) => (
                  <Link
                    key={svc.id}
                    href={`/services/${svc.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-[#E2E8F0]/70 p-3 transition hover:border-[#1877F2] hover:bg-[#F5F8FC]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0B1730]/5 text-[#1877F2] transition group-hover:bg-[#1877F2] group-hover:text-white">
                      <DynamicIcon name={svc.icon} className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-xs font-bold text-[#0B1730] group-hover:text-[#1877F2]">
                        {svc.name}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-[11px] text-[#64748B]">
                        {svc.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MOBILE ACCESSIBLE DRAWER */}
        {mobileMenuOpen && (
          <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-white/15 bg-[#0B1730]/98 px-4 pt-4 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] text-white shadow-2xl backdrop-blur-xl lg:hidden">
            <div className="space-y-2">
            <Link
              href="/"
              className="touch-btn flex min-h-[48px] items-center rounded-xl px-3.5 py-2.5 text-base font-semibold hover:bg-white/10"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className="touch-btn flex min-h-[48px] items-center rounded-xl px-3.5 py-2.5 text-base font-semibold hover:bg-white/10"
            >
              About Us
            </Link>

            {/* Expandable Products & Solutions */}
            <div className="rounded-2xl border border-white/10 bg-[#142B49]/60">
              <div className="flex min-h-[52px] items-center justify-between px-3.5 py-1.5">
                <Link
                  href="/products"
                  className="flex min-h-[44px] flex-1 items-center text-base font-semibold text-[#00B8D9]"
                >
                  Products & Solutions
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    setMobileSection(mobileSection === "products" ? null : "products")
                  }
                  aria-label="Toggle Products & Solutions submenu"
                  className="touch-btn flex h-12 w-12 items-center justify-center rounded-xl hover:bg-white/10"
                >
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      mobileSection === "products" ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              {mobileSection === "products" && (
                <div className="space-y-1.5 border-t border-white/10 px-3.5 py-3 text-sm">
                  {coreCategories.map((c) => (
                    <Link
                      key={c.id}
                      href={c.dedicatedRoute || `/products#${c.slug}`}
                      className="flex min-h-[44px] items-center rounded-xl px-2 py-2 text-slate-200 hover:bg-white/5 hover:text-[#00B8D9]"
                    >
                      • {c.name}
                    </Link>
                  ))}
                  <div className="pt-2">
                    <span className="px-2 text-xs font-bold tracking-wider text-[#00B8D9] uppercase">
                      AI Video Analytics Categories
                    </span>
                    <div className="mt-1.5 space-y-1 pl-2">
                      {aiCategories.map((ai) => (
                        <Link
                          key={ai.id}
                          href={`/products/ai-video-analytics#${ai.slug}`}
                          className="flex min-h-[42px] items-center rounded-lg px-2 py-1.5 text-xs text-slate-300 hover:bg-white/5 hover:text-white"
                        >
                          → {ai.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Expandable Services */}
            <div className="rounded-2xl border border-white/10 bg-[#142B49]/60">
              <div className="flex min-h-[52px] items-center justify-between px-3.5 py-1.5">
                <Link
                  href="/services"
                  className="flex min-h-[44px] flex-1 items-center text-base font-semibold text-[#00B8D9]"
                >
                  Services (12)
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    setMobileSection(mobileSection === "services" ? null : "services")
                  }
                  aria-label="Toggle Services submenu"
                  className="touch-btn flex h-12 w-12 items-center justify-center rounded-xl hover:bg-white/10"
                >
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      mobileSection === "services" ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              {mobileSection === "services" && (
                <div className="grid grid-cols-1 gap-1 border-t border-white/10 px-3.5 py-3 text-xs">
                  {services.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      className="flex min-h-[42px] items-center rounded-lg px-2 py-1.5 text-slate-200 hover:bg-white/5 hover:text-[#00B8D9]"
                    >
                      • {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {showBrands && (
              <Link
                href="/brands"
                className="touch-btn flex min-h-[48px] items-center rounded-xl px-3.5 py-2.5 text-base font-semibold hover:bg-white/10"
              >
                Brands
              </Link>
            )}

            {showTestimonials && (
              <Link
                href="/testimonials"
                className="touch-btn flex min-h-[48px] items-center rounded-xl px-3.5 py-2.5 text-base font-semibold hover:bg-white/10"
              >
                Testimonials
              </Link>
            )}

            <Link
              href="/contact-us"
              className="touch-btn flex min-h-[48px] items-center rounded-xl px-3.5 py-2.5 text-base font-semibold hover:bg-white/10"
            >
              Contact Us
            </Link>

            <div className="pt-3">
              <QuoteModalTrigger
                buttonText="Request a Quote"
                variant="cyan"
                size="lg"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </header>
  );
}
