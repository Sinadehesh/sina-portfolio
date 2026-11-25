/**
 * Positioning, case studies, services and credentials — the source for every
 * page, JSON-LD node, llms.txt and the sitemap. Chart-specific numbers stay in
 * lib/data.ts, which the visualisation components read directly.
 */

export const site = {
  url: "https://sinadehesh.com",
  title: "Sina Dehesh — Behavioral Scientist & Consumer Psychology Consultant, Milan",
  description:
    "Sina Dehesh, behavioral scientist and consumer psychology consultant in Milan: consumer behavior, market research and UX research, tested with real people.",
  ogImage: "/opengraph-image",
  locale: "en_US",
};

export const personalInfo = {
  name: "Sina Dehesh",
  headline: "Behavioral Scientist & Consumer Psychology Consultant",
  jobTitles: [
    "Behavioral Scientist",
    "Consumer Psychology Consultant",
    "Consumer Behavior Consultant",
    "Market Research & Insights Consultant",
    "UX Researcher",
    "Behavioral & Game Designer",
  ],
  location: "Milan, Italy",
  locality: "Milan",
  region: "Lombardy",
  countryCode: "IT",
  serviceArea: ["Milan", "Turin", "Italy", "Europe", "Remote"],
  email: "sinadehesh@gmail.com",
  github: "https://github.com/sinadehesh",
  linkedin: "https://www.linkedin.com/in/sina-dehesh-39b487127",
  heroHeadline:
    "I work out why people choose, buy and stay—combining Consumer Psychology, Quantitative UX Research and Behavior Design.",
  heroDescription:
    "Good ideas fail when nobody checks them with real people. I diagnose the psychological barrier that stops customers, design the fix, test it with real users, and measure whether it worked, in a website, a funnel, an app or a game.",
  summary:
    "Sina Dehesh is a behavioral scientist and consumer psychology consultant based in Milan, Italy, specializing in how people perceive, decide, buy and stay — and in designing and testing the websites, funnels, apps and games that act on it. Sina holds an M.Sc. in Applied Experimental Psychological Sciences from the University of Milano-Bicocca, including 29/30 in Consumer Psychology, 29/30 in Elements of Human-Technology Interaction and 28/30 in Cognitive Ergonomics. Sina has designed and released consumer products and games including Pukytoon (a feed of games anyone can make, in development), Gem Jar and Zombie Bomber (merge games), The Loop (a story game about AI and work), Costly (a real-money commitment app against doomscrolling), FloraLock, ShroomLock and CloudLock (learn-to-unlock app lockers), DeBubble (gamified self-care), OopsCupid (a psychometric relationship-assessment platform), Daily Hustle and The Daily Sublime. As a consultant, Sina designs consumer-psychology-driven websites and lead-generation funnels, for example for Optimolds, and advises on market fit and go-to-market strategy, for example for Musicity. The work combines consumer psychology and behavioral economics, quantitative UX research (240+ interviews and usability tests, repeated-measures ANOVA, logistic regression), product strategy (Kano, MoSCoW, PRINCE2, Agile) and tests with real people: moving ads out of the flow of play made playing time go up dramatically, and a swipe borrowed from dating apps got students to enter much more data.",
  languages: [
    { name: "English", code: "en", level: "C1" },
    { name: "Persian", code: "fa", level: "Native" },
    { name: "Italian", code: "it", level: "A2" },
    { name: "German", code: "de", level: "A2" },
  ],
};

export const proofStats = [
  { value: "N = 96", label: "Controlled experiment, p = .009" },
  { value: "240+", label: "Interviews & usability tests conducted and analyzed" },
  { value: "20+", label: "Apps, games & websites designed and tested" },
  { value: "M.Sc.", label: "Experimental psychology, Milano-Bicocca" },
];

/** First-person bio for the homepage About section. */
export const about = [
  "I'm Sina Dehesh, a behavioral scientist and consumer psychology consultant based in Milan. My M.Sc. in Applied Experimental Psychological Sciences at the University of Milano-Bicocca covered research design, psychometrics, quantitative methods, cognitive ergonomics, human-technology interaction and consumer psychology — how people perceive, decide and buy. My best marks were in Consumer Psychology (29/30), Elements of Human-Technology Interaction (29/30) and Cognitive Ergonomics (28/30).",
  "I consult on consumer psychology and growth, and I make my own apps and games to test ideas on real people: the apps, games and websites below were researched, designed and tested end to end. My thesis was a controlled experiment with 96 participants; before that I ran 200 research interviews as a volunteer researcher and co-founded Guardbar.",
  "Two of my small ideas moved a number. In one of my games the first ad came after 25 clicks, and my friends played for about five minutes before saying it was getting annoying. After reading how Block Blast uses the game itself as the reason to watch ads, I moved the ads to the start and the end of a game, and playing time went up dramatically. On a platform for university students that I worked on with engineer friends, students were not entering enough data, so I suggested the swipe from dating apps, changed to fit data entry; in a test with engineering students they entered much more data and enjoyed it more.",
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
    title: "Behavioral Scientist & Consumer Behavior Consultant",
    pitch:
      "Finds the behavior behind a business problem, designs the change that makes the right behavior easier and tests it with real people: behavioral audits, experiments, choice architecture, habit design and market insights.",
    proof: ["interview-simulation-study", "app-lockers", "musicity"],
  },
  {
    title: "Market Research & Consumer Insights",
    pitch:
      "Plans and runs market and consumer research, from interviews and jobs-to-be-done analysis to surveys and competitive benchmarking, and turns it into go-to-market decisions: which customers first, what to promise and how to reach them.",
    proof: ["musicity", "recallmate", "optimolds"],
  },
  {
    title: "AI Product Manager / 0-to-1 Product Builder",
    pitch:
      "Takes an AI product from problem framing and business plan to a tested, measured release, with user research and behavioral design built in from the start.",
    proof: ["recallmate", "oopscupid", "daily-hustle"],
  },
  {
    title: "UX Researcher & Behavioral Designer",
    pitch:
      "Runs mixed-methods research — semi-structured interviews, thematic coding, controlled experiments, psychometric instruments — and turns findings into prioritized product decisions.",
    proof: ["interview-simulation-study", "musicity", "recallmate"],
  },
  {
    title: "Engagement, Game & Growth Designer",
    pitch:
      "Turns an engagement idea into a quick prototype, a game mechanic or an automation, then adds the retention mechanics and the measurement that show whether it works.",
    proof: ["gem-jar", "workflow-automation-engine", "daily-sublime"],
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
    /** From the Diploma Supplement: a two-year, 120-ECTS Laurea Magistrale in the psychology class (LM-51), taught and examined in English. */
    format: "Two-year master's, 120 ECTS, taught in English",
    /** In display order: the homepage shows the first six. */
    coursework: [
      "Consumer Psychology",
      "Cognitive Ergonomics",
      "Elements of Human-Technology Interaction",
      "Psychometrics and Quantitative Methods",
      "Social Cognition",
      "Cognitive Psychology",
      "Computational Modelling",
      "Measurement Methods and Ambulatory Assessment",
      "Cognitive and Behavioral Measures",
      "Cognitive Development",
      "Cognitive Neuroscience",
      "Research Methods in Cognitive Neuroscience",
      "Experimental Clinical Psychology",
      "Evaluation of Psychological Interventions Laboratory",
      "Transferable Research Skills Laboratory",
      "Practical Training",
    ],
    achievements: [
      "A two-year, 120-ECTS master's (Laurea Magistrale, psychology class LM-51), taught and examined in English.",
      "Focus: cognitive ergonomics, human-technology interaction, psychometrics, consumer psychology, and quantitative/computational behavioral measurement.",
      "Best marks: Consumer Psychology (29/30), Elements of Human-Technology Interaction (29/30), Cognitive Ergonomics (28/30).",
      "The degree prepares graduates to apply psychological models to people's behavior and choices, including consumer behavior, to interaction with technology, to communication and marketing, and to ergonomics, in companies, consulting firms, communication agencies and market research institutes, including as freelance consultants.",
      "Thesis: \"The Psychological Effects of Self-Referential Information in Asynchronous Automated Interviews: A Comparison of Self-View, Avatar, and Text-Only Formats\" (within-subjects, N = 96). Candidates were significantly more expressive with the AI avatar than when they saw themselves (repeated-measures ANOVA, p = .009).",
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
    title: "Consumer Psychology & Market Research",
    icon: "🛒",
    items: [
      "Consumer Psychology",
      "Consumer Decision-Making",
      "Behavioral Economics",
      "Market Research & Analysis",
      "Segmentation & Consumer Insights",
      "Competitive Benchmarking",
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
    title: "Behavioral Science & Research Methods",
    icon: "🧠",
    items: [
      "Applied Experimental Psychology",
      "Experimental Design",
      "Survey Design & Analysis",
      "Psychometrics",
      "Semi-structured Interviews",
      "Thematic Coding",
      "Usability Testing",
      "Repeated-measures ANOVA",
      "Binary Logistic Regression",
      "Cognitive Ergonomics",
      "Human-Computer Interaction",
      "R, SPSS & Jamovi",
    ],
  },
  {
    title: "Product Strategy & Prototyping",
    icon: "🧭",
    items: [
      "0-to-1 Product Management",
      "Requirements Gathering",
      "Stakeholder Communication",
      "Jobs-to-be-Done",
      "Kano Model",
      "MoSCoW Prioritization",
      "KPIs & Success Metrics",
      "PRINCE2",
      "Agile",
      "SAP Activate",
      "Business Planning & Monetization",
      "Design Thinking",
      "Personas & User Journey Maps",
      "Figma Prototyping",
      "Wireframing",
    ],
  },
  {
    title: "Engagement & Game Design",
    icon: "🎮",
    items: [
      "Game Mechanics & Game Feel",
      "Retention Loops",
      "Daily Challenges & Collections",
      "Reward Schedules",
      "Ad Placement",
      "Playtesting",
      "A/B Comparisons",
      "Idea Generation & Testing",
      "n8n Automation",
      "Generative AI & LLM Tools",
      "Conversational AI",
      "Google Cloud",
      "SEO & Google Search Console",
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
  category: "Consumer app" | "Game" | "B2B automation" | "AI automation" | "Research" | "Consulting" | "Growth consulting" | "Media product" | "EdTech";
  status: "Live" | "Shipped" | "Closed testing" | "Pre-launch" | "In development" | "Playable" | "Built" | "Prototype" | "Completed";
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
  /**
   * A playable build, embedded at /play/<slug>. `src` is the live web build, so the site always shows the
   * latest version. `device` sets the player's shape: a phone frame, or a wide screen for computer games.
   */
  play?: { src: string; device: "phone" | "computer"; note?: string };
  /**
   * Not open to the public yet: nothing links to or embeds a build. The pages show `note` instead and invite
   * people to email to hear more or to fund it.
   */
  inDevelopment?: { note: string };
  /**
   * The bigger idea behind a product, for people who want to know why it exists: a heading, a few
   * paragraphs and the points that make it up, plus slugs of Insights articles that go deeper. Rendered as
   * its own section on the case page (and, for Pukytoon, under its story on the homepage).
   */
  vision?: { title: string; paragraphs: string[]; points: { title: string; body: string }[]; articles?: string[] };
  /**
   * Silent gameplay clips (public/videos), shown in phone frames on the case page and listed as VideoObjects
   * in its schema. Each loops while on screen; clicking one opens the game when it plays on the site.
   * `duration` is ISO 8601 (e.g. "PT20S"); `uploaded` is the date the clip went on the site.
   */
  demo?: { src: string; poster?: string; title: string; caption: string; duration: string; uploaded: string }[];
  /** Google Play listing, shown as a "Get it on Google Play" link. */
  googlePlay?: { label: string; url: string }[];
  /**
   * The automation that ran a product, shown as its own section (#automation) on the case page: what each
   * workflow does in plain steps with a picture of the real workflow, screens from the build, what came out,
   * and what it changed. Pictures live in public/images/work; `wide` lets a long, flat workflow scroll
   * sideways on phones instead of shrinking. Pictures never show a reader's or a creator's name, address or photo.
   *
   * It also holds an automation that is built and tested but not live yet (Optimolds' request helper). Then
   * the intro and the results say so, `resultsTitle` replaces "What it changed", and the pictures show only
   * made-up test data.
   */
  automation?: {
    title: string;
    intro: string;
    workflows: {
      name: string;
      what: string;
      steps: string[];
      /** `caption` replaces the default line under the picture ("The <name> workflow in n8n."). */
      image: { src: string; width: number; height: number; alt: string; wide?: boolean; caption?: string };
    }[];
    /** Real screens from the build, each with what it shows. */
    screens?: { title: string; items: AutomationShot[] };
    /** What the workflows produced, e.g. an email as it was sent. */
    outputs?: { title: string; items: AutomationShot[] };
    /** Shown next to the header link and over the section title when the automation is not live, e.g. "Built and tested, not live yet". */
    status?: string;
    /** Heading over `results`. Defaults to "What it changed"; use another for work that is not live yet. */
    resultsTitle?: string;
    results: string[];
    tools: string[];
    note: string;
  };
  /** Another case study that continues this one, shown as a link under the header (e.g. how a product was run). */
  seeAlso?: { slug: string; label: string };
}

export interface AutomationShot {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface Investment {
  stage: string;
  /** Round size; leave empty until decided. */
  amount: string;
  status: string;
  /** Heading over the plan, e.g. "What the round buys: the 18-month plan". */
  planTitle?: string;
  plan: { when: string; what: string }[];
  useOfFunds: string[];
  successMetrics: string[];
  market: { label: string; value: string; source: string; url: string }[];
  beachhead: string;
  ask: string;
  /** The pitch deck as a PDF in public/decks, offered as a download on the case page. */
  deck?: string;
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
      "For Optimolds, an Italy-based composite engineering and mold-making firm, I built the trilingual website and advised on lead generation. The funnel applies B2B buyer psychology: a free 48-hour feasibility check as a risk-reversing lead magnet, a short CAD-upload form to cut effort, and trust signals placed before the ask. A request helper that runs on n8n and Claude prepares the first reply for the team; it is tested and not live yet.",
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
      {
        challenge: "A 48-hour promise is only as good as the first reply, and a small team answers requests between other jobs.",
        hypothesis: "Buyers trust a fast, specific first answer, and a team trusts automation that drafts but never sends.",
        method:
          "A request helper: every request is emailed to the team at once, then Claude drafts a brief, the open questions and a reply for a person to send.",
        outcome: "Built and tested with made-up requests. Not live yet.",
      },
    ],
    featureList: [
      "Free 48-hour feasibility check lead magnet",
      "Short CAD-upload contact form",
      "Service pages for FEA & layup, mold design and tooling",
      "Social proof and response-time trust signals",
      "English, Italian and German versions",
      "Step-by-step process explainer",
      "Request helper with n8n and Claude (built and tested, not live yet)",
    ],
    keywords: [
      "Consumer Psychology",
      "B2B Buyer Psychology",
      "Lead Generation",
      "Risk Reversal",
      "Conversion Rate Optimization",
      "Choice Architecture",
      "Human-in-the-loop Automation",
    ],
    automation: {
      title: "The request helper: how it works",
      status: "Built and tested, not live yet",
      intro:
        "The site promises a feasibility check within 48 hours, so the first reply has to be fast and specific. I had Claude build a helper for the team's inbox: it wrote the workflow and the code, and the helper was tested with made-up requests. When a buyer sends the form, the full request reaches the team at once. Then Claude prepares a short brief, a list of what is still missing and a reply draft, and a person reads the draft and sends it. The helper is built and tested. It is not live yet.",
      workflows: [
        {
          name: "The request reaches the team first",
          what: "No request waits for the AI, and none disappears quietly.",
          steps: [
            "A buyer sends the feasibility form on the website, with or without a CAD file.",
            "The helper drops requests from robots, which fill in a field that people never see.",
            "It emails the full request to the team at once, with the uploaded file. A reply to that email goes straight to the buyer.",
            "Only after that email is sent does the website show its thank-you page.",
            "If the email cannot be sent, the buyer sees an error message instead, so no request disappears quietly.",
          ],
          image: {
            src: "/images/work/optimolds-helper-flow-request.webp",
            width: 2856,
            height: 728,
            alt: "n8n workflow, part 1: Website form, Prepare request, Real request?, Settings, File uploaded?, Email the request with the file or Email the request, Email failed?, then either Tell the website it failed and Stop with an error, or Answer the website.",
            wide: true,
            caption: "Part 1 of the workflow in n8n, after a test run with a made-up request.",
          },
        },
        {
          name: "Claude prepares the first reply",
          what: "A brief and a reply draft for a person to check and send.",
          steps: [
            "Claude gets the technical fields and the notes only: the part, industry, material, quantity, deadline and services. The buyer's name, email, company and country are not sent to it.",
            "It writes a short brief, a list of what is still missing, up to four questions to ask, and a reply draft in the language of the page the buyer used: English, Italian or German.",
            "The team gets a second email with all of it, and the reply waits as a draft in Gmail.",
            "A person reads the draft, changes what they want and sends it. Nothing goes to a buyer automatically.",
            "If Claude is not available, the team is told, and they still have the request from the first email.",
          ],
          image: {
            src: "/images/work/optimolds-helper-flow-brief.webp",
            width: 2856,
            height: 714,
            alt: "n8n workflow, part 2: Claude writes the brief, Read the answer, Email the brief, Reply draft written?, Save a reply draft, then two switched-off steps, Make the log row and Log the request.",
            wide: true,
            caption:
              "Part 2 of the workflow in n8n, after the same test run. The two grey steps are an optional list of requests in Google Sheets, switched off.",
          },
        },
      ],
      outputs: {
        title: "A test run, from the form to the inbox",
        items: [
          {
            src: "/images/work/optimolds-helper-form.webp",
            width: 1280,
            height: 1977,
            alt: "The feasibility form filled in with a made-up request: Test Person at Example Boats, a hydrofoil front wing in carbon prepreg, 2 to 10 parts, a sample CAD file, mold design and tooling ticked.",
            caption: "The feasibility form on a copy of the site, filled in with a made-up request.",
          },
          {
            src: "/images/work/optimolds-helper-email-request.webp",
            width: 1520,
            height: 1744,
            alt: "Test email to the team, New feasibility request: Hydrofoil front wing (Example Boats), listing every field of the made-up request with the sample file attached.",
            caption:
              "Email 1 goes to the team at once: every field of the request, with the file attached. From a test of the website version.",
          },
          {
            src: "/images/work/optimolds-helper-email-brief.webp",
            width: 1520,
            height: 2476,
            alt: "Test email to the team, Brief and reply draft: a short brief, urgency, four missing details, four questions to ask and a reply draft with a button to open it in the email program.",
            caption:
              "Email 2 follows: the brief, what is still missing, questions to ask and the reply draft. In this test the brief and the draft are stand-in text, not a real Claude answer.",
          },
        ],
      },
      resultsTitle: "Where it stands",
      results: [
        "Built and tested, not live yet. It goes live when it is connected to the form on the Optimolds site.",
        "Tested with made-up requests: with a file and without one, with the AI not answering, with the email step failing, and with a robot's request. Each request either produced the email for the team or showed the buyer an error, and the robot's request was dropped.",
        "The tests ran in a local n8n and in Cloudflare's local runtime, with stand-ins for the email and AI services. A real Claude answer and a real email send are not tested yet. They come with the first live request.",
        "It exists in two versions with the same steps: an n8n workflow, and code that runs on the website itself as a Cloudflare Pages Function, for a team without n8n.",
        "A person stays in charge: the AI drafts, and a person decides what a buyer reads.",
      ],
      tools: ["n8n", "Claude", "Gmail", "Cloudflare Pages Functions"],
      note: "Every picture in this section shows a test with a made-up request. No customer data is shown.",
    },
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
    status: "Live",
    schemaType: "MobileApplication",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Android",
    url: "https://www.sinadehesh.com/app-lockers/",
    googlePlay: [
      { label: "ShroomLock", url: "https://play.google.com/store/apps/details?id=com.shroomlock.app" },
      { label: "CloudLock", url: "https://play.google.com/store/apps/details?id=com.cloudlock.app" },
    ],
    role: "Founder",
    organization: "Own product",
    summary:
      "FloraLock, ShroomLock and CloudLock are Android app lockers that replace \"no\" with a question. To open Instagram or TikTok, you name the plant, mushroom or cloud in a photo. Every urge to scroll becomes a five-second lesson, reinforced by spaced review — and built-in escape hatches keep people from uninstalling.",
    impact: {
      problem:
        "Most app blockers just say no, so people switch them off: the friction feels like punishment rather than something worth paying.",
      mechanism:
        "Worthwhile friction that interrupts the automatic tap-and-scroll loop, spaced repetition (reviews after 1, 3, 7, 14 and 30 days), real look-alikes as wrong answers, a 10-second \"Genius Penalty\" against random tapping, and escape hatches that respect autonomy to reduce reactance.",
      stack: ["Behavioral friction design", "Spaced repetition", "Android apps on Google Play", "Offline, on-device data"],
      outcome:
        "Three apps on one design — 70 plants, 71 mushrooms and 36 clouds with real photos — each with its own landing page. ShroomLock and CloudLock went live on Google Play in November 2026, and Sina now promotes them with short video ads on TikTok; FloraLock is in closed testing.",
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
      "One design, three subjects: the content changes while the lock, the lesson and the review stay the same.",
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
    keywords: ["Behavioral Friction", "Spaced Repetition", "Digital Wellbeing", "Reactance", "Habit Formation", "Android"],
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
    role: "Founder",
    organization: "Own product",
    summary:
      "OopsCupid is a live relationship-assessment platform I designed and launched on my own. It turns attachment and relationship psychology into short, no-sign-up tests and games, scores responses into a six-axis psychometric profile, and uses an LLM layer to write the readout — with daily challenges and streaks driving return visits.",
    impact: {
      problem:
        "Relationship self-help content is either unscientific listicles or long clinical questionnaires that people abandon before finishing.",
      mechanism:
        "Zero-friction entry (no sign-up, no email), psychometric scoring, variable daily challenges and streaks as a habit loop, and LLM-generated narrative feedback.",
      stack: ["Psychometric instrument design", "Six-axis scoring", "AI-written narrative profiles", "Funnel design and SEO"],
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
    role: "Founder",
    organization: "Costly",
    summary:
      "Costly is a habit-reversal app that charges real money for every minute of doomscrolling, at the hourly rate you set for your own time — then lets you earn 80% of it back by walking it off within 24 hours. You sign the contract yourself: the rate, the free minutes each day, the term and the exit stake, so the commitment holds even when it starts to hurt.",
    impact: {
      problem:
        "App blockers cut usage, but most people bypass or delete them — \"I just click ignore every time I see my app blocker,\" one interviewee told me. Commitment-contract apps such as stickK, Beeminder and Forfeit are built for any goal, so they rely on self-reporting or on tracking the user sets up. Costly is built for the phone: tracking is automatic and the consequence is committed up front.",
      mechanism:
        "A Ulysses contract signed at setup (hourly rate, free minutes each day, a one-week or one-month term and a self-priced exit stake), with loss aversion and the endowment effect doing the work: money already committed feels like yours to lose. Losses are framed against a five-tier ladder of things the user actually wants, and walking earns them back (2 minutes walked per minute scrolled).",
      stack: [
        "Ulysses contract, loss aversion and the endowment effect",
        "Real-money holds through Stripe, with 3DS at signup",
        "Android usage detection from network stats and motion sensors",
        "iOS (planned): Family Controls and DeviceActivity",
        "Walking detection to earn money back",
      ],
      outcome:
        "Built in June–July 2026: the contract flow, real-money holds and releases through Stripe, and an Android companion app with a live meter on screen. Validated in 30 conversations and 10 interviews: 8 people asked to join the waitlist, 3 asked unprompted when they could start, 7 of 10 completed signup with a test card, and their feedback drove 6 major changes to the MVP. Now raising a $200K pre-seed.",
    },
    metrics: [
      { value: "7 / 10", label: "Interviewees completed signup with a test card" },
      { value: "30 + 10", label: "Conversations and in-depth interviews" },
      { value: "80%", label: "Of each loss redeemable by walking" },
    ],
    tradeoffs: [
      "Scrolling is detected from per-app network stats and phone movement instead of reading the screen, so the app stays within Google Play's rules, at the cost of tuning it on each phone.",
      "A pre-funded balance instead of charging the card each session: the card is authenticated with 3DS at signup, usage draws down credit the user already put in, and nothing moves without the user acting, which keeps chargeback risk low.",
      "The user sets the exit stake (€0–€1000, zero allowed) and a fixed one-week or one-month term, so the contract is self-priced rather than an imposed penalty.",
      "A spending cap of $50 a month ($600 a year); three months at the cap means renegotiating the contract or leaving, so the stakes stay motivating, not ruinous.",
      "The money doesn't go to charity: phone addiction shouldn't fund something good, and charity shouldn't be attached to punishment.",
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
        challenge: "Would people sign up for a penalty on their own phone?",
        hypothesis: "People who have already failed with blockers want real consequences.",
        method: "30 conversations and 10 interviews with the working signup flow.",
        outcome: "8 asked to join the waitlist, 3 asked unprompted when they could start and 7 of 10 completed signup with a test card; 6 major changes to the MVP.",
      },
      {
        challenge: "Charges triggered by an app worry payment processors.",
        hypothesis: "A pre-funded, authenticated balance makes the payment profile reviewable.",
        method: "3DS at signup, a pre-funded balance drawn down by usage, and the exit stake held as an authorization on one-week terms, not a charge.",
        outcome: "Initial risk feedback from an EU acquirer: the prepaid structure is a reviewable profile. Formal underwriting is the next step.",
      },
      {
        challenge: "Is the effect causal, or just awareness?",
        hypothesis: "Stakes cut targeted-app minutes more than awareness or soft friction.",
        method: "Planned randomized three-arm study: awareness vs. soft friction vs. stakes.",
        outcome: "Planned after launch, to estimate the effect size.",
      },
    ],
    featureList: [
      "Self-signed contract: hourly rate, free minutes, term and exit stake",
      "Real-money per-minute meter",
      "Pre-funded balance with a 3DS-authenticated card",
      "$50 monthly spending cap",
      "Five-tier ladder of wanted products",
      "Walk-it-off redemption via Health Connect",
      "Commitment contract with dead man's switch",
      "Live overlay meter on Android",
    ],
    keywords: ["Loss Aversion", "Commitment Devices", "Ulysses Contract", "Endowment Effect", "Behavioral Friction", "Habit Reversal", "Precommitment", "Digital Wellbeing"],
    investment: {
      stage: "Pre-seed",
      amount: "$200K · 18 months of runway",
      status:
        "Pre-launch and validated: 8 people asked to join the waitlist, 3 asked unprompted when they could start, and 7 of 10 interviewees completed signup with a test card. The contract flow, Stripe holds and the Android live meter are built.",
      planTitle: "What the round buys: the 18-month plan",
      plan: [
        { when: "Product", what: "Complete Android and ship the pre-funded balance and payments layer; secure processor underwriting." },
        { when: "Phase 1", what: "First 1,000 users from organic Reddit communities (r/nosurf, r/productivity, r/getdisciplined), at a $7–10 acquisition cost." },
        { when: "Phase 2", what: "To 10,000 users through creator partnerships in the focus and ADHD niches, under a $60 acquisition-cost ceiling. Paid acquisition unlocks once install-to-contract clears 12%." },
        { when: "Month 18", what: "5,000 paying users and $900K ARR, with churn and install-to-contract measured." },
      ],
      useOfFunds: [
        "50% product: complete Android and ship the pre-funded balance and payments layer",
        "35% founding engineer: the production build, as the first technical hire or co-founder",
        "15% legal and compliance: US payments counsel, entity structuring and state-level consumer law review",
      ],
      successMetrics: [
        "Primary: daily minutes in targeted apps, week 4 vs. baseline",
        "Health: redemption rate — the share of holds walked off",
        "Growth: install-to-contract rate and churn",
      ],
      market: [
        {
          label: "US market (TAM)",
          value: "$18B",
          source: "Costly pitch deck: 100M dissatisfied doomscrollers × $180 ARPU",
          url: "/decks/costly-pitch-deck.pdf",
        },
        {
          label: "Serviceable market (SAM)",
          value: "$4.5B",
          source: "Costly pitch deck: the 25% who would stake real money",
          url: "/decks/costly-pitch-deck.pdf",
        },
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
      beachhead:
        "Productivity enthusiasts and people who need outside help to control their phone, almost all heavy social media users, reached first through r/nosurf, r/productivity and r/getdisciplined.",
      ask: "$200K for 18 months of runway, and a technical co-founder for production Android and payments. Beyond capital: payments and regulatory introductions.",
      deck: "/decks/costly-pitch-deck.pdf",
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
    status: "Prototype",
    schemaType: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    role: "Product owner",
    organization: "Own product",
    summary:
      "The Workflow Automation Engine is a tested prototype that turns sales calls and email threads into Pipedrive deal fields. n8n pipelines transcribe and extract the fields, a confidence gate routes ambiguous extractions to human review, and data integrity is the invariant: the pipeline may be slow, never wrong.",
    impact: {
      problem:
        "Sales teams skip CRM data entry, so pipelines rot; naive AI auto-fill makes it worse by writing wrong data.",
      mechanism:
        "Human-in-the-loop automation: high-confidence LLM extractions sync straight through, low-confidence ones wait for a human, matching automation to trust.",
      stack: ["n8n", "Pipedrive", "Speech-to-text", "AI extraction with human review"],
      outcome:
        "A working prototype, tested but not yet used by a sales team. By design, no ambiguous extraction reaches the CRM without human review.",
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
        outcome: "In the prototype, deal fields are filled in automatically from conversations.",
      },
      {
        challenge: "AI extraction is sometimes wrong.",
        hypothesis: "Users trust automation that defers when unsure.",
        method: "Confidence gate with a manual review queue.",
        outcome: "In the prototype, high-confidence writes sync at once; ambiguous ones wait for a person to approve them.",
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
    role: "Founder",
    organization: "Own product",
    summary:
      "Daily Hustle is a live web platform that guides creators from idea to first income. It breaks a launch into a 27-day program of daily action steps with built-in workbooks and a progress dashboard — using task chunking and goal-gradient feedback to keep people moving where open-ended courses stall.",
    impact: {
      problem: "Online courses have notoriously low completion; open-ended content leaves learners without a next step.",
      mechanism:
        "Implementation intentions and chunking (one concrete action per day) plus goal-gradient progress feedback in a personal dashboard.",
      stack: ["Goal-gradient design", "Daily action steps", "User dashboard", "Payments"],
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
    tagline: "A 30-issue art-meditation email magazine designed for engagement signal",
    published: true,
    category: "Media product",
    status: "Completed",
    schemaType: "CreativeWork",
    url: "https://daily.sinadehesh.com/",
    role: "Founder & editor",
    organization: "Own product",
    summary:
      "The Daily Sublime is a 30-issue digital art magazine and visual-mindfulness course delivered by email. Each issue is a five-minute guided observation of one painting, ending in one-click reply buttons — the lowest-friction response surface an inbox allows — turning passive readers into a measurable engagement signal.",
    impact: {
      problem:
        "Newsletters cannot tell what lands: open rates are noisy and replies take effort, so most readers never signal anything.",
      mechanism:
        "Friction reduction at the response step (one-click replies) plus a fixed daily ritual that builds a reading habit.",
      stack: [
        "Email magazine",
        "One-click reply buttons",
        "n8n workflows with Claude",
        "Landing page",
        "Gumroad checkout",
        "YouTube companion channel",
      ],
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
    featureList: [
      "Daily art-observation email",
      "Guided slow-looking exercises",
      "One-click reply engagement",
      "Paid course",
      "AI issue writer (n8n and Claude)",
      "Personal creator outreach drafts",
    ],
    keywords: ["Friction Reduction", "Habit Formation", "Email Engagement", "Visual Mindfulness", "n8n Automation"],
    seeAlso: { slug: "daily-sublime-automation", label: "How it was run: three n8n workflows with Claude" },
  },
  {
    slug: "daily-sublime-automation",
    cover: { metric: "56 s", caption: "for Claude to write one issue" },
    name: "Daily Sublime Automation",
    tagline: "n8n and Claude workflows that ran a one-person art magazine",
    published: true,
    category: "AI automation",
    status: "Completed",
    schemaType: "CreativeWork",
    role: "Founder; designed and built the workflows",
    organization: "Own product: The Daily Sublime",
    summary:
      "The Daily Sublime was a 30-issue art magazine by email that I ran alone. Three n8n workflows with Claude did the back-office work: one wrote each issue, one checked its links, and one drafted a personal email to each YouTube creator. Nothing went to a stranger before I had read it.",
    impact: {
      problem:
        "A daily art magazine needs research, writing, six pictures and a send for every issue, plus outreach to find readers. That is too much for one person to do by hand every day.",
      mechanism:
        "Trust in automation: the AI writes, real sources and code supply what must be exact, such as picture links, and a person checks anything that goes to a stranger. For outreach, personal relevance: every email opens with something specific about that creator's own channel.",
      stack: [
        "n8n workflows",
        "Claude for writing",
        "Wikimedia Commons search for pictures",
        "Google Sheets for issues and readers",
        "Gmail for sending and drafts",
        "Google Apps Script for sign-ups",
      ],
      outcome:
        "Starting with issue 8, the workflow wrote the issues and looked up their pictures. Issues went out automatically at 8:00 in the morning between December 2025 and March 2026, and about 80 personal outreach emails were drafted by Claude and checked by me before sending.",
    },
    metrics: [
      { value: "3", label: "Workflows: issue writer, link checker, creator outreach" },
      { value: "56 s", label: "For Claude to write one issue (test run, 21 January 2026)" },
      { value: "43", label: "Fields in every issue, from the title to the poem" },
      { value: "~80", label: "Outreach emails drafted by AI and checked by me" },
      { value: "25", label: "Saved versions of the workflows" },
    ],
    tradeoffs: [
      "Outreach emails stop as Gmail drafts instead of being sent by the workflow: slower, but nothing reaches a stranger unread.",
      "Google Sheets as the only database: easy to read and to fix by hand, not built for scale.",
      "One issue per run instead of a whole batch: slower, but a bad run costs one issue, not thirty.",
      "Pictures come from Wikimedia Commons: free and reliable for old masters, thin for modern painters, so some issues needed pictures placed by hand.",
    ],
    decisionLog: [
      {
        challenge: "Picture links written by the AI often did not open.",
        hypothesis: "A language model is good at writing and unreliable with exact addresses, so the links should come from the source.",
        method:
          "Three attempts in two days: a loop that tested every link, a second model only for links, then a search of Wikimedia Commons for each painting.",
        outcome:
          "From issue 8 the pictures came from the Wikimedia search. It found all six pictures for 15 of the next 24 issues; I placed the rest by hand, mostly for modern painters.",
      },
      {
        challenge: "Thirty issues can start to repeat themselves.",
        hypothesis: "The model repeats less when it sees what earlier issues already used.",
        method: "Before each run, n8n collects the practices, music and poems of all earlier issues and tells Claude not to reuse them.",
        outcome:
          "No practice and no piece of music repeats in 31 issues. Four poems do, so a rule in a prompt reduces repeats but is not a guarantee.",
      },
      {
        challenge: "An email written by AI and sent to the wrong person costs trust.",
        hypothesis: "Automation is easier to trust when it stops before the step that cannot be undone.",
        method: "The outreach workflow saves every email as a Gmail draft and marks the creator as Drafted in the sheet. Sending stays manual.",
        outcome: "I read each draft before it went out. About 80 emails were sent between 17 January and 1 February 2026.",
      },
      {
        challenge: "A daily magazine has to arrive every day at the same time.",
        hypothesis: "A fixed morning time turns reading into a routine.",
        method: "The sheet stores which issue each reader is on. n8n sends the next issue at 8:00 and moves the reader forward.",
        outcome: "Issues went out at 8:00 in the morning between December 2025 and March 2026.",
      },
    ],
    featureList: [
      "Issue writer (n8n and Claude)",
      "Picture search on Wikimedia Commons",
      "Link checker",
      "Do-not-repeat list from earlier issues",
      "Scheduled sending at 8:00",
      "Creator outreach as Gmail drafts",
      "Seven color themes, one per weekday",
      "Sign-up form to Google Sheets",
    ],
    keywords: ["n8n", "Claude", "AI Automation", "Human-in-the-loop", "Email Automation", "Google Sheets"],
    seeAlso: { slug: "daily-sublime", label: "The magazine itself: The Daily Sublime" },
    automation: {
      title: "How the automation worked",
      intro:
        "I ran The Daily Sublime on my own, so I built its back office as n8n workflows with Claude. One workflow wrote each issue, one checked its links, and one drafted personal emails to YouTube creators. Google Sheets held the issues and the readers, sign-ups went into the sheet through a small Google Apps Script, and Gmail sent the email.",
      workflows: [
        {
          name: "Issue writer",
          what: "Turns one day number into a complete issue.",
          steps: [
            "I type a day number in n8n's chat.",
            "n8n finds that day's painter in a Google Sheet and stops if the issue already exists.",
            "It collects the practices, music and poems of earlier issues, so Claude does not reuse them.",
            "Claude writes the issue: a hook, why the painter matters, five things to notice, a short practice, a true story with its source, music and a poem.",
            "n8n searches Wikimedia Commons for the five paintings and the painter's portrait, so the picture links come from the source and not from the AI.",
            "n8n saves all 43 fields back into the sheet, where the email template picks them up.",
          ],
          image: {
            src: "/images/work/daily-sublime-flow-issue.webp",
            width: 2864,
            height: 294,
            alt: "n8n workflow: Receive Day Number, Read All Lessons, Find Target Row, Build Content Prompt, Sonnet - Write Content, Parse Content, Prepare Wikimedia Searches, Search Wikimedia, Combine Content + URLs, Update Sheet, Success Response.",
            wide: true,
          },
        },
        {
          name: "Link checker",
          what: "Makes sure every picture and source in an issue opens.",
          steps: [
            "n8n reads the issue and checks every image and source link.",
            "If a link is broken, Claude suggests a replacement.",
            "n8n writes the fixed links back into the sheet.",
          ],
          image: {
            src: "/images/work/daily-sublime-flow-links.webp",
            width: 2852,
            height: 512,
            alt: "n8n workflow: Trigger Validation, Read Lessons Sheet, Extract URLs, Check URL, Collect Results, All URLs Valid?, then either All Valid Response or Build Fix Prompt, Find Replacement URLs with Claude, Parse Replacements, Update Fixed URLs and Fixed Response.",
            wide: true,
          },
        },
        {
          name: "Creator outreach",
          what: "Finds creators and drafts a personal email to each, for me to check and send.",
          steps: [
            "I type a topic in n8n's chat.",
            "A scraper finds up to 10 YouTube creators with a public business email.",
            "n8n adds each creator to a Google Sheet as Pending.",
            "Claude writes a personal email from the creator's channel description.",
            "n8n puts it into the designed email, saves it as a Gmail draft and marks the row Drafted.",
            "I read each draft and send it myself.",
          ],
          image: {
            src: "/images/work/daily-sublime-flow-outreach.webp",
            width: 2866,
            height: 294,
            alt: "n8n workflow: When Chat Message Received, Scrape YouTube Emails, Loop Over Items, Add to Google Sheet, Store Influencer Data, Generate with Claude, Parse AI Response, Build Email, Create Draft in Gmail, Update Status to Drafted, Generate Summary.",
            wide: true,
          },
        },
      ],
      screens: {
        title: "What building it looked like",
        items: [
          {
            src: "/images/work/daily-sublime-build-day1.webp",
            width: 1920,
            height: 866,
            alt: "n8n editor showing version 1 of the issue writer, 17 steps with a loop that validates every link, and an error message on the last sheet step.",
            caption:
              "20 January 2026, version 1: seventeen steps, with a loop that tested every link the AI wrote. This test run failed at the last sheet step.",
          },
          {
            src: "/images/work/daily-sublime-build-day2.webp",
            width: 1920,
            height: 866,
            alt: "n8n editor showing the rebuilt issue writer: Claude's writing step finished in 55.628 seconds, Wikimedia returned six items, and one step is marked red.",
            caption:
              "21 January 2026, the rebuild: Claude wrote the Velázquez issue in 55.6 seconds and Wikimedia returned six pictures. The red step is the bug I fixed next: it still asked for a step I had disconnected.",
          },
        ],
      },
      outputs: {
        title: "What came out",
        items: [
          {
            src: "/images/work/daily-sublime-issue-top.webp",
            width: 1000,
            height: 1231,
            alt: "Issue 27 of The Daily Sublime: Geometry as Quiet Revelation, featured artist Piero della Francesca, with The Flagellation of Christ.",
            caption: "Issue 27, sent to a reader on Sunday 15 February 2026 at 8:00. Each weekday has its own color theme.",
          },
          {
            src: "/images/work/daily-sublime-issue-end.webp",
            width: 1000,
            height: 967,
            alt: "The end of issue 27: a poem with its source link, the footer, and the line 'This email was sent automatically with n8n'.",
            caption: "The end of the same issue. The last line comes from n8n: the email was sent automatically.",
          },
          {
            src: "/images/work/daily-sublime-outreach-email.webp",
            width: 1000,
            height: 1921,
            alt: "An outreach email with the creator's photo and name covered: two personal paragraphs, the partnership offer and a reply button.",
            caption:
              "An outreach email as it was sent on 19 January 2026. Claude wrote the two paragraphs from the creator's channel description. I have covered the creator's name and photo.",
          },
        ],
      },
      results: [
        "Writing an issue by hand means researching a painter, choosing the works, finding a true story and a poem, and finding six pictures that open. The workflow does that in one run; Claude's writing step took 55.6 seconds in the test shown above.",
        "Each reader got the issues in order at 8:00 in the morning, in a designed email with seven color themes, one for each weekday. The sheet tracked which issue each reader was on.",
        "Outreach went from finding people and writing every email from scratch to typing a topic and checking up to 10 personal drafts.",
        "About 80 personal emails to creators went out between 17 January and 1 February 2026.",
      ],
      tools: ["n8n", "Claude", "Wikimedia Commons API", "Google Sheets", "Gmail", "Google Apps Script"],
      note: "The dark screens are my own n8n editor in January 2026. The light pictures are my exported workflows in n8n's workflow viewer, with logins and prompts removed.",
    },
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
    role: "Co-creator: product and behavioral design",
    organization: "Team project with engineer friends",
    summary:
      "Passway is an engineering learning tracker built on a two-source data model: the canonical engineering curriculum on one axis and what universities actually teach on the other. Mapping both onto one topic grid exposes the gap between them, which is the product — a personal map of what a learner still needs. The map only works if students enter what their courses cover, and they were not entering enough, so I suggested the swipe from dating apps, changed to fit data entry; in a test with engineering students they entered much more data and enjoyed it more.",
    impact: {
      problem: "Engineering learners cannot see which core topics their program under-covers until it shows up in interviews.",
      mechanism: "Gap analysis between a canonical topic matrix and observed per-program coverage, rendered as a comparable grid.",
      stack: ["Swipe-based data entry", "User testing with engineering students", "Two-source data model", "Gap analysis"],
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
      {
        challenge: "The map only works if students enter what their courses cover, and they were not entering enough.",
        hypothesis: "If each entry is one quick, low-effort decision, students will enter far more.",
        method: "Borrowed the swipe from dating apps and changed it to fit data entry; tested several ways of entering data with engineering students.",
        outcome: "Students entered much more data and enjoyed it more; the team settled on swiping plus a few specific input types.",
      },
    ],
    featureList: ["Canonical curriculum matrix", "Per-program coverage mapping", "Gap highlighting", "Swipe-based data entry"],
    keywords: ["Gap Analysis", "EdTech", "Swipe Interaction", "Friction Reduction", "User Testing"],
  },
  {
    slug: "dopamine-box",
    cover: { metric: "99%", caption: "the near-miss that keeps you spinning" },
    name: "Dopamine Box",
    tagline: "A behavioral experiment on betting: the Kelly criterion, near-misses and scarcity",
    published: true,
    category: "Consumer app",
    status: "Prototype",
    schemaType: "WebApplication",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    role: "Founder & researcher",
    organization: "Own product",
    summary:
      "Dopamine Box is a behavioral experiment on betting. It was built to observe how people bet compared with the Kelly criterion (the mathematically optimal stake), and which attitudes and cognitive biases pull them off course. The experiment runs on a mock-token \"spin to claim\" loop: each spin adds shards toward a target item, with micro hits, solid hits and rare jackpots on a variable schedule, near-misses and scarcity tags. No real money is involved.",
    impact: {
      problem:
        "Spin-to-win and shard-collection mechanics are spreading from games into shopping apps, but their psychology is rarely shown plainly to the people who design or use them.",
      mechanism:
        "The Kelly criterion as the benchmark for each stake, tested against variable-ratio reinforcement (micro, solid and jackpot outcomes), near-miss effects, goal-gradient progress toward 100%, and scarcity and social-proof labels such as \"Low Stock\" and \"1 User Won Today\".",
      stack: ["Behavioral experiment design", "Kelly criterion benchmark", "Variable-ratio rewards", "Mock tokens only"],
      outcome: "Working prototype of the experiment with mock tokens, tiered target items and live feedback on every spin.",
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
        challenge: "How far do people's bets drift from the optimal stake, and why?",
        hypothesis: "Near-misses, scarcity labels and variable rewards pull people away from the Kelly-optimal stake.",
        method: "Spin loop with variable progress, near-miss snaps and scarcity tags, with each stake compared with the Kelly criterion.",
        outcome: "A working prototype of the experiment, with mock tokens only.",
      },
    ],
    featureList: ["Spin-to-claim shard progress", "Micro / solid / jackpot variable rewards", "Near-miss feedback", "Scarcity and social-proof tags", "Mock-token wallet"],
    keywords: ["Kelly Criterion", "Cognitive Biases", "Variable Reward Schedules", "Near-Miss Effect", "Loot Boxes", "Behavioral Experiment"],
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
    featured: true,
    name: "Automated Interview Simulation Study",
    tagline: "How what candidates see on screen shapes their behavior",
    published: true,
    category: "Research",
    status: "Completed",
    schemaType: "CreativeWork",
    role: "Principal investigator (M.Sc. thesis)",
    organization: "University of Milano-Bicocca",
    summary:
      "This controlled experiment tested how what candidates see on screen in an automated interview changes how they behave. In a within-subjects design with 96 participants and three conditions (self-view, AI avatar and text only), repeated-measures ANOVA with Holm-corrected post hoc tests showed that candidates were significantly more expressive with the AI avatar than when they saw themselves, p = .009.",
    impact: {
      problem: "AI-led interviews are spreading, but little is known about how their interface design shapes candidate behavior.",
      mechanism: "Three ways of presenting the interview (self-view, an AI avatar and text only) as a manipulation of self-awareness and expressiveness.",
      stack: ["Automated interview simulation", "Within-subjects design", "Repeated-measures ANOVA", "Holm-corrected post hoc tests"],
      outcome: "Candidates were significantly more expressive with the AI avatar than with self-view (p = .009), with direct implications for the design of AI interview tools.",
    },
    metrics: [
      { value: "N = 96", label: "Participants, within-subjects" },
      { value: "p = .009", label: "AI avatar vs. self-view" },
      { value: "3", label: "Conditions: self-view, AI avatar, text only" },
    ],
    tradeoffs: ["Within-subjects design for statistical power with a moderate sample, controlling order effects across conditions."],
    decisionLog: [
      {
        challenge: "Does interface feedback change how candidates present themselves?",
        hypothesis: "What candidates see of themselves on screen changes how expressive they are.",
        method: "Three conditions (self-view, AI avatar, text only); repeated-measures ANOVA with Holm-corrected post hoc tests, N = 96.",
        outcome: "Candidates were significantly more expressive with the AI avatar than with self-view, p = .009.",
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
    published: false,
    category: "Consumer app",
    status: "Built",
    schemaType: "MobileApplication",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Android",
    role: "Founder",
    organization: "Own product",
    summary:
      "Virtue Ledger turns Benjamin Franklin's thirteen-virtue notebook into a mobile behavioral audit: a 13 × 7 grid where logging a day costs one tap and no decisions. When it raises a virtue there is no \"dismiss\" — only Now, or a named hour it holds you to.",
    impact: {
      problem:
        "Habit trackers ask for too many decisions per entry, and their \"remind me later\" buttons let intentions quietly evaporate.",
      mechanism:
        "Minimal-effort logging (one tap cycles not logged → fault → kept), honest fault-first ordering, and implementation intentions: \"Later\" means naming an hour, backed by a real scheduled notification.",
      stack: ["Implementation intentions", "One-tap daily tracking", "Android app and web", "Haptic feedback"],
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
    keywords: ["Implementation Intentions", "Habit Tracking", "Friction Reduction", "Self-Improvement", "Habit Formation"],
  },
  {
    slug: "tao-app",
    cover: { metric: "1", caption: "passage a day, chosen by the date" },
    name: "The Art of Observation (app)",
    tagline: "A distraction-free Android reader and study guide for TAO",
    published: false,
    category: "Media product",
    status: "Built",
    schemaType: "MobileApplication",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Android",
    role: "Author & designer",
    organization: "Own product",
    summary:
      "An Android app for reading and studying TAO: The Art of Observation. The full text appears verbatim in a distraction-free reader, with a key-concepts study guide linked back to each chapter and one passage of the day chosen deterministically by date.",
    impact: {
      problem: "Reflective texts are hard to return to on a phone full of interruptions.",
      mechanism:
        "A single daily passage as a low-effort ritual, and a study guide that links every concept back to the chapter that teaches it.",
      stack: ["Distraction-free reading design", "Android app", "Offline content"],
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
    keywords: ["Reading Experience", "Habit Formation", "Distraction-free Design", "Self-Improvement"],
  },
  {
    slug: "debubble",
    image: "/images/work/debubble.webp",
    demo: [
      {
        src: "/videos/debubble-tour.mp4",
        poster: "/videos/debubble-tour.jpg",
        title: "A day in DeBubble",
        caption: "Four tiny things a day, one brave step outside, and a room that comes alive, with no streaks to break.",
        duration: "PT16S",
        uploaded: "2026-11-12",
      },
    ],
    cover: { metric: "4", caption: "tiny things a day: body, room, heart, one step outside" },
    featured: true,
    name: "DeBubble",
    tagline: "Cozy self-care: a pixel room that grows as you step out of your bubble",
    published: true,
    category: "Consumer app",
    status: "Pre-launch",
    schemaType: "MobileApplication",
    applicationCategory: "HealthApplication",
    operatingSystem: "Android",
    url: "https://www.sinadehesh.com/debubble/",
    role: "Founder",
    organization: "Own product",
    summary:
      "DeBubble: Cozy Self-Care is an Android app where a pixel-art room grows as you look after yourself. Every day there are four tiny things to do — one for your body, your room, your heart, and one small step outside — and as you go further out of your bubble the room opens up: a window, then a door, then the street.",
    impact: {
      problem:
        "Self-care and confidence apps lean on streaks and guilt, so one missed day feels like failure and people quit — and \"leave your comfort zone\" advice gives no first step.",
      mechanism:
        "Tiny habits tied to cues the user already has (\"when I put the kettle on\"), graded steps outside the comfort zone one rung at a time, a prediction-versus-outcome check that shows a mission was easier than feared, and progress that only goes up — no streaks to lose.",
      stack: ["Tiny habits", "Graded exposure", "Pixel-art room that grows", "Home-screen widget", "Offline: no internet permission"],
      outcome:
        "Signed release build for Android, with a complete Google Play listing and seven captioned screenshots of the real app.",
    },
    metrics: [
      { value: "4", label: "Tiny things a day" },
      { value: "30", label: "Stops in each journey" },
      { value: "0", label: "Internet permission — nothing leaves the phone" },
    ],
    tradeoffs: [
      "No streaks: days you showed up only ever go up, so a bad week never erases what was earned.",
      "\"Remind me\" sits right next to \"I did it\": one nudge at a chosen time, or none at all — gentle rather than nagging.",
      "No internet permission at all: complete privacy, at the cost of sync and analytics.",
      "A skipped task becomes a spark of courage once the user names what got in the way, turning avoidance into information instead of failure.",
    ],
    decisionLog: [
      {
        challenge: "Habit apps punish missed days.",
        hypothesis: "Progress that can't be lost brings people back after a bad week.",
        method: "No streaks; the room gets a little messy, but nothing earned is ever taken away.",
        outcome: "A days-shown-up count that only goes up.",
      },
      {
        challenge: "Comfort-zone advice has no first step.",
        hypothesis: "Graded exposure sized to today makes stepping out doable.",
        method: "One outside mission a day, sized to where the user is, plus 30-stop journeys toward a goal.",
        outcome: "Three roads out of the bubble, one rung at a time.",
      },
      {
        challenge: "Anxiety overestimates how hard things will be.",
        hypothesis: "Comparing a prediction with the real outcome recalibrates fear.",
        method: "Guess how a mission will go before trying it, then record how it went.",
        outcome: "A prediction-versus-outcome check on every mission.",
      },
      {
        challenge: "Routines fade without a trigger.",
        hypothesis: "Tying a habit to a moment that already happens makes it stick.",
        method: "Body, room and heart routines anchored to cues the user picks.",
        outcome: "Cue-based daily routines.",
      },
    ],
    featureList: [
      "Four tiny daily things: body, room, heart, outside",
      "A pixel room that grows and opens up",
      "Graded outside missions",
      "30-stop journeys",
      "Prediction vs. outcome check",
      "Home-screen widget",
      "Gentle reminders",
      "Offline and private",
    ],
    keywords: ["Tiny Habits", "Graded Exposure", "Self-Care", "Habit Formation", "Gamification", "Android"],
  },
  {
    slug: "merge-farmstead",
    image: "/images/work/merge-farmstead.webp",
    cover: { metric: "7–9", caption: "the reading age every story line is written for" },
    name: "Merge Farmstead",
    tagline: "A story-driven merge tycoon game for young players",
    published: true,
    category: "Game",
    status: "Live",
    schemaType: "MobileApplication",
    applicationCategory: "GameApplication",
    operatingSystem: "Android, Web",
    url: "https://sinadehesh.github.io/animal-farm-merge/",
    play: { src: "https://sinadehesh.github.io/animal-farm-merge/", device: "phone" },
    googlePlay: [{ label: "Merge Keeper", url: "https://play.google.com/store/apps/details?id=com.sinadehesh.mergefarmstead" }],
    role: "Founder & game designer",
    organization: "Own product",
    summary:
      "Merge Farmstead is a farm merge game wrapped in a mystery: for a hundred years the Golden Bell rang over Sunnyvale every night, and now it is gone. As Clara, the new farmer, you fix the farm and follow the clues to find it before a land developer takes the valley. The new version adds the town itself: seven places in Sunnyvale to restore and townspeople to help, plus a Market, Land Deeds, a Growth Guide that makes merges one size bigger, Daily Deals, a Wishing Well, Missions and a 28-day Season Pass. Every story line is written at a second-to-third-grade reading level, and ads are requested as child-directed and non-personalized from the start. On Google Play it is called Merge Keeper: Mystery & Puzzle.",
    impact: {
      problem:
        "Merge games are sticky but hollow, and many aimed at children monetize through ad and purchase flows that were never designed for them.",
      mechanism:
        "Merge-and-upgrade progression for steady competence wins, a chaptered mystery with clues and suspects for curiosity, a town that visibly comes back to life as you restore it, daily and seasonal goals (Daily Deals, Missions, a 28-day Season Pass), and child-directed, non-personalized ad requests.",
      stack: ["Game design", "Story written for young readers", "Town restoration and a 28-day season pass", "Child-directed, non-personalized ads"],
      outcome: "The new version is playable on the web, and the Android version went into production on Google Play in November 2026 as Merge Keeper: Mystery & Puzzle, which Sina now promotes with short video ads on TikTok. A full story bible backs every chapter.",
    },
    metrics: [
      { value: "7–9", label: "Reading age for all story text" },
      { value: "7", label: "Places in Sunnyvale to restore" },
      { value: "28", label: "Days in each Season Pass" },
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
        challenge: "Players need goals beyond the next merge.",
        hypothesis: "A town that visibly comes back to life, plus daily and seasonal goals, gives every session a purpose.",
        method: "Seven places in Sunnyvale to restore, townspeople to help, Missions, Daily Deals and a 28-day Season Pass.",
        outcome: "Live in the new web version.",
      },
      {
        challenge: "Kids' games often monetize unsafely.",
        hypothesis: "Designing monetization as child-directed from day one avoids retrofitting compliance.",
        method: "Child-directed, non-personalized ad requests.",
        outcome: "Monetization layer built for a young audience.",
      },
    ],
    featureList: ["Merge-and-upgrade farm", "Seven places in Sunnyvale to restore", "Town deliveries", "Chaptered mystery story", "Market, Land Deeds and Growth Guide", "Missions, Daily Deals and a Season Pass", "Android app", "Playable on the web"],
    keywords: ["Game Design", "Progression Systems", "Child-directed Design", "Narrative Design", "Season Pass"],
  },
  {
    slug: "pukytoon",
    image: "/images/work/pukytoon.webp",
    cover: { metric: "1 link", caption: "turns a Claude, Gemini or Kimi game into a card in the feed" },
    featured: true,
    name: "Pukytoon",
    tagline: "A feed of games anyone can make, share and play",
    published: true,
    category: "Game",
    status: "In development",
    schemaType: "MobileApplication",
    applicationCategory: "GameApplication",
    operatingSystem: "Android, Web",
    inDevelopment: {
      note: "Pukytoon is still in development, so it isn’t open to play yet. If you’d like to know more, or to fund it, email me.",
    },
    vision: {
      title: "Everyone makes videos now. Next, everyone makes games.",
      paragraphs: [
        "Every medium opened up the same way. Writing, photos, music and video were once made by specialists for everyone else; then the tools got easy, a place to share appeared, and making became something people do for each other. Games are the last big medium still made mostly by specialists, because even a small game needs rules, pictures, sound and code.",
        "AI has started to change that: anyone can describe a game to Claude, Gemini or Kimi and play it a minute later. But those games end at a share link nobody browses. What’s missing isn’t a better tool. It’s the social part: a feed where games get seen, and people who play them, answer them and make their own.",
        "That’s why Pukytoon is built around people as much as games. When anyone can make a game, games become messages, gifts, jokes and replies — a new way for people to spend time together.",
      ],
      points: [
        {
          title: "A game becomes a message",
          body: "When a game takes minutes to make, you can make one for a single person: a birthday, an inside joke, a quiz only your class can pass. Its value is who made it and who it’s for, not how polished it is.",
        },
        {
          title: "From player to maker, one small step at a time",
          body: "In most communities, most people only watch. So every step is small: swipe to play, tap to like, share with one link, make your own version of someone’s game, then make one from scratch.",
        },
        {
          title: "Remixing is how makers talk",
          body: "Making your own version of someone’s game is a reply: I liked this, here’s mine. Starting from a game that already works is also the gentlest way to learn how games are made.",
        },
        {
          title: "Credit travels with every game",
          body: "Every shared game carries its maker’s name and @handle. Among makers, credit is the currency: it turns a copy into a conversation and a run of games into a reputation.",
        },
        {
          title: "An audience is the reason to make a second game",
          body: "Likes tell a maker that someone played and enjoyed their game. Following makers, which comes next, will gather each maker’s games in one place, so every new one reaches the people who liked the last.",
        },
        {
          title: "Playing together, even apart",
          body: "One link per game means a game travels through the group chats people already use. Playing a game a friend made is a way to spend time with them when you can’t be in the same place.",
        },
        {
          title: "Games about everyone’s lives",
          body: "When only studios make games, games reflect a narrow set of people and tastes. When anyone can make one, there can be games in every language, about every town, school and family.",
        },
        {
          title: "Safety keeps the room open",
          body: "Beginners only share when they trust the room. Every pasted game runs sealed off from the app and the other games, people can report and hide what they don’t want, and until the checks for shared code are ready, only Studio games and Claude, Gemini or Kimi links can be shared with everyone.",
        },
      ],
      articles: [
        "democratization-of-game-development",
        "social-side-of-making-games",
        "pukytoon-interface-design",
        "gutenberg-to-blogging-collective-knowledge",
      ],
    },
    role: "Founder",
    organization: "Own product",
    summary:
      "Pukytoon, still in development, is a feed of games you swipe through like short videos, and anyone can add to it. Make a game in the Creator Studio with no code — four game types, six looks, 74 pictures, your own rules, so hundreds of different games — or copy the link of a game you made as a Claude artifact or with Gemini or Kimi and paste it in: it becomes a card in the feed. Sign in to share your games with everyone, like other people's, send a game to a friend with one link, or make your own version of someone else's. Making videos became something everyone can do; I believe making games will go the same way, and that the social platforms of the future will be gamified.",
    impact: {
      problem:
        "People make small games with AI chatbots every day, but they stay stuck behind share links that nobody browses, and making a game from scratch is still far harder than making a video.",
      mechanism:
        "Feed-style browsing cuts the cost of trying a game to one swipe; a no-code Creator Studio turns players into makers; pasting a link turns an AI-made artifact into a game in the feed; likes, share links and remixing make every game social.",
      stack: ["Feed design: one swipe to try a game", "No-code Creator Studio", "Paste a link: Claude artifacts, Gemini, Kimi", "Accounts, likes, share links and remixing", "Android app and web"],
      outcome:
        "In development. The swipe feed, the Creator Studio, adding games by link or code, and a shared feed with accounts, likes, share links, reports and remixing work in a web build and an Android test build.",
    },
    metrics: [
      { value: "4 × 6", label: "Game types × looks in the Creator Studio" },
      { value: "74", label: "Pictures to swap into any game" },
      { value: "1 link", label: "To add a game made with Claude, Gemini or Kimi" },
    ],
    tradeoffs: [
      "Claude, Gemini and Kimi don't let other apps embed their pages, so a link game plays full screen in the app's own view (a new tab in the web version); pasting the game's code plays it right in the feed.",
      "A Creator Studio game is saved as a few hundred bytes of data — the game type, settings, look and rules — so it loads instantly, works offline and can be shared and remixed safely.",
      "Every pasted game runs sealed off from the app and from the other games, and only Studio games and links to Claude, Gemini or Kimi can be shared with everyone until the safety checks for shared code are ready.",
    ],
    decisionLog: [
      {
        challenge: "AI-made games are scattered across share links.",
        hypothesis: "A swipeable feed makes trying a game as cheap as watching a clip.",
        method: "One game per screen with video-style snapping, each game waiting under its cover.",
        outcome: "A feed that plays built-in games, pasted code and AI share links.",
      },
      {
        challenge: "Making a game is still much harder than making a video.",
        hypothesis: "If making a game means choosing and tuning instead of coding, players become creators.",
        method: "A Creator Studio: pick a game type and a look, tune it while a live preview plays, set how to win and lose, publish.",
        outcome: "Drop-and-merge, endless runner, match-3 and whack-a-mole games in six looks, made without code.",
      },
      {
        challenge: "A game nobody can find or share stays a private toy.",
        hypothesis: "Names, likes, share links and remixing make each game a reason to come back and invite someone.",
        method: "Email sign-in with no password, a shared feed, likes, a share link for every game, Make your own version, reports and hiding.",
        outcome: "Shared games carry their creator's name and @handle; following creators, community mechanics and an asset library come next.",
      },
    ],
    featureList: [
      "Swipe feed, one game per screen",
      "Creator Studio: four game types, six looks, 74 pictures, no code",
      "Your own rules for winning and losing",
      "Add a game by pasting a Claude, Gemini or Kimi link, or its code",
      "Share with everyone, likes and one-link sharing",
      "Make your own version of any shared Studio game",
      "Android app and web",
    ],
    keywords: ["Feed Design", "AI-generated Games", "Claude Artifacts", "No-code Game Maker", "Creator Tools", "Gamified Social Platforms", "Democratization of Game Development", "Remix Culture"],
  },
  {
    slug: "the-loop",
    image: "/images/work/the-loop.webp",
    cover: { metric: "4 acts", caption: "playable now, 2027–2030: being the human in the loop" },
    name: "The Loop",
    tagline: "A story game about being the human in the loop as AI takes over work",
    published: true,
    category: "Game",
    status: "Playable",
    schemaType: "WebApplication",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    url: "https://sinadehesh.github.io/extention/",
    play: {
      src: "https://sinadehesh.github.io/extention/",
      device: "computer",
      note: "Made for a computer: play it on a laptop or desktop, with sound on.",
    },
    role: "Writer & game designer",
    organization: "Own product",
    summary:
      "The Loop is a story game in five acts, set between 2027 and 2030, about being the human in the loop. Your apartment fills the screen: the laptop where the work comes in, the phone, the fridge, the radiator and a rent day that keeps coming. You lose your job to an AI, train the AI, write election content for it and end up reviewing what it decides for the city, and every button you press makes sense at the time. Acts I to IV are playable in the browser, with 23 endings to find; Act V is planned.",
    impact: {
      problem: "Stories about AI and work are told from far away, so the small, reasonable decisions that add up are hard to feel.",
      mechanism:
        "Papers-Please-style daily queues of documents, gigs and agent reports where every scam has one tell, an economy of rent, RAM prices and internet bills that makes each shortcut tempting, and an apartment where every decision shows up at home: the heat, the fridge, the neighbours at the door.",
      stack: ["Narrative design", "In-game economy", "Marketing through streamers", "Readable pixel type"],
      outcome: "Acts I to IV playable in the browser, 23 endings, real recorded sound and a step-by-step tutorial; Act V planned.",
    },
    metrics: [
      { value: "4 of 5", label: "Acts playable, 2027–2030" },
      { value: "23", label: "Endings to find" },
      { value: "0", label: "Installs needed: it plays in any browser" },
    ],
    tradeoffs: [
      "Reading text is set in Atkinson Hyperlegible and the pixel font is kept for labels and numbers: atmosphere without hurting readability.",
      "It plays in any browser with nothing to install, so it runs anywhere and is easy to share.",
      "Fiction for adults about AI catastrophe, told through ordinary choices rather than spectacle.",
    ],
    decisionLog: [
      {
        challenge: "Moral choices in games often feel staged.",
        hypothesis: "Routine work, done one document at a time, makes small compromises feel real.",
        method: "A one-minute morning queue: read, spot the tell, accept or decline.",
        outcome: "Each day opens with a queue of mail, gigs, ratings and agent reports.",
      },
      {
        challenge: "Shortcuts need a reason to be tempting.",
        hypothesis: "Real money pressure makes automation and risk understandable.",
        method: "Rent, hardware prices that follow RAM, internet bills and freelance gigs.",
        outcome: "An economy where careful players can just make rent.",
      },
    ],
    featureList: [
      "Daily document queue",
      "Freelance and job sites inside the game",
      "Hardware, rent and price shocks",
      "Automation that hands work to agents, at a cost",
      "23 endings and a save you can continue",
      "Plays in the browser",
    ],
    keywords: ["Narrative Design", "Game Economy", "AI Fiction", "Systems Design", "Streamer Marketing"],
  },
  {
    slug: "gem-jar",
    image: "/images/work/gem-jar.webp",
    demo: [
      {
        src: "/videos/gem-jar-cosmic.mp4",
        poster: "/videos/gem-jar-cosmic.jpg",
        title: "Cosmic Gems",
        caption: "Drop two alike planets and they merge into a bigger one; chain merges for combos.",
        duration: "PT20S",
        uploaded: "2026-11-12",
      },
      {
        src: "/videos/gem-jar-sets.mp4",
        poster: "/videos/gem-jar-sets.jpg",
        title: "Every gem set",
        caption: "Rocks & Gems, Ocean Jewels, Royal Treasury, Volcano Gems, Pixel Treasure and more: each set gives the jar a new look.",
        duration: "PT25S",
        uploaded: "2026-11-12",
      },
    ],
    cover: { metric: "5", caption: "ways to play, from the Gem Mine to Gem Rush" },
    name: "Gem Jar",
    tagline: "A drop-and-merge jewel puzzle: make the Diamond before the jar fills",
    published: true,
    category: "Game",
    status: "Pre-launch",
    schemaType: "MobileApplication",
    applicationCategory: "GameApplication",
    operatingSystem: "Android, Web",
    url: "https://sinadehesh.github.io/Happy-Fruit-merge/gems/",
    play: { src: "https://sinadehesh.github.io/Happy-Fruit-merge/gems/", device: "phone" },
    role: "Game designer",
    organization: "Own product",
    summary:
      "Gem Jar is a physics merge puzzle: drop gems into a jar, merge two of a kind into a better one, and make the Diamond before the jar fills. The new version has five ways to play: the classic game, a Daily Challenge that is the same for everyone, the Gem Mine (60 stages, each with goals, a limited number of drops and stars to earn), Gem Rush against the clock, and Quests, three at a time with new ones every 8 hours. Players level up with XP and titles, open new gem sets and jar colours, and collect a Daily Gift that grows each day in a row.",
    impact: {
      problem: "Merge puzzles are easy to start but repetitive, so without a reason to return players drift away after a few rounds.",
      mechanism:
        "Reasons to come back on different time scales: Quests that refresh every 8 hours, a Daily Challenge, a Daily Gift that grows over seven days in a row, levels with XP and titles, and gem sets and jar colours to unlock. Combo praise (SWEET! JUICY! INCREDIBLE!) with sound and haptics makes each merge feel earned, and game feel comes from tuned gravity, heavier precious gems and new sound effects. Ads in the Android app are rewarded and optional: five more drops in the Gem Mine, 15 more seconds in Gem Rush, or double XP for 10 minutes.",
      stack: ["Game design", "Physics tuning: gravity and gem weight", "Retention loops: quests, daily gift, levels", "Rewarded, optional ads"],
      outcome: "Android release bundle and a complete Google Play listing; the new version, with all five ways to play, plays in the browser.",
    },
    metrics: [
      { value: "5", label: "Ways to play" },
      { value: "60", label: "Gem Mine stages with goals and stars" },
      { value: "8 h", label: "Until new quests arrive" },
    ],
    tradeoffs: [
      "Each gem's hitbox is its sprite's real outline, so gems rest where the art touches instead of overlapping.",
      "It shares an engine with Happy Fruit Merge and Zombie Bomber, so every improvement reaches all three games.",
      "Gems merge only after they land, so dropping fast can't game the board.",
      "Ads are rewarded and optional: the player chooses to watch one for more drops, more time or double XP, so an ad never breaks a run.",
    ],
    decisionLog: [
      {
        challenge: "Players need a reason to come back tomorrow.",
        hypothesis: "A shared daily goal and collections create a light habit.",
        method: "Date-seeded Daily Challenge, earned boosters and unlockable gem sets.",
        outcome: "Daily Challenge, Zap booster and gem sets to unlock.",
      },
      {
        challenge: "One way to play wears thin, even with a daily challenge.",
        hypothesis: "Goals on different time scales give players more reasons to return.",
        method: "A Gem Mine map of 60 stages, Gem Rush against the clock, Quests every 8 hours, levels with XP and titles, a Daily Gift streak and a Lucky Wheel.",
        outcome: "Five ways to play in the new version.",
      },
      {
        challenge: "Merges should feel rewarding, not mechanical.",
        hypothesis: "Layered feedback makes each combo feel earned.",
        method: "Bursts, praise words, a narrator, sound effects and haptics scaled to the merge.",
        outcome: "Combo feedback on every chain.",
      },
      {
        challenge: "The mechanic is extremely simple: drop gems and merge them into higher gems.",
        hypothesis: "Physics that matches each gem's value makes every merge more satisfying.",
        method: "Tuned the gravity, made the more precious gems heavier and changed the sound effects.",
        outcome: "Play became much more satisfying; together the changes made a big difference in how the game feels.",
      },
    ],
    featureList: ["Drop-and-merge physics", "Classic, Daily Challenge, Gem Mine, Gem Rush and Quests", "Levels with XP and titles", "Daily Gift and Lucky Wheel", "Gem sets and jar colours", "Sound, music and haptics", "Android and web"],
    keywords: ["Game Design", "Game Feel", "Retention Loops", "Daily Challenges", "Rewarded Ads"],
  },
  {
    slug: "zombie-bomber",
    image: "/images/work/zombie-bomber.webp",
    demo: [
      {
        src: "/videos/zombie-bomber-gameplay.mp4",
        poster: "/videos/zombie-bomber-gameplay.jpg",
        title: "Merge, then bomb",
        caption: "Merge bombs into bigger ones, drop them from the plane and hold the base, all the way to the Zombie King.",
        duration: "PT19S",
        uploaded: "2026-11-12",
      },
    ],
    cover: { metric: "300", caption: "levels of merge-and-bomb defence" },
    name: "Zombie Bomber",
    tagline: "Merge bombs, drop them on the horde, upgrade the base",
    published: true,
    category: "Game",
    status: "Live",
    schemaType: "WebApplication",
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    url: "https://sinadehesh.github.io/Happy-Fruit-merge/bomber/",
    play: { src: "https://sinadehesh.github.io/Happy-Fruit-merge/bomber/", device: "phone" },
    role: "Game designer",
    organization: "Own product",
    summary:
      "Zombie Bomber is a second game on the same drop-and-merge engine. Merge bombs from firecrackers up to bunker busters, switch to Bomb mode to drop them from a plane, and hold the base against 12 zombie types across 300 levels, spending coins on soldiers, weapons, base and bombs between levels.",
    impact: {
      problem: "Merge games rarely give the merging a purpose beyond the score.",
      mechanism:
        "Two modes tie merging to action — merge to build bigger bombs, then spend them to survive — and an upgrade shop after each level turns coins into visible progress.",
      stack: ["Game design", "Difficulty curve", "Upgrade economy", "Shared merge engine"],
      outcome: "Live in the browser with 300 levels, 12 zombie types and an upgrade shop; it is also one of the games in Pukytoon, which is in development.",
    },
    metrics: [
      { value: "300", label: "Levels" },
      { value: "12", label: "Zombie types" },
      { value: "4", label: "Upgrade tracks" },
    ],
    tradeoffs: [
      "Only the number, speed and crowding of zombies grow with the level, so difficulty stays readable.",
      "Bigger bombs blast much wider, so holding off a merge to build a big one is always a real choice.",
    ],
    decisionLog: [
      {
        challenge: "Merging alone gets repetitive.",
        hypothesis: "Giving merges a use creates tension between saving and spending.",
        method: "MERGE and BOMB modes you can switch any time.",
        outcome: "Merge to build, bomb to survive.",
      },
      {
        challenge: "Long level runs need visible progress.",
        hypothesis: "Choosing upgrades between levels keeps players invested.",
        method: "Coins from zombies spent on soldiers, weapons, base and bombs.",
        outcome: "An upgrade shop after every level.",
      },
    ],
    featureList: ["Merge and Bomb modes", "300 levels", "12 zombie types", "Upgrade shop", "Plays in the browser"],
    keywords: ["Game Design", "Progression Systems", "Difficulty Design", "Game Economy"],
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
      "I design habit loops from behavioral science, not guesswork: behavioral friction and loss framing that make costs salient, variable reward schedules that sustain engagement, and psychometric assessment that makes feedback feel personal.",
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
      "I run multi-round usability testing and interviews, code them thematically, prioritize with Kano and MoSCoW, and test a working prototype in days — so the build decision rests on evidence.",
    proof: [
      { slug: "recallmate", note: "interviews → MoSCoW → SM-2 + AI prototype" },
      { slug: "musicity", note: "market-fit interviews → go-to-market plan" },
    ],
  },
  {
    question: "Need someone who bridges research and product?",
    answer:
      "I take research from SPSS and ANOVA models and Figma wireframes to a tested product: an app, a game, a funnel or an n8n automation, with the measurement built in. One person, no hand-off loss.",
    proof: [
      { slug: "interview-simulation-study", note: "N = 96 experiment, p = .009" },
      { slug: "daily-sublime-automation", note: "n8n and Claude workflows with a human check" },
      { slug: "daily-hustle", note: "product with dashboards" },
    ],
  },
];

export const knowsAbout: { name: string; sameAs?: string }[] = [
  { name: "Consumer Psychology" },
  { name: "Behavioral Science", sameAs: "https://en.wikipedia.org/wiki/Behavioural_sciences" },
  { name: "Consumer Behavior", sameAs: "https://en.wikipedia.org/wiki/Consumer_behaviour" },
  { name: "UX Research", sameAs: "https://en.wikipedia.org/wiki/User_research" },
  { name: "Consumer Insights", sameAs: "https://en.wikipedia.org/wiki/Customer_insight" },
  { name: "Market Research", sameAs: "https://en.wikipedia.org/wiki/Market_research" },
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
  { name: "Jobs to Be Done" },
  { name: "Design of Experiments", sameAs: "https://en.wikipedia.org/wiki/Design_of_experiments" },
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
  { name: "Game Design", sameAs: "https://en.wikipedia.org/wiki/Game_design" },
  { name: "Gamification", sameAs: "https://en.wikipedia.org/wiki/Gamification" },
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
