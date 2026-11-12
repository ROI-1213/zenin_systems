import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Cpu,
  ShieldCheck,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { getAICategoriesWithSolutions } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Reveal, StaggerGrid, StaggerCard } from "@/components/ui/cinematic-motion";

export const metadata: Metadata = {
  title: "AI Video Analytics & AI Vision Solutions (21 Industrial Applications)",
  description:
    "Explore Zenin Systems' 21 industrial AI video analytics solutions across Safety & Compliance, Security & Surveillance, Process & Surface Quality, Thermal Monitoring, and Custom AI Vision.",
};

export const dynamic = "force-dynamic";

export default async function AIVideoAnalyticsHubPage() {
  const aiCategories = await getAICategoriesWithSolutions(false);
  const totalSolutionsCount = aiCategories.reduce(
    (acc, cat) => acc + cat.solutions.length,
    0
  );

  return (
    <div>
      {/* 1. AI-FOCUSED HERO */}
      <section className="bg-[#0B1730] bg-industrial-grid py-16 text-white lg:py-22">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Products & Solutions", href: "/products" },
              { label: "AI Video Analytics & AI Vision Solutions" },
            ]}
            light
          />

          <div className="mt-4 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/35 bg-[#00B8D9]/10 px-4 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  5 Application Domains • {totalSolutionsCount} Specialized AI Vision
                  Solutions
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                AI Video Analytics & Industrial Computer Vision Suite
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Convert passive industrial CCTV cameras and production-line optical
                sensors into real-time operational intelligence. Detect safety
                violations, secure facility perimeters, inspect surface quality, and
                monitor thermal anomalies automatically.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                <QuoteModalTrigger
                  buttonText="Request AI Vision Demo & Quote"
                  variant="cyan"
                  size="lg"
                  className="w-full sm:w-auto"
                  preselectedTopicName="AI Video Analytics & AI Vision Suite"
                />
                <a
                  href="#category-navigation"
                  className="touch-btn inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
                >
                  <span>Browse All {totalSolutionsCount} AI Applications</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-[#00B8D9]/30 bg-[#142B49]/90 p-6 shadow-2xl">
                <div className="text-xs font-bold tracking-wider text-[#00B8D9] uppercase">
                  Architecture Highlights
                </div>
                <ul className="mt-4 space-y-3 text-xs text-slate-200 sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00B8D9]" />
                    <span>Compatible with standard RTSP / ONVIF IP cameras</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00B8D9]" />
                    <span>On-premise Edge & GPU Server deployment options</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00B8D9]" />
                    <span>Real-time PLC, VMS, Siren & Webhook alert outputs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00B8D9]" />
                    <span>Custom model training for plant-specific SOPs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY NAVIGATION ANCHOR BAR */}
      <div
        id="category-navigation"
        className="sticky top-16 z-30 border-b border-[#E2E8F0] bg-white/95 shadow-2xs backdrop-blur-md sm:top-20"
      >
        <div className="no-scrollbar mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
          <span className="hidden shrink-0 text-xs font-bold tracking-wider text-[#64748B] uppercase sm:inline">
            Jump to Domain:
          </span>
          {aiCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.slug}`}
              className="touch-btn inline-flex min-h-[44px] shrink-0 items-center rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-4 py-2 text-xs font-semibold text-[#0B1730] transition hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white"
            >
              {cat.name} ({cat.solutions.length})
            </a>
          ))}
        </div>
      </div>

      {/* 3. FIVE MAJOR AI APPLICATION CATEGORIES */}
      <div className="divide-y divide-[#E2E8F0]">
        {aiCategories.map((cat, index) => (
          <section
            key={cat.id}
            id={cat.slug}
            className={`scroll-mt-32 py-16 lg:py-20 ${
              index % 2 === 0 ? "bg-white" : "bg-[#F5F8FC]"
            }`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#1877F2]/10 px-3 py-1 text-xs font-bold text-[#1877F2] uppercase">
                    <DynamicIcon name={cat.icon} className="h-3.5 w-3.5" />
                    <span>
                      {cat.code.replace("_", " ")} • {cat.solutions.length} Applications
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold text-[#0B1730] sm:text-3xl">
                    {cat.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B] sm:text-base">
                    {cat.description}
                  </p>
                </div>

                <QuoteModalTrigger
                  buttonText={`Enquire About ${cat.name}`}
                  variant="outline"
                  size="sm"
                  preselectedTopicName={`AI Analytics — ${cat.name}`}
                />
              </div>

              <StaggerGrid className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cat.solutions.map((sol) => (
                  <StaggerCard
                    key={sol.id}
                    className="app-card group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#1877F2]"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-[#0B1730]">
                      {sol.featuredImage && (
                        <Image
                          src={sol.featuredImage}
                          alt={sol.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="cinematic-img object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/85 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-[#0B1730]/90 px-2.5 py-1 text-[11px] font-semibold text-[#00B8D9] backdrop-blur-md">
                        {cat.name}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-[#0B1730] transition group-hover:text-[#1877F2]">
                        {sol.name}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                        {sol.shortDescription}
                      </p>

                      {sol.capabilities.length > 0 && (
                        <ul className="mt-4 space-y-1 border-t border-[#E2E8F0] pt-3">
                          {sol.capabilities.slice(0, 2).map((cap) => (
                            <li
                              key={cap}
                              className="line-clamp-1 text-xs text-[#172033]"
                            >
                              • {cap}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E2E8F0] pt-4">
                        <Link
                          href={`/products/ai-video-analytics/${sol.slug}`}
                          className="touch-btn inline-flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-xs font-bold tracking-wider text-[#1877F2] uppercase transition hover:border-[#1877F2] hover:bg-white"
                        >
                          <span>Explore</span>
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </Link>
                        <QuoteModalTrigger
                          buttonText="Quote"
                          variant="primary"
                          size="sm"
                          aiSolutionId={sol.id}
                          aiSolutionSlug={sol.slug}
                          preselectedTopicName={sol.name}
                        />
                      </div>
                    </div>
                  </StaggerCard>
                ))}
              </StaggerGrid>
            </div>
          </section>
        ))}
      </div>

      {/* 4. WHY AI MONITORING & INTEGRATION OVERVIEW */}
      <section className="border-t border-[#E2E8F0] bg-[#0B1730] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            eyebrow="Integration Architecture"
            title="Why Deploy Industrial AI Video Monitoring?"
            description="Our AI Video Analytics pipeline works alongside your existing IP surveillance, VMS, and plant control infrastructure."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#142B49]/70 p-6">
              <Cpu className="h-6 w-6 text-[#00B8D9]" />
              <h3 className="mt-4 text-lg font-bold">
                1. Stream Ingestion & Calibration
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                Connect existing RTSP/ONVIF IP cameras, thermal sensors, or industrial
                machine vision cameras to on-premise AI inference nodes.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#142B49]/70 p-6">
              <Layers className="h-6 w-6 text-[#00B8D9]" />
              <h3 className="mt-4 text-lg font-bold">
                2. Zone Rules & Deep-Learning Inference
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                Configure polygon rule zones, shift schedules, and multi-condition
                logic tailored to your plant layout and EHS guidelines.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#142B49]/70 p-6">
              <ShieldCheck className="h-6 w-6 text-[#00B8D9]" />
              <h3 className="mt-4 text-lg font-bold">
                3. Real-Time Action & Audit Dashboards
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                Trigger instant local hooters, VMS pop-ups, PLC interlocks, boom
                barriers, and timestamped compliance reports.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-white/15 bg-white p-6 text-[#172033] shadow-2xl sm:p-10">
            <h3 className="text-xl font-bold text-[#0B1730] sm:text-2xl">
              Request an AI Video Analytics Architecture Assessment
            </h3>
            <p className="mt-1 mb-6 text-xs text-[#64748B] sm:text-sm">
              Tell us which AI applications you are evaluating and how many camera
              streams or zones you plan to cover.
            </p>
            <EnquiryForm
              preselectedTopicName="AI Video Analytics & AI Vision Solutions"
              compact
            />
          </div>
        </div>
      </section>
    </div>
  );
}
