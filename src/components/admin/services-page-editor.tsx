"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Layers,
  Loader2,
  Plus,
  Save,
  Send,
  Star,
  Trash2,
  Wrench,
} from "lucide-react";
import { savePageContentAction } from "@/lib/actions/admin-actions";
import type {
  ServicesIconCard,
  ServicesPageDefaults,
} from "@/lib/services-page-defaults";

export type ServicesSectionKey = keyof ServicesPageDefaults;

export interface ServicesSectionEntry {
  sectionKey: ServicesSectionKey;
  title: string;
  subtitle: string;
  data: Record<string, unknown>;
}

interface SectionMeta {
  key: ServicesSectionKey;
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
    label: "Services Hero Banner",
    shortDesc: "Top badge, headline, description & quote button",
    icon: Star,
  },
  {
    key: "catalog",
    number: "02",
    label: "13 Service Cards Grid",
    shortDesc: "Catalog heading, card buttons & feature count",
    icon: Wrench,
    manageLink: { label: "Add / Edit the 13 Services", href: "/admin/services" },
  },
  {
    key: "lifecycle",
    number: "03",
    label: "Lifecycle Delivery Model",
    shortDesc: "Heading & 5 delivery stage cards",
    icon: Layers,
  },
  {
    key: "why_services",
    number: "04",
    label: "Service Advantages",
    shortDesc: "Why choose Zenin services — advantage cards",
    icon: Award,
  },
  {
    key: "enquiry",
    number: "05",
    label: "Service Enquiry Form",
    shortDesc: "Proposal form heading, text & quote topic",
    icon: Send,
    manageLink: { label: "View Received Enquiries", href: "/admin/enquiries" },
  },
  {
    key: "detail_labels",
    number: "06",
    label: "Service Detail Page Labels",
    shortDesc: "Headings & buttons on all 13 service pages",
    icon: FileText,
    manageLink: { label: "Edit Each Service's Content", href: "/admin/services" },
  },
];

const ICON_OPTIONS = [
  "Layers",
  "Wrench",
  "Sliders",
  "ShieldCheck",
  "Headset",
  "CheckCircle2",
  "Factory",
  "Network",
  "Cpu",
  "Camera",
  "Flame",
  "Building2",
  "Lightbulb",
  "Zap",
  "KeyRound",
  "Radio",
  "Wind",
  "Gauge",
  "Server",
  "Award",
];

export function ServicesPageEditor({
  initialSections,
}: {
  initialSections: Record<ServicesSectionKey, ServicesSectionEntry>;
}) {
  const router = useRouter();
  const [sections, setSections] =
    useState<Record<ServicesSectionKey, ServicesSectionEntry>>(initialSections);
  const [activeKey, setActiveKey] = useState<ServicesSectionKey>("banner");
  const [saving, setSaving] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeMeta =
    SECTION_META.find((m) => m.key === activeKey) || SECTION_META[0];
  const activeSection = sections[activeKey];
  const isEnabled = activeSection.data.enabled !== false;

  const resetNotices = () => {
    setSavedKey(null);
    setErrorMsg(null);
  };

  const updateActive = (patch: Partial<ServicesSectionEntry>) => {
    setSections((prev) => ({
      ...prev,
      [activeKey]: { ...prev[activeKey], ...patch },
    }));
    resetNotices();
  };

  const updateData = (field: string, value: unknown) => {
    setSections((prev) => ({
      ...prev,
      [activeKey]: {
        ...prev[activeKey],
        data: { ...prev[activeKey].data, [field]: value },
      },
    }));
    resetNotices();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    resetNotices();
    try {
      await savePageContentAction({
        pageKey: "services",
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

  const inputCls =
    "w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#0B1730] focus:border-[#1877F2] focus:bg-white focus:outline-none";
  const labelCls =
    "mb-1.5 block text-xs font-bold tracking-wider text-[#0B1730] uppercase";

  const renderTextField = (
    label: string,
    field: string,
    opts?: { multiline?: boolean; rows?: number; placeholder?: string }
  ) => {
    const val = String(activeSection.data[field] ?? "");
    return (
      <div>
        <label className={labelCls}>{label}</label>
        {opts?.multiline ? (
          <textarea
            rows={opts.rows || 3}
            value={val}
            placeholder={opts.placeholder}
            onChange={(e) => updateData(field, e.target.value)}
            className={inputCls}
          />
        ) : (
          <input
            type="text"
            value={val}
            placeholder={opts?.placeholder}
            onChange={(e) => updateData(field, e.target.value)}
            className={inputCls}
          />
        )}
      </div>
    );
  };

  const renderToggle = (label: string, field: string) => {
    const on = activeSection.data[field] !== false;
    return (
      <button
        type="button"
        onClick={() => updateData(field, !on)}
        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-xs font-bold transition ${
          on
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-slate-200 bg-slate-50 text-slate-500"
        }`}
      >
        <span>{label}</span>
        <span>{on ? "ON" : "OFF"}</span>
      </button>
    );
  };

  const renderIconCardsEditor = (label: string, field: string, itemLabel: string) => {
    const items = Array.isArray(activeSection.data[field])
      ? (activeSection.data[field] as ServicesIconCard[])
      : [];

    const setItem = (idx: number, patch: Partial<ServicesIconCard>) => {
      const next = [...items];
      next[idx] = { ...next[idx], ...patch };
      updateData(field, next);
    };

    const move = (idx: number, dir: -1 | 1) => {
      const target = idx + dir;
      if (target < 0 || target >= items.length) return;
      const next = [...items];
      [next[idx], next[target]] = [next[target], next[idx]];
      updateData(field, next);
    };

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
                { title: `New ${itemLabel}`, description: "", icon: "Layers" },
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
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                    className="rounded px-1.5 py-0.5 text-xs font-bold text-slate-500 hover:bg-white disabled:opacity-30"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(idx, 1)}
                    disabled={idx === items.length - 1}
                    className="rounded px-1.5 py-0.5 text-xs font-bold text-slate-500 hover:bg-white disabled:opacity-30"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => updateData(field, items.filter((_, i) => i !== idx))}
                    className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    aria-label={`Remove ${itemLabel}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <input
                  type="text"
                  value={item.title}
                  placeholder={`${itemLabel} Title`}
                  onChange={(e) => setItem(idx, { title: e.target.value })}
                  className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#0B1730] sm:col-span-2"
                />
                <select
                  value={item.icon || "Layers"}
                  onChange={(e) => setItem(idx, { icon: e.target.value })}
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
                rows={3}
                value={item.description}
                placeholder={`${itemLabel} description...`}
                onChange={(e) => setItem(idx, { description: e.target.value })}
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
            Select any Services page section below to edit its content, cards, buttons & visibility
          </h2>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Changes publish immediately to `/services` and all 13 service detail pages.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2 text-xs font-bold text-[#0B1730] hover:border-[#1877F2] hover:text-[#1877F2]"
          >
            <Wrench className="h-3.5 w-3.5" />
            <span>Manage 13 Services</span>
          </Link>
          <Link
            href="/services"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-[#1877F2]/30 bg-[#1877F2]/10 px-4 py-2 text-xs font-bold text-[#1877F2] transition hover:bg-[#1877F2] hover:text-white"
          >
            <span>Preview Live Services Page</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* SECTION BUTTONS */}
        <div className="space-y-2 lg:col-span-4">
          <div className="mb-2 text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
            Services Page Sections (6)
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
                    resetNotices();
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
                        isActive ? "bg-white/20 text-white" : "bg-[#0B1730]/5 text-[#1877F2]"
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
                        <span className="truncate text-xs font-bold">{meta.label}</span>
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
                  {meta.key !== "detail_labels" && (
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
                  )}
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
                  Section {activeMeta.number} • services.{activeMeta.key}
                </span>
                <h3 className="mt-0.5 text-xl font-bold text-[#0B1730]">{activeMeta.label}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {activeKey !== "detail_labels" && (
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
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#125EC4] disabled:opacity-60"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  <span>Save & Publish</span>
                </button>
              </div>
            </div>

            {savedKey === activeKey && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{activeMeta.label} saved and published to the live website!</span>
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
                  {activeKey === "detail_labels"
                    ? "To edit a specific service's name, photo, description, features, applications or industries:"
                    : "Manage the database records shown inside this section:"}
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

            {activeKey !== "detail_labels" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Eyebrow / Badge Subtitle</label>
                  <input
                    type="text"
                    value={activeSection.subtitle}
                    onChange={(e) => updateActive({ subtitle: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Main Section Title</label>
                  <input
                    type="text"
                    value={activeSection.title}
                    onChange={(e) => updateActive({ title: e.target.value })}
                    className={`${inputCls} font-semibold`}
                  />
                </div>
              </div>
            )}

            <div className="space-y-5 border-t border-[#E2E8F0] pt-5">
              {activeKey === "banner" && (
                <>
                  {renderTextField("Banner Description", "description", { multiline: true, rows: 4 })}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {renderTextField("Quote Button Text", "primaryCtaText")}
                    {renderTextField("Preselected Quote Topic", "quoteTopic")}
                  </div>
                </>
              )}

              {activeKey === "catalog" && (
                <>
                  {renderTextField("Section Description", "description", { multiline: true })}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {renderTextField("Explore Button Text", "exploreButtonText")}
                    {renderTextField("Quote Button Text", "quoteButtonText")}
                    <div>
                      <label className={labelCls}>Features Shown per Card</label>
                      <select
                        value={String(activeSection.data.featuresPerCard ?? "2")}
                        onChange={(e) => updateData("featuresPerCard", e.target.value)}
                        className={inputCls}
                      >
                        {["0", "1", "2", "3", "4"].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {renderToggle("Show 01–13 Number Badges on Cards", "showNumberBadges")}
                </>
              )}

              {activeKey === "lifecycle" && (
                <>
                  {renderTextField("Section Description", "description", { multiline: true })}
                  {renderIconCardsEditor("Delivery Stage Cards", "pillars", "Stage")}
                </>
              )}

              {activeKey === "why_services" && (
                <>
                  {renderTextField("Section Description", "description", { multiline: true })}
                  {renderIconCardsEditor("Advantage Cards", "items", "Advantage")}
                </>
              )}

              {activeKey === "enquiry" && (
                <>
                  {renderTextField("Form Description", "description", { multiline: true })}
                  {renderTextField("Preselected Enquiry Topic", "quoteTopic")}
                </>
              )}

              {activeKey === "detail_labels" && (
                <>
                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-4">
                    <div className="mb-3 text-[11px] font-bold tracking-wider text-[#1877F2] uppercase">
                      Top Banner
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {renderTextField("Banner Badge", "bannerBadge")}
                      {renderTextField("Quote Button Prefix", "quoteButtonPrefix")}
                      {renderTextField("Back Button Text", "backButtonText")}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-4">
                    <div className="mb-3 text-[11px] font-bold tracking-wider text-[#1877F2] uppercase">
                      Main Content Headings
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {renderTextField("Overview Eyebrow", "overviewEyebrow")}
                      {renderTextField("Overview Title", "overviewTitle")}
                      {renderTextField("Key Features Heading", "featuresTitle")}
                      {renderTextField("Capabilities Heading", "capabilitiesTitle")}
                      {renderTextField("Applications Heading", "applicationsTitle")}
                      {renderTextField("Industries Heading", "industriesTitle")}
                    </div>
                    <div className="mt-4">
                      {renderToggle("Show 5 Lifecycle Badges Under Capabilities", "showLifecycleBadges")}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC]/60 p-4">
                    <div className="mb-3 text-[11px] font-bold tracking-wider text-[#1877F2] uppercase">
                      Side Quote Form & Related Services
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {renderTextField("Quote Box Eyebrow", "quoteEyebrow")}
                      {renderTextField("Quote Box Title Prefix", "quoteTitlePrefix")}
                      {renderTextField("Quote Box Note Prefix", "quoteNote")}
                      {renderTextField("Related Services Heading", "relatedTitle")}
                      {renderTextField("Related Services Link Text", "relatedLinkText")}
                    </div>
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
