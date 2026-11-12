"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, UserPlus, CheckCircle2, Loader2 } from "lucide-react";
import type { SessionUser } from "@/lib/auth";
import {
  changeAdminPasswordAction,
  createAdminUserAction,
} from "@/lib/actions/admin-actions";
import { formatDateTime } from "@/lib/utilities";

interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
}

export function ProfileManager({
  currentUser,
  adminUsers,
}: {
  currentUser: SessionUser;
  adminUsers: AdminUserRow[];
}) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdStatus, setPwdStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [savingPwd, setSavingPwd] = useState(false);

  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminRole, setNewAdminRole] = useState<"EDITOR" | "SUPER_ADMIN">(
    "EDITOR"
  );
  const [userStatus, setUserStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPwd(true);
    setPwdStatus(null);

    const res = await changeAdminPasswordAction({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    setSavingPwd(false);
    if (!res.success) {
      setPwdStatus({ type: "error", msg: res.error || "Password update failed." });
      return;
    }

    setPwdStatus({
      type: "success",
      msg: "Administrator password updated securely.",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    setUserStatus(null);

    const res = await createAdminUserAction({
      name: newAdminName,
      email: newAdminEmail,
      password: newAdminPassword,
      role: newAdminRole,
    });

    setCreatingUser(false);
    if (!res.success) {
      setUserStatus({ type: "error", msg: res.error || "Could not create user." });
      return;
    }

    setUserStatus({
      type: "success",
      msg: `Created ${newAdminRole} account for ${newAdminEmail}.`,
    });
    setNewAdminName("");
    setNewAdminEmail("");
    setNewAdminPassword("");
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* CHANGE PASSWORD */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs lg:col-span-5">
        <div className="flex items-center gap-2.5 border-b border-[#E2E8F0] pb-4">
          <KeyRound className="h-5 w-5 text-[#1877F2]" />
          <h2 className="text-base font-bold text-[#0B1730]">
            Change Administrator Password
          </h2>
        </div>

        <form onSubmit={handlePasswordChange} className="mt-5 space-y-4 text-xs">
          {pwdStatus && (
            <div
              className={`rounded-xl px-4 py-3 font-semibold ${
                pwdStatus.type === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {pwdStatus.msg}
            </div>
          )}

          <div>
            <label className="mb-1 block font-bold text-[#0B1730] uppercase">
              Current Password *
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-[#0B1730] uppercase">
              New Password (Min 10 chars, Uppercase, Lowercase & Number) *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-[#0B1730] uppercase">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3.5 py-2.5 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={savingPwd}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1730] px-5 py-3 text-xs font-bold text-white hover:bg-[#1877F2]"
          >
            {savingPwd && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>Update Password</span>
          </button>
        </form>
      </div>

      {/* ADMIN USER MANAGEMENT (SUPER_ADMIN ONLY) */}
      <div className="space-y-6 lg:col-span-7">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
          <h2 className="text-base font-bold text-[#0B1730]">
            Authorized Administrator Accounts ({adminUsers.length})
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[11px] font-bold text-[#64748B] uppercase">
                  <th className="pb-2.5 pr-4">Name & Email</th>
                  <th className="pb-2.5 pr-4">Role</th>
                  <th className="pb-2.5">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {adminUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="py-3 pr-4">
                      <div className="font-bold text-[#0B1730]">{u.name}</div>
                      <div className="text-[11px] text-[#64748B]">{u.email}</div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="rounded bg-[#0B1730] px-2 py-0.5 text-[10px] font-bold text-[#00B8D9] uppercase">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 text-[11px] text-[#64748B]">
                      {u.lastLoginAt ? formatDateTime(u.lastLoginAt) : "Never"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {currentUser.role === "SUPER_ADMIN" && (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
              <UserPlus className="h-5 w-5 text-[#1877F2]" />
              <h3 className="text-base font-bold text-[#0B1730]">
                Provision New Administrator Account (Super Admin Only)
              </h3>
            </div>

            <form onSubmit={handleCreateUser} className="mt-4 space-y-4 text-xs">
              {userStatus && (
                <div
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 font-semibold ${
                    userStatus.type === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{userStatus.msg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold uppercase">
                    Initial Password (Min 10 chars) *
                  </label>
                  <input
                    type="password"
                    required
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-bold uppercase">Role</label>
                  <select
                    value={newAdminRole}
                    onChange={(e) =>
                      setNewAdminRole(
                        e.target.value as "EDITOR" | "SUPER_ADMIN"
                      )
                    }
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F5F8FC] px-3 py-2 text-sm"
                  >
                    <option value="EDITOR">EDITOR (CMS & Enquiries)</option>
                    <option value="SUPER_ADMIN">
                      SUPER_ADMIN (Full Access + Users & Settings)
                    </option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={creatingUser}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#125EC4]"
              >
                {creatingUser && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>Create Administrator</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
