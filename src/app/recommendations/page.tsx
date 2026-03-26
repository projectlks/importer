import { ContentCard, MockTable } from "@/components/guide-ui";
import { SiteShell } from "@/components/site-shell";

export default function RecommendationsPage() {
  return (
    <SiteShell
      title="Recommendations"
      kicker="Figure: Recommendation List"
      description="Shows recommendations from respective government agencies of Pa Tha Ka."
    >
      <ContentCard title="Recommendation List">
        <MockTable
          headers={[
            "Recommendation No",
            "Title",
            "Agency",
            "Date",
            "Status",
            "Actions",
          ]}
        />
      </ContentCard>
    </SiteShell>
  );
}
