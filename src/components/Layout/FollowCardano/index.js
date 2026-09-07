import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import {
  FaXTwitter,
  FaFacebookF,
  FaTelegram,
  FaLinkedin,
  FaYoutube,
  FaDiscord,
  FaInstagram,
} from "react-icons/fa6";

// Overview: https://react-icons.github.io/react-icons/, for consistency stick to font awesome 6 (fa6)
const socialLinks = [
  {
    icon: <FaYoutube />,
    url: "https://www.youtube.com/@45B-CardanoEnablement/videos",
    label: "Cardano 45B on Youtube",
  },
  {
    icon: <FaXTwitter />,
    url: "https://x.com/45B_Cardano",
    label: "45B on X",
  },
  {
    icon: <FaTelegram />,
    url: "https://t.me/+5meQRfEh6k8wYmFk",
    label: "45B on Telegram",
  },
  {
    icon: <FaDiscord />,
    url: "https://discord.gg/dzH7SjxBf",
    label: "45B on Discord",
  },
  {
    icon: <FaInstagram />,
    label: "45B on Instagram",
    variants: [
      { label: "Global", url: "https://www.instagram.com/45b.io" },
      { label: "Portuguese", url: "https://www.instagram.com/pt.45b.io" },
    ],
  },
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
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/company/45b-cardano-enablement",
    label: "45B on LinkedIn",
  },
];

// Renders one social icon. If `social.variants` is set, the icon becomes a
// button that toggles a small popover (anchored to that exact icon) letting
// the user pick which variant link to follow, instead of navigating directly.
function SocialIcon({ social, iconForegroundColor, iconBackgroundColor }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const iconStyle = {
    "--icon-bg-color": iconBackgroundColor,
    "--icon-fg-color": iconForegroundColor ? iconForegroundColor : "",
  };

  if (social.variants) {
    return (
      <span className={styles.iconMenuWrap} ref={wrapRef}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={social.label}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={styles.iconWrapper} style={iconStyle}>
            {social.icon}
          </span>
        </button>
        {open && (
          <div className={styles.popover} role="menu">
            {social.variants.map((variant) => (
              <Link
                key={variant.label}
                href={variant.url}
                className={styles.popoverItem}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {variant.label}
              </Link>
            ))}
          </div>
        )}
      </span>
    );
  }

  return (
    <Link href={social.url} aria-label={social.label}>
      <span className={styles.iconWrapper} style={iconStyle}>
        {social.icon}
      </span>
    </Link>
  );
}

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
            <SocialIcon
              key={index}
              social={social}
              iconForegroundColor={iconForegroundColor}
              iconBackgroundColor={iconBackgroundColor}
            />
          ))}
        </p>
      </div>
    </div>
  );
}
