import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import SpacerBox from "@site/src/components/Layout/SpacerBox";

//
// See Us, Know Us, Join Us

function LogoLink({ imageName, to }) {
  const imageUrl = useBaseUrl(`/img/logos/${imageName}.svg`);

  return (
    <div className={styles.logoWrap}>
      <Link to={to}>
        <img src={imageUrl} alt={imageName} />
      </Link>
    </div>
  );
}

export default function DiscoverUsSection({}) {
  const context = useDocusaurusContext();

  return (
    <div className="container">
      <div className={clsx("container", styles.boxWrap)}>
        <div className={styles.leftColumn}>
          <p>Content</p>
          <p>Outline</p>
        </div>
        <div className={styles.rightColumn}>
            <ul>
              <li>Your first wallet
              </li>
              <li>What is Blockchain
              </li>
              <li>Tokens and NFTs
              </li>
              <li>Using Web3
              </li>
              <li>Running the chain
              </li>
              <li>Cardano Governance
              </li>
              <li>Cardano Funding
              </li>
              <li>Web3 for all industries
              </li>
              <li>Deconstructing business models
              </li>
              <li>Playing with Smart Contracts
              </li>
              <li>Brainstorming your ideas
              </li>
              <li>Creating Solutions
              </li>
            </ul>
          <SpacerBox size="medium" />
        </div>
      </div>
    </div>
  );
}
