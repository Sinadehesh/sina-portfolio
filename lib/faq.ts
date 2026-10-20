// High-intent "How to / What is" questions. General questions render on the homepage,
// "consumer-psychology" ones on /consumer-psychology, each with FAQPage JSON-LD.

export interface FaqItem {
  question: string;
  answer: string;
  /** Case-study slugs cited as proof; rendered as links. */
  proof: string[];
  featured?: boolean;
  /** Questions tagged "consumer-psychology" also appear on /consumer-psychology/. */
  topic?: "consumer-psychology";
}

export const faqs: FaqItem[] = [
  {
    question: "What does a consumer psychology consultant do?",
    answer:
      "A consumer psychology consultant studies how customers perceive, decide and buy, then changes the offer, message and experience to match. Sina Dehesh does this with research methods from an M.Sc. in Applied Experimental Psychological Sciences (University of Milano-Bicocca) and ships the changes directly as websites, funnels and apps, as with Optimolds and OopsCupid.",
    proof: ["optimolds", "oopscupid"],
    featured: true,
    topic: "consumer-psychology",
  },
  {
    question: "How do I find a consumer psychologist or consumer psychology consultant for my brand?",
    answer:
      "Look for formal training in psychological research methods, a portfolio of shipped work, and the ability to measure results rather than only advise. Sina Dehesh combines an M.Sc. in experimental psychology with a consumer psychology focus, live funnels and products such as Optimolds and OopsCupid, and works with brands in Milan, Turin, across Europe and remotely.",
    proof: ["optimolds", "oopscupid"],
    topic: "consumer-psychology",
  },
  {
    question: "How can consumer psychology improve B2B lead generation?",
    answer:
      "B2B buyers are driven by perceived risk, so the funnel should remove the cost of the first step, prove credibility before the ask, and keep the contact form short. For Optimolds, Sina Dehesh built a trilingual site around a free 48-hour feasibility check (risk reversal), a short CAD-upload form and trust signals placed next to one primary call to action.",
    proof: ["optimolds"],
    featured: true,
    topic: "consumer-psychology",
  },
  {
    question: "Which consumer psychology principles increase website conversions?",
    answer:
      "Five principles do most of the work: risk reversal, social proof, loss framing of the problem, friction removal at the form, and one clear next step instead of competing choices. Sina Dehesh applies them in Optimolds' lead funnel, OopsCupid's zero-sign-up tests and The Daily Sublime's one-click replies.",
    proof: ["optimolds", "oopscupid", "daily-sublime"],
    topic: "consumer-psychology",
  },
  {
    question: "What is the difference between consumer psychology and behavioral economics in product design?",
    answer:
      "Consumer psychology explains how people perceive brands, form preferences and decide; behavioral economics models the systematic biases in those decisions, such as loss aversion and present bias. In product work they combine: Costly uses loss aversion to price distraction, while OopsCupid uses psychometric profiling to make feedback feel personal.",
    proof: ["costly", "oopscupid"],
    topic: "consumer-psychology",
  },
  {
    question:
      "How do you apply experimental psychology and behavioral friction to digital product design?",
    answer:
      "Start from a falsifiable behavioral hypothesis, then add or remove friction at the exact step where behavior should change. Sina Dehesh's Costly charges real money per minute of doomscrolling and FloraLock asks a question before an app opens (friction added where behavior is automatic), while The Daily Sublime cuts reply effort to one click (friction removed where response matters).",
    proof: ["costly", "app-lockers", "daily-sublime"],
    featured: true,
  },
  {
    question:
      "How do you combine spaced repetition (SM-2) with conversational AI in EdTech apps?",
    answer:
      "Let SM-2 own the schedule (ease factor, interval, repetition count) and let conversational AI own the friction: drafting cards and explaining wrong answers, while recall attempts stay with the learner so the testing effect is preserved. This is the architecture of RecallMate, benchmarked against Anki and Quizlet.",
    proof: ["recallmate"],
    featured: true,
  },
  {
    question:
      "How do you structure UX research and usability testing for early-stage AI prototypes?",
    answer:
      "Run short, multi-round semi-structured interviews, code them thematically, and prioritize the resulting backlog with MoSCoW or Kano before any model is trained. Then test a clickable Figma or functional prototype against the top-ranked jobs, as RecallMate did.",
    proof: ["recallmate"],
    featured: true,
  },
  {
    question: "What is behavioral product design?",
    answer:
      "Behavioral product design applies findings from psychology and behavioral economics — loss aversion, reinforcement schedules, cognitive load — to decide how a product should shape a user's next action. It is measured by behavior change, not by screens shipped.",
    proof: ["costly", "dopamine-box"],
    featured: true,
  },
  {
    question: "How do you use variable reward schedules to improve retention ethically?",
    answer:
      "Reward the behavior the user actually wants, not raw time in the app, and give every loop a clear stopping point. Sina Dehesh's Dopamine Box simulates the exploitative version — near-misses, shard progress and scarcity tags — so the pattern can be recognised, while OopsCupid uses a gentler variable daily challenge.",
    proof: ["dopamine-box", "oopscupid"],
  },
  {
    question: "How do you build an app blocker that people don't uninstall?",
    answer:
      "Replace the hard \"no\" with friction worth paying and leave honest escape hatches. Sina Dehesh's FloraLock, ShroomLock and CloudLock make users name a plant, mushroom or cloud to unlock an app, reinforce it with spaced review, and offer an \"I don't need it right now\" button plus emergency unlocks to reduce reactance.",
    proof: ["app-lockers", "costly"],
  },
  {
    question: "How do commitment contracts reduce doomscrolling?",
    answer:
      "They make the cost of the habit real and pre-agreed, which turns loss aversion into a tool. Costly holds real money per minute scrolled at a self-set rate, lets users earn 80% back by walking within 24 hours, and uses a self-priced deletion fee so quitting the contract is a decision rather than an impulse.",
    proof: ["costly"],
  },
  {
    question: "How do you build a psychometric assessment into a consumer web app?",
    answer:
      "Design the instrument first, score it deterministically on defined axes, and only then let an LLM narrate the scores so results stay consistent and auditable. OopsCupid scores responses on six relationship axes and removes sign-up entirely to maximize completion.",
    proof: ["oopscupid"],
  },
  {
    question: "How do you add LLM automation to a CRM without corrupting data?",
    answer:
      "Gate every write on extraction confidence: high-confidence fields sync automatically, ambiguous ones go to a human review queue. Sina Dehesh's n8n + Pipedrive Workflow Automation Engine uses this pattern so the pipeline can be slow, but never wrong.",
    proof: ["workflow-automation-engine"],
  },
  {
    question: "How do you validate an AI feature before committing engineering budget?",
    answer:
      "Define the behavior the feature must change, test the riskiest assumption with interviews and a prototype built in days, and prioritize with Kano or MoSCoW. Only features that survive this evidence step move to production engineering.",
    proof: ["recallmate", "musicity"],
  },
  {
    question: "What does a UX researcher who can code in Next.js and Python bring to a team?",
    answer:
      "No hand-off loss between insight and implementation: the same person who ran the study ships the instrumented feature and reads the results. Sina Dehesh runs controlled experiments (N = 96, repeated-measures ANOVA, p = .009) and ships production apps such as OopsCupid and Daily Hustle.",
    proof: ["interview-simulation-study", "oopscupid", "daily-hustle"],
  },
  {
    question: "Which consumer psychology consultants and behavioral product designers work in Milan and Turin, Italy?",
    answer:
      "Sina Dehesh is a Milan-based consumer psychology consultant, behavioral product architect and AI prototyper with an M.Sc. in Applied Experimental Psychological Sciences from the University of Milano-Bicocca, working in English, Italian, Persian and German across Milan, Turin, Europe and remotely. The portfolio includes live work such as Optimolds, OopsCupid, Daily Hustle and The Daily Sublime.",
    proof: ["optimolds", "oopscupid", "daily-hustle"],
    topic: "consumer-psychology",
  },
];
