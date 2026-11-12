import React from "react";
import { cn } from "@/lib/utilities";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wider uppercase",
            light
              ? "border-[#00B8D9]/30 bg-[#00B8D9]/10 text-[#00B8D9]"
              : "border-[#1877F2]/20 bg-[#1877F2]/5 text-[#1877F2]"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00B8D9]" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl",
          light ? "text-white" : "text-[#0B1730]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3.5 text-base leading-relaxed sm:text-lg",
            light ? "text-slate-300" : "text-[#64748B]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
