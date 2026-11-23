import React from "react";
import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { getPageContentBlock, getSiteSettingsMap } from "@/lib/db/queries";
import { CONTACT_PAGE_DEFAULTS } from "@/lib/contact-page-defaults";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const metadata: Metadata = {
  title: "Contact Us & Request a Quote",
  description:
    "Contact Zenin Systems Solutions LLP for industrial CCTV surveillance, AI video analytics, building management (IBMS), fire safety, and automation engineering enquiries.",
};

export const dynamic = "force-dynamic";

function cleanField(val: string | undefined, fallback: string) {
  if (
    !val ||
    val.toLowerCase().includes("pending") ||
    val.toLowerCase().includes("configure in admin")
  ) {
    return fallback;
  }
  return val;
}

export default async function ContactUsPage() {
  const D = CONTACT_PAGE_DEFAULTS;
  const [bannerBlock, detailsBlock, mapBlock, formBlock, legacyBlock, settings] =
    await Promise.all([
      getPageContentBlock("contact", "banner", D.banner.data),
      getPageContentBlock("contact", "contact_details", D.contact_details.data),
      getPageContentBlock("contact", "map_section", D.map_section.data),
      getPageContentBlock("contact", "enquiry_form", D.enquiry_form.data),
      getPageContentBlock("contact", "details", {
        address: "",
        phone: "",
        email: "",
        workingHours: "",
        mapEmbedUrl: "",
      }),
      getSiteSettingsMap(),
    ]);

  const address = cleanField(
    detailsBlock.data.address || settings.contact_address || legacyBlock.data.address,
    D.contact_details.data.address
  );
  const phone = cleanField(
    detailsBlock.data.phone || settings.contact_phone || legacyBlock.data.phone,
    D.contact_details.data.phone
  );
  const email = cleanField(
    detailsBlock.data.email || settings.contact_email || legacyBlock.data.email,
    D.contact_details.data.email
  );
  const workingHours =
    detailsBlock.data.workingHours ||
    legacyBlock.data.workingHours ||
    D.contact_details.data.workingHours;
  const mapUrl =
    mapBlock.data.mapEmbedUrl ||
    settings.contact_map_url ||
    legacyBlock.data.mapEmbedUrl ||
    "";

  const showLeftColumn =
    detailsBlock.data.enabled !== false || mapBlock.data.enabled !== false;
  const showRightColumn = formBlock.data.enabled !== false;

  return (
    <div>
      {/* 01. HERO BANNER */}
      {bannerBlock.data.enabled !== false && (
        <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
          <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] border border-white/15 bg-[#0B1730] bg-industrial-grid py-12 text-white shadow-2xl sm:py-16 lg:py-20">
            <div className="px-5 sm:px-8 lg:px-12">
              <Breadcrumbs items={[{ label: "Contact Us" }]} light />
              <span className="inline-block rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
                {bannerBlock.subtitle || D.banner.subtitle}
              </span>
              <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
                {bannerBlock.title || D.banner.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                {bannerBlock.data.description}
              </p>
            </div>
          </section>
        </div>
      )}

      {/* 02, 03 & 04. TWO-COLUMN CONTACT SECTION */}
      {(showLeftColumn || showRightColumn) && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* LEFT COLUMN: CORPORATE CONTACT DETAILS & MAP */}
              {showLeftColumn && (
                <div
                  className={`space-y-8 ${
                    showRightColumn ? "lg:col-span-5" : "lg:col-span-12"
                  }`}
                >
                  {detailsBlock.data.enabled !== false && (
                    <>
                      <div>
                        <h2 className="text-2xl font-bold text-[#0B1730]">
                          {detailsBlock.title || D.contact_details.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                          {detailsBlock.data.intro || D.contact_details.data.intro}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                              {detailsBlock.data.addressLabel ||
                                D.contact_details.data.addressLabel}
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
                              {detailsBlock.data.phoneLabel ||
                                D.contact_details.data.phoneLabel}
                            </div>
                            <p className="mt-1 text-sm font-medium text-[#0B1730]">
                              {phone}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                            <Mail className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                              {detailsBlock.data.emailLabel ||
                                D.contact_details.data.emailLabel}
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
                              {detailsBlock.data.hoursLabel ||
                                D.contact_details.data.hoursLabel}
                            </div>
                            <p className="mt-1 text-sm font-medium text-[#0B1730]">
                              {workingHours}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* 03. GOOGLE MAPS INTEGRATION */}
                  {mapBlock.data.enabled !== false && (
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
                            <span>
                              {mapBlock.title || D.map_section.title}
                            </span>
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-slate-300">
                            {mapBlock.data.placeholderText ||
                              D.map_section.data.placeholderText}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 04. RIGHT COLUMN: CONTACT & QUOTE FORM */}
              {showRightColumn && (
                <div className={showLeftColumn ? "lg:col-span-7" : "lg:col-span-12"}>
                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-6 shadow-lg sm:p-10">
                    <div className="mb-6 border-b border-[#E2E8F0] pb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1877F2] uppercase">
                        <ShieldCheck className="h-4 w-4" />
                        {formBlock.subtitle || D.enquiry_form.subtitle}
                      </span>
                      <h2 className="mt-1 text-2xl font-bold text-[#0B1730]">
                        {formBlock.title || D.enquiry_form.title}
                      </h2>
                      <p className="mt-1 text-xs text-[#64748B] sm:text-sm">
                        {formBlock.data.description ||
                          D.enquiry_form.data.description}
                      </p>
                    </div>

                    <EnquiryForm
                      preselectedTopicName={
                        formBlock.data.preselectedTopicName ||
                        D.enquiry_form.data.preselectedTopicName
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
