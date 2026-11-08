---
{
  "title": "Present Bias in Savings Apps: Designing for the Future You",
  "description": "Present bias in savings explained: why people plan to save later and don't, and five app design patterns, from automatic transfers to Save More Tomorrow.",
  "topic": "fintech",
  "order": 5,
  "date": "2026-11-08",
  "keywords": ["present bias savings", "present bias examples app", "save more tomorrow app design", "hyperbolic discounting savings", "savings app behavioral design"],
  "takeaways": [
    "Present bias turns \"I'll start saving next month\" into a promise every future month breaks, because each month becomes the present when it arrives.",
    "The fix is to move the decision out of the present: decide once, in advance, and let a default carry the plan out.",
    "Save More Tomorrow works because people commit future raises rather than today's pay, so saving more never shows up as a loss.",
    "Put friction on withdrawals, not deposits: following the plan should take one tap, and breaking it should take a moment of thought."
  ],
  "faq": [
    {
      "q": "What is present bias?",
      "a": "Present bias is the tendency to give the present extra weight compared with every later moment, so people choose smaller rewards now over larger ones later and keep postponing costs (Laibson, 1997; O'Donoghue & Rabin, 1999). It explains why plans to save, exercise or study keep sliding to tomorrow: when tomorrow arrives, it becomes today and gets the same treatment."
    },
    {
      "q": "What are examples of present bias in apps?",
      "a": "Skipping a planned savings transfer because this month feels tight, choosing an instant purchase over a goal, snoozing a reminder to review spending, or putting off a habit app's daily task again and again. Each time, the cost is later and the comfort is now. Good apps respond by deciding in advance, automating the plan and adding friction where the present self is most likely to undo it."
    },
    {
      "q": "How does Save More Tomorrow work?",
      "a": "Save More Tomorrow, designed by Thaler and Benartzi (2004), asks employees to commit now to saving part of their future pay raises. Because the increase comes from money they don't have yet, take-home pay doesn't fall, so it never feels like a loss, and inertia keeps people enrolled. An app can copy the logic by tying savings increases to future income events."
    },
    {
      "q": "Should savings apps use defaults?",
      "a": "Yes, carefully. Automatic enrollment raises participation because people tend to stay with whatever is set up for them (Madrian & Shea, 2001). The same inertia can keep people at a default that is too low or wrong for them, so a good default is one most users would choose for themselves, is easy to change, and is revisited at sensible moments."
    }
  ],
  "related": ["mental-accounting-budgeting-app-design", "commitment-contracts-real-money-stakes", "goal-gradient-effect-onboarding"],
  "caseStudies": ["costly"]
}
---
Present bias in savings is the gap between the saver people plan to be and the spender they are today. People sincerely intend to start saving "next month," and next month arrives as the present, with the same pull toward spending. Savings apps work when they stop asking the present self to choose.

That comes down to three moves: decide once, in advance; let a default carry the decision out; and put friction on undoing the plan rather than on following it. Below is the research behind each move, five patterns I'd build into any savings product, and how the same logic shapes [Costly](/work/costly), the commitment app I'm building against doomscrolling. Costly isn't a savings app, but it fights the same bias with real money.

## What is present bias?

Present bias is the tendency to give "now" extra weight compared with every later moment. Laibson (1997) modeled it as hyperbolic discounting: the gap between today and tomorrow feels large, while the gap between day 30 and day 31 feels like nothing. O'Donoghue and Rabin (1999) showed how this produces procrastination, especially in people who don't realize they're present-biased and so keep planning to act tomorrow, and keep being surprised.

Ainslie (1975) described the same pattern as a preference reversal. When both rewards are far off, people prefer the larger, later one. As the smaller one gets close, it wins.

For savings, the consequence is blunt. Any plan that needs a fresh decision in the present will lose to the present some of the time, and often enough to fail.

## Why does "I'll save next month" fail?

Take a hypothetical saver who plans to move €100 a month into savings. In January, starting in February looks easy. In February, February is the present: there's a bill, a birthday, a sale, and March looks better. Nothing about the plan was wrong. It was simply scheduled, over and over, for a moment that never comes, because every moment is "now" when it arrives.

Status quo bias makes it worse (Samuelson & Zeckhauser, 1988). Not saving is the default state; saving requires action. The path of least resistance is to stay where you are.

## What does the evidence say works?

Three lines of evidence point the same way.

**Defaults.** Madrian and Shea (2001) studied a company that switched its retirement plan to automatic enrollment. Participation rose sharply, and many employees stayed at the default contribution rate and investment fund. Inertia did the work in both directions, since a modest default became sticky too.

**Committing future money.** Thaler and Benartzi's (2004) Save More Tomorrow asked employees to commit in advance to saving part of their future pay raises. Because the increases came from money they didn't have yet, take-home pay didn't fall, so loss aversion never fought the plan. People could leave at any time; most stayed, and saving rates rose substantially over successive raises.

**Commitment devices.** Offered a way to bind their future selves, people often take it. Giné, Karlan and Zinman (2010) offered smokers a savings account they would forfeit if they failed a nicotine test, and people signed up voluntarily. Laibson (1997) made a related point about saving: assets that are hard to get at can work as commitment devices for a present-biased mind.

## Five patterns for designing for the future you

I group these as the future-you patterns. Each one moves a decision away from the moment the present self controls.

| Pattern | What it does | Example in a savings app |
| --- | --- | --- |
| Decide once | Makes saving a default, not a monthly choice | A transfer scheduled for payday, set up during onboarding |
| Commit the future | Ties increases to money not yet received | "When my income rises, save part of the raise" |
| Make the future concrete | Gives the later self a face, a date, a thing | A named goal with a target date and an image |
| Asymmetric friction | Makes saving one tap and withdrawing a pause | A short cooling-off before breaking a goal |
| Bring rewards forward | Gives the present self something now | Progress that moves the moment a deposit lands |

Asymmetric friction is easy to get backward: add confirmations to deposits ("Are you sure you want to move €50?") and make withdrawals instant. A present-biased user needs the opposite: frictionless follow-through, and a short, honest speed bump on reversal. A pause and a question, not a maze.

Bringing rewards forward is, in my view, the most underrated of the five. You can't make retirement feel close, but you can make progress feel immediate. People speed up as they get closer to a goal (Kivetz, Urminsky & Zheng, 2006), so a near, visible milestone is a present reward that serves a future goal. I go deeper in [the goal-gradient effect in onboarding](/insights/goal-gradient-effect-onboarding), and into how labeled pots make goals concrete in [mental accounting in budgeting apps](/insights/mental-accounting-budgeting-app-design).

## Commitment with an exit

Commitment devices raise a fair question: what if the future self has a real emergency? Good design separates a lapse from a crisis. A plan should be hard to undo on a whim and possible to undo for a reason, at a cost the user agreed to in advance.

Costly is built on that structure. The calm self sets the terms: the hourly rate charged for doomscrolling, and a self-priced deletion fee for leaving early. The present self can still leave, but pays a price their earlier self chose. I wrote about the full contract in [commitment contracts with real money](/insights/commitment-contracts-real-money-stakes).

The way back is designed against present bias too. Costly returns 80% of each loss if the user walks it off, at 2 minutes walked per minute scrolled, but only within 24 hours. A way back that stays open forever is one a present-biased mind will take "tomorrow." A short window keeps the good choice in the present, where it can compete.

## How do you choose a good default?

Defaults are the strongest tool in this article, so they need the most care. Thaler and Sunstein (2008) argued for choice architecture that steers without removing choice. For a savings default, my test is three questions:

1. Would most users choose this if they thought about it for ten minutes?
2. Can they change it in one step, today?
3. Will the app ask again at a sensible moment, such as a raise or a reached goal?

A default that fails the first question is a decision made for the company. One that fails the second is a trap. One that fails the third goes stale; the sticky contribution rates in Madrian and Shea's study are the warning.

If you're designing a savings feature this week, list every place where the app asks the user to decide again something they already decided. Each one is a vote the present self gets to cast against the plan. Remove the votes it shouldn't have, keep a clear exit for real emergencies, and you'll have designed for the person your user is trying to become, not only the one holding the phone.
