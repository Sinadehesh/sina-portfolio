import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Build-time check for an optional file in /public. Drop a video at the
 * documented path (see public/videos/README.md), rebuild, and it replaces the
 * designed fallback automatically. Server components only.
 */
export function publicFileExists(src: string): boolean {
  return existsSync(join(process.cwd(), "public", src));
}

export const workVideo = (slug: string) => `/videos/work-${slug}.mp4`;
export const posterFor = (video: string) => video.replace(/\.mp4$/, ".jpg");

export interface VideoFiles {
  /** H.264 MP4, played wherever the browser supports it. */
  src: string;
  /** A lighter cut for phones. */
  mobile?: string;
  /** VP9 WebM copies, for browsers without H.264. */
  webm?: string;
  mobileWebm?: string;
  poster?: string;
}

/** The files that exist next to an MP4 in /public: its WebM copy, phone cut and poster. Server components only. */
export function videoFiles(src: string): VideoFiles {
  const has = (f: string) => (publicFileExists(f) ? f : undefined);
  const mobile = src.replace(/\.mp4$/, "-mobile.mp4");
  return {
    src,
    mobile: has(mobile),
    webm: has(src.replace(/\.mp4$/, ".webm")),
    mobileWebm: has(mobile.replace(/\.mp4$/, ".webm")),
    poster: has(posterFor(src)),
  };
}

/** A project's silent preview loop, if `public/videos/work-<slug>.mp4` exists. Server components only. */
export function previewFor(slug: string): VideoFiles | null {
  const src = workVideo(slug);
  return publicFileExists(src) ? videoFiles(src) : null;
}

/** Tint for each project's fallback canvas, so tiles differ before videos exist. */
const hues: Record<string, string> = {
  optimolds: "#5f8f86",
  oopscupid: "#b8667a",
  costly: "#ff5b1f",
  "interview-simulation-study": "#6a86b0",
  "workflow-automation-engine": "#7f9a68",
  "daily-sublime": "#b0704f",
  recallmate: "#8a78b0",
  "daily-hustle": "#c08a4a",
  passway: "#5a8aa0",
  "dopamine-box": "#a85a8a",
  musicity: "#9a6aa0",
  "app-lockers": "#6f9a5a",
  debubble: "#4a6fd0",
  "virtue-ledger": "#a08050",
  "tao-app": "#8a8070",
  "merge-farmstead": "#c0a040",
};
export const hueFor = (slug: string) => hues[slug] ?? "#ff5b1f";
