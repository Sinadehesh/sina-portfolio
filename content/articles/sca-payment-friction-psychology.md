---
{
  "title": "Good Friction, Bad Friction: Strong Customer Authentication and Trust",
  "description": "Strong customer authentication UX: why some payment friction builds trust and some drives abandonment, plus a three-part test for designing SCA steps.",
  "topic": "fintech",
  "order": 8,
  "date": "2026-11-08",
  "keywords": ["strong customer authentication UX", "PSD2 SCA friction conversion", "payment friction psychology", "3-D Secure UX", "good friction vs bad friction"],
  "takeaways": [
    "Friction builds trust when people can read its purpose; the same step without explanation reads as something going wrong, and people leave.",
    "Good payment friction is readable, right-sized and recoverable: people know why it's there, it matches the risk, and failure has a way forward.",
    "Strong customer authentication under PSD2 confirms payments with two of three factors: something you know, something you have, something you are.",
    "Don't stack your own confirmations on top of the bank's check. One meaningful step beats three that look the same."
  ],
  "faq": [
    {
      "q": "What is strong customer authentication?",
      "a": "Strong customer authentication (SCA) is the requirement, introduced by the EU's second Payment Services Directive (Directive (EU) 2015/2366), to confirm electronic payments with two of three independent factors: knowledge, possession and inherence, meaning something you know, have or are. Exemptions are handled by payment providers. For online card payments, it often appears as an approval in the customer's banking app."
    },
    {
      "q": "Does strong customer authentication hurt conversion?",
      "a": "It can, when the step arrives unexplained, breaks the context of the purchase or fails without a way to recover. Done well, it can also reassure people that a payment is protected. The design principle holds across checkouts: friction people understand and expect tends to cost far less than friction that surprises them, so explaining the step is part of the step."
    },
    {
      "q": "What is good friction in payments?",
      "a": "Good friction is a step whose purpose is obvious and proportionate to the risk, such as approving a large transfer in your own bank's app or confirming a new payee. Bad friction is effort without meaning: repeated confirmations, unexplained redirects, codes that expire with no resend. The test is whether the user would choose the step if they understood it."
    },
    {
      "q": "How should a checkout handle authentication failures?",
      "a": "Assume they will happen: the phone is in another room, the banking app is logged out, the code arrives late. Keep the cart and entered details, explain in one sentence what went wrong, offer a retry and an alternative payment method, and return people to the same place in the flow. A recoverable failure is an inconvenience; an unrecoverable one is a lost customer."
    }
  ],
  "related": ["positive-friction-ux-design", "kyc-onboarding-drop-off-psychology", "trust-signals-unknown-brand"],
  "caseStudies": ["costly"]
}
---
Strong customer authentication adds a step to many online payments, and whether that step costs you customers or earns their trust depends mostly on one thing: whether people understand what it's for. Friction that is explained, expected and proportionate reads as protection. The same friction arriving unannounced, in an unfamiliar window, reads as something going wrong.

That's why I think of SCA as a natural experiment in friction. Across the EU, many online payments gained an extra step, and the lesson for product teams isn't "remove friction." It's that friction carries a meaning, and you can design the meaning. Below is how I think about it, a three-part test for any friction step, and what designing the payment lifecycle for [Costly](/work/costly) taught me about money moving through states people need to understand.

## What is strong customer authentication?

The EU's second Payment Services Directive, PSD2 (Directive (EU) 2015/2366), introduced strong customer authentication for electronic payments. A payment has to be confirmed with two of three independent factors:

- Knowledge: something you know, like a PIN or a password.
- Possession: something you have, like your phone.
- Inherence: something you are, like a fingerprint or your face.

Exemptions exist, and they are handled by payment providers, which is one more reason not to build your own logic around them. For online card payments, the check often appears as an approval in the customer's banking app or a one-time code, typically through a protocol called 3-D Secure. This is a design article, not legal advice; your payment provider and counsel are the right sources for what applies to your flows.

## Why can friction increase trust?

People judge risk partly by how much control they feel they have (Slovic, 1987). An approval in your own bank's app, showing the merchant and the amount, is a moment of control: nothing happens until you say yes. Done well, it tells the customer "this payment is protected," and that is a trust signal at exactly the moment trust is needed.

Friction turns harmful when it's ambiguous. People shy away from options whose outcomes feel unknowable more than from options with known risks (Ellsberg, 1961). An unexplained redirect to an unfamiliar page, a blank loading screen or a code request that doesn't say who's asking all create ambiguity at the point of payment, and the safest-feeling choice becomes leaving.

## The three-R test for friction

Before I add or keep any friction step, I check three properties. Good friction has all three.

| Property | The question | Good friction | Bad friction |
| --- | --- | --- | --- |
| Readable | Does the user know why this step exists? | A note before the handoff: "Your bank will ask you to approve this payment" | A redirect with no warning and no branding |
| Right-sized | Does the effort match the risk? | Strong checks for a new payee or a large amount | The same heavy check for every tiny action |
| Recoverable | If it fails, is there a way forward? | Retry, an alternative method, the cart kept | A timeout, an error code, an empty cart |

Readable friction answers the doubt before it forms. Right-sized friction respects people's time. Recoverable friction respects the fact that real life interrupts: the phone is in another room, the banking app has logged out, the code arrives late.

This is the payments version of [positive friction](/insights/positive-friction-ux-design): remove friction from the path the user wants, and keep it only where it protects them.

## How do you design an SCA step people trust?

Here is the sequence I'd follow on any checkout.

1. **Announce it.** One line before the handoff: "Your bank may ask you to approve this payment in its app." Expected friction is much less alarming than surprise friction.
2. **Keep the context.** Show the merchant name and amount the customer will see on the bank's side, keep the cart visible, and return them to the same place afterward.
3. **Let the provider handle exemptions.** Deciding when authentication can be skipped is the payment provider's job, and home-made rules create failures that look like your fault.
4. **Don't stack.** If the bank is about to authenticate, remove your own "Are you sure?" dialog at that moment. Confirmations that look alike train people to tap through all of them.
5. **Design the failure path first.** Keep entered details, explain the failure in one sentence, and offer a retry and an alternative method.
6. **Confirm in plain words.** After success, say what was paid, to whom, and what happens next.

## What designing Costly's payment lifecycle taught me

Costly charges real money for doomscrolling, so at its core is the full flow of holding money and giving it back through Stripe: a stake can be held, released or captured. Each session uses two separate Stripe payments, because Stripe cannot partially capture a payment and keep the rest on hold. A fifth of the loss is captured; 80% is held for 24 hours and released if the user walks it off. An expiry sweep deals with holds whose window has closed.

The lesson for friction design: money in a held state is invisible and confusing unless you name it. A card hold typically shows up in the customer's banking app as a pending payment, so the product has to explain it first, in its own words. Otherwise a protective mechanism, where the money is held rather than taken, reads as a charge nobody expected.

There's a second lesson. Costly charges on an automated trigger rather than at a checkout, which concentrates the meaningful moment at setup, where a person agrees to the stake, the rate and the rules. Friction there isn't a cost to minimize. It's the step that makes every later charge legitimate. Costly is pre-launch with no users, so these are principles I've designed for, not results I can report.

## Where does friction belong in a payment flow?

A simple map I use: put friction where the customer would want a second look, and nowhere else.

- New payee, large amount, unfamiliar device: friction that protects. Keep it readable.
- Routine, low-risk payments: let the payment provider decide when an exemption applies.
- After a failed authentication: zero added friction. This is the moment to help.

The goal was never a frictionless checkout. It's a checkout where every bit of friction is doing a job the customer can see. If you're auditing a payment flow, list each step and ask the three-R questions out loud; the steps that fail aren't security, they're noise, and noise is what people abandon. The same thinking applies earlier in the journey to [KYC onboarding](/insights/kyc-onboarding-drop-off-psychology), and if you're an unfamiliar brand asking for card details, pair it with [trust signals for a brand nobody knows yet](/insights/trust-signals-unknown-brand).
