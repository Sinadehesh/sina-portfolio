import type { CSSProperties, ReactNode } from "react";
import AutoVideo from "@/components/ui/AutoVideo";
import { publicFileExists, videoFiles } from "@/lib/media";

/**
 * A slot for a short looping video. If the file exists in /public at build
 * time it plays silently and looped, only while on screen (with an optional `-mobile.mp4` vertical cut
 * and `.jpg` poster). Without a video it shows `image` if given, otherwise a
 * designed light-canvas fallback tinted by `hue`. Overlay content goes in
 * `children`.
 */
export function MediaSlot({
  video,
  hue,
  className = "",
  priority = false,
  canvasClassName = "",
  image,
  imageAlt = "",
  children,
}: {
  /** Leave out for no video. */
  video?: string;
  hue?: string;
  className?: string;
  priority?: boolean;
  /** Extra classes for the fallback canvas, e.g. "hero-light". */
  canvasClassName?: string;
  /** Real screenshot or artwork shown when there is no video. */
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  const hasVideo = video ? publicFileExists(video) : false;

  return (
    <div className={`media-frame ${className}`} data-video-slot={video}>
      {hasVideo ? (
        <AutoVideo {...videoFiles(video!)} eager={priority} />
      ) : image ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset
        <img src={image} alt={imageAlt} loading={priority ? "eager" : "lazy"} decoding="async" />
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
