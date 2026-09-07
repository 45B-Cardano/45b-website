import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

//
// This component:
// the sign-up call to action, on a centered full-width row of its own.
// A highlight sweeps across it every few seconds to draw the eye.
//
// `lang` picks the label (the page owns the language — see LanguagePanel);
// pass `label` to override it outright.

const APPLY_FORM_URL =
  "https://airtable.com/appDlq4qQX7VBkGJx/pagK0lbmxLlkoexth/form";

const APPLY_LABELS = {
  en: "Apply to join!",
  pt: "Inscreva-se aqui!",
};

export default function ApplyButton({
  lang = "en",
  label,
  to = APPLY_FORM_URL,
}) {
  const buttonLabel = label ?? APPLY_LABELS[lang] ?? APPLY_LABELS.en;

  return (
    <div className={styles.applyRow}>
      <Link
        className={clsx("button button--primary button--lg", styles.applyButton)}
        to={to}
      >
        <span className={styles.applyLabel}>{buttonLabel}</span>
      </Link>
    </div>
  );
}
