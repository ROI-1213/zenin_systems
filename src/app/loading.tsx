import React from "react";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
      <div className="mt-4 h-12 w-3/4 animate-pulse rounded-xl bg-slate-200" />
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-64 animate-pulse rounded-2xl border border-[#E2E8F0] bg-[#F5F8FC] p-6"
          />
        ))}
      </div>
    </div>
  );
}
