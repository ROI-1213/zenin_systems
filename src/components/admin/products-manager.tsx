"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit3, Trash2, X, Loader2, ExternalLink } from "lucide-react";
import type { ParsedProduct } from "@/lib/db/queries";
import {
  deleteOrArchiveProductAction,
  saveProductAction,
} from "@/lib/actions/admin-actions";
import { slugify } from "@/lib/utilities";

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

interface ProductsManagerProps {
  initialProducts: ParsedProduct[];
  categories: CategoryOption[];
}

export function ProductsManager({
  initialProducts,
  categories,
}: ProductsManagerProps) {
  const router = useRouter();
  const [editing, setEditing] = useState<ParsedProduct | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    id: "",
    name: "",
    slug: "",
    categoryId: categories[0]?.id || "",
    shortDescription: "",
    description: "",
    featuresText: "",
    applicationsText: "",
    integrationText: "",
    featuredImage: "",
    status: "PUBLISHED" as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    isFeatured: false,
    requiresReview: false,
    sortOrder: 0,
    seoTitle: "",
    seoDescription: "",
  });

  const openCreate = () => {
    setIsNew(true);
    setEditing(null);
    setError(null);
    setFormState({
      id: "",
      name: "",
      slug: "",
      categoryId: categories[0]?.id || "",
      shortDescription: "",
      description: "",
      featuresText: "",
      applicationsText: "",
      integrationText: "",
      featuredImage: "/images/pillars/cctv-surveillance.png",
      status: "PUBLISHED",
      isFeatured: false,
      requiresReview: false,
      sortOrder: initialProducts.length + 1,
      seoTitle: "",
      seoDescription: "",
    });
  };

  const openEdit = (p: ParsedProduct) => {
    setIsNew(false);
    setEditing(p);
    setError(null);
    setFormState({
      id: p.id,
      name: p.name,
      slug: p.slug,
      categoryId: p.categoryId,
      shortDescription: p.shortDescription,
      description: p.description,
      featuresText: p.features.join("\n"),
      applicationsText: p.applications.join("\n"),
      integrationText: p.integrationCapabilities.join("\n"),
      featuredImage: p.featuredImage || "",
      status: p.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      isFeatured: p.isFeatured,
      requiresReview: p.requiresReview,
      sortOrder: p.sortOrder,
      seoTitle: p.seoTitle || "",
      seoDescription: p.seoDescription || "",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await saveProductAction({
      id: formState.id || undefined,
      name: formState.name,
      slug: formState.slug || slugify(formState.name),
      categoryId: formState.categoryId,
      shortDescription: formState.shortDescription,
      description: formState.description,
      features: formState.featuresText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      applications: formState.applicationsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      integrationCapabilities: formState.integrationText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      technicalSpecifications: editing?.technicalSpecifications || [],
      featuredImage: formState.featuredImage,
      status: formState.status,
      isFeatured: formState.isFeatured,
      requiresReview: formState.requiresReview,
      sortOrder: Number(formState.sortOrder) || 0,
      seoTitle: formState.seoTitle,
      seoDescription: formState.seoDescription,
    });

    setSaving(false);
    if (!res.success) {
      setError(res.error || "Unable to save product.");
      return;
    }

    setIsNew(false);
    setEditing(null);
    router.refresh();
  };

  const handleDelete = async (p: ParsedProduct) => {
    if (
      !window.confirm(
        `Are you sure you want to delete or archive "${p.name}"? (Items linked to enquiries will be safely archived)`
      )
    ) {
      return;
    }
    await deleteOrArchiveProductAction(p.id);
    router.refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[#64748B]">
            Showing {initialProducts.length} catalog products
          </span>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#125EC4]"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F5F8FC] text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                <th className="px-4 py-3.5">Product Name & Slug</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Featured</th>
                <th className="px-4 py-3.5">Order</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {initialProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#F5F8FC]/60">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-[#0B1730]">{p.name}</div>
                    <div className="font-mono text-[11px] text-[#64748B]">
                      /products/item/{p.slug}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-[#172033]">
                    {p.categoryName}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        p.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-700"
                          : p.status === "DRAFT"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {p.isFeatured ? (
                      <span className="rounded bg-[#1877F2]/10 px-2 py-0.5 text-[10px] font-bold text-[#1877F2]">
                        Featured
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-mono">{p.sortOrder}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <a
                        href={`/products/item/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-[#E2E8F0] p-1.5 text-slate-500 hover:text-[#1877F2]"
                        title="Preview public page"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => openEdit(p)}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0B1730] hover:border-[#1877F2]"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p)}
                        className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-red-600 hover:bg-red-100"
                        title="Delete or Archive"
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

      {/* CREATE / EDIT MODAL */}
      {(isNew || editing) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#081424]/75 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-5 flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <h2 className="text-lg font-bold text-[#0B1730]">
                {isNew ? "Create New B2B Product" : `Edit Product — ${editing?.name}`}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsNew(false);
                  setEditing(null);
                }}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold text-[#0B1730] uppercase">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        name: e.target.value,
                        slug: isNew ? slugify(e.target.value) : s.slug,
                      }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold text-[#0B1730] uppercase">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.slug}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, slug: slugify(e.target.value) }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 font-mono text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block font-bold text-[#0B1730] uppercase">
                    Category *
                  </label>
                  <select
                    value={formState.categoryId}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, categoryId: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-bold text-[#0B1730] uppercase">
                    Status
                  </label>
                  <select
                    value={formState.status}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        status: e.target.value as "DRAFT" | "PUBLISHED" | "ARCHIVED",
                      }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-bold text-[#0B1730] uppercase">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formState.sortOrder}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        sortOrder: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-bold text-[#0B1730] uppercase">
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
                <label className="mb-1 block font-bold text-[#0B1730] uppercase">
                  Full Technical Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, description: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold text-[#0B1730] uppercase">
                    Key Features (One per line)
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
                  <label className="mb-1 block font-bold text-[#0B1730] uppercase">
                    Industrial Applications (One per line)
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

              <div>
                <label className="mb-1 block font-bold text-[#0B1730] uppercase">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={formState.featuredImage}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, featuredImage: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="inline-flex items-center gap-2 font-semibold text-[#0B1730]">
                  <input
                    type="checkbox"
                    checked={formState.isFeatured}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, isFeatured: e.target.checked }))
                    }
                  />
                  <span>Mark as Featured Product</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 border-t border-[#E2E8F0] pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsNew(false);
                    setEditing(null);
                  }}
                  className="rounded-xl border border-[#E2E8F0] px-4 py-2 text-xs font-semibold text-[#64748B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#125EC4]"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
