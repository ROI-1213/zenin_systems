import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Quote, MessageSquareQuote, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/db/queries";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";

export const metadata: Metadata = {
  title: "Client Testimonials & Feedback",
  description:
    "Read verified client feedback and project testimonials for Zenin Systems Solutions LLP across industrial security, AI video analytics, and facility automation.",
};

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const testimonials = await getPublishedTestimonials();

  return (
    <div>
      {/* HERO */}
      <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
        <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] border border-white/15 bg-[#0B1730] bg-industrial-grid py-12 text-white shadow-2xl sm:py-16 lg:py-20">
          <div className="px-5 sm:px-8 lg:px-12">
            <Breadcrumbs items={[{ label: "Testimonials" }]} light />
            <span className="inline-block rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
              Client Feedback
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              Enterprise Client Testimonials
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              Verified feedback from industrial plants, logistics facilities, and
              commercial organizations partnering with Zenin Systems Solutions LLP.
            </p>
          </div>
        </section>
      </div>

      {/* TESTIMONIALS GRID OR NEUTRAL EMPTY STATE */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {testimonials.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9]">
                <MessageSquareQuote className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-[#0B1730]">
                Verified Client Testimonials Directory
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                Zenin Systems publishes only authenticated client reviews approved for
                public release. Contact our engineering team to request relevant
                industry reference discussions for your sector.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <QuoteModalTrigger
                  buttonText="Request a Project Consultation"
                  variant="primary"
                  size="md"
                />
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1730] hover:bg-slate-50"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => {
                const initials = t.clientName
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((w) => w[0]?.toUpperCase())
                  .join("");
                return (
                  <blockquote
                    key={t.id}
                    className="group flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-7 shadow-2xs transition hover:-translate-y-1 hover:border-[#1877F2] hover:bg-white hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className="h-4 w-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Verified Client</span>
                        </span>
                      </div>

                      <Quote className="mt-4 h-7 w-7 text-[#1877F2]/80" />
                      <p className="mt-3 text-sm leading-relaxed text-[#172033] sm:text-base">
                        &ldquo;{t.feedback}&rdquo;
                      </p>
                    </div>

                    <footer className="mt-6 flex items-center gap-3.5 border-t border-[#E2E8F0] pt-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B1730] text-xs font-extrabold text-[#00B8D9]">
                        {initials || "ZS"}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-base font-bold text-[#0B1730]">
                          {t.clientName}
                        </div>
                        <div className="truncate text-xs font-medium text-[#64748B]">
                          {t.designation ? `${t.designation} • ` : ""}
                          {t.companyName}
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[#0B1730] py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Start Your Next Industrial Technology Project With Us
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Schedule a consultation or site survey with Zenin Systems engineers.
            </p>
          </div>
          <QuoteModalTrigger
            buttonText="Request a Quote"
            variant="cyan"
            size="lg"
          />
        </div>
      </section>
    </div>
  );
}
