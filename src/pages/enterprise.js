import Layout from "@theme/Layout";
import SiteHero from "@site/src/components/Layout/SiteHero";
import EnterpriseSection from "@site/src/components/EnterpriseSection";
import BoundaryBox from "@site/src/components/Layout/BoundaryBox";
import OpenGraphImage from "@site/src/components/Layout/OpenGraphImage";

function HomepageHeader() {
  const { siteTitle } = "useDocusaurusContext()";
  return (
    <SiteHero
      title="Enterprise"
      description="A developing platform, Cardano is being built to 
      accommodate a broad range of use cases, solving problems across multiple 
      industry verticals."
      bannerType="fluid"
    />
  );
}

export default function Home() {

  return (
    <Layout
    title="Use cases for enterprise | 45B.io"
    description="How Cardano is being used across identity, finance, supply chain, social impact, data, and emerging applications — fifteen use cases and where to read more."
    >
      <OpenGraphImage pageName="use-cases-for-enterprise" />
      <HomepageHeader />
      <main>
        <BoundaryBox>
          <EnterpriseSection />
        </BoundaryBox>
      </main>
    </Layout>
  );
}
