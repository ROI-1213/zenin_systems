"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Download,
  Eye,
  X,
  CheckCircle2,
  Loader2,
  MessageSquarePlus,
} from "lucide-react";
import { updateEnquiryStatusAction } from "@/lib/actions/admin-actions";
import { ENQUIRY_STATUSES } from "@/lib/validations";
import { formatDateTime } from "@/lib/utilities";

export interface AdminEnquiryRecord {
  id: string;
  referenceCode: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  enquiryType: string;
  interestedTopic: string | null;
  projectLocation: string | null;
  message: string;
  sourcePage: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  productName?: string | null;
  aiSolutionName?: string | null;
  serviceName?: string | null;
  notes: {
    id: string;
    authorName: string;
    note: string;
    createdAt: string;
  }[];
}

interface EnquiriesManagerProps {
  initialEnquiries: AdminEnquiryRecord[];
}

export function EnquiriesManager({ initialEnquiries }: EnquiriesManagerProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [selected, setSelected] = useState<AdminEnquiryRecord | null>(null);
  const [newStatus, setNewStatus] = useState<string>("NEW");
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return initialEnquiries.filter((e) => {
      const matchesStatus = statusFilter === "ALL" || e.status === statusFilter;
      const matchesType = typeFilter === "ALL" || e.enquiryType === typeFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        e.referenceCode.toLowerCase().includes(q) ||
        e.fullName.toLowerCase().includes(q) ||
        e.companyName.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        (e.interestedTopic || "").toLowerCase().includes(q);
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [initialEnquiries, statusFilter, typeFilter, search]);

  const openDetails = (record: AdminEnquiryRecord) => {
    setSelected(record);
    setNewStatus(record.status);
    setNoteText("");
    setFeedback(null);
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSaving(true);
    setFeedback(null);

    const res = await updateEnquiryStatusAction({
      enquiryId: selected.id,
      status: newStatus as (typeof ENQUIRY_STATUSES)[number],
      note: noteText,
    });

    setSaving(false);
    if (!res.success) {
      setFeedback(res.error || "Failed to update status.");
      return;
    }

    setFeedback("Enquiry status & internal note saved.");
    setNoteText("");
    router.refresh();
  };

  return (
    <div>
      {/* FILTER & EXPORT TOOLBAR */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-2xs lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Ref ID, client name, company, email, or product..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] py-2.5 pr-4 pl-10 text-xs sm:text-sm focus:border-[#1877F2] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter enquiries by status"
            className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2.5 text-xs font-semibold text-[#0B1730]"
          >
            <option value="ALL">All Statuses</option>
            {ENQUIRY_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter enquiries by type"
            className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2.5 text-xs font-semibold text-[#0B1730]"
          >
            <option value="ALL">All Types</option>
            <option value="QUOTE_REQUEST">Quote Requests</option>
            <option value="TECHNICAL_CONSULTATION">Technical Consultation</option>
            <option value="SERVICE_REQUEST">Service Requests</option>
            <option value="GENERAL_INQUIRY">General Inquiries</option>
          </select>

          <a
            href="/api/admin/enquiries/export"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0B1730] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1877F2]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* ENQUIRIES TABLE */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F5F8FC] text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                <th className="px-4 py-3.5">Enquiry ID</th>
                <th className="px-4 py-3.5">Name</th>
                <th className="px-4 py-3.5">Company</th>
                <th className="px-4 py-3.5">Email & Phone</th>
                <th className="px-4 py-3.5">Interested Product / Service</th>
                <th className="px-4 py-3.5">Source</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Submitted Date</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm text-[#64748B]">
                    No enquiries match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((enq) => {
                  const resolvedItem =
                    enq.aiSolutionName ||
                    enq.productName ||
                    enq.serviceName ||
                    enq.interestedTopic ||
                    "General";
                  return (
                    <tr key={enq.id} className="hover:bg-[#F5F8FC]/60">
                      <td className="px-4 py-3.5 font-mono font-bold text-[#1877F2]">
                        {enq.referenceCode}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-[#0B1730]">
                        {enq.fullName}
                      </td>
                      <td className="px-4 py-3.5 text-[#172033]">{enq.companyName}</td>
                      <td className="px-4 py-3.5">
                        <div className="text-[#0B1730]">{enq.email}</div>
                        <div className="text-[11px] text-[#64748B]">{enq.phone}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-[#0B1730]">
                          {resolvedItem}
                        </span>
                        <div className="text-[10px] text-[#64748B]">
                          {enq.enquiryType.replace("_", " ")}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[11px] text-[#64748B]">
                        {enq.sourcePage}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                            enq.status === "NEW"
                              ? "bg-emerald-100 text-emerald-700"
                              : enq.status === "QUOTED"
                              ? "bg-blue-100 text-blue-700"
                              : enq.status === "SPAM"
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[11px] text-[#64748B]">
                        {formatDateTime(enq.createdAt)}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => openDetails(enq)}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0B1730] hover:border-[#1877F2] hover:text-[#1877F2]"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ENQUIRY DETAILS & STATUS DRAWER MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#081424]/70 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#1877F2]">
                  {selected.referenceCode}
                </span>
                <h2 className="mt-1 text-xl font-bold text-[#0B1730]">
                  {selected.fullName} — {selected.companyName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl bg-[#F5F8FC] p-4 text-xs sm:grid-cols-2">
              <div>
                <span className="font-bold text-[#64748B] uppercase">Email:</span>{" "}
                <span className="font-semibold text-[#0B1730]">{selected.email}</span>
              </div>
              <div>
                <span className="font-bold text-[#64748B] uppercase">Phone:</span>{" "}
                <span className="font-semibold text-[#0B1730]">{selected.phone}</span>
              </div>
              <div>
                <span className="font-bold text-[#64748B] uppercase">
                  Attributed Solution:
                </span>{" "}
                <span className="font-semibold text-[#1877F2]">
                  {selected.aiSolutionName ||
                    selected.productName ||
                    selected.serviceName ||
                    selected.interestedTopic}
                </span>
              </div>
              <div>
                <span className="font-bold text-[#64748B] uppercase">
                  Source Route:
                </span>{" "}
                <span className="font-mono text-[#0B1730]">{selected.sourcePage}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs font-bold tracking-wider text-[#64748B] uppercase">
                Submitted Project Requirement
              </div>
              <div className="mt-1.5 rounded-xl border border-[#E2E8F0] bg-white p-4 text-sm leading-relaxed text-[#172033]">
                {selected.message}
              </div>
            </div>

            {/* UPDATE STATUS & ADD NOTE FORM */}
            <form
              onSubmit={handleStatusUpdate}
              className="mt-6 space-y-4 border-t border-[#E2E8F0] pt-5"
            >
              <h3 className="text-sm font-bold text-[#0B1730]">
                Update Lead Status & Add Internal Note
              </h3>

              {feedback && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{feedback}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#64748B] uppercase">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm font-semibold text-[#0B1730]"
                  >
                    {ENQUIRY_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-[#64748B] uppercase">
                  Internal Admin Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add call summary, quotation reference number, or follow-up action..."
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-sm text-[#0B1730]"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-xl border border-[#E2E8F0] px-4 py-2 text-xs font-semibold text-[#64748B]"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#125EC4]"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MessageSquarePlus className="h-4 w-4" />
                  )}
                  <span>Save Status & Note</span>
                </button>
              </div>
            </form>

            {/* EXISTING INTERNAL NOTES */}
            {selected.notes.length > 0 && (
              <div className="mt-6 border-t border-[#E2E8F0] pt-4">
                <h4 className="text-xs font-bold tracking-wider text-[#64748B] uppercase">
                  Internal Notes History
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {selected.notes.map((n) => (
                    <li
                      key={n.id}
                      className="rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] p-3 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-[#0B1730]">
                        <span>{n.authorName}</span>
                        <span className="text-[10px] text-[#64748B]">
                          {formatDateTime(n.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1 text-[#172033]">{n.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
