import Layout from "@theme/Layout";
import WelcomeHero from "@site/src/components/Layout/WelcomeHero";
import FeaturedTitleWithText from "@site/src/components/Layout/FeaturedTitleWithText";
import Divider from "@site/src/components/Layout/Divider";
import BackgroundWrapper from "@site/src/components/Layout/BackgroundWrapper";
import FollowCardanoSection from "@site/src/components/FollowCardanoSection";
import BoundaryBox from "@site/src/components/Layout/BoundaryBox";
import TeamGrid from "@site/src/components/TeamGrid";
import teamMembers from "@site/src/data/teamMembers.json";
import EventsTwoColumn from "@site/src/components/Layout/EventsTwoColumn";
import Link from "@docusaurus/Link";

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
      title="Home "
      description="45B is a hub for education, design and project management. We center on the Cardano blockchain, turning it outwards to help your business. Let's discover how Web3 can impact your business models!"
    >
      <HomepageHeader />
      <main>
        <BackgroundWrapper backgroundType={"zoom"}>
          <BoundaryBox>
            <FeaturedTitleWithText
              title="Web3 Workshops sign-ups closing soon"
              titleAboveText
              imageWidth="60%"
              largeDescription
              imageLink="/web3"
              imageAlt="Web3 Workshops — sign-ups closing soon"
              description={[
                "Web3 is rewriting how organizations own, move and prove value — payments that settle in seconds, records nobody can quietly alter, communities that fund and govern themselves. In 2026 it reaches your industry, ready or not.",

                "The people who shape that shift won't all be engineers. No code required and no prior blockchain knowledge assumed — come and find out what it makes possible in your own field.",
              ]}
              quote={[
                "Web3 is in your reach.",
                <br key="line1" /> /* FIXME: too hacky */,
                "Take hold!",
              ]}
              buttonLabel="Know more and sign up!"
              buttonLink="/web3"
              headingDot={false}
            />
          </BoundaryBox>
        </BackgroundWrapper>
        <BackgroundWrapper backgroundType={"gradientLight"}>
          <BoundaryBox>
            <Divider text="45B organized events" id="team" white={true} />
            <EventsTwoColumn
                  leftTitle="Lisbon Constitutional Workshop"
                  leftText="After attending Cardano meets in Lisbon for years, on Sept 21st 2024 the 45B team got to spin up their own event. Besides guaranteeing the best technical setting for the work at hand, we made sure there was a lot of space for fun and networking!"
                  leftYTLink="https://www.youtube-nocookie.com/embed/rAVkm0bo_Dc"
                  leftButtonLabel={"Watch Video"}
                  leftButtonLink={"https://www.youtube.com/watch?v=rAVkm0bo_Dc"}
                  leftHeadingDot={false}
                  rightTitle="Lisbon Cardano Summit CLE 2024"
                  rightText="CV Labs reached out to 45B for us to organize this annual event. Applicants got gifted merch by Cardano projects on arrival! We helped bring together Cardano builders to discuss, put together a panel of legal and academic experts, and had time for a final ticket giveaway."
                  rightYTLink="https://www.youtube-nocookie.com/embed/BUP6_Plo5Ls"
                  rightButtonLabel={"Watch Video"}
                  rightButtonLink={"https://www.youtube.com/watch?v=BUP6_Plo5Ls"}
                  rightHeadingDot={false}
                />
          </BoundaryBox>
        </BackgroundWrapper>
        <BackgroundWrapper backgroundType={"zoom"}>
          <BoundaryBox>
            <Divider text="Meet our team" id="team" white={false} />
            <TeamGrid teamMembers={teamMembers} />
            
          </BoundaryBox>
        </BackgroundWrapper>

        <FollowCardanoSection />
      </main>
    </Layout>
  );
}
