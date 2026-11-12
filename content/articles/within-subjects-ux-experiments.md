---
{
  "title": "Within-Subjects UX Experiments: When Repeated Measures Beat A/B Tests",
  "description": "Within-subjects design in UX research: when repeated measures beat A/B tests, how to handle order effects, and how to run a repeated-measures ANOVA properly.",
  "topic": "research",
  "order": 4,
  "date": "2026-11-08",
  "keywords": ["within subjects design UX", "repeated measures ANOVA UX research", "within vs between subjects A/B test", "counterbalancing order effects", "within-subjects experiment example", "repeated measures UX study"],
  "takeaways": [
    "In a within-subjects experiment every participant sees every condition, so each person is their own control and you usually need fewer participants than an A/B test.",
    "The price of repeated measures is carryover: practice, fatigue and learning. Counterbalance the order of conditions and check for order effects in the analysis.",
    "Use within-subjects designs for repeatable judgments and in-session behavior; use A/B tests when one exposure changes the person or the outcome happens only once.",
    "With three or more conditions, repeated-measures ANOVA assumes sphericity. Test it, and apply a correction such as Greenhouse-Geisser when it fails."
  ],
  "faq": [
    {
      "q": "What is a within-subjects design in UX research?",
      "a": "A within-subjects design exposes every participant to every condition, for example three versions of an interface, and compares each person's results across conditions. Because each participant acts as their own control, stable differences between people drop out of the comparison, which usually means you need fewer participants than a between-subjects design. The trade-off is carryover between conditions, managed with counterbalancing."
    },
    {
      "q": "When should you use a between-subjects A/B test instead?",
      "a": "When experiencing one condition would change how someone responds to the next, as with onboarding, pricing or anything learned once. Also when the outcome is a one-time behavior such as conversion or retention, when you have plenty of live traffic, or when participants mustn't know they're being compared. In those cases, randomizing different people to each version is cleaner."
    },
    {
      "q": "What is sphericity in repeated-measures ANOVA?",
      "a": "Sphericity is the assumption that the variances of the differences between every pair of conditions are roughly equal. It only matters with three or more conditions. Mauchly's test checks it; if it's violated, the F-test becomes too liberal, so you adjust the degrees of freedom with the Greenhouse-Geisser or Huynh-Feldt correction. SPSS reports all of these in its repeated-measures output."
    },
    {
      "q": "How do you control order effects in a within-subjects experiment?",
      "a": "Counterbalance the order of conditions so each appears equally often in each position, using every possible order or a Latin square when there are many conditions. Vary the tasks or stimuli across conditions so the task isn't confounded with the condition, add short breaks to reduce fatigue, and include order as a factor in the analysis to check whether it mattered."
    }
  ],
  "related": ["ai-interview-self-view-experiment", "measuring-behavior-change-apps", "do-nudges-work-evidence-for-product-teams"],
  "caseStudies": ["interview-simulation-study"]
}
---
A within-subjects UX experiment shows every participant every version you're testing and compares each person with themselves. That often makes it far more efficient than an A/B test when you can't recruit hundreds of people, because the biggest source of noise in most studies, the fact that people differ, drops out of the comparison.

It isn't always the right tool. Repeated measures beat A/B tests when the outcome can be measured more than once and one condition doesn't permanently change how people respond to the next. My master's thesis is a worked example: a within-subjects experiment with 96 participants, analyzed with repeated-measures ANOVA. Here's when to use the design, how to run it and where it breaks.

## What is the difference between within- and between-subjects designs?

In a between-subjects design, the classic A/B test, each person sees one version and you compare groups of different people. In a within-subjects design, each person sees every version and you compare conditions within the same person.

The difference matters because people vary enormously. Some participants are expressive, fast or enthusiastic in every condition; others are reserved, slow or skeptical. In an A/B test, that variation is noise you have to drown out with sample size. In a within-subjects test, each participant is their own control, so stable individual differences cancel out.

How much you gain depends on how strongly each person's scores correlate across conditions. The more consistent people are with themselves, the bigger the advantage. That's why within-subjects designs shine for perception, comprehension and behavior within a session, and lose their edge when responses are erratic.

## When do repeated measures beat A/B tests?

I decide with what I call the carryover test, three questions asked in order:

1. **Can someone experience condition B without condition A changing them?** If seeing A teaches, anchors or spoils B, you need different people.
2. **Can the outcome be measured more than once per person?** Ratings, task times, comprehension and expressiveness can. Conversion, retention and a first impression can't.
3. **Do you have the traffic for a between-subjects test?** A live product with a large audience can afford one; a lab study with dozens of participants can't.

If the first two answers are yes, within-subjects is usually the better design. If either is no, use different people for each condition, and if the third answer is also no, rethink the question before running an underpowered A/B test. The trade-off at a glance:

| Factor | Within-subjects | Between-subjects (A/B) |
| --- | --- | --- |
| Participants needed | Fewer | More |
| Main risk | Carryover and order effects | Noise from differences between people |
| Best for | Repeatable judgments, in-session behavior | One-time behavior, live traffic |
| Participants aware of the comparison | Usually | Need not be |
| Typical setting | Lab, usability study, early prototype | Live product, marketing pages |
| Example | Three interface variants rated by each user | Two onboarding flows for new sign-ups |

Pricing is the classic trap. Once someone has seen a price, it anchors every later judgment, so showing the same person three price points tells you more about order than about price.

## How do you handle order and carryover effects?

Repeated measures have a cost: whatever happens in the first condition can leak into the next. Participants practice, tire, get bored or work out what you're testing. The standard defense has four parts:

- **Counterbalance the order.** With three conditions there are six possible orders; use them equally, or use a Latin square when the number of conditions makes full counterbalancing impractical.
- **Separate condition from content.** Use different but equivalent tasks in each condition, and rotate which task goes with which condition, so you aren't comparing tasks by accident.
- **Add breaks or filler tasks** between conditions to reduce fatigue and let the previous condition fade.
- **Check order in the analysis.** Enter order as a between-subjects factor. If it interacts with condition, carryover is shaping your result, and you should say so.

Keep the number of conditions small. Every extra condition adds fatigue and more ways for order to matter. In my view, three is a comfortable number for a one-session study; more needs a strong reason.

## How do you analyze it with repeated-measures ANOVA?

For two conditions, a paired t-test is enough. For three or more, the workhorse is repeated-measures ANOVA, which tests whether condition means differ while accounting for the fact that the same people produced every score.

It brings one assumption an ordinary ANOVA doesn't have: sphericity, meaning the variances of the differences between every pair of conditions are roughly equal. With two conditions it's automatically satisfied; with three or more, test it. SPSS reports Mauchly's test next to the main result. If sphericity is violated, the F-test becomes too liberal, so report the Greenhouse-Geisser or Huynh-Feldt corrected degrees of freedom instead.

A significant overall F tells you the conditions differ somewhere. To say where, follow up with pairwise comparisons corrected for multiple testing, such as Holm or Bonferroni. Report means per condition and effect sizes, not only p-values, so a reader can see how big the difference is.

When some participants miss a condition or the design is unbalanced, a linear mixed model is often the better tool, because it doesn't drop everyone with a gap.

## What my N = 96 thesis experiment looked like

My M.Sc. thesis at the University of Milano-Bicocca asked a question that matters more as AI-led interviews spread: does the interface of an automated interview change how candidates present themselves?

The design was within-subjects. Each of the 96 participants took part in an automated interview simulation in three formats: self-view, meaning they could see themselves; an AI avatar; and text only. Order effects were controlled across conditions, and the analysis was a repeated-measures ANOVA on candidate expressiveness, with Holm-corrected post hoc tests to compare the formats pair by pair.

Candidates were significantly more expressive with the AI avatar than when they saw themselves, p = .009. I chose the within-subjects design for statistical power with a moderate sample: every participant contributed to every condition, so the comparison wasn't swamped by how naturally expressive different people are.

What the result means for AI interview design is in [self-view vs. an AI avatar](/insights/ai-interview-self-view-experiment), and the study is summarized on the [interview simulation case study](/work/interview-simulation-study) page.

## A checklist for your first within-subjects UX test

1. Pick one primary measure and define it before you recruit.
2. Limit yourself to two or three conditions.
3. Run the carryover test; if any condition would spoil the next, switch designs.
4. Counterbalance the order and rotate content across conditions.
5. Pilot with a handful of people to catch fatigue and confusing tasks.
6. Analyze with a paired t-test for two conditions or repeated-measures ANOVA for three or more, checking sphericity.
7. Report means, effect sizes and the comparison that answers your question.

Efficiency matters because the effects worth detecting are often small, a point I make in [do nudges actually work?](/insights/do-nudges-work-evidence-for-product-teams) But be honest about what a result covers. A within-subjects lab study tells you how people respond in a session, not whether a change will move retention over months. For that you need live measurement, which I cover in [measuring behavior change in apps](/insights/measuring-behavior-change-apps).

If your team only ever runs A/B tests, you are probably leaving cheap, sharp answers on the table. The next time a design question can be answered by showing the same people two or three versions, do that first, then take the winner to live traffic.
