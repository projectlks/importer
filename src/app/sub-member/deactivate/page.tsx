import { ContentCard, MockTable, SuccessMessage } from "@/components/guide-ui";
import { SiteShell } from "@/components/site-shell";

export default function DeactivateSubMemberPage() {
  return (
    <SiteShell
      title="To Deactivate a Sub-member Account"
      kicker="Figures: sub-member listing -> confirmation to deactivate -> success message"
      description="Deactivate sub-member and verify status changes from Deactivate to Activate."
    >
      <ContentCard title="Sub-member Listing">
        <MockTable headers={["Sub-member", "Email", "Status", "Last Updated", "Action"]} />
      </ContentCard>

      <div className="grid gap-4 xl:grid-cols-2">
        <ContentCard title="Deactivate Confirmation">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm font-semibold text-rose-800">Are you sure you want to deactivate this sub-member?</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                Cancel
              </button>
              <button className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                OK
              </button>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="Result Status">
          <SuccessMessage>Deactivation successful. Action now shows Activate.</SuccessMessage>
        </ContentCard>
      </div>
    </SiteShell>
  );
}
