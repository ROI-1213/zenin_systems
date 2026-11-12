"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { savePageContentAction } from "@/lib/actions/admin-actions";

export interface AdminContentBlock {
  id: string;
  pageKey: string;
  sectionKey: string;
  title: string | null;
  subtitle: string | null;
  content: Record<string, unknown>;
}

export function ContentManager({ blocks }: { blocks: AdminContentBlock[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(blocks[0]?.id || "");
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const activeBlock = blocks.find((b) => b.id === selectedId) || blocks[0];

  const [title, setTitle] = useState(activeBlock?.title || "");
  const [subtitle, setSubtitle] = useState(activeBlock?.subtitle || "");
  const [contentJson, setContentJson] = useState<Record<string, unknown>>(
    activeBlock?.content || {}
  );

  const selectBlock = (b: AdminContentBlock) => {
    setSelectedId(b.id);
    setTitle(b.title || "");
    setSubtitle(b.subtitle || "");
    setContentJson(b.content || {});
    setSavedNotice(false);
  };

  const handleFieldChange = (key: string, val: unknown) => {
    setContentJson((prev) => ({ ...prev, [key]: val }));
    setSavedNotice(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBlock) return;
    setSaving(true);
    setSavedNotice(false);

    await savePageContentAction({
      pageKey: activeBlock.pageKey,
      sectionKey: activeBlock.sectionKey,
      title,
      subtitle,
      contentObj: contentJson,
    });

    setSaving(false);
    setSavedNotice(true);
    router.refresh();
  };

  if (!activeBlock) return null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* LEFT SELECTOR */}
      <div className="space-y-2 lg:col-span-4">
        <div className="text-xs font-bold tracking-wider text-[#64748B] uppercase">
          Website Content Sections
        </div>
        {blocks.map((b) => {
          const isActive = b.id === activeBlock.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => selectBlock(b)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                isActive
                  ? "border-[#1877F2] bg-[#1877F2] text-white shadow-sm"
                  : "border-[#E2E8F0] bg-white text-[#0B1730] hover:border-[#1877F2]"
              }`}
            >
              <div className="text-[10px] font-bold uppercase opacity-75">
                {b.pageKey} • {b.sectionKey}
              </div>
              <div className="mt-1 truncate text-xs font-bold">
                {b.title || `${b.pageKey}.${b.sectionKey}`}
              </div>
            </button>
          );
        })}
      </div>

      {/* RIGHT STRUCTURED EDITOR */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs lg:col-span-8">
        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-[11px] font-bold tracking-wider text-[#1877F2] uppercase">
                Editing Section: {activeBlock.pageKey} / {activeBlock.sectionKey}
              </span>
              <h2 className="mt-0.5 text-lg font-bold text-[#0B1730]">
                Structured Page Content Editor
              </h2>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#125EC4]"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>Publish Changes</span>
            </button>
          </div>

          {savedNotice && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                Content block saved and published to the live public website!
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-bold text-[#0B1730] uppercase">
                Section Heading / Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm font-semibold text-[#0B1730]"
              />
            </div>

            <div>
              <label className="mb-1 block font-bold text-[#0B1730] uppercase">
                Eyebrow / Subtitle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#0B1730]"
              />
            </div>
          </div>

          {/* DYNAMIC STRUCTURED FIELDS */}
          <div className="space-y-4 border-t border-[#E2E8F0] pt-4">
            {Object.entries(contentJson).map(([key, value]) => {
              if (typeof value === "string") {
                const isLong = value.length > 90 || key.includes("description") || key.includes("overview") || key.includes("mission") || key.includes("vision");
                return (
                  <div key={key}>
                    <label className="mb-1 block font-bold text-[#64748B] uppercase">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    {isLong ? (
                      <textarea
                        rows={3}
                        value={value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-sm text-[#0B1730]"
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#0B1730]"
                      />
                    )}
                  </div>
                );
              }

              if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
                return (
                  <div key={key}>
                    <label className="mb-1 block font-bold text-[#64748B] uppercase">
                      {key.replace(/([A-Z])/g, " $1")} (One item per line)
                    </label>
                    <textarea
                      rows={4}
                      value={(value as string[]).join("\n")}
                      onChange={(e) =>
                        handleFieldChange(
                          key,
                          e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                      className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-xs text-[#0B1730]"
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>
        </form>
      </div>
    </div>
  );
}
