---
{
  "title": "Persuasion or Dark Pattern? A Five-Question Test Before You Ship",
  "description": "Dark patterns vs persuasive design: a five-question test to run before you ship, applied to real products, plus the EU and UK rules that already draw the line.",
  "topic": "consumer-psychology",
  "order": 7,
  "date": "2026-11-08",
  "keywords": ["dark patterns vs persuasive design", "ethical nudging", "is it a dark pattern", "dark pattern test", "ethical persuasion UX", "dark patterns examples"],
  "takeaways": [
    "Persuasion survives being explained to the user; a dark pattern only works as long as the user doesn't see how it works.",
    "Five questions: could you explain it, does it serve their goal, is exit as easy as entry, is it true and complete, would you accept it on a bad day?",
    "One \"no\" is enough. The test isn't a score to balance: any failed question means redesign before you ship.",
    "Regulators encode parts of the test: in the EU a pre-ticked box isn't consent to extra payments, and UK insurers must make stopping auto-renewal as easy as starting it."
  ],
  "faq": [
    {
      "q": "What is the difference between a dark pattern and persuasive design?",
      "a": "Persuasive design helps people make a choice they would endorse if they understood how the design works. A dark pattern produces a choice they wouldn't endorse, and depends on them not noticing. The quickest check is to imagine explaining the mechanism to the user: honest persuasion survives the explanation, while a fake countdown or a hidden cancellation path does not."
    },
    {
      "q": "Who coined the term dark patterns?",
      "a": "Harry Brignull coined it in 2010 for interfaces designed to make people do things they didn't mean to, such as buying extras or signing up for recurring charges. Researchers have since measured them at scale: Mathur and colleagues (2019) crawled about 11,000 shopping websites and found dark patterns in use, some of them outright deceptive."
    },
    {
      "q": "Is ethical nudging possible?",
      "a": "Yes, if the nudge serves a goal the person holds, is easy to avoid and would survive being explained. Thaler and Sunstein (2008) described a nudge as steering choices without forbidding options, in a way that is easy and cheap to avoid. A default that enrolls people in savings they can leave with one click qualifies; a cancellation flow six screens deep does not."
    },
    {
      "q": "Are dark patterns illegal in the EU?",
      "a": "Some are. EU consumer law prohibits unfair commercial practices, and the Consumer Rights Directive requires express consent for additional payments, so a pre-ticked box doesn't count. In the UK, the FCA's general insurance pricing rules require that stopping an auto-renewal be as easy as setting it up. The details depend on the practice and the country. This is not legal advice."
    }
  ],
  "related": ["dark-patterns-in-ai-chatbots", "variable-rewards-near-miss-ethics", "loss-aversion-fintech-ux"],
  "caseStudies": ["dopamine-box", "costly", "app-lockers"]
}
---
The difference between persuasion and a dark pattern is whether the design still works once the user understands it. Persuasion helps someone make a choice they'd endorse with full information; a dark pattern gets a choice they wouldn't, and depends on them not noticing.

That sounds simple until you're in a design review with a conversion target. So I turned it into five questions I ask before anything persuasive ships. Below is the test, how to run it, what happens when I turn it on my own products, and where regulators already agree.

## What makes something a dark pattern?

Brignull (2010) coined "dark patterns" for interfaces built to make people do things they didn't mean to: buying an add-on that slipped into the basket, signing up for a recurring charge, hunting for a cancel button that isn't there. The term stuck because everyone had met one.

Researchers have since measured them. Mathur and colleagues (2019) crawled about 11,000 shopping websites and found dark patterns at scale, including false urgency, misleading scarcity, items sneaked into baskets and subscriptions that are hard to cancel. Some were outright deceptive.

The hard cases aren't the obvious scams, though. They're the everyday tools (defaults, urgency, social proof, loss framing) that can serve the user or exploit them depending on how they're used. A default can enroll someone in the savings plan they meant to join, or in an insurance add-on they never wanted. The technique is identical, so the test has to look at something else.

## What is the five-question test?

I run each persuasive element, whether a default, a label, a timer or a line of copy, through five questions:

| # | Question | What it catches |
| --- | --- | --- |
| 1 | Would it still work if I explained it to the user? | Designs that depend on not being noticed |
| 2 | Does it serve a goal the user holds, or only mine? | Steering toward outcomes the user didn't want |
| 3 | Is leaving as easy as entering? | Hard cancellations, buried opt-outs |
| 4 | Is every claim true and complete? | Fake scarcity, fake urgency, hidden totals, invented "most popular" labels |
| 5 | Would I accept it as the customer, on my worst day? | Designs that only feel fair to someone calm and paying attention |

One "no" is enough. This isn't a score where four passes outweigh a fail; any failed question means redesign before it ships.

The first question does most of the work. Real persuasion (clear benefits, honest social proof, a recommended plan) survives disclosure. "We highlight this plan because most people your size choose it" is fine to say out loud. "We show this timer so you'll panic" is not.

The fifth question is the one teams skip. We judge designs at our desks, rested and informed. Customers meet them at 11 p.m., tired, on a phone. A design that's only fair to an attentive user isn't fair.

## How do you run the test in practice?

Three habits make it stick:

- **Run it per element, not per page.** A checkout can be honest overall and still carry one pre-ticked box that fails.
- **Have someone outside the growth team ask the questions.** Whoever owns the conversion target is the worst judge of question two.
- **Write the answers down.** One line per question in the design ticket. If you can't write the sentence for question one, you have your answer.

When something fails, the fix usually lives in the product or the terms, not in the copy. If an honest exit would cost you too many customers, the problem is the value, not the exit.

## What happens when I run it on my own products?

A test is only useful if it bites at home, so here it is on three things I've designed.

[Dopamine Box](/work/dopamine-box) is a prototype behavioral experiment on betting: it's designed to observe how people bet compared with the Kelly criterion, the mathematically optimal stake, and which attitudes and cognitive biases pull them off course. It runs on a mock-token "spin to claim" loop: micro, solid and jackpot outcomes on a variable schedule, near-misses, scarcity and social-proof labels such as "Low Stock" and "1 User Won Today", and shard progress toward 100%. In a real shopping app, those mechanics would fail questions one, four and five. In Dopamine Box they are the thing under study: no real money moves, nothing is sold, and the question is how far the loop pulls each stake from the optimal one. Same mechanics, different verdict, because nobody profits when the loop works.

[Costly](/work/costly), my pre-launch commitment app against doomscrolling, is the hard case. It charges real money for every minute of scrolling, at an hourly rate the user sets. Question one passes because the mechanism only works if the user understands it; a commitment device you don't know about can't commit you. Question two passes because the user chooses the goal. Question three is where it gets interesting, because Costly deliberately makes leaving cost something, through a deletion fee the user prices in advance. My answer is that the exit is visible, priced by the user while calm, can be set to zero, and that 80% of each loss can be earned back by walking it off within 24 hours. Whether that is enough is an open question: the contract terms will be reviewed against EU unfair-terms rules before launch, including how they interact with the 14-day withdrawal right.

FloraLock, ShroomLock and CloudLock, my app lockers in closed testing, add friction on purpose: to open Instagram or TikTok, you name the plant, mushroom or cloud in a photo. They pass question three through escape hatches, an "I don't need Instagram right now" button and emergency unlocks, because a locker people can't leave is a locker people uninstall.

## What do regulators already say?

Regulators have written parts of this test into rules, which is a useful sign the questions aren't just my taste:

- EU consumer law prohibits unfair commercial practices, misleading ones included. That is question four in legal form.
- Under the EU Consumer Rights Directive (2011/83/EU), additional payments beyond the main obligation need the consumer's express consent, and pre-ticked boxes don't count. A default can't do the consenting for you.
- In the UK, the FCA's general insurance pricing rules (PS21/5, in force since 1 January 2022) require that stopping an auto-renewal be as easy as setting it up. That is question three, almost word for word.

This is not legal advice; the rules depend on the practice, the sector and the country.

## Is ethical nudging possible?

Yes, and the original definition helps. Thaler and Sunstein (2008) described a nudge as a change in choice architecture that steers behavior without forbidding options, and that is easy and cheap to avoid. That last clause is question three. A nudge you can't easily escape isn't a nudge by its authors' own standard.

In my practice, ethical nudging means three things: the person would agree with the goal, the mechanism would survive being explained, and walking away costs no more than walking in. Commitment devices are the deliberate exception, because the user asks for the exit to cost something and sets the price beforehand.

Loss framing is where these questions get tested hardest in fintech, as I discuss in [when loss aversion motivates and when it manipulates](/insights/loss-aversion-fintech-ux). Reward loops are next; read [how variable rewards and near-misses keep people spinning](/insights/variable-rewards-near-miss-ethics) before you add one. And conversational products bring new versions of old tricks, which is why [dark patterns in AI chatbots](/insights/dark-patterns-in-ai-chatbots) need the same five questions.

Put the five questions in your design-review template, right under the conversion target. The conversion numbers tell you whether a design works; the questions tell you whether you can live with how it works.
