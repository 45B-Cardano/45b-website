import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

//
// This component:
// wraps its children in an outlined panel with a language selector sitting on
// the panel's top edge (the active tab's fill covers the panel border below it,
// so the tab reads as part of the panel outline).
//
// `lang` / `onLangChange` are owned by the page, so every panel on a page can
// share one language state and each selector drives all of them.
//
// `variant`: "dark" for panels on a dark background (white outline, used by
// ContentOutlineSection), "light" for panels on the normal page background
// (45B accent outline).

export const languages = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
];

export default function LanguagePanel({
  lang,
  onLangChange,
  variant = "light",
  label = "Content language",
  className,
  children,
}) {
  const variantClass = variant === "dark" ? styles.dark : styles.light;

  return (
    <div className={clsx(styles.wrap, variantClass, className)}>
      <div className={styles.tabList} role="tablist" aria-label={label}>
        {languages.map(({ code, label: languageLabel }) => (
          <button
            key={code}
            type="button"
            role="tab"
            aria-selected={lang === code}
            className={clsx(styles.tabButton, {
              [styles.tabButtonActive]: lang === code,
            })}
            onClick={() => onLangChange(code)}
          >
            {languageLabel}
          </button>
        ))}
      </div>

      <div className={styles.panel} role="tabpanel">
        {children}
      </div>
    </div>
  );
}
