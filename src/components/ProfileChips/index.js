import React from "react";
import styles from "./styles.module.css";

//
// This component:
// a row of highlighted chips, one per professional profile / line of business,
// in variations of the 45B accent colour so the list is impossible to miss.

export default function ProfileChips({ items }) {
  return (
    <div className={styles.chipRow}>
      {items.map((item) => (
        <span key={item} className={styles.chip}>
          {item}
        </span>
      ))}
    </div>
  );
}
