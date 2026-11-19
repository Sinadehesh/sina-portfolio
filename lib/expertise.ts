import type { FaqItem } from "./faq";

/**
 * Expertise pages: one landing page per name people search for the same kind of work —
 * behavioral scientist, consumer behavior expert, UX researcher, market insights — each at
 * /<slug>, rendered by components/expertise/ExpertisePage.tsx with Service, FAQPage and
 * BreadcrumbList JSON-LD. /consumer-psychology is the original pillar page and keeps its own
 * route. Every claim here must match lib/content.ts: Sina is a behavioral scientist and
 * consumer psychology consultant, never a psychologist, with no programming claims.
 */

export interface Expertise {
  slug: string;
  path: string;
  /** Short name for links and breadcrumbs. */
  name: string;
  /** One line for the "related expertise" strip. */
  blurb: string;
  eyebrow: string;
  h1: string;
  /** <title>; the layout does not append the site name. */
  metaTitle: string;
  /** Meta description, 120–160 characters. */
  description: string;
  /** Lede under the H1, also the Service description. */
  summary: string;
  serviceName: string;
  hue: string;
  services: { name: string; description: string }[];
  servicesTitle: string;
  servicesLede: string;
  methods: { name: string; question: string; proof: string[] }[];
  methodsTitle: string;
  compare: { title: string; lede?: string; columns: string[]; rows: string[][]; note?: string };
  /** Case-study slugs shown as proof. */
  proof: string[];
  proofTitle: string;
  /** Article slugs, in order; missing ones are skipped. */
  articles: string[];
  writingTitle: string;
  faqTitle: string;
  faqs: FaqItem[];
}

export const consumerPsychologyLink = {
  path: "/consumer-psychology",
  name: "Consumer psychology consulting",
  blurb: "Funnel psychology audits, B2B lead generation, pricing and offer psychology.",
};

export const expertise: Expertise[] = [
  {
    slug: "behavioral-science",
    path: "/behavioral-science",
    name: "Behavioral science",
    blurb: "Behavioral audits, experiments, choice architecture and habit design.",
    eyebrow: "Behavioral science",
    h1: "Behavioral scientist in Milan, Italy",
    metaTitle: "Behavioral Scientist in Milan, Italy — Sina Dehesh",
    description:
      "Behavioral scientist in Milan: behavioral audits, experiments, choice architecture and habit design for websites, apps and games, tested with real people.",
    summary:
      "I’m Sina Dehesh, a behavioral scientist in Milan. I study what people actually do, not what they say they will do, and design the change that makes the right behavior easier, in a website, a funnel, an app or a game. Then I test it with real people and measure whether behavior moved. I trained in experimental psychology at the University of Milano-Bicocca (M.Sc.), and my thesis was a controlled experiment with 96 participants.",
    serviceName: "Behavioral science consulting",
    hue: "#6a86b0",
    servicesTitle: "What does a behavioral scientist do for your product?",
    servicesLede: "Six kinds of work, from a one-off behavioral audit to designing and testing the change.",
    services: [
      {
        name: "Behavioral audit",
        description:
          "I take one behavior you care about, such as finishing sign-up, coming back on day two or paying on time, walk it step by step, and name what stops it at each step: capability, opportunity or motivation. You get the barriers ranked by how early they sit and how cheap they are to remove.",
      },
      {
        name: "Experiments that show cause",
        description:
          "A/B tests, within-subjects designs and field tests, planned before the data comes in so a result means something, and analyzed with the right statistics, from repeated-measures ANOVA to logistic regression.",
      },
      {
        name: "Choice architecture and nudges",
        description:
          "Defaults, ordering, framing and friction, designed around the decision you want to make easier. I treat every nudge as a hypothesis: effects in practice are usually smaller than in published studies, so we test before rolling out.",
      },
      {
        name: "Habit and retention design",
        description:
          "Implementation intentions, visible progress and rewards that fit the activity, so people come back because the product is worth it, not because leaving feels like a loss.",
      },
      {
        name: "Ethical review of persuasive design",
        description:
          "A check of your flows for dark patterns and pressure tactics, with a fairer version for each. A trick that lifts a metric this month tends to cost trust later.",
      },
      {
        name: "Behavioral design for apps and games",
        description:
          "Reward schedules, difficulty, friction and feedback for products people choose to use, which is how I design and test my own apps and games.",
      },
    ],
    methodsTitle: "Which behavioral science methods do I use, and where?",
    methods: [
      { name: "Controlled experiment", question: "Did this change cause the behavior?", proof: ["interview-simulation-study"] },
      { name: "Field test with real users", question: "Does it still work outside the lab?", proof: ["passway"] },
      { name: "Friction design", question: "Where should the path be harder, and where easier?", proof: ["app-lockers", "costly"] },
      { name: "Commitment devices", question: "How do people keep a promise to their future self?", proof: ["costly"] },
      { name: "Choice architecture", question: "What do people pick when they don’t stop to think?", proof: ["optimolds", "app-lockers"] },
      { name: "Behavioral experiment on risk", question: "How far do real bets drift from the optimal stake, and why?", proof: ["dopamine-box"] },
    ],
    compare: {
      title: "Behavioral science, behavioral economics, psychology: what’s the difference?",
      columns: ["Field", "What it studies", "What it’s good for"],
      rows: [
        [
          "Behavioral science",
          "Behavior itself, drawing on psychology, economics, sociology and neighboring fields",
          "Designing and testing changes in what people do",
        ],
        [
          "Behavioral economics",
          "Predictable departures from “rational” choice, such as loss aversion, present bias and the pull of defaults",
          "Pricing, defaults, saving, paying and commitment",
        ],
        [
          "Consumer psychology",
          "How people perceive, choose, buy and use products",
          "Offers, funnels, brands and products",
        ],
        [
          "Psychology",
          "The mind and behavior, from perception and memory to emotion and personality",
          "The mechanisms underneath all of the above",
        ],
      ],
      note: "In Italy, “psychologist” is a protected title for members of the Ordine degli Psicologi, so I describe myself as a behavioral scientist. My work is on decisions and products, not therapy.",
    },
    proofTitle: "Behavioral science in practice",
    proof: ["interview-simulation-study", "app-lockers", "costly", "passway"],
    writingTitle: "Articles on behavioral science",
    articles: [
      "what-does-a-behavioral-scientist-do",
      "behavior-expert-behavioral-scientist-consumer-psychologist",
      "do-nudges-work-evidence-for-product-teams",
      "within-subjects-ux-experiments",
      "persuasion-or-dark-pattern-test",
      "engagement-vs-addiction-healthy-engagement",
    ],
    faqTitle: "Behavioral science: questions",
    faqs: [
      {
        question: "What does a behavioral scientist do?",
        answer:
          "A behavioral scientist studies why people do what they do, designs changes that make a target behavior easier, and tests whether the change worked. In companies that usually means behavioral audits of a product or funnel, experiments, and choice architecture: defaults, framing, friction and feedback. I do this for websites, funnels, apps and games, and I measure the result with real people.",
        proof: ["interview-simulation-study", "app-lockers"],
      },
      {
        question: "Is a behavioral scientist the same as a psychologist?",
        answer:
          "No. Behavioral science draws on psychology, behavioral economics and other fields, and it is not a regulated title. In Italy, “psychologist” is a protected title for members of the Ordine degli Psicologi, so I describe myself as a behavioral scientist. I hold an M.Sc. in Applied Experimental Psychological Sciences from the University of Milano-Bicocca, and my work is on decisions and products, not therapy.",
        proof: ["interview-simulation-study"],
      },
      {
        question: "When should a company hire a behavioral scientist?",
        answer:
          "When the problem is a behavior rather than a feature: people sign up and don’t come back, start a form and don’t finish, or say they want something and don’t buy it. Also before a big bet, when you need a test that can tell you you’re wrong. If the product doesn’t do what it promises, fix that first; no nudge will.",
        proof: ["optimolds", "oopscupid"],
      },
      {
        question: "Do nudges really work?",
        answer:
          "Some do, and usually less than the headlines suggest. A study of nudge units’ own trials found real but much smaller effects than the published academic studies (DellaVigna and Linos, 2022). So I treat every nudge as a hypothesis, design it for your users and test it before it is rolled out.",
        proof: [],
      },
      {
        question: "Do you work with teams outside Milan?",
        answer:
          "Yes. I’m based in Milan and work with teams in Milan, Turin, across Europe and remotely, in English, Italian, Persian and German. Audits, interviews, experiments and analysis all run well online; being in the same room helps most for workshops and for watching people use a product where they really use it.",
        proof: [],
      },
    ],
  },
  {
    slug: "consumer-behavior",
    path: "/consumer-behavior",
    name: "Consumer behavior",
    blurb: "Why customers buy, hesitate, switch or stay, and what to change.",
    eyebrow: "Consumer behavior expertise",
    h1: "Consumer behavior consultant in Milan, Italy",
    metaTitle: "Consumer Behavior Expert & Consultant in Milan — Sina Dehesh",
    description:
      "Consumer behavior expert in Milan: why customers buy, hesitate, switch or stay, researched with real people and turned into offers, funnels and products.",
    summary:
      "I’m Sina Dehesh, a behavioral scientist and consumer behavior consultant in Milan. When a company looks for a consumer behavior expert, the question is usually easy to ask and hard to answer: why do people buy, hesitate, switch or stay? I find out with interviews, data and experiments, then change the offer, the funnel or the product around what customers actually do, and measure it.",
    serviceName: "Consumer behavior consulting",
    hue: "#5f8f86",
    servicesTitle: "What can a consumer behavior consultant find out for you?",
    servicesLede: "Five pieces of work, each ending in a decision rather than a report.",
    services: [
      {
        name: "Purchase-journey research",
        description:
          "Interviews and analytics that reconstruct how customers really chose you or a competitor: the trigger, the options they weighed, the doubts and the moment they decided.",
      },
      {
        name: "Drop-off and churn research",
        description:
          "Exit questions, conversations with people who nearly bought or left, and the data on what they did, to separate the reasons people give from the patterns in their behavior.",
      },
      {
        name: "Segmentation by need",
        description:
          "Segments built on the job customers hire you for, not only on age or industry, so you know which group to win first and what to say to it.",
      },
      {
        name: "Offer and pricing behavior",
        description:
          "How people read your prices, plans and guarantees: anchors, defaults, bundles and risk reversal, designed and tested on your buyers.",
      },
      {
        name: "Behavior-led funnel redesign",
        description:
          "A funnel redesigned around the barrier the research confirmed, whether uncertainty, low trust, effort or perceived risk, with the change measured against the old version.",
      },
    ],
    methodsTitle: "Which consumer behavior questions have I answered, and how?",
    methods: [
      { name: "Jobs-to-be-done interviews across segments", question: "Which customers should we win first?", proof: ["musicity"] },
      { name: "Buyer-risk analysis of a B2B funnel", question: "Why do buyers hesitate before contacting a supplier?", proof: ["optimolds"] },
      { name: "Removing sign-up before the first result", question: "What makes people finish a test instead of leaving at a form?", proof: ["oopscupid"] },
      { name: "A borrowed interaction, tested with users", question: "Why don’t people enter the data a product needs?", proof: ["passway"] },
      { name: "Interviews, benchmarking and usability tests", question: "What do learners really do with study tools?", proof: ["recallmate"] },
    ],
    compare: {
      title: "Consumer behavior, consumer psychology, market research: how do they differ?",
      columns: ["Field", "The core question", "Typical methods"],
      rows: [
        [
          "Consumer behavior",
          "What do people buy, use and drop, when, and under which influences?",
          "Purchase and usage data, observation, journeys, interviews",
        ],
        [
          "Consumer psychology",
          "Why do people decide the way they do?",
          "Experiments, psychometric scales, theory of perception, memory, motivation and emotion",
        ],
        [
          "Market research",
          "Who is in the market, how big is it, and what do they think?",
          "Surveys, panels, sizing, segmentation and tracking",
        ],
      ],
      note: "In practice the three overlap, and most real questions need more than one. I start from the decision a customer has to make.",
    },
    proofTitle: "Consumer behavior in practice",
    proof: ["optimolds", "musicity", "oopscupid", "recallmate"],
    writingTitle: "Articles on consumer behavior",
    articles: [
      "what-is-consumer-behavior",
      "behavior-expert-behavioral-scientist-consumer-psychologist",
      "four-gates-why-customers-hesitate",
      "what-is-consumer-psychology",
      "online-consumer-psychology-what-still-holds",
      "trust-signals-unknown-brand",
    ],
    faqTitle: "Consumer behavior consulting: questions",
    faqs: [
      {
        question: "What does a consumer behavior expert do?",
        answer:
          "A consumer behavior expert studies how people choose, buy, use and abandon products, and turns that into business decisions: which segment to serve, what to offer, how to price it and where the funnel loses people. In my work that means interviews and data to find the real pattern, then a changed offer or flow, tested with real customers.",
        proof: ["musicity", "optimolds"],
      },
      {
        question: "What is the difference between consumer behavior and consumer psychology?",
        answer:
          "Consumer behavior is the broader field: what people buy and use, how they decide, and the social, cultural and economic forces around them. Consumer psychology focuses on the mental side: perception, memory, motivation, emotion and judgment. Most real questions need both. The behavior shows where people stop; the psychology suggests why.",
        proof: ["optimolds"],
      },
      {
        question: "How can a small company research consumer behavior on a budget?",
        answer:
          "Start close to the decision: a handful of interviews with recent buyers and with people who nearly bought, one question on the page where people drop off, and the analytics you already have. That is often enough to find the main barrier. Then test one change, instead of commissioning a large survey before you know what to ask.",
        proof: ["musicity"],
      },
      {
        question: "Can you work with my team remotely?",
        answer:
          "Yes. I’m based in Milan and work with teams in Milan, Turin, across Europe and remotely, in English, Italian, Persian and German. Interviews, analysis and design work run well online. For buyers across Europe, language matters: the Optimolds site runs in English, Italian and German because buyers judge a supplier in their own language.",
        proof: ["optimolds"],
      },
    ],
  },
  {
    slug: "ux-research",
    path: "/ux-research",
    name: "UX research",
    blurb: "Interviews, usability tests and experiments with your users.",
    eyebrow: "UX research",
    h1: "UX researcher in Milan, Italy",
    metaTitle: "UX Researcher in Milan, Italy — Sina Dehesh",
    description:
      "UX researcher in Milan: interviews, usability tests and controlled experiments that show what users do and why, turned into tested product decisions.",
    summary:
      "I’m Sina Dehesh, a UX researcher and behavioral scientist in Milan. I run the research that tells a team what users actually do and why: interviews, usability tests, surveys and controlled experiments. I’ve run more than 240 interviews and usability tests and a within-subjects experiment with 96 participants, and I turn what I find into decisions the team can test.",
    serviceName: "UX research",
    hue: "#8a78b0",
    servicesTitle: "What UX research can I run for your team?",
    servicesLede: "From a first round of interviews to an experiment that settles an argument.",
    services: [
      {
        name: "User interviews",
        description:
          "Semi-structured interviews with real or prospective users, coded with thematic analysis into needs, pains and the words people use, so the team stops arguing from opinion.",
      },
      {
        name: "Usability testing",
        description:
          "Moderated tests of a live product or a Figma prototype, with tasks built around what users came to do. Every problem comes with how often it appeared, how much it hurt and a suggested fix.",
      },
      {
        name: "Quantitative UX research",
        description:
          "Surveys, psychometric scales and experiments, analyzed with the right statistics, from repeated-measures ANOVA to logistic regression, so a difference is a real difference.",
      },
      {
        name: "Concept and prototype testing",
        description:
          "Early ideas tested with users before a team commits to them, from sketches to clickable prototypes, to find out whether the idea solves a problem people actually have.",
      },
      {
        name: "Research-led prioritization",
        description:
          "Findings turned into a ranked list of changes with Kano or MoSCoW, so research changes the roadmap instead of sitting in a slide deck.",
      },
    ],
    methodsTitle: "Which UX research methods do I use, and when?",
    methods: [
      { name: "Multi-round interviews with thematic coding", question: "What do users need, in their own words?", proof: ["recallmate"] },
      { name: "Usability tests and pilot studies", question: "Where do people get stuck?", proof: ["recallmate"] },
      { name: "Within-subjects experiment (N = 96)", question: "Does what people see on screen change how they behave?", proof: ["interview-simulation-study"] },
      { name: "Field test of a new interaction", question: "Will users actually do it more, and enjoy it?", proof: ["passway"] },
      { name: "Competitive benchmarking", question: "What do the alternatives do better, and where is the gap?", proof: ["recallmate"] },
      { name: "A testable hypothesis for each design change", question: "Does a short game before a long test raise completion?", proof: ["oopscupid"] },
    ],
    compare: {
      title: "UX research or market research: which one do you need?",
      columns: ["", "UX research", "Market research"],
      rows: [
        ["Core question", "Can people use it, and does it fit their lives?", "Who will buy, how many, and at what price?"],
        ["Unit of study", "A person trying to get something done", "A market, a segment or a brand"],
        ["Typical methods", "Interviews, usability tests, experiments, analytics", "Surveys, panels, sizing, segmentation, tracking"],
        ["What it changes", "Flows, features and the product roadmap", "Positioning, pricing and go-to-market"],
      ],
      note: "Many questions sit in between, such as why people try a product once and never return. That is where I work most: user research with a behavioral lens.",
    },
    proofTitle: "UX research in practice",
    proof: ["recallmate", "interview-simulation-study", "passway", "oopscupid"],
    writingTitle: "Articles on UX research",
    articles: [
      "what-does-a-ux-researcher-do",
      "within-subjects-ux-experiments",
      "llm-assisted-thematic-analysis",
      "interviews-and-logistic-regression",
      "kano-vs-moscow-ai-features",
      "ai-interview-self-view-experiment",
    ],
    faqTitle: "UX research: questions",
    faqs: [
      {
        question: "What does a UX researcher do?",
        answer:
          "A UX researcher finds out what users need, what they actually do and where a product fails them, using interviews, usability tests, surveys, analytics and experiments, and turns the findings into decisions a team can act on. I run the whole cycle: plan the study, recruit participants, run the sessions, analyze them and help decide what changes first.",
        proof: ["recallmate"],
      },
      {
        question: "How many users do you need for a usability test?",
        answer:
          "It depends on the question. To find problems in one round of qualitative testing, a small group of around five users usually surfaces most of the big issues, which is why several small rounds beat one large one (Nielsen, 2000). To measure a difference, such as whether design A beats design B, you need many more participants and a sample size worked out in advance.",
        proof: ["interview-simulation-study"],
      },
      {
        question: "What is the difference between a UX researcher and a UX designer?",
        answer:
          "A UX researcher studies users and tests ideas; a UX designer designs the flows and the interface. The roles work closely and overlap. I’m a researcher and behavioral scientist: I plan and run the research and design the behavior change, and I work with designers and engineers who own the interface and the code.",
        proof: ["recallmate", "passway"],
      },
      {
        question: "Can UX research be done remotely?",
        answer:
          "Yes. Interviews and moderated usability tests work well remotely, with screen sharing and recordings, and I run them in English, Italian, Persian or German. In-person sessions in Milan help when context matters, for example when you need to watch someone use a product where they really use it.",
        proof: [],
      },
    ],
  },
  {
    slug: "market-insights",
    path: "/market-insights",
    name: "Market & consumer insights",
    blurb: "Which customers to win first, what they want and how to position.",
    eyebrow: "Market & consumer insights",
    h1: "Market insights consultant in Milan, Italy",
    metaTitle: "Market & Consumer Insights Consultant in Milan — Sina Dehesh",
    description:
      "Market and consumer insights in Milan: interviews, jobs-to-be-done and benchmarking that show which customers to win first and how to position for them.",
    summary:
      "I’m Sina Dehesh, a behavioral scientist and market insights consultant in Milan. Data tells you what happened; an insight tells you why, and what to do about it. I find insights with interviews, jobs-to-be-done analysis, surveys and competitive benchmarking, and turn them into go-to-market decisions: which customers to win first, what to promise them and how to reach them.",
    serviceName: "Market and consumer insights",
    hue: "#9a6aa0",
    servicesTitle: "What market and consumer insight work do I do?",
    servicesLede: "Small, fast studies chosen for the decision you need to make.",
    services: [
      {
        name: "Market-fit assessment",
        description:
          "Interviews across your possible segments, coded into a ranked view of where demand is strongest and why, before you spend on a launch.",
      },
      {
        name: "Consumer insight research",
        description:
          "Interviews, surveys and behavioral data combined to find the tension behind a behavior: what people want, what stops them and what they do instead.",
      },
      {
        name: "Jobs-to-be-done analysis",
        description:
          "The progress customers are trying to make, what they hire today to make it, and where your offer fits, written so a team can act on it.",
      },
      {
        name: "Competitive benchmarking",
        description:
          "How the alternatives solve the same job, where they fall short, and which gap is worth owning.",
      },
      {
        name: "Go-to-market sequencing",
        description:
          "Which segment to win first, how to position for it and the launch order, with the evidence behind each choice.",
      },
    ],
    methodsTitle: "Which methods turn data into insight?",
    methods: [
      { name: "Segment interviews coded into jobs to be done", question: "Which customers want this most, and why?", proof: ["musicity"] },
      { name: "Benchmarking against Anki and Quizlet", question: "What do the alternatives miss?", proof: ["recallmate"] },
      { name: "Buyer-risk analysis", question: "What is the buyer afraid of losing?", proof: ["optimolds"] },
      { name: "A pre-launch study plan", question: "How will we know it works before scaling it?", proof: ["costly"] },
    ],
    compare: {
      title: "Data, findings and insights: what’s the difference?",
      lede: "A hypothetical pricing page shows the three levels.",
      columns: ["Level", "What it is", "Example"],
      rows: [
        ["Data", "A fact about what happened", "Most visitors leave on the pricing page."],
        ["Finding", "A pattern, with evidence", "Visitors who leave say they couldn’t tell which plan fits them."],
        [
          "Insight",
          "The why, and what to do about it",
          "Buyers fear picking the wrong plan more than paying too much, so one recommended plan and an easy switch should do more than a discount.",
        ],
      ],
      note: "An insight is still a hypothesis until a test supports it. The last step is always to check it against what people do.",
    },
    proofTitle: "Market insights in practice",
    proof: ["musicity", "recallmate", "optimolds", "costly"],
    writingTitle: "Articles on market and consumer insights",
    articles: [
      "what-are-market-insights",
      "jobs-to-be-done-market-fit-interviews",
      "what-is-a-consumer-consultant",
      "interviews-and-logistic-regression",
      "seven-sins-of-consumer-psychology-pham",
      "what-makes-a-good-consultant-research",
    ],
    faqTitle: "Market and consumer insights: questions",
    faqs: [
      {
        question: "What are market insights?",
        answer:
          "Market insights are conclusions about customers or a market that explain why something happens and suggest what to do about it. Data says what happened, research findings describe patterns, and an insight connects them to a decision, such as which segment to win first or what to promise. A good insight is specific, backed by evidence and changes what a team does next.",
        proof: ["musicity"],
      },
      {
        question: "How is a market insights consultant different from a market research agency?",
        answer:
          "An agency usually runs large studies, such as surveys, panels and tracking, and delivers the data and findings. A market insights consultant works closer to the decision: smaller studies chosen for the question, an interpretation and a recommendation. For a national market sizing, hire an agency; for “which customers first, and why”, a consultant is often faster.",
        proof: ["musicity"],
      },
      {
        question: "What does a market-fit assessment include?",
        answer:
          "Interviews with people from each possible segment, coded into a ranked view of the job each one would hire the product for, how strong the need is and what they use today; a comparison with the alternatives; and a recommendation on which segment to win first, how to position for it and the order of the launch.",
        proof: ["musicity", "recallmate"],
      },
      {
        question: "Do you work with companies in Italy and across Europe?",
        answer:
          "Yes. I’m based in Milan and work with companies in Milan, Turin, across Italy and Europe, and remotely, in English, Italian, Persian and German. I’ve designed for buyers in three languages: the Optimolds website runs in English, Italian and German.",
        proof: ["optimolds"],
      },
    ],
  },
];

export const getExpertise = (slug: string) => expertise.find((e) => e.slug === slug);
