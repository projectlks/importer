import Link from "next/link";
import { ContentCard, SuccessMessage } from "@/components/guide-ui";
import { SelectField } from "@/components/select-field";
import { SiteShell } from "@/components/site-shell";

export default function MemberExtensionPage() {
  return (
    <SiteShell
      title="Member Extension"
      kicker="Figure: Member extension + MPU payment portal"
      description="Apply extension from profile and continue to MPU payment."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <ContentCard title="Profile Extension Panel">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">Member Expiry Date: 2026-09-30</p>
            <p className="mt-1 text-sm text-slate-600">
              Apply Extension button appears three months before member expire.
            </p>
            <button className="mt-3 rounded-lg bg-brand-800 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
              Apply Extension
            </button>
          </div>

          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-800">Confirmation</p>
            <p className="mt-1 text-sm text-slate-600">If you sure, click Yes button to continue.</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                No
              </button>
              <button className="rounded-lg bg-brand-800 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                Yes
              </button>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="MPU Online Payment">
          <p className="text-sm text-slate-600">After click Yes, below MPU online payment screen appears.</p>
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="input-lite" defaultValue="TNM-EXT-0000001" />
              <input className="input-lite" defaultValue="15,345.53 MMK" />
              <input className="input-lite sm:col-span-2" placeholder="Card Number" />
              <SelectField>
                <option>Expiry Month</option>
                <option>01</option>
              </SelectField>
              <SelectField>
                <option>Expiry Year</option>
                <option>2026</option>
              </SelectField>
              <input className="input-lite" placeholder="OTP" />
              <button className="rounded-lg border border-slate-300 bg-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">
                Get OTP
              </button>
            </div>
            <div className="mt-3 flex justify-end">
              <button className="rounded-lg bg-brand-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                Confirm Payment
              </button>
            </div>
          </div>

          <div className="mt-3">
            <SuccessMessage>Extension payment process is ready.</SuccessMessage>
          </div>
          <Link href="/payment-form" className="mt-3 inline-block text-xs font-semibold text-brand-800 underline-offset-2 hover:underline">
            Open full MPU Payment UI
          </Link>
        </ContentCard>
      </div>
    </SiteShell>
  );
}
