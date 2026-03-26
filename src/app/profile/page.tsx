"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ExclamationTriangleIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { SuccessMessage } from "@/components/guide-ui";
import { SiteShell } from "@/components/site-shell";

type EditMode = "mobile" | "email" | "address" | null;

type ProfileData = {
  memberCode: string;
  fullName: string;
  dateOfBirth: string;
  mobile: string;
  email: string;
  nrc: string;
  unitLevel: string;
  street: string;
  quarterCityTownship: string;
  stateRegion: string;
  country: string;
  postalCode: string;
  validDate: string;
};

type ProfileDraft = {
  mobile: string;
  email: string;
  unitLevel: string;
  street: string;
  quarterCityTownship: string;
  stateRegion: string;
  country: string;
  postalCode: string;
};

const initialProfile: ProfileData = {
  memberCode: "TNM-000010",
  fullName: "Test NN",
  dateOfBirth: "31/12/1977",
  mobile: "09250191441",
  email: "testnn74524@gmail.com",
  nrc: "12/AHSANA(N)210000",
  unitLevel: "2/19/30",
  street: "The Pyay Road, Thuwunna",
  quarterCityTownship: "Thingangyun",
  stateRegion: "Yangon Region",
  country: "MYANMAR",
  postalCode: "",
  validDate: "15/01/2021",
};

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [draft, setDraft] = useState<ProfileDraft>(() => ({
    mobile: initialProfile.mobile,
    email: initialProfile.email,
    unitLevel: initialProfile.unitLevel,
    street: initialProfile.street,
    quarterCityTownship: initialProfile.quarterCityTownship,
    stateRegion: initialProfile.stateRegion,
    country: initialProfile.country,
    postalCode: initialProfile.postalCode,
  }));

  const [editErrorMessage, setEditErrorMessage] = useState<string | null>(null);
  const [profileSuccessMessage, setProfileSuccessMessage] = useState<string | null>(null);
  const [showExtensionConfirm, setShowExtensionConfirm] = useState(false);

  const addressLabel = useMemo(
    () =>
      [
        profile.unitLevel,
        profile.street,
        profile.quarterCityTownship,
        profile.stateRegion,
        profile.country,
      ]
        .filter(Boolean)
        .join(", "),
    [
      profile.country,
      profile.quarterCityTownship,
      profile.stateRegion,
      profile.street,
      profile.unitLevel,
    ],
  );

  const openEditModal = (mode: Exclude<EditMode, null>) => {
    setEditMode(mode);
    setEditErrorMessage(null);
    setProfileSuccessMessage(null);

    setDraft({
      mobile: profile.mobile,
      email: profile.email,
      unitLevel: profile.unitLevel,
      street: profile.street,
      quarterCityTownship: profile.quarterCityTownship,
      stateRegion: profile.stateRegion,
      country: profile.country,
      postalCode: profile.postalCode,
    });
  };

  const closeEditModal = () => {
    setEditMode(null);
    setEditErrorMessage(null);
  };

  const handleSaveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editMode) {
      return;
    }

    if (editMode === "mobile") {
      if (!/^09\d{7,11}$/.test(draft.mobile.trim())) {
        setEditErrorMessage("Mobile must use Myanmar mobile format (example: 09xxxxxxxxx).");
        return;
      }

      setProfile((previous) => ({ ...previous, mobile: draft.mobile.trim() }));
      setProfileSuccessMessage("Mobile information updated successfully.");
      closeEditModal();
      return;
    }

    if (editMode === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
        setEditErrorMessage("Please enter a valid email address.");
        return;
      }

      setProfile((previous) => ({ ...previous, email: draft.email.trim() }));
      setProfileSuccessMessage("Email information updated successfully.");
      closeEditModal();
      return;
    }

    if (
      !draft.street.trim() ||
      !draft.quarterCityTownship.trim() ||
      !draft.stateRegion.trim() ||
      !draft.country.trim()
    ) {
      setEditErrorMessage("Street, Quarter/City/Township, State/Region and Country are required.");
      return;
    }

    setProfile((previous) => ({
      ...previous,
      unitLevel: draft.unitLevel.trim(),
      street: draft.street.trim(),
      quarterCityTownship: draft.quarterCityTownship.trim(),
      stateRegion: draft.stateRegion.trim(),
      country: draft.country.trim(),
      postalCode: draft.postalCode.trim(),
    }));
    setProfileSuccessMessage("Your editing field has been successfully updated.");
    closeEditModal();
  };

  const handleConfirmExtension = () => {
    setShowExtensionConfirm(false);
    router.push("/payment-form");
  };

  return (
    <SiteShell
      title="View Profile and Edit"
      kicker="Pages 14-17"
      description="Profile information in view mode. Click Edit icon to update fields or Apply Extension to continue to MPU payment page."
    >
      <section className="card-shell overflow-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-100/70 px-4 py-3 sm:px-5">
          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-brand-900">
              Your Profile Details
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Click the Edit icon to update mobile, email or address fields.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setProfileSuccessMessage(null);
              setShowExtensionConfirm(true);
            }}
            className="rounded bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            Apply Extension Here
          </button>
        </header>

        <div className="space-y-3 bg-white px-4 py-4 sm:px-5">
          {profileSuccessMessage ? <SuccessMessage>{profileSuccessMessage}</SuccessMessage> : null}

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-[860px] border-collapse">
              <tbody>
                <ProfileRow label="Member Code" value={profile.memberCode} />
                <ProfileRow label="Full Name" value={profile.fullName} />
                <ProfileRow label="Date of Birth" value={profile.dateOfBirth} />
                <ProfileRow
                  label="Mobile"
                  value={profile.mobile}
                  actionLabel="Edit"
                  onActionClick={() => openEditModal("mobile")}
                />
                <ProfileRow
                  label="Email"
                  value={profile.email}
                  actionLabel="Edit"
                  onActionClick={() => openEditModal("email")}
                />
                <ProfileRow label="NRC" value={profile.nrc} />
                <ProfileRow
                  label="Address"
                  value={addressLabel}
                  actionLabel="Edit"
                  onActionClick={() => openEditModal("address")}
                />
                <ProfileRow label="Valid Date" value={profile.validDate} />
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500">
            Note: This Apply Extension button will appear three months before member expire.
          </p>
        </div>
      </section>

      {editMode ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-brand-900">
                {editMode === "address" ? "Edit Member Address Fields" : `Edit ${editMode === "mobile" ? "Mobile" : "Email"}`}
              </h3>
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded border border-slate-300 bg-white p-1 text-slate-500 transition hover:text-slate-700"
                aria-label="Close edit modal"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </header>

            <form className="space-y-4 p-4 sm:p-5" onSubmit={handleSaveProfile}>
              {editErrorMessage ? (
                <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                  {editErrorMessage}
                </p>
              ) : null}

              {editMode === "mobile" ? (
                <LabeledField label="Mobile" required>
                  <input
                    className="input-lite"
                    value={draft.mobile}
                    onChange={(event) => setDraft((previous) => ({ ...previous, mobile: event.target.value }))}
                    placeholder="09xxxxxxxxx"
                    required
                  />
                </LabeledField>
              ) : null}

              {editMode === "email" ? (
                <LabeledField label="Email" required>
                  <input
                    className="input-lite"
                    type="email"
                    value={draft.email}
                    onChange={(event) => setDraft((previous) => ({ ...previous, email: event.target.value }))}
                    placeholder="member@example.com"
                    required
                  />
                </LabeledField>
              ) : null}

              {editMode === "address" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <LabeledField label="Unit Level">
                    <input
                      className="input-lite"
                      value={draft.unitLevel}
                      onChange={(event) =>
                        setDraft((previous) => ({ ...previous, unitLevel: event.target.value }))
                      }
                      placeholder="Unit / level"
                    />
                  </LabeledField>

                  <LabeledField label="Street Number and Street Name" required>
                    <input
                      className="input-lite"
                      value={draft.street}
                      onChange={(event) => setDraft((previous) => ({ ...previous, street: event.target.value }))}
                      placeholder="Street number and name"
                      required
                    />
                  </LabeledField>

                  <LabeledField label="Quarter/City/Township" required>
                    <input
                      className="input-lite"
                      value={draft.quarterCityTownship}
                      onChange={(event) =>
                        setDraft((previous) => ({ ...previous, quarterCityTownship: event.target.value }))
                      }
                      placeholder="Quarter / city / township"
                      required
                    />
                  </LabeledField>

                  <LabeledField label="State/Region" required>
                    <input
                      className="input-lite"
                      value={draft.stateRegion}
                      onChange={(event) =>
                        setDraft((previous) => ({ ...previous, stateRegion: event.target.value }))
                      }
                      placeholder="State / region"
                      required
                    />
                  </LabeledField>

                  <LabeledField label="Country" required>
                    <input
                      className="input-lite"
                      value={draft.country}
                      onChange={(event) =>
                        setDraft((previous) => ({ ...previous, country: event.target.value }))
                      }
                      placeholder="Country"
                      required
                    />
                  </LabeledField>

                  <LabeledField label="Postal Code">
                    <input
                      className="input-lite"
                      value={draft.postalCode}
                      onChange={(event) =>
                        setDraft((previous) => ({ ...previous, postalCode: event.target.value }))
                      }
                      placeholder="Postal code"
                    />
                  </LabeledField>
                </div>
              ) : null}

              <div className="flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-brand-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-900"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {showExtensionConfirm ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 text-center shadow-2xl">
            <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-300 bg-amber-50 text-amber-600">
              <ExclamationTriangleIcon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-sm font-semibold text-slate-800">Are you sure to Extension?</p>

            <div className="mt-4 flex justify-center gap-2">
              <button
                type="button"
                onClick={handleConfirmExtension}
                className="rounded bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setShowExtensionConfirm(false)}
                className="rounded bg-rose-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </SiteShell>
  );
}

function ProfileRow({
  label,
  value,
  actionLabel,
  onActionClick,
}: {
  label: string;
  value: string;
  actionLabel?: string;
  onActionClick?: () => void;
}) {
  return (
    <tr className="border-b border-slate-200 last:border-b-0">
      <th className="w-[210px] bg-slate-50 px-4 py-3 text-left text-xs font-semibold text-slate-600">{label}</th>
      <td className="px-4 py-3 text-sm leading-6 text-slate-700">{value}</td>
      <td className="w-[120px] px-4 py-3 text-right">
        {actionLabel && onActionClick ? (
          <button
            type="button"
            onClick={onActionClick}
            className="inline-flex items-center gap-1 whitespace-nowrap rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
          >
            <PencilSquareIcon className="h-3.5 w-3.5" />
            {actionLabel}
          </button>
        ) : (
          <span className="text-xs text-slate-300">-</span>
        )}
      </td>
    </tr>
  );
}

function LabeledField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="space-y-1 text-xs font-semibold text-slate-600">
      <span>
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </span>
      {children}
    </label>
  );
}
