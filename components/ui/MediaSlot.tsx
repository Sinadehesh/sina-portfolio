import type { CSSProperties, ReactNode } from "react";
import { posterFor, publicFileExists } from "@/lib/media";

/**
 * A slot for a short looping video. If the file exists in /public at build
 * time it plays muted and looped (with an optional `-mobile.mp4` vertical cut
 * and `.jpg` poster); otherwise a designed light-canvas fallback renders in
 * its place, tinted by `hue`. Overlay content goes in `children`.
 */
export function MediaSlot({
  video,
  hue,
  className = "",
  priority = false,
  canvasClassName = "",
  children,
}: {
  video: string;
  hue?: string;
  className?: string;
  priority?: boolean;
  /** Extra classes for the fallback canvas, e.g. "hero-light". */
  canvasClassName?: string;
  children?: ReactNode;
}) {
  const hasVideo = publicFileExists(video);
  const poster = posterFor(video);
  const hasPoster = publicFileExists(poster);
  // Optional vertical cut for phones, e.g. hero-mobile.mp4 next to hero.mp4.
  const mobile = video.replace(/\.mp4$/, "-mobile.mp4");
  const hasMobile = publicFileExists(mobile);

  return (
    <div className={`media-frame ${className}`} data-video-slot={video}>
      {hasVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          poster={hasPoster ? poster : undefined}
          aria-hidden="true"
        >
          {hasMobile && <source src={mobile} type="video/mp4" media="(max-width: 767px)" />}
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <div
          aria-hidden="true"
          className={`light-canvas drift grain ${canvasClassName}`}
          style={hue ? ({ "--hue": hue } as CSSProperties) : undefined}
        />
      )}
      {children}
    </div>
  );
}
