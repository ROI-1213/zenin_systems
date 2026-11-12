import React from "react";
import type { Metadata } from "next";
import { getPageContentBlock } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and B2B data handling practices of Zenin Systems Solutions LLP.",
};

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  const block = await getPageContentBlock("legal", "privacy_policy", {
    lastUpdated: "November 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        body: "When you submit a business enquiry or quote request on the Zenin Systems Solutions LLP website, we collect your name, company name, business email address, phone number, project location, and enquiry details solely to respond to your request.",
      },
      {
        heading: "2. How We Use Business Enquiry Data",
        body: "Submitted contact and project requirements are accessed only by authorized Zenin Systems personnel to prepare technical proposals, schedule consultations, and provide requested product or service information.",
      },
      {
        heading: "3. Data Security & Retention",
        body: "We implement server-side validation, encrypted transport, and role-based access controls to protect submitted B2B enquiry records. We do not sell or rent business contact information to third parties.",
      },
    ],
  });

  return (
    <div>
      <section className="bg-[#0B1730] py-14 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} light />
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            {block.title || "Privacy Policy"}
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
