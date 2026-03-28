import Link from "next/link";
import type { ReactNode } from "react";
import {
  Bars3Icon,
  BellAlertIcon,
  BuildingOffice2Icon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

type SiteShellProps = {
  title: string;
  kicker?: string;
  description?: string;
  children: ReactNode;
};

const topLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/" },
  { label: "How To Apply", href: "/apply-member" },
  { label: "FAQs", href: "/" },
  { label: "Contact", href: "/" },
];

const accountLinks = [
  { label: "Sub-Member", href: "/sub-member" },
  { label: "Profile", href: "/profile" },
  { label: "Change Password", href: "/change-password" },
  { label: "Recommendations", href: "/recommendations" },
  { label: "Payment History", href: "/payment-history" },
];

export function SiteShell({
  title,
  kicker,
  description,
  children,
}: SiteShellProps) {
  return (
    <div className="min-h-screen bg-page-bg">
      <header className="sticky top-0 z-40 border-b border-brand-100/70 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-100 text-brand-800">
              <BuildingOffice2Icon className="h-5 w-5" />
            </span>
            <span className="space-y-0.5">
              <span className="block font-heading text-sm font-extrabold uppercase tracking-[0.14em] text-brand-900">
                Importer
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Member Portal
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {topLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full border border-transparent px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-900">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/search-hs"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-brand-50 hover:text-brand-900"
              aria-label="Search HS">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/recommendations"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-brand-50 hover:text-brand-900"
              aria-label="Notifications">
              <BellAlertIcon className="h-4 w-4" />
            </Link>
            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                <UserCircleIcon className="h-5 w-5 text-brand-800" />
                TestCC
              </button>
              <div className="invisible absolute right-0 top-full z-30 w-48 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-lg border border-slate-200 bg-white p-1 shadow-soft">
                  {accountLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block rounded-md px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button type="button" className="inline-flex sm:hidden">
            <Bars3Icon className="h-6 w-6 text-slate-500" />
          </button>
        </div>
      </header>

      <div className="border-b border-brand-200 top-band">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          {kicker ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">
              {kicker}
            </p>
          ) : null}
          <h1 className="font-heading text-lg font-bold uppercase tracking-[0.12em] text-white sm:text-xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 max-w-4xl text-sm text-slate-100">
              {description}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 rounded border border-white/40 bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
              <HomeIcon className="h-3.5 w-3.5" />
              Dashboard
            </Link>
            <Link
              href="/sub-member"
              className="inline-flex items-center gap-1 rounded border border-white/40 bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
              Sub-member
            </Link>
            <Link
              href="/apply-member"
              className="inline-flex items-center gap-1 rounded border border-white/40 bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
              Apply Member
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <section className="space-y-4">{children}</section>
      </main>
    </div>
  );
}
