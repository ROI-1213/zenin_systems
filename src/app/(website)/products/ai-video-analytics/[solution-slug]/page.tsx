import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  AlertTriangle,
  Cpu,
  CheckCircle2,
  Factory,
  TrendingUp,
  Network,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import {
  getAICategoriesWithSolutions,
  getAISolutionBySlug,
} from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "solution-slug": string }>;
}): Promise<Metadata> {
  const { "solution-slug": slug } = await params;
  const solution = await getAISolutionBySlug(slug);
  if (!solution) {
    return { title: "AI Solution Not Found" };
  }
  return {
    title: solution.seoTitle || `${solution.name} — AI Video Analytics`,
    description: solution.seoDescription || solution.shortDescription,
  };
}

export default async function AISolutionDetailPage({
  params,
}: {
  params: Promise<{ "solution-slug": string }>;
}) {
  const { "solution-slug": slug } = await params;
  const solution = await getAISolutionBySlug(slug);
  if (!solution) {
    notFound();
  }

  const allCategories = await getAICategoriesWithSolutions(false);
  const allSolutions = allCategories.flatMap((c) => c.solutions);

  const relatedSolutions = allSolutions
    .filter(
      (s) =>
        s.id !== solution.id &&
        (solution.relatedSolutionSlugs.includes(s.slug) ||
          s.categoryId === solution.categoryId)
    )
    .slice(0, 3);

  return (
    <div>
      {/* 1 & 2. HERO BANNER & BREADCRUMB NAVIGATION */}
      <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
        <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] border border-white/15 bg-[#0B1730] bg-industrial-grid py-12 text-white shadow-2xl sm:py-16 lg:py-20">
          <div className="px-5 sm:px-8 lg:px-12">
            <Breadcrumbs
              items={[
                { label: "Products & Solutions", href: "/products" },
                {
                  label: "AI Video Analytics",
                  href: "/products/ai-video-analytics",
                },
                {
                  label: solution.categoryName,
                  href: `/products/ai-video-analytics#${solution.categorySlug}`,
                },
                { label: solution.name },
              ]}
              light
            />

            <div className="mt-4 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/35 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{solution.categoryName}</span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  {solution.name}
                </h1>

                <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                  {solution.shortDescription}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <QuoteModalTrigger
                    buttonText={`Request a Quote — ${solution.name}`}
                    variant="cyan"
                    size="lg"
                    aiSolutionId={solution.id}
                    aiSolutionSlug={solution.slug}
                    preselectedTopicName={solution.name}
                  />
                  <Link
                    href="/products/ai-video-analytics"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>All 21 AI Solutions</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/15 bg-[#142B49] shadow-2xl">
                  {solution.featuredImage && (
                    <Image
                      src={solution.featuredImage}
                      alt={solution.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MAIN CONTENT & AUTO-ATTRIBUTED QUOTE SIDEBAR */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* LEFT 7 COLUMNS: SECTIONS 3 TO 10 */}
            <div className="space-y-12 lg:col-span-7">
              {/* 3. SOLUTION OVERVIEW */}
              <div>
                <span className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                  01 • Solution Overview
                </span>
                <h2 className="mt-1 text-2xl font-bold text-[#0B1730]">
                  About {solution.name}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#64748B]">
                  {solution.overview}
                </p>
              </div>

              {/* 4. PROBLEM OR INDUSTRIAL USE CASE */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
                <div className="flex items-center gap-2.5 text-amber-800">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  <h3 className="text-lg font-bold">
                    02 • Industrial Challenge & Operational Use Case
                  </h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-amber-950/80 sm:text-base">
                  {solution.problemStatement}
                </p>
              </div>

              {/* 5. HOW THE SOLUTION WORKS — CONCEPTUAL OVERVIEW */}
              <div className="rounded-2xl border border-[#E2E8F0] bg-[#0B1730] p-7 text-white">
                <div className="flex items-center gap-2.5 text-[#00B8D9]">
                  <Cpu className="h-5 w-5 shrink-0" />
                  <h3 className="text-lg font-bold text-white">
                    03 • How the Solution Works — Conceptual Pipeline
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {solution.howItWorks}
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 border-t border-white/10 pt-5 text-xs sm:grid-cols-3">
                  <div className="rounded-xl bg-white/5 p-3">
                    <span className="font-bold text-[#00B8D9]">Step 1: Capture</span>
                    <p className="mt-1 text-slate-300">
                      Ingests live IP camera or optical sensor streams from the target
                      zone.
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <span className="font-bold text-[#00B8D9]">Step 2: Analyze</span>
                    <p className="mt-1 text-slate-300">
                      Runs deep-learning detection and zone rule logic on edge/server
                      hardware.
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <span className="font-bold text-[#00B8D9]">Step 3: Alert & Log</span>
                    <p className="mt-1 text-slate-300">
                      Dispatches real-time VMS/PLC alerts and archives visual evidence.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. KEY CAPABILITIES */}
              {solution.capabilities.length > 0 && (
                <div>
                  <span className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                    04 • Functional Scope
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-[#0B1730]">
                    Key Capabilities
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {solution.capabilities.map((cap) => (
                      <div
                        key={cap}
                        className="flex items-start gap-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1877F2]" />
                        <span className="text-sm font-medium text-[#172033]">
                          {cap}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7 & 8. APPLICABLE INDUSTRIES & BENEFITS */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {solution.applicableIndustries.length > 0 && (
                  <div className="rounded-2xl border border-[#E2E8F0] p-6">
                    <div className="flex items-center gap-2 text-[#0B1730]">
                      <Factory className="h-5 w-5 text-[#1877F2]" />
                      <h3 className="text-base font-bold">Applicable Industries</h3>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-[#64748B]">
                      {solution.applicableIndustries.map((ind) => (
                        <li key={ind} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#1877F2]" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {solution.benefits.length > 0 && (
                  <div className="rounded-2xl border border-[#E2E8F0] p-6">
                    <div className="flex items-center gap-2 text-[#0B1730]">
                      <TrendingUp className="h-5 w-5 text-[#0095B0]" />
                      <h3 className="text-base font-bold">Operational Benefits</h3>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-[#64748B]">
                      {solution.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0095B0]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 9. INTEGRATION INFORMATION */}
              {solution.integrationInfo && (
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-6">
                  <div className="flex items-center gap-2 text-[#0B1730]">
                    <Network className="h-5 w-5 text-[#1877F2]" />
                    <h3 className="text-base font-bold">
                      Integration & Deployment Notes
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                    {solution.integrationInfo}
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT 5 COLUMNS: 12. EMBEDDED AUTO-ATTRIBUTED REQUEST A QUOTE FORM */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-6 shadow-lg sm:p-7">
                <span className="text-[11px] font-bold tracking-wider text-[#1877F2] uppercase">
                  Direct AI Solution Attribution
                </span>
                <h2 className="mt-1 text-xl font-bold text-[#0B1730]">
                  Request a Quote for {solution.name}
                </h2>
                <p className="mt-1 mb-5 text-xs text-[#64748B]">
                  Your enquiry automatically identifies{" "}
                  <strong className="text-[#0B1730]">{solution.name}</strong> so our
                  vision engineers can prepare a relevant proposal.
                </p>

                <EnquiryForm
                  aiSolutionId={solution.id}
                  aiSolutionSlug={solution.slug}
                  preselectedTopicName={solution.name}
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. RELATED AI SOLUTIONS */}
      {relatedSolutions.length > 0 && (
        <section className="border-t border-[#E2E8F0] bg-[#F5F8FC] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0B1730]">
                Related AI Video Analytics Applications
              </h2>
              <Link
                href="/products/ai-video-analytics"
                className="text-xs font-bold text-[#1877F2] uppercase hover:underline"
              >
                View All 21 Solutions →
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedSolutions.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/ai-video-analytics/${rel.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 transition hover:border-[#1877F2] hover:shadow-md"
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#1877F2] uppercase">
                      {rel.categoryName}
                    </span>
                    <h3 className="mt-1.5 text-lg font-bold text-[#0B1730] group-hover:text-[#1877F2]">
                      {rel.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs text-[#64748B]">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#1877F2]">
                    <span>Explore Solution</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13. FINAL CTA */}
      <section className="bg-[#0B1730] py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">
              Evaluate {solution.name} at Your Facility
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Schedule a technical feasibility walk-through with our computer vision
              engineers.
            </p>
          </div>
          <QuoteModalTrigger
            buttonText={`Request ${solution.name} Consultation`}
            variant="cyan"
            size="lg"
            aiSolutionId={solution.id}
            aiSolutionSlug={solution.slug}
            preselectedTopicName={solution.name}
          />
        </div>
      </section>
    </div>
  );
}
