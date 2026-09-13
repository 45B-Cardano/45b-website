import React, { useCallback, useEffect, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

//
// This component:
// a self-hosted video with our own controls — an unmute button and a
// fullscreen button top right, a link to the video on YouTube bottom right,
// and the frame itself as play/pause.
//
// WHY THIS EXISTS RATHER THAN AN EMBED
// It replaced a YouTube iframe on /web3. `controls=0` removes YouTube's
// control bar and nothing else: the play button, the title and the end-screen
// are still theirs to draw, inside a cross-origin iframe that cannot be
// styled or scripted, and obscuring them is against YouTube's API terms
// anyway. Every workaround was painting over their UI and patching the
// moments it showed through.
//
// Serving the file ourselves removes the boundary rather than fighting it.
// There is no third-party UI to hide, no postMessage channel, no handshake,
// and no fallback for when that channel fails — the roughly 200 lines that
// did all of it are gone. It also means no request to Google at all, where
// youtube-nocookie still phoned home on play.
//
// The one thing given up is adaptive bitrate: this is a single file at a
// single quality, so every visitor pulls the same bytes.

/** Expand / contract, four corners. */
function FullscreenGlyph({ active }) {
  return (
    <svg viewBox="0 0 24 24" className={styles.glyph} aria-hidden="true" focusable="false">
      {active ? (
        <path d="M9 3v4a2 2 0 0 1-2 2H3M15 3v4a2 2 0 0 0 2 2h4M9 21v-4a2 2 0 0 0-2-2H3M15 21v-4a2 2 0 0 1 2-2h4"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M3 9V5a2 2 0 0 1 2-2h4M21 9V5a2 2 0 0 0-2-2h-4M3 15v4a2 2 0 0 0 2 2h4M21 15v4a2 2 0 0 1-2 2h-4"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function SpeakerGlyph({ muted }) {
  return (
    <svg viewBox="0 0 24 24" className={styles.glyph} aria-hidden="true" focusable="false">
      <path d="M4 9v6h4l5 5V4L8 9H4z" />
      {muted ? (
        <path d="M16.5 8.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M16 8.8a4 4 0 0 1 0 6.4M18.6 6a7.5 7.5 0 0 1 0 12"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}

// The YouTube mark with the wordmark left off: a rounded rectangle with the
// play triangle knocked out (evenodd), so the triangle shows what is behind it
// rather than being painted on.
function YouTubeGlyph() {
  return (
    <svg viewBox="0 0 24 17" className={styles.youtubeGlyph} aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        d="M23.5 2.65a3.02 3.02 0 0 0-2.12-2.14C19.5 0 12 0 12 0S4.5 0 2.62.51A3.02 3.02 0 0 0 .5 2.65C0 4.54 0 8.5 0 8.5s0 3.96.5 5.85a3.02 3.02 0 0 0 2.12 2.14C4.5 17 12 17 12 17s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 12.46 24 8.5 24 8.5s0-3.96-.5-5.85zM9.55 12.13V4.87l6.27 3.63z"
      />
    </svg>
  );
}

export default function VideoPlayer({
  src,
  poster,
  youtubeUrl,
  label = "45B Web3 Workshops promo",
  loop = true,
}) {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const videoUrl = useBaseUrl(src);
  const posterUrl = useBaseUrl(poster || "");

  // The element is the source of truth, not our state: these fire for
  // everything, including the browser deciding on its own not to autoplay.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const onPlaying = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVolume = () => setMuted(video.muted || video.volume === 0);

    video.addEventListener("playing", onPlaying);
    video.addEventListener("play", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onPause);
    video.addEventListener("volumechange", onVolume);
    onVolume();

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("play", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onPause);
      video.removeEventListener("volumechange", onVolume);
    };
  }, []);

  // Fullscreen can also be left with Escape or the system control, so the icon
  // follows the document rather than our own button.
  useEffect(() => {
    const onChange = () =>
      setFullscreen(
        Boolean(document.fullscreenElement || document.webkitFullscreenElement)
      );
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  // Someone who has asked their system for less motion should not be handed an
  // autoplaying loop. They get the cover and a play button instead; everything
  // else behaves identically.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (err) {
      reduced = false;
    }
    if (reduced) {
      video.autoplay = false;
      video.pause();
    }
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      // Can reject if the browser refuses; the pause event keeps state honest.
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    if (!next && video.volume === 0) {
      video.volume = 1;
    }
    // No verification and no fallback needed, unlike the iframe this replaced:
    // it is our own element on our own origin, so setting .muted from a click
    // simply works.
  }, []);

  const toggleFullscreen = useCallback(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video) return;

    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      return;
    }

    // Going fullscreen is someone choosing to actually watch it, so sound
    // comes on with it — the muting only ever existed to let it autoplay.
    video.muted = false;
    if (video.volume === 0) video.volume = 1;
    if (video.paused) {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }

    if (wrap && wrap.requestFullscreen && document.fullscreenEnabled) {
      wrap.requestFullscreen().catch(() => {});
    } else if (wrap && wrap.webkitRequestFullscreen) {
      wrap.webkitRequestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      // iPhone: only the video element can go fullscreen, never a container,
      // and it brings iOS's own controls with it. That is the expected look
      // there, not a fallback that has gone wrong.
      video.webkitEnterFullscreen();
    }
  }, []);

  return (
    <div className={styles.videoRow}>
      <div className={styles.videoWrap} ref={wrapRef}>
        <video
          ref={videoRef}
          className={styles.video}
          src={videoUrl}
          poster={poster ? posterUrl : undefined}
          autoPlay
          muted
          loop={loop}
          playsInline
          preload="metadata"
          aria-label={label}
        />

        {/* Our own panel over the paused and not-yet-started states. With no
            third-party chrome to hide it is a design choice rather than a
            workaround — and it is where the cover image sits.

            The image is an <img> rather than a background, so it keeps its own
            aspect ratio inside the padded area instead of being cropped to
            fill it. Decorative: the video carries the accessible name. */}
        <div
          className={styles.cover}
          data-visible={playing ? "false" : "true"}
          aria-hidden="true"
        >
          {poster ? (
            <img className={styles.coverImage} src={posterUrl} alt="" />
          ) : null}
          <span className={styles.coverGlyph} data-over-image={poster ? "true" : "false"}>
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>

        <button
          type="button"
          className={styles.clickLayer}
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
        />

        <div className={styles.topControls}>
          <button
            type="button"
            className={styles.overlayButton}
            onClick={toggleSound}
            aria-label={muted ? "Unmute video" : "Mute video"}
            aria-pressed={!muted}
          >
            <SpeakerGlyph muted={muted} />
          </button>
          <button
            type="button"
            className={styles.overlayButton}
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Exit full screen" : "Watch full screen with sound"}
          >
            <FullscreenGlyph active={fullscreen} />
          </button>
        </div>

        {youtubeUrl ? (
          <a
            className={styles.youtubeLink}
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch this video on YouTube"
          >
            <YouTubeGlyph />
          </a>
        ) : null}
      </div>
    </div>
  );
}
