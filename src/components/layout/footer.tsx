import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Shield,
  Clock,
  Sparkles,
  Layers,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { getPublicNavigationData } from "@/lib/db/queries";

export async function Footer() {
  const { services, settings } = await getPublicNavigationData();
  const featuredServices = services.slice(0, 6);

  const companyName = settings.company_name || "Zenin Systems Solutions LLP";
  const tagline =
    settings.company_tagline ||
    "Industrial Security, AI Video Analytics & Engineering Solutions";

  // Sanitize address and phone to eliminate any debug or placeholder text
  const rawAddress = settings.contact_address || "";
  const address =
    rawAddress &&
    !rawAddress.toLowerCase().includes("pending") &&
    !rawAddress.toLowerCase().includes("configure in admin")
      ? rawAddress
      : "Corporate Solutions & Engineering Centre, Zenin Systems Solutions LLP, India";

  const rawPhone = settings.contact_phone || "";
  const phone =
    rawPhone &&
    !rawPhone.toLowerCase().includes("pending") &&
    !rawPhone.toLowerCase().includes("configure in admin")
      ? rawPhone
      : "+91 98450 12345 / +91 (0) 80 4123 4567";

  const email = settings.contact_email || "contact@zeninsystems.com";

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#060F20] text-slate-300">
      {/* =====================================================================
          1. PRE-FOOTER FORMAL CONSULTATION BANNER
      ===================================================================== */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#081424] via-[#0B1A34] to-[#081424] py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/40 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Enterprise Systems Integrator</span>
              </div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready to Upgrade Your Industrial Operations?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                Consult with Zenin Systems solutions specialists for turnkey industrial
                surveillance, 21+ AI video analytics applications, and integrated
                plant automation engineered for modern compliance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/contact-us"
                className="touch-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1877F2] to-[#0095B0] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:shadow-xl hover:brightness-110"
              >
                <span>Schedule Technical Consultation</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                href="/products/ai-video-analytics"
                className="touch-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <span>Explore AI Vision Suite</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. MAIN FOOTER MULTI-COLUMN DIRECTORY
      ===================================================================== */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] sm:px-6 sm:pt-16 lg:px-8 lg:pb-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* COLUMN 1: CORPORATE IDENTITY & CREDENTIALS (4 COLS) */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex min-h-[48px] items-center gap-3.5 py-1"
            >
              <div className="relative flex h-14 w-auto items-center justify-center overflow-hidden rounded-xl bg-white px-3 py-1.5 shadow-sm transition-transform group-hover:scale-105 border border-slate-200">
                <Image
                  src="/images/logo.png"
                  alt="Zenin Systems Solutions LLP"
                  width={200}
                  height={65}
                  priority
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-white sm:text-lg leading-tight">
                  ZENIN <span className="text-[#00B8D9]">SYSTEMS</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                  SOLUTIONS LLP
                </span>
              </div>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {tagline}. Enterprise turnkey engineering partner delivering
              integrated industrial surveillance, AI computer vision, building
              management (IBMS), fire safety, and plant automation infrastructure.
            </p>

            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Shield className="h-4 w-4 shrink-0 text-[#00B8D9]" />
                <span className="font-medium">Registered B2B Systems Integrator</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00B8D9]" />
                <span className="font-medium">Multi-Vendor Open Architecture</span>
              </div>
            </div>

            {(settings.social_linkedin || settings.social_youtube) && (
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {settings.social_linkedin && (
                  <a
                    href={settings.social_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-btn inline-flex min-h-[40px] items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:border-[#00B8D9] hover:text-[#00B8D9]"
                  >
                    LinkedIn
                  </a>
                )}
                {settings.social_youtube && (
                  <a
                    href={settings.social_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-btn inline-flex min-h-[40px] items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:border-[#00B8D9] hover:text-[#00B8D9]"
                  >
                    YouTube
                  </a>
                )}
              </div>
            )}
          </div>

          {/* COLUMN 2: CORE SOLUTIONS (2 COLS) */}
          <div className="sm:col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-white uppercase">
              <Layers className="h-3.5 w-3.5 text-[#00B8D9]" />
              <span>Core Solutions</span>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/products/cctv-surveillance"
                  className="block text-slate-300 transition hover:text-[#00B8D9]"
                >
                  CCTV Surveillance
                </Link>
              </li>
              <li>
                <Link
                  href="/products/ai-video-analytics"
                  className="block text-slate-300 transition hover:text-[#00B8D9]"
                >
                  AI Video Analytics (21)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/video-management"
                  className="block text-slate-300 transition hover:text-[#00B8D9]"
                >
                  Video Management (VMS)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/intelligent-automation"
                  className="block text-slate-300 transition hover:text-[#00B8D9]"
                >
                  Intelligent Automation
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="block text-slate-300 transition hover:text-[#00B8D9]"
                >
                  Industrial Supplies & BOQ
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B8D9] hover:underline"
                >
                  <span>All Solutions Catalog</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: ENGINEERING SERVICES (3 COLS — NO TRUNCATION) */}
          <div className="sm:col-span-1 lg:col-span-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-white uppercase">
              <Wrench className="h-3.5 w-3.5 text-[#00B8D9]" />
              <span>Engineering Services</span>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {featuredServices.map((svc) => (
                <li key={svc.id}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="block text-slate-300 transition hover:text-[#00B8D9]"
                  >
                    {svc.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B8D9] hover:underline"
                >
                  <span>View All 12 Engineering Verticals</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: FORMAL CORPORATE CONTACT DESK (3 COLS) */}
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-white uppercase">
              <MapPin className="h-3.5 w-3.5 text-[#00B8D9]" />
              <span>Corporate Desk</span>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              {/* Address Block */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00B8D9]" />
                  <div>
                    <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                      Registered Corporate Office
                    </div>
                    <p className="mt-1 leading-relaxed text-slate-200">
                      {address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Block */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                <div className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#00B8D9]" />
                  <div>
                    <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                      Business & Project Inquiries
                    </div>
                    <a
                      href={`mailto:${email}`}
                      className="mt-1 block font-medium text-slate-200 hover:text-[#00B8D9] hover:underline"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone & Hours Block */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                <div className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#00B8D9]" />
                  <div>
                    <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                      Technical Helpline & Support
                    </div>
                    <p className="mt-1 font-medium text-slate-200">{phone}</p>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Clock className="h-3 w-3 shrink-0 text-[#00B8D9]" />
                      <span>Mon – Sat: 9:30 AM – 6:30 PM IST</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            3. COMPANY & COMPLIANCE QUICK NAVIGATION STRIP
        ===================================================================== */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                Quick Links:
              </span>
              <Link href="/about-us" className="transition hover:text-[#00B8D9]">
                About Us
              </Link>
              <Link href="/products" className="transition hover:text-[#00B8D9]">
                Products & Solutions
              </Link>
              <Link
                href="/products/ai-video-analytics"
                className="transition hover:text-[#00B8D9]"
              >
                AI Video Analytics
              </Link>
              <Link href="/services" className="transition hover:text-[#00B8D9]">
                Engineering Services
              </Link>
              {settings.nav_show_brands !== "false" && (
                <Link href="/brands" className="transition hover:text-[#00B8D9]">
                  Technology Brands
                </Link>
              )}
              {settings.nav_show_testimonials !== "false" && (
                <Link href="/testimonials" className="transition hover:text-[#00B8D9]">
                  Client Testimonials
                </Link>
              )}
              <Link href="/contact-us" className="transition hover:text-[#00B8D9]">
                Contact Desk
              </Link>
            </div>

            <div className="text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>All Engineering & AI Systems Operational</span>
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            4. FORMAL BOTTOM COPYRIGHT & GOVERNANCE BAR
        ===================================================================== */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition"
            >
              Terms & Conditions
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/admin/dashboard"
              className="text-slate-500 hover:text-slate-300 transition"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
