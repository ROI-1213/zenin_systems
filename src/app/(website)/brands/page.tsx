import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ExternalLink, ArrowRight } from "lucide-react";
import { getPublishedBrands } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";

export const metadata: Metadata = {
  title: "Brands & Technology Ecosystem",
  description:
    "OEM hardware and software technologies integrated by Zenin Systems Solutions LLP across industrial CCTV, AI vision, fire safety, and building management.",
};

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  const brands = await getPublishedBrands();

  return (
    <div>
      {/* HERO */}
      <section className="bg-[#0B1730] bg-industrial-grid py-16 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Brands" }]} light />
          <span className="inline-block rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
            Technology Ecosystem
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Brands & Hardware Integration Ecosystem
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            Zenin Systems integrates standards-compliant industrial imaging, networking,
            fire safety, and automation equipment tailored to each client&apos;s
            approved vendor list and project specifications.
          </p>
        </div>
      </section>

      {/* BRANDS GRID OR NEUTRAL EMPTY STATE */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {brands.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-[#0B1730]">
                Multi-Vendor Open Integration Architecture
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                Our solutions are engineered around open industrial standards (ONVIF,
                RTSP, BACnet, Modbus, SIP, Wiegand) to support your facility&apos;s
                preferred OEM hardware brands. Verified brand logos and partner listings
                are managed through the Zenin Systems Admin CMS.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <QuoteModalTrigger
                  buttonText="Request Vendor-Specific BOQ Quote"
                  variant="primary"
                  size="md"
                  preselectedTopicName="OEM / Brand Hardware Integration Enquiry"
                />
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1730] hover:bg-slate-50"
                >
                  <span>Browse Solutions Catalog</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {brands.map((brand) => (
                <article
                  key={brand.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-6 transition hover:border-[#1877F2] hover:bg-white hover:shadow-md"
                >
                  <div>
                    <div className="flex h-16 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-4 text-center text-lg font-extrabold text-[#0B1730]">
                      {brand.name}
                    </div>
                    {brand.shortDescription && (
                      <p className="mt-4 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                        {brand.shortDescription}
                      </p>
                    )}
                  </div>
                  {brand.websiteUrl && (
                    <div className="mt-4 border-t border-[#E2E8F0] pt-3">
                      <a
                        href={brand.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1877F2] hover:underline"
                      >
                        <span>Official Website</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
