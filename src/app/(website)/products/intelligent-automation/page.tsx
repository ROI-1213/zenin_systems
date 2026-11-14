import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cpu, CheckCircle2, ArrowRight, Wrench, Layers } from "lucide-react";
import { getProducts, getServices } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const metadata: Metadata = {
  title: "Intelligent Automation Solutions & AI-Enabled Plant Workflows",
  description:
    "AI-enabled industrial automation, automated gate & weighbridge systems, PLC/SCADA visual interlocks, and intelligent monitoring applications by Zenin Systems.",
};

export const dynamic = "force-dynamic";

export default async function IntelligentAutomationPage() {
  const [automationProducts, relatedServices] = await Promise.all([
    getProducts({ categorySlug: "intelligent-automation" }),
    getServices({ limit: 4 }),
  ]);

  return (
    <div>
      {/* 1. HERO */}
      <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
        <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] border border-white/15 bg-[#0B1730] bg-industrial-grid py-12 text-white shadow-2xl sm:py-16 lg:py-20">
          <div className="px-5 sm:px-8 lg:px-12">
            <Breadcrumbs
              items={[
                { label: "Products & Solutions", href: "/products" },
                { label: "Intelligent Automation Solutions" },
              ]}
              light
            />

            <div className="mt-4 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/35 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>Core Solution Pillar 04</span>
                </div>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  Intelligent Automation Solutions
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                  Connect AI computer vision, IIoT sensors, and electromechanical
                  actuators to automate industrial gates, weighbridges, safety
                  interlocks, and facility control workflows.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <QuoteModalTrigger
                    buttonText="Request Automation Engineering Quote"
                    variant="cyan"
                    size="lg"
                    preselectedTopicName="Intelligent Automation Solutions"
                  />
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    <span>Explore Engineering Services</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/15 bg-[#142B49] shadow-2xl">
                  <Image
                    src="/images/pillars/intelligent-automation.png"
                    alt="Intelligent Industrial Automation Systems"
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

      {/* 2, 3 & 4. OVERVIEW, AI-ENABLED AUTOMATION & MONITORING APPLICATIONS */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Closed-Loop Industrial Intelligence"
            title="AI-Enabled Industrial Automation & Monitoring"
            description="Rather than stopping at passive dashboard alerts, our Intelligent Automation architectures translate visual and sensor events directly into physical control actions."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Automated Gate & Weighbridge Workflows",
                desc: "Synchronize ANPR cameras, UHF RFID readers, boom barriers, traffic lights, and weighbridge terminals for unmanned vehicle processing.",
              },
              {
                title: "Machine & Danger-Zone Safety Interlocks",
                desc: "Link AI danger-zone detection and perimeter sensors with PLC digital inputs, warning beacons, and safety trip relays.",
              },
              {
                title: "Production Line Vision & Reject Automation",
                desc: "Trigger pneumatic diverters, sorting gates, or line-stop relays when visual quality inspection detects surface or packaging defects.",
              },
              {
                title: "Smart Building & Utility Orchestration",
                desc: "Coordinate HVAC, DALI/KNX lighting, energy sub-meters, and fire alarm cause-and-effect interlocks through unified DDC/IBMS controllers.",
              },
              {
                title: "IIoT Telemetry & Condition Alerts",
                desc: "Monitor vibration, ambient temperature, tank levels, and panel hotspots with automated escalation workflows.",
              },
              {
                title: "Custom Panel Fabrication & Retrofits",
                desc: "Design and build custom PLC, relay, and power distribution cabinets to modernize legacy plant equipment.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-6"
              >
                <Layers className="h-6 w-6 text-[#1877F2]" />
                <h3 className="mt-4 text-lg font-bold text-[#0B1730]">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 & 6. CONFIGURED AUTOMATION SYSTEMS */}
      {automationProducts.length > 0 && (
        <section className="border-y border-[#E2E8F0] bg-[#F5F8FC] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#0B1730]">
              Configured Automation Controllers & Suites
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {automationProducts.map((p) => (
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

      {/* 7. RELATED SERVICES */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#0B1730]">
              Related Engineering & Integration Services
            </h2>
            <Link
              href="/services"
              className="text-xs font-bold text-[#1877F2] uppercase hover:underline"
            >
              View All 12 Services →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((svc) => (
              <Link
                key={svc.id}
                href={`/services/${svc.slug}`}
                className="group rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-5 transition hover:border-[#1877F2] hover:bg-white hover:shadow-md"
              >
                <Wrench className="h-5 w-5 text-[#1877F2]" />
                <h3 className="mt-3 text-base font-bold text-[#0B1730] group-hover:text-[#1877F2]">
                  {svc.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs text-[#64748B]">
                  {svc.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. REQUEST A QUOTE */}
      <section className="bg-[#0B1730] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/15 bg-white p-6 text-[#172033] shadow-2xl sm:p-10">
            <h2 className="text-2xl font-bold text-[#0B1730]">
              Discuss Your Industrial Automation Requirement
            </h2>
            <p className="mt-1 mb-6 text-sm text-[#64748B]">
              Consult our engineers on gate automation, PLC interlocks, IBMS, or custom
              control workflows.
            </p>
            <EnquiryForm
              preselectedTopicName="Intelligent Automation Solutions"
              compact
            />
          </div>
        </div>
      </section>
    </div>
  );
}
