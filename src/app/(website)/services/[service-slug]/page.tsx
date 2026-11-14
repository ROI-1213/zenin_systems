import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Layers,
  Factory,
  Wrench,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { getServiceBySlug, getServices } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "service-slug": string }>;
}): Promise<Metadata> {
  const { "service-slug": slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    return { title: "Service Not Found" };
  }
  return {
    title: service.seoTitle || `${service.name} — Engineering Services`,
    description: service.seoDescription || service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ "service-slug": string }>;
}) {
  const { "service-slug": slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const allServices = await getServices();
  const relatedServices = allServices
    .filter(
      (s) =>
        s.id !== service.id &&
        (service.relatedServiceSlugs.includes(s.slug) || s.isFeatured)
    )
    .slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zeninsystems.com";
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: "Zenin Systems Solutions LLP",
      url: siteUrl,
    },
    url: `${siteUrl}/services/${service.slug}`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* HERO BANNER */}
      <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
        <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] border border-white/15 bg-[#0B1730] bg-industrial-grid py-12 text-white shadow-2xl sm:py-16 lg:py-20">
          <div className="px-5 sm:px-8 lg:px-12">
            <Breadcrumbs
              items={[
                { label: "Services", href: "/services" },
                { label: service.name },
              ]}
              light
            />

            <div className="mt-4 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/35 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                  <DynamicIcon name={service.icon} className="h-3.5 w-3.5" />
                  <span>Turnkey Engineering Service</span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  {service.name}
                </h1>

                <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                  {service.shortDescription}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <QuoteModalTrigger
                    buttonText={`Request Quote — ${service.name}`}
                    variant="cyan"
                    size="lg"
                    serviceId={service.id}
                    serviceSlug={service.slug}
                    preselectedTopicName={service.name}
                  />
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>All 12 Services</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/15 bg-[#142B49] shadow-2xl">
                  {service.coverImage && (
                    <Image
                      src={service.coverImage}
                      alt={service.name}
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

      {/* MAIN CONTENT & EMBEDDED QUOTE FORM */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* LEFT 7 COLUMNS */}
            <div className="space-y-10 lg:col-span-7">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                  Service Overview
                </span>
                <h2 className="mt-1 text-2xl font-bold text-[#0B1730]">
                  Engineering Scope & Architecture
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#64748B]">
                  {service.longDescription}
                </p>
              </div>

              {service.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-[#0B1730]">Key Features</h3>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {service.features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-start gap-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1877F2]" />
                        <span className="text-sm font-medium text-[#172033]">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CAPABILITIES + CROSS-SERVICE LIFECYCLE */}
              <div>
                <h3 className="text-xl font-bold text-[#0B1730]">
                  Delivery & Integration Capabilities
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(service.capabilities.length > 0
                    ? service.capabilities
                    : [
                        "System Integration",
                        "Installation",
                        "Commissioning",
                        "Maintenance",
                        "Technical Support",
                      ]
                  ).map((cap) => (
                    <div
                      key={cap}
                      className="flex items-center gap-2.5 rounded-xl border border-[#E2E8F0] p-3.5 text-sm font-semibold text-[#0B1730]"
                    >
                      <Wrench className="h-4 w-4 shrink-0 text-[#0095B0]" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                {/* Cross-service lifecycle badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "System Integration",
                    "Installation",
                    "Commissioning",
                    "Maintenance",
                    "Technical Support",
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="rounded-lg bg-[#0B1730] px-3 py-1 text-xs font-semibold text-[#00B8D9]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* APPLICATIONS & INDUSTRIES SERVED */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {service.applications.length > 0 && (
                  <div className="rounded-2xl border border-[#E2E8F0] p-6">
                    <div className="flex items-center gap-2 text-[#0B1730]">
                      <Layers className="h-5 w-5 text-[#1877F2]" />
                      <h3 className="text-base font-bold">Typical Applications</h3>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-[#64748B]">
                      {service.applications.map((app) => (
                        <li key={app} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1877F2]" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.industries.length > 0 && (
                  <div className="rounded-2xl border border-[#E2E8F0] p-6">
                    <div className="flex items-center gap-2 text-[#0B1730]">
                      <Factory className="h-5 w-5 text-[#0095B0]" />
                      <h3 className="text-base font-bold">Industries Served</h3>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-[#64748B]">
                      {service.industries.map((ind) => (
                        <li key={ind} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0095B0]" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT 5 COLUMNS: AUTO-ATTRIBUTED SERVICE QUOTE FORM */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-6 shadow-lg sm:p-7">
                <span className="text-[11px] font-bold tracking-wider text-[#1877F2] uppercase">
                  Direct Service Attribution
                </span>
                <h2 className="mt-1 text-xl font-bold text-[#0B1730]">
                  Request a Proposal for {service.name}
                </h2>
                <p className="mt-1 mb-5 text-xs text-[#64748B]">
                  Your request is automatically linked to{" "}
                  <strong className="text-[#0B1730]">{service.name}</strong>.
                </p>

                <EnquiryForm
                  serviceId={service.id}
                  serviceSlug={service.slug}
                  preselectedTopicName={service.name}
                  defaultEnquiryType="SERVICE_REQUEST"
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <section className="border-t border-[#E2E8F0] bg-[#F5F8FC] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0B1730]">
                Related Engineering Services
              </h2>
              <Link
                href="/services"
                className="text-xs font-bold text-[#1877F2] uppercase hover:underline"
              >
                View All 12 Services →
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/services/${rel.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 transition hover:border-[#1877F2] hover:shadow-md"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                      <DynamicIcon name={rel.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[#0B1730] group-hover:text-[#1877F2]">
                      {rel.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs text-[#64748B]">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#1877F2]">
                    <span>Explore Service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
