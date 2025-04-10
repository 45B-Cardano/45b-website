import Layout from "@theme/Layout";
import SiteHero from "@site/src/components/Layout/SiteHero";
import ImageWithText from "@site/src/components/Layout/ImageWithText";
import DiscoverUsSection from "@site/src/components/DiscoverUsSection";
import BackgroundWrapper from "@site/src/components/Layout/BackgroundWrapper";
import BoundaryBox from "../components/Layout/BoundaryBox";
import SpacerBox from "../components/Layout/SpacerBox";
import OpenGraphImage from "@site/src/components/Layout/OpenGraphImage";
import FollowCardanoSection from "@site/src/components/FollowCardanoSection";
import Link from "@docusaurus/Link";


function HomepageHeader() {
  const { siteTitle } = "useDocusaurusContext()";
  return (
    <SiteHero
      title="Web3 Workshops"
      description="From zero to Web3. Discover how your business can prepare."
      bannerType="starburst"
    />
  );
}

export default function Home() {

  return (
    <Layout
    title="Web3 Workshops | 45B.io"
    description="From zero to Web3. Discover how your business can prepare."
    >
      <OpenGraphImage pageName="web3" />
      <HomepageHeader />
      <main>
        <BoundaryBox>
          <ImageWithText
            imageName={"web3.jpg"}
            title={"Overview"}
            subtitle={"What is it? How can I use it? What could I build?"}
            text={[
              "Web3 has been revolutionizing the business model of organizations. It is a silent revolution building up that will more and more be relevat. NOW is the time to learn and be ahead of the curve in incorporating it in your culture and products.",

              "45B - Cardano Enablement as funded by Project Catalyst (Cardano's innovation fund) to run 5 cohorts of live workshops in different languages.",
            ]}
            isImageRight={false}
            id={"people"}
            headingDot={false}
          />

        </BoundaryBox>

        <BackgroundWrapper backgroundType={"gradientDark"}>
          <DiscoverUsSection />
        </BackgroundWrapper>

        <FollowCardanoSection />
      </main>
    </Layout>
  );
}
