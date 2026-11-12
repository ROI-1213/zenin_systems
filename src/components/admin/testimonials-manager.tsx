"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit3, Trash2, X, Loader2 } from "lucide-react";
import {
  deleteTestimonialAction,
  saveTestimonialAction,
} from "@/lib/actions/admin-actions";

export interface AdminTestimonial {
  id: string;
  clientName: string;
  companyName: string;
  designation: string | null;
  feedback: string;
  isFeatured: boolean;
  status: string;
  sortOrder: number;
}

export function TestimonialsManager({
  testimonials,
}: {
  testimonials: AdminTestimonial[];
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    id: "",
    clientName: "",
    companyName: "",
    designation: "",
    feedback: "",
    isFeatured: true,
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    sortOrder: 0,
  });

  const openCreate = () => {
    setError(null);
    setFormState({
      id: "",
      clientName: "",
      companyName: "",
      designation: "",
      feedback: "",
      isFeatured: true,
      status: "PUBLISHED",
      sortOrder: testimonials.length + 1,
    });
    setModalOpen(true);
  };

  const openEdit = (t: AdminTestimonial) => {
    setError(null);
    setFormState({
      id: t.id,
      clientName: t.clientName,
      companyName: t.companyName,
      designation: t.designation || "",
      feedback: t.feedback,
      isFeatured: t.isFeatured,
      status: t.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      sortOrder: t.sortOrder,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await saveTestimonialAction({
      ...formState,
      id: formState.id || undefined,
    });

    setSaving(false);
    if (!res.success) {
      setError(res.error || "Unable to save testimonial.");
      return;
    }

    setModalOpen(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this testimonial record permanently?")) return;
    await deleteTestimonialAction(id);
    router.refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#64748B]">
          Only PUBLISHED testimonials appear on the public website and homepage.
        </span>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#125EC4]"
        >
          <Plus className="h-4 w-4" />
          <span>Add Verified Testimonial</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs">
        {testimonials.length === 0 ? (
          <div className="p-10 text-center text-xs text-[#64748B]">
            No testimonials added yet. Click &ldquo;Add Verified Testimonial&rdquo; to
            publish an approved client review.
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F5F8FC] text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                <th className="px-4 py-3.5">Client & Company</th>
                <th className="px-4 py-3.5">Feedback Excerpt</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-[#F5F8FC]/60">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-[#0B1730]">{t.clientName}</div>
                    <div className="text-[11px] text-[#64748B]">
                      {t.designation ? `${t.designation}, ` : ""}
                      {t.companyName}
                    </div>
                  </td>
                  <td className="max-w-md truncate px-4 py-3.5 text-[#172033]">
                    {t.feedback}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        t.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(t)}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0B1730]"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(t.id)}
                        className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#081424]/75 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-xl rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h2 className="text-lg font-bold text-[#0B1730]">
                {formState.id ? "Edit Testimonial" : "New Client Testimonial"}
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.clientName}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, clientName: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.companyName}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, companyName: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={formState.designation}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, designation: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Publication Status
                  </label>
                  <select
                    value={formState.status}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        status: e.target.value as "DRAFT" | "PUBLISHED" | "ARCHIVED",
                      }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block font-bold uppercase">
                  Testimonial Feedback *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.feedback}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, feedback: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-sm"
                />
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
                  <span>Save Testimonial</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
