"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import clsx from "clsx";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  KeyIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { ContentCard } from "@/components/guide-ui";
import { PasswordFieldWithToggle, PasswordPolicyChecklist } from "@/components/password-ui";
import { SiteShell } from "@/components/site-shell";
import { getPasswordRuleState, isPasswordPolicySatisfied } from "@/lib/password-policy";

type RecoveryStep = 1 | 2 | 3;

const demoVerificationCode = "246810";

const recoverySteps: { id: RecoveryStep; title: string }[] = [
  { id: 1, title: "Verify Email" },
  { id: 2, title: "Check Code" },
  { id: 3, title: "Set New Password" },
];

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<RecoveryStep>(1);
  const [email, setEmail] = useState("");
  const [issuedCode, setIssuedCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRules = useMemo(() => getPasswordRuleState(password), [password]);

  const handleSendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    setIssuedCode(demoVerificationCode);
    setVerificationCode("");
    setStep(2);
    setErrorMessage(null);
    setInfoMessage(`Verification code was sent to ${email}. Demo code: ${demoVerificationCode}`);
  };

  const handleVerifyCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    if (verificationCode.trim() !== issuedCode) {
      setErrorMessage("Verification code is incorrect.");
      return;
    }

    setStep(3);
    setErrorMessage(null);
    setInfoMessage("Verification successful. Please set a new password.");
  };

  const handleResetPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    if (!isPasswordPolicySatisfied(password)) {
      setErrorMessage("Password must satisfy all password policy rules.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Confirm password must match password.");
      return;
    }

    setErrorMessage(null);
    router.push("/login?reset=1");
  };

  return (
    <SiteShell
      title="Forgot Password"
      kicker="Pages 7-10"
      description="Recover password in three clear steps: email verification, code verification, and password reset."
    >
      <div className="mx-auto w-full max-w-3xl">
        <ContentCard title="Password Recovery" subtitle="Follow each step to reset your account password.">
          <div className="space-y-6">
            <ol className="grid gap-3 sm:grid-cols-3">
              {recoverySteps.map((item) => {
                const reached = step >= item.id;
                const current = step === item.id;
                return (
                  <li
                    key={item.id}
                    className={clsx(
                      "rounded-xl border p-3",
                      current
                        ? "border-brand-800 bg-brand-50"
                        : reached
                          ? "border-emerald-200 bg-emerald-50/60"
                          : "border-slate-200 bg-slate-50",
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={clsx(
                          "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                          current
                            ? "bg-brand-800 text-white"
                            : reached
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-300 text-slate-700",
                        )}
                      >
                        {item.id}
                      </span>
                      <div className="text-left">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                          Step {item.id}
                        </p>
                        <p
                          className={clsx(
                            "text-sm font-semibold",
                            current
                              ? "text-brand-900"
                              : reached
                                ? "text-emerald-700"
                                : "text-slate-500",
                          )}
                        >
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {infoMessage ? (
              <p className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                {infoMessage}
              </p>
            ) : null}

            {errorMessage ? (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                {errorMessage}
              </p>
            ) : null}

            {step === 1 ? (
              <form className="space-y-4" onSubmit={handleSendEmail}>
                <p className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  <EnvelopeIcon className="h-3.5 w-3.5 text-brand-800" />
                  Step 1: Verify your registered email
                </p>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Registered Email Address
                  </label>
                  <input
                    className="input-lite h-10"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setErrorMessage(null);
                    }}
                    placeholder="Enter your registered email"
                    required
                  />
                  <p className="text-xs text-slate-500">Email address must be the same as registered email.</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-brand-800"
                  >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    Back to Login
                  </Link>
                  <button
                    className="rounded-lg bg-brand-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-brand-900"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
            ) : null}

            {step === 2 ? (
              <form className="space-y-4" onSubmit={handleVerifyCode}>
                <p className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  <KeyIcon className="h-3.5 w-3.5 text-brand-800" />
                  Step 2: Enter verification code
                </p>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Verification Code
                  </label>
                  <input
                    className="input-lite h-10"
                    value={verificationCode}
                    onChange={(event) => {
                      setVerificationCode(event.target.value.replace(/[^0-9]/g, ""));
                      setErrorMessage(null);
                    }}
                    placeholder="Enter 6-digit verification code"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-slate-500">Copy verification code from your email and click Next.</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setErrorMessage(null);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-brand-800"
                  >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    Back
                  </button>
                  <button
                    className="rounded-lg bg-brand-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-brand-900"
                    type="submit"
                  >
                    Next
                  </button>
                </div>
              </form>
            ) : null}

            {step === 3 ? (
              <form className="space-y-4" onSubmit={handleResetPassword}>
                <p className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  <ShieldCheckIcon className="h-3.5 w-3.5 text-brand-800" />
                  Step 3: Set your new password
                </p>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">New Password</label>
                  <PasswordFieldWithToggle
                    value={password}
                    show={showPassword}
                    onToggle={() => setShowPassword((previous) => !previous)}
                    onChange={(value) => {
                      setPassword(value);
                      setErrorMessage(null);
                    }}
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Confirm Password
                  </label>
                  <PasswordFieldWithToggle
                    value={confirmPassword}
                    show={showConfirmPassword}
                    onToggle={() => setShowConfirmPassword((previous) => !previous)}
                    onChange={(value) => {
                      setConfirmPassword(value);
                      setErrorMessage(null);
                    }}
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                {password.length > 0 ? (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Password Policy</p>
                    <PasswordPolicyChecklist rules={passwordRules} />
                  </div>
                ) : null}

                <p className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                  <ShieldCheckIcon className="h-3.5 w-3.5" />
                  <span>After reset, you will be redirected to Login page.</span>
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(2);
                      setErrorMessage(null);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-brand-800"
                  >
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                    Back
                  </button>
                  <button
                    className="rounded-lg bg-brand-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-brand-900"
                    type="submit"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            ) : null}
          </div>
        </ContentCard>
      </div>
    </SiteShell>
  );
}
