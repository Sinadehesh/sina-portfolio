---
{
  "title": "Confidence Thresholds for LLM Automations: When to Ask a Human",
  "description": "How to set an LLM confidence threshold that decides when a human reviews AI output: five checks to combine, a cost-of-error ladder, and how to widen it safely.",
  "topic": "automation",
  "order": 4,
  "date": "2026-11-08",
  "keywords": ["LLM confidence threshold", "when to use human review AI", "LLM extraction confidence score", "confidence gate LLM", "human review threshold AI automation"],
  "takeaways": [
    "Don't build a confidence gate on the model's opinion of itself; build it from checks you control: schema, evidence, consistency, agreement and business rules.",
    "Make hard checks a gate, not a vote: a perfectly formatted value with no evidence in the source is a likely invention, not mostly fine.",
    "Set thresholds per field by the cost of a mistake; a wrong note is an annoyance, while a wrong deal value distorts every forecast built on it.",
    "Start with everything in review, measure acceptance per field, and let fields graduate to automatic writes one at a time, with blind audits."
  ],
  "faq": [
    {
      "q": "What is a good confidence threshold for LLM output?",
      "a": "There is no single number. Set the bar per field by what a mistake costs: free-text notes can be written automatically once they pass basic checks, while deal values, owners or anything customer-facing should need verbatim evidence and agreement across two passes, or a human. Start with everything going to review and lower the bar only for fields reviewers consistently accept unchanged."
    },
    {
      "q": "Are LLM self-reported confidence scores reliable?",
      "a": "Not on their own. A confidence rating the model writes is generated text, shaped by the prompt, and it can be high when the model is fluently wrong. Token probabilities measure how likely the wording was, not whether a value is true. Use them as weak signals at most, behind checks you control: schema validation, evidence in the source, consistency and business rules."
    },
    {
      "q": "When should AI output go to human review?",
      "a": "Whenever a hard check fails: the output doesn't match the schema, the value can't be found in the source, sources disagree, or a business rule is broken. Irreversible or customer-facing actions should go to a person too. Beyond that, route by cost of error: the more a wrong value would cost, the stronger the evidence it needs before it is written without a human."
    },
    {
      "q": "How do you measure LLM extraction confidence?",
      "a": "Build it from independent checks rather than asking the model. Validate the output against a schema, require the model to quote the passage each value came from and verify that the passage exists, compare values across sources, run a second extraction for high-stakes fields and apply business rules. Treat failed hard checks as a gate, not as one score among several."
    }
  ],
  "related": ["human-in-the-loop-crm-automation-n8n", "automation-bias-human-review-design", "claims-automation-customer-trust"],
  "caseStudies": ["workflow-automation-engine"]
}
---
An LLM automation should ask a human whenever one of your own checks fails, or whenever a wrong value would cost more than a quick review. That line is your LLM confidence threshold, and it should be built from checks you control and set field by field, not taken from the model's opinion of itself.

That's how I think about the confidence gate in my CRM automation engine, where an LLM extracts deal fields from sales calls and emails and nothing ambiguous reaches Pipedrive without a human. The method below is general. It works for invoices, support tickets, claims or any extraction where wrong output gets acted on.

## Why can't you trust an LLM's own confidence score?

Ask a model to rate its confidence and you'll get a number, but that number is generated text like everything else it writes. It's shaped by the prompt and the phrasing. It can be high exactly when the model is fluently wrong. And it can shift when the model version changes.

Where an API exposes token probabilities, they help a little. But they measure how likely the wording was, not whether the extracted value is true. A model can be very sure it is writing a well-formed date and still have picked the wrong one.

So I treat self-reported confidence as a weak signal at most. The real work is done by checks that don't depend on the model grading its own homework.

## What should a confidence gate check?

A gate worth trusting combines five kinds of check. Each one catches a different failure.

| Check | What it asks | Example on a deal value |
| --- | --- | --- |
| Shape | Does the output match the schema: types, required fields, allowed values? | A number with a currency code, not "about twelve" |
| Evidence | Does the value appear in, or follow directly from, the source? | The amount appears in the sentence the model quoted |
| Consistency | Do different sources agree? | The call and the follow-up email name the same amount |
| Agreement | Does a second, independent pass extract the same value? | Two different prompts, same answer |
| Rules | Is it plausible for your business? | Inside your normal deal range, and not a sudden halving |

Evidence is the check I'd add first if you have none. Ask the model to return, for each field, the exact passage it relied on, then verify in code that the passage really exists in the source. It's cheap and deterministic, and it catches the most dangerous failure: a plausible value the conversation never contained.

Agreement costs a second model call, so it's worth reserving for fields where a mistake is expensive.

## Why shouldn't you average the checks?

It's tempting to turn each check into a score, average them and compare the result with a threshold. Don't. An average lets strong signals hide a failed one. A perfectly formatted value with no evidence in the source isn't "mostly fine"; it's a likely invention.

My rule is that hard checks are a gate, not a vote. If a field fails shape, evidence, consistency or a business rule, it goes to review, whatever else looks good. Agreement becomes a hard check for expensive fields. Self-reported confidence never overrides anything; at most, it can send an otherwise clean item to review.

## How do you set the threshold for each field?

Not every field deserves the same bar. A wrong note is an annoyance; a wrong deal value distorts a forecast; a wrong owner sends a customer to the wrong person. So I'd sort fields onto what I call the cost-of-error ladder:

1. **Free text.** Summaries and notes. Write automatically once the shape check passes, labeled as machine-written.
2. **Routine facts.** Contact details and next-step dates. Write automatically only if every hard check passes.
3. **Decision fields.** Deal value, stage, close date, owner. Write automatically only with verbatim evidence and agreement across two passes; otherwise, review.
4. **Irreversible or customer-facing actions.** Sending an email, deleting a record, changing what someone is charged. Always a human, until you have strong evidence it's safe to change that.

The ladder is a statement about asymmetric errors. A false hold costs a reviewer a short look. A false write costs the cleanup, plus every decision made on the bad value before anyone noticed. When the second cost is many times the first, you can afford to send plenty of clean items to review to stop a single wrong write, and you should.

## A worked example: one email, three fields

Imagine a hypothetical follow-up email after a sales call. It proposes speaking again on Thursday, states a budget, mentions that procurement quoted a different figure last week, and says the client is "close to a decision". Here's how the gate treats each field:

| Field | What the checks find | Decision |
| --- | --- | --- |
| Next-step date | "Thursday" resolves to a valid date, and the supporting sentence is in the email | Routine fact, all hard checks pass: write it |
| Deal value | Two different figures in the same thread | Consistency fails: hold, showing both sentences |
| Stage | "Close to a decision" is in the text, but a second pass maps it to a different stage | Decision field without agreement: hold |

One field writes itself; two wait. The reviewer then sees a single item with the supporting sentences and a reason for each hold, which is far easier to act on than a vague "low confidence" flag.

## How do you widen the threshold safely?

I'd never launch a gate at its final settings. This order works better:

1. **Shadow mode.** Run extraction without writing anything, and compare the output with what people entered by hand.
2. **Everything to review.** At first, every field goes through a human. It's slower, but it builds the evidence you need.
3. **Measure per field.** Track how often reviewers accept unchanged, edit or reject, and which check triggered each hold.
4. **Graduate fields one at a time.** When a field is accepted unchanged, consistently, over a meaningful sample, let its clean extractions write straight through.
5. **Keep auditing the automatic writes.** Sample them regularly, and check them blind, without showing the reviewer the model's answer first.

Step five matters because acceptance rates can lie. Reviewers who approve by habit make a field look reliable when it isn't, a version of the complacency and automation bias that Parasuraman and Manzey (2010) describe. I cover the countermeasures in [why reviewers rubber-stamp AI](/insights/automation-bias-human-review-design).

## How this works in my CRM engine

In the [Workflow Automation Engine](/work/workflow-automation-engine), a confidence gate sits on every write path to Pipedrive. High-confidence extractions sync straight through; ambiguous ones wait in a review queue, and no ambiguous write happens without human approval. The invariant is "the pipeline may be slow, never wrong," and it settles most threshold arguments before they start: when in doubt, hold. The full pipeline is in [human-in-the-loop CRM automation with n8n](/insights/human-in-the-loop-crm-automation-n8n).

The higher the stakes, the stronger the case for gating. Insurance claims are a good example, which I look at in [automating claims without breaking trust](/insights/claims-automation-customer-trust).

If you take one thing from this, make it a list: for each field your automation writes, note what a wrong value would cost and who would notice. That list is your threshold policy. The checks are just how you enforce it.
