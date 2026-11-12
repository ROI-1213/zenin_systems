import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MonitorPlay, CheckCircle2, Server, Layers, ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const metadata: Metadata = {
  title: "Video Management Solutions (VMS) & Centralized Monitoring",
  description:
    "Enterprise Video Management Platforms, centralized command center monitoring, redundant recording infrastructure, and multi-site surveillance orchestration by Zenin Systems.",
};

export const dynamic = "force-dynamic";

export default async function VideoManagementPage() {
  const vmsProducts = await getProducts({ categorySlug: "video-management" });

  return (
    <div>
      {/* HERO */}
      <section className="bg-[#0B1730] bg-industrial-grid py-16 text-white lg:py-22">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Products & Solutions", href: "/products" },
              { label: "Video Management Solutions" },
            ]}
            light
          />

          <div className="mt-4 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/35 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                <MonitorPlay className="h-3.5 w-3.5" />
                <span>Core Solution Pillar 03</span>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Enterprise Video Management Solutions (VMS)
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                Unify distributed industrial camera networks, AI analytics alerts,
                access control events, and perimeter sensors into a resilient,
                centralized command-and-control platform.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <QuoteModalTrigger
                  buttonText="Request VMS Architecture Proposal"
                  variant="cyan"
                  size="lg"
                  preselectedTopicName="Video Management Solutions (VMS)"
                />
                <Link
                  href="/products/cctv-surveillance"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <span>Industrial CCTV Hardware</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/15 bg-[#142B49] shadow-2xl">
                <Image
                  src="/images/pillars/video-management.png"
                  alt="Centralized Video Management Command Center"
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

      {/* CORE CAPABILITIES */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Command Center Architecture"
            title="Unified Surveillance & Recording Infrastructure"
            description="Built for continuous 24/7 industrial operations where stream availability, archival integrity, and rapid forensic search are critical."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Video Management Platforms",
                desc: "Open-architecture VMS software supporting multi-vendor IP cameras, encoders, and specialized thermal sensors.",
              },
              {
                title: "Centralized Surveillance Monitoring",
                desc: "Multi-monitor operator workstations and LED/LCD video wall controllers for security and process command rooms.",
              },
              {
                title: "Recording & Playback",
                desc: "Synchronized multi-camera playback, timeline scrubbing, motion/AI metadata search, and tamper-evident video export.",
              },
              {
                title: "Monitoring Infrastructure",
                desc: "High-availability recording servers, RAID/SAN storage pools, failover nodes, and network health diagnostics.",
              },
              {
                title: "Integration Solutions",
                desc: "Bi-directional alarm handling with AI Video Analytics, Fire Detection, Access Control, and Perimeter Fencing.",
              },
              {
                title: "Multi-Site Federation",
                desc: "Connect regional plants, warehouses, and branch offices back to a corporate headquarters command center.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-6"
              >
                <Server className="h-6 w-6 text-[#1877F2]" />
                <h3 className="mt-4 text-lg font-bold text-[#0B1730]">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIGURED VMS PRODUCTS */}
      {vmsProducts.length > 0 && (
        <section className="border-y border-[#E2E8F0] bg-[#F5F8FC] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#0B1730]">
              Configured Video Management Systems
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {vmsProducts.map((p) => (
                <article
                  key={p.id}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs"
                >
                  <h3 className="text-xl font-bold text-[#0B1730]">{p.name}</h3>
                  <p className="mt-2 text-sm text-[#64748B]">{p.shortDescription}</p>
                  <ul className="mt-4 space-y-2 border-t border-[#E2E8F0] pt-4">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-[#172033]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1877F2]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                    <Link
                      href={`/products/item/${p.slug}`}
                      className="text-xs font-bold text-[#1877F2] uppercase hover:underline"
                    >
                      View Specifications →
                    </Link>
                    <QuoteModalTrigger
                      buttonText="Request Quote"
                      variant="primary"
                      size="sm"
                      productId={p.id}
                      productSlug={p.slug}
                      preselectedTopicName={p.name}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ENQUIRY CTA */}
      <section className="bg-[#0B1730] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/15 bg-white p-6 text-[#172033] shadow-2xl sm:p-10">
            <h2 className="text-2xl font-bold text-[#0B1730]">
              Design Your Command Room & Video Management Architecture
            </h2>
            <p className="mt-1 mb-6 text-sm text-[#64748B]">
              Let our engineers size your recording storage, failover nodes, and
              control room display architecture.
            </p>
            <EnquiryForm
              preselectedTopicName="Video Management Solutions (VMS)"
              compact
            />
          </div>
        </div>
      </section>
    </div>
  );
}
