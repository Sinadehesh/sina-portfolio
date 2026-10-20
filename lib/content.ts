/**
 * Positioning, case studies, services and credentials — the source for every
 * page, JSON-LD node, llms.txt and the sitemap. Chart-specific numbers stay in
 * lib/data.ts, which the visualisation components read directly.
 */

export const site = {
  url: "https://sinadehesh.com",
  title: "Sina Dehesh — Consumer Psychology Consultant & Behavioral AI Product Architect, Milan",
  description:
    "Sina Dehesh is a consumer psychology consultant and behavioral product architect in Milan, Italy: consumer decision-making research, conversion and lead-generation strategy, and full-stack AI products (Next.js, Python, LLMs).",
  ogImage: "/opengraph-image",
  locale: "en_US",
};

export const personalInfo = {
  name: "Sina Dehesh",
  headline: "Consumer Psychology Consultant & Behavioral AI Product Architect",
  jobTitles: [
    "Consumer Psychology Consultant",
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
  heroHeadline:
    "I engineer why people choose, buy and stay—combining Consumer Psychology, Quantitative UX Research, and Full-Stack AI Engineering.",
  heroDescription:
    "Most teams hire a consumer researcher, a product manager and an engineer, then lose weeks in the hand-offs. I do all three in a single sprint: I diagnose the psychological barrier that stops customers, test the fix with real users, and ship the website, funnel or product that measures whether it worked.",
  summary:
    "Sina Dehesh is a consumer psychology consultant and full-stack behavioral AI product builder based in Milan, Italy, specializing in how people perceive, decide, buy and stay — and in building the websites, funnels and products that act on it. Sina holds an M.Sc. in Applied Experimental Psychological Sciences from the University of Milano-Bicocca and has built consumer and B2B products including Costly (a real-money commitment app against doomscrolling), FloraLock, ShroomLock and CloudLock (learn-to-unlock app lockers), OopsCupid (a psychometric relationship-assessment platform), Daily Hustle and The Daily Sublime. As a consultant, Sina designs consumer-psychology-driven websites and lead-generation funnels, for example for Optimolds, and advises on market fit and go-to-market strategy, for example for Musicity. The work combines consumer psychology and behavioral economics, quantitative UX research (200+ research interviews, repeated-measures ANOVA, logistic regression), product strategy (Kano, MoSCoW, PRINCE2, Agile) and engineering (Next.js, React, TypeScript, Python, Kotlin, n8n, PostgreSQL, LLM APIs).",
  languages: [
    { name: "English", code: "en", level: "C2" },
    { name: "Persian", code: "fa", level: "Native" },
    { name: "Italian", code: "it", level: "B1" },
    { name: "German", code: "de", level: "A2" },
  ],
};

export const proofStats = [
  { value: "N = 96", label: "Controlled experiment, p = .009" },
  { value: "200+", label: "Research interviews conducted & analyzed" },
  { value: "15+", label: "Apps, products & funnels built" },
  { value: "M.Sc.", label: "Experimental psychology, Milano-Bicocca" },
];

/** First-person bio for the homepage About section. */
export const about = [
  "I'm Sina Dehesh, a consumer psychology consultant and behavioral product builder based in Milan. My M.Sc. in Applied Experimental Psychological Sciences at the University of Milano-Bicocca covered research design, psychometrics, quantitative methods, cognitive ergonomics, human-technology interaction and consumer psychology — how people perceive, decide and buy.",
  "I consult on consumer psychology and growth, and I build the products myself: the apps and websites below were designed, researched and engineered end to end. My thesis was a controlled experiment with 96 participants; before that I ran 200 research interviews as a volunteer researcher and co-founded Guardbar.",
  "I work in English, Italian, Persian and German, with teams in Milan, Turin, across Europe and remotely.",
];

export const targetRoles = [
  {
    title: "Consumer Psychology Consultant & Conversion Strategist",
    pitch:
      "Diagnoses why customers hesitate, choose or churn — using consumer psychology and behavioral economics — and turns it into positioning, funnels, websites and product changes that move conversion.",
    proof: ["optimolds", "oopscupid", "costly"],
  },
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

/** Experience in display order. `kind` groups the entries on the homepage. */
export const workExperience: {
  kind: "consulting" | "research" | "venture" | "volunteer";
  company: string;
  location: string;
  position: string;
  period: string;
  achievements: string[];
  caseStudy?: string;
}[] = [
  {
    kind: "consulting",
    company: "Optimolds",
    location: "Italy · Remote",
    position: "Consumer Psychology & Growth Consultant",
    period: "Oct 2026 – Present",
    achievements: [
      "Designed and built the trilingual (English, Italian, German) website and the lead-generation funnel for a composite engineering and mold-making firm.",
      "Applied B2B buyer psychology: a free 48-hour feasibility check as risk reversal, a short CAD-upload form, and trust signals next to one clear call to action.",
    ],
    caseStudy: "optimolds",
  },
  {
    kind: "consulting",
    company: "Musicity",
    location: "Milan, Italy",
    position: "Market-Fit & Go-to-Market Consultant",
    period: "Aug 2026",
    achievements: [
      "Assessed market fit through interviews with artists, listeners and venues, coded into a ranked jobs-to-be-done view of demand.",
      "Recommended the go-to-market sequence: which segment to win first, positioning and launch order.",
    ],
    caseStudy: "musicity",
  },
  {
    kind: "research",
    company: "University of Milano-Bicocca",
    location: "Milan, Italy",
    position: "Research Intern",
    period: "Feb 2025 – Aug 2025",
    achievements: [
      "Led the conceptual development of RecallMate, an AI-assisted learning app: purpose, learning goals, target personas, and a business plan covering the value proposition and monetization.",
      "Reviewed the literature on active recall, spaced repetition and conversational AI, benchmarking study methods against Anki and Quizlet to find market differentiators.",
      "Designed and ran the user research: interview guides, recruitment, multi-round interviews, and thematic coding of the responses into product decisions.",
      "Mapped user flows and built interactive Figma prototypes of the full student journey, from onboarding to content upload and quizzes.",
      "Ran pilot studies and usability tests, and prioritized design improvements with the MoSCoW method.",
      "Contributed to the functional design by integrating a simplified SM-2 spaced-repetition algorithm, and presented the findings to stakeholders and faculty.",
    ],
    caseStudy: "recallmate",
  },
  {
    kind: "venture",
    company: "Guardbar",
    location: "Shiraz, Iran",
    position: "Co-Founder",
    period: "Jan 2020 – Sep 2021",
    achievements: [
      "Led requirement gathering, stakeholder communication and strategic planning to align product development with market needs.",
      "Wrote the business plan: value proposition, target market and operational milestones.",
      "Established operations at the Shiraz Science and Technology Innovation Park, managing institutional relations and ecosystem networking.",
    ],
  },
  {
    kind: "volunteer",
    company: "Salami Rehabilitation Center",
    location: "Shiraz, Iran",
    position: "Volunteer Researcher",
    period: "Jan 2018 – Sep 2018",
    achievements: [
      "Conducted 200 semi-structured interviews.",
      "Analyzed the data with binary logistic regression in SPSS.",
    ],
  },
];

export const education = [
  {
    institution: "University of Milano-Bicocca",
    location: "Milan, Italy",
    degree: "M.Sc. Applied Experimental Psychological Sciences",
    period: "Sep 2022 – Jul 2026",
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
    title: "Consumer Psychology & Conversion",
    icon: "🛒",
    items: [
      "Consumer Psychology",
      "Consumer Decision-Making",
      "Behavioral Economics",
      "Choice Architecture & Nudging",
      "Pricing & Offer Psychology",
      "Persuasion & Social Proof",
      "Risk Reversal & Trust Design",
      "Conversion Rate Optimization",
      "B2B Lead Generation",
      "Market Fit & Go-to-Market Strategy",
    ],
  },
  {
    title: "Behavioral Science & Quantitative UX Research",
    icon: "🧠",
    items: [
      "Applied Experimental Psychology",
      "Cognitive Ergonomics",
      "Human-Computer Interaction",
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

/** Interactive chart shown on a case-study page, from components/viz. */
export type VizKind = "workflow" | "costly" | "radar" | "heatmap" | "anova" | "email";

export interface CaseStudy {
  slug: string;
  name: string;
  tagline: string;
  /** Hidden from every page, schema, llms.txt and sitemap until set to true. */
  published: boolean;
  category: "Consumer app" | "Game" | "B2B automation" | "Research" | "Consulting" | "Growth consulting" | "Media product" | "EdTech";
  status: "Live" | "Shipped" | "Closed testing" | "Pre-launch" | "Built" | "Prototype" | "Completed";
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
  /** Big typographic figure used as the tile cover until a video exists. */
  cover: { metric: string; caption: string };
  viz?: VizKind;
  /** Shown as a large tile on the homepage; the rest go in "More work". */
  featured?: boolean;
  /** Fundraising details, rendered as an Investment section on the case page. */
  investment?: Investment;
}

export interface Investment {
  stage: string;
  /** Round size; leave empty until decided. */
  amount: string;
  status: string;
  plan: { when: string; what: string }[];
  useOfFunds: string[];
  successMetrics: string[];
  market: { label: string; value: string; source: string; url: string }[];
  beachhead: string;
  ask: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "optimolds",
    image: "/images/work/optimolds.webp",
    cover: { metric: "48 h", caption: "free feasibility check as the lead magnet" },
    featured: true,
    name: "Optimolds",
    tagline: "A consumer-psychology-driven B2B website and lead-generation funnel",
    published: true,
    category: "Growth consulting",
    status: "Live",
    schemaType: "CreativeWork",
    url: "https://optimolds.com/",
    role: "Consumer Psychology & Lead-Generation Consultant; Website Builder",
    organization: "Optimolds",
    summary:
      "For Optimolds, an Italy-based composite engineering and mold-making firm, I built the trilingual website and advised on lead generation. The funnel applies B2B buyer psychology: a free 48-hour feasibility check as a risk-reversing lead magnet, a short CAD-upload form to cut effort, and trust signals placed before the ask.",
    impact: {
      problem:
        "Small composite producers are risk-averse buyers: a bad mold ruins a production run, so they hesitate to contact an unfamiliar engineering supplier.",
      mechanism:
        "Risk reversal (free feasibility audit), loss-framed problem copy, social proof and responsiveness signals, and a low-effort form, sequenced along the buyer's anxiety toward one clear next step.",
      stack: ["Website design & build", "English / Italian / German", "Lead-generation funnel", "Conversion copywriting"],
      outcome:
        "Live trilingual website with a single primary conversion path — the free feasibility check — serving buyers across Europe and worldwide.",
    },
    metrics: [
      { value: "3", label: "Languages (EN, IT, DE)" },
      { value: "48 h", label: "Feasibility-check promise as lead magnet" },
      { value: "1", label: "Primary call to action across the site" },
    ],
    tradeoffs: [
      "One primary call to action repeated across pages instead of several competing offers, to avoid choice overload.",
      "Loss-framed problem statements paired with a free, low-commitment next step, so buyer anxiety resolves into action instead of avoidance.",
      "Three language versions to remove language as a trust barrier for European buyers.",
    ],
    decisionLog: [
      {
        challenge: "Engineering buyers fear wasting money on a supplier they don't know.",
        hypothesis: "Removing the cost of the first step (risk reversal) raises contact rate.",
        method: "Free 48-hour feasibility check as the lead magnet.",
        outcome: "Feasibility check became the site-wide primary conversion.",
      },
      {
        challenge: "Long quote forms deter technical buyers.",
        hypothesis: "Asking only for CAD files and basic process data cuts effort at the moment of contact.",
        method: "Short CAD-upload form with service checkboxes.",
        outcome: "Single short form shared by all three services.",
      },
      {
        challenge: "A new supplier lacks credibility.",
        hypothesis: "Visible social proof and responsiveness reduce perceived risk.",
        method: "Client rating, response-time and file-readiness signals placed before the ask.",
        outcome: "Trust signals placed above the fold, next to the primary call to action.",
      },
      {
        challenge: "Buyers across Europe evaluate in their own language.",
        hypothesis: "Native-language pages increase trust and comprehension.",
        method: "English, Italian and German versions.",
        outcome: "Trilingual site live.",
      },
    ],
    featureList: [
      "Free 48-hour feasibility check lead magnet",
      "Short CAD-upload contact form",
      "Service pages for FEA & layup, mold design and tooling",
      "Social proof and response-time trust signals",
      "English, Italian and German versions",
      "Step-by-step process explainer",
    ],
    keywords: ["Consumer Psychology", "B2B Buyer Psychology", "Lead Generation", "Risk Reversal", "Conversion Rate Optimization", "Choice Architecture"],
  },
  {
    slug: "app-lockers",
    image: "/images/work/app-lockers.webp",
    cover: { metric: "177", caption: "plants, mushrooms and clouds to name before you can scroll" },
    featured: true,
    name: "FloraLock, ShroomLock & CloudLock",
    tagline: "App lockers that teach you something instead of saying no",
    published: true,
    category: "Consumer app",
    status: "Closed testing",
    schemaType: "MobileApplication",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Android",
    url: "https://www.sinadehesh.com/app-lockers/",
    role: "Founder & solo builder",
    organization: "Own product",
    summary:
      "FloraLock, ShroomLock and CloudLock are Android app lockers that replace \"no\" with a question. To open Instagram or TikTok, you name the plant, mushroom or cloud in a photo. Every urge to scroll becomes a five-second lesson, reinforced by spaced review — and built-in escape hatches keep people from uninstalling.",
    impact: {
      problem:
        "Most app blockers just say no, so people switch them off: the friction feels like punishment rather than something worth paying.",
      mechanism:
        "Worthwhile friction that interrupts the automatic tap-and-scroll loop, spaced repetition (reviews after 1, 3, 7, 14 and 30 days), real look-alikes as wrong answers, a 10-second \"Genius Penalty\" against random tapping, and escape hatches that respect autonomy to reduce reactance.",
      stack: ["React Native (Expo)", "Native Android module: UsageStats + foreground service", "Google Play Billing", "Offline, on-device data"],
      outcome:
        "Three apps from one codebase — 70 plants, 71 mushrooms and 36 clouds with real photos — each with its own landing page and a closed test on Google Play.",
    },
    metrics: [
      { value: "177", label: "Species and cloud types with real photos" },
      { value: "5", label: "Spaced reviews: day 1, 3, 7, 14, 30" },
      { value: "10 s", label: "Genius Penalty for a wrong guess" },
    ],
    tradeoffs: [
      "Escape hatches (\"I don't need Instagram right now\", a few emergency unlocks) trade some blocking strength for not being uninstalled — closing the app is the best outcome, not beating the quiz.",
      "Wrong answers are real look-alikes, not random names, so every mistake teaches a distinction that matters — including deadly mushroom look-alikes.",
      "Fully offline and private: nothing leaves the phone, at the cost of no cloud sync.",
      "One codebase, three subjects: content packs swap while the lock, lesson and review engine stays identical.",
    ],
    decisionLog: [
      {
        challenge: "People disable blockers that only say no.",
        hypothesis: "A question is friction worth paying: it breaks the loop without feeling like punishment.",
        method: "Name-the-photo challenge every time a locked app opens.",
        outcome: "Unlock after a correct answer, for a chosen window (default 10 minutes).",
      },
      {
        challenge: "Random tapping defeats a quiz.",
        hypothesis: "A short cost for wrong answers makes guessing not pay.",
        method: "10-second freeze showing the right answer and a fact, then a different item.",
        outcome: "\"Genius Penalty\" in all three apps.",
      },
      {
        challenge: "Facts seen once are forgotten.",
        hypothesis: "Spaced retrieval turns interruptions into lasting knowledge.",
        method: "Daily lesson and exam, then reviews after 1, 3, 7, 14 and 30 days.",
        outcome: "Spaced-review engine with streaks and milestones.",
      },
      {
        challenge: "Strict blockers get uninstalled.",
        hypothesis: "Respecting autonomy reduces reactance.",
        method: "\"I don't need Instagram right now\" plus configurable emergency unlocks.",
        outcome: "Escape hatches built in; closing the app counts as success.",
      },
    ],
    featureList: [
      "Name-the-photo unlock challenge",
      "Daily lessons and exams",
      "Spaced review (1 / 3 / 7 / 14 / 30 days)",
      "Real look-alike distractors",
      "Genius Penalty",
      "Emergency unlocks",
      "Offline and private",
      "FloraLock Plus via Google Play Billing",
    ],
    keywords: ["Behavioral Friction", "Spaced Repetition", "Digital Wellbeing", "Reactance", "React Native", "Android"],
  },
  {
    slug: "recallmate",
    cover: { metric: "SM-2", caption: "spaced repetition + conversational AI" },
    name: "RecallMate",
    tagline: "AI-assisted spaced repetition with conversational tutoring",
    published: true,
    category: "EdTech",
    status: "Prototype",
    schemaType: "SoftwareApplication",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    role: "Research Intern — product concept & UX research lead",
    organization: "University of Milano-Bicocca",
    summary:
      "RecallMate is an AI-assisted learning app whose concept and UX research I led as a research intern at the University of Milano-Bicocca. It targets the main failure of flashcard tools — learners abandon review before memory consolidates — by pairing a simplified SM-2 spaced-repetition scheduler with conversational AI, validated through multi-round user interviews and MoSCoW prioritization.",
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
    image: "/images/work/oopscupid.webp",
    cover: { metric: "15", caption: "free psychological tests, zero sign-up" },
    viz: "radar",
    featured: true,
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
    organization: "Own product",
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
    image: "/images/work/costly.webp",
    cover: { metric: "80%", caption: "of every loss earned back by walking it off" },
    viz: "costly",
    featured: true,
    name: "Costly",
    tagline: "Doomscrolling that costs real money — until you walk it back",
    published: true,
    category: "Consumer app",
    status: "Pre-launch",
    schemaType: "MobileApplication",
    applicationCategory: "HealthApplication",
    operatingSystem: "Android, Web",
    role: "Founder & solo engineer",
    organization: "Costly",
    summary:
      "Costly is a habit-reversal app that charges real money for every minute of doomscrolling, at the hourly rate you set for your own time — then lets you earn 80% of it back by walking it off within 24 hours. A self-priced commitment contract stops you deleting it when it starts to hurt.",
    impact: {
      problem:
        "App blockers rely on soft friction, so people switch them off — competitor reviews are full of \"I just turn it off.\" Commitment-contract apps work, but make users define and track a goal first.",
      mechanism:
        "Real stakes and loss aversion (money held per minute scrolled), losses framed against a five-tier ladder of things the user actually wants, redemption through exercise (2 minutes walked per minute scrolled), and precommitment through a self-priced deletion fee.",
      stack: ["Next.js", "PostgreSQL + Prisma", "Stripe pre-auth holds & captures", "Kotlin / Jetpack Compose", "UsageStats + gyroscope detection", "Health Connect"],
      outcome:
        "Built solo in June–July 2026: about 20 API routes with the full Stripe hold-and-capture lifecycle, and a Play-compliant Android companion with a live overlay meter, APK green in CI. No users yet — the first live loop on real hardware is the next milestone.",
    },
    metrics: [
      { value: "80%", label: "Of each loss redeemable by walking" },
      { value: "2 : 1", label: "Minutes walked per minute scrolled" },
      { value: "24 h", label: "Window to walk it off" },
    ],
    tradeoffs: [
      "No AccessibilityService: scroll detection uses UsageStats plus gyroscope heuristics so the app stays Google Play compliant, at the cost of on-device threshold tuning.",
      "Two Stripe PaymentIntents per session — 20% captured, 80% held for 24 hours — because Stripe cannot partially capture a payment and keep the rest on hold.",
      "The user sets the deletion fee (€0–€1000, zero allowed) and a fixed 7- or 30-day term, so the contract is self-priced rather than an imposed penalty.",
      "If the redemption rate comes back low, Costly is a punishment app and needs rebalancing — the alpha is designed to find that out early.",
    ],
    decisionLog: [
      {
        challenge: "Screen-time feedback rarely changes behavior.",
        hypothesis: "Feedback changes behavior only when it carries a consequence.",
        method: "Real-money meter at a self-set hourly rate, framed against a five-tier ladder of wanted products.",
        outcome: "Per-second live meter overlaid on the target app.",
      },
      {
        challenge: "Pure punishment drives uninstalls.",
        hypothesis: "A redemption path keeps stakes real but fair.",
        method: "20/80 split: 80% held for 24 hours and released on a verified walking goal (Health Connect).",
        outcome: "Two-PaymentIntent session lifecycle with an expiry sweep.",
      },
      {
        challenge: "People delete the app when it hurts.",
        hypothesis: "Precommitment beats willpower.",
        method: "Self-priced deletion fee and lock-in term, enforced by a heartbeat dead man's switch.",
        outcome: "Commitment contract signed at onboarding; breach sweep scaffolded.",
      },
      {
        challenge: "Is the effect causal, or just awareness?",
        hypothesis: "Stakes cut targeted-app minutes more than awareness or soft friction.",
        method: "Planned randomized three-arm study: awareness vs. soft friction vs. stakes.",
        outcome: "Scheduled for weeks 9–12, after a 30–50 user alpha.",
      },
    ],
    featureList: [
      "Real-money per-minute meter",
      "Self-set hourly rate",
      "Five-tier ladder of wanted products",
      "Walk-it-off redemption via Health Connect",
      "Commitment contract with dead man's switch",
      "Live overlay meter on Android",
    ],
    keywords: ["Loss Aversion", "Commitment Devices", "Behavioral Friction", "Habit Reversal", "Stripe", "Kotlin"],
    investment: {
      stage: "Accelerator programme + pre-seed",
      // TODO: add the round size once decided, e.g. "€150K".
      amount: "",
      status: "Zero users. No charge has moved yet. The system is built end to end; the first live loop on real hardware is the next milestone.",
      plan: [
        { when: "Weeks 1–4", what: "Harden, deploy and tune detection → first live loop on real hardware" },
        { when: "Weeks 5–8", what: "30–50 user alpha on real cards at small stakes → retention and redemption data; legal opinion on the contract terms" },
        { when: "Weeks 9–12", what: "Randomized three-arm study — awareness vs. soft friction vs. stakes → effect size" },
      ],
      useOfFunds: [
        "Legal & compliance — EU unfair-terms review of the breach fee and the 14-day withdrawal question",
        "Alpha cohort — recruitment and a reimbursement pool so real cards can run ethically at small stakes",
        "Part-time Android contractor — detection tuning and device-matrix testing, the riskiest technical surface",
        "The study — instrumentation, incentives and analysis",
      ],
      successMetrics: [
        "Primary: daily minutes in targeted apps, week 4 vs. baseline",
        "Health: redemption rate — the share of holds walked off",
      ],
      market: [
        {
          label: "Digital detox apps",
          value: "$498M (2025) → $1.38B (2032)",
          source: "Valuates",
          url: "https://reports.valuates.com/market-reports/QYRE-Auto-9Z18571/global-digital-detox-apps",
        },
        {
          label: "Screen-time management software",
          value: "$3.8B (2025) → $9.7B (2034)",
          source: "Dataintelo",
          url: "https://dataintelo.com/report/screen-time-management-software-market",
        },
      ],
      beachhead: "People who already paid for a blocker and relapsed: proven willingness to pay, proven dissatisfaction with soft friction.",
      ask: "Beyond capital: payments and regulatory introductions, and time with people who have shipped consumer products that charge cards on an automated trigger.",
    },
  },
  {
    slug: "workflow-automation-engine",
    cover: { metric: "0", caption: "ambiguous CRM writes without human review" },
    viz: "workflow",
    featured: true,
    name: "Workflow Automation Engine",
    tagline: "n8n + Pipedrive CRM automation with human-in-the-loop review",
    published: true,
    category: "B2B automation",
    status: "Shipped",
    schemaType: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    role: "Automation architect & engineer",
    organization: "Own product",
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
    image: "/images/work/daily-hustle.webp",
    cover: { metric: "27", caption: "days from idea to first income" },
    name: "Daily Hustle",
    tagline: "Structured idea-to-income programs with daily action steps",
    published: true,
    category: "EdTech",
    status: "Live",
    schemaType: "WebApplication",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://hustle.sinadehesh.com/",
    role: "Founder & full-stack builder",
    organization: "Own product",
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
    image: "/images/work/daily-sublime.webp",
    cover: { metric: "30", caption: "issues, one painting each" },
    viz: "email",
    featured: true,
    name: "The Daily Sublime",
    tagline: "A 30-issue art-meditation email magazine engineered for engagement signal",
    published: true,
    category: "Media product",
    status: "Live",
    schemaType: "CreativeWork",
    url: "https://daily.sinadehesh.com/",
    role: "Founder, editor & builder",
    organization: "Own product",
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
    cover: { metric: "10 × 6", caption: "topics × university programs" },
    viz: "heatmap",
    name: "Passway",
    tagline: "Curriculum-gap tracker built on a two-source data model",
    published: true,
    category: "EdTech",
    status: "Prototype",
    schemaType: "WebApplication",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    role: "Founder & builder",
    organization: "Own product",
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
    cover: { metric: "99%", caption: "the near-miss that keeps you spinning" },
    name: "Dopamine Box",
    tagline: "A loot-box psychology simulator: near-misses, shards and scarcity",
    published: true,
    category: "Consumer app",
    status: "Prototype",
    schemaType: "WebApplication",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    role: "Founder & builder",
    organization: "Own product",
    summary:
      "Dopamine Box is a mock-token simulator of \"spin to claim\" monetization. Each spin adds shards toward a target item — micro hits, solid hits and rare jackpots on a variable schedule — with engineered near-misses and scarcity tags, to make visible exactly how these loops hold attention. No real money is involved.",
    impact: {
      problem:
        "Spin-to-win and shard-collection mechanics are spreading from games into shopping apps, but their psychology is rarely shown plainly to the people who design or use them.",
      mechanism:
        "Variable-ratio reinforcement (micro, solid and jackpot outcomes), near-miss effects, goal-gradient progress toward 100%, and scarcity and social-proof labels such as \"Low Stock\" and \"1 User Won Today\".",
      stack: ["Next.js", "React", "Zustand", "Tailwind CSS"],
      outcome: "Working simulator with mock tokens, tiered target items and live feedback on every spin.",
    },
    metrics: [
      { value: "3", label: "Reward sizes: micro, solid, jackpot" },
      { value: "100%", label: "Shard progress needed to claim" },
      { value: "€0", label: "Real money — mock tokens only" },
    ],
    tradeoffs: [
      "Mock tokens only: the point is to study and demonstrate the loop, not to monetize it.",
      "Targets span four tiers of pull — high-value tech, status items, aspirational purchases and speculative assets — to compare which framing holds attention longest.",
    ],
    decisionLog: [
      {
        challenge: "Loot-box mechanics are hard to explain in the abstract.",
        hypothesis: "A working simulator makes the pull of each mechanic felt, not just described.",
        method: "Spin loop with variable progress, near-miss snaps and scarcity tags.",
        outcome: "Interactive simulator of the full spin-to-claim loop.",
      },
    ],
    featureList: ["Spin-to-claim shard progress", "Micro / solid / jackpot variable rewards", "Near-miss feedback", "Scarcity and social-proof tags", "Mock-token wallet"],
    keywords: ["Variable Reward Schedules", "Near-Miss Effect", "Loot Boxes", "Dark Patterns", "Goal-Gradient Effect"],
  },
  {
    slug: "musicity",
    cover: { metric: "3", caption: "segments assessed for market fit" },
    name: "Musicity",
    tagline: "Market-fit and go-to-market strategy for a music platform",
    published: true,
    category: "Consulting",
    status: "Completed",
    schemaType: "CreativeWork",
    role: "Market-Fit & Go-to-Market Strategy Consultant",
    organization: "Musicity",
    summary:
      "For Musicity, a music platform, I consulted on market fit and go-to-market strategy. Semi-structured interviews across artists, listeners and venues were coded into a ranked jobs-to-be-done view of where demand was strongest, which shaped a go-to-market plan for which segment to win first and how to position for it.",
    impact: {
      problem: "The platform had three user segments with conflicting needs and no evidence of which one to lead with.",
      mechanism: "Separating stated wants from behavioral demand through coded interviews, then sequencing go-to-market around the strongest demand signal.",
      stack: ["Semi-structured interview protocol", "Thematic coding", "Jobs-to-be-Done", "Go-to-market strategy"],
      outcome: "Market-fit assessment and go-to-market recommendations on segment priority, positioning and launch sequence.",
    },
    metrics: [
      { value: "3", label: "Segments assessed (artists, listeners, venues)" },
      { value: "JTBD", label: "Ranked demand view behind the GTM plan" },
    ],
    tradeoffs: [
      "Prioritized behavioral evidence over stated preferences when the two conflicted.",
      "Recommended focusing on one beachhead segment instead of launching to all three at once.",
    ],
    decisionLog: [
      {
        challenge: "Unclear which segment and job to serve first.",
        hypothesis: "Coded interviews reveal the jobs users' behavior actually demands.",
        method: "Semi-structured protocol across segments; thematic coding.",
        outcome: "Ranked jobs-to-be-done view of demand by segment.",
      },
      {
        challenge: "No agreed go-to-market sequence across three segments.",
        hypothesis: "Leading with the segment showing the strongest demand lowers acquisition cost and speeds learning.",
        method: "Segment prioritization, positioning and launch sequencing.",
        outcome: "Go-to-market strategy recommendations delivered.",
      },
    ],
    featureList: ["Market-fit interview program", "JTBD demand ranking", "Go-to-market strategy", "Positioning recommendations"],
    keywords: ["Market Fit", "Go-to-Market Strategy", "Jobs-to-be-Done", "Consumer Research"],
  },
  {
    slug: "interview-simulation-study",
    cover: { metric: "p = .009", caption: "N = 96 controlled experiment" },
    viz: "anova",
    featured: true,
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
    slug: "virtue-ledger",
    image: "/images/work/virtue-ledger.webp",
    cover: { metric: "13 × 7", caption: "Franklin's virtues across a week, one tap per cell" },
    name: "Virtue Ledger",
    tagline: "Benjamin Franklin's thirteen-virtue audit, rebuilt as a one-tap app",
    published: true,
    category: "Consumer app",
    status: "Built",
    schemaType: "MobileApplication",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Android",
    role: "Founder & builder",
    organization: "Own product",
    summary:
      "Virtue Ledger turns Benjamin Franklin's thirteen-virtue notebook into a mobile behavioral audit: a 13 × 7 grid where logging a day costs one tap and no decisions. When it raises a virtue there is no \"dismiss\" — only Now, or a named hour it holds you to.",
    impact: {
      problem:
        "Habit trackers ask for too many decisions per entry, and their \"remind me later\" buttons let intentions quietly evaporate.",
      mechanism:
        "Minimal-effort logging (one tap cycles not logged → fault → kept), honest fault-first ordering, and implementation intentions: \"Later\" means naming an hour, backed by a real scheduled notification.",
      stack: ["Next.js (static export)", "React + TypeScript", "Zustand (persisted)", "Capacitor (Android)", "Haptics"],
      outcome:
        "Working Android app with a one-tap matrix, marks readable without colour, and Now-or-named-hour resolutions.",
    },
    metrics: [
      { value: "1", label: "Tap per log — no dialogs, no save button" },
      { value: "56 px", label: "Cells, above the 44 px accessibility floor" },
      { value: "3", label: "States: not logged, fault, kept" },
    ],
    tradeoffs: [
      "A tri-state instead of a binary, because \"no fault today\" and \"not reviewed yet\" are different facts — an untouched grid must not read as a perfect week.",
      "Fault is the first tap, Franklin's own order: the harder admission should be the cheaper action.",
      "Kept and fault marks differ by shape, not just colour, so they survive greyscale and colour blindness.",
    ],
    decisionLog: [
      {
        challenge: "Logging friction kills tracking.",
        hypothesis: "One tap with no decisions keeps the audit daily.",
        method: "Tap-to-cycle cells with haptic feedback; no dialogs or confirmations.",
        outcome: "A full day logged in seconds.",
      },
      {
        challenge: "\"Later\" buttons let intentions evaporate.",
        hypothesis: "Naming an hour — an implementation intention — raises follow-through.",
        method: "Now, or Later with a named hour backed by a scheduled notification.",
        outcome: "No dismiss option anywhere in the flow.",
      },
      {
        challenge: "Keeping a virtue felt like less of an act than breaking one.",
        hypothesis: "Marks should feel like something you did.",
        method: "Both states drawn as struck seals that press inward rather than pop outward.",
        outcome: "Kept and fault marks with equal visual weight.",
      },
    ],
    featureList: ["13 × 7 virtue matrix", "One-tap tri-state logging", "Haptic feedback", "Now-or-named-hour resolutions", "Colour-blind-safe marks"],
    keywords: ["Implementation Intentions", "Habit Tracking", "Friction Reduction", "Capacitor", "Next.js"],
  },
  {
    slug: "tao-app",
    cover: { metric: "1", caption: "passage a day, chosen by the date" },
    name: "The Art of Observation (app)",
    tagline: "A distraction-free Android reader and study guide for TAO",
    published: true,
    category: "Media product",
    status: "Built",
    schemaType: "MobileApplication",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Android",
    role: "Author & Android developer",
    organization: "Own product",
    summary:
      "An Android app for reading and studying TAO: The Art of Observation. The full text appears verbatim in a distraction-free reader, with a key-concepts study guide linked back to each chapter and one passage of the day chosen deterministically by date.",
    impact: {
      problem: "Reflective texts are hard to return to on a phone full of interruptions.",
      mechanism:
        "A single daily passage as a low-effort ritual, and a study guide that links every concept back to the chapter that teaches it.",
      stack: ["Kotlin", "Jetpack Compose", "Bundled JSON content"],
      outcome: "Complete reader, key-concepts study guide and passage-of-the-day features.",
    },
    metrics: [
      { value: "0", label: "Words rewritten — the text is verbatim" },
      { value: "1", label: "Passage a day, selected by date" },
    ],
    tradeoffs: [
      "The app never summarises or reinterprets the text in place; study aids live beside the text, not inside it.",
    ],
    decisionLog: [
      {
        challenge: "Studying a dense text on a phone.",
        hypothesis: "Concepts linked back to their chapters make the text navigable without altering it.",
        method: "Key-concepts guide with chapter anchors.",
        outcome: "Study guide across the central ideas.",
      },
      {
        challenge: "Building a daily reading habit.",
        hypothesis: "One small, predictable passage a day lowers the effort to return.",
        method: "Passage of the Day selected by date.",
        outcome: "Daily reading ritual built in.",
      },
    ],
    featureList: ["Full text, chapter by chapter", "Key-concepts study guide", "Passage of the Day", "Distraction-free reader"],
    keywords: ["Reading Experience", "Habit Formation", "Kotlin", "Jetpack Compose"],
  },
  {
    slug: "debubble",
    image: "/images/work/debubble.webp",
    cover: { metric: "3 × 100", caption: "pillars × tiers of comfort-zone challenges" },
    featured: true,
    name: "DeBubble",
    tagline: "A behavioral expansion engine for getting out of your bubble",
    published: true,
    category: "Consumer app",
    status: "Prototype",
    schemaType: "MobileApplication",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Android",
    role: "Founder & designer-engineer",
    organization: "Own product",
    summary:
      "DeBubble widens the bubble people live in — where they go, what they do and who they talk to. It calibrates a starting level per pillar from four onboarding answers, then serves one challenge per pillar per day across 100 tiers, stepping back when a tier causes friction instead of letting users stall.",
    impact: {
      problem:
        "Routine shrinks people's worlds to the same places, activities and people, and generic \"leave your comfort zone\" advice gives no starting point and no ladder.",
      mechanism:
        "Graded exposure: personalized entry tiers for Access, Activity and Social, a difficulty curve that stays almost flat for the first thirty tiers, step-backs on repeated friction, and a Friction Score that reads as credit for courage rather than failure.",
      stack: ["Kotlin + Jetpack Compose (Android)", "Adaptive progression engine", "Single-file interactive design spec"],
      outcome:
        "Complete interactive prototype and design system for every screen, plus an Android build with 300 challenges and 5 goal campaigns, not yet compiled.",
    },
    metrics: [
      { value: "300", label: "Challenges across three pillars" },
      { value: "4", label: "Onboarding answers set the entry tiers" },
      { value: "(t/100)^1.9", label: "Difficulty curve, almost flat for 30 tiers" },
    ],
    tradeoffs: [
      "Tiers advance on completion, never on the calendar, so a user can be at Access 040 and Social 003 — the Bubble Map shows that asymmetry honestly.",
      "Repeated friction steps the user back rather than stalling them; three clean completions unlock a double step.",
      "Ember, the courage colour, is reserved for the Friction Score and never used for errors, so friction always reads as credit.",
    ],
    decisionLog: [
      {
        challenge: "One difficulty curve doesn't fit everyone.",
        hypothesis: "Calibrated entry points prevent both boredom and overwhelm.",
        method: "Four onboarding answers feed entry-tier formulas per pillar.",
        outcome: "Personalized starting tiers for Access, Activity and Social.",
      },
      {
        challenge: "Users quit after a step that is too hard.",
        hypothesis: "Graded exposure needs a way down as well as up.",
        method: "Step back after repeated friction; double step after three clean completions.",
        outcome: "Adaptive escalation engine.",
      },
      {
        challenge: "Avoidance feels like failure.",
        hypothesis: "Reframing friction as courage keeps users engaged.",
        method: "Friction Score and Anti-Score on the profile, in a dedicated colour.",
        outcome: "Friction surfaced as credit, not fault.",
      },
    ],
    featureList: ["Baseline calibration", "Three-pillar dashboard and Bubble Map", "One challenge per pillar per day", "Completion micro-journal", "Friction Score & Anti-Score", "5 goal campaigns"],
    keywords: ["Graded Exposure", "Comfort Zone", "Habit Formation", "Adaptive Difficulty", "Kotlin", "Jetpack Compose"],
  },
  {
    slug: "merge-farmstead",
    image: "/images/work/merge-farmstead.webp",
    cover: { metric: "7–9", caption: "the reading age every story line is written for" },
    name: "Merge Farmstead",
    tagline: "A story-driven merge tycoon game for young players",
    published: true,
    category: "Game",
    status: "Pre-launch",
    schemaType: "MobileApplication",
    applicationCategory: "GameApplication",
    operatingSystem: "Android, Web",
    role: "Founder & game developer",
    organization: "Own product",
    summary:
      "Merge Farmstead: Tycoon Edition is a farm merge game wrapped in a mystery: find the town's lost Golden Bell before a land developer takes the valley. Every story line is written at a second-to-third-grade reading level, and ads are requested as child-directed and non-personalized from the start.",
    impact: {
      problem:
        "Merge games are sticky but hollow, and many aimed at children monetize through ad and purchase flows that were never designed for them.",
      mechanism:
        "Merge-and-upgrade progression for steady competence wins, a chaptered mystery with clues and suspects for curiosity, and child-directed, non-personalized ad requests.",
      stack: ["PixiJS", "JavaScript", "Capacitor (Android)", "Progressive web app"],
      outcome: "Playable game with a full story bible, an Android build and a web build, prepared for release.",
    },
    metrics: [
      { value: "7–9", label: "Reading age for all story text" },
      { value: "2", label: "Platforms: Android and web" },
    ],
    tradeoffs: [
      "Short sentences and easy words everywhere, even in the mystery: readability for young players over richer prose.",
      "Child-directed, non-personalized ads by design, accepting lower ad revenue for compliance and parents' trust.",
    ],
    decisionLog: [
      {
        challenge: "Merge loops get repetitive.",
        hypothesis: "A mystery with clues and suspects gives players a reason to keep merging.",
        method: "Story bible — The Lost Golden Bell — with chapters, clues, suspects and character voices.",
        outcome: "Story beats unlocked through farm progress.",
      },
      {
        challenge: "Kids' games often monetize unsafely.",
        hypothesis: "Designing monetization as child-directed from day one avoids retrofitting compliance.",
        method: "Child-directed, non-personalized ad requests.",
        outcome: "Monetization layer built for a young audience.",
      },
    ],
    featureList: ["Merge-and-upgrade farm", "Town deliveries", "Chaptered mystery story", "Android app (Capacitor)", "Playable on the web"],
    keywords: ["Game Design", "Progression Systems", "Child-directed Design", "PixiJS", "Capacitor"],
  },
];

export const publishedCaseStudies = caseStudies.filter((c) => c.published);

export const getCaseStudy = (slug: string) =>
  publishedCaseStudies.find((c) => c.slug === slug);

export const problemMatrix = [
  {
    question: "Need more customers to say yes — leads, sign-ups, purchases?",
    answer:
      "I diagnose the psychological barrier — perceived risk, effort, uncertainty or choice overload — and redesign the offer, copy and funnel around it: risk reversal, social proof, loss framing and friction removal at the exact step where buyers hesitate.",
    proof: [
      { slug: "optimolds", note: "risk-reversal lead magnet + trust signals" },
      { slug: "oopscupid", note: "zero-sign-up funnel" },
      { slug: "daily-sublime", note: "one-click response surface" },
    ],
  },
  {
    question: "Need to fix user drop-off and retention?",
    answer:
      "I engineer habit loops from behavioral science, not guesswork: behavioral friction and loss framing that make costs salient, variable reward schedules that sustain engagement, and psychometric assessment that makes feedback feel personal.",
    proof: [
      { slug: "costly", note: "real stakes with a walk-it-back path" },
      { slug: "app-lockers", note: "friction worth paying, without uninstalls" },
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
      { slug: "musicity", note: "market-fit interviews → go-to-market plan" },
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
  { name: "Consumer Psychology" },
  { name: "Consumer Behavior", sameAs: "https://en.wikipedia.org/wiki/Consumer_behaviour" },
  { name: "Choice Architecture", sameAs: "https://en.wikipedia.org/wiki/Choice_architecture" },
  { name: "Nudge Theory", sameAs: "https://en.wikipedia.org/wiki/Nudge_theory" },
  { name: "Psychological Pricing", sameAs: "https://en.wikipedia.org/wiki/Psychological_pricing" },
  { name: "Social Proof", sameAs: "https://en.wikipedia.org/wiki/Social_proof" },
  { name: "Loss Aversion", sameAs: "https://en.wikipedia.org/wiki/Loss_aversion" },
  { name: "Conversion Rate Optimization", sameAs: "https://en.wikipedia.org/wiki/Conversion_rate_optimization" },
  { name: "Lead Generation", sameAs: "https://en.wikipedia.org/wiki/Lead_generation" },
  { name: "Go-to-Market Strategy" },
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

export const consumerPsychology = {
  path: "/consumer-psychology/",
  services: [
    {
      name: "Conversion & funnel psychology audit",
      description:
        "A step-by-step review of your website, checkout or sign-up flow that names the psychological barrier at each drop-off (perceived risk, effort, uncertainty, choice overload) and the specific change that removes it.",
    },
    {
      name: "Lead-generation strategy & website build",
      description:
        "Offer design, lead magnets, conversion copy and a fast, multilingual website built and shipped by the same person who designed the strategy.",
    },
    {
      name: "Consumer research",
      description:
        "Semi-structured interviews, thematic coding, surveys, psychometric instruments and controlled experiments that explain why customers choose, hesitate or leave.",
    },
    {
      name: "Pricing & offer psychology",
      description:
        "Anchoring, framing, bundling and risk-reversal design so the offer is easier to say yes to without discounting.",
    },
    {
      name: "Behavioral product design & retention",
      description:
        "Habit loops, reward schedules and friction design that keep customers using the product after the first purchase.",
    },
    {
      name: "Market fit & go-to-market positioning",
      description:
        "Segment interviews and jobs-to-be-done analysis to decide which customers to win first and how to position for them.",
    },
  ],
  principles: [
    { name: "Risk reversal", effect: "Removes the cost of the first step so cautious buyers act.", proof: ["optimolds"] },
    { name: "Loss aversion & commitment", effect: "Makes the cost of inaction concrete — and hard to back out of.", proof: ["costly", "optimolds"] },
    { name: "Social proof & trust signals", effect: "Lowers perceived risk of an unfamiliar brand.", proof: ["optimolds"] },
    { name: "Friction design", effect: "Removes effort where users drop off; adds it where they act on autopilot.", proof: ["app-lockers", "oopscupid", "virtue-ledger"] },
    { name: "Choice architecture", effect: "One clear next step instead of competing options.", proof: ["optimolds", "app-lockers"] },
    { name: "Variable reward schedules", effect: "Sustains return visits after novelty fades.", proof: ["dopamine-box", "oopscupid"] },
    { name: "Psychometric personalization", effect: "Feedback that feels specific to the individual.", proof: ["oopscupid"] },
    { name: "Goal-gradient effect", effect: "Visible progress accelerates completion.", proof: ["daily-hustle", "debubble", "dopamine-box"] },
  ],
  process: [
    { step: "Diagnose", detail: "Audit the funnel, analytics and customer touchpoints to find where and why people stop." },
    { step: "Research", detail: "Interviews, surveys or quick experiments to confirm the psychological barrier." },
    { step: "Redesign", detail: "Change the offer, message and flow around the confirmed barrier." },
    { step: "Build", detail: "Ship the website, funnel or product change directly — no agency hand-off." },
    { step: "Measure", detail: "Instrument the change and read the result against the original hypothesis." },
  ],
};
