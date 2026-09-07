import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";
import { parseMarkdownLikeText } from "@site/src/utils/textUtils";
import Divider from "@site/src/components/Layout/Divider";

// shows a dotted image on the left, with the solution it addresses below it
// shows a category label, header and description on the right
// can be inverted with isImageRight:true
//
// Each use case links out to the matching page on cardano.org rather than
// naming vendor products — the detail lives there and stays current there.

const USE_CASE_DOCS = "https://cardano.org/docs/use-cases";

function UseCase({
  category,
  title,
  description,
  solutions,
  imageName,
  isImageRight,
}) {
  // Construct the image URL using the imageName prop, we may want to handle image load errors in the future
  const imageUrl = useBaseUrl(`/img/dotted-icons/${imageName}.svg`);

  // Swap columns based on isImageRight flag
  const imageColumnClass = clsx("col col--4", styles.imageSection, {
    [styles.imageRight]: isImageRight,
  });
  const textColumnClass = clsx("col col--8", styles.textSection, {
    [styles.textRight]: isImageRight,
  });

  return (
    <div className={clsx("row", styles.enterpriseWrap)}>
      <div className={imageColumnClass}>
        <img src={imageUrl} alt={title} />
        <div className={styles.solutions}>Solutions</div>
        <div className={styles.solutionsContent}>{solutions}</div>
      </div>
      <div className={textColumnClass}>
        {category && <div className={styles.category}>{category}</div>}
        <h2 className={styles.title}>{title}</h2>
        {Array.isArray(description) ? (
          description.map((paragraph, index) => (
            <p key={index} className={styles.description}>
              {parseMarkdownLikeText(paragraph)}
            </p>
          ))
        ) : (
          <p className={styles.description}>
            {parseMarkdownLikeText(description)}
          </p>
        )}
      </div>
    </div>
  );
}

UseCase.defaultProps = {
  isImageRight: false, // Default layout will have the image on the left
};

export default function EnterpriseSection({}) {
  const context = useDocusaurusContext();

  return (
    <div>
      {/* ---------- Identity ---------- */}

      <Divider id="education" />
      <UseCase
        category="Identity"
        title="Education"
        description={[
          "The issuance of academic certifications is heavily centralized. If diplomas, degrees, \
        or other credentials are damaged or lost, the re-issue process is often costly, and the \
        issuing institution might no longer exist. Sharing these credentials is also difficult, \
        as academic achievements are traditionally issued in physical form, which makes it almost \
        impossible to share when and where needed.",

          "Credentials anchored on Cardano can be verified by anyone, instantly, without going back \
        to the institution that issued them. Students own and carry their own achievements, \
        institutions shed the cost of re-issuing and confirming records, and employers get proof \
        they can trust in seconds rather than weeks.",

          `Read more about [education on Cardano](${USE_CASE_DOCS}/education/).`,
        ]}
        solutions="Credential verification"
        imageName="education"
        isImageRight={false}
      />

      <Divider id="digital-identity" />
      <UseCase
        category="Identity"
        title="Digital Identity"
        description={[
          "Most digital identity today is rented rather than owned. Your credentials live in someone \
        else's database, and you depend on that organization staying online, staying in business, \
        and being willing to vouch for you. Every new service means handing the same documents to \
        yet another party that will store a copy of them.",

          "Self-owned identity inverts that arrangement: tamper-proof credentials are held in your own \
        wallet and presented only when you choose, proving exactly what needs proving without \
        disclosing everything else about you.",

          `Read more about [digital identity on Cardano](${USE_CASE_DOCS}/digital-identity/).`,
        ]}
        solutions="Self-owned identity"
        imageName="people"
        isImageRight={true}
      />

      <Divider id="finance" />
      <UseCase
        category="Identity"
        title="Finance"
        description={[
          "Identity verification is a key step before accepting new clients into financial institutions or other \
        agencies. Simply opening a new bank account in certain countries takes weeks, for example. Other \
        administrative processes — passport applications, for instance — take even longer. The onboarding \
        process is slow and resource-heavy, often involving multiple third parties with their own fees.",

          "Reusable verified credentials turn that repeated work into a single check. A customer verified once \
        can prove the same facts to the next institution immediately, while the institution still satisfies \
        its KYC and AML obligations — a one-click experience in place of a paperwork cycle.",

          `Read more about [finance and KYC on Cardano](${USE_CASE_DOCS}/finance-kyc/).`,
        ]}
        solutions="Onboarding (KYC & AML)"
        imageName="finance"
        isImageRight={false}
      />

      <Divider id="government" />
      <UseCase
        category="Identity"
        title="Government"
        description={[
          "Current credentials issuance and verification systems are inherently flawed. The document and its \
        control remain with the issuer rather than the individual, which creates a strong dependency \
        on third-party agencies to verify the document's authenticity. This usually involves a manual, costly, \
        and time-consuming process, depending on the location and response time of the issuing authority.",

          "A decentralized credential system lets citizens hold their own documents and lets any authorized \
        party verify them instantly, at any hour, without a phone call or a records request — cutting \
        administrative load while giving people control over their own paperwork.",

          `Read more about [government on Cardano](${USE_CASE_DOCS}/government/).`,
        ]}
        solutions="Digital identity"
        imageName="government"
        isImageRight={true}
      />

      {/* ---------- Finance ---------- */}

      <Divider id="defi" />
      <UseCase
        category="Finance"
        title="Decentralized Finance"
        description={[
          "Access to financial services still depends heavily on where you were born and which institutions \
        will have you as a customer. Lending, saving, and exchange are gated by intermediaries whose terms \
        are opaque and whose reach stops at their own borders.",

          "Smart contracts on Cardano can run lending, borrowing, and exchange directly between participants, \
        with the rules visible to everyone and enforced by code rather than by trust in a counterparty. \
        Anyone with a wallet and a connection can take part on the same terms.",

          `Read more about [DeFi on Cardano](${USE_CASE_DOCS}/defi/).`,
        ]}
        solutions="Open financial services"
        imageName="ada-upturned-hand"
        isImageRight={false}
      />

      <Divider id="payments" />
      <UseCase
        category="Finance"
        title="Payments"
        description={[
          "Cross-border payments still route through chains of correspondent banks. Transfers take days to \
        arrive, fees are unpredictable, and a slice of the money is lost at every hop — a cost carried \
        disproportionately by the people sending the smallest amounts home.",

          "Transfers on Cardano settle in seconds for a predictable fee, at any hour, without an intermediary \
        holding the funds along the way.",

          `Read more about [payments on Cardano](${USE_CASE_DOCS}/payments/).`,
        ]}
        solutions="Cross-border transfers"
        imageName="wallet-hot"
        isImageRight={true}
      />

      {/* ---------- Supply Chain ---------- */}

      <Divider id="agriculture" />
      <UseCase
        category="Supply Chain"
        title="Agriculture"
        description={[
          "The pandemic starkly showed that maintaining a solid and constant supply chain is a key pillar \
        for the success and sustainability of any industry sector, and indeed for the safety and well-being \
        of the population.",

          "Agriculture is a source of food and sustenance whose supply chain must be kept going at all times, \
        as livelihoods depend on it. Recording each step on a shared, tamper-proof ledger supports every \
        stakeholder along that chain: farmers, hauliers, and retailers gain certification and traceability \
        from farm to table, and consumers can check where their food actually came from.",

          `Read more about [agriculture on Cardano](${USE_CASE_DOCS}/agriculture/).`,
        ]}
        solutions="Supply chain tracking"
        imageName="agriculture"
        isImageRight={false}
      />

      <Divider id="retail" />
      <UseCase
        category="Supply Chain"
        title="Retail"
        description={[
          "In 2018, [counterfeit goods inflicted a (US$)300bn blow to the global economy](https://www.visualcapitalist.com/300-billion-counterfeit-goods-problem/) and the problem \
        is getting worse. If the trend is not reversed, markets will become flooded with fake products, \
        leading to substantial financial losses, damage to brand reputation, and marked reduction in \
        customer confidence.",

          "Anti-counterfeiting initiatives often involve lengthy and costly processes with little discernible \
        effect on the ongoing trade of counterfeit goods. Most fakes are sold online, which means that \
        these rogue traders operate in relative impunity.",

          "Blockchain-backed provenance answers this directly: a tamper-proof record of where a product came \
        from and everywhere it has been, so that a buyer — or a customs officer — can establish that an item \
        is genuine rather than taking a seller's word for it.",

          `Read more about [retail on Cardano](${USE_CASE_DOCS}/retail/).`,
        ]}
        solutions="Product counterfeiting"
        imageName="retail"
        isImageRight={true}
      />

      <Divider id="logistics" />
      <UseCase
        category="Supply Chain"
        title="Logistics"
        description={[
          "Goods crossing borders pass through many hands, and each operator keeps its own records. \
        Reconciling those records after the fact is slow, and when something is lost, delayed, or spoiled, \
        establishing where it happened can be near impossible.",

          "A shared ledger gives every party the same real-time view of where goods are and what has happened \
        to them, verified as it is recorded rather than argued over afterwards.",

          `Read more about [logistics on Cardano](${USE_CASE_DOCS}/logistics/).`,
        ]}
        solutions="Track and trace"
        imageName="chains"
        isImageRight={false}
      />

      {/* ---------- Social Impact ---------- */}

      <Divider id="social-programs" />
      <UseCase
        category="Social Impact"
        title="Social Programs"
        description={[
          "Aid and social funding often pass through several organizations before reaching the people they \
        were raised for. Donors rarely get to see what arrived, and administrators spend heavily on \
        reporting that still leaves the question open.",

          "Recording distributions on a public ledger makes the path of funds auditable by anyone, so support \
        can be shown to have reached its recipients — and can be delivered directly to them where the \
        infrastructure allows.",

          `Read more about [social programs on Cardano](${USE_CASE_DOCS}/social-programs/).`,
        ]}
        solutions="Transparent fund distribution"
        imageName="get-funded"
        isImageRight={true}
      />

      {/* ---------- Data & Technology ---------- */}

      <Divider id="data-storage" />
      <UseCase
        category="Data & Technology"
        title="Data Storage"
        description={[
          "Centralized storage concentrates risk. One outage, one price change, or one policy decision by a \
        provider can put data out of reach, and the people who depend on that data have little say in any \
        of it.",

          "Distributing storage across a network removes the single point of failure and lets the integrity of \
        what is stored be checked independently, rather than taken on faith from whoever is holding it.",

          `Read more about [data storage on Cardano](${USE_CASE_DOCS}/data-storage/).`,
        ]}
        solutions="Decentralized storage"
        imageName="machine-squares"
        isImageRight={false}
      />

      <Divider id="tokenized-assets" />
      <UseCase
        category="Data & Technology"
        title="Tokenized Assets"
        description={[
          "Property, art, and other high-value assets are hard to divide and slow to trade. That keeps them out \
        of reach for most people and leaves owners with capital they cannot easily move.",

          "Tokenization represents ownership of a real-world asset on-chain, so it can be held in fractions and \
        transferred without the traditional paperwork — opening participation to far more people and giving \
        owners a route to liquidity.",

          `Read more about [tokenized assets on Cardano](${USE_CASE_DOCS}/tokenized-assets/).`,
        ]}
        solutions="Fractional ownership"
        imageName="nft"
        isImageRight={true}
      />

      {/* ---------- Emerging Applications ---------- */}

      <Divider id="voting-systems" />
      <UseCase
        category="Emerging Applications"
        title="Voting Systems"
        description={[
          "Elections and organizational votes rest on participants trusting a process they cannot inspect. \
        Where that trust is thin, the result is disputed regardless of whether the count was sound.",

          "Votes recorded immutably can be independently audited and cannot be quietly altered after the fact, \
        while still protecting how any individual voted — verifiable outcomes without a central authority \
        being taken at its word.",

          `Read more about [voting systems on Cardano](${USE_CASE_DOCS}/voting-systems/).`,
        ]}
        solutions="Verifiable elections"
        imageName="decentralization"
        isImageRight={false}
      />

      <Divider id="healthcare" />
      <UseCase
        category="Emerging Applications"
        title="Health Care"
        description={[
          "Counterfeit and substandard medications pose a significant risk to public health and inflict severe financial \
        loss to legitimate manufacturers. Cost, peer pressure, and other reasons push many people to acquire \
        medications in online pharmacies, which in many cases lack strict controls and regulations surrounding \
        the manufacture and supply of therapeutic drugs. The World Health Organization (WHO) estimates that more \
        than 50% of medications sold online can be categorized as fake or substandard.",

          "Verifiable provenance addresses this by authenticating the origin and supply chain of pharmaceutical \
        products before they reach a patient. The same properties apply to medical records: portable, secure \
        histories that follow the patient between institutions and are available instantly in an emergency, \
        instead of being stranded in the systems of whichever provider created them.",

          `Read more about [healthcare on Cardano](${USE_CASE_DOCS}/healthcare/).`,
        ]}
        solutions="Medicine provenance & patient records"
        imageName="healthcare"
        isImageRight={true}
      />

      <Divider id="music-ip" />
      <UseCase
        category="Emerging Applications"
        title="Music & IP"
        description={[
          "Royalties reach artists slowly and through many intermediaries, each taking a share and each keeping \
        its own accounts. Working out who is owed what for a given piece of work is often genuinely difficult, \
        and creators are the last to be paid.",

          "Rights recorded on-chain and royalties paid by smart contract let payment follow use automatically, \
        splitting revenue among collaborators the moment it arrives and leaving an ownership record anyone \
        can check.",

          `Read more about [music and IP on Cardano](${USE_CASE_DOCS}/music-ip/).`,
        ]}
        solutions="Royalties & rights management"
        imageName="innovation"
        isImageRight={false}
      />
    </div>
  );
}
