"use client";

import { useState } from "react";
import { useScrollyProgress } from "@/components/scrolly/Scrolly";

/** Screen size the boxes are measured in (the screenshots are taken at 390 × 844). */
const W0 = 390;
const H0 = 844;

export type PhoneShot = {
  src: string;
  alt: string;
  /** Region to highlight, [x, y, w, h] in 390 × 844 screen pixels. */
  ring?: [number, number, number, number];
  /** Short label next to the highlight. */
  label?: string;
  /** Facts that float beside the phone on wide screens. */
  chips?: string[];
};

/**
 * A phone that shows one real screen per scroll step: the screens crossfade,
 * the part each step talks about is ringed, and a few facts float beside it.
 */
export default function PhoneStage({ shots }: { shots: PhoneShot[] }) {
  const [step, setStep] = useState(0);
  useScrollyProgress((_, s) => setStep((prev) => (prev === s ? prev : Math.min(s, shots.length - 1))));
  const shot = shots[step];

  return (
    <div data-stage className="phone-stage">
      <div className="phone-wrap">
        <div className="phone">
          <span aria-hidden="true" className="phone-notch" />
          <div className="phone-screen">
            {shots.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset
              <img
                key={s.src}
                src={s.src}
                alt={i === step ? s.alt : ""}
                aria-hidden={i === step ? undefined : true}
                width={W0}
                height={H0}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`phone-shot ${i === step ? "is-on" : ""}`}
              />
            ))}
            {shots.map((s, i) =>
              s.ring ? (
                <span
                  key={`ring-${s.src}`}
                  aria-hidden="true"
                  className={`phone-ring ${i === step ? "is-on" : ""}`}
                  style={{
                    left: `${(s.ring[0] / W0) * 100}%`,
                    top: `${(s.ring[1] / H0) * 100}%`,
                    width: `${(s.ring[2] / W0) * 100}%`,
                    height: `${(s.ring[3] / H0) * 100}%`,
                  }}
                />
              ) : null,
            )}
          </div>
        </div>

        {shot.label && (
          <span key={`label-${step}`} aria-hidden="true" className="phone-label">
            {shot.label}
          </span>
        )}

        <ul aria-hidden="true" className="phone-chips">
          {(shot.chips ?? []).map((c, i) => (
            <li key={`${step}-${c}`} style={{ animationDelay: `${i * 110}ms` }}>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <ol aria-hidden="true" className="phone-dots">
        {shots.map((s, i) => (
          <li key={s.src} className={i === step ? "is-on" : ""} />
        ))}
      </ol>
    </div>
  );
}
