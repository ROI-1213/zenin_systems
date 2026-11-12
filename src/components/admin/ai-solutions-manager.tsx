"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit3,
  AlertTriangle,
  ExternalLink,
  X,
  Loader2,
} from "lucide-react";
import type { ParsedAISolution } from "@/lib/db/queries";
import { saveAISolutionAction } from "@/lib/actions/admin-actions";
import { slugify } from "@/lib/utilities";

interface AICategoryOption {
  id: string;
  code: string;
  name: string;
  slug: string;
}

interface AISolutionsManagerProps {
  categories: AICategoryOption[];
  solutions: ParsedAISolution[];
}

export function AISolutionsManager({
  categories,
  solutions,
}: AISolutionsManagerProps) {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    id: "",
    name: "",
    slug: "",
    categoryId: categories[0]?.id || "",
    shortDescription: "",
    overview: "",
    problemStatement: "",
    howItWorks: "",
    capabilitiesText: "",
    industriesText: "",
    benefitsText: "",
    integrationInfo: "",
    featuredImage: "",
    requiresReview: false,
    reviewNote: "",
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    isFeatured: false,
    sortOrder: 0,
  });

  const filtered = solutions.filter(
    (s) => selectedCat === "ALL" || s.categoryId === selectedCat
  );

  const openCreate = () => {
    setError(null);
    setFormState({
      id: "",
      name: "",
      slug: "",
      categoryId: categories[0]?.id || "",
      shortDescription: "",
      overview: "",
      problemStatement: "",
      howItWorks: "",
      capabilitiesText: "",
      industriesText: "",
      benefitsText: "",
      integrationInfo: "",
      featuredImage: "/images/pillars/ai-video-analytics.png",
      requiresReview: false,
      reviewNote: "",
      status: "PUBLISHED",
      isFeatured: false,
      sortOrder: solutions.length + 1,
    });
    setModalOpen(true);
  };

  const openEdit = (sol: ParsedAISolution) => {
    setError(null);
    setFormState({
      id: sol.id,
      name: sol.name,
      slug: sol.slug,
      categoryId: sol.categoryId,
      shortDescription: sol.shortDescription,
      overview: sol.overview,
      problemStatement: sol.problemStatement,
      howItWorks: sol.howItWorks,
      capabilitiesText: sol.capabilities.join("\n"),
      industriesText: sol.applicableIndustries.join("\n"),
      benefitsText: sol.benefits.join("\n"),
      integrationInfo: sol.integrationInfo || "",
      featuredImage: sol.featuredImage || "",
      requiresReview: sol.requiresReview,
      reviewNote: sol.reviewNote || "",
      status: sol.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      isFeatured: sol.isFeatured,
      sortOrder: sol.sortOrder,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await saveAISolutionAction({
      id: formState.id || undefined,
      name: formState.name,
      slug: formState.slug || slugify(formState.name),
      categoryId: formState.categoryId,
      shortDescription: formState.shortDescription,
      overview: formState.overview,
      problemStatement: formState.problemStatement,
      howItWorks: formState.howItWorks,
      capabilities: formState.capabilitiesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      applicableIndustries: formState.industriesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      benefits: formState.benefitsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      integrationInfo: formState.integrationInfo,
      featuredImage: formState.featuredImage,
      relatedSolutionSlugs: [],
      requiresReview: formState.requiresReview,
      reviewNote: formState.reviewNote,
      status: formState.status,
      isFeatured: formState.isFeatured,
      sortOrder: Number(formState.sortOrder) || 0,
    });

    setSaving(false);
    if (!res.success) {
      setError(res.error || "Unable to save AI solution.");
      return;
    }

    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      {/* REVIEW ALERT BANNER FOR HDRI WHEEL INSPECTION OR FLAGGED ITEMS */}
      {solutions.some((s) => s.requiresReview) && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <div className="font-bold">
              Administrator Technical Review Flag Active
            </div>
            <p className="mt-0.5 text-amber-800">
              {solutions
                .filter((s) => s.requiresReview)
                .map((s) => s.name)
                .join(", ")}{" "}
              is flagged for administrator review of exact optical/industry
              specifications. Click &ldquo;Edit&rdquo; on the flagged record to update
              and clear the review flag once verified.
            </p>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCat("ALL")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              selectedCat === "ALL"
                ? "bg-[#0B1730] text-white"
                : "border border-[#E2E8F0] bg-white text-[#64748B]"
            }`}
          >
            All Categories ({solutions.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                selectedCat === cat.id
                  ? "bg-[#1877F2] text-white"
                  : "border border-[#E2E8F0] bg-white text-[#0B1730]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#125EC4]"
        >
          <Plus className="h-4 w-4" />
          <span>Add AI Solution</span>
        </button>
      </div>

      {/* AI SOLUTIONS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F5F8FC] text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                <th className="px-4 py-3.5">Solution Name & Slug</th>
                <th className="px-4 py-3.5">AI Category</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Homepage Featured</th>
                <th className="px-4 py-3.5">Review Flag</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map((sol) => (
                <tr key={sol.id} className="hover:bg-[#F5F8FC]/60">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-[#0B1730]">{sol.name}</div>
                    <div className="font-mono text-[11px] text-[#64748B]">
                      /products/ai-video-analytics/{sol.slug}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-[#172033]">
                    {sol.categoryName}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        sol.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {sol.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {sol.isFeatured ? (
                      <span className="rounded bg-[#00B8D9]/20 px-2 py-0.5 text-[10px] font-bold text-[#0095B0]">
                        Featured
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    {sol.requiresReview ? (
                      <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        <AlertTriangle className="h-3 w-3" /> Needs Spec Review
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-semibold">Verified</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <a
                        href={`/products/ai-video-analytics/${sol.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-[#E2E8F0] p-1.5 text-slate-500 hover:text-[#1877F2]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => openEdit(sol)}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0B1730] hover:border-[#1877F2]"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#081424]/75 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-4 flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h2 className="text-lg font-bold text-[#0B1730]">
                {formState.id
                  ? `Edit AI Solution — ${formState.name}`
                  : "Create AI Video Analytics Solution"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block font-bold uppercase">Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        name: e.target.value,
                        slug: s.id ? s.slug : slugify(e.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold uppercase">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formState.slug}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, slug: slugify(e.target.value) }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    AI Category *
                  </label>
                  <select
                    value={formState.categoryId}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, categoryId: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block font-bold uppercase">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formState.shortDescription}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, shortDescription: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block font-bold uppercase">Overview *</label>
                <textarea
                  rows={3}
                  required
                  value={formState.overview}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, overview: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Industrial Problem Statement *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formState.problemStatement}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        problemStatement: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    How It Works (Conceptual) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formState.howItWorks}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, howItWorks: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Capabilities (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formState.capabilitiesText}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        capabilitiesText: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Industries (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formState.industriesText}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, industriesText: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Benefits (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formState.benefitsText}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, benefitsText: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="inline-flex items-center gap-2 font-semibold">
                  <input
                    type="checkbox"
                    checked={formState.isFeatured}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, isFeatured: e.target.checked }))
                    }
                  />
                  <span>Featured on Homepage</span>
                </label>

                <label className="inline-flex items-center gap-2 font-semibold text-amber-800">
                  <input
                    type="checkbox"
                    checked={formState.requiresReview}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        requiresReview: e.target.checked,
                      }))
                    }
                  />
                  <span>Flag for Technical Specification Review</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 border-t border-[#E2E8F0] pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-[#E2E8F0] px-4 py-2 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2.5 text-xs font-bold text-white"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>Save AI Solution</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
