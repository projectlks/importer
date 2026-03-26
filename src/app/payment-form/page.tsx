"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition-colors duration-200 focus:border-brand-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-800/20";

const selectClass =
  "w-full appearance-none rounded-lg border border-slate-300 bg-slate-50 px-3 py-3 pr-10 text-sm text-slate-700 transition-colors duration-200 focus:border-brand-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-800/20";

export default function PaymentFormPage() {
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("9503051881696732");
  const [expiryMonth, setExpiryMonth] = useState("01");
  const [expiryYear, setExpiryYear] = useState("2026");
  const [otp, setOtp] = useState("960974");
  const [otpMessage, setOtpMessage] = useState<string | null>(null);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  const handleGetOtp = () => {
    if (!cardNumber.trim()) {
      setOtpMessage("Please enter card number first.");
      return;
    }

    setOtpMessage("OTP has been sent to your registered mobile and email.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    setPaymentMessage("Payment confirmation submitted successfully.");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 antialiased">
      <main className="px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto w-full max-w-5xl space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="border-b border-slate-100 pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Member Registration</p>
              <h1 className="mt-2 font-heading text-2xl font-bold text-brand-900">MPU Payment Portal</h1>
            </div>

            <div className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[210px_1fr]">
              <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-4 text-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Myanmar</p>
                  <p className="font-heading text-3xl font-extrabold text-brand-900">TradeNet</p>
                </div>
              </div>

              <div className="space-y-3">
                <InfoRow label="Merchant Name" value="Myanmar Tradenet Test" />
                <InfoRow label="Product Description" value="Member Registration Fees" />
                <InfoRow label="Invoice Number" value="TNM23102014501100000" />
                <InfoRow label="Amount" value="15,345.53 MMK" emphasized />
              </div>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="card-number" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Card Number *
                </label>
                <input
                  id="card-number"
                  type="text"
                  value={cardNumber}
                  onChange={(event) => {
                    setCardNumber(event.target.value);
                    setPaymentMessage(null);
                  }}
                  className={fieldClass}
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="expiry-month" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Expiry Month *
                  </label>
                  <div className="relative">
                    <select
                      id="expiry-month"
                      className={selectClass}
                      value={expiryMonth}
                      onChange={(event) => {
                        setExpiryMonth(event.target.value);
                        setPaymentMessage(null);
                      }}
                      required
                    >
                      {Array.from({ length: 12 }, (_, index) => {
                        const value = String(index + 1).padStart(2, "0");
                        return (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="expiry-year" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Expiry Year *
                  </label>
                  <div className="relative">
                    <select
                      id="expiry-year"
                      className={selectClass}
                      value={expiryYear}
                      onChange={(event) => {
                        setExpiryYear(event.target.value);
                        setPaymentMessage(null);
                      }}
                      required
                    >
                      {Array.from({ length: 10 }, (_, index) => {
                        const year = String(2026 + index);
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_150px]">
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    OTP Code *
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(event) => {
                      setOtp(event.target.value);
                      setPaymentMessage(null);
                    }}
                    className={fieldClass}
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={handleGetOtp}
                  className="mt-auto rounded-lg border border-slate-300 bg-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-700 transition-colors duration-200 hover:bg-slate-300"
                >
                  Get OTP
                </button>
              </div>

              {otpMessage ? <p className="text-sm font-medium text-emerald-600">{otpMessage}</p> : null}
              {paymentMessage ? <p className="text-sm font-medium text-blue-700">{paymentMessage}</p> : null}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/profile")}
                  className="rounded-lg border border-slate-300 bg-slate-200 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition-colors duration-200 hover:bg-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg border border-brand-800 bg-brand-800 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:border-brand-900 hover:bg-brand-900"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

function InfoRow({
  label,
  value,
  emphasized,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[220px_1fr]">
      <p className="text-sm font-semibold text-slate-600">{label} :</p>
      <p className={emphasized ? "text-lg font-extrabold text-brand-900" : "text-sm font-bold text-slate-900"}>
        {value}
      </p>
    </div>
  );
}
