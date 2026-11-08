---
{
  "title": "Measuring Behavior Change in Apps: Beyond Vanity Metrics",
  "description": "Measuring behavior change in apps: a three-number scorecard, fair baselines and the right comparison group, with Costly's pre-launch plan as the example.",
  "topic": "ai-products",
  "order": 8,
  "date": "2026-11-08",
  "keywords": ["measuring behavior change", "behavior change app metrics", "digital wellbeing app metrics", "how to measure habit change", "behavior change app evaluation"],
  "takeaways": [
    "Measure the behavior itself, against each person's own baseline, at a point far enough out to outlast novelty, not downloads, streaks or time in app.",
    "Every behavior-change product needs three numbers: a primary behavior metric, a health metric for the mechanism, and a guardrail for harm.",
    "For a digital wellbeing app, engagement can be the opposite of success: in my app lockers, choosing to close the app counts as the win.",
    "Write the metrics and the comparison down before the first user, so the results can't be quietly redefined into a success afterward."
  ],
  "faq": [
    {
      "q": "How do you measure behavior change in an app?",
      "a": "Define the target behavior in observable terms, measure it before the intervention to get a baseline, measure it again at a fixed later point, and compare against a control group or a simpler version of the product. Report the size of the change rather than just whether it was significant, and keep people who quit in the analysis."
    },
    {
      "q": "What metrics should a digital wellbeing app track?",
      "a": "Start with the behavior the user wants to change, such as daily minutes in specific apps, measured against their own baseline. Add a health metric showing the mechanism works as intended, and a guardrail for harm, such as time simply moving to other apps. Treat daily active users and streaks as secondary: for wellbeing products, more use can mean less success."
    },
    {
      "q": "What are vanity metrics in behavior change apps?",
      "a": "Vanity metrics are numbers that grow when the product is used, whether or not anyone's behavior changes: downloads, daily active users, streak lengths, sessions, badges earned and self-reported satisfaction. They're useful for running a business, but they can't tell you whether the product changed the behavior it exists to change, and they can reward the opposite."
    },
    {
      "q": "How long should you measure a behavior change intervention?",
      "a": "Long enough to get past the novelty period, when a new tool can look more effective than it is. In Costly's plan, the primary comparison is at week four against each person's own baseline. For habits, a follow-up after the intervention ends is even more informative, because it shows whether the change outlasts the product."
    }
  ],
  "related": ["do-nudges-work-evidence-for-product-teams", "within-subjects-ux-experiments", "commitment-contracts-real-money-stakes"],
  "caseStudies": ["costly", "app-lockers"]
}
---
To measure behavior change in an app, measure the behavior itself, against each person's own baseline, at a point far enough out to get past novelty, and compare it with what would have happened anyway. Downloads, daily active users and streaks measure whether people use your product. They don't measure whether anything in their lives changed.

I've had to write this down concretely for [Costly](/work/costly), the commitment app I'm building against doomscrolling. It's pre-launch with no users, so there are no results in this article, on purpose. The measurement plan was written before the first user, and that's the point I most want to make.

## Why are engagement metrics misleading for behavior change?

Engagement metrics assume more use means more value. For a behavior-change product, that assumption often breaks.

In my Android app lockers, [FloraLock, ShroomLock and CloudLock](/work/app-lockers), now in closed testing, you name a plant, mushroom or cloud in a photo before Instagram or TikTok will open. There's an escape hatch, "I don't need Instagram right now," and choosing it counts as success. Closing the app is the best outcome, not beating the quiz. A dashboard that celebrated quiz sessions would reward the opposite of the goal.

The same trap exists in finance, fitness and learning apps: time in app, streak length and sessions are easy to move and easy to mistake for impact.

## The three-number scorecard

For any behavior-change product, I define three numbers before launch.

| Number | The question it answers | In Costly's plan |
| --- | --- | --- |
| Primary behavior | Did the target behavior change? | Daily minutes in targeted apps at week 4 vs. baseline |
| Health | Is the mechanism working as designed, without harm? | Redemption rate: the share of holds walked off |
| Guardrail | What must not get worse? | Time moving into untargeted apps (my addition) |

The primary metric is the behavior, in its own units. For Costly that's minutes in the apps the user chose to target, compared with their own baseline. Not "minutes Costly charged for," which is a product number.

The health metric checks the mechanism. Costly's stake is meant to be redeemable: 80% of each loss can be earned back by walking 2 minutes per minute scrolled within 24 hours. If the redemption rate comes back low, Costly is a punishment app and needs rebalancing, whatever the primary metric says.

The guardrail catches harm the primary metric can't see. A blocker can cut minutes in one app while the time quietly moves to another. That's displacement, and it's the guardrail I'd track alongside Costly's two planned metrics.

## Baselines: the comparison inside each person

Behavior varies enormously between people, so comparing users with each other is noisy. Comparing each person with their own baseline removes much of that noise. It's the logic of a within-subjects experiment, where each participant serves as their own control; my thesis used a within-subjects design with 96 participants for that reason, and I explain the trade-offs in [within-subjects UX experiments](/insights/within-subjects-ux-experiments).

Baselines have two traps:

- Reactivity: measuring behavior can change it. If the baseline week shows people their screen time, the baseline is already an intervention.
- Regression to the mean: people often install a wellbeing app during a bad stretch. Some of the improvement that follows would have happened anyway, as an unusually bad week gives way to an ordinary one.

## Why week four, not week one?

New tools get a honeymoon. The first days are when motivation is highest and the product is most interesting, so early numbers flatter almost anything. Costly's primary comparison is at week four, not week one, and I'd add a follow-up after the stakes end to see whether any change outlasts the product.

The app lockers apply a similar idea on the learning side. Their spaced reviews on days 1, 3, 7, 14 and 30 check whether a fact is still there after a delay, which says far more about learning than a quiz taken straight after the lesson.

## What would have happened anyway?

A before-and-after comparison can't separate the product's effect from everything else that changed in someone's life. For that you need a comparison group.

Costly's 12-week plan ends with a randomized three-arm study: awareness alone, soft friction, and real stakes. The arms are chosen to answer the question that matters scientifically and commercially: do real stakes beat the cheaper alternatives? Awareness is what most screen-time tools already offer; soft friction is what blockers offer; stakes are Costly's bet. If stakes don't beat soft friction, that's worth knowing before scaling anything.

The output that matters is an effect size with its uncertainty: roughly how many minutes a day each arm changes compared with the others, and how precise that estimate is. A p-value alone says an effect probably isn't zero. It doesn't say whether the effect is big enough to matter to someone's evening.

Two notes on design. First, a habit intervention like this should be randomized between people. Once someone has lived with real stakes they can't un-experience them, so a within-subjects design would be contaminated by carryover. Second, expect modest effects. Trials run by nudge units found effects much smaller than those in published academic studies (DellaVigna & Linos, 2022), and megastudies that test many interventions on the same outcome at once (Milkman et al., 2021) are a model for comparing options fairly. I read that evidence in more depth in [do nudges actually work?](/insights/do-nudges-work-evidence-for-product-teams)

## Seven ways behavior metrics lie

This is the checklist I run against any behavior-change dashboard:

1. **Survivorship.** People who quit vanish from the averages. Keep everyone who started in the denominator.
2. **Novelty.** Week one flatters everything.
3. **Regression to the mean.** Bad stretches end on their own.
4. **Displacement.** The behavior moved somewhere else; it didn't shrink.
5. **Self-report.** "I feel like I scroll less" is not minutes.
6. **Gaming.** Users learn to satisfy the metric rather than the goal.
7. **Moving goalposts.** If you choose the metric after seeing the data, you will always find a win.

Writing the plan before launch is the cheapest integrity tool I know. Costly's primary metric, health metric and study design were set before anyone signed up, so the results, whichever way they go, can't be quietly redefined into a success. If you run a behavior-change product, put your three numbers on one page this week, and decide now what result would make you change the product. For how real stakes fit into that picture, see [commitment contracts with real money](/insights/commitment-contracts-real-money-stakes).
