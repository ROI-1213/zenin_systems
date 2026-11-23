"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  Inbox,
  Loader2,
  MapPin,
  PhoneCall,
  Save,
  Send,
  Settings,
  Star,
} from "lucide-react";
import { savePageContentAction } from "@/lib/actions/admin-actions";
import type { ContactPageDefaults } from "@/lib/contact-page-defaults";

export type ContactSectionKey = keyof ContactPageDefaults;

export interface ContactSectionEntry {
  sectionKey: ContactSectionKey;
  title: string;
  subtitle: string;
  data: Record<string, unknown>;
}

interface SectionMeta {
  key: ContactSectionKey;
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
    label: "Contact Hero Banner",
    shortDesc: "Top curved hero badge, H1 headline & summary",
    icon: Star,
  },
  {
    key: "contact_details",
    number: "02",
    label: "Office & Contact Cards",
    shortDesc: "Address, phone, email & business hours cards",
    icon: PhoneCall,
    manageLink: { label: "Global Site Settings", href: "/admin/settings" },
  },
  {
    key: "map_section",
    number: "03",
    label: "Location Map Embed",
    shortDesc: "Google Maps iframe URL & fallback notice",
    icon: MapPin,
  },
  {
    key: "enquiry_form",
    number: "04",
    label: "Enquiry Form Section",
    shortDesc: "Right-column form heading, badge & intro",
    icon: Send,
    manageLink: { label: "View Received Enquiries", href: "/admin/enquiries" },
  },
];

export function ContactPageEditor({
  initialSections,
}: {
  initialSections: Record<ContactSectionKey, ContactSectionEntry>;
}) {
  const router = useRouter();
  const [sections, setSections] =
    useState<Record<ContactSectionKey, ContactSectionEntry>>(initialSections);
  const [activeKey, setActiveKey] = useState<ContactSectionKey>("banner");
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

  const updateActive = (patch: Partial<ContactSectionEntry>) => {
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
        pageKey: "contact",
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

  const mapUrl = String(activeSection.data.mapEmbedUrl ?? "");

  return (
    <div className="space-y-6">
      {/* TOP QUICK BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-2xs">
        <div>
          <h2 className="text-sm font-bold text-[#0B1730]">
            Select any Contact Us section below to edit its details, map embed, form labels & visibility
          </h2>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Every change publishes immediately to your live Contact Us page (`/contact-us`).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2 text-xs font-bold text-[#0B1730] hover:border-[#1877F2] hover:text-[#1877F2]"
          >
            <Inbox className="h-3.5 w-3.5" />
            <span>Enquiries Inbox</span>
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2 text-xs font-bold text-[#0B1730] hover:border-[#1877F2] hover:text-[#1877F2]"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Site Settings</span>
          </Link>
          <Link
            href="/contact-us"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-[#1877F2]/30 bg-[#1877F2]/10 px-4 py-2 text-xs font-bold text-[#1877F2] transition hover:bg-[#1877F2] hover:text-white"
          >
            <span>Preview Live Contact Us Page</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* SECTION BUTTONS + ACTIVE EDITOR */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-2 lg:col-span-4">
          <div className="mb-2 text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
            Contact Us Sections (4)
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
                  Section {activeMeta.number} • contact.{activeMeta.key}
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
                  {activeMeta.label} saved and published to the live Contact Us page!
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
                  {activeKey === "contact_details"
                    ? "Note: Footer contact info is also managed in Global Site Settings."
                    : "View, filter, and export submitted project enquiries:"}
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

            <div className="space-y-5 border-t border-[#E2E8F0] pt-5">
              {activeKey === "banner" && (
                <>
                  {renderTextField("Banner Description", "description", {
                    multiline: true,
                    rows: 4,
                  })}
                </>
              )}

              {activeKey === "contact_details" && (
                <>
                  {renderTextField("Intro Paragraph", "intro", {
                    multiline: true,
                    rows: 3,
                  })}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {renderTextField("Address Card Label", "addressLabel")}
                    {renderTextField("Office Address", "address")}
                    {renderTextField("Phone Card Label", "phoneLabel")}
                    {renderTextField("Phone / Project Desk Number", "phone")}
                    {renderTextField("Email Card Label", "emailLabel")}
                    {renderTextField("Business Email", "email")}
                    {renderTextField("Hours Card Label", "hoursLabel")}
                    {renderTextField("Business Hours", "workingHours")}
                  </div>
                </>
              )}

              {activeKey === "map_section" && (
                <>
                  {renderTextField(
                    "Google Maps Embed URL (https://www.google.com/maps/embed?...)",
                    "mapEmbedUrl",
                    {
                      placeholder: "https://www.google.com/maps/embed?pb=...",
                    }
                  )}
                  {renderTextField(
                    "Fallback Notice Text (shown if no embed URL is set)",
                    "placeholderText",
                    { multiline: true, rows: 3 }
                  )}
                  {mapUrl.startsWith("https://") && (
                    <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
                      <iframe
                        src={mapUrl}
                        title="Map Preview"
                        className="h-56 w-full border-0"
                        loading="lazy"
                      />
                    </div>
                  )}
                </>
              )}

              {activeKey === "enquiry_form" && (
                <>
                  {renderTextField("Form Description", "description", {
                    multiline: true,
                    rows: 3,
                  })}
                  {renderTextField(
                    "Preselected Enquiry Topic",
                    "preselectedTopicName"
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
