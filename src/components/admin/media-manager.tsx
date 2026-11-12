"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Trash2, Copy, Check, Loader2, Image as ImageIcon } from "lucide-react";

export interface AdminMediaRecord {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  altText: string;
  createdAt: string;
}

export function MediaManager({
  initialAssets,
}: {
  initialAssets: AdminMediaRecord[];
}) {
  const router = useRouter();
  const [altText, setAltText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("altText", altText || file.name);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Upload failed.");
      } else {
        setAltText("");
        router.refresh();
      }
    } catch {
      setError("Failed to upload media file.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete media asset "${name}"?`)) return;
    setError(null);
    const res = await fetch(`/api/admin/media?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Cannot delete asset.");
    } else {
      router.refresh();
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* UPLOAD PANEL */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
        <h2 className="text-base font-bold text-[#0B1730]">
          Upload New Image Asset
        </h2>
        <p className="mt-1 text-xs text-[#64748B]">
          Supported formats: WebP, AVIF, PNG, JPEG, SVG (Max 5 MB). Stored with
          unique storage keys and reference protection.
        </p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-bold text-[#0B1730] uppercase">
              Descriptive Alt Text (Accessibility & SEO)
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="e.g. Industrial ANPR Camera Installation at Logistics Gate"
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm"
            />
          </div>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#125EC4]">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span>{uploading ? "Uploading..." : "Select & Upload Image"}</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* MEDIA GALLERY GRID */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
        <h3 className="text-sm font-bold text-[#0B1730]">
          Media Library ({initialAssets.length} uploaded assets)
        </h3>

        {initialAssets.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E2E8F0] p-12 text-center text-xs text-[#64748B]">
            <ImageIcon className="mb-2 h-8 w-8 text-slate-400" />
            <p>
              No custom media files uploaded yet. Upload images above to use their
              URLs across products, AI solutions, services, and brands.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {initialAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F5F8FC]"
              >
                <div className="relative flex h-36 items-center justify-center bg-[#0B1730]/5 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.url}
                    alt={asset.altText}
                    className="max-h-full max-w-full rounded object-contain"
                  />
                </div>
                <div className="p-3 text-xs">
                  <div className="truncate font-bold text-[#0B1730]">
                    {asset.originalName}
                  </div>
                  <div className="mt-0.5 truncate text-[11px] text-[#64748B]">
                    Alt: {asset.altText || "—"} • {(asset.sizeBytes / 1024).toFixed(1)}{" "}
                    KB
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#E2E8F0] pt-2">
                    <button
                      type="button"
                      onClick={() => copyUrl(asset.id, asset.url)}
                      className="inline-flex items-center gap-1 rounded bg-white px-2.5 py-1 text-[11px] font-semibold text-[#1877F2] shadow-2xs"
                    >
                      {copiedId === asset.id ? (
                        <>
                          <Check className="h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy URL
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(asset.id, asset.originalName)}
                      className="rounded p-1 text-red-600 hover:bg-red-50"
                      title="Delete with reference check"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
