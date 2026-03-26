"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ContentCard, SuccessMessage } from "@/components/guide-ui";
import { PasswordFieldWithToggle, PasswordPolicyChecklist } from "@/components/password-ui";
import { SiteShell } from "@/components/site-shell";
import { getPasswordRuleState, isPasswordPolicySatisfied } from "@/lib/password-policy";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const passwordRules = useMemo(() => getPasswordRuleState(newPassword), [newPassword]);

  useEffect(() => {
    if (!showSuccess) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowSuccess(false);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [showSuccess]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    if (!isPasswordPolicySatisfied(newPassword)) {
      setErrorMessage("New password must satisfy all password policy rules.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Confirm password must match new password.");
      return;
    }

    if (currentPassword === newPassword) {
      setErrorMessage("New password must be different from current password.");
      return;
    }

    setErrorMessage(null);
    setShowSuccess(true);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  return (
    <SiteShell
      title="Change Password"
      kicker="Figure: Member account menu -> Change Password"
      description="Enter current password, set a new password, and confirm to save changes."
    >
      <div className="mx-auto w-full max-w-4xl">
        <ContentCard title="Change Password" subtitle="Use the same password policy as register and forgot-password flow.">
          <div className="space-y-4">
            {showSuccess ? <SuccessMessage>Password updated successfully.</SuccessMessage> : null}

            {errorMessage ? (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                {errorMessage}
              </p>
            ) : null}

            <form className="grid gap-4 lg:grid-cols-[1fr_0.95fr]" onSubmit={handleSubmit}>
              <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
                <FieldLabel htmlFor="current-password">Current Password</FieldLabel>
                <PasswordFieldWithToggle
                  id="current-password"
                  value={currentPassword}
                  show={showCurrent}
                  onToggle={() => setShowCurrent((previous) => !previous)}
                  onChange={(value) => {
                    setCurrentPassword(value);
                    setErrorMessage(null);
                  }}
                  placeholder="Enter current password"
                  required
                />

                <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                <PasswordFieldWithToggle
                  id="new-password"
                  value={newPassword}
                  show={showNew}
                  onToggle={() => setShowNew((previous) => !previous)}
                  onChange={(value) => {
                    setNewPassword(value);
                    setErrorMessage(null);
                  }}
                  placeholder="Enter new password"
                  required
                />

                <FieldLabel htmlFor="confirm-password">Confirm New Password</FieldLabel>
                <PasswordFieldWithToggle
                  id="confirm-password"
                  value={confirmPassword}
                  show={showConfirm}
                  onToggle={() => setShowConfirm((previous) => !previous)}
                  onChange={(value) => {
                    setConfirmPassword(value);
                    setErrorMessage(null);
                  }}
                  placeholder="Confirm new password"
                  required
                />

                {confirmPassword && confirmPassword !== newPassword ? (
                  <p className="text-xs font-semibold text-rose-500">Confirm password does not match.</p>
                ) : null}

                <div className="pt-1">
                  <button
                    className="w-full rounded-lg bg-brand-800 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-brand-900"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <aside className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Password Policy</p>
                <p className="mt-1 text-xs text-slate-600">New password must satisfy all conditions below.</p>
                <div className="mt-3">
                  <PasswordPolicyChecklist rules={passwordRules} />
                </div>
              </aside>
            </form>
          </div>
        </ContentCard>
      </div>
    </SiteShell>
  );
}

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
      {children}
    </label>
  );
}
