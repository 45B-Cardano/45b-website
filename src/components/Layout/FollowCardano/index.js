import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import {
  FaXTwitter,
  FaRedditAlien,
  FaDiscourse,
  FaFacebookF,
  FaMeetup,
  FaTelegram,
  FaStackExchange,
  FaLinkedin,
} from "react-icons/fa6";

// Overview: https://react-icons.github.io/react-icons/, for consistency stick to font awesome 6 (fa6)
const socialLinks = [
  {
    icon: <FaXTwitter />,
    url: "https://x.com/45B_Cardano",
    label: "45B on X",
  },
  // {
  //   icon: <FaRedditAlien />,
  //   url: "https://www.reddit.com/r/cardano/",
  //   label: "45B on Reddit",
  // },
  // {
  //   icon: <FaDiscourse />,
  //   url: "https://forum.cardano.org",
  //   label: "Cardano Forum",
  // },
  // {
  //   icon: <FaFacebookF />,
  //   url: "https://www.facebook.com/groups/CardanoCommunity",
  //   label: "45B on Facebook",
  // },
  // {
  //   icon: <FaMeetup />,
  //   url: "https://www.meetup.com/pro/cardano/",
  //   label: "Cardano Meetup",
  // },
  {
    icon: <FaTelegram />,
    url: "https://t.me/+5meQRfEh6k8wYmFk",
    label: "45B on Telegram",
  },
  // {
  //   icon: <FaStackExchange />,
  //   url: "https://cardano.stackexchange.com/",
  //   label: "Cardano StackExchange",
  // },
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/company/45b-cardano-enablement",
    label: "45B on LinkedIn",
  },
];

export default function FollowCardano({
  title,
  iconForegroundColor,
  iconBackgroundColor,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.taglineContainer}>
        <h1>{title}</h1>
        <p className="social__icons">
          {socialLinks.map((social, index) => (
            <Link key={index} href={social.url} aria-label={social.label}>
              <span
                className={styles.iconWrapper}
                style={{
                  "--icon-bg-color": iconBackgroundColor,
                  "--icon-fg-color": iconForegroundColor
                    ? iconForegroundColor
                    : "",
                }}
              >
                {social.icon}
              </span>
            </Link>
          ))}
        </p>
      </div>
    </div>
  );
}
