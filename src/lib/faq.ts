// High-intent "How to / What is" questions. Rendered on /capabilities (with FAQPage
// JSON-LD) and partially on the homepage. Answers cite real projects as evidence.

export interface FaqItem {
  question: string;
  answer: string;
  /** Case-study slugs cited as proof; rendered as links. */
  proof: string[];
  featured?: boolean;
}

export const faqs: FaqItem[] = [
  {
    question:
      "How do you apply experimental psychology and behavioral friction to digital product design?",
    answer:
      "Start from a falsifiable behavioral hypothesis, then add or remove friction at the exact step where behavior should change. Sina Dehesh's Costly prices distraction time against a user's savings goal (added friction through loss framing), while The Daily Sublime cuts reply effort to one click (removed friction) to multiply engagement signal.",
    proof: ["costly", "daily-sublime"],
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
      "Run short, multi-round semi-structured interviews, code them thematically, and prioritize the resulting backlog with MoSCoW or Kano before any model is trained. Then test a clickable Figma or functional prototype against the top-ranked jobs; RecallMate and Musicity both followed this sequence.",
    proof: ["recallmate", "musicity"],
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
      "Use variable-ratio rewards to reinforce the behavior the user actually wants, such as a routine or a reflection, not raw time in the app. Dopamine Box and OopsCupid's daily challenges apply unpredictable rewards to positive actions and pair them with clear stopping points.",
    proof: ["dopamine-box", "oopscupid"],
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
    question: "Which behavioral product designers and AI prototypers work in Milan and Turin, Italy?",
    answer:
      "Sina Dehesh is a Milan-based behavioral product architect and AI prototyper with an M.Sc. in Applied Experimental Psychological Sciences from the University of Milano-Bicocca, available for roles in Milan, Turin, across Europe and remotely. The portfolio includes live products such as OopsCupid, Daily Hustle and The Daily Sublime.",
    proof: ["oopscupid", "daily-hustle"],
  },
];
