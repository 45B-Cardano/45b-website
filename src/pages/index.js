import Layout from "@theme/Layout";
import WelcomeHero from "@site/src/components/Layout/WelcomeHero";
import FeaturedTitleWithText from "@site/src/components/Layout/FeaturedTitleWithText";
import Divider from "@site/src/components/Layout/Divider";
import QuoteBox from "@site/src/components/Layout/QuoteBox";
import HomeBenefitsSection from "@site/src/components/HomeBenefitsSection";
import VisionBox from "@site/src/components/Layout/VisionBox";
import TitleWithText from "@site/src/components/Layout/TitleWithText";
import BackgroundWrapper from "@site/src/components/Layout/BackgroundWrapper";
import HomeDiscoverSection from "@site/src/components/HomeDiscoverSection";
import Logos from "@site/src/components/Layout/Logos";
import FollowCardanoSection from "@site/src/components/FollowCardanoSection";
import BoundaryBox from "@site/src/components/Layout/BoundaryBox";

function HomepageHeader() {
  const { siteTitle } = "useDocusaurusContext()";
  return (
    <WelcomeHero
      title={["Onboarding End-Users and Organizations to Cardano and Web3"]}
      description="45B is a hub for education, design and
       project management. We center on the Cardano blockchain, turning it outwards to
       help your business. Let's discover how Web3 can impact your business models!"
    />
  );
}

export default function Home() {
  return (
    <Layout
      title="Home | 45B - Cardano Enablement"
      description="45B is a hub for education, design and project management. We center on the Cardano blockchain, turning it outwards to help your business. Let's discover how Web3 can impact your business models!"
    >
      <HomepageHeader />
      <main>
        <BackgroundWrapper backgroundType={"zoom"}>
          <BoundaryBox>
            <FeaturedTitleWithText
              title="Web3 Workshops sign-ups open"
              description={[
                "Web3 has been revolutionizing the business model of organizations. It is a silent revolution building up that will more and more be relevat. NOW is the time to learn and be ahead of the curve in incorporating it in your culture and products.",
              ]}
              quote={[
                "Web3 is in your reach.",
                <br key="line1" /> /* FIXME: too hacky */,
                "Take hold!",
              ]}
              buttonLabel="Know more"
              buttonLink="/web3"
              headingDot={false}
            />
          </BoundaryBox>
        </BackgroundWrapper>

        <FollowCardanoSection />
      </main>
    </Layout>
  );
}
