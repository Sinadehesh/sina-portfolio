---
{
  "title": "Do Nudges Actually Work? What the Evidence Means for Product Teams",
  "description": "Do nudges work? What nudge-unit trials, megastudies and the publication-bias debate show, and how product teams should test, size and prioritize changes.",
  "topic": "consumer-psychology",
  "order": 6,
  "date": "2026-11-08",
  "keywords": ["do nudges work", "nudge effectiveness evidence", "behavioral science product design evidence", "nudge publication bias", "choice architecture effectiveness", "nudge unit results"],
  "takeaways": [
    "Nudges can work, but usually by less than the famous studies suggest: trials run at scale by nudge units found much smaller effects than published academic papers.",
    "The average nudge isn't your product. Changes to the structure of a decision, such as defaults and removed steps, deserve testing before changes to wording.",
    "Treat every nudge as a hypothesis: test several against each other, expect small effects and size your test to detect them.",
    "Measure the behavior you care about, not the click that comes before it, and check whether the effect lasts beyond the novelty."
  ],
  "faq": [
    {
      "q": "Do nudges actually work?",
      "a": "Some do, usually modestly. When nudge units tested interventions at scale, the average effects were much smaller than those in published academic studies (DellaVigna & Linos, 2022). A large meta-analysis found an average effect (Mertens et al., 2022), but a reanalysis adjusting for publication bias found little evidence left (Maier et al., 2022). Specific structural changes, such as defaults, can still be powerful in the right setting."
    },
    {
      "q": "Why are nudge effects smaller in the real world?",
      "a": "Partly because of what gets published. Small studies that happen to find large effects are more likely to appear in journals, while nudge units run many trials and report them all. Real settings also add noise: people meet the nudge once, among many other messages, and the behavior has many causes. Expect smaller effects than the headline studies suggest, and plan your tests accordingly."
    },
    {
      "q": "What is a nudge megastudy?",
      "a": "A megastudy tests many different interventions at the same time, in the same population, against the same outcome, so they can be compared fairly. Milkman and colleagues (2021) used this design to compare dozens of nudges side by side. For product teams, the lesson is to test several ideas against each other rather than celebrating the one that happened to work."
    },
    {
      "q": "Should product teams still use behavioral science?",
      "a": "Yes, as a source of hypotheses rather than guarantees. Behavioral science is good at telling you where to look: defaults, friction, timing, risk. Start with structural changes to the decision itself, test them against a control, measure real behavior rather than clicks, and expect modest effects. The value lies in fixing the right step, not in sprinkling nudges across the product."
    }
  ],
  "related": ["measuring-behavior-change-apps", "within-subjects-ux-experiments", "persuasion-or-dark-pattern-test"],
  "caseStudies": ["optimolds"]
}
---
Do nudges work? Sometimes, but usually by less than the famous studies suggest, and less reliably than conference talks tend to imply. When nudges are tested at scale, by teams with no incentive to publish only the hits, the effects shrink.

That's not a reason to give up on behavioral science in product design. It's a reason to use it differently: as a source of hypotheses, with structural changes before cosmetic ones, small expected effects, and behavior rather than clicks as the measure. Here is what the evidence says and what I do with it.

## Why are published nudge effects bigger than real-world ones?

The clearest evidence comes from DellaVigna and Linos (2022). They compared the full set of randomized trials run by two nudge units, teams that test interventions for governments at scale, with nudge studies published in academic journals. The nudge-unit effects were much smaller.

One explanation is selective publication. If small studies with big effects get published and small studies with no effect stay in a drawer, the published record overstates the typical effect. A complete set of nudge-unit trials has no such filter: every trial counts, whatever it found.

The same tension runs through the meta-analyses. Mertens and colleagues (2022) pooled a large body of choice-architecture studies and found an overall effect, with interventions that change the structure of a decision, such as defaults, doing better than those that only change how information is presented. Maier and colleagues (2022) reanalyzed the same data, adjusted for publication bias, and found little evidence of an average effect left.

## So do nudges work or not?

Both camps can be right at once. "The average nudge" is a statistical abstraction that blends reminder letters, social-norm messages, defaults and redesigned forms into one number. A weak average can hide a few strong interventions among many weak ones.

Some structural changes have produced large effects in the right setting. Countries where organ donation was the default had far higher consent rates than countries where people had to opt in (Johnson & Goldstein, 2003), and automatic enrollment sharply increased participation in a workplace retirement plan (Madrian & Shea, 2001). Neither is a clever message. Both change what happens when a person does nothing.

My reading, and it is an opinion: the average nudge isn't your product. What matters is whether the specific change you're considering alters the decision itself or only decorates it.

## What do megastudies add?

Milkman and colleagues (2021) showed a better way to compare ideas: the megastudy. Instead of each team testing its favorite nudge in its own population, dozens of interventions are tested at the same time, in the same population, against the same outcome.

That design removes two distortions at once. Nobody gets to pick a friendly population, and nobody gets to publish only the winner. The transferable lesson for product teams is simple. Don't test one idea against a control and declare victory; test several ideas against each other and the control, and let the data rank them.

## Which behavioral changes should you try first?

I sort candidate changes on what I call the nudge ladder. The higher the rung, the more the change alters the decision itself, and in my view the more it's worth testing:

| Rung | What changes | Product example |
| --- | --- | --- |
| 1. Message | Wording, framing, a social-norm line | "Most teams finish setup today" |
| 2. Salience | What's visible, and when | Showing the total at the moment of choice |
| 3. Friction | The effort on each path | Cutting a form from twelve fields to three |
| 4. Structure | Defaults, the offer, who carries the risk | A free first step instead of a sales call |

Rung one is where most "behavioral" roadmaps start, because it's cheap to ship. It's also where the evidence is weakest, given the meta-analytic pattern above. Climb before you polish.

## How I applied this at Optimolds

When I designed the lead-generation funnel for [Optimolds](/work/optimolds), an Italy-based composite engineering and mold-making firm, it would have been easy to reach for rung-one ideas: urgency badges, "limited slots this month", a brighter button. None of them would have touched the real barrier. The buyers are risk-averse because a bad mold ruins a production run.

So the levers I used sit on rungs three and four. The offer is a free 48-hour feasibility check, the one primary call to action across the site, which moves the risk of the first step from the buyer to the supplier. The form is a short CAD upload rather than a long brief. Trust signals sit next to the ask. Those are changes to the decision, not decorations on it.

I won't claim an effect size for it. A single live site without a controlled comparison can't give you one, and I'd rather say so than borrow certainty I don't have. It's also why the study I've planned for Costly, my pre-launch commitment app, compares awareness, soft friction and real stakes in three randomized arms: to estimate the effect instead of assuming it. I describe how to pick the metrics in [measuring behavior change in apps](/insights/measuring-behavior-change-apps).

## What should product teams do differently?

Five rules I work by:

1. **Write the hypothesis as a barrier.** Not "add social proof" but "buyers doubt we'll reply, so a stated reply time next to the form will raise completion."
2. **Expect small effects and size the test for them.** Small effects need large samples. If traffic is limited, consider designs where each person is their own control, which I cover in [within-subjects UX experiments](/insights/within-subjects-ux-experiments).
3. **Test several ideas at once.** Borrow the megastudy logic and compare candidates against each other, not only against nothing.
4. **Measure behavior, not clicks.** A tap on "remind me later" isn't saving money. Choose the outcome you actually care about before the test starts.
5. **Check whether it lasts.** Some effects fade once the novelty wears off, so look at the same metric weeks later, not only in launch week.

## When is a nudge the right tool?

Light-touch nudges still earn their place where the stakes are low, the cost is tiny and the person already intends to act: a reminder before a deadline they set, a prompt to plan when and where they'll do something (Gollwitzer, 1999, on implementation intentions), a clearer label at the moment of choice.

What a nudge shouldn't do is work against the person's own goals. Steering people toward something they wouldn't choose with full information isn't choice architecture anymore; it's a dark pattern. I use [a five-question test](/insights/persuasion-or-dark-pattern-test) to find that line before anything ships.

The honest version of behavioral design is less magical and more useful: find the step where the decision actually breaks, change the structure of that decision, and measure what people do afterwards. If you can afford one experiment this quarter, spend it there, not on the copy.
