import {
  BanknotesIcon,
  BellAlertIcon,
  CheckBadgeIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { ContentCard, MockTable, TagMetric } from "@/components/guide-ui";
import { SiteShell } from "@/components/site-shell";

export default function DashboardPage() {
  return (
    <SiteShell
      title="Member Dashboard"
      kicker="Figure: Dashboard"
      description="Member/Sub-member can view all updated status process from dashboard lists."
    >
      <div className="card-shell p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-brand-50 hover:text-brand-900">
              <RectangleStackIcon className="h-4 w-4" />
            </button>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-brand-50 hover:text-brand-900">
              <BanknotesIcon className="h-4 w-4" />
            </button>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-brand-50 hover:text-brand-900">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </button>
          </div>
          <button className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-900">
            Apply Cards
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="relative">
          <TagMetric title="Make Payment" value="0" colorClass="bg-card-red" />
          <BanknotesIcon className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-white/80" />
        </div>
        <div className="relative">
          <TagMetric title="Message from MOC" value="0" colorClass="bg-card-cyan" />
          <BellAlertIcon className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-white/80" />
        </div>
        <div className="relative">
          <TagMetric title="In Progress" value="0" colorClass="bg-card-amber" />
          <ClockIcon className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-white/80" />
        </div>
        <div className="relative">
          <TagMetric title="Completed" value="0" colorClass="bg-card-green" />
          <CheckBadgeIcon className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-white/80" />
        </div>
      </div>

      <ContentCard title="Make Payment List">
        <MockTable
          headers={[
            "Form Type",
            "Application Type",
            "Application No",
            "Date",
            "Status/Message",
            "Created By",
            "Actions",
          ]}
        />
      </ContentCard>

      <ContentCard title="Message from MOC List">
        <MockTable
          headers={[
            "Form Type",
            "Application Type",
            "Application No",
            "Date",
            "Status/Message",
            "Created By",
            "Actions",
          ]}
        />
      </ContentCard>

      <ContentCard title="In Progress List">
        <MockTable
          headers={[
            "Form Type",
            "Application Type",
            "Application No",
            "Date",
            "Status/Message",
            "Created By",
            "Actions",
          ]}
        />
      </ContentCard>

      <ContentCard title="Completed List">
        <MockTable
          headers={["Form Type", "Application Type", "Licence/Permit/Card No", "Issued Date", "Actions"]}
        />
      </ContentCard>
    </SiteShell>
  );
}
