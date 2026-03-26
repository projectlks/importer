import { ContentCard, MockTable, SuccessMessage } from "@/components/guide-ui";
import { SiteShell } from "@/components/site-shell";

export default function ActivateSubMemberPage() {
  return (
    <SiteShell
      title="To Activate a Sub-member Account"
      kicker="Figures: sub-member listing -> confirmation to activate -> success message"
      description="Activate sub-member and verify action changes back to Deactivate."
    >
      <ContentCard title="Sub-member Listing">
        <MockTable headers={["Sub-member", "Email", "Status", "Last Updated", "Action"]} />
      </ContentCard>

      <div className="grid gap-4 xl:grid-cols-2">
        <ContentCard title="Activate Confirmation">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">Are you sure you want to activate this sub-member?</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                Cancel
              </button>
              <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                OK
              </button>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="Result Status">
          <SuccessMessage>Activation successful. Action now shows Deactivate.</SuccessMessage>
        </ContentCard>
      </div>
    </SiteShell>
  );
}
