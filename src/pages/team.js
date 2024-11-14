import BackgroundWrapper from "@site/src/components/Layout/BackgroundWrapper";
import BoundaryBox from "@site/src/components/Layout/BoundaryBox";
import OpenGraphImage from "@site/src/components/Layout/OpenGraphImage";
import TeamGrid from "@site/src/components/TeamGrid";
import teamMembers from "@site/src/data/teamMembers.json";
import Layout from "@theme/Layout";

export default function Team() {
  return (
    <Layout title="Team | 45B" description="45B Team">
      <OpenGraphImage pageName="team" />
      <main>
        <BackgroundWrapper backgroundType="zoom">
          <BoundaryBox>
            <TeamGrid teamMembers={teamMembers} />
          </BoundaryBox>
        </BackgroundWrapper>
      </main>
    </Layout>
  );
}
