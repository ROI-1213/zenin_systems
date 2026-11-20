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
import { ABOUT_SECTION_DEFAULTS } from "@/lib/about-defaults";
import { HOME_SECTION_DEFAULTS } from "@/lib/home-defaults";
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
  const [
    bannerBlock,
    overviewBlock,
    missionVisionBlock,
    capabilitiesBlock,
    aboutWhyChooseBlock,
    industriesBlock,
    certificationsBlock,
    contactCtaBlock,
    homeWhyChooseBlock,
    industries,
    verifiedBrands,
  ] = await Promise.all([
    getPageContentBlock("about", "banner", ABOUT_SECTION_DEFAULTS.banner.data),
    getPageContentBlock(
      "about",
      "corporate_overview",
      ABOUT_SECTION_DEFAULTS.corporate_overview.data
    ),
    getPageContentBlock(
      "about",
      "mission_vision",
      ABOUT_SECTION_DEFAULTS.mission_vision.data
    ),
    getPageContentBlock(
      "about",
      "capabilities",
      ABOUT_SECTION_DEFAULTS.capabilities.data
    ),
    getPageContentBlock(
      "about",
      "why_choose_us",
      ABOUT_SECTION_DEFAULTS.why_choose_us.data
    ),
    getPageContentBlock(
      "about",
      "industries_section",
      ABOUT_SECTION_DEFAULTS.industries_section.data
    ),
    getPageContentBlock(
      "about",
      "certifications",
      ABOUT_SECTION_DEFAULTS.certifications.data
    ),
    getPageContentBlock(
      "about",
      "contact_cta",
      ABOUT_SECTION_DEFAULTS.contact_cta.data
    ),
    getPageContentBlock(
      "home",
      "why_choose_us",
      HOME_SECTION_DEFAULTS.why_choose_us.data
    ),
    getPublishedIndustries(),
    getPublishedBrands(),
  ]);

  const showOverview = overviewBlock.data.enabled !== false;
  const showMissionVision = missionVisionBlock.data.enabled !== false;

  return (
    <div>
      {/* 1. PAGE BANNER & BREADCRUMBS */}
      {bannerBlock.data.enabled !== false && (
        <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
          <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] border border-white/15 bg-[#0B1730] bg-industrial-grid py-12 text-white shadow-2xl sm:py-16 lg:py-20">
            <div className="px-5 sm:px-8 lg:px-12">
              <Breadcrumbs items={[{ label: "About Us" }]} light />
              <span className="inline-block rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                {bannerBlock.subtitle || ABOUT_SECTION_DEFAULTS.banner.subtitle}
              </span>
              <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl">
                {bannerBlock.title || ABOUT_SECTION_DEFAULTS.banner.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {bannerBlock.data.overview}
              </p>
            </div>
          </section>
        </div>
      )}

      {/* 2 & 3. COMPANY OVERVIEW + MISSION & VISION */}
      {(showOverview || showMissionVision) && (
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              {showOverview && (
                <div className={showMissionVision ? "lg:col-span-7" : "lg:col-span-12"}>
                  <SectionHeading
                    eyebrow={
                      overviewBlock.subtitle ||
                      ABOUT_SECTION_DEFAULTS.corporate_overview.subtitle
                    }
                    title={
                      overviewBlock.title ||
                      ABOUT_SECTION_DEFAULTS.corporate_overview.title
                    }
                  />
                  <p className="mt-5 text-base leading-relaxed text-[#172033]">
                    {overviewBlock.data.overview}
                  </p>
                  {overviewBlock.data.extendedOverview && (
                    <p className="mt-4 text-sm leading-relaxed text-[#64748B] sm:text-base">
                      {overviewBlock.data.extendedOverview}
                    </p>
                  )}

                  {Array.isArray(overviewBlock.data.highlights) &&
                    overviewBlock.data.highlights.length > 0 && (
                      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {overviewBlock.data.highlights.map(
                          (item: { title: string; description: string }) => (
                            <div
                              key={item.title}
                              className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-4"
                            >
                              <div className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                                {item.title}
                              </div>
                              <p className="mt-1 text-xs text-[#64748B]">
                                {item.description}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                </div>
              )}

              {showMissionVision && (
                <div
                  className={`space-y-6 ${
                    showOverview ? "lg:col-span-5" : "lg:col-span-12"
                  }`}
                >
                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#0B1730] p-7 text-white shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1877F2] text-white">
                        <Target className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-bold">
                        {missionVisionBlock.data.missionTitle ||
                          ABOUT_SECTION_DEFAULTS.mission_vision.data.missionTitle}
                      </h2>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">
                      {missionVisionBlock.data.mission}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                        <Compass className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-bold text-[#0B1730]">
                        {missionVisionBlock.data.visionTitle ||
                          ABOUT_SECTION_DEFAULTS.mission_vision.data.visionTitle}
                      </h2>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#64748B]">
                      {missionVisionBlock.data.vision}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. EXPERTISE AND CAPABILITIES */}
      {capabilitiesBlock.data.enabled !== false && (
        <section className="border-y border-[#E2E8F0] bg-[#F5F8FC] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={
                capabilitiesBlock.subtitle ||
                ABOUT_SECTION_DEFAULTS.capabilities.subtitle
              }
              title={
                capabilitiesBlock.title ||
                ABOUT_SECTION_DEFAULTS.capabilities.title
              }
              description={capabilitiesBlock.data.description}
            />

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {(capabilitiesBlock.data.items || []).map(
                (cap: { title: string; description: string }) => (
                  <div
                    key={cap.title}
                    className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-[#1877F2]" />
                      <h3 className="text-lg font-bold text-[#0B1730]">
                        {cap.title}
                      </h3>
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
      )}

      {/* 5. WHY CHOOSE ZENIN SYSTEMS */}
      {aboutWhyChooseBlock.data.enabled !== false &&
        homeWhyChooseBlock.data.pillars &&
        homeWhyChooseBlock.data.pillars.length > 0 && (
          <section className="bg-white py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow={
                  aboutWhyChooseBlock.subtitle ||
                  ABOUT_SECTION_DEFAULTS.why_choose_us.subtitle
                }
                title={
                  aboutWhyChooseBlock.title ||
                  ABOUT_SECTION_DEFAULTS.why_choose_us.title
                }
                description={
                  aboutWhyChooseBlock.data.description ||
                  homeWhyChooseBlock.data.description
                }
              />
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {homeWhyChooseBlock.data.pillars.map(
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

      {/* 6. INDUSTRIES SERVED */}
      {industriesBlock.data.enabled !== false && (
        <section className="border-t border-[#E2E8F0] bg-[#F5F8FC] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={
                industriesBlock.subtitle ||
                ABOUT_SECTION_DEFAULTS.industries_section.subtitle
              }
              title={
                industriesBlock.title ||
                ABOUT_SECTION_DEFAULTS.industries_section.title
              }
              description={industriesBlock.data.description}
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
                    <h3 className="text-base font-bold text-[#0B1730]">
                      {ind.name}
                    </h3>
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
      )}

      {/* 7. CERTIFICATIONS & TECHNOLOGY PARTNERS (ONLY IF VERIFIED) */}
      {certificationsBlock.data.enabled !== false &&
        (certificationsBlock.data.certificationsNote ||
          verifiedBrands.length > 0) && (
          <section className="border-t border-[#E2E8F0] bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow={
                  certificationsBlock.subtitle ||
                  ABOUT_SECTION_DEFAULTS.certifications.subtitle
                }
                title={
                  certificationsBlock.title ||
                  ABOUT_SECTION_DEFAULTS.certifications.title
                }
              />
              {certificationsBlock.data.certificationsNote && (
                <p className="mt-4 text-sm text-[#64748B]">
                  {certificationsBlock.data.certificationsNote}
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

      {/* 8. CONTACT CTA */}
      {contactCtaBlock.data.enabled !== false && (
        <section className="bg-[#0B1730] py-16 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#00B8D9] uppercase">
                <ShieldCheck className="h-4 w-4" />
                <span>
                  {contactCtaBlock.subtitle ||
                    ABOUT_SECTION_DEFAULTS.contact_cta.subtitle}
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                {contactCtaBlock.title ||
                  ABOUT_SECTION_DEFAULTS.contact_cta.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                {contactCtaBlock.data.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <QuoteModalTrigger
                buttonText={
                  contactCtaBlock.data.primaryCtaText ||
                  ABOUT_SECTION_DEFAULTS.contact_cta.data.primaryCtaText
                }
                variant="cyan"
                size="lg"
                preselectedTopicName={
                  contactCtaBlock.data.quoteTopic ||
                  ABOUT_SECTION_DEFAULTS.contact_cta.data.quoteTopic
                }
              />
              <Link
                href={
                  contactCtaBlock.data.secondaryCtaHref ||
                  ABOUT_SECTION_DEFAULTS.contact_cta.data.secondaryCtaHref
                }
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <span>
                  {contactCtaBlock.data.secondaryCtaText ||
                    ABOUT_SECTION_DEFAULTS.contact_cta.data.secondaryCtaText}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
