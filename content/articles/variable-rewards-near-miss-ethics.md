---
{
  "title": "Variable Rewards and Near-Misses: Inside a Betting Experiment",
  "description": "How a variable reward schedule and near-misses keep people spinning, seen in Dopamine Box, my mock-token betting experiment, and where the ethical line sits.",
  "topic": "ai-products",
  "order": 4,
  "date": "2026-11-08",
  "keywords": ["variable reward schedule", "near miss effect", "loot box psychology", "variable ratio reinforcement", "spin to win dark pattern"],
  "takeaways": [
    "Variable rewards hold attention because when any attempt might pay, there's never an obvious place to stop.",
    "A near-miss is objectively a loss, but it feels like progress, which makes the next try feel like continuing rather than placing a new bet.",
    "Dopamine Box is a behavioral experiment on betting: on a mock-token loop of variable payouts, near-misses, shard progress and scarcity tags, it is designed to compare how people bet with the Kelly criterion.",
    "The ethical line is crossed when variability is tied to spending and engineered to remove stopping points, not when an app has surprises."
  ],
  "faq": [
    {
      "q": "What is a variable reward schedule?",
      "a": "A variable reward schedule delivers rewards after an unpredictable number of actions or amount of time. Ferster and Skinner (1957) showed that variable-ratio schedules produce high, steady rates of responding that are slow to fade, which is why slot machines and spin-to-win features use them: when any attempt might pay, there is never an obvious place to stop."
    },
    {
      "q": "What is the near-miss effect?",
      "a": "The near-miss effect is the pull of a losing outcome that looks almost like a win, such as a jackpot symbol stopping just past the line or a progress bar stopping just short of full. A near-miss is objectively a loss, but it feels like progress, which makes trying again feel like continuing rather than starting a new bet."
    },
    {
      "q": "What is the psychology behind loot boxes?",
      "a": "Loot boxes combine several well-studied mechanics: variable-ratio rewards that make every attempt feel like it could pay, near-misses that make losses feel like progress, progress bars that intensify effort near the goal, scarcity and social-proof labels, and tokens that loosen the link between spending and paying. Dopamine Box, my behavioral experiment on betting, runs on all of them at once, with mock tokens only."
    },
    {
      "q": "Are variable rewards always unethical?",
      "a": "No. Surprise and variety are part of play, and a daily challenge that changes each day can reward curiosity without taking anything. In my view, the line is crossed when variability is tied to spending, odds are hidden, near-misses are engineered, labels are untrue, or the loop is designed so there's no natural place to stop."
    }
  ],
  "related": ["persuasion-or-dark-pattern-test", "goal-gradient-effect-onboarding", "gamification-overjustification-edtech"],
  "caseStudies": ["dopamine-box"]
}
---
A variable reward schedule keeps people coming back because the next win is always possible and never predictable. Add near-misses that look almost like wins, a progress bar that's nearly full and a "Low Stock" label, and you have the core of loot-box psychology: the same loop that is now spreading from games into shopping apps.

[Dopamine Box](/work/dopamine-box) is my behavioral experiment on betting. It's designed to observe how people bet compared with the Kelly criterion, the mathematically optimal stake, and which attitudes and cognitive biases pull them off course. It runs on a mock-token "spin to claim" loop: each spin adds shards toward a target item, with micro hits, solid hits and rare jackpots on a variable schedule, plus near-misses and scarcity tags. No real money is involved. Here's what each mechanic does, why it works and where I think the ethical line sits.

## What is a variable reward schedule?

It's a rule for when rewards arrive. Ferster and Skinner (1957) studied schedules of reinforcement in detail: rewards after a fixed or variable number of responses, or after fixed or variable stretches of time. Variable-ratio schedules, where a reward comes after an unpredictable number of tries, produce high, steady rates of responding that are slow to fade when the rewards stop.

The intuition is simple. If every tenth spin paid out, you'd learn the rhythm and stop after a win. When any spin might pay, there's never an obvious place to stop. Slot machines run on this principle, and so does every "spin the wheel for a discount" pop-up.

## How does the loop work, mechanic by mechanic?

Dopamine Box puts the whole loop on one screen. Each mechanic maps to a well-studied piece of psychology, and to something you've probably met in a shopping app.

| Mechanic | In Dopamine Box | Why it pulls | Where else it shows up |
| --- | --- | --- | --- |
| Variable payouts | Micro, solid and jackpot outcomes on an unpredictable schedule | Variable-ratio reinforcement (Ferster & Skinner, 1957) | Spin-to-win discounts, mystery boxes |
| Near-misses | Outcomes that land just short of a big win | A loss that feels like progress | "So close!" animations |
| Shard progress | Shards build toward 100% of a target item | The goal-gradient effect (Kivetz, Urminsky & Zheng, 2006) | Collect-to-unlock rewards |
| Scarcity label | "Low Stock" | Scarcity (Cialdini, 1984) | Low-stock and countdown banners |
| Social-proof label | "1 User Won Today" | Social proof (Cialdini, 1984) | "Others are looking at this" messages |
| Tokens | A mock-token wallet, never real money | A weaker pain of paying (Prelec & Loewenstein, 1998) | Coins, gems and credits |

Three of these deserve a closer look.

**Near-misses are losses dressed as progress.** A near-miss is objectively the same as any other losing spin. But it feels like you were close, which makes the next spin feel like a continuation rather than a new bet. That pull is one of the things Dopamine Box is designed to observe: whether a near-miss moves the next stake further from the optimal one.

**Progress bars turn waiting into wanting.** Kivetz, Urminsky and Zheng (2006) found that people speed up as they approach a reward: members of a café reward program bought coffee more often the closer they got to a free one. A shard bar that's nearly full is the goal gradient at its strongest, which is exactly where a monetized design is tempted to make the last stretch slow.

**Tokens hide the price.** A token puts a layer between spending and paying, which dulls the pain of paying (Prelec & Loewenstein, 1998), much as people tend to pay more with credit cards than with cash (Prelec & Simester, 2001). Ten tokens don't feel like money, even when they were bought with it.

## Why design an experiment instead of writing about it?

Because loot-box mechanics are hard to judge in the abstract. "Variable-ratio reinforcement" sounds academic until you catch yourself pressing the button once more because the bar was almost full. An experiment gives that moment a benchmark. The Kelly criterion (Kelly, 1956) defines the mathematically optimal stake for a bet, given its odds and payout, so every stake a person places can be compared with it, and the experiment looks at which attitudes and cognitive biases pull people away from it.

The mock tokens are the point, not a limitation. Dopamine Box exists to study and demonstrate the loop, not to monetize it. Its target items span four tiers of pull, from high-value tech and status items to aspirational purchases and speculative assets, so different framings can be compared side by side.

It's a prototype, and I'm not reporting results from it. Even so, the loop it runs on is worth putting in front of a product team before anyone adds a "spin to win" banner to a checkout.

## Where is the ethical line with variable rewards?

Variable rewards aren't wrong in themselves. Surprise is part of play, and variety is part of why people return to anything. A daily challenge that's different each day, the gentler variable loop I use in OopsCupid, rewards curiosity without taking anything.

The line, in my view, is crossed when variability is tied to spending and engineered to remove stopping points. I run any reward loop through five questions:

1. **Does money, or a stand-in for money, buy the attempt?** Tokens bought with cash count.
2. **Are the odds shown, in plain numbers, before the attempt?**
3. **Are near-misses engineered?** Is a loss designed to look close?
4. **Are the labels true?** Is stock really low? Did someone really win today?
5. **Is there a natural place to stop?** A finished lesson or a completed day is a stopping point; an almost-full bar is a hook.

If money buys the attempt and any of the other four answers goes the wrong way, I'd call it a dark pattern. Brignull (2010) coined that term, and a crawl of about 11,000 shopping websites found dark patterns at scale, including scarcity and social-proof messages (Mathur et al., 2019). For a broader version of this check, see my [five-question test for dark patterns](/insights/persuasion-or-dark-pattern-test).

## What should designers do instead?

If you want the motivation of progress without the exploitation:

- **Use fixed, visible milestones.** People know what they're working toward and when they'll get it: the goal gradient without the slot machine. I go into this in [the goal-gradient effect in onboarding](/insights/goal-gradient-effect-onboarding).
- **Vary the content, not the payout.** Novelty in what people do keeps things fresh without turning effort into a gamble.
- **Build in endings.** Let a session finish, and let people leave satisfied rather than drained.
- **Watch what rewards do to motivation.** Rewards can crowd out the reasons people started, the overjustification problem I cover in [gamification that doesn't backfire](/insights/gamification-overjustification-edtech).

If you're about to add a spin, a mystery box or a progress bar with a payout, try it on yourself first, and notice the moment you press once more because you were almost there. That moment is the mechanic working. Before you ship it, decide whether you'd be comfortable showing your users exactly how it works, odds and all.
