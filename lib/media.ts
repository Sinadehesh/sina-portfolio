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

/** Tint for each project's fallback canvas, so tiles differ before videos exist. */
const hues: Record<string, string> = {
  optimolds: "#5f8f86",
  oopscupid: "#b8667a",
  costly: "#c8a45c",
  "interview-simulation-study": "#6a86b0",
  "workflow-automation-engine": "#7f9a68",
  "daily-sublime": "#b0704f",
  recallmate: "#8a78b0",
  "daily-hustle": "#c08a4a",
  passway: "#5a8aa0",
  "dopamine-box": "#a85a8a",
  musicity: "#9a6aa0",
};
export const hueFor = (slug: string) => hues[slug] ?? "#c8a45c";
