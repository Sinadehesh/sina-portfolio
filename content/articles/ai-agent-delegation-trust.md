---
{
  "title": "Handing Work to an AI Agent: The Psychology of Delegation and Trust",
  "description": "AI agent trust, explained: why people over- and under-trust agents, a five-rung delegation ladder, and the design moves that make handing work to AI safe.",
  "topic": "automation",
  "order": 7,
  "date": "2026-11-08",
  "keywords": ["AI agent trust", "delegating tasks to AI agents", "human AI delegation psychology", "trust in automation", "AI agent human oversight design"],
  "takeaways": [
    "Trust an AI agent exactly as much as it has earned for a specific task; most delegation failures come from checking everything or checking nothing.",
    "People swing from algorithm appreciation to aversion after one visible error, so design agents whose mistakes are small, visible and recoverable.",
    "Treat delegation as a ladder (suggest, prepare, act and report, act within limits, act quietly) and climb it one rung at a time, on evidence.",
    "In my view, an agent that says it isn't sure earns more lasting trust than one that always sounds confident."
  ],
  "faq": [
    {
      "q": "How much should you trust an AI agent?",
      "a": "As much as it has earned for that specific task, and no more. Trust in automation works best when it is calibrated to what the system can actually do (Lee & See, 2004). Start agents on reversible, low-stakes work with reports you can check, and widen their autonomy one step at a time as the evidence builds."
    },
    {
      "q": "Why do people stop trusting AI after one mistake?",
      "a": "Research on algorithm aversion shows that people lose confidence in an algorithm faster than in a human who makes the same mistake, and often abandon it even when it outperforms them (Dietvorst, Simmons & Massey, 2015). Letting people adjust the output helps (Dietvorst, Simmons & Massey, 2018), and so, I'd argue, does an agent that flags its own uncertainty before it errs."
    },
    {
      "q": "What tasks should you delegate to AI agents first?",
      "a": "Start with tasks that are reversible, narrow and easy to check: drafting, summarizing, sorting, or preparing actions a person then approves. Keep anything irreversible or customer-facing, such as payments, deletions or sending messages, behind a preview and a human click until the agent has a track record on that specific task."
    },
    {
      "q": "How do you design an AI agent people can trust?",
      "a": "Scope its permissions to the task, make actions reversible by default, preview anything irreversible, have it report what it did, skipped and wasn't sure about, and have it escalate when uncertain. These moves don't make the agent smarter; they make its mistakes small, visible and recoverable, which is what calibrated trust needs."
    }
  ],
  "related": ["human-in-the-loop-story-game", "algorithm-aversion-product-design", "llm-confidence-thresholds-human-review"],
  "caseStudies": ["the-loop", "workflow-automation-engine"]
}
---
Trusting an AI agent well means trusting it exactly as much as it has earned for a specific task, no more and no less. Most delegation goes wrong through miscalibration: people either check everything the agent does, so nothing is saved, or check nothing, so mistakes pile up out of sight.

Agents are new, but the psychology of delegating to machines isn't. Research on trust in automation explains why both failures happen and points to design choices that help people land in between. Here's what that research says, the ladder I use to decide how much to hand over, and the design moves that make delegation safe.

## Why is delegating to an AI agent different from using a tool?

A tool does one thing when you tell it to, and you see the result. An agent takes a goal, breaks it into steps and acts on several of them before you look. That changes three things.

- **You see outcomes, not steps.** An error in the middle of a chain stays invisible until it surfaces downstream.
- **Errors compound.** A wrong assumption at step two shapes everything after it.
- **You lose the thread.** The less you do a task yourself, the less you notice when it's done badly. Monitoring something that is usually right is hard, attention drifts, and Parasuraman and Manzey (2010) describe how this turns into complacency.

## What does research on trust in automation say?

Three findings shape how I design for delegation.

**Trust should be calibrated, not maximized.** Lee and See (2004) frame the goal as appropriate reliance: trust that matches what the system can actually do, task by task. Earlier, Parasuraman and Riley (1997) named two ways it fails: misuse, relying on automation when you shouldn't, and disuse, ignoring it when you should rely on it.

**People swing between appreciation and aversion.** Logg, Minson and Moore (2019) found that people often weight advice more heavily when they believe it comes from an algorithm rather than a person. Yet Dietvorst, Simmons and Massey (2015) showed that people lose confidence in an algorithm faster than in a human after seeing it make the same mistake, and often abandon it even when it outperforms them. Trust in an agent can be generous at first and brittle after its first visible error.

**A little control goes a long way.** In later work, Dietvorst, Simmons and Massey (2018) found that people were more willing to use an imperfect algorithm when they could modify its output, even slightly. A small, real ability to intervene changes how handing over feels.

## What is the delegation ladder?

I don't treat delegation as on or off. I treat it as a ladder, and each task climbs one rung at a time, on evidence.

| Rung | The agent | The person | Move up when |
| --- | --- | --- | --- |
| 1. Suggest | Drafts or recommends | Does the work, using the draft | Drafts are usually usable as they are |
| 2. Prepare | Sets up the action | Reviews it and presses go | Reviews rarely change anything |
| 3. Act and report | Acts on reversible steps | Reads a report that shows the work | Reports rarely reveal problems |
| 4. Act within limits | Acts inside scoped permissions and budgets | Handles escalations | Escalations are rare and well judged |
| 5. Act quietly | Acts without reporting each step | Audits samples | Reserve for trivial, reversible, low-cost work |

Two rules keep the ladder honest. A task climbs one rung at a time, never skipping one because a demo went well. And a serious error moves it down a rung or two while you find out why. That's a healthier response than the all-or-nothing abandonment Dietvorst and colleagues observed, and it keeps the agent useful while trust is rebuilt.

## Five design moves that make delegation safe

1. **Scope the permissions.** Give the agent what the task needs and nothing more. A small blast radius makes a higher rung affordable.
2. **Preview anything irreversible.** Sending, paying, deleting and publishing get a preview and a human click until the task has earned its way up.
3. **Make reversible the default.** Drafts instead of sends, soft deletes instead of hard ones, an undo window. Reversibility is what lets you trust early.
4. **Ask for reports that show the work.** Not "Done", but what the agent did, what it skipped and what it wasn't sure about, with the evidence for each. A report that hides uncertainty trains people to stop reading.
5. **Escalate when unsure.** An agent that says "I'm not sure, please check this" is, in my view, more trustworthy over time than one that always sounds confident. Where to draw that line is its own design problem, which I cover in [confidence thresholds for LLM automations](/insights/llm-confidence-thresholds-human-review).

## What a story game taught me about agent reports

In [The Loop](/work/the-loop), a story game I wrote and designed about being the human in the loop between 2027 and 2030, each day opens with a queue of mail, gigs, ratings and agent reports, and every scam has one tell. Rent, internet bills and hardware prices that follow RAM make every shortcut tempting, including handing more work to agents, which comes at a cost.

Designing it made one thing vivid: the danger isn't a single bad decision to delegate. It's that reading every report carefully takes time, and when money is tight, skimming makes sense on the day. Delegation fails slowly. I explore that drift in [what a story game taught me about being the human in the loop](/insights/human-in-the-loop-story-game).

## How I apply this in real automation

My [Workflow Automation Engine](/work/workflow-automation-engine) is delegation in a narrow form: it reads sales calls and email threads, extracts deal fields with an LLM and writes them to Pipedrive. It doesn't sit on a single rung. Clear extractions act and sync straight through; ambiguous ones stop and wait in a review queue, and nothing ambiguous is written without a human. The design bet behind it was simple: people trust automation that defers when it's unsure.

## Before you hand over your next task

Ask four questions:

- **Can it be undone?** If not, keep a human click in front of it.
- **How far can a mistake travel?** Narrow the permissions until the answer is "not far".
- **Will I see the work, or only the result?** If only the result, ask for reports that show the steps.
- **Will I notice if it starts going wrong?** If not, schedule spot checks now, while you still care.

Why one visible mistake costs so much is a topic of its own, covered in [algorithm aversion: why one AI mistake costs so much trust](/insights/algorithm-aversion-product-design). The practical upshot is the same: delegation isn't a switch you flip once. It's an arrangement you adjust as evidence comes in, and the agents people keep using will be the ones that make that adjustment easy.
