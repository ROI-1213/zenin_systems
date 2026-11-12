import Link from "next/link";
import { ArrowLeft, Cpu, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B1730] px-4 text-center text-white">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00B8D9]/30 bg-[#142B49] text-[#00B8D9]">
        <Cpu className="h-8 w-8" />
      </div>
      <span className="rounded-full border border-[#00B8D9]/30 bg-[#00B8D9]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#00B8D9] uppercase">
        Error 404 — Page Not Found
      </span>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
        Requested Resource Not Found
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
        The page, product, or solution route you requested could not be located or may
        have been moved in the Zenin Systems catalog.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#125EC4]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <Search className="h-4 w-4" />
          <span>Browse Solutions Catalog</span>
        </Link>
      </div>
    </div>
  );
}
