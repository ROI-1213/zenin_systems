import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login — Zenin Systems CMS",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const existingSession = await getAdminSession();
  if (existingSession) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#0B1730] bg-industrial-grid px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="group inline-flex flex-col items-center gap-2">
            <Image
              src="/images/logo-white.png"
              alt="Zenin Systems Solutions LLP"
              width={280}
              height={180}
              priority
              className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="mt-1 text-center">
              <div className="text-xs font-bold tracking-[0.22em] text-[#00B8D9] uppercase">
                Enterprise Admin CMS
              </div>
            </div>
          </Link>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white p-8 shadow-2xl">
          <div className="mb-6 border-b border-[#E2E8F0] pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1877F2] uppercase">
              <ShieldCheck className="h-4 w-4" />
              <span>Authorized Access Only</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-[#0B1730]">
              Administrator Sign In
            </h1>
            <p className="mt-1 text-xs text-[#64748B]">
              Sign in with your administrator email and password to manage catalog
              records, AI solutions, services, and enquiries.
            </p>
          </div>

          <AdminLoginForm />
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-[#00B8D9]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
