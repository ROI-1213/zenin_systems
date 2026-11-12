import React from "react";
import type { Metadata } from "next";
import { getPageContentBlock } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for the Zenin Systems Solutions LLP corporate website and catalog.",
};

export const dynamic = "force-dynamic";

export default async function TermsAndConditionsPage() {
  const block = await getPageContentBlock("legal", "terms_and_conditions", {
    lastUpdated: "November 2026",
    sections: [
      {
        heading: "1. Informational & Enquiry Scope",
        body: "The Zenin Systems Solutions LLP website serves as a B2B corporate catalog and project enquiry portal. Product descriptions, AI solution overviews, and service architectures represent engineering capabilities and are customized per project site survey and formal commercial proposal.",
      },
      {
        heading: "2. Technical Specifications & Proposals",
        body: "Final technical specifications, camera/sensor models, detection parameters, and compliance certifications are governed exclusively by signed project quotations and Statement of Work (SOW) documents.",
      },
      {
        heading: "3. Intellectual Property",
        body: "All text, structure, graphics, and design elements on this website are the property of Zenin Systems Solutions LLP or their respective licensed owners.",
      },
    ],
  });

  return (
    <div>
      <section className="bg-[#0B1730] py-14 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Terms and Conditions" }]} light />
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            {block.title || "Terms and Conditions"}
          </h1>
          <p className="mt-2 text-xs text-slate-300">
            Last Updated: {block.data.lastUpdated || "November 2026"}
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
          {(block.data.sections || []).map(
            (s: { heading: string; body: string }) => (
              <div
                key={s.heading}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-6"
              >
                <h2 className="text-lg font-bold text-[#0B1730]">{s.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  {s.body}
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
