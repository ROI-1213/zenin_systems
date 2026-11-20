"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  Building2,
  CheckCircle2,
  Compass,
  ExternalLink,
  Eye,
  EyeOff,
  Factory,
  Layers,
  Loader2,
  Plus,
  Save,
  Send,
  ShieldCheck,
  Star,
  Trash2,
} from "lucide-react";
import { savePageContentAction } from "@/lib/actions/admin-actions";
import type { AboutCardItem, AboutSectionDefaults } from "@/lib/about-defaults";

export type AboutSectionKey = keyof AboutSectionDefaults;

export interface AboutSectionEntry {
  sectionKey: AboutSectionKey;
  title: string;
  subtitle: string;
  data: Record<string, unknown>;
}

interface SectionMeta {
  key: AboutSectionKey;
  number: string;
  label: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  manageLink?: { label: string; href: string };
}

const SECTION_META: SectionMeta[] = [
  {
    key: "banner",
    number: "01",
    label: "Page Banner",
    shortDesc: "Top curved hero badge, H1 headline & intro",
    icon: Star,
  },
  {
    key: "corporate_overview",
    number: "02",
    label: "Corporate Overview",
    shortDesc: "Company paragraphs & 2 summary highlight boxes",
    icon: Building2,
  },
  {
    key: "mission_vision",
    number: "03",
    label: "Mission & Vision",
    shortDesc: "Dark Mission card & light Vision card",
    icon: Compass,
  },
  {
    key: "capabilities",
    number: "04",
    label: "Expertise & Capabilities",
    shortDesc: "Technical domains heading & capability cards",
    icon: Layers,
  },
  {
    key: "why_choose_us",
    number: "05",
    label: "Why Choose Us",
    shortDesc: "Section heading, intro & visibility toggle",
    icon: ShieldCheck,
    manageLink: { label: "Edit 6 Value Pillar Cards", href: "/admin/home-page" },
  },
  {
    key: "industries_section",
    number: "06",
    label: "Industries We Serve",
    shortDesc: "Target verticals heading & description",
    icon: Factory,
    manageLink: { label: "Edit 6 Industrial Verticals", href: "/admin/industries" },
  },
  {
    key: "certifications",
    number: "07",
    label: "Certifications & Partners",
    shortDesc: "Credentials note & verified OEM partner grid",
    icon: Award,
    manageLink: { label: "Edit Partner Brands", href: "/admin/brands" },
  },
  {
    key: "contact_cta",
    number: "08",
    label: "Bottom Contact CTA",
    shortDesc: "Partner CTA banner, quote & contact buttons",
    icon: Send,
  },
];

export function AboutPageEditor({
  initialSections,
}: {
  initialSections: Record<AboutSectionKey, AboutSectionEntry>;
}) {
  const router = useRouter();
  const [sections, setSections] = useState<
    Record<AboutSectionKey, AboutSectionEntry>
  >(initialSections);
  const [activeKey, setActiveKey] = useState<AboutSectionKey>("banner");
  const [saving, setSaving] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeMeta =
    SECTION_META.find((m) => m.key === activeKey) || SECTION_META[0];
  const activeSection = sections[activeKey];
  const isEnabled = activeSection.data.enabled !== false;

  const updateActive = (patch: Partial<AboutSectionEntry>) => {
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
        pageKey: "about",
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

  const renderCardListEditor = (
    label: string,
    field: string,
    itemLabel: string
  ) => {
    const items = Array.isArray(activeSection.data[field])
      ? (activeSection.data[field] as AboutCardItem[])
      : [];

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold tracking-wider text-[#0B1730] uppercase">
            {label} ({items.length})
          </label>
          <button
            type="button"
            onClick={() =>
              updateData(field, [
                ...items,
                { title: `New ${itemLabel}`, description: "" },
              ])
            }
            className="inline-flex items-center gap-1 rounded-lg bg-[#1877F2]/10 px-2.5 py-1 text-xs font-bold text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add {itemLabel}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="space-y-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#1877F2] uppercase">
                  {itemLabel} #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateData(
                      field,
                      items.filter((_, i) => i !== idx)
                    )
                  }
                  className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Remove ${itemLabel}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={item.title}
                placeholder={`${itemLabel} Title`}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...next[idx], title: e.target.value };
                  updateData(field, next);
                }}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#0B1730]"
              />
              <textarea
                rows={3}
                value={item.description}
                placeholder={`${itemLabel} description...`}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...next[idx], description: e.target.value };
                  updateData(field, next);
                }}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#172033]"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* TOP QUICK BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-2xs">
        <div>
          <h2 className="text-sm font-bold text-[#0B1730]">
            Select any About Us section below to edit its content, cards, buttons & visibility
          </h2>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Every change publishes immediately to your live About Us page (`/about-us`).
          </p>
        </div>
        <Link
          href="/about-us"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl border border-[#1877F2]/30 bg-[#1877F2]/10 px-4 py-2 text-xs font-bold text-[#1877F2] transition hover:bg-[#1877F2] hover:text-white"
        >
          <span>Preview Live About Us Page</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* SECTION BUTTONS + ACTIVE EDITOR */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-2 lg:col-span-4">
          <div className="mb-2 text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
            About Us Sections (8)
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

        {/* ACTIVE SECTION FORM */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs lg:col-span-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-[11px] font-extrabold tracking-wider text-[#1877F2] uppercase">
                  Section {activeMeta.number} • about.{activeMeta.key}
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
                  {activeMeta.label} saved and published to the live About Us page!
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
                  Manage the cards or database records shown inside this section:
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

            {activeKey !== "mission_vision" && (
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
            )}

            <div className="space-y-5 border-t border-[#E2E8F0] pt-5">
              {activeKey === "banner" && (
                <>
                  {renderTextField("Banner Intro Paragraph", "overview", {
                    multiline: true,
                    rows: 4,
                  })}
                </>
              )}

              {activeKey === "corporate_overview" && (
                <>
                  {renderTextField("Primary Overview Paragraph", "overview", {
                    multiline: true,
                    rows: 4,
                  })}
                  {renderTextField(
                    "Extended Overview Paragraph",
                    "extendedOverview",
                    {
                      multiline: true,
                      rows: 4,
                    }
                  )}
                  {renderCardListEditor(
                    "Summary Highlight Boxes",
                    "highlights",
                    "Highlight Box"
                  )}
                </>
              )}

              {activeKey === "mission_vision" && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-3 rounded-xl border border-[#E2E8F0] bg-[#0B1730]/5 p-4">
                    {renderTextField("Mission Card Title", "missionTitle")}
                    {renderTextField("Mission Statement", "mission", {
                      multiline: true,
                      rows: 5,
                    })}
                  </div>
                  <div className="space-y-3 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-4">
                    {renderTextField("Vision Card Title", "visionTitle")}
                    {renderTextField("Vision Statement", "vision", {
                      multiline: true,
                      rows: 5,
                    })}
                  </div>
                </div>
              )}

              {activeKey === "capabilities" && (
                <>
                  {renderTextField("Section Description", "description", {
                    multiline: true,
                  })}
                  {renderCardListEditor(
                    "Capability Cards",
                    "items",
                    "Capability"
                  )}
                </>
              )}

              {(activeKey === "why_choose_us" ||
                activeKey === "industries_section") && (
                <>
                  {renderTextField("Section Description", "description", {
                    multiline: true,
                  })}
                </>
              )}

              {activeKey === "certifications" && (
                <>
                  {renderTextField(
                    "Certifications & Credentials Note (leave empty to hide unless brands exist)",
                    "certificationsNote",
                    {
                      multiline: true,
                      rows: 4,
                      placeholder:
                        "e.g. ISO 9001:2015 certified quality processes, authorized OEM systems integrator...",
                    }
                  )}
                </>
              )}

              {activeKey === "contact_cta" && (
                <>
                  {renderTextField("CTA Description", "description", {
                    multiline: true,
                  })}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {renderTextField("Primary Button Text (Quote Modal)", "primaryCtaText")}
                    {renderTextField("Preselected Quote Topic", "quoteTopic")}
                    {renderTextField("Secondary Button Text", "secondaryCtaText")}
                    {renderTextField("Secondary Button Link", "secondaryCtaHref")}
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
