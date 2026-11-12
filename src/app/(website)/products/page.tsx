import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, PackageCheck } from "lucide-react";
import {
  getAllProductCategories,
  getCoreSolutionCategories,
  getProducts,
  getWiderPortfolioCategories,
} from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";
import { ProductCatalogClient } from "@/components/products/product-catalog-client";

export const metadata: Metadata = {
  title: "Products & Solutions Catalog — Industrial CCTV, AI Vision & Engineering",
  description:
    "Explore Zenin Systems' 4 core industrial technology solution groups and 15 wider B2B product & material categories including CCTV, AI Video Analytics, EV Charging, Fire Safety, Access Control, Hydraulics, and Industrial Cables.",
};

export const dynamic = "force-dynamic";

export default async function ProductsCatalogPage() {
  const [coreCategories, widerCategories, allCategories, products] =
    await Promise.all([
      getCoreSolutionCategories(),
      getWiderPortfolioCategories(),
      getAllProductCategories(false),
      getProducts(),
    ]);

  return (
    <div>
      {/* HERO BANNER */}
      <section className="bg-[#0B1730] bg-industrial-grid py-16 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Products & Solutions" }]} light />
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
            <Layers className="h-3.5 w-3.5" />
            <span>B2B Enquiry-Driven Solutions & Material Portfolio</span>
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Industrial Products, AI Vision & Turnkey Technology Solutions
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Our catalog spans four flagship engineering solution suites alongside a
            comprehensive portfolio of industrial surveillance, safety, electrical,
            automation, and infrastructure hardware.
          </p>
        </div>
      </section>

      {/* LAYER 1: 4 CORE SOLUTION GROUPS */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Primary Solution Pillars"
            title="Four Core Solution Groups"
            description="Dedicated engineering architectures for industrial video surveillance, AI computer vision, centralized video management, and intelligent plant automation."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {coreCategories.map((cat) => {
              const href = cat.dedicatedRoute || `/products#${cat.slug}`;
              return (
                <article
                  key={cat.id}
                  id={cat.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC]/60 shadow-2xs transition hover:border-[#1877F2] hover:bg-white hover:shadow-xl sm:flex-row"
                >
                  <div className="relative h-52 w-full shrink-0 overflow-hidden bg-[#0B1730] sm:h-auto sm:w-56">
                    {cat.coverImage && (
                      <Image
                        src={cat.coverImage}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 224px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1877F2] text-white">
                      <DynamicIcon name={cat.icon} className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-[#1877F2] uppercase">
                        Core Solution Pillar
                      </span>
                      <h2 className="mt-1 text-xl font-bold text-[#0B1730] group-hover:text-[#1877F2]">
                        {cat.name}
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                        {cat.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E2E8F0] pt-4">
                      <Link
                        href={href}
                        className="touch-btn inline-flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-3.5 py-2.5 text-xs font-bold tracking-wider text-[#1877F2] uppercase shadow-2xs transition hover:bg-[#1877F2] hover:text-white"
                      >
                        <span>Explore Hub</span>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                      <QuoteModalTrigger
                        buttonText="Enquire"
                        variant="outline"
                        size="sm"
                        preselectedTopicName={cat.name}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE PRODUCT & SOLUTION EXPLORER */}
      <section className="border-y border-[#E2E8F0] bg-[#F5F8FC] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <SectionHeading
              eyebrow="Configured Systems & Hardware"
              title="Featured Systems & Solution Configurations"
              description="Filter our representative B2B systems and request a customized quotation matched to your facility requirements."
            />
          </div>

          <ProductCatalogClient
            products={products}
            categories={allCategories.map((c) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              isCoreSolution: c.isCoreSolution,
            }))}
          />
        </div>
      </section>

      {/* LAYER 2: WIDER PRODUCT & MATERIAL PORTFOLIO (15 FAMILIES) */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Comprehensive B2B Supply & Integration Scope"
            title="Wider Industrial Product & Material Portfolio"
            description="Beyond our four core solution hubs, Zenin Systems supplies and integrates a broad spectrum of industrial security, safety, electrical, fluid power, and project fabrication materials."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {widerCategories.map((cat) => (
              <div
                key={cat.id}
                id={cat.slug}
                className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC]/50 p-6 transition hover:border-[#1877F2] hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                      <DynamicIcon name={cat.icon} className="h-5 w-5" />
                    </div>
                    <PackageCheck className="h-4 w-4 text-slate-400" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#0B1730]">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                    {cat.shortDescription}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                  {cat.dedicatedRoute ? (
                    <Link
                      href={cat.dedicatedRoute}
                      className="text-xs font-bold text-[#1877F2] hover:underline"
                    >
                      View Solution Page →
                    </Link>
                  ) : (
                    <span className="text-[11px] font-medium text-[#64748B]">
                      B2B Project Supply
                    </span>
                  )}
                  <QuoteModalTrigger
                    buttonText="Request BOQ Quote"
                    variant="outline"
                    size="sm"
                    preselectedTopicName={cat.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
