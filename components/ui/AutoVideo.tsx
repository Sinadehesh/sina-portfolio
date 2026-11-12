"use client";

import { useEffect, useRef } from "react";
import type { VideoFiles } from "@/lib/media";

/**
 * A silent, looping preview of a product. It has no sound, downloads only when it comes near the screen,
 * plays while it's visible and pauses when it isn't. `mobile` is a lighter cut for small screens; the WebM
 * copies are used only where the browser can't play H.264. With reduced motion it stays on its poster.
 * `eager` starts loading right away (for the first screen).
 */
export default function AutoVideo({
  src,
  mobile,
  webm,
  mobileWebm,
  poster,
  className = "",
  label,
  eager = false,
}: VideoFiles & {
  className?: string;
  /** Accessible name; leave empty when the video is decorative. */
  label?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pick = () => {
      const small = window.matchMedia("(max-width: 767px)").matches;
      const mp4 = small && mobile ? mobile : src;
      const alt = small && mobileWebm ? mobileWebm : webm;
      return alt && !v.canPlayType('video/mp4; codecs="avc1.640029"') ? alt : mp4;
    };
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      v.src = pick();
    };
    const play = () => {
      if (!still.matches) v.play().catch(() => {});
    };
    if (eager) load();
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          play();
        } else if (!v.paused) v.pause();
      },
      { rootMargin: "240px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src, mobile, webm, mobileWebm, eager]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      disablePictureInPicture
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
    />
  );
}
