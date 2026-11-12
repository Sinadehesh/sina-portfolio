---
{
  "title": "Penalty Fee Psychology: How to Design a Fee People Accept as Fair",
  "description": "Penalty fee psychology: why some fees feel fair and others feel like a trap, a six-part fairness scorecard, and how Costly's self-priced deletion fee works.",
  "topic": "fintech",
  "order": 3,
  "date": "2026-11-08",
  "keywords": ["penalty fee psychology", "fair fees consumer perception", "breach fee design", "perceived fairness of fees", "self-set penalty commitment device"],
  "takeaways": [
    "A penalty feels fair when the payer chose it, saw it coming, could avoid it by doing what they intended, and can contest a wrong charge.",
    "Self-pricing changes what a fee means: a penalty you set while calm is a promise to yourself, not a fine from a company.",
    "The way back matters more than the amount. In Costly, 80% of each loss can be earned back by walking it off within 24 hours.",
    "Any company that keeps part of a penalty earns more when its users fail. Bound that conflict, disclose it, and track whether people actually redeem."
  ],
  "faq": [
    {
      "q": "What makes a fee feel fair to consumers?",
      "a": "In my view, six things: the person actively agreed to it, they could see it coming, its size is proportionate, they could avoid it by doing what they intended, there is a clear way to contest a mistake, and nobody quietly profits from their failure. Fees that arrive as surprises, feel out of proportion or can't be disputed are the ones people call a rip-off."
    },
    {
      "q": "What is a breach fee in a commitment contract?",
      "a": "A breach fee is what you pay if you break a commitment you made, such as deleting a commitment app before the agreed term ends. In Costly, users set this deletion fee themselves, anywhere from zero to €1,000, and choose a fixed 7- or 30-day term. Because they price it while calm, it works as a promise to their future self rather than an imposed penalty."
    },
    {
      "q": "Can a penalty fee be too small?",
      "a": "Yes. A trivial fee stops working as a commitment and starts working as a price: people pay it and carry on. A fee that is too large feels like a trap and invites disputes and resentment. Letting users choose within a stated range, and showing what their number means before they confirm it, is the most reliable way I know to land between the two."
    },
    {
      "q": "Are penalty fees in consumer apps legal in the EU?",
      "a": "It depends on the terms and the country, and this is not legal advice. For Costly, two questions are open and flagged for legal review before launch: how the breach fee is treated under EU unfair-terms rules, and how it interacts with the 14-day withdrawal right. Anyone designing a similar fee should involve a lawyer before the terms are final, not after launch."
    }
  ],
  "related": ["commitment-contracts-real-money-stakes", "loss-aversion-fintech-ux", "persuasion-or-dark-pattern-test"],
  "caseStudies": ["costly"]
}
---
A penalty fee feels fair when the person paying it chose it, saw it coming, could have avoided it by doing what they meant to do anyway, and can contest it when the system gets it wrong. Miss one of those and the same amount of money reads as a trap. Perceived fairness is mostly about process and meaning; the amount matters less than most teams think.

I've had to work this out in detail while designing the money mechanics of [Costly](/work/costly), a pre-launch app that charges real money for doomscrolling and asks users to sign a self-priced commitment contract. Below is the scorecard I use to judge any penalty, how Costly answers each line, and the questions that are still open.

## Why do some fees feel fair and others feel like a trap?

Losses loom larger than gains (Kahneman & Tversky, 1979), so any fee is felt more sharply than its face value. That's what makes a penalty work, and what makes it dangerous. A fee that surprises someone is felt twice: once as money lost, and again as a broken expectation.

My working test is what I call the friend test: would the person paying this fee defend it to a friend? Not like it — defend it. "I set that myself" and "I knew the rule and broke it" are defensible. "They charged me for something I didn't know about" is not. Every line of the scorecard below is a way of passing the friend test.

## The fair-fee scorecard

I check six dimensions. Each one is a question the payer asks, consciously or not.

| Dimension | The payer's question | Feels fair | Feels extractive |
| --- | --- | --- | --- |
| Choice | Did I agree to this? | Actively chosen, ideally priced by me | Buried in terms or pre-ticked |
| Foresight | Could I see it coming? | Visible at the moment of risk | Discovered on a statement |
| Proportion | Is the size reasonable? | Matched to what it protects | Large relative to the lapse |
| Way back | Could I undo it by doing the right thing? | A path that rewards the intended behavior | Pay, or nothing |
| Process | Can I contest a mistake? | A clear record and an easy dispute | Opaque, with no appeal |
| Incentive | Who gains when I fail? | Stated openly and bounded | Hidden, and growing with failures |

None of these require a lower fee. They require a better-designed one.

Costly answers the first three lines mostly by design. The user sets both the hourly rate and the deletion fee, which covers Choice and much of Proportion. A live meter overlaid on the app being scrolled shows the cost second by second, which covers Foresight: the charge is visible while it's being incurred, not discovered later. Self-pricing deserves a closer look, and the last three lines are where the hard design work is.

## How self-pricing changes what a fee means

The strongest fairness move I know is letting people price their own penalty. A fee set by a company is a fine. The same fee set by the user, while calm, is a promise.

People do choose constraints on their future selves. Ariely and Wertenbroch (2002) found that people impose costly deadlines on themselves to fight procrastination, although those self-set deadlines worked less well than evenly spaced ones set for them. Giné, Karlan and Zinman (2010) offered smokers a savings account they would forfeit if they failed a nicotine test. People signed up voluntarily, and forfeited money went to charity rather than to the bank — a detail I'll come back to.

In Costly, the user sets the deletion fee anywhere from €0 to €1,000 and picks a fixed 7- or 30-day term. Zero is allowed, deliberately: a fee you were free to set at nothing is a fee you chose. The Ariely and Wertenbroch result is also a warning that people don't always set their own terms well. So a good setting screen doesn't just accept a number; it shows what that number means in practice before the user confirms it. The rest of the contract — stake, timing, meaning, exit — is in [commitment contracts with real money](/insights/commitment-contracts-real-money-stakes).

## Why the way back matters more than the amount

A pure penalty only tells people what not to do. A penalty with a way back tells them what to do instead.

Costly's per-minute losses have one: walk 2 minutes for every minute scrolled, within 24 hours, and 80% of the loss comes back. Under the hood, each session uses two Stripe payments — a fifth is captured, and the rest is held for 24 hours and released when Health Connect verifies the walking goal — because Stripe cannot partially capture a payment and keep the rest on hold.

That payment detail is a fairness detail. A hold that gets released feels like nothing was lost. A charge followed by a refund is a loss followed by a wait. For someone who walks, the effective penalty is a fifth of the headline figure, and the rest of the stake did its job without ever being taken.

## Who gains when the user fails?

This is the uncomfortable line on the scorecard. Any product that keeps part of a penalty earns more when its users fail, and a commitment app can't pretend that conflict away. I don't think it can be designed out entirely, but it can be bounded and made visible:

- **Make the way back achievable,** so most of what is at stake can be earned back by doing the right thing.
- **Watch whether people actually redeem.** Costly's health metric is the redemption rate — the share of holds walked off. If it comes back low, Costly is a punishment app and needs rebalancing, whatever the other numbers say.
- **Say where the money goes.** The smoking study's charity design is one answer. Plain disclosure is the minimum.

## A fair fee needs a fair process

Automated penalties depend on measurement, and measurement can be wrong. Costly detects scrolling from screen time and phone movement instead of reading the screen, so it stays within Google Play's rules. That's a deliberate trade-off, and it means detection needs tuning on each phone, which is why hardening detection is the first block of Costly's 12-week plan.

The principle generalizes. Every automated charge needs a readable record of what was charged, when and why, and a cheap way to say "that wasn't me." People can accept losing a bet they understood. They don't accept being charged by a system they can't question.

## What's still open legally

Two questions are open for Costly and flagged for legal review before launch: how the breach fee is treated under EU unfair-terms rules, and how it interacts with the 14-day withdrawal right. I won't pretend either is settled.

EU consumer law already sets a floor that I treat as a design rule for any fee: additional payments beyond the main obligation need the consumer's express consent, and a pre-ticked box doesn't count (Consumer Rights Directive, 2011/83/EU). Whether and how that applies to a particular fee is a legal question, not a design one. This is not legal advice; if you're designing a penalty, involve a lawyer before the terms are final.

## Run the friend test on the real screen

Test the fee where users will meet it, not in the spec. Show the final screen to someone outside the team, at the size and in the place a user would see it, and ask them to explain it back. If they can say what the fee is, why it exists and how to avoid it, you've designed a commitment. If they can't, you've designed a fee.

And if you're tempted to make it bite harder, read [when loss aversion motivates and when it manipulates](/insights/loss-aversion-fintech-ux) and [the five-question test for dark patterns](/insights/persuasion-or-dark-pattern-test) first. A penalty earns its place only when the person paying it would choose it again.
