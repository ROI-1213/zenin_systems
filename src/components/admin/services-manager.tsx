"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit3, Trash2, ExternalLink, X, Loader2 } from "lucide-react";
import type { ParsedService } from "@/lib/db/queries";
import {
  deleteOrArchiveServiceAction,
  saveServiceAction,
} from "@/lib/actions/admin-actions";
import { slugify } from "@/lib/utilities";

export function ServicesManager({ services }: { services: ParsedService[] }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    id: "",
    name: "",
    slug: "",
    shortDescription: "",
    longDescription: "",
    icon: "Wrench",
    coverImage: "",
    featuresText: "",
    capabilitiesText: "",
    applicationsText: "",
    industriesText: "",
    isFeatured: false,
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    sortOrder: 0,
  });

  const openCreate = () => {
    setError(null);
    setFormState({
      id: "",
      name: "",
      slug: "",
      shortDescription: "",
      longDescription: "",
      icon: "Wrench",
      coverImage: "/images/services/fire-detection-alarm-systems.png",
      featuresText: "",
      capabilitiesText:
        "System Integration\nInstallation\nCommissioning\nMaintenance\nTechnical Support",
      applicationsText: "",
      industriesText: "Manufacturing\nIndustrial Plants\nCommercial Buildings",
      isFeatured: false,
      status: "PUBLISHED",
      sortOrder: services.length + 1,
    });
    setModalOpen(true);
  };

  const openEdit = (svc: ParsedService) => {
    setError(null);
    setFormState({
      id: svc.id,
      name: svc.name,
      slug: svc.slug,
      shortDescription: svc.shortDescription,
      longDescription: svc.longDescription,
      icon: svc.icon,
      coverImage: svc.coverImage || "",
      featuresText: svc.features.join("\n"),
      capabilitiesText: svc.capabilities.join("\n"),
      applicationsText: svc.applications.join("\n"),
      industriesText: svc.industries.join("\n"),
      isFeatured: svc.isFeatured,
      status: svc.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      sortOrder: svc.sortOrder,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await saveServiceAction({
      id: formState.id || undefined,
      name: formState.name,
      slug: formState.slug || slugify(formState.name),
      shortDescription: formState.shortDescription,
      longDescription: formState.longDescription,
      icon: formState.icon,
      coverImage: formState.coverImage,
      features: formState.featuresText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      capabilities: formState.capabilitiesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      applications: formState.applicationsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      industries: formState.industriesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      relatedServiceSlugs: [],
      isFeatured: formState.isFeatured,
      status: formState.status,
      sortOrder: Number(formState.sortOrder) || 0,
    });

    setSaving(false);
    if (!res.success) {
      setError(res.error || "Unable to save service.");
      return;
    }

    setModalOpen(false);
    router.refresh();
  };

  const handleDelete = async (svc: ParsedService) => {
    if (!window.confirm(`Delete or archive service "${svc.name}"?`)) return;
    await deleteOrArchiveServiceAction(svc.id);
    router.refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#64748B]">
          Managing {services.length} engineering service verticals
        </span>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#125EC4]"
        >
          <Plus className="h-4 w-4" />
          <span>Add Service Vertical</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F5F8FC] text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                <th className="px-4 py-3.5">Service Name & Route</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Homepage Featured</th>
                <th className="px-4 py-3.5">Order</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-[#F5F8FC]/60">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-[#0B1730]">{svc.name}</div>
                    <div className="font-mono text-[11px] text-[#64748B]">
                      /services/{svc.slug}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        svc.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {svc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {svc.isFeatured ? (
                      <span className="rounded bg-[#1877F2]/10 px-2 py-0.5 text-[10px] font-bold text-[#1877F2]">
                        Featured (Homepage)
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-mono">{svc.sortOrder}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <a
                        href={`/services/${svc.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-[#E2E8F0] p-1.5 text-slate-500 hover:text-[#1877F2]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => openEdit(svc)}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0B1730] hover:border-[#1877F2]"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(svc)}
                        className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
                  ? `Edit Service — ${formState.name}`
                  : "Create Engineering Service"}
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
                    Service Name *
                  </label>
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
                <label className="mb-1 block font-bold uppercase">
                  Long Engineering Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.longDescription}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, longDescription: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Key Features (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formState.featuresText}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, featuresText: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Applications (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formState.applicationsText}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, applicationsText: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 font-semibold">
                  <input
                    type="checkbox"
                    checked={formState.isFeatured}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, isFeatured: e.target.checked }))
                    }
                  />
                  <span>Feature on Homepage Services Grid</span>
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
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
