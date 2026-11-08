---
{
  "title": "Kano or MoSCoW? Prioritizing AI Features When Everything Looks Magical",
  "description": "Kano vs MoSCoW for AI products: what each feature prioritization framework answers, why AI features drift between Kano categories, and how to combine both.",
  "topic": "research",
  "order": 5,
  "date": "2026-11-08",
  "keywords": ["Kano vs MoSCoW", "Kano model AI features", "feature prioritization framework AI product", "MoSCoW prioritization", "Kano model survey", "AI feature prioritization"],
  "takeaways": [
    "Kano tells you how customers will feel about a feature; MoSCoW tells you what a release commits to. Use Kano to listen and MoSCoW to commit.",
    "AI features often test as delighters because they're new, then drift toward expected or indifferent once users get used to them or watch them fail.",
    "Ask the Kano pair twice for AI features: once describing the feature working perfectly, once describing it as usually right and sometimes wrong.",
    "Map Kano categories to MoSCoW as a starting point, not a formula. Cost, risk and the core job still decide what makes the release."
  ],
  "faq": [
    {
      "q": "What is the difference between Kano and MoSCoW?",
      "a": "The Kano model classifies features by how their presence or absence affects satisfaction: must-be, performance, attractive, indifferent or reverse. MoSCoW sorts a release's scope into must have, should have, could have and won't have this time. Kano is a research method about perception; MoSCoW is a planning method about commitment. They answer different questions, so they work best together."
    },
    {
      "q": "How do you run a Kano survey?",
      "a": "For each feature, ask a pair of questions: how would you feel if the product had it, and how would you feel if it didn't? Answers come from a fixed scale (I like it, I expect it, I'm neutral, I can live with it, I dislike it), and the standard Kano evaluation table turns each answer pair into a category. Describe every feature concretely, in terms of what it does for the user."
    },
    {
      "q": "Why are AI features hard to prioritize?",
      "a": "Because novelty inflates how attractive they seem in interviews and surveys, and because their value depends on accuracy that a demo doesn't show. A feature that delights when it works can disappoint when it errs, and people tend to lose faith in an algorithm after seeing it make mistakes (Dietvorst, Simmons & Massey, 2015). Test how people feel about the imperfect version, not the ideal one."
    },
    {
      "q": "Should you use Kano or MoSCoW for an MVP?",
      "a": "Both, in sequence. Use interviews and a Kano survey to learn which candidate features users expect, value or would be delighted by, then use MoSCoW to commit the MVP's scope for a fixed release. For RecallMate, an AI-assisted learning app, I prioritized with MoSCoW after interviews; for a product where AI features carry the value, I'd add a Kano pass first."
    }
  ],
  "related": ["spaced-repetition-conversational-ai", "jobs-to-be-done-market-fit-interviews", "curriculum-gap-analysis-learning-paths"],
  "caseStudies": ["recallmate"]
}
---
Kano or MoSCoW? Use both, for different jobs. The Kano model tells you how customers will feel about a feature: expected, valued, delightful or unwanted. MoSCoW tells you what a specific release will commit to. Kano is for listening; MoSCoW is for deciding.

The distinction matters most with AI features, because almost every AI idea looks magical in a demo. Novelty inflates how attractive a feature seems, and its real value depends on accuracy nobody sees in a prototype. Here's how each framework works, why AI features drift between categories, and the combined method I'd use.

## What is the Kano model?

Kano, Seraku, Takahashi and Tsuji (1984) observed that satisfaction doesn't rise in a straight line as a feature goes from missing to present. Different features behave differently:

- **Must-be:** expected. Its absence makes people unhappy; its presence goes unnoticed, like saving your work.
- **Performance:** more is better, roughly in proportion, like speed or accuracy.
- **Attractive:** delightful when present, not missed when absent. The feature people show their friends.
- **Indifferent:** nobody cares either way.
- **Reverse:** some people actively prefer not to have it.

You find a feature's category with a pair of questions, "How would you feel if the product had this?" and "How would you feel if it didn't?", each answered on a fixed scale from "I like it" to "I dislike it". The standard Kano evaluation table maps each answer pair to a category.

## What is MoSCoW prioritization?

MoSCoW comes from Dai Clegg and the DSDM agile method. It sorts the scope of a fixed release or timebox into four groups: Must have, Should have, Could have and Won't have this time. The lowercase o's are only there to make it pronounceable.

Its strength is commitment. A Must is something the release is pointless without, and a Won't is a deliberate, recorded no. Its weakness is that it says nothing about customers on its own. Without evidence behind it, MoSCoW turns into a negotiation, and everything drifts toward Must.

## Kano vs MoSCoW: which questions do they answer?

| | Kano | MoSCoW |
| --- | --- | --- |
| Question | How will customers feel about this feature? | What will this release include? |
| Input | Customer surveys and interviews | Team judgment, constraints and evidence |
| Output | A category for each feature | A scoped, time-boxed plan |
| Time horizon | Shifts as expectations change | Fixed for one release |
| Typical failure | Abstract features get abstract answers | Everything becomes a Must |

They fail in complementary ways, which is exactly why I pair them.

## Why do AI features drift between Kano categories?

Kano categories aren't permanent. Features tend to migrate as expectations rise: yesterday's delighter becomes today's performance feature and tomorrow's must-be. In my view, AI features make that migration faster and less predictable, for three reasons:

- **Novelty fades fast.** An AI summary feels magical in the first week. Once every competitor has one, its absence is what people notice. Attractive drifts to must-be.
- **Some magic isn't needed.** When the novelty wears off, users may find the feature doesn't serve a job they have. Attractive drifts to indifferent.
- **Errors flip the sign.** Dietvorst, Simmons and Massey (2015) found that people abandon an algorithm after seeing it err, even when it outperforms a human. An AI feature that's confidently wrong can become something people want switched off. Attractive drifts to reverse.

So a Kano survey that describes the ideal AI feature measures the demo, not the product.

## How do you combine Kano and MoSCoW for AI features?

Here is the sequence I'd use for an AI product's first release. I call it Kano to listen, MoSCoW to commit:

1. **Start from jobs, not features.** Interview users about the progress they're trying to make, and derive candidate features from those jobs. The method is in [jobs-to-be-done interviews for market fit](/insights/jobs-to-be-done-market-fit-interviews).
2. **Run a Kano survey on the candidates,** describing each one concretely, in terms of what it does for the user.
3. **Add the imperfection pair for every AI feature.** Ask the Kano questions twice: once describing the feature working perfectly, and once as "usually right, sometimes wrong, and you can correct it". If a feature drops from attractive to indifferent or reverse in the honest version, its value depends on accuracy you may not have yet.
4. **Map categories to MoSCoW as a starting point,** then override where cost, risk or the core job demand it:

| Kano category | MoSCoW starting point | Override when |
| --- | --- | --- |
| Must-be | Must | The release genuinely works without it |
| Performance | Should | It is the core job, which makes it a Must |
| Attractive | Could | It's your differentiator and survives the imperfection pair |
| Indifferent | Won't (this time) | Another feature depends on it |
| Reverse | Won't, or optional and off by default | Never force it on |

5. **Commit the release with MoSCoW,** recording the reason for each Must and each Won't.
6. **Run the Kano survey again after launch.** AI features migrate, and the survey that justified the scope will age.

## How I prioritized features for RecallMate

[RecallMate](/work/recallmate) is an AI-assisted learning app whose concept and UX research I led as a research intern at the University of Milano-Bicocca. The problem: spaced repetition works, but tools like Anki demand so much setup and card authoring that learners quit before the benefit compounds.

I designed and ran multi-round interviews, coded them thematically into a ranked backlog of pain points, and prioritized with MoSCoW. AI-assisted card creation and conversational review were promoted to Must-have, so AI tutoring and scheduling came first and social features waited for evidence. Should and Could items were deferred until after validation.

One of the most useful decisions was about what the AI should not do. The conversational layer lowers the effort of making cards, but recall attempts stay with the learner, so the testing effect isn't outsourced to the model. No survey can make that call for you; it comes from understanding the job and the learning science behind it. I explain the scheduling side in [spaced repetition meets conversational AI](/insights/spaced-repetition-conversational-ai).

If I ran it again with AI features this central, I'd add a Kano pass with the imperfection pair before the MoSCoW session. In EdTech the candidate features often start from what learners are missing, which is the idea behind [curriculum gap analysis](/insights/curriculum-gap-analysis-learning-paths).

Before your next prioritization meeting, take the three AI features with the most excitement behind them and write the honest version of each: what it does when it's wrong. Ask a handful of users how they'd feel about that version. If the delight survives, it may deserve a place in the release. If it doesn't, you've just saved a sprint.
