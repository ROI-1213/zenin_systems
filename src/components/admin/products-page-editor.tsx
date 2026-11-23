"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Eye,
  EyeOff,
  Layers,
  Loader2,
  MonitorPlay,
  Package,
  PackageCheck,
  Save,
  Sparkles,
  Star,
} from "lucide-react";
import { savePageContentAction } from "@/lib/actions/admin-actions";
import { FullPageSectionLayout } from "@/components/admin/full-page-section-layout";
import type { ProductsPageDefaults } from "@/lib/products-page-defaults";

export type ProductsSectionKey = keyof ProductsPageDefaults;

export interface ProductsSectionEntry {
  sectionKey: ProductsSectionKey;
  title: string;
  subtitle: string;
  data: Record<string, unknown>;
}

interface SectionMeta {
  key: ProductsSectionKey;
  number: string;
  label: string;
  shortDesc: string;
  previewHref: string;
  icon: React.ComponentType<{ className?: string }>;
  manageLink?: { label: string; href: string };
}

const SECTION_META: SectionMeta[] = [
  {
    key: "banner",
    number: "01",
    label: "Catalog Hero Banner",
    shortDesc: "Top curved hero badge, H1 & overview on /products",
    previewHref: "/products",
    icon: Star,
  },
  {
    key: "core_groups",
    number: "02",
    label: "Four Core Solution Groups",
    shortDesc: "Section heading, Explore & Enquire button labels",
    previewHref: "/products",
    icon: Layers,
    manageLink: { label: "Edit 4 Core Categories", href: "/admin/categories" },
  },
  {
    key: "featured_systems",
    number: "03",
    label: "Featured Systems Explorer",
    shortDesc: "Searchable configured systems section heading",
    previewHref: "/products",
    icon: Package,
    manageLink: { label: "Add / Edit Products", href: "/admin/products" },
  },
  {
    key: "wider_portfolio",
    number: "04",
    label: "Wider Product Portfolio",
    shortDesc: "16 wider categories heading & BOQ quote button",
    previewHref: "/products",
    icon: PackageCheck,
    manageLink: { label: "Add / Edit Wider Categories", href: "/admin/categories" },
  },
  {
    key: "cctv_hub",
    number: "05",
    label: "CCTV Surveillance Hub",
    shortDesc: "Banner copy & CTA on /products/cctv-surveillance",
    previewHref: "/products/cctv-surveillance",
    icon: Camera,
    manageLink: { label: "Edit CCTV Products", href: "/admin/products" },
  },
  {
    key: "ai_hub",
    number: "06",
    label: "AI Video Analytics Hub",
    shortDesc: "Banner copy & CTA on /products/ai-video-analytics",
    previewHref: "/products/ai-video-analytics",
    icon: Sparkles,
    manageLink: { label: "Edit 21 AI Solutions", href: "/admin/ai-solutions" },
  },
  {
    key: "vms_hub",
    number: "07",
    label: "Video Management Hub",
    shortDesc: "Banner copy & CTA on /products/video-management",
    previewHref: "/products/video-management",
    icon: MonitorPlay,
    manageLink: { label: "Edit VMS Products", href: "/admin/products" },
  },
  {
    key: "automation_hub",
    number: "08",
    label: "Intelligent Automation Hub",
    shortDesc: "Banner copy & CTA on /products/intelligent-automation",
    previewHref: "/products/intelligent-automation",
    icon: Cpu,
    manageLink: { label: "Edit Automation Products", href: "/admin/products" },
  },
];

export function ProductsPageEditor({
  initialSections,
}: {
  initialSections: Record<ProductsSectionKey, ProductsSectionEntry>;
}) {
  const router = useRouter();
  const [sections, setSections] = useState<
    Record<ProductsSectionKey, ProductsSectionEntry>
  >(initialSections);
  const [activeKey, setActiveKey] = useState<ProductsSectionKey>("banner");
  const [isFullPage, setIsFullPage] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeMeta =
    SECTION_META.find((m) => m.key === activeKey) || SECTION_META[0];
  const activeSection = sections[activeKey];
  const isEnabled = activeSection.data.enabled !== false;

  const updateActive = (patch: Partial<ProductsSectionEntry>) => {
    setSections((prev) => ({
      ...prev,
      [activeKey]: { ...prev[activeKey], ...patch },
    }));
    setSavedKey(null);
    setErrorMsg(null);
  };

  const updateData = (field: string, value: unknown) => {
    setSections((prev) => ({
      ...prev,
      [activeKey]: {
        ...prev[activeKey],
        data: {
          ...prev[activeKey].data,
          [field]: value,
        },
      },
    }));
    setSavedKey(null);
    setErrorMsg(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    setSavedKey(null);
    try {
      await savePageContentAction({
        pageKey: "products",
        sectionKey: activeKey,
        title: activeSection.title,
        subtitle: activeSection.subtitle,
        contentObj: activeSection.data,
      });
      setSavedKey(activeKey);
      router.refresh();
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to save section changes."
      );
    } finally {
      setSaving(false);
    }
  };

  const renderTextField = (
    label: string,
    field: string,
    opts?: { multiline?: boolean; rows?: number; placeholder?: string }
  ) => {
    const val = String(activeSection.data[field] ?? "");
    return (
      <div>
        <label className="mb-1.5 block text-xs font-bold tracking-wider text-[#0B1730] uppercase">
          {label}
        </label>
        {opts?.multiline ? (
          <textarea
            rows={opts.rows || 3}
            value={val}
            placeholder={opts.placeholder}
            onChange={(e) => updateData(field, e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#172033] focus:border-[#1877F2] focus:bg-white focus:outline-none"
          />
        ) : (
          <input
            type="text"
            value={val}
            placeholder={opts?.placeholder}
            onChange={(e) => updateData(field, e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#0B1730] focus:border-[#1877F2] focus:bg-white focus:outline-none"
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* TOP QUICK BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-2xs">
        <div>
          <h2 className="text-sm font-bold text-[#0B1730]">
            Select any Products & Solutions section or Core Hub below to edit its headings, buttons & visibility
          </h2>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Changes publish immediately to `/products` and all 4 Core Solution hub pages.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2 text-xs font-bold text-[#0B1730] hover:border-[#1877F2] hover:text-[#1877F2]"
          >
            <Package className="h-3.5 w-3.5" />
            <span>Products CRUD</span>
          </Link>
          <Link
            href="/admin/categories"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2 text-xs font-bold text-[#0B1730] hover:border-[#1877F2] hover:text-[#1877F2]"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Categories CRUD</span>
          </Link>
          <Link
            href="/admin/ai-solutions"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2 text-xs font-bold text-[#0B1730] hover:border-[#1877F2] hover:text-[#1877F2]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>21 AI Solutions</span>
          </Link>
          <Link
            href={activeMeta.previewHref}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-[#1877F2]/30 bg-[#1877F2]/10 px-4 py-2 text-xs font-bold text-[#1877F2] transition hover:bg-[#1877F2] hover:text-white"
          >
            <span>Preview Live Page</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <FullPageSectionLayout
        sectionTitle="Products & Solutions Sections"
        metas={SECTION_META}
        activeKey={activeKey}
        isFullPage={isFullPage}
        isEnabledMap={SECTION_META.reduce((acc, m) => {
          acc[m.key] = sections[m.key]?.data?.enabled !== false;
          return acc;
        }, {} as Record<ProductsSectionKey, boolean>)}
        onSelectSection={(key) => {
          setActiveKey(key);
          setIsFullPage(true);
          setSavedKey(null);
          setErrorMsg(null);
        }}
        onBackToGrid={() => setIsFullPage(false)}
      >
        <div className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-[11px] font-extrabold tracking-wider text-[#1877F2] uppercase">
                  Section {activeMeta.number} • products.{activeMeta.key}
                </span>
                <h3 className="mt-0.5 text-xl font-bold text-[#0B1730]">
                  {activeMeta.label}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => updateData("enabled", !isEnabled)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                    isEnabled
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {isEnabled ? (
                    <>
                      <Eye className="h-3.5 w-3.5" />
                      <span>Visible on Page</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      <span>Hidden on Page</span>
                    </>
                  )}
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#125EC4] disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>Save & Publish</span>
                </button>
              </div>
            </div>

            {savedKey === activeKey && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>
                  {activeMeta.label} saved and published to the live website!
                </span>
              </div>
            )}

            {errorMsg && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
                {errorMsg}
              </div>
            )}

            {activeMeta.manageLink && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1877F2]/20 bg-[#F5F8FC] px-4 py-3">
                <span className="text-xs font-medium text-[#172033]">
                  Want to add, edit, or delete individual cards inside this section?
                </span>
                <Link
                  href={activeMeta.manageLink.href}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B1730] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#1877F2]"
                >
                  <span>{activeMeta.manageLink.label}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-[#0B1730] uppercase">
                  Eyebrow / Badge Subtitle
                </label>
                <input
                  type="text"
                  value={activeSection.subtitle}
                  onChange={(e) => updateActive({ subtitle: e.target.value })}
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#0B1730] focus:border-[#1877F2] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold tracking-wider text-[#0B1730] uppercase">
                  Main Section Title
                </label>
                <input
                  type="text"
                  value={activeSection.title}
                  onChange={(e) => updateActive({ title: e.target.value })}
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm font-semibold text-[#0B1730] focus:border-[#1877F2] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-5 border-t border-[#E2E8F0] pt-5">
              {renderTextField("Section / Banner Description", "description", {
                multiline: true,
                rows: 4,
              })}

              {activeKey === "core_groups" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {renderTextField("Explore Button Text", "exploreButtonText")}
                  {renderTextField("Enquire Button Text", "enquireButtonText")}
                </div>
              )}

              {activeKey === "wider_portfolio" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {renderTextField("Default Supply Label", "defaultLabel")}
                  {renderTextField("Quote Button Text", "quoteButtonText")}
                </div>
              )}

              {(activeKey === "cctv_hub" ||
                activeKey === "ai_hub" ||
                activeKey === "vms_hub" ||
                activeKey === "automation_hub") && (
                <div>
                  {renderTextField("Primary Banner CTA Button Text", "primaryCtaText")}
                </div>
              )}
            </div>
          </form>
        </div>
      </FullPageSectionLayout>
    </div>
  );
}
