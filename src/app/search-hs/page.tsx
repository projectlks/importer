import { ContentCard, MockTable } from "@/components/guide-ui";
import { SelectField } from "@/components/select-field";
import { SiteShell } from "@/components/site-shell";

export default function SearchHsPage() {
  return (
    <SiteShell
      title="Search HS Code"
      kicker="Figure: Search HS Code"
      description="Trader can search by License/Permit Type, Section, and HS Code Type."
    >
      <ContentCard title="Search Filters">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <SelectField>
            <option>License/Permit Type</option>
            <option>Import License</option>
            <option>Export Permit</option>
          </SelectField>
          <SelectField>
            <option>Section</option>
            <option>Negative List</option>
            <option>No License</option>
          </SelectField>
          <SelectField>
            <option>HS Code Type</option>
            <option>HS 2022</option>
            <option>HS 2017</option>
          </SelectField>
          <input className="input-lite" placeholder="HS Code" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="rounded-lg bg-brand-800 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-brand-900">
            Search
          </button>
          <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 hover:bg-slate-100">
            Reset
          </button>
        </div>
      </ContentCard>

      <ContentCard title="HS Result List">
        <MockTable
          headers={[
            "HS Code",
            "Description",
            "License/Permit Type",
            "Section",
            "Status",
            "Actions",
          ]}
        />
      </ContentCard>
    </SiteShell>
  );
}
