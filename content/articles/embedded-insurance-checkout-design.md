---
{
  "title": "Embedded Insurance at Checkout: Choice Architecture Without Regret",
  "description": "Embedded insurance at checkout, designed without regret: the psychology of add-on insurance, why pre-ticked boxes fail, and how to build an honest opt-in offer.",
  "topic": "insurance",
  "order": 5,
  "date": "2026-11-08",
  "keywords": ["embedded insurance checkout", "add-on insurance psychology", "insurance at point of sale design", "opt-in add-on insurance", "pre-ticked boxes insurance"],
  "takeaways": [
    "An honest embedded insurance offer is opt-in, explains the cover in one sentence, shows the price per period and makes 'no' as easy as 'yes'.",
    "Add-on cover feels cheap at checkout because a small cost folded into a large purchase hurts less than the same amount paid on its own.",
    "Apply the two-regret test: would the customer be glad they said yes when they claim, and glad they said no when they read their statement?",
    "In the EU, payments beyond the main purchase need the consumer's express consent, and a pre-ticked box doesn't count, so design the offer as a real choice."
  ],
  "faq": [
    {
      "q": "What is embedded insurance?",
      "a": "Embedded insurance is cover offered inside another purchase or service, usually at checkout: device protection with a phone, cancellation cover with a trip, extended cover with an appliance. Its strength is timing, because the risk is easy to picture at the moment of purchase. Its weakness is the same moment: a tired buyer, a vivid risk and a price that looks small next to the purchase make it easy to sell cover people don't need."
    },
    {
      "q": "Are pre-ticked insurance boxes allowed in the EU?",
      "a": "Under the EU Consumer Rights Directive, any payment beyond the main purchase needs the consumer's express consent, and a pre-ticked box does not count as consent. In practice, add-on insurance at checkout should stay unselected until the customer actively chooses it. Other rules, including insurance distribution requirements, may also apply depending on how the sale is structured. This is not legal advice."
    },
    {
      "q": "Why do people buy add-on insurance at checkout?",
      "a": "Several forces meet at the payment step. The product is vivid in the buyer's mind, so its loss is easy to imagine; a small add-on price feels minor next to the purchase price, as mental accounting predicts; and at the end of a checkout people want to be done, so whatever is presented as the default tends to stay. None of this makes the cover bad, but the moment favors the seller."
    },
    {
      "q": "How do you design an honest add-on insurance offer?",
      "a": "Start unselected. Describe the cover in one plain sentence, name the main exclusion or excess, show the price per period and the total, and give 'Add cover' and 'No thanks' equal weight with neutral wording. Mention that the customer may already be covered elsewhere, link to the full terms, and make cancellation easy. Then track regret signals, such as early cancellations, alongside take-up."
    }
  ],
  "related": ["why-people-underinsure-psychology", "pricing-page-choice-architecture", "persuasion-or-dark-pattern-test"],
  "caseStudies": []
}
---
The best embedded insurance offer at checkout is one the customer would be glad to have accepted if something goes wrong, and glad to have declined if nothing does. In practice that means an opt-in offer that states the cover in one sentence, shows the price per period, and makes refusing as easy as accepting. Pre-ticked boxes fail that test, and in the EU they don't count as consent for an additional payment anyway.

I've never worked for an insurer or for a retailer selling add-on cover. This is a design analysis from someone who builds funnels and studies how people decide. Embedded insurance is choice architecture in its purest form: the same product can be a useful offer or a trap, depending only on how the choice is built.

## Why does add-on insurance sell so well at checkout?

Several forces meet at the payment step, and most of them favor the seller.

**The risk is vivid.** The buyer is about to own the exact thing that could break. Johnson, Hershey, Meszaros and Kunreuther (1993) found that people would pay more for insurance against a vivid cause than for broader cover that included it. Narrow, vivid cover is easy to sell for exactly that reason.

**The price feels small.** Thaler's (1985) work on mental accounting describes how people combine losses: a small extra cost folded into a large one hurts less than the same amount paid on its own. Next to the purchase price, the add-on barely registers.

**People want to be done.** By the payment step, the buyer has made many small decisions and wants to finish. Whatever the screen presents as the default tends to survive.

None of this makes the cover bad. It means the moment does a lot of the selling, which is why the design carries ethical weight.

## Opt-in or opt-out: what do defaults do to add-ons?

Defaults are among the strongest forces in choice architecture. Johnson and Goldstein (2003) showed how much organ-donor registration depends on whether people must opt in or opt out, and Thaler and Sunstein (2008) built much of Nudge on the observation that someone always designs the default. A pre-ticked add-on is a default that charges money.

It also has a name. Brignull (2010) coined "dark patterns" for interfaces that lead people into things they didn't mean to do, and slipping an extra item into a basket is a textbook case. Mathur and colleagues (2019) found sneaking among the dark-pattern categories in their crawl of about 11,000 shopping websites.

In the EU, the Consumer Rights Directive requires the consumer's express consent for any payment beyond the main obligation, and pre-ticked boxes don't count. Depending on how the sale is structured, insurance distribution rules may apply as well, including the demands-and-needs step I describe in [the demands-and-needs test as a UX problem](/insights/demands-and-needs-test-digital-ux). This is not legal advice; check the rules for your product and market.

## The two-regret test

Every add-on offer can produce two regrets. The regret of buying: paying for cover the customer didn't understand, didn't need or already had. And the regret of declining: the loss happens and the customer wishes they had said yes.

A manipulative design minimizes only the second regret, because that's the one that sells. An honest design tries to minimize both. So the test I'd run on any checkout offer is two questions:

1. **If this customer claims in six months, will the cover do what the offer led them to believe?** If the main exclusion would surprise them, the offer fails.
2. **If this customer never claims, will they feel they chose it, or that it happened to them?** If they'd discover it on their bank statement, the offer fails.

## Anatomy of an honest add-on offer

| Element | Honest version | Manipulative version |
| --- | --- | --- |
| Starting state | Unselected | Pre-ticked |
| Cover | One sentence: what's covered, and for how long | A badge: "Full protection" |
| Limits | The main exclusion and the excess, in one line | Only in the terms |
| Price | Per period and in total | Per day, to look tiny |
| Choices | "Add cover" and "No thanks" with equal weight | "No, I'll take my chances" in small gray text |
| Context | "You may already be covered by your home or card insurance" | Silence |
| Afterwards | Easy to cancel, cover document sent by email | Cancellation by phone only |

The "already covered" line is the one sellers resist most. I'd keep it anyway. A customer who finds out later that they paid twice for the same cover doesn't just cancel the add-on; they stop trusting the checkout.

## Where in the checkout should the offer go?

Placement is a design decision with ethical weight of its own. There are roughly four slots:

| Slot | What the buyer is doing | My view |
| --- | --- | --- |
| Product page | Still evaluating the product | Fine for a short mention, so the offer isn't a surprise later |
| Basket | Reviewing what they're buying | The best place for the real choice, with room to read |
| Payment step | Trying to finish | The worst place to introduce a new decision |
| After purchase | Calm, with the product secured | Low pressure, if the offer stays open for a while |

My bet is that offers made in the basket or after purchase win fewer impulse sales and lose fewer customers to regret. It's a hypothesis, so test it on your own checkout rather than taking my word for it.

## How should you frame the risk?

Concretely, but in proportion. A sentence like "if the screen breaks in the first two years, we repair or replace it" is concrete. A shattered-phone photo with a warning icon is fear. Sunstein (2002) described how, when a risk stirs strong emotion, people focus on how bad the outcome would be and lose track of how likely it is. A disaster image buys attention at the cost of judgment.

If you have honest data on how often the event happens, say it plainly. If you don't, describe the event and what the cover does, not the dread. I make the broader case in [why people under-insure](/insights/why-people-underinsure-psychology): vivid framing is legitimate when it brings an invisible risk into view, and manipulative when it inflates a visible one.

## What I'd do on Monday

If I owned an embedded insurance checkout, this would be the first week:

1. **Screenshot the offer** on mobile and desktop and check its starting state.
2. **Count the words** it takes to say what's covered. If it's more than one sentence, rewrite it.
3. **Time the refusal path.** "No thanks" should take one tap, exactly like "Add".
4. **Pull the regret signals:** cancellations shortly after purchase, complaints about unexpected charges, and claims declined on exclusions the offer never mentioned.
5. **Test the honest version** against the current one, measuring regret signals alongside take-up.

The principle I use in my own funnels applies here too: one clear primary action per screen. In the funnel I built for [Optimolds](/work/optimolds), that action is a free feasibility check. At checkout, the primary action is buying the product; the add-on should be a visible, fair second choice, never a hidden first one. For the pricing side of the same problem, see [pricing page psychology](/insights/pricing-page-choice-architecture).

Take-up is the number everyone watches. Regret is the number that decides whether customers trust your checkout next time. Design for both, and the cover you sell will be cover people are glad they have, which I think is the only version of embedded insurance that lasts.
