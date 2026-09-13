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

// `short` is what the selector falls back to on narrow screens: four full
// language names do not fit on a phone in one row, and wrapping them would
// break the tab/panel border merge.
export const languages = [
  { code: "en", label: "English", short: "EN" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "es", label: "Español", short: "ES" },
  { code: "fr", label: "Français", short: "FR" },
];

// `showSelector`: false draws the panel on its own, with nothing on its top
// edge. The upcoming-calls section wants the same pane as the rest of the page
// but has no language of its own to switch — its content is English only, and
// the language each session is held in is a badge on the row, not a choice.
// Kept here rather than copied into a second component so the pane outline has
// one owner and the two cannot drift apart.
export default function LanguagePanel({
  lang,
  onLangChange,
  variant = "light",
  label = "Content language",
  showSelector = true,
  className,
  children,
}) {
  const variantClass = variant === "dark" ? styles.dark : styles.light;

  return (
    <div className={clsx(styles.wrap, variantClass, className)}>
      {showSelector && (
        <div className={styles.tabList} role="tablist" aria-label={label}>
          {languages.map(({ code, label: languageLabel, short }) => (
            <button
              key={code}
              type="button"
              role="tab"
              aria-selected={lang === code}
              className={clsx(styles.tabButton, {
                [styles.tabButtonActive]: lang === code,
              })}
              onClick={() => onLangChange(code)}
              /* the visible text is the abbreviation on narrow screens, so the
                 accessible name is pinned to the full language name instead */
              aria-label={languageLabel}
            >
              <span className={styles.tabLabelFull} aria-hidden="true">
                {languageLabel}
              </span>
              <span className={styles.tabLabelShort} aria-hidden="true">
                {short}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className={styles.panel} {...(showSelector ? { role: "tabpanel" } : {})}>
        {children}
      </div>
    </div>
  );
}
