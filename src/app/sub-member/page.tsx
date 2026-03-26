"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  ExclamationTriangleIcon,
  PlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { SuccessMessage } from "@/components/guide-ui";
import { SiteShell } from "@/components/site-shell";

type SubMemberStatus = "Active" | "Inactive";

type SubMember = {
  id: string;
  memberCode: string;
  fullName: string;
  email: string;
  nrc: string;
  status: SubMemberStatus;
};

const initialMembers: SubMember[] = [
  {
    id: "sub-member-1",
    memberCode: "TNM-000004-01",
    fullName: "TestCC",
    email: "testcc74524@gmail.com",
    nrc: "12/YAKANA(C)100001",
    status: "Active",
  },
  {
    id: "sub-member-2",
    memberCode: "TNM-000005-01",
    fullName: "Ko Min Zaw",
    email: "kozaw.member@example.com",
    nrc: "12/KAMAYA(N)348822",
    status: "Inactive",
  },
];

export default function SubMemberHubPage() {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    memberId: string;
    nextStatus: SubMemberStatus;
  } | null>(null);

  const filteredMembers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) {
      return members;
    }

    return members.filter((member) =>
      [member.memberCode, member.fullName, member.email, member.nrc, member.status]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    );
  }, [members, searchTerm]);

  const pendingMember = useMemo(() => {
    if (!pendingAction) {
      return null;
    }

    return members.find((member) => member.id === pendingAction.memberId) ?? null;
  }, [members, pendingAction]);

  const handleConfirmStatusChange = () => {
    if (!pendingAction || !pendingMember) {
      return;
    }

    const nextStatus = pendingAction.nextStatus;
    const actionWord = nextStatus === "Active" ? "activated" : "deactivated";

    setMembers((previous) =>
      previous.map((member) =>
        member.id === pendingAction.memberId ? { ...member, status: nextStatus } : member,
      ),
    );

    setPendingAction(null);
    setSuccessMessage(`Sub-member "${pendingMember.fullName}" has been ${actionWord} successfully.`);
  };

  return (
    <SiteShell
      title="Sub Member List"
      kicker="Pages 18-24"
      description="View existing sub-member accounts and manage activate/deactivate status."
    >
      {successMessage ? <SuccessMessage>{successMessage}</SuccessMessage> : null}

      <section className="card-shell overflow-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-100/70 px-4 py-3 sm:px-5">
          <h2 className="inline-flex items-center gap-2 font-heading text-base font-bold text-slate-700">
            <UserGroupIcon className="h-4 w-4 text-slate-600" />
            Sub Member List
          </h2>
          <Link
            href="/sub-member/create"
            className="inline-flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            Create Sub Member
          </Link>
        </header>

        <div className="bg-white px-4 py-4 sm:px-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <label className="inline-flex items-center gap-2">
              <span>Show</span>
              <select className="select-lite h-8 w-[74px]" defaultValue="10" aria-label="Entries per page">
                <option value="10">10</option>
              </select>
              <span>entries</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <span>Search:</span>
              <input
                type="search"
                className="input-lite h-8 w-[170px]"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search sub-member"
              />
            </label>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-[860px] border-collapse">
              <thead>
                <tr>
                  <th className="table-head text-center">#</th>
                  <th className="table-head">Member Code</th>
                  <th className="table-head">FullName</th>
                  <th className="table-head">Email</th>
                  <th className="table-head">NRC</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length ? (
                  filteredMembers.map((member, index) => {
                    const isActive = member.status === "Active";
                    return (
                      <tr key={member.id} className={index % 2 === 0 ? "bg-slate-50/40" : "bg-white"}>
                        <td className="table-cell text-center">{index + 1}</td>
                        <td className="table-cell">{member.memberCode}</td>
                        <td className="table-cell">{member.fullName}</td>
                        <td className="table-cell">{member.email}</td>
                        <td className="table-cell">{member.nrc}</td>
                        <td className="table-cell">{member.status}</td>
                        <td className="table-cell">
                          <button
                            type="button"
                            onClick={() =>
                              setPendingAction({
                                memberId: member.id,
                                nextStatus: isActive ? "Inactive" : "Active",
                              })
                            }
                            className={clsx(
                              "rounded px-3 py-1 text-[11px] font-semibold text-white transition",
                              isActive
                                ? "bg-rose-600 hover:bg-rose-700"
                                : "bg-emerald-600 hover:bg-emerald-700",
                            )}
                          >
                            {isActive ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="table-cell py-5 text-center text-slate-400">
                      No matching sub-member accounts.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <p>
              Showing {filteredMembers.length ? `1 to ${filteredMembers.length}` : "0 to 0"} of {" "}
              {filteredMembers.length} entries
            </p>
            <div className="flex items-center gap-1">
              <button type="button" className="rounded border border-slate-300 px-2 py-1 text-[11px] text-slate-500">
                First
              </button>
              <button type="button" className="rounded border border-slate-300 px-2 py-1 text-[11px] text-slate-500">
                Previous
              </button>
              <button
                type="button"
                className="rounded border border-blue-500 bg-blue-500 px-2.5 py-1 text-[11px] font-semibold text-white"
              >
                1
              </button>
              <button type="button" className="rounded border border-slate-300 px-2 py-1 text-[11px] text-slate-500">
                Next
              </button>
              <button type="button" className="rounded border border-slate-300 px-2 py-1 text-[11px] text-slate-500">
                Last
              </button>
            </div>
          </div>
        </div>
      </section>

      {pendingAction && pendingMember ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="flex items-start gap-3">
              <span
                className={clsx(
                  "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  pendingAction.nextStatus === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700",
                )}
              >
                <ExclamationTriangleIcon className="h-4 w-4" />
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-800">
                  {pendingAction.nextStatus === "Active"
                    ? "Are you sure you want to activate this sub-member?"
                    : "Are you sure you want to deactivate this sub-member?"}
                </p>
                <p className="text-xs text-slate-500">
                  {pendingMember.fullName} ({pendingMember.memberCode})
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPendingAction(null)}
                className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmStatusChange}
                className={clsx(
                  "rounded px-3 py-1.5 text-xs font-semibold text-white transition",
                  pendingAction.nextStatus === "Active"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-rose-600 hover:bg-rose-700",
                )}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </SiteShell>
  );
}
