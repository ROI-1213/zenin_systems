"use client";

import React from "react";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";

export interface FullPageSectionMeta<K extends string> {
  key: K;
  number: string;
  label: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  showStatusBadge?: boolean;
}

interface FullPageSectionLayoutProps<K extends string> {
  sectionTitle: string;
  metas: FullPageSectionMeta<K>[];
  activeKey: K;
  isFullPage: boolean;
  isEnabledMap: Record<K, boolean>;
  onSelectSection: (key: K) => void;
  onBackToGrid: () => void;
  children: React.ReactNode;
}

export function FullPageSectionLayout<K extends string>({
  sectionTitle,
  metas,
  activeKey,
  isFullPage,
  isEnabledMap,
  onSelectSection,
  onBackToGrid,
  children,
}: FullPageSectionLayoutProps<K>) {
  if (!isFullPage) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold tracking-wider text-[#64748B] uppercase">
            {sectionTitle} ({metas.length}) — Click any section to open in full page
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metas.map((meta) => {
            const Icon = meta.icon;
            const enabled = isEnabledMap[meta.key] !== false;
            const showBadge = meta.showStatusBadge !== false;
            return (
              <button
                key={meta.key}
                type="button"
                onClick={() => onSelectSection(meta.key)}
                className="group flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 text-left shadow-2xs transition hover:-translate-y-0.5 hover:border-[#1877F2] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1730]/5 text-[#1877F2] transition group-hover:bg-[#1877F2] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    {showBadge && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          enabled
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {enabled ? "Live" : "Hidden"}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="rounded-md bg-[#1877F2]/10 px-2 py-0.5 text-[11px] font-extrabold text-[#1877F2] uppercase">
                      {meta.number}
                    </span>
                    <h3 className="text-base font-bold text-[#0B1730] group-hover:text-[#1877F2]">
                      {meta.label}
                    </h3>
                  </div>

                  <p className="mt-1.5 text-xs leading-relaxed text-[#64748B]">
                    {meta.shortDesc}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#E2E8F0] pt-3 text-xs font-bold text-[#1877F2]">
                  <span>Open Full Page Editor</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* FULL-PAGE TOP NAVIGATION & QUICK SECTION SWITCHER */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToGrid}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0B1730] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#1877F2]"
          >
            <ArrowLeft className="h-4 w-4" />
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Back to All Sections ({metas.length})</span>
          </button>

          <span className="text-xs font-semibold text-[#64748B]">
            Full-Page Section Editor • Click any tab below to switch sections
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-t border-[#E2E8F0] pt-3">
          {metas.map((meta) => {
            const isActive = meta.key === activeKey;
            return (
              <button
                key={meta.key}
                type="button"
                onClick={() => onSelectSection(meta.key)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  isActive
                    ? "bg-[#1877F2] text-white shadow-xs"
                    : "bg-[#F5F8FC] text-[#0B1730] hover:bg-[#1877F2]/10 hover:text-[#1877F2]"
                }`}
              >
                <span className="opacity-75">{meta.number}</span>
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FULL-WIDTH EDITOR CONTAINER */}
      <div className="w-full">{children}</div>
    </div>
  );
}
