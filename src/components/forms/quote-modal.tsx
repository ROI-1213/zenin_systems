"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight, FileText, Send } from "lucide-react";
import { EnquiryForm, type EnquiryFormProps } from "./enquiry-form";
import { cn } from "@/lib/utilities";

interface QuoteModalTriggerProps extends EnquiryFormProps {
  buttonText?: string;
  variant?: "primary" | "secondary" | "cyan" | "outline" | "bottomNav";
  size?: "sm" | "md" | "lg";
  className?: string;
  hideArrow?: boolean;
}

export function QuoteModalTrigger({
  buttonText = "Request a Quote",
  variant = "primary",
  size = "md",
  className,
  hideArrow = false,
  ...formProps
}: QuoteModalTriggerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const variantClasses = {
    primary:
      "bg-[#1877F2] text-white hover:bg-[#125EC4] shadow-md hover:shadow-lg border border-transparent",
    secondary:
      "bg-[#0B1730] text-white hover:bg-[#142B49] shadow-md border border-white/10",
    cyan: "bg-[#00B8D9] text-[#0B1730] font-bold hover:bg-[#0095B0] hover:text-white shadow-md hover:shadow-lg",
    outline:
      "border border-[#E2E8F0] bg-white text-[#0B1730] hover:border-[#1877F2] hover:text-[#1877F2] shadow-xs",
    bottomNav:
      "flex-col gap-1 bg-gradient-to-b from-[#1877F2] to-[#0095B0] text-white shadow-md rounded-2xl px-2 py-1.5 min-h-[48px] w-full",
  }[variant];

  const sizeClasses =
    variant === "bottomNav"
      ? "text-[11px] font-bold"
      : {
          sm: "min-h-[48px] px-4 py-2.5 text-xs sm:text-sm",
          md: "min-h-[48px] px-5 py-3 text-sm",
          lg: "min-h-[52px] px-6 py-3.5 text-sm sm:text-base",
        }[size];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "touch-btn inline-flex items-center justify-center gap-2 rounded-xl font-semibold select-none",
          variantClasses,
          sizeClasses,
          className
        )}
      >
        {variant === "bottomNav" ? (
          <>
            <Send className="h-5 w-5 shrink-0" />
            <span className="leading-none tracking-tight">{buttonText}</span>
          </>
        ) : (
          <>
            <span>{buttonText}</span>
            {!hideArrow && <ArrowRight className="h-4 w-4 shrink-0" />}
          </>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-60 flex items-end justify-center bg-[#081424]/80 p-0 backdrop-blur-xs transition-opacity sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl sm:rounded-2xl sm:border sm:p-8">
            {/* Mobile bottom-sheet drag indicator */}
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-200 sm:hidden" />

            <div className="mb-5 flex items-start justify-between gap-3 border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B1730] text-[#00B8D9] shadow-xs">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-semibold tracking-wider text-[#1877F2] uppercase">
                    Zenin Systems Engineering Desk
                  </span>
                  <h2
                    id="quote-modal-title"
                    className="truncate text-base font-bold text-[#0B1730] sm:text-xl"
                  >
                    {formProps.preselectedTopicName
                      ? `Quote — ${formProps.preselectedTopicName}`
                      : "Request a Project Consultation & Quote"}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close quote modal"
                className="touch-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <EnquiryForm {...formProps} compact />
          </div>
        </div>
      )}
    </>
  );
}
