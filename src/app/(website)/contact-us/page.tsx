import React from "react";
import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { getPageContentBlock, getSiteSettingsMap } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const metadata: Metadata = {
  title: "Contact Us & Request a Quote",
  description:
    "Contact Zenin Systems Solutions LLP for industrial CCTV surveillance, AI video analytics, building management (IBMS), fire safety, and automation engineering enquiries.",
};

export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const [contactBlock, settings] = await Promise.all([
    getPageContentBlock("contact", "details", {
      heading: "Let's Discuss Your Industrial Technology Requirements",
      description:
        "Reach out to Zenin Systems Solutions LLP for technical consultations, site surveys, solution demonstrations, or customized project quotations.",
      address: "[Official Corporate / Registered Office Address — Configure in Admin Settings]",
      phone: "[Official Business Phone — Configure in Admin Settings]",
      email: "contact@zeninsystems.com",
      workingHours: "Monday – Saturday: 9:30 AM – 6:30 PM IST",
      mapEmbedUrl: "",
    }),
    getSiteSettingsMap(),
  ]);

  const address = settings.contact_address || contactBlock.data.address;
  const phone = settings.contact_phone || contactBlock.data.phone;
  const email = settings.contact_email || contactBlock.data.email;
  const mapUrl = settings.contact_map_url || contactBlock.data.mapEmbedUrl;

  return (
    <div>
      {/* HERO BANNER */}
      <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
        <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] border border-white/15 bg-[#0B1730] bg-industrial-grid py-12 text-white shadow-2xl sm:py-16 lg:py-20">
          <div className="px-5 sm:px-8 lg:px-12">
            <Breadcrumbs items={[{ label: "Contact Us" }]} light />
            <span className="inline-block rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
              {contactBlock.subtitle || "CONTACT & PROJECT CONSULTATION"}
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              {contactBlock.title || "Connect With Our Engineering & Solutions Team"}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              {contactBlock.data.description}
            </p>
          </div>
        </section>
      </div>

      {/* TWO-COLUMN CONTACT SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* LEFT COLUMN: CORPORATE CONTACT DETAILS & MAP */}
            <div className="space-y-8 lg:col-span-5">
              <div>
                <h2 className="text-2xl font-bold text-[#0B1730]">
                  {contactBlock.data.heading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  Our solutions architects assist industrial plants, EPC contractors,
                  warehouses, and commercial enterprises with end-to-end system design
                  and quotations.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                      Corporate Office Address
                    </div>
                    <p className="mt-1 text-sm leading-relaxed font-medium text-[#0B1730]">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                      Phone / Project Desk
                    </div>
                    <p className="mt-1 text-sm font-medium text-[#0B1730]">{phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                      Business Email
                    </div>
                    <a
                      href={`mailto:${email}`}
                      className="mt-1 block text-sm font-medium text-[#0B1730] hover:text-[#1877F2]"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                      Business Hours
                    </div>
                    <p className="mt-1 text-sm font-medium text-[#0B1730]">
                      {contactBlock.data.workingHours ||
                        "Monday – Saturday: 9:30 AM – 6:30 PM IST"}
                    </p>
                  </div>
                </div>
              </div>

              {/* GOOGLE MAPS INTEGRATION OR EDITABLE PLACEHOLDER */}
              <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#0B1730] text-white">
                {mapUrl && mapUrl.startsWith("https://") ? (
                  <iframe
                    src={mapUrl}
                    title="Zenin Systems Solutions LLP Location Map"
                    className="h-64 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#00B8D9] uppercase">
                      <MapPin className="h-4 w-4" />
                      <span>Location Map Configuration</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      Interactive Google Map embed is ready and will automatically
                      display here once the verified corporate coordinates / Google
                      Maps URL is entered in <strong>Admin → Site Settings</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT & QUOTE FORM */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-6 shadow-lg sm:p-10">
                <div className="mb-6 border-b border-[#E2E8F0] pb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                    <ShieldCheck className="h-4 w-4" />
                    Direct Engineering & Sales Enquiry Form
                  </span>
                  <h2 className="mt-1 text-2xl font-bold text-[#0B1730]">
                    Send Us Your Project Enquiry
                  </h2>
                  <p className="mt-1 text-xs text-[#64748B] sm:text-sm">
                    Complete the form below to request a product quotation, AI video
                    analytics demonstration, or service consultation.
                  </p>
                </div>

                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
