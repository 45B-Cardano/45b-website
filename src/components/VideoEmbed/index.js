import React from "react";
import styles from "./styles.module.css";

//
// This component:
// a single embedded YouTube video on a centered row of its own, capped at half
// the page width on desktop and going full width once the column stacks.
//
// NOT used by /web3 any more — that page self-hosts its video through
// VideoPlayer, because `controls=0` removes YouTube's control bar and nothing
// else: the play button, the title and the end-screen stay theirs to draw
// inside a cross-origin iframe. Everything this component once carried to work
// around that (a postMessage channel, a readiness handshake, an opaque cover,
// a fallback for when the channel failed) went with it. What is left is the
// plain embed, which is all this was ever meant to be.
//
// Reach for VideoPlayer when the video is ours and the frame should look like
// ours. Reach for this when embedding someone else's video is the point.

/**
 * Turn a YouTube embed URL into one that repeats.
 *
 * YouTube has no single-video loop: `loop=1` applies to *playlists* only, so
 * looping one video means handing it a playlist containing just that video.
 * Set `loop=1` alone and the video simply stops at the end.
 *
 * The id is derived from the URL rather than passed in beside it, deliberately:
 * the two must always agree, and when they don't the failure is quiet and
 * strange — the first play is the right video and every repeat after it is a
 * different one.
 */
function loopingUrl(videoUrl) {
  try {
    // No base argument on purpose: with one, an unparseable string resolves
    // against it instead of throwing, and this would hand the iframe a mangled
    // URL rather than falling through to the catch below.
    const url = new URL(videoUrl);
    const id = url.pathname.split("/").filter(Boolean).pop();
    if (!id) {
      return videoUrl;
    }
    url.searchParams.set("loop", "1");
    url.searchParams.set("playlist", id);
    return url.toString();
  } catch (err) {
    return videoUrl;
  }
}

export default function VideoEmbed({
  videoUrl,
  title = "YouTube video player",
  loop = false,
}) {
  if (!videoUrl) {
    return null;
  }

  return (
    <div className={styles.videoRow}>
      <div className={styles.videoWrap}>
        <iframe
          src={loop ? loopingUrl(videoUrl) : videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
