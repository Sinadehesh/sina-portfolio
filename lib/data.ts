/**
 * Numbers and copy read directly by the interactive charts (components/viz,
 * components/lab, components/media). Page-level positioning, case studies and
 * credentials live in lib/content.ts.
 */

/* ---------------------------------------------------------------
   Shared shapes — declared explicitly so the visualisation
   components consume mutable, non-literal types.
   --------------------------------------------------------------- */
export interface Fact {
  k: string;
  v: string;
}

export type FlowNodeKind =
  | "source"
  | "engine"
  | "process"
  | "gate"
  | "safeguard"
  | "sink";

export interface FlowNode {
  id: string;
  label: string;
  kind: FlowNodeKind;
  /** Normalised layout coordinates in [0, 1]. */
  x: number;
  y: number;
}

export interface FlowLink {
  from: string;
  to: string;
  label: string;
}

export interface Profile {
  id: string;
  label: string;
  /** One score in [0, 1] per axis, index-aligned to `oopsCupid.axes`. */
  values: number[];
}

export interface AnovaCondition {
  id: string;
  label: string;
  mean: number;
  sd: number;
  /** Half-width of the 95% confidence interval. */
  ci: number;
}

export const personal = {
  name: "Sina Dehesh",
  tagline: "Consumer psychology, engineered into products people choose.",
  headline: "Sina Dehesh — Consumer Psychology Consultant & Behavioral Product Builder",
  location: "Milan, Italy",
  email: "sinadehesh@gmail.com",
} as const;

/* ---------------------------------------------------------------
   Case-study charts
   --------------------------------------------------------------- */
export const workflowAutomation: {
  name: string;
  kicker: string;
  summary: string;
  notes: string[];
  nodes: FlowNode[];
  links: FlowLink[];
} = {
  name: "Workflow Automation Engine",
  kicker: "n8n · Pipedrive · CRM integrity",
  summary:
    "Custom n8n pipelines that capture CRM signal from calls and emails and land it in Pipedrive automatically — with manual-review safeguards on every branch where a wrong write would be worse than no write.",
  notes: [
    "Calls and email threads are ingested, transcribed, and parsed into structured deal fields.",
    "High-confidence extractions sync straight through to Pipedrive.",
    "Anything ambiguous is held in a review queue — a human confirms before the CRM is touched.",
    "Data integrity is the invariant: the pipeline is allowed to be slow, never wrong.",
  ],
  nodes: [
    { id: "call", label: "Call recording", kind: "source", x: 0.06, y: 0.28 },
    { id: "email", label: "Email thread", kind: "source", x: 0.06, y: 0.72 },
    { id: "n8n", label: "n8n trigger", kind: "engine", x: 0.27, y: 0.5 },
    { id: "extract", label: "Entity extraction", kind: "process", x: 0.46, y: 0.5 },
    { id: "confidence", label: "Confidence gate", kind: "gate", x: 0.63, y: 0.5 },
    { id: "review", label: "Manual review", kind: "safeguard", x: 0.79, y: 0.82 },
    { id: "pipedrive", label: "Pipedrive", kind: "sink", x: 0.94, y: 0.34 },
  ],
  links: [
    { from: "call", to: "n8n", label: "" },
    { from: "email", to: "n8n", label: "" },
    { from: "n8n", to: "extract", label: "" },
    { from: "extract", to: "confidence", label: "" },
    { from: "confidence", to: "pipedrive", label: "high confidence" },
    { from: "confidence", to: "review", label: "ambiguous" },
    { from: "review", to: "pipedrive", label: "approved write" },
  ],
};

export const costly: {
  name: string;
  kicker: string;
  summary: string;
  premise: string;
  goalLabel: string;
  goalAmount: number;
  hourlyRate: number;
  facts: Fact[];
} = {
  name: "Costly",
  kicker: "Native Android",
  summary:
    "A burn-rate ticker for attention. Costly anchors distraction time directly to a personal savings goal and runs the number in real time — because the stakes in a user's environment are never actually zero.",
  premise:
    "The behavioral truth the app is built on: financial stakes in user environments are never completely zero. Costly makes the number visible instead of letting it stay abstract.",
  goalLabel: "Savings goal",
  goalAmount: 4200,
  hourlyRate: 18.5,
  facts: [
    { k: "Platform", v: "Native Android · Kotlin" },
    { k: "Signal", v: "Foreground app time" },
    { k: "Anchor", v: "User-set savings goal" },
    { k: "Feedback", v: "Real-time burn ticker" },
  ],
};

export const oopsCupid: {
  name: string;
  kicker: string;
  summary: string;
  facts: Fact[];
  axes: string[];
  profiles: Profile[];
} = {
  name: "OopsCupid",
  kicker: "Solo-built platform",
  summary:
    "A relationship assessment platform, built end to end alone: instrument design, database, LLM profiling layer, and interface. Responses are scored into a psychometric profile and read back as a live radar.",
  facts: [
    { k: "Build", v: "Solo — full stack" },
    { k: "Profiling", v: "LLM-generated narrative" },
    { k: "Store", v: "Live profile database" },
    { k: "Readout", v: "Multi-axis psychometric radar" },
  ],
  axes: [
    "Attachment security",
    "Conflict repair",
    "Emotional granularity",
    "Autonomy support",
    "Shared meaning",
    "Trust calibration",
  ],
  profiles: [
    { id: "P-0417", label: "Profile P-0417", values: [0.72, 0.55, 0.84, 0.61, 0.78, 0.66] },
    { id: "P-1183", label: "Profile P-1183", values: [0.41, 0.79, 0.52, 0.88, 0.47, 0.73] },
    { id: "P-2065", label: "Profile P-2065", values: [0.86, 0.63, 0.7, 0.44, 0.9, 0.58] },
    { id: "P-3390", label: "Profile P-3390", values: [0.58, 0.86, 0.63, 0.72, 0.55, 0.81] },
  ],
};

export const passway: {
  name: string;
  kicker: string;
  summary: string;
  sources: { id: string; title: string; body: string }[];
  topics: string[];
  programs: string[];
} = {
  name: "Passway",
  kicker: "Engineering learning-tracker",
  summary:
    "A learning tracker built on a two-source data model: the canonical engineering curriculum on one axis, the coverage actually observed at universities on the other. The gap between them is the product.",
  sources: [
    {
      id: "canonical",
      title: "Source A — Canonical curriculum",
      body:
        "The reference matrix: what an engineering discipline is agreed to contain, topic by topic, independent of any single institution.",
    },
    {
      id: "observed",
      title: "Source B — Observed coverage",
      body:
        "What universities actually teach, gathered per program and mapped onto the same topic grid so the two sources become directly comparable.",
    },
  ],
  topics: [
    "Discrete math",
    "Algorithms",
    "Computer architecture",
    "Operating systems",
    "Networks",
    "Databases",
    "Statistics",
    "Machine learning",
    "Distributed systems",
    "Compilers",
  ],
  programs: ["Milan A", "Milan B", "Turin", "Bologna", "Padua", "Pisa"],
};

/* ---------------------------------------------------------------
   Research & media
   --------------------------------------------------------------- */
export const youtube: {
  name: string;
  kicker: string;
  summary: string;
  cta: string;
  facts: Fact[];
} = {
  name: "The Channel",
  kicker: "YouTube",
  summary:
    "The character is the format. Straight-faced delivery on psychology, systems, and the parts of engineering nobody puts in the syllabus — played completely seriously, which is exactly why it works.",
  cta: "subscribe, I'm serious!",
  facts: [
    { k: "Format", v: "Character-led, straight-faced" },
    { k: "Subjects", v: "Psychology · Systems · Engineering" },
    { k: "Register", v: "Serious. Deadly serious." },
  ],
};

export const dailySublime: {
  name: string;
  kicker: string;
  summary: string;
  issues: number;
  replyButtons: string[];
  facts: Fact[];
} = {
  name: "The Daily Sublime",
  kicker: "Digital art magazine · 30 issues",
  summary:
    "A thirty-issue digital art magazine delivered by email. Each issue ends in one-click reply buttons — the lowest-friction response surface an inbox allows — built to convert passive readers into a measurable engagement signal.",
  issues: 30,
  replyButtons: ["More like this", "Not for me", "Send the artist"],
  facts: [
    { k: "Issues shipped", v: "30" },
    { k: "Channel", v: "Email · HTML" },
    { k: "Engagement device", v: "One-click reply buttons" },
  ],
};

export const thesis: {
  name: string;
  kicker: string;
  summary: string;
  n: number;
  pValue: string;
  finding: string;
  conditions: AnovaCondition[];
  stats: Fact[];
} = {
  name: "Automated interview simulation",
  kicker: "MSc thesis · repeated-measures ANOVA",
  summary:
    "An automated interview simulation testing how self-referential visual feedback changes candidate behavior. Repeated-measures ANOVA over N = 96 shows significantly greater expressiveness when candidates see themselves.",
  n: 96,
  pValue: ".009",
  finding:
    "Greater candidate expressiveness under self-referential visual feedback, p = .009.",
  conditions: [
    { id: "no-feedback", label: "No visual feedback", mean: 3.41, sd: 0.82, ci: 0.17 },
    { id: "other-feedback", label: "Interviewer-image feedback", mean: 3.62, sd: 0.79, ci: 0.16 },
    { id: "self-feedback", label: "Self-referential feedback", mean: 4.18, sd: 0.74, ci: 0.15 },
  ],
  stats: [
    { k: "Design", v: "Within-subjects, repeated measures" },
    { k: "Sample", v: "N = 96" },
    { k: "Test", v: "Repeated-measures ANOVA" },
    { k: "Key contrast", v: "Self vs. none, p = .009" },
  ],
};

export const literature = [
  {
    title: "TAO: The Art of Observation",
    status: "Non-fiction · upcoming",
    body:
      "A working manual for looking at things properly: attention as a trainable instrument, observation as the discipline underneath every method I use elsewhere on this page.",
    progress: 0.68,
  },
  {
    title: "Untitled literary fiction",
    status: "Novel · in progress",
    body:
      "Introspective literary fiction, drafted in the same notebook as the complexity-theory notes. A narrator trying to verify a proof about himself that he cannot construct.",
    progress: 0.42,
  },
] as const;
