"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Save, ShieldAlert } from "lucide-react";
import { saveSiteSettingsAction } from "@/lib/actions/admin-actions";

interface SettingItem {
  id: string;
  key: string;
  value: string;
  group: string;
  description: string | null;
}

export function SettingsManager({
  initialSettings,
  isSuperAdmin,
}: {
  initialSettings: SettingItem[];
  isSuperAdmin: boolean;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const s of initialSettings) {
      map[s.key] = s.value;
    }
    return map;
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);

    try {
      const res = await saveSiteSettingsAction(values);
      if (res.success) {
        setSaved(true);
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update site settings."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="space-y-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs sm:p-8"
    >
      <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-[#0B1730]">
            Global Site Configuration & Navigation Flags
          </h2>
          <p className="text-xs text-[#64748B]">
            Configure company details, announcement bar, social links, navigation
            visibility, and default SEO metadata.
          </p>
        </div>

        {isSuperAdmin ? (
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
            <span>Save Site Settings</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
            <ShieldAlert className="h-4 w-4" />
            <span>Super Admin required to modify global settings</span>
          </div>
        )}
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          <span>Global site settings saved and applied across the website!</span>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {initialSettings.map((setting) => {
          const isBooleanToggle =
            setting.value === "true" ||
            setting.value === "false" ||
            setting.key.startsWith("nav_") ||
            setting.key.endsWith("_enabled");

          return (
            <div
              key={setting.key}
              className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-4"
            >
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#0B1730] uppercase">
                  {setting.key.replace(/_/g, " ")}
                </label>
                <span className="rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-[#64748B] uppercase">
                  {setting.group}
                </span>
              </div>
              {setting.description && (
                <p className="mt-1 text-[11px] text-[#64748B]">
                  {setting.description}
                </p>
              )}

              <div className="mt-3">
                {isBooleanToggle ? (
                  <select
                    disabled={!isSuperAdmin}
                    value={values[setting.key] || "false"}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [setting.key]: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#0B1730]"
                  >
                    <option value="true">Enabled (true)</option>
                    <option value="false">Disabled (false)</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    disabled={!isSuperAdmin}
                    value={values[setting.key] || ""}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [setting.key]: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0B1730]"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
