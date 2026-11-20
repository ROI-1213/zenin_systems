import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Wrench, ArrowRight, CheckCircle2 } from "lucide-react";
import { getPageContentBlock, getServices } from "@/lib/db/queries";
import {
  SERVICES_PAGE_DEFAULTS,
  type ServicesIconCard,
} from "@/lib/services-page-defaults";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Reveal, StaggerGrid, StaggerCard } from "@/components/ui/cinematic-motion";

export const metadata: Metadata = {
  title: "Industrial & Building Engineering Services (13 Verticals)",
  description:
    "Explore Zenin Systems' 13 engineering service verticals: Fire Detection & Alarm, IBMS, Smart Lighting, Energy Management, IVR, PA Systems, AV & Video Conferencing, HVAC, Intelligent Fencing, Access Control, IoT, Parking Management, and Customized Fabrication Solutions.",
};

export const dynamic = "force-dynamic";

export default async function ServicesListingPage() {
  const D = SERVICES_PAGE_DEFAULTS;
  const [bannerBlock, catalogBlock, lifecycleBlock, whyBlock, enquiryBlock, services] =
    await Promise.all([
      getPageContentBlock("services", "banner", D.banner.data),
      getPageContentBlock("services", "catalog", D.catalog.data),
      getPageContentBlock("services", "lifecycle", D.lifecycle.data),
      getPageContentBlock("services", "why_services", D.why_services.data),
      getPageContentBlock("services", "enquiry", D.enquiry.data),
      getServices(),
    ]);

  const featuresPerCard = Math.max(
    0,
    Math.min(6, Number(catalogBlock.data.featuresPerCard ?? 2) || 0)
  );
  const showNumbers = catalogBlock.data.showNumberBadges !== false;
  const lifecyclePillars: ServicesIconCard[] = Array.isArray(lifecycleBlock.data.pillars)
    ? lifecycleBlock.data.pillars
    : [];
  const whyItems: ServicesIconCard[] = Array.isArray(whyBlock.data.items)
    ? whyBlock.data.items
    : [];

  return (
    <div>
      {/* 1. SERVICES HERO */}
      {bannerBlock.data.enabled !== false && (
        <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
          <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] border border-white/15 bg-[#0B1730] bg-industrial-grid py-12 text-white shadow-2xl sm:py-16 lg:py-20">
            <div className="px-5 sm:px-8 lg:px-12">
              <Breadcrumbs items={[{ label: "Services" }]} light />
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/35 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                <Wrench className="h-3.5 w-3.5" />
                <span>{bannerBlock.subtitle || D.banner.subtitle}</span>
              </div>
              <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl">
                {bannerBlock.title || D.banner.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {bannerBlock.data.description}
              </p>
              <div className="mt-8">
                <QuoteModalTrigger
                  buttonText={bannerBlock.data.primaryCtaText || D.banner.data.primaryCtaText}
                  variant="cyan"
                  size="lg"
                  preselectedTopicName={bannerBlock.data.quoteTopic || D.banner.data.quoteTopic}
                />
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 2. SERVICE CARDS GRID */}
      {catalogBlock.data.enabled !== false && (
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow={catalogBlock.subtitle || D.catalog.subtitle}
                title={catalogBlock.title || D.catalog.title}
                description={catalogBlock.data.description}
              />
            </Reveal>

            <StaggerGrid className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((svc, idx) => (
                <StaggerCard
                  key={svc.id}
                  className="app-card group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#1877F2]"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-[#0B1730] sm:h-60">
                    {svc.coverImage && (
                      <Image
                        src={svc.coverImage}
                        alt={svc.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="cinematic-img object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/55 via-[#0B1730]/15 to-transparent" />
                    {showNumbers && (
                      <div className="absolute top-3 right-3 rounded-full border border-white/15 bg-[#0B1730]/80 px-2.5 py-1 text-[11px] font-bold text-[#00B8D9] backdrop-blur-md">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[#1877F2]/90 text-white shadow-md backdrop-blur-md transition group-hover:scale-105 group-hover:bg-[#00B8D9] group-hover:text-[#0B1730]">
                      <DynamicIcon name={svc.icon} className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-lg font-bold text-[#0B1730] transition group-hover:text-[#1877F2]">
                      {svc.name}
                    </h2>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                      {svc.shortDescription}
                    </p>

                    {featuresPerCard > 0 && svc.features.length > 0 && (
                      <ul className="mt-4 space-y-1.5 border-t border-[#E2E8F0] pt-3">
                        {svc.features.slice(0, featuresPerCard).map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-xs text-[#172033]">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1877F2]" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E2E8F0] pt-4">
                      <Link
                        href={`/services/${svc.slug}`}
                        className="touch-btn inline-flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-xs font-bold tracking-wider text-[#1877F2] uppercase transition hover:border-[#1877F2] hover:bg-white"
                      >
                        <span>{catalogBlock.data.exploreButtonText || D.catalog.data.exploreButtonText}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                      <QuoteModalTrigger
                        buttonText={catalogBlock.data.quoteButtonText || D.catalog.data.quoteButtonText}
                        variant="outline"
                        size="sm"
                        serviceId={svc.id}
                        serviceSlug={svc.slug}
                        preselectedTopicName={svc.name}
                      />
                    </div>
                  </div>
                </StaggerCard>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* 3. LIFECYCLE DELIVERY MODEL */}
      {lifecycleBlock.data.enabled !== false && lifecyclePillars.length > 0 && (
        <section className="border-y border-[#E2E8F0] bg-[#F5F8FC] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={lifecycleBlock.subtitle || D.lifecycle.subtitle}
              title={lifecycleBlock.title || D.lifecycle.title}
              description={lifecycleBlock.data.description}
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {lifecyclePillars.map((pillar, i) => (
                <div
                  key={`${pillar.title}-${i}`}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                    <DynamicIcon name={pillar.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#0B1730]">{pillar.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#64748B]">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. SERVICE ADVANTAGES */}
      {whyBlock.data.enabled !== false && whyItems.length > 0 && (
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={whyBlock.subtitle || D.why_services.subtitle}
              title={whyBlock.title || D.why_services.title}
              description={whyBlock.data.description}
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyItems.map((item, i) => (
                <div
                  key={`${item.title}-${i}`}
                  className="rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-6 transition hover:border-[#1877F2] hover:bg-white"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1877F2]/15 to-[#00B8D9]/15 text-[#1877F2]">
                    <DynamicIcon name={item.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#0B1730]">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. ENQUIRY FORM */}
      {enquiryBlock.data.enabled !== false && (
        <section className="bg-[#0B1730] py-16 text-white lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/15 bg-white p-6 text-[#172033] shadow-2xl sm:p-10">
              {enquiryBlock.subtitle && (
                <span className="text-[11px] font-bold tracking-wider text-[#1877F2] uppercase">
                  {enquiryBlock.subtitle}
                </span>
              )}
              <h2 className="mt-1 text-2xl font-bold text-[#0B1730]">
                {enquiryBlock.title || D.enquiry.title}
              </h2>
              <p className="mt-1 mb-6 text-sm text-[#64748B]">{enquiryBlock.data.description}</p>
              <EnquiryForm
                defaultEnquiryType="SERVICE_REQUEST"
                preselectedTopicName={enquiryBlock.data.quoteTopic || D.enquiry.data.quoteTopic}
                compact
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
