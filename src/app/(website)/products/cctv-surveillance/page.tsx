import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  CheckCircle2,
  Shield,
  Server,
  Layers,
  ArrowRight,
  Cpu,
} from "lucide-react";
import { getProducts } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const metadata: Metadata = {
  title: "Industrial CCTV & Video Surveillance Solutions",
  description:
    "Enterprise industrial CCTV surveillance, security monitoring, network video infrastructure, recording systems, and ruggedized camera architectures by Zenin Systems.",
};

export const dynamic = "force-dynamic";

export default async function CctvSurveillancePage() {
  const cctvProducts = await getProducts({ categorySlug: "cctv-surveillance" });

  return (
    <div>
      {/* 1. HERO */}
      <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
        <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] border border-white/15 bg-[#0B1730] bg-industrial-grid py-12 text-white shadow-2xl sm:py-16 lg:py-20">
          <div className="px-5 sm:px-8 lg:px-12">
            <Breadcrumbs
              items={[
                { label: "Products & Solutions", href: "/products" },
                { label: "Industrial CCTV & Video Surveillance" },
              ]}
              light
            />
            <div className="mt-4 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                  <Camera className="h-3.5 w-3.5" />
                  <span>Core Solution Pillar 01</span>
                </div>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  Industrial CCTV & Video Surveillance Solutions
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                  Engineered surveillance architectures built for manufacturing plants,
                  warehouses, perimeters, hazardous bays, and multi-site industrial
                  operations—delivering continuous situational awareness and AI-ready
                  video infrastructure.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <QuoteModalTrigger
                    buttonText="Request CCTV Site Assessment & Quote"
                    variant="cyan"
                    size="lg"
                    preselectedTopicName="Industrial CCTV & Video Surveillance"
                  />
                  <Link
                    href="/products/ai-video-analytics"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    <span>Explore AI Video Analytics</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/15 bg-[#142B49] shadow-2xl">
                  <Image
                    src="/images/pillars/cctv-surveillance.png"
                    alt="Industrial CCTV Surveillance Infrastructure"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2 & 3. OVERVIEW & CAPABILITIES */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Surveillance Engineering"
            title="Comprehensive Industrial Video Infrastructure"
            description="We design and commission complete network video systems—from field camera optics and ruggedized mounting to fiber backbones, NVR storage pools, and central command monitoring."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Industrial Surveillance",
                desc: "Weatherproof, dust-resistant, and vibration-tolerant camera assemblies positioned for production lines, loading docks, and plant yards.",
              },
              {
                title: "Security Monitoring",
                desc: "24/7 perimeter, gatehouse, and restricted-zone visibility supporting low-light, infrared, and wide-dynamic-range scenes.",
              },
              {
                title: "Network Video Infrastructure",
                desc: "Industrial PoE switching, fiber optic transmission rings, surge protection, and redundant network topologies.",
              },
              {
                title: "Recording & Monitoring Systems",
                desc: "Enterprise NVRs, RAID storage arrays, configurable retention policies, and multi-screen control room workstations.",
              },
              {
                title: "AI-Ready Stream Architecture",
                desc: "Camera placement, focal lengths, and stream profiles engineered to feed downstream AI safety and security analytics.",
              },
              {
                title: "Related Accessories & Fabrication",
                desc: "Custom camera poles, gantry brackets, junction boxes, armored cabling, and outdoor power enclosures.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-6"
              >
                <Shield className="h-6 w-6 text-[#1877F2]" />
                <h3 className="mt-4 text-lg font-bold text-[#0B1730]">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DATABASE-DRIVEN PRODUCT CARDS */}
      <section className="border-y border-[#E2E8F0] bg-[#F5F8FC] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Configured Systems"
            title="Available CCTV & Surveillance Solution Configurations"
            description="Database-driven surveillance packages customizable to your site survey and operational requirements."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {cctvProducts.map((prod) => (
              <article
                key={prod.id}
                className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs"
              >
                <div>
                  <span className="rounded-full bg-[#1877F2]/10 px-3 py-1 text-xs font-semibold text-[#1877F2]">
                    {prod.categoryName}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-[#0B1730]">{prod.name}</h3>
                  <p className="mt-2 text-sm text-[#64748B]">{prod.shortDescription}</p>
                  <ul className="mt-4 space-y-2 border-t border-[#E2E8F0] pt-4">
                    {prod.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-[#172033]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1877F2]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                  <Link
                    href={`/products/item/${prod.slug}`}
                    className="text-xs font-bold tracking-wider text-[#1877F2] uppercase hover:underline"
                  >
                    View Full Specifications →
                  </Link>
                  <QuoteModalTrigger
                    buttonText="Request Quote"
                    variant="primary"
                    size="sm"
                    productId={prod.id}
                    productSlug={prod.slug}
                    preselectedTopicName={prod.name}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5, 6 & 7. KEY FEATURES, APPLICATIONS & INTEGRATION */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#E2E8F0] p-6">
              <div className="flex items-center gap-2.5 text-[#0B1730]">
                <CheckCircle2 className="h-5 w-5 text-[#1877F2]" />
                <h3 className="text-lg font-bold">Key Features</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-[#64748B]">
                <li>• High-definition optical clarity for industrial bays</li>
                <li>• Weatherproof & industrial-grade enclosures</li>
                <li>• Centralized & redundant NVR storage architectures</li>
                <li>• Role-based operator viewing & audit trails</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] p-6">
              <div className="flex items-center gap-2.5 text-[#0B1730]">
                <Layers className="h-5 w-5 text-[#0095B0]" />
                <h3 className="text-lg font-bold">Industrial Applications</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-[#64748B]">
                <li>• Shop-floor & assembly line supervision</li>
                <li>• Perimeter fence, gatehouse & weighbridge monitoring</li>
                <li>• Raw material & finished goods warehouse security</li>
                <li>• Substation, tank farm & utility plant observation</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] p-6">
              <div className="flex items-center gap-2.5 text-[#0B1730]">
                <Cpu className="h-5 w-5 text-[#1877F2]" />
                <h3 className="text-lg font-bold">Integration Capabilities</h3>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-[#64748B]">
                <li>• Direct stream ingestion into AI Video Analytics</li>
                <li>• Unified Video Management System (VMS) walls</li>
                <li>• Access Control & Perimeter Intrusion alarm linking</li>
                <li>• Fire Alarm & PA emergency event camera call-up</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. QUOTE REQUEST CTA */}
      <section className="bg-[#0B1730] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/15 bg-white p-6 text-[#172033] shadow-2xl sm:p-10">
            <h2 className="text-2xl font-bold text-[#0B1730]">
              Request an Industrial CCTV & Surveillance Proposal
            </h2>
            <p className="mt-1 mb-6 text-sm text-[#64748B]">
              Share your facility details for a customized camera coverage plan and BOQ.
            </p>
            <EnquiryForm
              preselectedTopicName="Industrial CCTV & Video Surveillance"
              compact
            />
          </div>
        </div>
      </section>
    </div>
  );
}
