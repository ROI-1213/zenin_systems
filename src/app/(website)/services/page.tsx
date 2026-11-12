import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  ArrowRight,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Headset,
  Sliders,
} from "lucide-react";
import { getServices } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Reveal, StaggerGrid, StaggerCard } from "@/components/ui/cinematic-motion";

export const metadata: Metadata = {
  title: "Industrial & Building Engineering Services (12 Verticals)",
  description:
    "Explore Zenin Systems' 12 engineering service verticals: Fire Detection & Alarm, IBMS, Smart Lighting, Energy Management, IVR, PA Systems, AV & Video Conferencing, HVAC, Intelligent Fencing, Access Control, IoT, and Parking Management.",
};

export const dynamic = "force-dynamic";

const LIFECYCLE_PILLARS = [
  {
    title: "System Integration",
    desc: "Multi-protocol interfacing (BACnet, Modbus, ONVIF, SIP, Dry Contacts) connecting security, fire, and building automation subsystems.",
    icon: Layers,
  },
  {
    title: "Installation",
    desc: "Structured field cabling, containment routing, rack assembly, and industrial sensor/device mounting by trained site technicians.",
    icon: Wrench,
  },
  {
    title: "Commissioning",
    desc: "Systematic point-to-point verification, loop testing, cause-and-effect interlock validation, and operator handover.",
    icon: Sliders,
  },
  {
    title: "Maintenance",
    desc: "Scheduled preventive maintenance visits, detector cleaning, calibration checks, and Annual Maintenance Contracts (AMC).",
    icon: ShieldCheck,
  },
  {
    title: "Technical Support",
    desc: "Responsive remote diagnostics, on-site troubleshooting, firmware updates, and system expansion support.",
    icon: Headset,
  },
];

export default async function ServicesListingPage() {
  const services = await getServices();

  return (
    <div>
      {/* 1. SERVICES HERO */}
      <section className="bg-[#0B1730] bg-industrial-grid py-16 text-white lg:py-22">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Services" }]} light />
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B8D9]/35 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
            <Wrench className="h-3.5 w-3.5" />
            <span>12 Specialized Engineering Service Verticals</span>
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Integrated Industrial, Safety & Building Engineering Services
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            From Fire Detection and Integrated Building Management (IBMS) to Access
            Control, HVAC, Smart Lighting, Energy Management, and IIoT—Zenin Systems
            delivers complete lifecycle engineering for industrial and commercial
            facilities.
          </p>
          <div className="mt-8">
            <QuoteModalTrigger
              buttonText="Request a Service Consultation & Quote"
              variant="cyan"
              size="lg"
              preselectedTopicName="Engineering & Integration Services"
            />
          </div>
        </div>
      </section>

      {/* 2. RESPONSIVE 12-CATEGORY GRID */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Service Catalog"
              title="Our 12 Core Engineering Service Verticals"
              description="Select any service domain below to explore technical capabilities, industrial applications, and project enquiry options."
            />
          </Reveal>

          <StaggerGrid className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, idx) => (
              <StaggerCard
                key={svc.id}
                className="app-card group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#1877F2]"
              >
                <div className="relative h-52 w-full overflow-hidden bg-[#0B1730]">
                  {svc.coverImage && (
                    <Image
                      src={svc.coverImage}
                      alt={svc.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="cinematic-img object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730] via-[#0B1730]/35 to-transparent" />
                  <div className="absolute top-3 right-3 rounded-full border border-white/15 bg-[#0B1730]/80 px-2.5 py-1 text-[11px] font-bold text-[#00B8D9] backdrop-blur-md">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
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

                  {svc.features.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-[#E2E8F0] pt-3">
                      {svc.features.slice(0, 2).map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2 text-xs text-[#172033]"
                        >
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
                      <span>Explore Service</span>
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </Link>

                    <QuoteModalTrigger
                      buttonText="Quote"
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

      {/* 3. CROSS-SERVICE CAPABILITIES SECTION */}
      <section className="border-y border-[#E2E8F0] bg-[#F5F8FC] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Lifecycle Delivery Model"
            title="Cross-Service Engineering & Execution Capabilities"
            description="Every Zenin Systems service engagement is backed by structured project delivery—from initial system integration engineering to long-term technical support."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {LIFECYCLE_PILLARS.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#0B1730]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CONTACT CTA */}
      <section className="bg-[#0B1730] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/15 bg-white p-6 text-[#172033] shadow-2xl sm:p-10">
            <h2 className="text-2xl font-bold text-[#0B1730]">
              Request an Engineering Service Proposal
            </h2>
            <p className="mt-1 mb-6 text-sm text-[#64748B]">
              Specify your facility location and the service vertical(s) required for
              your project.
            </p>
            <EnquiryForm
              defaultEnquiryType="SERVICE_REQUEST"
              preselectedTopicName="Engineering & Facility Services"
              compact
            />
          </div>
        </div>
      </section>
    </div>
  );
}
