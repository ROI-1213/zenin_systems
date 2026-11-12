"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ShieldAlert } from "lucide-react";
import { loginAdminAction } from "@/lib/actions/admin-actions";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await loginAdminAction({ email, password });
      if (!result.success) {
        setError(result.error || "Authentication failed.");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Unable to complete login request.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-700"
        >
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="admin-email"
          className="mb-1.5 block text-xs font-bold tracking-wider text-[#0B1730] uppercase"
        >
          Administrator Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@company.com"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] py-3 pr-4 pl-10 text-sm text-[#0B1730] focus:border-[#1877F2] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="mb-1.5 block text-xs font-bold tracking-wider text-[#0B1730] uppercase"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] py-3 pr-4 pl-10 text-sm text-[#0B1730] focus:border-[#1877F2] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1730] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1877F2] disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Verifying Credentials...</span>
          </>
        ) : (
          <span>Sign In to Admin CMS</span>
        )}
      </button>
    </form>
  );
}
