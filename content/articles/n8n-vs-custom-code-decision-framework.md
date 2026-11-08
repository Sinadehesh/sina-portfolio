---
{
  "title": "n8n or Custom Code? A Decision Framework for Business Automations",
  "description": "n8n vs custom code: a practical decision framework for business automations, with eight questions, a comparison table and the hybrid pattern I trust most.",
  "topic": "automation",
  "order": 3,
  "date": "2026-11-08",
  "keywords": ["n8n vs custom code", "when to use n8n", "n8n vs python automation", "n8n decision framework", "low-code vs custom code automation"],
  "takeaways": [
    "Use n8n when an automation mostly connects systems and non-engineers must read it; use code when the logic is intricate, needs tests or runs at volume.",
    "Apply the 9 a.m. test: picture who opens the automation when it breaks on a Monday morning, and build it in the medium they can read.",
    "Retries are only safe on idempotent steps; a retried write that creates a duplicate deal is a bug in n8n and in code alike.",
    "The hybrid pattern often wins: n8n orchestrates and writes, a small code service validates and scores, and one explicit contract joins them."
  ],
  "faq": [
    {
      "q": "Is n8n better than writing Python scripts?",
      "a": "Neither is better in general. n8n is better when an automation mostly connects systems, changes often and must be readable by non-engineers. Python is better when the logic is intricate, needs unit tests, must be reviewed as code or runs at high volume. Many production automations combine them: n8n orchestrates and calls a small Python or TypeScript service for the hard parts."
    },
    {
      "q": "When should you not use n8n?",
      "a": "Avoid making it the home for intricate business logic, high-volume data processing, long-running stateful processes such as payment lifecycles, or anything your team must review line by line in pull requests. n8n can run code in a Code node, but a long script there is custom code without the tests, versioning and review that code normally gets."
    },
    {
      "q": "Can n8n handle errors and retries?",
      "a": "Yes. Individual nodes can retry on failure with a wait between attempts, and a workflow can name a separate error workflow that runs when something fails, for example to alert a person. Retries are only safe when the step is idempotent, meaning a repeat can't create a duplicate record or send a second email, so check that before you switch them on."
    },
    {
      "q": "What is the hybrid n8n and custom code pattern?",
      "a": "n8n handles the outer shape of an automation, such as triggers, routing, retries, credentials and human handoffs, while a small code service handles the inner core, such as validation, scoring or checking LLM output against a schema. n8n calls the service over HTTP and branches on an explicit status it returns. Writes to the system of record stay in n8n, where they are visible and can be gated."
    }
  ],
  "related": ["human-in-the-loop-crm-automation-n8n", "llm-confidence-thresholds-human-review", "automated-b2b-lead-qualification"],
  "caseStudies": ["workflow-automation-engine"]
}
---
Use n8n when an automation is mostly about connecting systems and the people who maintain it need to see how it works. Write custom code when the logic itself is the hard part: intricate validation, anything you'd want unit tests for, or volume that a visual tool makes awkward. For many business automations, the honest answer is both: n8n orchestrates, and small code services do the parts that need tests.

I've built on both sides of that line: n8n pipelines for my [Workflow Automation Engine](/work/workflow-automation-engine), and coded backends such as the roughly 20 API routes behind Costly's Stripe hold-and-capture lifecycle. Here's the framework I use to decide, so the choice is made on purpose rather than by habit.

## When should you use n8n?

n8n earns its place when the shape of a workflow matters more than its arithmetic:

- **It's mostly integration.** Trigger on a webhook, a schedule or an inbox, call a few APIs, write to a CRM, notify a channel. n8n ships nodes for many common services and a generic HTTP node for the rest.
- **Non-engineers need to read it.** A visual graph is documentation that can't drift out of date, because it is the program.
- **It changes often.** Swapping a field mapping or adding a branch takes minutes, with no deploy.
- **You want retries and error handling without writing them.** Nodes can retry on failure, and a separate error workflow can catch whatever falls through.
- **You want to own it.** n8n can be self-hosted, and workflows export as JSON.

## When is custom code the better choice?

Code wins when the logic is the product:

- **The rules are intricate.** Parsing, scoring and validation with many edge cases are easier to read, and far easier to test, as functions than as a chain of nodes.
- **You need tests you trust.** Unit tests, fixtures and type checks are native to code. In a visual tool, testing usually means running the workflow on sample data and looking.
- **Changes need review.** A code diff in a pull request is readable. A diff of exported workflow JSON mostly isn't.
- **Volume or latency matters.** Tight loops over large datasets, or strict response times, belong in a service you can profile.
- **The process is long-lived and stateful.** Money is my example. Costly's payments needed explicit states for holding, releasing and capturing a stake, plus an expiry sweep, and that is code territory.

## The eight questions I ask before choosing

No single question decides. The pattern of answers does.

| Question | Points to n8n | Points to code |
| --- | --- | --- |
| How often will it change? | Frequent tweaks to mappings and branches | Rarely, and with care |
| Who maintains it? | Ops or sales people who read graphs | Engineers who read diffs |
| How should it fail? | Retry, then alert a person | Precise recovery and safe replays |
| Where do secrets live? | n8n's credential store | Your existing secret manager |
| How will you test it? | Run it on sample data and inspect | Unit tests in CI on every change |
| What load will it see? | A steady trickle of events | Large batches or tight latency budgets |
| How much lock-in is acceptable? | Living on one platform is fine | The logic must stay portable |
| What's expensive here? | Engineering time to build and change | Running cost at scale |

Two rows deserve more words.

**Who maintains it** is the question I ask first. I call it the 9 a.m. test: picture the person who opens this automation when it breaks on a Monday morning, and build it in the medium they can read. An automation nobody can read is an incident with the date not yet set.

**How it should fail** is the question teams skip. A retry is only safe if the step is idempotent, meaning that running it twice can't create two deals or send two emails. That holds in n8n and in code alike, and it's the first bug I look for when I review any automation.

## The hybrid pattern: n8n orchestrates, code computes

Most real automations have a plain outer shape and a hard inner core, so I split them along that seam.

n8n owns the shape: triggers, routing, retries, credentials, notifications and human handoffs. A small code service owns the core: the parts that are easier to get right with types and unit tests, such as checking an LLM's output against a schema, applying business rules or scoring a record. n8n calls the service over HTTP and branches on what comes back.

Three rules keep the seam clean:

1. **One contract.** The service takes a defined input and returns a defined output, including an explicit status such as "ok", "needs review" or "failed", so n8n branches on a decision instead of parsing prose.
2. **No real logic in Code nodes.** n8n's Code node runs JavaScript or Python, which is handy and dangerous. A long script there is custom code without the tests, the review or the versioning.
3. **The service never writes to the system of record.** It decides; the orchestrator writes. Every write stays in the visible graph, where it can be gated and audited.

## How I chose for the Workflow Automation Engine

The engine captures CRM signal from sales calls and email threads, transcribes it, extracts deal fields with an LLM and writes them to Pipedrive, with a confidence gate on every write path. I chose n8n because the pipelines had to stay visual and maintainable, and auditable by people who don't write code.

That choice made the invariant, "the pipeline may be slow, never wrong," something you can see. Anyone opening the workflow can follow each path to Pipedrive and check that it passes through the gate. I explain the gate in [human-in-the-loop CRM automation with n8n](/insights/human-in-the-loop-crm-automation-n8n), and how to decide what counts as confident in [confidence thresholds for LLM automations](/insights/llm-confidence-thresholds-human-review).

## What mistakes should you look for in an automation?

Whichever side you choose, these are the problems I check for first:

- A Code node that has quietly grown into an application.
- No error workflow or alerting, so failures vanish silently.
- API keys pasted into request headers instead of stored as credentials.
- Retries on steps that aren't idempotent.
- One giant workflow doing five jobs, which nobody dares to change.

Lead intake is a good place to practice all of this, because speed matters there as much as accuracy. I walk through it in [automating B2B lead qualification](/insights/automated-b2b-lead-qualification).

If you're deciding this week, start with the 9 a.m. test and the failure question. They settle most cases before cost or performance come up. And when they point in opposite directions, that's usually your sign to build the hybrid.
