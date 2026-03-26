"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { SelectField } from "@/components/select-field";
import { getPasswordRuleState, isPasswordPolicySatisfied } from "@/lib/password-policy";

type AuthTab = "login" | "register";
type RegisterStep = 1 | 2 | 3;
type NrcMode = "nrc" | "old";

type Props = {
  initialTab?: AuthTab;
  showResetSuccess?: boolean;
};

const stepTitleMap: Record<RegisterStep, string> = {
  1: "ACCOUNT INFORMATION",
  2: "COMPLETE YOUR PERSONAL INFORMATION",
  3: "ADDRESS INFORMATION",
};

export function AuthExperience({ initialTab = "login", showResetSuccess = false }: Props) {
  const router = useRouter();

  const [tab, setTab] = useState<AuthTab>(initialTab);
  const [step, setStep] = useState<RegisterStep>(1);
  const [nrcMode, setNrcMode] = useState<NrcMode>("nrc");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirm, setShowRegisterConfirm] = useState(false);

  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [registerStepOneError, setRegisterStepOneError] = useState<string | null>(null);

  const passwordRules = useMemo(() => getPasswordRuleState(registerPassword), [registerPassword]);

  const openTab = (nextTab: AuthTab) => {
    setTab(nextTab);
    if (nextTab === "register") {
      setStep(1);
    }
    setRegisterStepOneError(null);
  };

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    router.push("/dashboard");
  };

  const handleRegisterStepOneSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    if (!isPasswordPolicySatisfied(registerPassword)) {
      setRegisterStepOneError("Password must follow all password policy rules.");
      return;
    }

    if (registerPassword !== registerConfirm) {
      setRegisterStepOneError("Confirm password must match password.");
      return;
    }

    setRegisterStepOneError(null);
    setStep(2);
  };

  const handleRegisterFinalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    router.push("/payment-form");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 antialiased">
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2 sm:px-6">
              <a className="inline-flex flex-col" href="#">
                <span className="font-heading text-[0.84rem] font-extrabold uppercase tracking-[0.045em] text-brand-900">
                  Importer
                </span>
                <span className="font-heading text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Business Network Portal
                </span>
              </a>

              <div className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 p-0.5">
                <button
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] transition ${
                    tab === "login" ? "bg-brand-800 text-white shadow-sm" : "text-slate-500 hover:bg-brand-100"
                  }`}
                  onClick={() => openTab("login")}
                  type="button"
                >
                  Login
                </button>
                <button
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] transition ${
                    tab === "register"
                      ? "bg-brand-800 text-white shadow-sm"
                      : "text-slate-500 hover:bg-brand-100"
                  }`}
                  onClick={() => openTab("register")}
                  type="button"
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-brand-800 to-brand-900">
            <div className="mx-auto flex min-h-[64px] max-w-7xl items-center justify-between gap-3 px-5 sm:px-6">
              <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary navigation">
                <a className="rounded-full border border-white/80 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-900" href="#">
                  Home
                </a>
                <a className="rounded-full border border-transparent px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/90 hover:bg-white/20" href="#">
                  About Us
                </a>
                <a className="rounded-full border border-transparent px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/90 hover:bg-white/20" href="#">
                  How To Apply
                </a>
                <a className="rounded-full border border-transparent px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/90 hover:bg-white/20" href="#">
                  FAQs
                </a>
                <a className="rounded-full border border-transparent px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/90 hover:bg-white/20" href="#">
                  Contact
                </a>
              </nav>

              <form className="hidden lg:flex" role="search" aria-label="Site search">
                <input
                  className="h-9 w-[220px] rounded-full border border-white/40 bg-white/15 px-4 text-xs font-semibold tracking-[0.04em] text-white placeholder:text-white/75 focus:border-white/80 focus:bg-white/25 focus:outline-none"
                  placeholder="Search..."
                  type="search"
                />
              </form>
            </div>
          </div>
        </header>

        <main className="relative flex-1 px-6 py-12">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand-100 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-slate-200/50 blur-3xl" />
          </div>

          <div className="mx-auto w-full max-w-7xl">
            <div className="grid border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] lg:grid-cols-[0.85fr_1.15fr]">
              <aside className="space-y-8 bg-slate-50 px-8 py-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Importer SSO</p>
                  <h1 className="mt-2 text-2xl font-semibold text-brand-900">Importer Login</h1>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Importer members can sign in to continue license applications, or register a new member
                    account.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">How It Works</p>
                  <ul className="space-y-4 text-sm text-slate-700">
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-600">
                        1
                      </span>
                      <span>Existing importer members can log in to access online services.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-600">
                        2
                      </span>
                      <span>After login, users can start and track import license application processes.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-600">
                        3
                      </span>
                      <span>New users can register first to become an importer member.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Support</p>
                  <p className="mt-2">Need help? Contact your organization administrator for account assistance.</p>
                </div>
              </aside>

              <section className="px-8 py-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {tab === "login" ? "Access" : "Register Membership"}
                  </p>
                  {tab === "login" ? (
                    <h2 className="mt-2 text-xl font-semibold text-slate-800">Welcome Back</h2>
                  ) : (
                    <p className="mt-2 text-sm text-slate-600">Please fill in the following information.</p>
                  )}
                </div>

                <div className="mt-8 space-y-6">
                  {tab === "login" ? (
                    <form className="space-y-5" onSubmit={handleLoginSubmit}>
                      <p className="text-sm text-slate-600">Please sign in with your registered email address.</p>
                      {showResetSuccess ? (
                        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                          Password reset completed. Please log in with your new password.
                        </p>
                      ) : null}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Email</label>
                        <input className="input-lite" placeholder="Enter email" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            className="input-lite pr-16"
                            placeholder="Enter password"
                            type={showLoginPassword ? "text" : "password"}
                            required
                          />
                          <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs text-slate-500 hover:bg-brand-50 hover:text-brand-800"
                            type="button"
                            onClick={() => setShowLoginPassword((v) => !v)}
                            aria-label={showLoginPassword ? "Hide password" : "Show password"}
                          >
                            {showLoginPassword ? (
                              <EyeSlashIcon className="h-4 w-4" />
                            ) : (
                              <EyeIcon className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <button className="w-full rounded-lg border border-brand-800 bg-brand-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-900">
                        Log in
                      </button>
                      <div className="text-sm text-slate-600">
                        <Link className="font-semibold text-brand-800" href="/forgot-password">
                          Forgot your password?
                        </Link>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex w-full flex-col items-center gap-3">
                        <span className="text-base font-semibold uppercase tracking-[0.12em] text-brand-800 sm:text-lg">
                          {stepTitleMap[step]}
                        </span>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3].map((s) => (
                            <div key={s} className="h-2 w-14 overflow-hidden rounded-full bg-slate-200">
                              <span className={`block h-full rounded-full bg-gradient-to-r from-brand-800 to-brand-900 transition-all duration-300 ${s <= step ? "w-full" : "w-0"}`} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {step === 1 ? (
                        <form className="space-y-5" onSubmit={handleRegisterStepOneSubmit}>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                Full Name *
                              </label>
                              <input className="input-lite" placeholder="Enter full name" required minLength={3} />
                              <p className="text-xs text-slate-500">Do not enter company name.</p>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                Email *
                              </label>
                              <input
                                className="input-lite"
                                placeholder="Enter a valid email address"
                                type="email"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                Password *
                              </label>
                              <div className="relative">
                                <input
                                  className="input-lite pr-16"
                                  placeholder="Enter a password"
                                  type={showRegisterPassword ? "text" : "password"}
                                  value={registerPassword}
                                  onChange={(e) => {
                                    setRegisterPassword(e.target.value);
                                    setRegisterStepOneError(null);
                                  }}
                                  required
                                />
                                <button
                                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs text-slate-500 hover:bg-brand-50 hover:text-brand-800"
                                  type="button"
                                  onClick={() => setShowRegisterPassword((v) => !v)}
                                  aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                                >
                                  {showRegisterPassword ? (
                                    <EyeSlashIcon className="h-4 w-4" />
                                  ) : (
                                    <EyeIcon className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                              {registerPassword.length > 0 ? (
                                <ul className="space-y-1 text-xs">
                                  {passwordRules.map((rule) => (
                                    <li
                                      key={rule.label}
                                      className={`flex items-center justify-between gap-3 ${rule.valid ? "text-emerald-600" : "text-rose-500"}`}
                                    >
                                      <span className="flex items-center gap-2">
                                        <span
                                          className={`h-1.5 w-1.5 rounded-full ${rule.valid ? "bg-emerald-500" : "bg-rose-400"}`}
                                        />
                                        <span>{rule.label}</span>
                                      </span>
                                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                                        {rule.valid ? "OK" : "Need"}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                Confirm Password *
                              </label>
                              <div className="relative">
                                <input
                                  className="input-lite pr-16"
                                  placeholder="Confirm your password"
                                  type={showRegisterConfirm ? "text" : "password"}
                                  value={registerConfirm}
                                  onChange={(e) => {
                                    setRegisterConfirm(e.target.value);
                                    setRegisterStepOneError(null);
                                  }}
                                  required
                                />
                                <button
                                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs text-slate-500 hover:bg-brand-50 hover:text-brand-800"
                                  type="button"
                                  onClick={() => setShowRegisterConfirm((v) => !v)}
                                  aria-label={showRegisterConfirm ? "Hide password" : "Show password"}
                                >
                                  {showRegisterConfirm ? (
                                    <EyeSlashIcon className="h-4 w-4" />
                                  ) : (
                                    <EyeIcon className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                              <p className="text-xs text-slate-500">Must match the password above.</p>
                              {registerConfirm && registerConfirm !== registerPassword ? (
                                <p className="text-xs text-rose-500">Passwords do not match.</p>
                              ) : null}
                            </div>
                          </div>

                          {registerStepOneError ? (
                            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                              {registerStepOneError}
                            </p>
                          ) : null}

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <button
                              className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-brand-800"
                              type="button"
                              onClick={() => openTab("login")}
                            >
                              Back to Login
                            </button>
                            <button className="rounded-lg border border-brand-800 bg-brand-800 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand-900" type="submit">
                              Next
                            </button>
                          </div>
                        </form>
                      ) : null}

                      {step === 2 ? (
                        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                              Step 2 - Complete your personal information
                            </p>
                            <p className="text-sm text-slate-600">
                              Thank you for filling out step (1). Please continue to the next step to complete the registration process.
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Mobile 1 (For SMS) *</label>
                              <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
                                <SelectField defaultValue="+95" required>
                                  <option value="+95">+95 (MM)</option>
                                  <option value="+65">+65 (SG)</option>
                                  <option value="+66">+66 (TH)</option>
                                  <option value="+44">+44 (UK)</option>
                                  <option value="+1">+1 (US)</option>
                                </SelectField>
                                <input className="input-lite" placeholder="Enter phone number" required />
                              </div>
                              <p className="text-xs text-slate-500">Enter valid mobile format.</p>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                Mobile 2 / Office Phone No (Optional)
                              </label>
                              <input className="input-lite" placeholder="Enter office phone number" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">NRC</p>
                            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                              <label className="flex items-center gap-2">
                                <input className="h-4 w-4 accent-brand-800" type="radio" checked={nrcMode === "nrc"} onChange={() => setNrcMode("nrc")} />
                                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">NRC</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <input className="h-4 w-4 accent-brand-800" type="radio" checked={nrcMode === "old"} onChange={() => setNrcMode("old")} />
                                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">Old-Format NRC / Passport No.</span>
                              </label>
                            </div>
                            {nrcMode === "nrc" ? (
                              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                <input className="input-lite" placeholder="- Select -" />
                                <input className="input-lite" placeholder="- Select -" />
                                <input className="input-lite" placeholder="- Select -" />
                                <input className="input-lite" placeholder="Enter NRC number" />
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Old-Format NRC / Passport No.</label>
                                <input className="input-lite" placeholder="Enter NRC number" />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <button className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-brand-800" type="button" onClick={() => setStep(1)}>
                              Back
                            </button>
                            <button className="rounded-lg border border-brand-800 bg-brand-800 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand-900" type="submit">
                              Next
                            </button>
                          </div>
                        </form>
                      ) : null}

                      {step === 3 ? (
                        <form className="space-y-5" onSubmit={handleRegisterFinalSubmit}>
                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                              Step 3 - Address Information
                            </p>
                            <p className="text-sm text-slate-600">
                              Please provide your address and location details to complete registration.
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Unit Level</label>
                              <input className="input-lite" placeholder="Enter unit level" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Street Number and Street Name *</label>
                              <input className="input-lite" placeholder="Enter Street Number and Street Name" required />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Quarter / City / Township *</label>
                              <input className="input-lite" placeholder="Enter Quarter/City/Township" required />
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                              <SelectField required defaultValue="">
                                <option value="">Select State/Region</option>
                                <option>Ayeyarwaddy Region</option>
                                <option>Bago Region</option>
                                <option>Chin State</option>
                                <option>Kachin State</option>
                                <option>Kayin State</option>
                                <option>Mandalay Region</option>
                                <option>Mon State</option>
                                <option>Rakhine State</option>
                                <option>Sagaing Region</option>
                                <option>Shan State</option>
                                <option>Tanintharyi Region</option>
                                <option>Yangon Region</option>
                              </SelectField>
                              <SelectField required defaultValue="">
                                <option value="">Select Country</option>
                                <option>Myanmar</option>
                                <option>ASEAN</option>
                                <option>Non-ASEAN</option>
                                <option>United States of America</option>
                              </SelectField>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Postal Code</label>
                              <input className="input-lite" placeholder="Enter postal code" />
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <button className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-brand-800" type="button" onClick={() => setStep(2)}>
                              Back
                            </button>
                            <button className="rounded-lg border border-brand-800 bg-brand-800 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand-900" type="submit">
                              Register
                            </button>
                          </div>
                        </form>
                      ) : null}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </main>

        <footer className="bg-brand-950">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-slate-200">
            <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-200">
              <a className="font-semibold text-white hover:text-brand-100" href="#">
                Terms and Conditions
              </a>
              <span className="text-slate-400">|</span>
              <a className="font-semibold text-white hover:text-brand-100" href="#">
                Privacy Policy
              </a>
              <span className="text-slate-400">|</span>
              <a className="font-semibold text-white hover:text-brand-100" href="#">
                Support Center
              </a>
            </div>
            <p className="mt-3 text-slate-300">Copyright 2026. Importer Business Network Portal, Ministry of Commerce.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
