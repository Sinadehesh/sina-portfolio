"use client";

import { useEffect } from "react";

/**
 * Lets a section's `.pointer-light` layer follow the visitor's pointer.
 * Only on devices with a fine pointer, and never under reduced motion.
 */
export default function PointerLight({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--px", `${x}px`);
        el.style.setProperty("--py", `${y}px`);
        el.classList.add("pointer-on");
      });
    };
    const onLeave = () => el.classList.remove("pointer-on");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return null;
}
