---
{
  "title": "Algorithm Aversion: Why One AI Mistake Costs So Much Trust",
  "description": "Algorithm aversion explained: why people abandon AI after seeing it err, why they sometimes prefer it, and five design moves that keep trust calibrated.",
  "topic": "ai-products",
  "order": 1,
  "date": "2026-11-08",
  "keywords": ["algorithm aversion", "algorithm aversion examples", "why people distrust AI recommendations", "algorithm appreciation", "AI trust product design"],
  "takeaways": [
    "Algorithm aversion is the tendency to abandon an algorithm after seeing it make a mistake, even when it still outperforms the human alternative.",
    "People often favor algorithmic advice before they see it fail. The real problem is the cliff after the first visible error, not distrust from the start.",
    "Letting people adjust an algorithm's output, even within tight limits, makes them more willing to keep using it.",
    "Defer when unsure: a system that hands ambiguous cases to a human avoids the visible errors that destroy trust fastest."
  ],
  "faq": [
    {
      "q": "What is algorithm aversion?",
      "a": "Algorithm aversion is the tendency to stop relying on an algorithm after seeing it err, even when it is more accurate than a human. Dietvorst, Simmons and Massey (2015) found that people who watched a forecasting model make mistakes became less likely to choose it over human forecasts, including their own, even though the model outperformed them."
    },
    {
      "q": "What are examples of algorithm aversion?",
      "a": "A driver who stops using a navigation app after one bad route, a shopper who ignores recommendations after one irrelevant suggestion, a team that drops an automated forecast after a single miss, or an applicant who rejects an automated credit decision as arbitrary. In each case, one visible error outweighs a long and mostly invisible record of being right."
    },
    {
      "q": "How do you reduce algorithm aversion in a product?",
      "a": "Set expectations before the first error, show the track record including misses, let people adjust outputs within limits, explain errors when they happen, and route uncertain cases to a human instead of guessing. Dietvorst, Simmons and Massey (2018) found that even a small ability to modify an algorithm's forecasts made people more willing to use it."
    },
    {
      "q": "Is algorithm appreciation the opposite of algorithm aversion?",
      "a": "In a sense. Logg, Minson and Moore (2019) found that people often weight advice more when told it comes from an algorithm than from a person. The two findings fit together: people can start out favoring algorithms and then abandon them after seeing errors. Good design aims between the two, at trust that matches the system's actual accuracy."
    }
  ],
  "related": ["ai-agent-delegation-trust", "explaining-ai-credit-decisions", "llm-psychometrics-personality-tests"],
  "caseStudies": ["oopscupid"]
}
---
Algorithm aversion is the tendency to abandon an algorithm after watching it make a mistake, even when it still outperforms the human alternative. One visible error can cost an AI product more trust than the same error from a person, because people seem to expect algorithms to be perfect and humans to learn.

That has a practical consequence. The most important design decisions in an AI product aren't about the average case. They're about the first visible error: what the user expected before it, what they see during it, and what they can do after it. Below is the research, why aversion and appreciation are two sides of the same curve, five design moves that keep trust calibrated, and how I handle the consistency problem in [OopsCupid](/work/oopscupid), my psychometric relationship-assessment platform.

## What is algorithm aversion?

Dietvorst, Simmons and Massey (2015) asked people to make forecasts and choose whether to rely on a statistical model or on human judgment, including their own. People who had seen the model perform, and therefore seen it err, became less likely to choose it, even when it outperformed the humans. People who hadn't seen it perform were more willing to rely on it.

The striking part is the asymmetry. Participants saw humans make mistakes too, but those mistakes didn't put them off humans in the same way. An error from the algorithm was treated as evidence the algorithm was broken. An error from a person was treated as a mistake.

## Why does one mistake cost so much trust?

My reading of the research, and of designing AI products, is that three expectations drive it:

1. **Perfection.** People expect a machine to be right every time, so any error looks like a defect rather than noise.
2. **Learning.** People assume a human will learn from a mistake and an algorithm will repeat it.
3. **Visibility.** Correct outputs are invisible; they simply look like the world. Errors are memorable.

None of these is irrational. They're reasonable heuristics applied to a system nobody can see inside, which means the design job is to change what people can see.

## Do people distrust algorithms by default?

No, and this part is easy to miss. Logg, Minson and Moore (2019) found the opposite pattern in many judgments: people weighted advice more when told it came from an algorithm than from a person. They called it algorithm appreciation.

The two findings fit together as a cliff. Before the first visible error, many users over-trust; after it, many abandon. Both are failures of calibration. The automation literature names them: misuse, when people rely on automation they shouldn't, and disuse, when they ignore automation they should rely on (Parasuraman & Riley, 1997). The goal, in Lee and See's (2004) terms, is appropriate reliance: trust that tracks how good the system actually is.

| Phase | Typical stance | Main risk | Design goal |
| --- | --- | --- | --- |
| Before any visible error | Appreciation | Over-reliance and automation bias | Set honest expectations |
| At the first visible error | Shock | Abandonment | Explain, show the record, offer control |
| After repeated use | Habit or avoidance | Complacency or disuse | Keep trust tied to evidence |

Complacency is the quiet version of over-reliance: people stop checking because the system has been right for a while (Parasuraman & Manzey, 2010).

## Five design moves that keep trust calibrated

**1. Set expectations before the first error.** Tell people what the system is good at, what it struggles with and, if you know, how often it's wrong. An error that was predicted is information. An error that wasn't is a betrayal.

**2. Give people a dial.** Dietvorst, Simmons and Massey (2018) found that letting people modify an algorithm's forecasts, even within tight limits, made them more willing to use it. In product terms: let users nudge a recommendation, reorder results, adjust a threshold or edit a draft. A little control buys a lot of tolerance for imperfection.

**3. Show the track record, misses included.** A system that only ever shows confident answers invites the perfection expectation. One that shows its record, including where it was wrong, teaches users what normal error looks like.

**4. Defer when unsure.** The cheapest error to recover from is the one that never reaches the user. In the [Workflow Automation Engine](/work/workflow-automation-engine), the CRM automation where I'm the product owner, a confidence gate sits on every write path: high-confidence extractions sync straight to Pipedrive, and ambiguous ones wait for a human. The invariant is "the pipeline may be slow, never wrong." Users forgive slowness on hard cases. A wrong record in their CRM is exactly the visible error that starts the cliff.

**5. Explain errors when they happen.** Say what went wrong, why, and what changed. "We misread the date in this email; we now ask you to confirm dates that appear twice" turns an error into evidence that the system learns, which answers the second expectation directly. (That example is hypothetical.)

## How OopsCupid handles the consistency problem

Inconsistency is a form of visible error. If the same answers produced a different result on a second try, users would conclude the system is broken, and they'd be right.

OopsCupid offers 15 free tests and scores responses into a six-axis psychometric profile. The scoring is deterministic: it's computed from the instrument, so the same answers always produce the same profile. A language model writes the narrative readout, but only around the scores it's given; it never decides them. That split keeps profiles consistent and auditable, and it keeps the most variable component away from the part users treat as a verdict.

It also guards against the opposite failure. Fluent, personal-sounding text can be believed even when it's generic, which is the Barnum effect (Forer, 1949). Generic results that feel like horoscopes were exactly the problem the six-axis design was meant to solve. Constraining the narrative to computed scores keeps any appreciation earned. I go into that design in [whether an LLM can score a personality test](/insights/llm-psychometrics-personality-tests).

## How do you measure trust in an AI feature?

Asking users "Do you trust the AI?" measures sentiment. Trust shows up in behavior: how often people accept, edit or override outputs; whether they come back after an error; whether reliance rises with accuracy or regardless of it. An override rate near zero can mean the system is excellent, or that people stopped checking. Look at whether overrides cluster where the system is actually weak.

Every AI product will make a visible mistake. The design question is whether that moment confirms the user's worst assumption about machines or teaches them how this one works. Plan for the first error before launch, and the second one becomes survivable. When people hand whole tasks to an agent, the same dynamics apply at larger scale, which I cover in [handing work to an AI agent](/insights/ai-agent-delegation-trust); for high-stakes decisions about people, see [explaining an AI credit decision](/insights/explaining-ai-credit-decisions).
