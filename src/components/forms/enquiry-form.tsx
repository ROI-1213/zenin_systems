"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { CheckCircle2, Loader2, ShieldCheck, Send, Sparkles } from "lucide-react";
import { enquirySchema, type EnquiryInput } from "@/lib/validations";
import { submitEnquiryAction } from "@/lib/actions/enquiry-actions";

const GENERAL_TOPIC_OPTIONS = [
  "Industrial CCTV & Video Surveillance",
  "AI Video Analytics & AI Vision Solutions",
  "PPE Detection & Safety Compliance AI",
  "Fire & Smoke Video Detection",
  "ANPR & Gate Automation",
  "Visual Quality & Surface Defect Inspection",
  "HDRI Wheel Inspection",
  "Thermal & Electrical Panel Monitoring",
  "Video Management Solutions (VMS)",
  "Intelligent Automation Solutions",
  "Fire Detection & Alarm Systems (FAS)",
  "Integrated Building Management Systems (IBMS)",
  "Access Control & Parking Management",
  "Audio Visual, PA & IVR Systems",
  "HVAC, Smart Lighting & Energy Management",
  "EV Charging, Cables & Industrial Supplies",
  "Custom Engineering / Multi-System Turnkey Project",
];

export interface EnquiryFormProps {
  productId?: string;
  productSlug?: string;
  aiSolutionId?: string;
  aiSolutionSlug?: string;
  serviceId?: string;
  serviceSlug?: string;
  preselectedTopicName?: string;
  defaultEnquiryType?: "QUOTE_REQUEST" | "GENERAL_INQUIRY" | "TECHNICAL_CONSULTATION" | "SERVICE_REQUEST";
  compact?: boolean;
  darkTheme?: boolean;
  onSuccessCallback?: (refCode: string) => void;
}

export function EnquiryForm({
  productId,
  productSlug,
  aiSolutionId,
  aiSolutionSlug,
  serviceId,
  serviceSlug,
  preselectedTopicName,
  defaultEnquiryType = "QUOTE_REQUEST",
  compact = false,
  darkTheme = false,
  onSuccessCallback,
}: EnquiryFormProps) {
  const pathname = usePathname();
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [resolvedTopicLabel, setResolvedTopicLabel] = useState<string | undefined>(
    preselectedTopicName
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const isContextLocked = Boolean(
    preselectedTopicName &&
      (productId || productSlug || aiSolutionId || aiSolutionSlug || serviceId || serviceSlug)
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      enquiryType: defaultEnquiryType,
      interestedTopic: preselectedTopicName || GENERAL_TOPIC_OPTIONS[0],
      productId: productId || "",
      productSlug: productSlug || "",
      aiSolutionId: aiSolutionId || "",
      aiSolutionSlug: aiSolutionSlug || "",
      serviceId: serviceId || "",
      serviceSlug: serviceSlug || "",
      projectLocation: "",
      message: "",
      sourcePage: pathname || "/",
      honeypot: "",
    },
  });

  const onSubmit = async (values: EnquiryInput) => {
    setServerError(null);
    const result = await submitEnquiryAction({
      ...values,
      sourcePage: pathname || values.sourcePage || "/",
    });

    if (!result.success) {
      setServerError(result.error || "Unable to submit enquiry. Please try again.");
      return;
    }

    setSubmittedRef(result.referenceCode || "ZSS-CONFIRMED");
    if (result.resolvedTopic) {
      setResolvedTopicLabel(result.resolvedTopic);
    }
    reset();
    if (onSuccessCallback && result.referenceCode) {
      onSuccessCallback(result.referenceCode);
    }
  };

  if (submittedRef) {
    return (
      <div
        className={`rounded-2xl border p-6 sm:p-8 ${
          darkTheme
            ? "border-[#00B8D9]/40 bg-[#0B1730]/90 text-white"
            : "border-emerald-200 bg-emerald-50/70 text-[#0B1730]"
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <span className="inline-block rounded-full bg-emerald-500/15 px-3 py-0.5 text-xs font-semibold tracking-wider text-emerald-600 uppercase">
              Enquiry Logged Successfully
            </span>
            <h3 className="mt-2 text-xl font-bold">
              Thank You for Contacting Zenin Systems Solutions LLP
            </h3>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                darkTheme ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Your technical enquiry has been registered in our lead management system. Our
              solutions engineering team will review your requirements and respond shortly.
            </p>
            <div
              className={`mt-4 flex flex-wrap items-center gap-4 rounded-xl border p-3.5 text-xs ${
                darkTheme
                  ? "border-white/10 bg-white/5 text-slate-200"
                  : "border-emerald-200 bg-white text-slate-700"
              }`}
            >
              <div>
                <span className="font-medium opacity-75">Reference ID:</span>{" "}
                <span className="font-mono font-bold text-[#1877F2]">{submittedRef}</span>
              </div>
              {resolvedTopicLabel && (
                <div>
                  <span className="font-medium opacity-75">Interested Solution:</span>{" "}
                  <span className="font-semibold">{resolvedTopicLabel}</span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSubmittedRef(null)}
              className="touch-btn mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#125EC4]"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const labelClass = `block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
    darkTheme ? "text-slate-300" : "text-[#172033]"
  }`;

  const inputClass = `w-full min-h-[48px] rounded-xl border px-3.5 py-2.5 text-base sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-[#00B8D9] ${
    darkTheme
      ? "border-white/15 bg-[#142B49]/80 text-white placeholder:text-slate-400"
      : "border-[#E2E8F0] bg-white text-[#172033] placeholder:text-slate-400"
  }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Anti-spam honeypot field */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("honeypot")}
      />
      <input type="hidden" {...register("productId")} />
      <input type="hidden" {...register("productSlug")} />
      <input type="hidden" {...register("aiSolutionId")} />
      <input type="hidden" {...register("aiSolutionSlug")} />
      <input type="hidden" {...register("serviceId")} />
      <input type="hidden" {...register("serviceSlug")} />
      <input type="hidden" {...register("sourcePage")} />

      {isContextLocked && preselectedTopicName && (
        <div
          className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
            darkTheme
              ? "border-[#00B8D9]/40 bg-[#00B8D9]/10 text-white"
              : "border-[#1877F2]/25 bg-[#F5F8FC] text-[#0B1730]"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 shrink-0 text-[#00B8D9]" />
            <div className="text-xs sm:text-sm">
              <span className="font-medium opacity-75">Interested Solution: </span>
              <span className="font-bold text-[#1877F2] dark:text-[#00B8D9]">
                {preselectedTopicName}
              </span>
            </div>
          </div>
          <span className="rounded bg-[#00B8D9]/20 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#00B8D9] uppercase">
            Auto-Linked
          </span>
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-700"
        >
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-fullName" className={labelClass}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="enq-fullName"
            type="text"
            placeholder="e.g. Rajesh Sharma"
            className={inputClass}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="enq-companyName" className={labelClass}>
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            id="enq-companyName"
            type="text"
            placeholder="e.g. Apex Industrial Manufacturing Ltd."
            className={inputClass}
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="mt-1 text-xs text-red-500">{errors.companyName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-email" className={labelClass}>
            Business Email <span className="text-red-500">*</span>
          </label>
          <input
            id="enq-email"
            type="email"
            placeholder="name@company.com"
            className={inputClass}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="enq-phone" className={labelClass}>
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="enq-phone"
            type="tel"
            placeholder="+91 98765 43210"
            className={inputClass}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {!isContextLocked && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="enq-type" className={labelClass}>
              Enquiry Type
            </label>
            <select id="enq-type" className={inputClass} {...register("enquiryType")}>
              <option value="QUOTE_REQUEST" className="text-slate-900">
                Request a Project Quote
              </option>
              <option value="TECHNICAL_CONSULTATION" className="text-slate-900">
                Technical / Site Consultation
              </option>
              <option value="SERVICE_REQUEST" className="text-slate-900">
                Engineering Service & Integration
              </option>
              <option value="GENERAL_INQUIRY" className="text-slate-900">
                General Business Inquiry
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="enq-topic" className={labelClass}>
              Interested Product / Service
            </label>
            <select id="enq-topic" className={inputClass} {...register("interestedTopic")}>
              {preselectedTopicName && (
                <option value={preselectedTopicName} className="text-slate-900">
                  {preselectedTopicName}
                </option>
              )}
              {GENERAL_TOPIC_OPTIONS.map((topic) => (
                <option key={topic} value={topic} className="text-slate-900">
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {!compact && (
        <div>
          <label htmlFor="enq-location" className={labelClass}>
            Project / Facility Location (Optional)
          </label>
          <input
            id="enq-location"
            type="text"
            placeholder="e.g. Pune, Maharashtra / Chakan Industrial Area"
            className={inputClass}
            {...register("projectLocation")}
          />
        </div>
      )}

      <div>
        <label htmlFor="enq-message" className={labelClass}>
          Project Requirement / Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="enq-message"
          rows={compact ? 3 : 4}
          placeholder="Describe your facility type, approximate camera/zone count, or technical requirement..."
          className={inputClass}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <div
          className={`flex items-center gap-2 text-xs ${
            darkTheme ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#00B8D9]" />
          <span>Protected B2B enquiry • Direct engineering desk routing</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="touch-btn inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#125EC4] disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit Quote Request</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
