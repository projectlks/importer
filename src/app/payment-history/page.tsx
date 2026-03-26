import { BanknotesIcon, ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { ContentCard, MockTable } from "@/components/guide-ui";
import { SiteShell } from "@/components/site-shell";

export default function PaymentHistoryPage() {
  return (
    <SiteShell
      title="Payment History"
      kicker="Dashboard Menu"
      description="Payment history module listed under member account menu in dashboard view."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="card-shell p-4">
          <BanknotesIcon className="h-5 w-5 text-brand-900" />
          <p className="mt-2 text-sm font-semibold text-slate-800">Total Payments</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-900">0</p>
        </article>
        <article className="card-shell p-4">
          <ReceiptPercentIcon className="h-5 w-5 text-brand-900" />
          <p className="mt-2 text-sm font-semibold text-slate-800">Outstanding Fees</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-900">0 MMK</p>
        </article>
      </div>

      <ContentCard title="Payment Transaction List">
        <MockTable
          headers={[
            "Invoice No",
            "Payment Type",
            "Amount",
            "Payment Date",
            "MPU Reference",
            "Status",
            "Actions",
          ]}
        />
      </ContentCard>
    </SiteShell>
  );
}
