import React from "react";
import styles from "./styles.module.css";

//
// This component:
// a single embedded video on a centered row of its own, capped at half the
// page width on desktop and going full width once the column stacks.

export default function VideoEmbed({ videoUrl, title = "YouTube video player" }) {
  if (!videoUrl) {
    return null;
  }

  return (
    <div className={styles.videoRow}>
      <div className={styles.videoWrap}>
        <iframe
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
