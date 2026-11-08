/**
 * The Four Gates — Sina Dehesh's model of why customers hesitate. Every
 * decision passes four moments; at each one a doubt can turn the person back.
 * Name the barrier behind the doubt, then design its fix. Used by the "How I
 * work" scroll story and embedded in articles with [[four-gates]].
 */
export const gates = [
  { n: "01", name: "Understand", doubt: "“What is this, exactly?”", barrier: "Uncertainty", fix: "One clear promise" },
  { n: "02", name: "Trust", doubt: "“Can I trust them?”", barrier: "Low trust", fix: "Proof & social signals" },
  { n: "03", name: "Try", doubt: "“Looks like work.”", barrier: "Effort", fix: "A shorter path" },
  { n: "04", name: "Commit", doubt: "“What if it goes wrong?”", barrier: "Perceived risk", fix: "Risk reversal" },
] as const;
