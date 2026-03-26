"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { PasswordFieldWithToggle, PasswordPolicyChecklist } from "@/components/password-ui";
import { SiteShell } from "@/components/site-shell";
import { SelectField } from "@/components/select-field";
import { getPasswordRuleState, isPasswordPolicySatisfied } from "@/lib/password-policy";

export default function CreateSubMemberPage() {
  const router = useRouter();
  const [nrcMode, setNrcMode] = useState<"nrc" | "old">("nrc");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("IMSubmember@123");
  const [confirmPassword, setConfirmPassword] = useState("IMSubmember@123");
  const passwordRules = useMemo(() => getPasswordRuleState(password), [password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const passwordInput = form.querySelector<HTMLInputElement>('input[name="password"]');
    const confirmInput = form.querySelector<HTMLInputElement>('input[name="confirm-password"]');

    if (!isPasswordPolicySatisfied(password)) {
      if (passwordInput) {
        passwordInput.setCustomValidity("Password must follow all password policy rules.");
        passwordInput.reportValidity();
      }
      return;
    }

    if (password !== confirmPassword) {
      if (confirmInput) {
        confirmInput.setCustomValidity("Confirm password must match password.");
        confirmInput.reportValidity();
      }
      return;
    }

    if (passwordInput) {
      passwordInput.setCustomValidity("");
    }

    if (confirmInput) {
      confirmInput.setCustomValidity("");
    }

    form.reportValidity();
  };

  return (
    <SiteShell
      title="Create Sub-member"
      kicker="Figure: Sub-member form"
      description="Create a sub-member account with profile, NRC, contact, and address information."
    >
      <section className="card-shell overflow-hidden">
        <header className="border-b border-slate-200 bg-slate-100/70 px-4 py-3 sm:px-5">
          <h2 className="inline-flex items-center gap-2 font-heading text-base font-bold text-slate-700">
            <UserIcon className="h-4 w-4 text-slate-600" />
            Sub-Member
          </h2>
        </header>

        <div className="bg-white px-4 py-5 sm:px-6">
          <form className="mx-auto max-w-[760px] space-y-4" onSubmit={handleSubmit}>
            <FormRow label="Full name" required>
              <input className="input-lite" defaultValue="IMSubmember1" minLength={3} required />
            </FormRow>

            <FormRow label="Email" required>
              <input className="input-lite" defaultValue="imsubember1@example.com" type="email" required />
              <p className="mt-1 text-xs text-slate-500">You can use letters &amp; numbers</p>
            </FormRow>

            <FormRow label="Password" required>
              <PasswordFieldWithToggle
                name="password"
                value={password}
                show={showPassword}
                onToggle={() => setShowPassword((previous) => !previous)}
                onChange={setPassword}
                minLength={8}
                required
              />
            </FormRow>

            <FormRow label="Confirm" required>
              <PasswordFieldWithToggle
                name="confirm-password"
                value={confirmPassword}
                show={showConfirmPassword}
                onToggle={() => setShowConfirmPassword((previous) => !previous)}
                onChange={setConfirmPassword}
                minLength={8}
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                Use 8 or more characters with a mix of letters, numbers &amp; symbols
              </p>
              {password.length > 0 ? (
                <div className="mt-2">
                  <PasswordPolicyChecklist rules={passwordRules} />
                </div>
              ) : null}
            </FormRow>

            <FormRow label="Date of Birth" required>
              <div className="relative">
                <input className="input-lite pr-10" defaultValue="31/12/1970" required />
                <CalendarDaysIcon
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
              </div>
            </FormRow>

            <FormRow label="Mobile 1" required>
              <input
                className="input-lite bg-brand-100/40"
                defaultValue="09250191441"
                pattern="[0-9]{6,15}"
                title="Enter 6 to 15 digits."
                required
              />
            </FormRow>

            <FormRow label="Mobile 2">
              <input className="input-lite" />
            </FormRow>

            <FormRow label="Mobile 3">
              <input className="input-lite" />
            </FormRow>

            <FormRow label="NRC">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600">
                  <label className="inline-flex items-center gap-1.5" htmlFor="sub-member-nrc-mode">
                    <input
                      id="sub-member-nrc-mode"
                      className="h-4 w-4 accent-brand-800"
                      type="radio"
                      name="nrc-mode"
                      value="nrc"
                      checked={nrcMode === "nrc"}
                      onChange={() => setNrcMode("nrc")}
                    />
                    NRC
                  </label>
                  <label className="inline-flex items-center gap-1.5" htmlFor="sub-member-old-nrc-mode">
                    <input
                      id="sub-member-old-nrc-mode"
                      className="h-4 w-4 accent-brand-800"
                      type="radio"
                      name="nrc-mode"
                      value="old"
                      checked={nrcMode === "old"}
                      onChange={() => setNrcMode("old")}
                    />
                    Old-Format NRC
                  </label>
                </div>

                <div className={clsx("grid gap-3", nrcMode === "nrc" ? "sm:grid-cols-4" : "hidden")}>
                  <SelectField
                    name="nrc-state-code"
                    defaultValue="12"
                    required={nrcMode === "nrc"}
                    disabled={nrcMode !== "nrc"}
                  >
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                  </SelectField>
                  <SelectField
                    name="nrc-township"
                    defaultValue="AHSANA"
                    required={nrcMode === "nrc"}
                    disabled={nrcMode !== "nrc"}
                  >
                    <option>AHSANA</option>
                    <option>KAMAYA</option>
                    <option>YAKANA</option>
                  </SelectField>
                  <SelectField
                    name="nrc-type"
                    defaultValue="(C)"
                    required={nrcMode === "nrc"}
                    disabled={nrcMode !== "nrc"}
                  >
                    <option>(C)</option>
                    <option>(N)</option>
                    <option>(AC)</option>
                  </SelectField>
                  <input
                    className="input-lite bg-brand-100/40"
                    name="nrc-number"
                    defaultValue="210000"
                    pattern="[0-9]{6}"
                    title="Enter 6 digits."
                    required={nrcMode === "nrc"}
                    disabled={nrcMode !== "nrc"}
                  />
                </div>

                <div className={clsx(nrcMode === "old" ? "block" : "hidden")}>
                  <label className="mb-1 block text-xs font-semibold text-slate-500" htmlFor="old-format-nrc-input">
                    Enter old-format NRC / passport no.
                  </label>
                  <input
                    id="old-format-nrc-input"
                    className="input-lite"
                    name="old-format-nrc"
                    placeholder="Enter old-format NRC / passport no."
                    pattern="[A-Za-z0-9\\-/()]{4,30}"
                    title="Use 4 to 30 characters with letters, numbers, hyphen, slash, or parentheses."
                    required={nrcMode === "old"}
                    disabled={nrcMode !== "old"}
                  />
                </div>
              </div>
            </FormRow>

            <FormRow label="States/Divisions" required>
              <SelectField defaultValue="Yangon Region" name="state-division" required>
                <option>Ayeyarwaddy Region</option>
                <option>Bago Region</option>
                <option>Chin State</option>
                <option>Kachin State</option>
                <option>Kayah State</option>
                <option>Kayin State</option>
                <option>Magway Region</option>
                <option>Yangon Region</option>
                <option>Mandalay Region</option>
                <option>Sagaing Region</option>
                <option>Mon State</option>
                <option>Rakhine State</option>
                <option>Shan State</option>
                <option>Tanintharyi Region</option>
                <option>Nay Pyi Taw</option>
              </SelectField>
            </FormRow>

            <FormRow label="Address" required>
              <textarea
                className="input-lite min-h-[78px] resize-y"
                name="address"
                defaultValue="No 2, Pyay Road, Kamaryut TS, Yangon"
                required
              />
            </FormRow>

            <div className="grid gap-3 pt-2 sm:grid-cols-[170px_1fr]">
              <div />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  className="inline-flex items-center gap-1 rounded bg-slate-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
                  type="button"
                  onClick={() => router.push("/sub-member")}
                >
                  <ArrowLeftIcon className="h-3.5 w-3.5" />
                  Back
                </button>

                <button
                  className="inline-flex items-center gap-1 rounded bg-brand-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-900"
                  type="submit"
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}

function FormRow({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-start gap-2 sm:grid-cols-[170px_1fr] sm:gap-3">
      <label className="pt-2 text-[12px] font-semibold text-slate-600">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </label>
      <div>{children}</div>
    </div>
  );
}
