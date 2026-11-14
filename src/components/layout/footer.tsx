import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ArrowUpRight, Shield } from "lucide-react";
import { getPublicNavigationData } from "@/lib/db/queries";

export async function Footer() {
  const { services, settings } = await getPublicNavigationData();
  const featuredServices = services.slice(0, 6);

  const companyName = settings.company_name || "Zenin Systems Solutions LLP";
  const tagline =
    settings.company_tagline ||
    "Industrial Security, AI Video Analytics & Engineering Solutions";
  const address =
    settings.contact_address ||
    "Office Address Pending Admin Configuration — Zenin Systems Solutions LLP";
  const email = settings.contact_email || "contact@zeninsystems.com";
  const phone = settings.contact_phone || "Phone Pending Admin Configuration";

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#081424] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] sm:px-6 sm:pt-16 lg:px-8 lg:pb-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* BRAND & COMPANY OVERVIEW */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex min-h-[48px] items-center gap-3 rounded-xl py-1"
            >
              <div className="relative flex h-16 w-auto items-center justify-center overflow-hidden rounded-2xl bg-white px-3.5 py-1.5 shadow-md transition-transform group-hover:scale-105 border border-white/20">
                <Image
                  src="/images/logo.png"
                  alt="Zenin Systems Solutions LLP"
                  width={220}
                  height={72}
                  className="h-13 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-white">
                  ZENIN <span className="text-[#00B8D9]">SYSTEMS</span>
                </span>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
                  Solutions LLP
                </span>
              </div>
            </Link>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              {tagline}. Delivering integrated industrial surveillance, AI computer
              vision, building management, fire safety, and automation engineering
              for modern enterprise operations.
            </p>

            <div className="mt-5 inline-flex min-h-[44px] items-center gap-2.5 rounded-xl border border-white/10 bg-[#0B1730] px-3.5 py-2.5 text-xs text-slate-300 shadow-xs">
              <Shield className="h-4 w-4 shrink-0 text-[#00B8D9]" />
              <span>B2B Industrial Technology & Engineering Partner</span>
            </div>
          </div>

          {/* COLUMN 1: CORE SOLUTIONS & COMPANY (2-col subgrid on mobile) */}
          <div className="grid grid-cols-2 gap-6 sm:col-span-1 sm:block lg:col-span-3">
            <div>
              <h3 className="text-xs font-bold tracking-wider text-white uppercase">
                Core Solutions
              </h3>
              <ul className="mt-3 space-y-1 text-sm">
                <li>
                  <Link
                    href="/products/cctv-surveillance"
                    className="flex min-h-[44px] items-center rounded-lg py-1.5 text-slate-300 transition hover:text-[#00B8D9]"
                  >
                    CCTV Surveillance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/ai-video-analytics"
                    className="flex min-h-[44px] items-center rounded-lg py-1.5 text-slate-300 transition hover:text-[#00B8D9]"
                  >
                    AI Video Analytics (21)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/video-management"
                    className="flex min-h-[44px] items-center rounded-lg py-1.5 text-slate-300 transition hover:text-[#00B8D9]"
                  >
                    Video Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/intelligent-automation"
                    className="flex min-h-[44px] items-center rounded-lg py-1.5 text-slate-300 transition hover:text-[#00B8D9]"
                  >
                    Intelligent Automation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="flex min-h-[44px] items-center rounded-lg py-1.5 font-semibold text-[#00B8D9] transition hover:underline"
                  >
                    Full Product Catalog →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sm:mt-7">
              <h3 className="text-xs font-bold tracking-wider text-white uppercase">
                Company
              </h3>
              <ul className="mt-3 space-y-1 text-sm">
                <li>
                  <Link
                    href="/about-us"
                    className="flex min-h-[44px] items-center rounded-lg py-1.5 text-slate-300 transition hover:text-[#00B8D9]"
                  >
                    About Us
                  </Link>
                </li>
                {settings.nav_show_brands !== "false" && (
                  <li>
                    <Link
                      href="/brands"
                      className="flex min-h-[44px] items-center rounded-lg py-1.5 text-slate-300 transition hover:text-[#00B8D9]"
                    >
                      Technology Brands
                    </Link>
                  </li>
                )}
                {settings.nav_show_testimonials !== "false" && (
                  <li>
                    <Link
                      href="/testimonials"
                      className="flex min-h-[44px] items-center rounded-lg py-1.5 text-slate-300 transition hover:text-[#00B8D9]"
                    >
                      Testimonials
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/contact-us"
                    className="flex min-h-[44px] items-center rounded-lg py-1.5 text-slate-300 transition hover:text-[#00B8D9]"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 2: SERVICES */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">
              Engineering Services
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-1 text-sm">
              {featuredServices.map((svc) => (
                <li key={svc.id}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="flex min-h-[44px] items-center rounded-lg py-1.5 text-slate-300 transition hover:text-[#00B8D9]"
                  >
                    <span className="line-clamp-1">{svc.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/services"
                  className="inline-flex min-h-[44px] items-center gap-1 font-semibold text-[#00B8D9] hover:underline"
                >
                  <span>View All 12 Services</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: CONTACT DETAILS */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">
              Contact Desk
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00B8D9]" />
                <span className="text-xs leading-relaxed text-slate-300">
                  {address}
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="touch-btn flex min-h-[48px] items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 text-xs text-slate-200 transition hover:border-[#00B8D9]/40 hover:text-[#00B8D9]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#00B8D9]" />
                  <span className="truncate">{email}</span>
                </a>
              </li>
              <li className="flex min-h-[48px] items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#00B8D9]" />
                <span className="text-xs text-slate-200">{phone}</span>
              </li>
            </ul>

            {(settings.social_linkedin || settings.social_youtube) && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {settings.social_linkedin && (
                  <a
                    href={settings.social_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-btn inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium hover:border-[#00B8D9] hover:text-[#00B8D9]"
                  >
                    LinkedIn
                  </a>
                )}
                {settings.social_youtube && (
                  <a
                    href={settings.social_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-btn inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium hover:border-[#00B8D9] hover:text-[#00B8D9]"
                  >
                    YouTube
                  </a>
                )}
              </div>
            )}

            <div className="mt-5">
              <Link
                href="/contact-us"
                className="touch-btn inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#125EC4]"
              >
                <span>Schedule Engineering Consultation</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5">
            <Link
              href="/privacy-policy"
              className="inline-flex min-h-[44px] items-center px-2 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="inline-flex min-h-[44px] items-center px-2 hover:text-white"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/admin/dashboard"
              className="inline-flex min-h-[44px] items-center px-2 text-slate-500 hover:text-slate-300"
            >
              Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
