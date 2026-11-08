---
{
  "title": "Designing AI Study Tools That Teach Instead of Doing the Homework",
  "description": "AI homework help without the cheating: how to design AI study tools that ask before answering, give hints first, require attempts and bring questions back.",
  "topic": "ai-education",
  "order": 4,
  "date": "2026-11-08",
  "keywords": ["AI homework help cheating", "AI study tool design", "how to stop students using AI to cheat", "AI study app", "Socratic AI tutor design"],
  "takeaways": [
    "An AI study tool teaches when the student does the thinking and the tool removes everything else; it cheats when the tool does the thinking.",
    "You can't police your way out of AI cheating. Design the tool so the easiest path through it is the one that builds memory.",
    "Run the homework-machine test: what does the student type first, can they get an answer without trying, and does anything come back tomorrow?",
    "Remove the friction of making study material and keep the effort of recalling it. That split was the core design rule in RecallMate."
  ],
  "faq": [
    {
      "q": "How do you stop students using AI to cheat?",
      "a": "In my view, policing output alone is a losing game, because a student who wants an answer can find another tool. Change what the study tool rewards instead: make its first reply a question, give hints before answers, ask students to show their reasoning, check recall at the end of a session and bring questions back days later. When the easiest path through the tool builds memory, there is less to cheat on."
    },
    {
      "q": "Is using AI for homework cheating?",
      "a": "It depends on who does the thinking, and on the rules of the class. Asking an AI to quiz you, explain a mistake after you have tried, or turn your notes into flashcards supports learning. Asking it for the answer you hand in replaces learning. In a field experiment by Bastani and colleagues, unrestricted GPT-4 access helped on practice problems, but students did worse once access was removed; a guardrailed tutor largely avoided the harm."
    },
    {
      "q": "What makes a good AI study tool?",
      "a": "A good AI study tool removes the effort that teaches nothing — formatting notes, building flashcards, deciding when to review — and keeps the effort that builds memory: recalling answers, explaining reasoning and returning to material over days. In practice that means a Socratic default, hints before answers, retrieval checks, spaced review of what the student asked, and honest visibility for teachers."
    },
    {
      "q": "Should teachers see students' AI study chats?",
      "a": "Teachers should see the learning process, not every word. A useful view summarizes attempts, hints used, topics that keep coming back and how the student did on later retrieval checks. Full transcripts invite surveillance and erode trust, and in my view a study tool that feels watched gets used less honestly. Tell students exactly what teachers can see before they start."
    }
  ],
  "related": ["testing-effect-ai-tutors", "illusion-of-understanding-ai-explanations", "eu-ai-act-education-high-risk"],
  "caseStudies": ["recallmate"]
}
---
AI study tools teach when the student does the thinking and the tool takes away everything else. They turn into homework machines when the tool does the thinking — and many drift that way, because answering is what a language model does by default.

That is a design choice, not a law of nature. Below is the evidence that guardrails matter, a five-question test you can run on any study tool, and the default patterns I'd build in.

## Why does AI homework help turn into cheating?

Because the shortest path wins. Fogg (2009) describes behavior as what happens when motivation, ability and a prompt meet. A deadline supplies the motivation and the prompt; the tool decides what is easiest. If the easiest action in your tool is "paste the question, copy the answer", that is what your tool is for, whatever the landing page says.

The evidence that design changes the outcome comes from Bastani and colleagues (2024–25), in a field experiment in Turkish high-school math classes. Unrestricted GPT-4 access improved performance on practice problems, but students did worse once access was removed. A tutor version with guardrails largely avoided the harm. What separated the two outcomes was the design around the model.

My view is that policing output alone is a losing game for a product team. A student who wants an answer will find a tool that gives one. What you control is what your own tool makes easy.

## The homework-machine test

Five questions I'd ask of any AI study tool, including your own:

1. **What does the student type first?** Their question, or their attempt?
2. **Can they get a final answer without trying?** If yes, expect that to become the main use.
3. **Does the tool know what the student got wrong, or only what they asked?**
4. **Does anything come back tomorrow?** A tool with no memory of yesterday can't use spacing.
5. **Can a teacher see how the work was done,** not just that it was done?

If your answers are "the question", "yes", "only what they asked", "no" and "no", you've built a homework machine — possibly a good one, but not a study tool. Each of those answers points to one of the patterns below.

## Six patterns that keep the student thinking

| Pattern | What the student does | What the tool does |
| --- | --- | --- |
| Socratic default | Answers a question about the problem | Opens with a question, not a solution |
| Hints before answers | Tries again with a nudge | Escalates hints one level at a time |
| Show your work | Writes out their reasoning | Responds to the reasoning, not just the question |
| Retrieval check | Answers a few questions with the chat hidden | Ends each session with a short quiz |
| Spaced review of what was asked | Meets today's questions again next week | Turns asked questions into review items |
| Visible process for teachers | Studies knowing what is shared | Summarizes attempts, hints and checks |

One rule sits above the table: keep an honest escape hatch. After a genuine attempt, a full worked solution should be one tap away. A tool that refuses everything doesn't create learning; it creates a tab switch.

Two of the patterns deserve more detail.

Spaced review of what was asked is the one I'd most like to see become standard. Every question a student asks is a free signal about what they don't know yet. Turn it into a review item, schedule it, and ask it back a few days later, when spacing does its work (Cepeda et al., 2006). What you asked today, you get asked next week.

Visible process for teachers should mean summaries, not surveillance: attempts made, hints used, topics that keep returning, results of the retrieval checks. Tell students exactly what is shared. And keep anything that infers how students feel from their faces or voices out of the product entirely: in educational institutions, the EU AI Act has prohibited emotion recognition since 2 February 2025, except for medical or safety reasons. I cover the rest in [the EU AI Act in education](/insights/eu-ai-act-education-high-risk). This is not legal advice.

## The effort ledger: what to remove, what to keep

The deeper principle is that study involves two kinds of effort, and a good tool treats them in opposite ways. Working memory is limited, and effort spent on the wrong things crowds out learning (Sweller, 1988). But some effort is the learning itself — what Bjork (1994) calls desirable difficulty.

| Effort | Remove or keep | Why |
| --- | --- | --- |
| Recalling an answer | Keep | Retrieval strengthens memory (Roediger & Karpicke, 2006) |
| Explaining your reasoning | Keep | It exposes gaps you didn't know you had (Rozenblit & Keil, 2002) |
| Returning to material over days | Keep | Distributed practice is rated high utility (Dunlosky et al., 2013) |
| Formatting notes and flashcards | Remove | Uses attention without building knowledge |
| Deciding when to review | Remove | A scheduler is more reliable than willpower |
| Hunting for the right material | Mostly remove | Search time isn't study time |

Many tools get this half right: they make the logistics effortless, then make the learning effortless too, because both look like friction on a dashboard.

## How RecallMate applied the rule

[RecallMate](/work/recallmate) is an AI-assisted learning app whose concept and UX research I led as a research intern at the University of Milano-Bicocca — a concept and Figma prototype, not a launched product. Benchmarking Anki and Quizlet made the problem concrete: Anki's scheduling is rigorous, but setup and card authoring are heavy; Quizlet is easy, but less rigorous about long-term scheduling. Multi-round interviews, coded thematically, and MoSCoW prioritization put AI-assisted card creation and conversational review at the top of the scope.

The rule that came out of it is the effort ledger in one line: remove the friction of making cards, keep the effort of recalling. The conversational AI drafts and explains cards; recall attempts stay the student's own, so the testing effect isn't outsourced to the model.

## What I'd change in an existing study tool on Monday

1. Turn the first reply to any pasted problem into a question.
2. Ask for an attempt before showing full solutions, with the solution one tap away afterwards.
3. Store the questions students ask and bring a few back the following week.
4. End sessions with a short retrieval check, chat hidden.
5. Replace satisfaction as the headline metric with delayed performance: how students do days later, without the tool.

For the tutoring conversation itself, I set out the ask-hint-explain-return loop in [why AI tutors should quiz you, not explain to you](/insights/testing-effect-ai-tutors). For why fluent answers leave students overconfident, see [AI explanations and the illusion of understanding](/insights/illusion-of-understanding-ai-explanations).

None of this makes a tool cheat-proof. It does something more useful: it makes learning the path of least resistance, so the students who use the tool as designed are the ones doing the thinking. That is the only kind of AI homework help I think is worth building.
