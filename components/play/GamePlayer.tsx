"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Plays a game's live web build inside the page. Phone games sit in a phone
 * frame on wide screens and fill the width on phones; computer games get a
 * wide screen. The build is loaded from where it is published, so whatever
 * is pushed there is what plays here. In the phone frame the game is laid out
 * at a real phone's size (390 × 844) and scaled to fit, so it looks as it
 * does on a phone instead of being squeezed.
 */
const PHONE_W = 390;
const PHONE_H = 844;

export default function GamePlayer({
  src,
  title,
  device,
}: {
  src: string;
  title: string;
  device: "phone" | "computer";
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [run, setRun] = useState(0);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = screen.current;
    if (device !== "phone" || !el) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const update = () => setScale(wide.matches ? el.clientWidth / PHONE_W : null);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    wide.addEventListener("change", update);
    update();
    return () => {
      ro.disconnect();
      wide.removeEventListener("change", update);
    };
  }, [device]);

  // The game can finish loading before this component hydrates, so its load event may never reach us.
  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 6000);
    return () => window.clearTimeout(t);
  }, [run]);

  const fullscreen = () => {
    const el = frame.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => window.open(src, "_blank", "noopener"));
    else window.open(src, "_blank", "noopener");
  };

  return (
    <div className={`player player-${device}`}>
      <div className="player-device">
        <div ref={screen} className="player-screen">
          {/* Behind the game: it shows through only until the game draws. */}
          {!loaded && (
            <div aria-hidden="true" className="player-loading">
              <span className="live-dot" />
              Loading {title}…
            </div>
          )}
          <iframe
            key={run}
            ref={frame}
            src={src}
            title={`${title} — play in the browser`}
            allow="fullscreen; autoplay; gamepad; clipboard-write; screen-wake-lock; accelerometer; gyroscope"
            allowFullScreen
            onLoad={() => setLoaded(true)}
            style={
              scale
                ? { width: PHONE_W, height: PHONE_H, transform: `scale(${scale})`, transformOrigin: "0 0" }
                : undefined
            }
            className={scale ? "absolute top-0 left-0 border-0" : "absolute inset-0 h-full w-full border-0"}
          />
        </div>
      </div>
      <div className="player-controls">
        <button
          type="button"
          onClick={() => {
            setLoaded(false);
            setRun((n) => n + 1);
          }}
        >
          ↻ Restart
        </button>
        <button type="button" onClick={fullscreen}>
          ⛶ Full screen
        </button>
        <a href={src} target="_blank" rel="noopener">
          Open in a new tab ↗
        </a>
      </div>
    </div>
  );
}
