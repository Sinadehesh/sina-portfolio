// Single source of truth for every page, JSON-LD node, llms.txt and the sitemap.
// Edit content here; nothing else should hard-code profile or project facts.

export const site = {
  url: "https://sinadehesh.com",
  title: "Sina Dehesh — Behavioral AI Product Architect & Lead UX Researcher",
  description:
    "Sina Dehesh builds AI products people actually adopt, combining experimental psychology, quantitative UX research and full-stack engineering (Next.js, Python, LLM workflows). Based in Milan, Italy.",
  ogImage: "/profile.jpeg",
  locale: "en_US",
};

export const personalInfo = {
  name: "Sina Dehesh",
  headline: "Behavioral AI Product Architect & Lead UX Researcher",
  jobTitles: [
    "AI Product Manager",
    "Lead UX Researcher",
    "Behavioral Product Engineer",
  ],
  location: "Milan, Italy",
  locality: "Milan",
  region: "Lombardy",
  countryCode: "IT",
  serviceArea: ["Milan", "Turin", "Italy", "Europe", "Remote"],
  email: "sinadehesh@gmail.com",
  github: "https://github.com/sinadehesh",
  // TODO: add the LinkedIn profile URL; it is rendered and added to `sameAs` once set.
  linkedin: "",
  profilePicture: "/profile.jpeg",
  heroHeadline:
    "I build AI products that humans actually adopt—combining Experimental Psychology, Quantitative UX Research, and Full-Stack Engineering.",
  heroDescription:
    "Most teams hire a researcher, a product manager and an engineer, then lose weeks in the hand-offs. I do all three in a single sprint: I design the behavioral hypothesis, test it with real users, and ship the production system that measures whether it worked.",
  summary:
    "Sina Dehesh is an applied experimental psychologist and full-stack AI product builder based in Milan, Italy. Sina holds an M.Sc. in Applied Experimental Psychological Sciences from the University of Milano-Bicocca and runs a behavioral tech studio that has shipped consumer and B2B products including OopsCupid (a psychometric relationship-assessment platform), Costly (a native Android attention-cost tracker), Daily Hustle and The Daily Sublime. The work combines quantitative UX research (200+ research interviews, repeated-measures ANOVA, logistic regression), product strategy (Kano, MoSCoW, PRINCE2, Agile) and engineering (Next.js, React, TypeScript, Python, Kotlin, n8n, PostgreSQL, LLM APIs).",
  languages: [
    { name: "English", code: "en", level: "C2" },
    { name: "Persian", code: "fa", level: "Native" },
    { name: "Italian", code: "it", level: "B1" },
    { name: "German", code: "de", level: "A2" },
  ],
};

export const proofStats = [
  { value: "6+", label: "Production AI & behavioral apps shipped" },
  { value: "200+", label: "User & clinical research interviews analyzed" },
  // TODO: confirm this matches your CV timeline before publishing.
  { value: "5+", label: "Years in venture, product strategy & R&D" },
  {
    value: "M.Sc.",
    label: "Applied Experimental Psychological Sciences (Milano-Bicocca)",
  },
];

export const targetRoles = [
  {
    title: "AI Product Manager / 0-to-1 Product Builder",
    pitch:
      "Takes an AI product from problem framing and business plan to a shipped, instrumented release — without waiting on a separate design or engineering team.",
    proof: ["recallmate", "oopscupid", "daily-hustle"],
  },
  {
    title: "Senior UX Researcher & Behavioral Designer",
    pitch:
      "Runs mixed-methods research — semi-structured interviews, thematic coding, controlled experiments, psychometric instruments — and turns findings into prioritized product decisions.",
    proof: ["interview-simulation-study", "musicity", "recallmate"],
  },
  {
    title: "AI Prototyper & Growth Engineer",
    pitch:
      "Builds functional AI prototypes and automation pipelines in days, then wires in the retention mechanics and measurement that prove whether they work.",
    proof: ["workflow-automation-engine", "costly", "daily-sublime"],
  },
];

export const workExperience = [
  {
    company: "Behavioral Tech Studio",
    location: "Milan, Italy · Remote",
    position: "Principal AI Product Builder & Founder",
    period: "2021 – Present",
    achievements: [
      "Designed, built and shipped a portfolio of consumer and B2B products end to end — OopsCupid, Costly, Daily Hustle, The Daily Sublime, Passway and a CRM automation engine — each starting from an explicit behavioral hypothesis.",
      "Built OopsCupid solo across the full stack: psychometric instrument design, live profile database, LLM narrative-profiling layer and a zero-sign-up interface with daily challenges and streak mechanics.",
      "Engineered Costly in Kotlin for native Android: a real-time burn-rate ticker that prices distraction time against a user's own savings goal, applying loss framing as behavioral friction.",
      "Delivered an n8n + Pipedrive automation engine that extracts deal data from calls and email with a confidence gate and human-in-the-loop review, so CRM writes are never wrong.",
      "Shipped Daily Hustle (structured idea-to-income programs with dashboards and workbooks) and The Daily Sublime (a 30-issue email magazine built around one-click reply engagement signals).",
    ],
  },
  {
    company: "University of Milano-Bicocca — RecallMate",
    location: "Milan, Italy",
    position: "Product Lead & Behavioral AI Researcher",
    // TODO: add the project dates.
    period: "",
    achievements: [
      "Set the 0-to-1 product vision for RecallMate, an AI-assisted learning app, and authored its business plan and monetization model.",
      "Benchmarked active recall, spaced repetition and conversational AI against Anki and Quizlet to locate the friction points where learners abandon review.",
      "Led multi-round user interviews with thematic coding and prioritized the roadmap with the MoSCoW method.",
      "Designed the full interactive Figma prototype and specified a simplified SM-2 spaced-repetition scheduler integrated with conversational AI tutoring.",
    ],
  },
  {
    company: "Musicity",
    location: "Milan, Italy",
    position: "Product Strategy Consultant",
    // TODO: add the engagement dates.
    period: "",
    achievements: [
      "Ran a structured semi-structured interview protocol across artist, listener and venue segments and coded transcripts into a ranked jobs-to-be-done backlog.",
      "Built the financial structure and a business model designed to force product-market fit rather than wait for it.",
    ],
  },
  {
    company: "Guardbar — Shiraz Science & Technology Innovation Park",
    location: "Shiraz, Iran",
    position: "Co-Founder & Head of Product Strategy",
    // TODO: add the venture dates.
    period: "",
    achievements: [
      "Led B2B and stakeholder requirement gathering and translated it into product requirements.",
      "Authored the venture business plan and managed stakeholder communication.",
      "Ran operations within the Shiraz Science and Technology Innovation Park ecosystem.",
    ],
  },
  {
    company: "Salami Rehabilitation Center",
    location: "Iran",
    position: "Quantitative Behavioral Researcher",
    // TODO: add the research dates.
    period: "",
    achievements: [
      "Conducted 200 semi-structured interviews with clinical participants.",
      "Modeled outcomes with binary logistic regression in SPSS to inform evidence-based intervention decisions.",
    ],
  },
];

export const education = [
  {
    institution: "University of Milano-Bicocca",
    location: "Milan, Italy",
    degree: "M.Sc. Applied Experimental Psychological Sciences",
    // TODO: add the enrolment years.
    period: "",
    achievements: [
      "Focus: cognitive ergonomics, human-technology interaction, psychometrics, consumer psychology, and quantitative/computational behavioral measurement.",
      "Thesis: automated interview simulation (within-subjects, N = 96). Repeated-measures ANOVA showed significantly greater candidate expressiveness under self-referential visual feedback (p = .009).",
    ],
  },
];

export const certifications = [
  { name: "Google UX Design", issuer: "Google" },
  { name: "Google Data Analytics", issuer: "Google" },
  { name: "Generative AI for Data Scientists", issuer: "IBM" },
  { name: "HubSpot Data Integrations", issuer: "HubSpot" },
];

export const skillGroups = [
  {
    title: "Behavioral Science & Quantitative UX Research",
    icon: "🧠",
    items: [
      "Applied Experimental Psychology",
      "Cognitive Ergonomics",
      "Human-Computer Interaction",
      "Behavioral Economics",
      "Psychometrics",
      "Usability Testing",
      "Semi-structured Interviews",
      "Thematic Coding",
      "Repeated-measures ANOVA",
      "Binary Logistic Regression",
      "SPSS",
    ],
  },
  {
    title: "Product Strategy & Prototyping",
    icon: "🧭",
    items: [
      "0-to-1 Product Management",
      "Jobs-to-be-Done",
      "Kano Model",
      "MoSCoW Prioritization",
      "PRINCE2",
      "Agile",
      "SAP Activate",
      "Business Planning & Monetization",
      "Figma Prototyping",
      "Wireframing",
    ],
  },
  {
    title: "Full-Stack AI Engineering",
    icon: "⚙️",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "Kotlin (Android)",
      "PostgreSQL",
      "SQL",
      "n8n",
      "LLM APIs & Agentic Workflows",
      "Conversational AI",
      "Vercel",
      "Git",
      "Power BI",
    ],
  },
];

export type SchemaType =
  | "WebApplication"
  | "MobileApplication"
  | "SoftwareApplication"
  | "CreativeWork";

export interface DecisionLogEntry {
  challenge: string;
  hypothesis: string;
  method: string;
  outcome: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  tagline: string;
  /** Hidden from every page, schema, llms.txt and sitemap until set to true. */
  published: boolean;
  category: "Consumer app" | "B2B automation" | "Research" | "Consulting" | "Media product" | "EdTech";
  status: "Live" | "Shipped" | "Prototype" | "Completed";
  schemaType: SchemaType;
  applicationCategory?: string;
  operatingSystem?: string;
  url?: string;
  image?: string;
  role: string;
  organization: string;
  /** Answer-first snippet: problem, mechanism, outcome — keep under ~50 words. */
  summary: string;
  impact: {
    problem: string;
    mechanism: string;
    stack: string[];
    outcome: string;
  };
  metrics: { value: string; label: string }[];
  benchmarks?: { name: string; strength: string; gap: string }[];
  tradeoffs: string[];
  decisionLog: DecisionLogEntry[];
  featureList: string[];
  keywords: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "recallmate",
    name: "RecallMate",
    tagline: "AI-assisted spaced repetition with conversational tutoring",
    published: true,
    category: "EdTech",
    status: "Prototype",
    schemaType: "SoftwareApplication",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    role: "Product Lead & Behavioral AI Researcher",
    organization: "University of Milano-Bicocca",
    summary:
      "RecallMate is an AI-assisted learning app I led from 0-to-1 at the University of Milano-Bicocca. It targets the main failure of flashcard tools — learners abandon review before memory consolidates — by pairing a simplified SM-2 spaced-repetition scheduler with conversational AI, validated through multi-round user interviews and MoSCoW prioritization.",
    impact: {
      problem:
        "Spaced repetition works, but tools like Anki demand heavy setup and card authoring, so most learners quit before the retention benefit compounds.",
      mechanism:
        "Active recall + SM-2 spacing to exploit the spacing effect, with conversational AI removing card-creation and explanation friction (cognitive-load reduction).",
      stack: ["Figma", "SM-2 algorithm", "Conversational AI / LLM", "Business plan & monetization model"],
      outcome:
        "A validated MVP scope, a full interactive Figma prototype, an integrated SM-2 scheduling spec and an authored business plan — built from interview evidence rather than feature guesses.",
    },
    metrics: [
      { value: "2", label: "Incumbents benchmarked (Anki, Quizlet)" },
      { value: "Multi-round", label: "User interviews with thematic coding" },
      { value: "SM-2", label: "Spaced-repetition algorithm integrated" },
    ],
    benchmarks: [
      {
        name: "Anki",
        strength: "Mature SM-2-family scheduling and deep customization.",
        gap: "High setup and card-authoring friction; steep onboarding.",
      },
      {
        name: "Quizlet",
        strength: "Low-friction study modes and broad shared content.",
        gap: "Less rigorous long-term scheduling for retention.",
      },
      {
        name: "RecallMate",
        strength: "SM-2 scheduling plus conversational AI that drafts and explains cards.",
        gap: "Prototype stage; AI output quality needs ongoing evaluation.",
      },
    ],
    tradeoffs: [
      "Chose a simplified SM-2 (ease factor, interval, repetition count) over newer schedulers to keep the model explainable and easy to implement, accepting a small loss in scheduling precision.",
      "Used conversational AI to lower authoring effort, while keeping recall attempts user-generated so the testing effect is not outsourced to the model.",
      "Scoped the MVP with MoSCoW so AI tutoring and scheduling shipped first and social features waited for evidence.",
    ],
    decisionLog: [
      {
        challenge: "Learners drop spaced-repetition tools before the benefit compounds.",
        hypothesis: "Setup and card-authoring friction, not motivation, drives early abandonment.",
        method: "Competitive benchmark of Anki and Quizlet; multi-round semi-structured interviews with thematic coding.",
        outcome: "Ranked pain-point backlog; AI-assisted card creation and conversational review promoted to Must-have.",
      },
      {
        challenge: "Scheduling rigor vs. explainability.",
        hypothesis: "A simplified SM-2 delivers most of the retention benefit with a model users and the team can reason about.",
        method: "Algorithm specification and integration into the prototype flow.",
        outcome: "Simplified SM-2 scheduler specified and integrated with the conversational layer.",
      },
      {
        challenge: "Too many candidate features for a first release.",
        hypothesis: "Explicit prioritization keeps the MVP focused on the retention loop.",
        method: "MoSCoW prioritization informed by interview themes.",
        outcome: "Locked MVP scope; Should/Could items deferred to post-validation.",
      },
      {
        challenge: "No path to sustainability.",
        hypothesis: "A clear monetization model is needed before build-out.",
        method: "Business plan and monetization model authoring.",
        outcome: "Complete business plan delivered alongside the prototype.",
      },
    ],
    featureList: [
      "SM-2 spaced-repetition scheduling",
      "Active-recall review sessions",
      "Conversational AI tutoring and explanations",
      "AI-assisted flashcard creation",
      "Interactive Figma prototype",
    ],
    keywords: ["SM-2 Algorithm", "Spaced Repetition", "Active Recall", "Conversational AI Onboarding", "MoSCoW Method", "Cognitive Ergonomics"],
  },
  {
    slug: "oopscupid",
    name: "OopsCupid",
    tagline: "Psychometric relationship assessments with an LLM profiling layer",
    published: true,
    category: "Consumer app",
    status: "Live",
    schemaType: "WebApplication",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    url: "https://www.oopscupid.com",
    role: "Founder & solo full-stack builder",
    organization: "Behavioral Tech Studio",
    summary:
      "OopsCupid is a live relationship-assessment platform I built solo, end to end. It turns attachment and relationship psychology into short, no-sign-up tests and games, scores responses into a six-axis psychometric profile, and uses an LLM layer to write the readout — with daily challenges and streaks driving return visits.",
    impact: {
      problem:
        "Relationship self-help content is either unscientific listicles or long clinical questionnaires that people abandon before finishing.",
      mechanism:
        "Zero-friction entry (no sign-up, no email), psychometric scoring, variable daily challenges and streaks as a habit loop, and LLM-generated narrative feedback.",
      stack: ["Full-stack web app", "Live profile database", "LLM API (narrative profiling)", "Psychometric instrument design"],
      outcome:
        "Live product with 15 free research-informed tests, a 16-level game, daily challenges and a merch storefront as a first monetization channel.",
    },
    metrics: [
      { value: "15", label: "Free research-informed tests live" },
      { value: "6", label: "Psychometric axes in each profile" },
      { value: "0", label: "Sign-up steps before the first result" },
    ],
    tradeoffs: [
      "Removed sign-up entirely to maximize completion, trading away email capture for top-of-funnel conversion.",
      "Scores are computed deterministically from the instrument; the LLM only narrates them, so profiles stay consistent and auditable.",
      "Short gamified formats (bingo, tier lists, receipts) sit in front of the deep tests to warm users up before longer instruments.",
    ],
    decisionLog: [
      {
        challenge: "Long questionnaires have high abandonment.",
        hypothesis: "Short game-like formats before deeper tests raise completion.",
        method: "Instrument design split into quick formats and deep tests.",
        outcome: "Funnel of quick games feeding 15 deeper assessments.",
      },
      {
        challenge: "One-off quiz traffic does not return.",
        hypothesis: "A variable daily challenge with streaks creates a return habit.",
        method: "Daily challenge and streak mechanics on the home surface.",
        outcome: "Daily challenge loop shipped as the primary re-engagement surface.",
      },
      {
        challenge: "Generic results feel like horoscopes.",
        hypothesis: "Multi-axis scores plus personalized narrative feel credible.",
        method: "Six-axis psychometric scoring with an LLM narrative layer.",
        outcome: "Radar-style profile with LLM-written readout.",
      },
    ],
    featureList: [
      "Attachment style test",
      "15 free relationship assessments",
      "Six-axis psychometric profile",
      "LLM-generated personality narrative",
      "Daily challenges with streaks",
      "Browser games (Flag Runner, Love Tower)",
      "No sign-up required",
    ],
    keywords: ["Psychometrics", "Variable Reward Schedules", "Retention Mechanics", "LLM Profiling", "Funnel Optimization"],
  },
  {
    slug: "costly",
    name: "Costly",
    tagline: "A real-time burn-rate ticker that prices distraction",
    published: true,
    category: "Consumer app",
    status: "Shipped",
    schemaType: "MobileApplication",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Android",
    role: "Founder & Android engineer",
    organization: "Behavioral Tech Studio",
    summary:
      "Costly is a native Android app that makes the cost of distraction visible. It tracks foreground app time and converts it in real time into money burned against the user's own savings goal — applying loss framing and behavioral friction so the stakes of a scroll session are never abstract.",
    impact: {
      problem:
        "Screen-time dashboards report minutes after the fact; minutes feel free, so the information rarely changes behavior.",
      mechanism:
        "Loss aversion and mental accounting: distraction time is priced at a user-set hourly rate and anchored to a personal savings goal, shown live with no zero state.",
      stack: ["Kotlin", "Native Android", "Foreground app usage signal"],
      outcome:
        "Shipped native Android app with a real-time burn ticker tied to a personal goal.",
    },
    metrics: [
      { value: "Real-time", label: "Burn-rate feedback during the session" },
      { value: "1", label: "User-set anchor (savings goal)" },
      { value: "Native", label: "Kotlin, no cross-platform wrapper" },
    ],
    tradeoffs: [
      "Native Kotlin over a cross-platform framework, for reliable access to Android usage signals.",
      "Monetary framing over time framing, because loss in currency is more salient than loss in minutes.",
      "No zero state: the meter always runs, which is the intervention itself.",
    ],
    decisionLog: [
      {
        challenge: "Screen-time stats do not change behavior.",
        hypothesis: "Pricing time in money tied to a personal goal triggers loss aversion.",
        method: "Burn-rate model: hourly price × foreground distraction time vs. savings goal.",
        outcome: "Live ticker that shows money burned this session.",
      },
      {
        challenge: "Abstract feedback is easy to ignore.",
        hypothesis: "Real-time, in-session feedback beats end-of-day reports.",
        method: "Foreground app tracking with a live meter.",
        outcome: "Feedback delivered while the behavior is happening.",
      },
    ],
    featureList: [
      "Real-time distraction burn-rate ticker",
      "User-set hourly price",
      "Savings-goal anchoring",
      "Foreground app time tracking",
    ],
    keywords: ["Behavioral Friction", "Loss Aversion", "Digital Wellbeing", "Kotlin", "Android"],
  },
  {
    slug: "workflow-automation-engine",
    name: "Workflow Automation Engine",
    tagline: "n8n + Pipedrive CRM automation with human-in-the-loop review",
    published: true,
    category: "B2B automation",
    status: "Shipped",
    schemaType: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    role: "Automation architect & engineer",
    organization: "Behavioral Tech Studio",
    summary:
      "The Workflow Automation Engine captures CRM signal from sales calls and email threads and writes it to Pipedrive automatically. Custom n8n pipelines transcribe and extract deal fields, a confidence gate routes ambiguous extractions to human review, and data integrity is the invariant: the pipeline may be slow, never wrong.",
    impact: {
      problem:
        "Sales teams skip CRM data entry, so pipelines rot; naive AI auto-fill makes it worse by writing wrong data.",
      mechanism:
        "Human-in-the-loop automation: high-confidence LLM extractions sync straight through, low-confidence ones wait for a human, matching automation to trust.",
      stack: ["n8n", "Pipedrive API", "Speech-to-text", "LLM entity extraction"],
      outcome:
        "Production pipeline that removes manual CRM entry while guaranteeing no unreviewed ambiguous writes.",
    },
    metrics: [
      { value: "2", label: "Ingestion sources (calls, email)" },
      { value: "1", label: "Confidence gate on every write path" },
      { value: "0", label: "Ambiguous writes without human approval" },
    ],
    tradeoffs: [
      "Accepted latency on ambiguous records in exchange for zero incorrect CRM writes.",
      "Chose n8n for visual, maintainable pipelines that non-engineers can audit.",
    ],
    decisionLog: [
      {
        challenge: "CRM data is incomplete because entry is manual.",
        hypothesis: "Extracting fields from calls and email removes the effort barrier.",
        method: "n8n triggers → transcription → LLM entity extraction.",
        outcome: "Deal fields populated automatically from conversations.",
      },
      {
        challenge: "AI extraction is sometimes wrong.",
        hypothesis: "Users trust automation that defers when unsure.",
        method: "Confidence gate with a manual review queue.",
        outcome: "High-confidence writes sync instantly; ambiguous ones are human-approved.",
      },
    ],
    featureList: [
      "Call recording and email capture",
      "Transcription and LLM entity extraction",
      "Confidence-gated routing",
      "Human-in-the-loop review queue",
      "Pipedrive sync",
    ],
    keywords: ["n8n", "LLM Agentic Workflows", "Human-in-the-loop", "CRM Automation", "Pipedrive"],
  },
  {
    slug: "daily-hustle",
    name: "Daily Hustle",
    tagline: "Structured idea-to-income programs with daily action steps",
    published: true,
    category: "EdTech",
    status: "Live",
    schemaType: "WebApplication",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://hustle.sinadehesh.com/",
    image: "/images/daily_hustle_preview.png",
    role: "Founder & full-stack builder",
    organization: "Behavioral Tech Studio",
    summary:
      "Daily Hustle is a live web platform that guides creators from idea to first income. It breaks a launch into a 27-day program of daily action steps with built-in workbooks and a progress dashboard — using task chunking and goal-gradient feedback to keep people moving where open-ended courses stall.",
    impact: {
      problem: "Online courses have notoriously low completion; open-ended content leaves learners without a next step.",
      mechanism:
        "Implementation intentions and chunking (one concrete action per day) plus goal-gradient progress feedback in a personal dashboard.",
      stack: ["Full-stack web app", "Authentication", "User dashboard", "Admin console", "Payments"],
      outcome: "Live product with a 27-day launch program, workbooks, accounts, pricing and admin tooling.",
    },
    metrics: [
      { value: "27", label: "Days in the flagship launch program" },
      { value: "1", label: "Concrete action step per day" },
    ],
    tradeoffs: [
      "Fixed daily structure over self-paced browsing, trading flexibility for completion.",
      "Workbooks built into the product instead of downloadable PDFs, so progress is tracked.",
    ],
    decisionLog: [
      {
        challenge: "Course learners stall without a clear next step.",
        hypothesis: "One small, dated action per day raises follow-through.",
        method: "27-day program design with daily steps.",
        outcome: "Daily action-step curriculum shipped.",
      },
      {
        challenge: "Progress is invisible in long programs.",
        hypothesis: "Visible progress accelerates effort near milestones (goal-gradient).",
        method: "Personal dashboard and in-app workbooks.",
        outcome: "Dashboard with tracked workbook progress.",
      },
    ],
    featureList: ["27-Day Launch program", "Daily action steps", "Built-in workbooks", "Progress dashboard", "Accounts and pricing"],
    keywords: ["Retention Mechanics", "Goal-Gradient Effect", "Course Completion", "EdTech"],
  },
  {
    slug: "daily-sublime",
    name: "The Daily Sublime",
    tagline: "A 30-issue art-meditation email magazine engineered for engagement signal",
    published: true,
    category: "Media product",
    status: "Live",
    schemaType: "CreativeWork",
    url: "https://daily.sinadehesh.com/",
    image: "/images/daily_sublime_preview.png",
    role: "Founder, editor & builder",
    organization: "Behavioral Tech Studio",
    summary:
      "The Daily Sublime is a 30-issue digital art magazine and visual-mindfulness course delivered by email. Each issue is a five-minute guided observation of one painting, ending in one-click reply buttons — the lowest-friction response surface an inbox allows — turning passive readers into a measurable engagement signal.",
    impact: {
      problem:
        "Newsletters cannot tell what lands: open rates are noisy and replies take effort, so most readers never signal anything.",
      mechanism:
        "Friction reduction at the response step (one-click replies) plus a fixed daily ritual that builds a reading habit.",
      stack: ["HTML email", "Landing page", "Gumroad checkout", "YouTube companion channel"],
      outcome: "30 issues shipped with per-issue reply signal, a paid course offer and a companion meditation channel.",
    },
    metrics: [
      { value: "30", label: "Issues shipped" },
      { value: "1-click", label: "Reply buttons in every issue" },
      { value: "5 min", label: "Daily guided observation" },
    ],
    tradeoffs: [
      "Email over an app: zero install friction, at the cost of richer interaction.",
      "One-click buttons over free-text replies, trading nuance for response volume.",
    ],
    decisionLog: [
      {
        challenge: "No reliable signal on which issues resonate.",
        hypothesis: "Lowering reply effort to one click multiplies response rate.",
        method: "One-click reply buttons at the end of each issue.",
        outcome: "Per-issue engagement logged across 30 issues.",
      },
      {
        challenge: "Attention fatigue from doomscrolling.",
        hypothesis: "A short daily ritual with one artwork builds a habit.",
        method: "Five-minute guided 'slow looking' format.",
        outcome: "Daily art-meditation course and companion channel.",
      },
    ],
    featureList: ["Daily art-observation email", "Guided slow-looking exercises", "One-click reply engagement", "Paid course"],
    keywords: ["Friction Reduction", "Habit Formation", "Email Engagement", "Visual Mindfulness"],
  },
  {
    slug: "passway",
    name: "Passway",
    tagline: "Curriculum-gap tracker built on a two-source data model",
    published: true,
    category: "EdTech",
    status: "Prototype",
    schemaType: "WebApplication",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    role: "Founder & builder",
    organization: "Behavioral Tech Studio",
    summary:
      "Passway is an engineering learning tracker built on a two-source data model: the canonical engineering curriculum on one axis and what universities actually teach on the other. Mapping both onto one topic grid exposes the gap between them, which is the product — a personal map of what a learner still needs.",
    impact: {
      problem: "Engineering learners cannot see which core topics their program under-covers until it shows up in interviews.",
      mechanism: "Gap analysis between a canonical topic matrix and observed per-program coverage, rendered as a comparable grid.",
      stack: ["Web app", "Two-source data model", "Data visualization"],
      outcome: "Working prototype comparing 10 core topics across 6 university programs.",
    },
    metrics: [
      { value: "10", label: "Canonical engineering topics modeled" },
      { value: "6", label: "University programs mapped" },
    ],
    tradeoffs: ["Weighted topic coverage (0–1) instead of binary 'taught / not taught', so partial coverage is visible."],
    decisionLog: [
      {
        challenge: "Curricula are not comparable across universities.",
        hypothesis: "Mapping every program onto one canonical topic grid makes gaps measurable.",
        method: "Two-source model: canonical weights vs. observed coverage.",
        outcome: "Gap matrix highlighting topics at least 0.25 below canonical weight.",
      },
    ],
    featureList: ["Canonical curriculum matrix", "Per-program coverage mapping", "Gap highlighting"],
    keywords: ["Data Modeling", "Gap Analysis", "EdTech", "Data Visualization"],
  },
  {
    slug: "dopamine-box",
    name: "Dopamine Box",
    tagline: "Variable-reward habit loops by design",
    published: true,
    category: "Consumer app",
    status: "Shipped",
    schemaType: "WebApplication",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    // TODO: add the live URL, tech stack and a screenshot.
    role: "Founder & builder",
    organization: "Behavioral Tech Studio",
    summary:
      "Dopamine Box is a behavioral product that applies variable-ratio reward schedules — the reinforcement pattern behind the most habit-forming products — to positive routines. Unpredictable rewards replace fixed ones so the habit loop holds attention after the novelty of a streak counter wears off.",
    impact: {
      problem: "Fixed, predictable rewards lose motivational pull quickly, so habit apps see engagement decay after the first weeks.",
      mechanism: "Variable-ratio reinforcement: rewards arrive unpredictably, sustaining anticipation and repeat behavior.",
      stack: ["Web app"],
      outcome: "Shipped product built around a variable-reward core loop.",
    },
    metrics: [{ value: "Variable-ratio", label: "Reinforcement schedule at the core loop" }],
    tradeoffs: ["Variable rewards are powerful, so the loop rewards positive routines rather than time spent in the app."],
    decisionLog: [
      {
        challenge: "Habit apps lose users once fixed rewards become predictable.",
        hypothesis: "Unpredictable rewards sustain engagement longer than fixed ones.",
        method: "Variable-ratio reward mechanic as the core loop.",
        outcome: "Variable-reward loop shipped as the core experience.",
      },
    ],
    featureList: ["Variable-ratio reward reveals", "Habit loop design"],
    keywords: ["Variable Reward Schedules", "Habit Loops", "Retention Mechanics", "Operant Conditioning"],
  },
  {
    slug: "musicity",
    name: "Musicity",
    tagline: "End-to-end product strategy for a music platform chasing fit",
    published: true,
    category: "Consulting",
    status: "Completed",
    schemaType: "CreativeWork",
    role: "Product Strategy Consultant",
    organization: "Musicity",
    summary:
      "For Musicity, a music platform, I ran a full product-strategy engagement: structured interviews across artists, listeners and venues, coded into a ranked jobs-to-be-done backlog, followed by financial structuring and a business model designed to force product-market fit instead of waiting for it.",
    impact: {
      problem: "The platform had three user segments with conflicting needs and no evidence of which job to win first.",
      mechanism: "Separating stated wants from behavioral demand through coded semi-structured interviews and JTBD ranking.",
      stack: ["Semi-structured interview protocol", "Thematic coding", "Jobs-to-be-Done", "Financial modeling"],
      outcome: "Ranked JTBD backlog, financial structure and a fit-forcing business model.",
    },
    metrics: [
      { value: "3", label: "Segments mapped (artists, listeners, venues)" },
      { value: "3", label: "Phases: discovery, finance, model" },
    ],
    tradeoffs: ["Prioritized behavioral evidence over stated preferences when the two conflicted."],
    decisionLog: [
      {
        challenge: "Unclear which segment and job to serve first.",
        hypothesis: "Coded interviews reveal the jobs users' behavior actually demands.",
        method: "Semi-structured protocol across segments; thematic coding.",
        outcome: "Ranked jobs-to-be-done backlog.",
      },
      {
        challenge: "Business model disconnected from user evidence.",
        hypothesis: "A model built from the JTBD ranking accelerates fit.",
        method: "Financial structuring and business-model design.",
        outcome: "Business model built to force product-market fit.",
      },
    ],
    featureList: ["User interview program", "JTBD backlog", "Financial structure", "Business model"],
    keywords: ["Jobs-to-be-Done", "Product-Market Fit", "User Research", "Product Strategy"],
  },
  {
    slug: "interview-simulation-study",
    name: "Automated Interview Simulation Study",
    tagline: "How self-referential visual feedback changes candidate behavior",
    published: true,
    category: "Research",
    status: "Completed",
    schemaType: "CreativeWork",
    role: "Principal investigator (M.Sc. thesis)",
    organization: "University of Milano-Bicocca",
    summary:
      "This controlled experiment tested how visual feedback in an automated interview changes candidate behavior. In a within-subjects design with 96 participants, repeated-measures ANOVA showed significantly greater expressiveness when candidates saw themselves (M = 4.18) than with no feedback (M = 3.41), p = .009.",
    impact: {
      problem: "AI-led interviews are spreading, but little is known about how their interface design shapes candidate behavior.",
      mechanism: "Self-referential visual feedback (seeing oneself) as a manipulation of self-awareness and expressiveness.",
      stack: ["Automated interview simulation", "Within-subjects design", "Repeated-measures ANOVA"],
      outcome: "Significant effect of self-referential feedback on expressiveness (p = .009), with direct implications for AI interview UX.",
    },
    metrics: [
      { value: "N = 96", label: "Participants, within-subjects" },
      { value: "p = .009", label: "Self vs. no feedback contrast" },
      { value: "4.18 vs 3.41", label: "Mean expressiveness, self vs. none" },
    ],
    tradeoffs: ["Within-subjects design for statistical power with a moderate sample, controlling order effects across conditions."],
    decisionLog: [
      {
        challenge: "Does interface feedback change how candidates present themselves?",
        hypothesis: "Self-referential feedback increases expressiveness.",
        method: "Three conditions (none, interviewer image, self); repeated-measures ANOVA, N = 96.",
        outcome: "Self condition significantly higher than none, p = .009.",
      },
    ],
    featureList: ["Automated interview simulator", "Three feedback conditions", "Repeated-measures analysis"],
    keywords: ["Experimental Design", "Repeated-measures ANOVA", "Human-Computer Interaction", "AI Interviews"],
  },
  {
    slug: "debubble",
    name: "Debubble",
    tagline: "",
    // TODO: fill in the real details and URL, then set published: true.
    published: false,
    category: "Consumer app",
    status: "Live",
    schemaType: "WebApplication",
    operatingSystem: "Web",
    role: "Founder & builder",
    organization: "Behavioral Tech Studio",
    summary: "",
    impact: { problem: "", mechanism: "", stack: [], outcome: "" },
    metrics: [],
    tradeoffs: [],
    decisionLog: [],
    featureList: [],
    keywords: [],
  },
  {
    slug: "merge-farmstead",
    name: "Merge Farmstead",
    tagline: "",
    // TODO: fill in the real details and URL, then set published: true.
    published: false,
    category: "Consumer app",
    status: "Live",
    schemaType: "WebApplication",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    role: "Founder & builder",
    organization: "Behavioral Tech Studio",
    summary: "",
    impact: { problem: "", mechanism: "", stack: [], outcome: "" },
    metrics: [],
    tradeoffs: [],
    decisionLog: [],
    featureList: [],
    keywords: [],
  },
];

export const publishedCaseStudies = caseStudies.filter((c) => c.published);

export const getCaseStudy = (slug: string) =>
  publishedCaseStudies.find((c) => c.slug === slug);

export const problemMatrix = [
  {
    question: "Need to fix user drop-off and retention?",
    answer:
      "I engineer habit loops from behavioral science, not guesswork: behavioral friction and loss framing that make costs salient, variable reward schedules that sustain engagement, and psychometric assessment that makes feedback feel personal.",
    proof: [
      { slug: "costly", note: "loss-framed behavioral friction" },
      { slug: "dopamine-box", note: "variable-ratio reward loop" },
      { slug: "oopscupid", note: "psychometric profiles + daily streaks" },
    ],
  },
  {
    question: "Need to validate an AI feature before wasting engineering budget?",
    answer:
      "I run multi-round usability testing and interviews, code them thematically, prioritize with Kano and MoSCoW, and build a functional prototype in days — so the build decision rests on evidence.",
    proof: [
      { slug: "recallmate", note: "interviews → MoSCoW → SM-2 + AI prototype" },
      { slug: "musicity", note: "coded interviews → ranked JTBD backlog" },
    ],
  },
  {
    question: "Need someone who bridges research and engineering?",
    answer:
      "My pipeline runs from SPSS and ANOVA modeling and Figma wireframes straight to production Next.js, PostgreSQL, n8n and LLM API deployments — one person, no hand-off loss.",
    proof: [
      { slug: "interview-simulation-study", note: "N = 96 experiment, p = .009" },
      { slug: "workflow-automation-engine", note: "LLM extraction with human-in-the-loop" },
      { slug: "daily-hustle", note: "full-stack product with dashboards" },
    ],
  },
];

export const knowsAbout: { name: string; sameAs?: string }[] = [
  { name: "Applied Experimental Psychology", sameAs: "https://en.wikipedia.org/wiki/Experimental_psychology" },
  { name: "Human-Computer Interaction", sameAs: "https://en.wikipedia.org/wiki/Human%E2%80%93computer_interaction" },
  { name: "Cognitive Ergonomics", sameAs: "https://en.wikipedia.org/wiki/Cognitive_ergonomics" },
  { name: "Behavioral Economics", sameAs: "https://en.wikipedia.org/wiki/Behavioral_economics" },
  { name: "Psychometrics", sameAs: "https://en.wikipedia.org/wiki/Psychometrics" },
  { name: "Spaced Repetition (SM-2 Algorithm)", sameAs: "https://en.wikipedia.org/wiki/Spaced_repetition" },
  { name: "Usability Testing", sameAs: "https://en.wikipedia.org/wiki/Usability_testing" },
  { name: "User Research" },
  { name: "Product Management", sameAs: "https://en.wikipedia.org/wiki/Product_management" },
  { name: "Kano Model", sameAs: "https://en.wikipedia.org/wiki/Kano_model" },
  { name: "MoSCoW Method", sameAs: "https://en.wikipedia.org/wiki/MoSCoW_method" },
  { name: "PRINCE2", sameAs: "https://en.wikipedia.org/wiki/PRINCE2" },
  { name: "Agile Software Development", sameAs: "https://en.wikipedia.org/wiki/Agile_software_development" },
  { name: "Logistic Regression", sameAs: "https://en.wikipedia.org/wiki/Logistic_regression" },
  { name: "Analysis of Variance", sameAs: "https://en.wikipedia.org/wiki/Analysis_of_variance" },
  { name: "Variable Reward Schedules" },
  { name: "Behavioral Friction" },
  { name: "Retention Mechanics" },
  { name: "Conversational AI Prototyping" },
  { name: "LLM Agentic Workflows" },
  { name: "Figma", sameAs: "https://en.wikipedia.org/wiki/Figma" },
  { name: "Next.js", sameAs: "https://en.wikipedia.org/wiki/Next.js" },
  { name: "React", sameAs: "https://en.wikipedia.org/wiki/React_(software)" },
  { name: "TypeScript", sameAs: "https://en.wikipedia.org/wiki/TypeScript" },
  { name: "Python", sameAs: "https://en.wikipedia.org/wiki/Python_(programming_language)" },
  { name: "PostgreSQL", sameAs: "https://en.wikipedia.org/wiki/PostgreSQL" },
  { name: "n8n" },
];
