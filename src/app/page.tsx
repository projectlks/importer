import Link from "next/link";
import {
  ArrowRightIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
  RectangleGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { ContentCard } from "@/components/guide-ui";
import { SiteShell } from "@/components/site-shell";

const modules = [
  {
    title: "Apply Member",
    href: "/apply-member",
    desc: "Registration, payment link, MPU payment, and verification.",
    icon: UserPlusIcon,
  },
  {
    title: "Login & Dashboard",
    href: "/dashboard",
    desc: "Member login and all application status queues.",
    icon: RectangleGroupIcon,
  },
  {
    title: "MPU Payment",
    href: "/payment-form",
    desc: "Payment portal form with OTP and confirmation.",
    icon: CreditCardIcon,
  },
  {
    title: "Search HS Code",
    href: "/search-hs",
    desc: "Search by permit type, section, and HS code type.",
    icon: MagnifyingGlassIcon,
  },
];

export default function HomePage() {
  return (
    <SiteShell
      title="TradeNet 2.0 Member UI"
      kicker="UI Project"
      description="All core screens from the user guide, implemented with your index-style design system."
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <ContentCard title="Home Entry Screen">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-heading text-xl font-extrabold uppercase tracking-[0.08em] text-brand-900">
              Importer Business Network Portal
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Register membership, manage dashboard tasks, search HS code, and process payments.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/login"
                className="rounded-lg bg-brand-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-brand-900"
              >
                Login
              </Link>
              <Link
                href="/apply-member"
                className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-900"
              >
                Register
              </Link>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="Account Menu Items">
          <ul className="grid gap-2 text-sm">
            {[
              "Sub-Member",
              "Profile",
              "Change Password",
              "Recommendations",
              "Payment History",
            ].map((item) => (
              <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </ContentCard>
      </div>

      <ContentCard title="Core Modules">
        <div className="grid gap-3 md:grid-cols-2">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.title}
                href={module.href}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-heading text-sm font-bold uppercase tracking-[0.08em] text-brand-900">
                      {module.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{module.desc}</p>
                  </div>
                  <Icon className="h-5 w-5 text-brand-800" />
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-900">
                  Open Module
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </ContentCard>
    </SiteShell>
  );
}
