---
{
  "title": "AI Feedback on Student Writing, With the Teacher in the Loop",
  "description": "AI essay feedback that keeps the teacher in the loop: AI drafts formative comments, teachers approve them, and high-stakes grades stay human. A workflow.",
  "topic": "ai-education",
  "order": 8,
  "date": "2026-11-08",
  "keywords": ["AI essay feedback", "AI feedback student writing", "teacher in the loop AI grading", "AI formative feedback", "human in the loop grading"],
  "takeaways": [
    "Use AI to draft formative feedback on student writing, and keep the teacher as the person who decides what students see and what counts.",
    "Feedback changes learning when it is specific, actionable and timely. AI helps most with timely; teachers guard specific and correct.",
    "Evaluating learning outcomes is a high-risk use under the EU AI Act; I'd keep high-stakes grades with teachers and use AI only to draft feedback.",
    "Design against automation bias: teachers read the essay before seeing AI comments, and rejecting a comment takes one click."
  ],
  "faq": [
    {
      "q": "Can AI give feedback on student essays?",
      "a": "Yes, for formative feedback on drafts, as long as a teacher stays in charge. AI can be good at spotting patterns quickly — an unsupported claim, a paragraph that drifts, a missing counterargument — and at producing comments within minutes rather than days. It is weaker at knowing the student, the assignment's purpose and what matters most right now, which is why every comment should pass a teacher before students see it."
    },
    {
      "q": "Should AI grade student writing?",
      "a": "Not on its own for anything that counts. Evaluating learning outcomes is listed as a high-risk use in Annex III of the EU AI Act, with obligations including human oversight now applying from 2 December 2027, and GDPR Article 22 restricts decisions based solely on automated processing that produce legal or similarly significant effects. AI can surface evidence against a rubric; the teacher should decide the grade. This is not legal advice."
    },
    {
      "q": "What does teacher in the loop mean?",
      "a": "It means the AI proposes and the teacher decides, with the teacher's decision as the point where anything reaches a student or a gradebook. A real loop gives teachers the evidence behind each suggestion, the time to check it and a one-click way to reject it. A loop where teachers approve batches they never read is a rubber stamp, not oversight."
    },
    {
      "q": "How do you stop teachers rubber-stamping AI feedback?",
      "a": "Design the review so agreeing is not the only easy option. Let teachers read the essay before the AI's comments appear, anchor every comment to the sentence it is about, make rejecting or editing a comment a single click, and track how often teachers change suggestions. A teacher who accepts everything may be facing an excellent model or an impossible workload; either way, it is worth finding out which."
    }
  ],
  "related": ["eu-ai-act-education-high-risk", "automation-bias-human-review-design", "ai-study-tools-that-teach"],
  "caseStudies": ["workflow-automation-engine", "interview-simulation-study"]
}
---
AI feedback on student writing works when the AI drafts and the teacher decides. A model can read a draft in seconds and flag an unsupported claim or a paragraph that drifts; the teacher knows the student, the assignment and what matters this week. Put those two in the wrong order and you get generic feedback at scale, or grades nobody really checked.

I haven't built a grading product, and I won't pretend otherwise. What I have built is a shipped pipeline where an LLM extracts information and a human approves anything ambiguous before it is written anywhere. I've also run a controlled experiment showing that small interface choices change how people behave. Both transfer to the classroom. Here is the workflow I'd design.

## What makes feedback change learning?

I check every piece of feedback against three questions — call it the three-question feedback test:

1. **Is it specific?** Does it point at a sentence, not at "the essay"?
2. **Is it actionable?** Does it say what to try next, rather than only what went wrong?
3. **Is it timely?** Will the student see it while they can still revise?

AI is strongest on the third: a draft comment can exist minutes after submission instead of a week later. Teachers are strongest on the first two, plus the one thing AI can't reliably check on its own — whether the comment is right for this student. A good workflow gives each side the job it does best.

There is a fourth rule specific to AI: feedback should point and ask, never rewrite. A model that rewrites a weak paragraph has done the student's thinking for them — the same trap I describe in [designing AI study tools that teach](/insights/ai-study-tools-that-teach). "This claim needs evidence: what source could support it?" teaches. A polished replacement paragraph doesn't.

## The three-lane feedback queue

My [Workflow Automation Engine](/work/workflow-automation-engine) writes deal data from sales calls and email threads into Pipedrive. An LLM extracts the fields, and a confidence gate sits on every write path: high-confidence extractions sync, ambiguous ones wait for a human. Its invariant is "the pipeline may be slow, never wrong", and no ambiguous write happens without human approval.

Student feedback needs the same shape, with one difference: in a classroom, every comment passes a teacher. The gate decides how much attention a comment needs, not whether it gets reviewed.

| Lane | What goes in | Who decides | What the student sees |
| --- | --- | --- | --- |
| 1. Formative | Comments on drafts and low-stakes work | The teacher approves in a batch, editing or deleting freely | Approved comments, labeled as AI-drafted and teacher-approved |
| 2. Graded | Anything that touches a grade or rubric score | The teacher, always; the AI may surface evidence, never a score | The teacher's grade and comments |
| 3. Flagged | Possible plagiarism, sensitive content, comments the system is unsure of | The teacher, with no AI verdict shown | Nothing until the teacher acts |

Lane three is where the confidence gate earns its keep. A comment the system is unsure about shouldn't arrive looking as confident as the rest; it should arrive marked as a question for the teacher.

## Why should high-stakes grading stay human?

There is a design reason and a legal one. The design reason is that a grade is a judgment about a person, and the person deserves a judge who can be asked why.

The legal context points the same way. Under the EU AI Act (Regulation (EU) 2024/1689), AI used to evaluate learning outcomes, including when that evaluation steers the learning process, is a high-risk use listed in Annex III. Those obligations, which include human oversight under Article 14, now apply from 2 December 2027, after the Digital Omnibus (Regulation (EU) 2026/1744) moved them. Separately, GDPR Article 22 gives people a right not to be subject to decisions based solely on automated processing that produce legal or similarly significant effects, and EDPB and Article 29 Working Party guidance on automated decision-making says human involvement must be meaningful, not a token gesture. A teacher clicking "approve all" on a stack of AI-suggested grades is the token gesture. I cover the wider rules in [the EU AI Act in education](/insights/eu-ai-act-education-high-risk). This is a builder's reading, not legal advice.

## How do you stop teachers rubber-stamping AI?

Automation bias is the tendency to over-rely on automated aids. Skitka, Mosier and Burdick (1999) described two forms: errors of omission, when people miss problems the system didn't flag, and errors of commission, when they follow its wrong advice. Parasuraman and Manzey (2010) found these effects in experts as well as novices, so experience alone won't protect a teacher working through a full queue late at night. The goal is what Lee and See (2004) call appropriate reliance: trusting the system as much as it deserves, and no more.

Design moves that help:

- **Read first, then reveal.** The teacher reads the essay, or at least its argument, before the AI's comments appear. A first impression formed without the machine is one of the simplest defenses against simply following it.
- **Evidence, not verdicts.** Every comment is anchored to the sentence it's about, so checking it takes seconds.
- **Make disagreement cheap.** Delete or edit in one click; never make "accept" the only fast option.
- **Track the edit rate.** If a teacher never changes anything, find out whether the model is excellent or the workload is impossible.
- **Keep queues short.** Ten essays reviewed properly beat a hundred approved blind.

I go deeper on review-queue design in [why reviewers rubber-stamp AI](/insights/automation-bias-human-review-design).

## Why the review screen matters as much as the model

My M.Sc. thesis was a controlled experiment on automated interview simulation: 96 participants, a within-subjects design and a repeated-measures ANOVA. Candidates were significantly more expressive when they could see themselves (M = 4.18) than with no visual feedback (M = 3.41), p = .009. The [interview simulation study](/work/interview-simulation-study) was about candidates, not teachers, but the lesson travels: what an interface shows people changes what they do.

Applied to feedback review, my working hypothesis is that showing the AI's suggestion before the teacher has formed a view pulls the teacher toward it, and that a suggested score pulls harder than a suggested comment. Those are hypotheses, not findings. They are also cheap to test with a within-subjects design, the same approach I used in my thesis, because each teacher can review under both conditions.

## What does the workflow look like in practice?

Imagine a teacher with a class set of argumentative essay drafts:

1. Students submit their drafts.
2. The AI drafts up to three comments per essay against the teacher's rubric, each anchored to a sentence and phrased as a question or a next step, never as a rewrite.
3. Comments the system is unsure of go to the flagged lane.
4. The teacher reviews the batch: reads each essay's argument, then accepts, edits or deletes each comment.
5. Students receive the approved comments while they still have time to revise, labeled as AI-drafted and teacher-approved.
6. The teacher grades the final essay. The AI can point to rubric evidence; it doesn't propose a score.
7. Every teacher edit is logged. That log is the best evaluation data you will ever have for the AI.

If you're starting out, start small: one assignment, formative feedback only, one class. Measure two things — how long review takes and how often teachers change the AI's comments — and ask students whether the feedback helped them revise. One cycle like that will teach you more than any demo, and it keeps the teacher where they belong: deciding.
