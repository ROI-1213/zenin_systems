"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit3, X, Loader2 } from "lucide-react";
import {
  saveIndustryAction,
  saveProjectAction,
} from "@/lib/actions/admin-actions";
import { slugify } from "@/lib/utilities";

interface IndustryRecord {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  applications: string[];
  icon: string;
  status: string;
  sortOrder: number;
}

interface ProjectRecord {
  id: string;
  name: string;
  slug: string;
  industry: string;
  shortDescription: string;
  description: string;
  solutionsImplemented: string[];
  status: string;
  isFeatured: boolean;
  sortOrder: number;
}

export function IndustriesProjectsManager({
  industries,
  projects,
}: {
  industries: IndustryRecord[];
  projects: ProjectRecord[];
}) {
  const router = useRouter();
  const [indModal, setIndModal] = useState(false);
  const [projModal, setProjModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [indForm, setIndForm] = useState({
    id: "",
    name: "",
    slug: "",
    shortDescription: "",
    applicationsText: "",
    icon: "Factory",
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    sortOrder: 0,
  });

  const [projForm, setProjForm] = useState({
    id: "",
    name: "",
    slug: "",
    industry: "Manufacturing",
    shortDescription: "",
    description: "",
    solutionsText: "",
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    isFeatured: true,
    sortOrder: 0,
  });

  const handleSaveIndustry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await saveIndustryAction({
      id: indForm.id || undefined,
      name: indForm.name,
      slug: indForm.slug || slugify(indForm.name),
      shortDescription: indForm.shortDescription,
      applications: indForm.applicationsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      icon: indForm.icon,
      status: indForm.status,
      sortOrder: Number(indForm.sortOrder) || 0,
    });
    setSaving(false);
    setIndModal(false);
    router.refresh();
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await saveProjectAction({
      id: projForm.id || undefined,
      name: projForm.name,
      slug: projForm.slug || slugify(projForm.name),
      industry: projForm.industry,
      shortDescription: projForm.shortDescription,
      description: projForm.description,
      solutionsImplemented: projForm.solutionsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      status: projForm.status,
      isFeatured: projForm.isFeatured,
      sortOrder: Number(projForm.sortOrder) || 0,
    });
    setSaving(false);
    setProjModal(false);
    router.refresh();
  };

  return (
    <div className="space-y-10">
      {/* INDUSTRIES SECTION */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0B1730]">
              Industries We Serve ({industries.length})
            </h2>
            <p className="text-xs text-[#64748B]">
              Displayed on the Homepage and About Us page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIndForm({
                id: "",
                name: "",
                slug: "",
                shortDescription: "",
                applicationsText: "",
                icon: "Factory",
                status: "PUBLISHED",
                sortOrder: industries.length + 1,
              });
              setIndModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2 text-xs font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            <span>Add Industry</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0B1730]">{ind.name}</h3>
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    {ind.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#64748B]">{ind.shortDescription}</p>
              </div>
              <div className="mt-4 border-t border-[#E2E8F0] pt-3 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setIndForm({
                      id: ind.id,
                      name: ind.name,
                      slug: ind.slug,
                      shortDescription: ind.shortDescription,
                      applicationsText: ind.applications.join("\n"),
                      icon: ind.icon,
                      status: ind.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
                      sortOrder: ind.sortOrder,
                    });
                    setIndModal(true);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1877F2]"
                >
                  <Edit3 className="h-3.5 w-3.5" /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED PROJECTS SECTION */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0B1730]">
              Featured Projects ({projects.length})
            </h2>
            <p className="text-xs text-[#64748B]">
              Section 8 on the Homepage automatically hides if zero PUBLISHED
              projects exist.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setProjForm({
                id: "",
                name: "",
                slug: "",
                industry: "Manufacturing",
                shortDescription: "",
                description: "",
                solutionsText: "",
                status: "PUBLISHED",
                isFeatured: true,
                sortOrder: projects.length + 1,
              });
              setProjModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0B1730] px-4 py-2 text-xs font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            <span>Add Verified Project</span>
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white p-8 text-center text-xs text-[#64748B]">
            No customer projects added yet (Homepage Featured Projects section is
            currently hidden as required).
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1877F2]">
                    {p.industry}
                  </span>
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    {p.status}
                  </span>
                </div>
                <h3 className="mt-1 text-base font-bold text-[#0B1730]">
                  {p.name}
                </h3>
                <p className="mt-1 text-xs text-[#64748B]">{p.shortDescription}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INDUSTRY MODAL */}
      {indModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#081424]/75 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-base font-bold text-[#0B1730]">
                {indForm.id ? "Edit Industry" : "Add Industry"}
              </h3>
              <button type="button" onClick={() => setIndModal(false)}>
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveIndustry} className="space-y-4 text-xs">
              <div>
                <label className="mb-1 block font-bold uppercase">Name *</label>
                <input
                  type="text"
                  required
                  value={indForm.name}
                  onChange={(e) =>
                    setIndForm((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block font-bold uppercase">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={indForm.shortDescription}
                  onChange={(e) =>
                    setIndForm((s) => ({ ...s, shortDescription: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block font-bold uppercase">
                  Key Applications (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={indForm.applicationsText}
                  onChange={(e) =>
                    setIndForm((s) => ({ ...s, applicationsText: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-xs"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIndModal(false)}
                  className="rounded-xl border border-[#E2E8F0] px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2 font-bold text-white"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {projModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#081424]/75 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-base font-bold text-[#0B1730]">
                Add Verified Project
              </h3>
              <button type="button" onClick={() => setProjModal(false)}>
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={projForm.name}
                    onChange={(e) =>
                      setProjForm((s) => ({ ...s, name: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Industry *
                  </label>
                  <input
                    type="text"
                    required
                    value={projForm.industry}
                    onChange={(e) =>
                      setProjForm((s) => ({ ...s, industry: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block font-bold uppercase">
                  Short Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={projForm.shortDescription}
                  onChange={(e) =>
                    setProjForm((s) => ({ ...s, shortDescription: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block font-bold uppercase">
                  Full Project Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={projForm.description}
                  onChange={(e) =>
                    setProjForm((s) => ({ ...s, description: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProjModal(false)}
                  className="rounded-xl border border-[#E2E8F0] px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2 font-bold text-white"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
