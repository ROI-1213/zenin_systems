import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Wrench,
  Layers,
  Quote,
} from "lucide-react";
import {
  getCoreSolutionCategories,
  getFeaturedAISolutions,
  getPageContentBlock,
  getPublishedBrands,
  getPublishedIndustries,
  getPublishedProjects,
  getPublishedTestimonials,
  getServices,
} from "@/lib/db/queries";
import { HOME_SECTION_DEFAULTS } from "@/lib/home-defaults";
import { SectionHeading } from "@/components/ui/section-heading";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import {
  CinematicHero,
  Reveal,
  StaggerGrid,
  StaggerCard,
} from "@/components/ui/cinematic-motion";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    heroBlock,
    aboutBlock,
    coreSolutionsBlock,
    aiHighlightsBlock,
    servicesPreviewBlock,
    whyChooseBlock,
    industriesBlock,
    projectsBlock,
    testimonialsBlock,
    brandsBlock,
    quoteBlock,
    coreCategories,
    featuredAISolutions,
    featuredServices,
    industries,
    publishedProjects,
    publishedTestimonials,
    publishedBrands,
  ] = await Promise.all([
    getPageContentBlock("home", "hero", HOME_SECTION_DEFAULTS.hero.data),
    getPageContentBlock("home", "about_preview", HOME_SECTION_DEFAULTS.about_preview.data),
    getPageContentBlock("home", "core_solutions", HOME_SECTION_DEFAULTS.core_solutions.data),
    getPageContentBlock("home", "ai_highlights", HOME_SECTION_DEFAULTS.ai_highlights.data),
    getPageContentBlock("home", "services_preview", HOME_SECTION_DEFAULTS.services_preview.data),
    getPageContentBlock("home", "why_choose_us", HOME_SECTION_DEFAULTS.why_choose_us.data),
    getPageContentBlock("home", "industries_section", HOME_SECTION_DEFAULTS.industries_section.data),
    getPageContentBlock("home", "projects_section", HOME_SECTION_DEFAULTS.projects_section.data),
    getPageContentBlock("home", "testimonials_section", HOME_SECTION_DEFAULTS.testimonials_section.data),
    getPageContentBlock("home", "brands_section", HOME_SECTION_DEFAULTS.brands_section.data),
    getPageContentBlock("home", "quote_section", HOME_SECTION_DEFAULTS.quote_section.data),
    getCoreSolutionCategories(),
    getFeaturedAISolutions(6),
    getServices({ featuredOnly: true, limit: 6 }),
    getPublishedIndustries(),
    getPublishedProjects(),
    getPublishedTestimonials(),
    getPublishedBrands(),
  ]);

  return (
    <div className="overflow-x-hidden">
      {/* =====================================================================
          SECTION 1 — CINEMATIC PARALLAX HERO
      ===================================================================== */}
      {heroBlock.data.enabled !== false && (
        <CinematicHero
          subtitle={heroBlock.subtitle || HOME_SECTION_DEFAULTS.hero.subtitle}
          title={heroBlock.title || HOME_SECTION_DEFAULTS.hero.title}
          description={heroBlock.data.description}
          primaryCtaText={
            heroBlock.data.primaryCtaText || HOME_SECTION_DEFAULTS.hero.data.primaryCtaText
          }
          primaryCtaHref={
            heroBlock.data.primaryCtaHref || HOME_SECTION_DEFAULTS.hero.data.primaryCtaHref
          }
          secondaryCtaText={
            heroBlock.data.secondaryCtaText || HOME_SECTION_DEFAULTS.hero.data.secondaryCtaText
          }
          heroImage={
            heroBlock.data.heroImage || HOME_SECTION_DEFAULTS.hero.data.heroImage
          }
          heroVideo={
            heroBlock.data.heroVideo || HOME_SECTION_DEFAULTS.hero.data.heroVideo
          }
          highlights={heroBlock.data.highlights || []}
        />
      )}

      {/* =====================================================================
          SECTION 2 — ABOUT ZENIN SYSTEMS
      ===================================================================== */}
      {aboutBlock.data.enabled !== false && (
        <section className="relative overflow-hidden bg-white py-16 sm:py-22 lg:py-28">
          <div className="pointer-events-none absolute -top-40 right-0 h-80 w-80 rounded-full bg-[#1877F2]/5 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12">
              <Reveal variant="slide-right" className="lg:col-span-5">
                <div className="app-card group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#0B1730] shadow-xl">
                  <div className="relative aspect-16/10 w-full overflow-hidden sm:aspect-4/3">
                    <Image
                      src={
                        aboutBlock.data.image ||
                        HOME_SECTION_DEFAULTS.about_preview.data.image
                      }
                      alt="Zenin Systems Industrial Engineering & Automation"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="cinematic-img object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730] via-[#0B1730]/20 to-transparent" />
                  </div>
                  <div className="border-t border-white/10 bg-[#0B1730]/95 p-4 text-white backdrop-blur-md sm:p-5">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00B8D9]/15 text-[#00B8D9]">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">
                        {aboutBlock.data.imageCaption ||
                          HOME_SECTION_DEFAULTS.about_preview.data.imageCaption}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="slide-left" delay={0.1} className="lg:col-span-7">
                <SectionHeading
                  eyebrow={
                    aboutBlock.subtitle || HOME_SECTION_DEFAULTS.about_preview.subtitle
                  }
                  title={aboutBlock.title || HOME_SECTION_DEFAULTS.about_preview.title}
                  description={aboutBlock.data.introduction}
                />

                {aboutBlock.data.secondaryParagraph && (
                  <p className="mt-4 text-sm leading-relaxed text-[#64748B] sm:text-base">
                    {aboutBlock.data.secondaryParagraph}
                  </p>
                )}

                <StaggerGrid className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(aboutBlock.data.capabilities || []).map((cap: string) => (
                    <StaggerCard
                      key={cap}
                      className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC]/90 p-3.5 shadow-2xs transition hover:border-[#1877F2]/40 hover:bg-white"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1877F2]" />
                      <span className="text-xs font-semibold text-[#0B1730] sm:text-sm">
                        {cap}
                      </span>
                    </StaggerCard>
                  ))}
                </StaggerGrid>

                <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                  <Link
                    href={
                      aboutBlock.data.ctaHref ||
                      HOME_SECTION_DEFAULTS.about_preview.data.ctaHref
                    }
                    className="touch-btn inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0B1730] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#1877F2] sm:w-auto"
                  >
                    <span>
                      {aboutBlock.data.ctaText ||
                        HOME_SECTION_DEFAULTS.about_preview.data.ctaText}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                  <Link
                    href={
                      aboutBlock.data.secondaryCtaHref ||
                      HOME_SECTION_DEFAULTS.about_preview.data.secondaryCtaHref
                    }
                    className="touch-btn inline-flex min-h-[48px] w-full items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-5 py-3 text-sm font-semibold text-[#1877F2] transition hover:border-[#1877F2] hover:bg-white sm:w-auto"
                  >
                    <span>
                      {aboutBlock.data.secondaryCtaText ||
                        HOME_SECTION_DEFAULTS.about_preview.data.secondaryCtaText}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 3 — OUR CORE PRODUCTS & SOLUTIONS (4 CATEGORIES)
      ===================================================================== */}
      {coreSolutionsBlock.data.enabled !== false && (
        <section className="relative border-y border-[#E2E8F0] bg-[#F5F8FC] bg-light-grid py-16 sm:py-22 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <SectionHeading
                eyebrow={
                  coreSolutionsBlock.subtitle ||
                  HOME_SECTION_DEFAULTS.core_solutions.subtitle
                }
                title={
                  coreSolutionsBlock.title ||
                  HOME_SECTION_DEFAULTS.core_solutions.title
                }
                description={coreSolutionsBlock.data.description}
              />
              <Link
                href={
                  coreSolutionsBlock.data.ctaHref ||
                  HOME_SECTION_DEFAULTS.core_solutions.data.ctaHref
                }
                className="touch-btn inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-semibold text-[#0B1730] shadow-xs transition hover:border-[#1877F2] hover:text-[#1877F2] md:w-auto"
              >
                <span>
                  {coreSolutionsBlock.data.ctaText ||
                    HOME_SECTION_DEFAULTS.core_solutions.data.ctaText}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </Reveal>

            <StaggerGrid className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
              {coreCategories.map((cat) => {
                const targetHref = cat.dedicatedRoute || `/products#${cat.slug}`;
                return (
                  <StaggerCard
                    key={cat.id}
                    className="app-card group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white"
                  >
                    <div className="relative h-60 w-full overflow-hidden bg-[#0B1730] sm:h-64">
                      {cat.coverImage && (
                        <Image
                          src={cat.coverImage}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="cinematic-img object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/60 via-[#0B1730]/20 to-transparent" />
                      <div className="absolute bottom-3.5 left-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[#1877F2]/90 text-white shadow-lg backdrop-blur-md transition group-hover:scale-105 group-hover:bg-[#00B8D9] group-hover:text-[#0B1730]">
                        <DynamicIcon name={cat.icon} className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-lg font-bold text-[#0B1730] transition group-hover:text-[#1877F2]">
                        {cat.name}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                        {cat.shortDescription}
                      </p>
                      <div className="mt-5 border-t border-[#E2E8F0] pt-3.5">
                        <Link
                          href={targetHref}
                          className="touch-btn inline-flex min-h-[48px] w-full items-center justify-between rounded-xl bg-[#F5F8FC] px-4 py-2.5 text-xs font-bold tracking-wide text-[#1877F2] uppercase transition group-hover:bg-[#1877F2] group-hover:text-white"
                        >
                          <span>Explore Solutions</span>
                          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </StaggerCard>
                );
              })}
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 4 — AI VIDEO ANALYTICS HIGHLIGHTS
      ===================================================================== */}
      {aiHighlightsBlock.data.enabled !== false && (
        <section className="relative overflow-hidden bg-[#0B1730] bg-industrial-grid py-16 text-white sm:py-22 lg:py-28">
          <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#00B8D9]/10 blur-[130px]" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-[#1877F2]/15 blur-[130px]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <SectionHeading
                light
                eyebrow={
                  aiHighlightsBlock.subtitle ||
                  HOME_SECTION_DEFAULTS.ai_highlights.subtitle
                }
                title={
                  aiHighlightsBlock.title ||
                  HOME_SECTION_DEFAULTS.ai_highlights.title
                }
                description={aiHighlightsBlock.data.description}
              />
              <Link
                href={
                  aiHighlightsBlock.data.ctaHref ||
                  HOME_SECTION_DEFAULTS.ai_highlights.data.ctaHref
                }
                className="touch-btn inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#00B8D9] px-5 py-3 text-sm font-bold text-[#0B1730] shadow-[0_8px_25px_-4px_rgba(0,184,217,0.45)] transition hover:bg-white md:w-auto"
              >
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>
                  {aiHighlightsBlock.data.ctaText ||
                    HOME_SECTION_DEFAULTS.ai_highlights.data.ctaText}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </Reveal>

            <StaggerGrid className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredAISolutions.map((sol) => (
                <StaggerCard
                  key={sol.id}
                  className="glass-panel-dark app-card group flex flex-col overflow-hidden rounded-2xl transition hover:border-[#00B8D9]/60"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-[#081424] sm:h-64">
                    {sol.featuredImage && (
                      <Image
                        src={sol.featuredImage}
                        alt={sol.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="cinematic-img object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1E3A]/80 via-[#0D1E3A]/20 to-transparent" />
                    <span className="absolute top-3.5 left-3.5 rounded-full border border-[#00B8D9]/40 bg-[#0B1730]/85 px-3 py-1 text-[11px] font-semibold text-[#00B8D9] backdrop-blur-md">
                      {sol.categoryName}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-lg font-bold text-white transition group-hover:text-[#00B8D9]">
                      {sol.name}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                      {sol.shortDescription}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <Link
                        href={`/products/ai-video-analytics/${sol.slug}`}
                        className="touch-btn inline-flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-2.5 text-xs font-bold tracking-wider text-[#00B8D9] uppercase transition hover:bg-[#00B8D9] hover:text-[#0B1730]"
                      >
                        <span>Details</span>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                      <QuoteModalTrigger
                        buttonText="Quote"
                        variant="secondary"
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
      )}

      {/* =====================================================================
          SECTION 5 — SERVICES PREVIEW (FEATURED FROM 13 CATEGORIES)
      ===================================================================== */}
      {servicesPreviewBlock.data.enabled !== false && (
        <section className="bg-white py-16 sm:py-22 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <SectionHeading
                eyebrow={
                  servicesPreviewBlock.subtitle ||
                  HOME_SECTION_DEFAULTS.services_preview.subtitle
                }
                title={
                  servicesPreviewBlock.title ||
                  HOME_SECTION_DEFAULTS.services_preview.title
                }
                description={servicesPreviewBlock.data.description}
              />
              <Link
                href={
                  servicesPreviewBlock.data.ctaHref ||
                  HOME_SECTION_DEFAULTS.services_preview.data.ctaHref
                }
                className="touch-btn inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0B1730] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1877F2] md:w-auto"
              >
                <Wrench className="h-4 w-4 shrink-0" />
                <span>
                  {servicesPreviewBlock.data.ctaText ||
                    HOME_SECTION_DEFAULTS.services_preview.data.ctaText}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </Reveal>

            <StaggerGrid className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((svc) => (
                <StaggerCard
                  key={svc.id}
                  className="app-card group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#1877F2]"
                >
                  <div>
                    {svc.coverImage && (
                      <div className="relative h-52 w-full overflow-hidden bg-[#0B1730] sm:h-56">
                        <Image
                          src={svc.coverImage}
                          alt={svc.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="cinematic-img object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/60 via-[#0B1730]/15 to-transparent" />
                        <div className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#0B1730]/90 text-[#00B8D9] backdrop-blur-md transition group-hover:bg-[#1877F2] group-hover:text-white">
                          <DynamicIcon name={svc.icon} className="h-5 w-5" />
                        </div>
                        <span className="absolute top-3 right-3 rounded-full border border-white/15 bg-[#0B1730]/80 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
                          Engineering Service
                        </span>
                      </div>
                    )}

                    <div className="p-5 sm:p-6">
                      {!svc.coverImage && (
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9] transition group-hover:bg-[#1877F2] group-hover:text-white">
                            <DynamicIcon name={svc.icon} className="h-6 w-6" />
                          </div>
                          <span className="rounded-full bg-[#1877F2]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#1877F2]">
                            Engineering Service
                          </span>
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-[#0B1730] transition group-hover:text-[#1877F2]">
                        {svc.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                        {svc.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[#E2E8F0] bg-[#F5F8FC]/60 px-5 py-4 sm:px-6">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="touch-btn inline-flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-3.5 py-2.5 text-xs font-bold tracking-wider text-[#1877F2] uppercase shadow-2xs transition hover:bg-[#1877F2] hover:text-white"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </Link>
                    <QuoteModalTrigger
                      buttonText="Enquire"
                      variant="outline"
                      size="sm"
                      serviceId={svc.id}
                      serviceSlug={svc.slug}
                      preselectedTopicName={svc.name}
                    />
                  </div>
                </StaggerCard>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 6 — WHY CHOOSE ZENIN SYSTEMS
      ===================================================================== */}
      {whyChooseBlock.data.enabled !== false && (
        <section className="border-y border-[#E2E8F0] bg-[#F5F8FC] py-16 sm:py-22 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                align="center"
                eyebrow={
                  whyChooseBlock.subtitle ||
                  HOME_SECTION_DEFAULTS.why_choose_us.subtitle
                }
                title={
                  whyChooseBlock.title ||
                  HOME_SECTION_DEFAULTS.why_choose_us.title
                }
                description={whyChooseBlock.data.description}
              />
            </Reveal>

            <StaggerGrid className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {(whyChooseBlock.data.pillars || []).map(
                (pillar: { title: string; description: string; icon: string }) => (
                  <StaggerCard
                    key={pillar.title}
                    className="app-card rounded-2xl border border-[#E2E8F0] bg-white p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1877F2]/15 to-[#00B8D9]/15 text-[#1877F2]">
                      <DynamicIcon name={pillar.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-[#0B1730] sm:text-lg">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                      {pillar.description}
                    </p>
                  </StaggerCard>
                )
              )}
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 7 — INDUSTRIES WE SERVE
      ===================================================================== */}
      {industriesBlock.data.enabled !== false && (
        <section className="bg-white py-16 sm:py-22 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow={
                  industriesBlock.subtitle ||
                  HOME_SECTION_DEFAULTS.industries_section.subtitle
                }
                title={
                  industriesBlock.title ||
                  HOME_SECTION_DEFAULTS.industries_section.title
                }
                description={industriesBlock.data.description}
              />
            </Reveal>

            <StaggerGrid className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((ind) => (
                <StaggerCard
                  key={ind.id}
                  className="app-card group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white"
                >
                  {ind.coverImage ? (
                    <div className="relative h-52 w-full overflow-hidden bg-[#0B1730] sm:h-56">
                      <Image
                        src={ind.coverImage}
                        alt={ind.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="cinematic-img object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/75 via-[#0B1730]/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-3 text-white">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0B1730]/80 text-[#00B8D9] backdrop-blur-md">
                          <DynamicIcon name={ind.icon} className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-bold sm:text-lg">{ind.name}</h3>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3.5 border-b border-[#E2E8F0] bg-[#0B1730] px-6 py-4 text-white">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#00B8D9]">
                        <DynamicIcon name={ind.icon} className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-bold sm:text-lg">{ind.name}</h3>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs leading-relaxed text-[#64748B] sm:text-sm">
                      {ind.shortDescription}
                    </p>
                    {ind.applications.length > 0 && (
                      <ul className="mt-4 space-y-2 border-t border-[#E2E8F0] pt-4">
                        {ind.applications.map((app) => (
                          <li
                            key={app}
                            className="flex items-center gap-2 text-xs font-medium text-[#172033]"
                          >
                            <Layers className="h-3.5 w-3.5 shrink-0 text-[#1877F2]" />
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </StaggerCard>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 8 — FEATURED PROJECTS OR SOLUTIONS (HIDDEN IF NONE APPROVED)
      ===================================================================== */}
      {projectsBlock.data.enabled !== false && publishedProjects.length > 0 && (
        <section className="border-t border-[#E2E8F0] bg-[#F5F8FC] py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow={
                  projectsBlock.subtitle ||
                  HOME_SECTION_DEFAULTS.projects_section.subtitle
                }
                title={
                  projectsBlock.title ||
                  HOME_SECTION_DEFAULTS.projects_section.title
                }
                description={projectsBlock.data.description}
              />
            </Reveal>
            <StaggerGrid className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {publishedProjects.map((proj) => (
                <StaggerCard
                  key={proj.id}
                  className="app-card rounded-2xl border border-[#E2E8F0] bg-white p-6"
                >
                  <span className="rounded-full bg-[#1877F2]/10 px-3 py-1 text-xs font-semibold text-[#1877F2]">
                    {proj.industry}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#0B1730]">
                    {proj.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#64748B]">
                    {proj.shortDescription}
                  </p>
                </StaggerCard>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 9 — TESTIMONIALS (HIDDEN IF NONE APPROVED)
      ===================================================================== */}
      {testimonialsBlock.data.enabled !== false &&
        publishedTestimonials.length > 0 && (
          <section className="border-t border-[#E2E8F0] bg-white py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <SectionHeading
                  eyebrow={
                    testimonialsBlock.subtitle ||
                    HOME_SECTION_DEFAULTS.testimonials_section.subtitle
                  }
                  title={
                    testimonialsBlock.title ||
                    HOME_SECTION_DEFAULTS.testimonials_section.title
                  }
                  description={testimonialsBlock.data.description}
                />
                <Link
                  href={
                    testimonialsBlock.data.ctaHref ||
                    HOME_SECTION_DEFAULTS.testimonials_section.data.ctaHref
                  }
                  className="text-sm font-semibold text-[#1877F2] hover:underline"
                >
                  {testimonialsBlock.data.ctaText ||
                    HOME_SECTION_DEFAULTS.testimonials_section.data.ctaText}
                </Link>
              </Reveal>
              <StaggerGrid className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {publishedTestimonials.map((item) => (
                  <StaggerCard
                    key={item.id}
                    className="app-card flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-6"
                  >
                    <div>
                      <Quote className="h-6 w-6 text-[#1877F2]" />
                      <p className="mt-3 text-sm leading-relaxed text-[#172033]">
                        &ldquo;{item.feedback}&rdquo;
                      </p>
                    </div>
                    <footer className="mt-6 border-t border-[#E2E8F0] pt-4">
                      <div className="text-sm font-bold text-[#0B1730]">
                        {item.clientName}
                      </div>
                      <div className="text-xs text-[#64748B]">
                        {item.designation ? `${item.designation}, ` : ""}
                        {item.companyName}
                      </div>
                    </footer>
                  </StaggerCard>
                ))}
              </StaggerGrid>
            </div>
          </section>
        )}

      {/* =====================================================================
          SECTION 10 — BRANDS (HIDDEN IF NONE APPROVED)
      ===================================================================== */}
      {brandsBlock.data.enabled !== false && publishedBrands.length > 0 && (
        <section className="border-t border-[#E2E8F0] bg-[#F5F8FC] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                align="center"
                eyebrow={
                  brandsBlock.subtitle ||
                  HOME_SECTION_DEFAULTS.brands_section.subtitle
                }
                title={
                  brandsBlock.title || HOME_SECTION_DEFAULTS.brands_section.title
                }
              />
            </Reveal>
            <StaggerGrid className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {publishedBrands.map((brand) => (
                <StaggerCard
                  key={brand.id}
                  className="app-card flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-white p-5 text-center font-bold text-[#0B1730]"
                >
                  {brand.name}
                </StaggerCard>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 11 — REQUEST A QUOTE
      ===================================================================== */}
      {quoteBlock.data.enabled !== false && (
        <section
          id="request-quote"
          className="relative overflow-hidden bg-gradient-to-br from-[#0B1730] via-[#0B1730] to-[#142B49] py-16 text-white sm:py-22 lg:py-28"
        >
          <div className="pointer-events-none absolute top-0 left-1/3 h-80 w-80 rounded-full bg-[#1877F2]/15 blur-[120px]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-12">
              <Reveal variant="slide-right" className="lg:col-span-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                  {quoteBlock.subtitle ||
                    HOME_SECTION_DEFAULTS.quote_section.subtitle}
                </span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-4xl">
                  {quoteBlock.title || HOME_SECTION_DEFAULTS.quote_section.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {quoteBlock.data.description}
                </p>

                <div className="glass-panel-dark mt-8 space-y-4 rounded-2xl p-6">
                  <h3 className="text-sm font-bold tracking-wider text-[#00B8D9] uppercase">
                    {quoteBlock.data.nextStepsHeading ||
                      HOME_SECTION_DEFAULTS.quote_section.data.nextStepsHeading}
                  </h3>
                  <ul className="space-y-3 text-xs text-slate-200 sm:text-sm">
                    {(quoteBlock.data.nextSteps || []).map((step: string) => (
                      <li key={step} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00B8D9]" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal
                variant="scale-up"
                delay={0.12}
                className="rounded-2xl border border-white/15 bg-white p-5 text-[#172033] shadow-2xl sm:p-8 lg:col-span-7"
              >
                <h3 className="mb-1 text-lg font-bold text-[#0B1730]">
                  {quoteBlock.data.formTitle ||
                    HOME_SECTION_DEFAULTS.quote_section.data.formTitle}
                </h3>
                <p className="mb-6 text-xs text-[#64748B]">
                  {quoteBlock.data.formSubtitle ||
                    HOME_SECTION_DEFAULTS.quote_section.data.formSubtitle}
                </p>
                <EnquiryForm />
              </Reveal>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
