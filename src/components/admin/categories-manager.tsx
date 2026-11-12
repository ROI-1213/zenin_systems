"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit3, X, Loader2 } from "lucide-react";
import { saveProductCategoryAction } from "@/lib/actions/admin-actions";
import { slugify } from "@/lib/utilities";

export interface AdminCategoryRecord {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  coverImage: string | null;
  isCoreSolution: boolean;
  dedicatedRoute: string | null;
  status: string;
  isFeatured: boolean;
  sortOrder: number;
  productCount: number;
}

export function CategoriesManager({
  categories,
}: {
  categories: AdminCategoryRecord[];
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    id: "",
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    icon: "Shield",
    coverImage: "",
    isCoreSolution: false,
    dedicatedRoute: "",
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    isFeatured: false,
    sortOrder: 0,
  });

  const openCreate = () => {
    setError(null);
    setFormState({
      id: "",
      name: "",
      slug: "",
      shortDescription: "",
      description: "",
      icon: "Shield",
      coverImage: "",
      isCoreSolution: false,
      dedicatedRoute: "",
      status: "PUBLISHED",
      isFeatured: false,
      sortOrder: categories.length + 1,
    });
    setModalOpen(true);
  };

  const openEdit = (cat: AdminCategoryRecord) => {
    setError(null);
    setFormState({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      shortDescription: cat.shortDescription,
      description: cat.description,
      icon: cat.icon,
      coverImage: cat.coverImage || "",
      isCoreSolution: cat.isCoreSolution,
      dedicatedRoute: cat.dedicatedRoute || "",
      status: cat.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      isFeatured: cat.isFeatured,
      sortOrder: cat.sortOrder,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await saveProductCategoryAction({
      ...formState,
      id: formState.id || undefined,
      slug: formState.slug || slugify(formState.name),
    });

    setSaving(false);
    if (!res.success) {
      setError(res.error || "Failed to save category.");
      return;
    }

    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#64748B]">
          {categories.filter((c) => c.isCoreSolution).length} Core Solution Groups •{" "}
          {categories.filter((c) => !c.isCoreSolution).length} Wider Portfolio
          Categories
        </span>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#125EC4]"
        >
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F5F8FC] text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                <th className="px-4 py-3.5">Category Name</th>
                <th className="px-4 py-3.5">Tier</th>
                <th className="px-4 py-3.5">Products</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Order</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-[#F5F8FC]/60">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-[#0B1730]">{cat.name}</div>
                    <div className="font-mono text-[11px] text-[#64748B]">
                      {cat.dedicatedRoute || `/products#${cat.slug}`}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    {cat.isCoreSolution ? (
                      <span className="rounded bg-[#0B1730] px-2.5 py-0.5 text-[10px] font-bold text-[#00B8D9] uppercase">
                        Core Pillar
                      </span>
                    ) : (
                      <span className="rounded bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        Wider Portfolio
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-semibold">{cat.productCount}</td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 uppercase">
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono">{cat.sortOrder}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => openEdit(cat)}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0B1730] hover:border-[#1877F2]"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>
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
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-4 flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h2 className="text-lg font-bold text-[#0B1730]">
                {formState.id ? "Edit Product Category" : "New Product Category"}
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
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2.5 text-sm"
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
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2.5 font-mono text-sm"
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
                  Full Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, description: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-sm"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 font-semibold">
                  <input
                    type="checkbox"
                    checked={formState.isCoreSolution}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        isCoreSolution: e.target.checked,
                      }))
                    }
                  />
                  <span>Core Solution Group</span>
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
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
