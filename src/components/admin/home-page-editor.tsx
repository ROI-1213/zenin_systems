"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  Building2,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  Factory,
  FolderKanban,
  Layers,
  Loader2,
  MessageSquareQuote,
  Plus,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  Wrench,
} from "lucide-react";
import { savePageContentAction } from "@/lib/actions/admin-actions";
import type { HomeSectionDefaults, HomeWhyChoosePillar } from "@/lib/home-defaults";

export type HomeSectionKey = keyof HomeSectionDefaults;

export interface HomeSectionEntry {
  sectionKey: HomeSectionKey;
  title: string;
  subtitle: string;
  data: Record<string, unknown>;
}

interface SectionMeta {
  key: HomeSectionKey;
  number: string;
  label: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  manageLink?: { label: string; href: string };
}

const SECTION_META: SectionMeta[] = [
  {
    key: "hero",
    number: "01",
    label: "Hero Banner",
    shortDesc: "Headline, buttons, hero photo & 4 highlights",
    icon: Star,
  },
  {
    key: "about_preview",
    number: "02",
    label: "About Zenin Systems",
    shortDesc: "Overview text, photo, caption & 4 capabilities",
    icon: Building2,
  },
  {
    key: "core_solutions",
    number: "03",
    label: "Core Products & Solutions",
    shortDesc: "Section heading & catalog button",
    icon: Layers,
    manageLink: { label: "Edit 4 Core Solution Cards", href: "/admin/categories" },
  },
  {
    key: "ai_highlights",
    number: "04",
    label: "AI Video Analytics",
    shortDesc: "Dark AI showcase heading & CTA",
    icon: Sparkles,
    manageLink: { label: "Edit Featured AI Solutions", href: "/admin/ai-solutions" },
  },
  {
    key: "services_preview",
    number: "05",
    label: "Services Preview",
    shortDesc: "Services heading, description & button",
    icon: Wrench,
    manageLink: { label: "Edit 13 Services & Featured Items", href: "/admin/services" },
  },
  {
    key: "why_choose_us",
    number: "06",
    label: "Why Choose Us",
    shortDesc: "Heading & 6 value pillar cards",
    icon: ShieldCheck,
  },
  {
    key: "industries_section",
    number: "07",
    label: "Industries We Serve",
    shortDesc: "Sector applications heading",
    icon: Factory,
    manageLink: { label: "Edit 6 Industrial Verticals", href: "/admin/industries" },
  },
  {
    key: "projects_section",
    number: "08",
    label: "Featured Projects",
    shortDesc: "Verified deployments heading",
    icon: FolderKanban,
    manageLink: { label: "Edit Published Projects", href: "/admin/industries" },
  },
  {
    key: "testimonials_section",
    number: "09",
    label: "Client Testimonials",
    shortDesc: "Partner reviews heading & link",
    icon: MessageSquareQuote,
    manageLink: { label: "Edit Testimonials", href: "/admin/testimonials" },
  },
  {
    key: "brands_section",
    number: "10",
    label: "Brands & OEM Partners",
    shortDesc: "Technology ecosystem heading",
    icon: Award,
    manageLink: { label: "Edit Partner Brands", href: "/admin/brands" },
  },
  {
    key: "quote_section",
    number: "11",
    label: "Request a Quote",
    shortDesc: "CTA text, 3 next steps & form title",
    icon: Send,
    manageLink: { label: "View Received Enquiries", href: "/admin/enquiries" },
  },
];

const ICON_OPTIONS = [
  "Layers",
  "Factory",
  "Maximize2",
  "Sliders",
  "Wrench",
  "Headset",
  "ShieldCheck",
  "Cpu",
  "Camera",
  "Sparkles",
  "CheckCircle2",
  "Award",
  "Building2",
  "Flame",
];

export function HomePageEditor({
  initialSections,
}: {
  initialSections: Record<HomeSectionKey, HomeSectionEntry>;
}) {
  const router = useRouter();
  const [sections, setSections] = useState<Record<HomeSectionKey, HomeSectionEntry>>(
    initialSections
  );
  const [activeKey, setActiveKey] = useState<HomeSectionKey>("hero");
  const [saving, setSaving] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeMeta = SECTION_META.find((m) => m.key === activeKey) || SECTION_META[0];
  const activeSection = sections[activeKey];
  const isEnabled = activeSection.data.enabled !== false;

  const updateActive = (patch: Partial<HomeSectionEntry>) => {
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
        pageKey: "home",
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

  const renderStringListEditor = (
    label: string,
    field: string,
    placeholder: string
  ) => {
    const items = Array.isArray(activeSection.data[field])
      ? (activeSection.data[field] as string[])
      : [];

    return (
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold tracking-wider text-[#0B1730] uppercase">
            {label} ({items.length})
          </label>
          <button
            type="button"
            onClick={() => updateData(field, [...items, ""])}
            className="inline-flex items-center gap-1 rounded-lg bg-[#1877F2]/10 px-2.5 py-1 text-xs font-bold text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Item</span>
          </button>
        </div>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F5F8FC] text-[11px] font-bold text-[#64748B]">
                {idx + 1}
              </span>
              <input
                type="text"
                value={item}
                placeholder={placeholder}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = e.target.value;
                  updateData(field, next);
                }}
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2 text-sm text-[#0B1730] focus:border-[#1877F2] focus:bg-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  updateData(
                    field,
                    items.filter((_, i) => i !== idx)
                  )
                }
                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPillarsEditor = () => {
    const pillars = Array.isArray(activeSection.data.pillars)
      ? (activeSection.data.pillars as HomeWhyChoosePillar[])
      : [];

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold tracking-wider text-[#0B1730] uppercase">
            Value Pillar Cards ({pillars.length})
          </label>
          <button
            type="button"
            onClick={() =>
              updateData("pillars", [
                ...pillars,
                { title: "New Pillar", description: "", icon: "Layers" },
              ])
            }
            className="inline-flex items-center gap-1 rounded-lg bg-[#1877F2]/10 px-2.5 py-1 text-xs font-bold text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Pillar Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#1877F2] uppercase">
                  Pillar #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateData(
                      "pillars",
                      pillars.filter((_, i) => i !== idx)
                    )
                  }
                  className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label="Remove pillar"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <input
                  type="text"
                  value={pillar.title}
                  placeholder="Pillar Title"
                  onChange={(e) => {
                    const next = [...pillars];
                    next[idx] = { ...next[idx], title: e.target.value };
                    updateData("pillars", next);
                  }}
                  className="sm:col-span-2 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#0B1730]"
                />
                <select
                  value={pillar.icon || "Layers"}
                  onChange={(e) => {
                    const next = [...pillars];
                    next[idx] = { ...next[idx], icon: e.target.value };
                    updateData("pillars", next);
                  }}
                  className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-2 text-xs text-[#0B1730]"
                >
                  {ICON_OPTIONS.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                rows={2}
                value={pillar.description}
                placeholder="Pillar description..."
                onChange={(e) => {
                  const next = [...pillars];
                  next[idx] = { ...next[idx], description: e.target.value };
                  updateData("pillars", next);
                }}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#172033]"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTextField = (
    label: string,
    field: string,
    opts?: { multiline?: boolean; placeholder?: string; isImage?: boolean }
  ) => {
    const val = String(activeSection.data[field] ?? "");
    return (
      <div>
        <label className="mb-1.5 block text-xs font-bold tracking-wider text-[#0B1730] uppercase">
          {label}
        </label>
        {opts?.multiline ? (
          <textarea
            rows={3}
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
        {opts?.isImage && val && (
          <div className="mt-2.5 overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#0B1730] p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={val}
              alt="Section preview"
              className="h-36 w-full rounded-lg object-cover"
            />
          </div>
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
            Select any Home Page section below to edit its content, buttons, images & visibility
          </h2>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Every change publishes immediately to your live Home Page (`/`).
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl border border-[#1877F2]/30 bg-[#1877F2]/10 px-4 py-2 text-xs font-bold text-[#1877F2] transition hover:bg-[#1877F2] hover:text-white"
        >
          <span>Preview Live Home Page</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* SECTION BUTTONS GRID (SPECIFIC BUTTON FOR EACH HOME PAGE SECTION) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-2 lg:col-span-4">
          <div className="mb-2 text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
            Home Page Sections (11)
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {SECTION_META.map((meta) => {
              const Icon = meta.icon;
              const isActive = meta.key === activeKey;
              const enabled = sections[meta.key]?.data?.enabled !== false;
              return (
                <button
                  key={meta.key}
                  type="button"
                  onClick={() => {
                    setActiveKey(meta.key);
                    setSavedKey(null);
                    setErrorMsg(null);
                  }}
                  className={`group flex w-full items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition ${
                    isActive
                      ? "border-[#1877F2] bg-[#1877F2] text-white shadow-md"
                      : "border-[#E2E8F0] bg-white text-[#0B1730] hover:border-[#1877F2] hover:bg-[#F5F8FC]"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#0B1730]/5 text-[#1877F2]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-extrabold uppercase ${
                            isActive ? "text-white/80" : "text-[#1877F2]"
                          }`}
                        >
                          {meta.number}
                        </span>
                        <span className="truncate text-xs font-bold">
                          {meta.label}
                        </span>
                      </div>
                      <div
                        className={`mt-0.5 truncate text-[11px] ${
                          isActive ? "text-white/80" : "text-[#64748B]"
                        }`}
                      >
                        {meta.shortDesc}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      enabled
                        ? isActive
                          ? "bg-white/20 text-white"
                          : "bg-emerald-50 text-emerald-700"
                        : isActive
                        ? "bg-amber-400/30 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {enabled ? "Live" : "Hidden"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE SECTION EDITOR */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs lg:col-span-8">
          <form onSubmit={handleSave} className="space-y-6">
            {/* EDITOR HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-[11px] font-extrabold tracking-wider text-[#1877F2] uppercase">
                  Section {activeMeta.number} • home.{activeMeta.key}
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
                      <span>Visible on Home</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      <span>Hidden on Home</span>
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
                  {activeMeta.label} saved and published to the live Home Page!
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
                  Want to add, edit, or reorder the database cards displayed inside this section?
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

            {/* COMMON HEADING & EYEBROW */}
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

            {/* SECTION-SPECIFIC FIELDS */}
            <div className="space-y-5 border-t border-[#E2E8F0] pt-5">
              {activeKey === "hero" && (
                <>
                  {renderTextField("Hero Description", "description", {
                    multiline: true,
                  })}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {renderTextField("Primary Button Text", "primaryCtaText")}
                    {renderTextField("Primary Button Link", "primaryCtaHref")}
                    {renderTextField("Secondary Button Text", "secondaryCtaText")}
                    {renderTextField("Secondary Button Link", "secondaryCtaHref")}
                  </div>
                  {renderTextField("Hero Banner Video Path / URL (MP4)", "heroVideo", {
                    placeholder: "/videos/hero-banner.mp4",
                  })}
                  {renderTextField("Hero Fallback Poster Image Path / URL", "heroImage", {
                    isImage: true,
                    placeholder: "/images/hero/hero-command-center.png",
                  })}
                  {renderStringListEditor(
                    "Hero Highlight Bullets",
                    "highlights",
                    "e.g. 21 Specialized AI Video Analytics Applications"
                  )}
                </>
              )}

              {activeKey === "about_preview" && (
                <>
                  {renderTextField("Introduction Paragraph", "introduction", {
                    multiline: true,
                  })}
                  {renderTextField("Secondary Paragraph", "secondaryParagraph", {
                    multiline: true,
                  })}
                  {renderTextField("About Image Path / URL", "image", {
                    isImage: true,
                    placeholder: "/images/hero/about-engineering.png",
                  })}
                  {renderTextField("Image Caption Bar Text", "imageCaption")}
                  {renderStringListEditor(
                    "Key Capability Badges",
                    "capabilities",
                    "e.g. Industrial CCTV & Multi-Site Video Management"
                  )}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {renderTextField("Primary Button Text", "ctaText")}
                    {renderTextField("Primary Button Link", "ctaHref")}
                    {renderTextField("Secondary Button Text", "secondaryCtaText")}
                    {renderTextField("Secondary Button Link", "secondaryCtaHref")}
                  </div>
                </>
              )}

              {(activeKey === "core_solutions" ||
                activeKey === "ai_highlights" ||
                activeKey === "services_preview" ||
                activeKey === "testimonials_section") && (
                <>
                  {renderTextField("Section Description", "description", {
                    multiline: true,
                  })}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {renderTextField("Action Button Text", "ctaText")}
                    {renderTextField("Action Button Link", "ctaHref")}
                  </div>
                </>
              )}

              {activeKey === "why_choose_us" && (
                <>
                  {renderTextField("Section Description", "description", {
                    multiline: true,
                  })}
                  {renderPillarsEditor()}
                </>
              )}

              {(activeKey === "industries_section" ||
                activeKey === "projects_section") && (
                <>
                  {renderTextField("Section Description", "description", {
                    multiline: true,
                  })}
                </>
              )}

              {activeKey === "brands_section" && (
                <p className="text-xs text-[#64748B]">
                  Update the Eyebrow and Main Section Title above, or click{" "}
                  <strong>Edit Partner Brands</strong> to add/manage OEM brand listings.
                </p>
              )}

              {activeKey === "quote_section" && (
                <>
                  {renderTextField("Left Column Description", "description", {
                    multiline: true,
                  })}
                  {renderTextField("Next Steps Box Heading", "nextStepsHeading")}
                  {renderStringListEditor(
                    "Next Steps Checklist",
                    "nextSteps",
                    "e.g. Requirement review by our engineering team"
                  )}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {renderTextField("Form Card Title", "formTitle")}
                    {renderTextField("Form Card Subtitle", "formSubtitle")}
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
