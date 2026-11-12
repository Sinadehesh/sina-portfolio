---
{
  "title": "Commitment Contracts With Real Money: What Building Costly Taught Me",
  "description": "How commitment contracts with real money change behavior, why soft app blockers fail, and the design decisions behind Costly, a doomscrolling commitment app.",
  "topic": "fintech",
  "order": 1,
  "date": "2026-11-08",
  "keywords": ["commitment contract app", "financial commitment device", "money stake habit app", "commitment device psychology", "app that charges you for screen time"],
  "takeaways": [
    "A commitment contract works by moving the cost of a lapse into the moment of temptation, so the present self can't quietly overrule the plan.",
    "Soft friction fails because it can be switched off at exactly the moment willpower is lowest; a real stake survives that moment.",
    "A stake needs a way back that serves the goal: in Costly, 80% of each loss can be earned back by walking it off within 24 hours.",
    "Let people price their own commitment. A self-set rate and a self-priced deletion fee feel fair because the user chose them, not the app."
  ],
  "faq": [
    {
      "q": "What is a commitment contract?",
      "a": "A commitment contract is an agreement with your future self that attaches a real cost — money, reputation or effort — to breaking a goal, so the cost is felt at the moment of temptation. Behavioral economists call these commitment devices, and studies such as Giné, Karlan and Zinman's (2010) smoking-cessation savings program show people will choose them voluntarily."
    },
    {
      "q": "Do commitment devices actually work?",
      "a": "The evidence that people value and use them is good: people set themselves deadlines (Ariely & Wertenbroch, 2002) and sign up for programs that penalize their own lapses (Giné, Karlan & Zinman, 2010). Whether a given product works depends on design — the stake must matter but be survivable, and the exit must not be so easy that it becomes the default."
    },
    {
      "q": "Why do app blockers stop working?",
      "a": "Most rely on soft friction: a pause screen or a timer you can dismiss. The person dismissing it is the same person the blocker was meant to protect, at their weakest moment, which is why reviews of blockers are full of people saying they just turn it off. A real stake does not disappear when you tap ignore."
    },
    {
      "q": "Is it ethical to charge people money for their own habits?",
      "a": "Only when they choose it, set the price and can see exactly what they will pay. In Costly the user sets the hourly rate, most of each loss can be earned back by walking, and the deletion fee is self-priced. Before launch, the terms will also be reviewed against EU unfair-terms rules."
    }
  ],
  "related": ["loss-aversion-fintech-ux", "designing-fair-penalty-fees", "positive-friction-ux-design"],
  "caseStudies": ["costly"]
}
---
A commitment contract with real money changes behavior because it moves the cost of a lapse into the moment of temptation. Without it, the cost of doomscrolling — a lost evening, a worse night — arrives later and feels abstract. With it, the cost is now, it is concrete, and it has a number on it.

That is the idea behind [Costly](/work/costly), the app I have been building: every minute of doomscrolling costs real money, at an hourly rate you set for your own time, and you can earn 80% of each loss back by walking it off within 24 hours. Here is why I designed it that way, what the research says about commitment devices, and the design decisions I would make again.

## Why do soft app blockers fail?

Most screen-time tools rely on soft friction: a breathing screen, a timer, a "Are you sure?" dialog. They assume the person who sees the prompt will make the choice they planned to make. But the person who sees it is the tired, bored, 11 p.m. version — the exact self the tool was meant to protect against.

You can see it in competitor reviews, which are full of some version of "I just turn it off." The friction is real, but it is negotiable, and anything negotiable gets negotiated away at the moment willpower is lowest. A blocker you can dismiss is a suggestion.

## What makes a commitment contract work?

Two well-established ideas do the heavy lifting.

**Present bias.** We weight the present far more than the future, even when we know better (Laibson, 1997; O'Donoghue & Rabin, 1999). Tonight's scroll wins against tomorrow's tiredness because tonight is closer. A commitment contract fights this by putting a cost on the present side of the scale.

**People will tie their own hands.** Ariely and Wertenbroch (2002) found that people choose self-imposed deadlines to beat their own procrastination. In a field study in the Philippines, Giné, Karlan and Zinman (2010) offered smokers a savings account they would forfeit if they failed a nicotine test — and people signed up voluntarily. Commitment devices are not something done *to* people; at their best, they are a tool people pick up.

Loss aversion makes the stake feel heavier than its face value. Losses loom larger than equivalent gains (Kahneman & Tversky, 1979), so money that is already yours and at risk of leaving gets far more attention than the same amount offered as a reward.

## The five dials of a commitment contract

When I designed Costly, I ended up thinking of a commitment contract as five dials. Get any one of them wrong and the whole thing either stops working or stops being fair.

| Dial | The question | What Costly does |
| --- | --- | --- |
| Stake | How much does a lapse cost? | You set the hourly rate for your own time |
| Timing | When is the cost felt? | Per minute, with a live meter on screen |
| Way back | Can the loss be undone by doing the right thing? | Walk 2 minutes per minute scrolled, within 24 hours, to earn back 80% |
| Meaning | What does the money stand for? | Losses are framed against a five-tier ladder of things you actually want |
| Exit | What does it cost to quit? | A deletion fee you price yourself, in advance |

**The way back is the dial most products skip.** A pure penalty teaches shame. A penalty you can earn back by doing the healthy thing teaches the healthy thing. Walking was a deliberate choice: it replaces the behavior rather than just punishing it, and it is available to almost anyone.

**Meaning beats amount.** "You lost €4" is forgettable. Seeing the same loss against something you are saving for is not. That is why Costly frames losses against a ladder of things the user wants rather than as a bare figure.

**The exit has to exist, and it has to cost something.** If deleting the app is free, deleting it becomes the default the first time it hurts. If it is punitive, it is a trap. A deletion fee the user prices themselves, while calm, sits in between: their own calm judgment holds their 11 p.m. self to account.

## Real money is real engineering

Moving money, even small amounts, turns a habit app into a payments product. Costly was built in June and July 2026: the full flow of holding money and giving it back through Stripe, so a stake can be held, released or captured as the rules require, plus an Android companion app with a live meter on screen, designed to stay within Google Play's rules. Each session uses two Stripe payments, a fifth captured and the rest held for 24 hours, because Stripe cannot partially capture a payment and keep the rest on hold.

How the money moves is part of the psychology. A meter that lags, a charge that looks wrong or a refund that takes days would destroy the sense of fairness the whole contract depends on. In a commitment product, reliability is a trust signal.

## What I don't know yet

Costly is pre-launch and has no users, so I can't tell you it works — and I am wary of anyone who claims that before testing. The plan is a 30–50 person alpha on real cards at small stakes, followed by a randomized three-arm study comparing awareness alone, soft friction and real stakes, to estimate the effect size properly. The primary metric is daily minutes in the targeted apps at week four against each person's own baseline. I wrote about why that kind of metric matters in [measuring behavior change in apps](/insights/measuring-behavior-change-apps).

There are open legal questions too: how a breach fee is treated under EU unfair-terms rules, and how it interacts with the 14-day withdrawal right. A legal review of both is part of the pre-launch plan. This is not legal advice, and if you are building something similar, get your own.

## When should a product use money stakes?

Money is a strong tool, so I keep a short checklist before reaching for it:

1. **The user chose the goal.** A stake on a goal someone else set is a fine, not a commitment.
2. **The user sets the price.** Self-set stakes feel fair; imposed ones feel extractive. I go deeper on this in [how to design a penalty fee people accept as fair](/insights/designing-fair-penalty-fees).
3. **There is a way back tied to the goal.** Redemption should reward the behavior you want.
4. **The cost is visible in real time.** People cannot respond to a charge they discover next month.
5. **Leaving is possible and proportionate.** No traps, no hidden exits.
6. **The terms have been checked** against consumer law where you operate.

If a design fails any of these, I'd rather use [positive friction](/insights/positive-friction-ux-design) instead of money. And if you're tempted to pump up the fear of losing, read [when loss aversion motivates and when it manipulates](/insights/loss-aversion-fintech-ux) first.

The deeper lesson from building Costly is that a commitment contract is not really about money. It is about letting your calm self make a decision that your tired self can't undo for free — and then making sure the deal stays fair to both of them.
