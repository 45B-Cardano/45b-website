import React from "react";
import styles from "./styles.module.css";

//
// This component:
// marks a run of inline text as if the reader had selected it with the cursor.

export default function SelectionHighlight({ children }) {
  return <span className={styles.selection}>{children}</span>;
}
