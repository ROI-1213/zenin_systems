"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F5F8FC] px-4 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h2 className="text-2xl font-bold text-[#0B1730]">
        Unable to Complete Request
      </h2>
      <p className="mt-2 max-w-md text-sm text-[#64748B]">
        An unexpected system condition occurred while rendering this section. Please
        retry or return to the main catalog.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#125EC4]"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="rounded-lg border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1730] hover:bg-slate-50"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
