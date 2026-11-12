import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
} from "lucide-react";
import {
  getPageContentBlock,
  getPublishedBrands,
  getPublishedIndustries,
} from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";

export const metadata: Metadata = {
  title: "About Us — Corporate Profile & Engineering Capabilities",
  description:
    "Learn about Zenin Systems Solutions LLP — our mission, vision, engineering capabilities across industrial CCTV, AI video analytics, IBMS, fire safety, and automation.",
};

export const dynamic = "force-dynamic";

export default async function AboutUsPage() {
  const [profileBlock, whyChooseBlock, industries, verifiedBrands] =
    await Promise.all([
      getPageContentBlock("about", "corporate_profile", {
        overview:
          "Zenin Systems Solutions LLP is a B2B industrial technology and engineering solutions company delivering integrated systems across Industrial CCTV Surveillance, AI Video Analytics, Video Management, Intelligent Automation, Fire Safety, Integrated Building Management (IBMS), and Industrial Engineering Supplies.",
        extendedOverview:
          "Rather than operating as a generic IT hardware reseller, Zenin Systems focuses on complete operational solutions—bridging optical sensors, edge AI computing, electromechanical automation, and facility management systems into dependable enterprise infrastructure.",
        mission:
          "To empower industrial and commercial organizations with reliable surveillance, intelligent computer vision, safety automation, and engineering systems that protect people, optimize processes, and strengthen operational resilience.",
        vision:
          "To be a trusted engineering partner for intelligent industrial security, AI vision analytics, and integrated facility automation across manufacturing, infrastructure, and enterprise sectors.",
        capabilities: [
          {
            title: "System Architecture & Site Engineering",
            description:
              "Detailed site surveys, camera coverage optics, network topology planning, and BOQ engineering aligned with industrial operational requirements.",
          },
          {
            title: "AI Video Analytics & Machine Vision",
            description:
              "Deployment of 21+ specialized computer vision applications across safety compliance, perimeter security, surface quality inspection, and thermal monitoring.",
          },
          {
            title: "Building & Plant Automation",
            description:
              "End-to-end implementation of IBMS, Fire Detection & Alarm Systems, HVAC controls, Smart Lighting, Energy Management, and Access Control.",
          },
          {
            title: "Industrial Supply & Custom Fabrication",
            description:
              "Consolidated procurement and assembly of industrial cables, switchgear, hydraulics/pneumatics, EV chargers, and custom control panels.",
          },
        ],
        certificationsNote: "",
      }),
      getPageContentBlock("home", "why_choose_us", {
        description:
          "Our approach combines hardware engineering, computer vision intelligence, and field integration expertise.",
        pillars: [],
      }),
      getPublishedIndustries(),
      getPublishedBrands(),
    ]);

  return (
    <div>
      {/* 1. PAGE BANNER & BREADCRUMBS */}
      <section className="bg-[#0B1730] bg-industrial-grid py-16 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "About Us" }]} light />
          <span className="inline-block rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
            {profileBlock.subtitle || "ABOUT ZENIN SYSTEMS SOLUTIONS LLP"}
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            {profileBlock.title ||
              "Engineering Intelligent Infrastructure for Safer, Smarter Operations"}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {profileBlock.data.overview}
          </p>
        </div>
      </section>

      {/* 2. COMPANY OVERVIEW */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Corporate Overview"
                title="Integrated Industrial Technology & Engineering Partner"
              />
              <p className="mt-5 text-base leading-relaxed text-[#172033]">
                {profileBlock.data.overview}
              </p>
              {profileBlock.data.extendedOverview && (
                <p className="mt-4 text-sm leading-relaxed text-[#64748B] sm:text-base">
                  {profileBlock.data.extendedOverview}
                </p>
              )}

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-4">
                  <div className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                    Surveillance & AI Vision
                  </div>
                  <p className="mt-1 text-xs text-[#64748B]">
                    Industrial CCTV, Central VMS, and 21 specialized AI video analytics
                    applications for safety, security, and quality control.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-4">
                  <div className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                    Facility & Plant Systems
                  </div>
                  <p className="mt-1 text-xs text-[#64748B]">
                    12 turnkey service verticals including Fire Alarm, IBMS, Access
                    Control, HVAC, PA, EV Charging, and Industrial Supplies.
                  </p>
                </div>
              </div>
            </div>

            {/* 3 & 4. MISSION AND VISION */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-2xl border border-[#E2E8F0] bg-[#0B1730] p-7 text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1877F2] text-white">
                    <Target className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold">Our Mission</h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {profileBlock.data.mission}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0B1730]">Our Vision</h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#64748B]">
                  {profileBlock.data.vision}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXPERTISE AND CAPABILITIES */}
      <section className="border-y border-[#E2E8F0] bg-[#F5F8FC] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Technical Domains"
            title="Expertise & Engineering Capabilities"
            description="End-to-end execution across hardware selection, AI vision model deployment, field installation, system integration, and lifecycle maintenance."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {(profileBlock.data.capabilities || []).map(
              (cap: { title: string; description: string }) => (
                <div
                  key={cap.title}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-[#1877F2]" />
                    <h3 className="text-lg font-bold text-[#0B1730]">{cap.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                    {cap.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE ZENIN SYSTEMS */}
      {whyChooseBlock.data.pillars && whyChooseBlock.data.pillars.length > 0 && (
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Enterprise Value Proposition"
              title="Why Choose Zenin Systems"
              description={whyChooseBlock.data.description}
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whyChooseBlock.data.pillars.map(
                (p: { title: string; description: string; icon: string }) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                      <DynamicIcon name={p.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-[#0B1730]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                      {p.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* 7. INDUSTRIES SERVED */}
      <section className="border-t border-[#E2E8F0] bg-[#F5F8FC] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Target Verticals"
            title="Industries We Serve"
            description="Tailored surveillance, AI monitoring, and facility automation solutions for industrial and commercial environments."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <div
                key={ind.id}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1877F2]/10 text-[#1877F2]">
                    <DynamicIcon name={ind.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B1730]">{ind.name}</h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                  {ind.shortDescription}
                </p>
                {ind.applications.length > 0 && (
                  <ul className="mt-4 space-y-1.5 border-t border-[#E2E8F0] pt-3">
                    {ind.applications.map((app) => (
                      <li
                        key={app}
                        className="flex items-center gap-2 text-xs font-medium text-[#172033]"
                      >
                        <Layers className="h-3.5 w-3.5 text-[#1877F2]" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CERTIFICATIONS & TECHNOLOGY PARTNERS (ONLY IF VERIFIED) */}
      {(profileBlock.data.certificationsNote || verifiedBrands.length > 0) && (
        <section className="border-t border-[#E2E8F0] bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Verified Credentials"
              title="Certifications & Technology Partners"
            />
            {profileBlock.data.certificationsNote && (
              <p className="mt-4 text-sm text-[#64748B]">
                {profileBlock.data.certificationsNote}
              </p>
            )}
            {verifiedBrands.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                {verifiedBrands.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-center rounded-xl border border-[#E2E8F0] p-4 text-sm font-bold text-[#0B1730]"
                  >
                    {b.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 9. CONTACT CTA */}
      <section className="bg-[#0B1730] py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#00B8D9] uppercase">
              <ShieldCheck className="h-4 w-4" />
              <span>Partner With Zenin Systems</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Ready to Upgrade Your Facility Security or Industrial Automation?
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Speak with our engineering team for a comprehensive site review or project
              proposal.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <QuoteModalTrigger
              buttonText="Request a Quote"
              variant="cyan"
              size="lg"
              preselectedTopicName="Corporate / Multi-System Consultation"
            />
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <span>Contact Desk</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
