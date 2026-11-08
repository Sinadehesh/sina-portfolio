---
{
  "title": "Curriculum Gap Analysis: Personal Learning Paths From Two Data Sources",
  "description": "Curriculum gap analysis in practice: compare a canonical curriculum with what a program actually teaches, flag the gaps and turn them into a learning path.",
  "topic": "ai-education",
  "order": 5,
  "date": "2026-11-08",
  "keywords": ["curriculum gap analysis", "personalized learning path engineering", "learning gap analysis tool", "curriculum mapping heatmap", "engineering curriculum gaps"],
  "takeaways": [
    "Curriculum gap analysis puts two sources on one grid — what a field expects and what a program actually teaches — so the difference becomes visible.",
    "Score coverage as a weight from 0 to 1 rather than taught or not taught, or partial coverage disappears from the map.",
    "The gap is the product: a personal map of what a learner still needs is more useful than another catalog of courses.",
    "AI can draft the mapping from syllabi, but a person should confirm every cell, with the evidence on screen, before a learner acts on it."
  ],
  "faq": [
    {
      "q": "What is curriculum gap analysis?",
      "a": "Curriculum gap analysis compares a reference curriculum — what a field considers core — with what a specific program actually teaches, topic by topic. The difference is the gap. In Passway, my prototype engineering learning tracker, both sources sit on one grid of 10 core topics across 6 university programs, with coverage scored from 0 to 1 so partial coverage stays visible."
    },
    {
      "q": "How do you build a personalized learning path?",
      "a": "Start from the gap, not the catalog. Map what the learner's program covers against a canonical curriculum, flag topics that fall well short of their expected weight, then order those topics by size of gap and by prerequisite. Add the learner's own evidence, such as quiz results, so the path reflects what they know rather than only what their program taught."
    },
    {
      "q": "How do you visualize curriculum gaps?",
      "a": "A heatmap is the natural fit: topics on one axis, programs or learners on the other, and color showing the gap rather than raw coverage when the question is what to learn next. Keep the canonical reference visible, sort topics by importance, use one sequential color scale with a single accent for flagged cells, and show the number on hover so color is never the only signal."
    },
    {
      "q": "Can AI map a syllabus to a curriculum?",
      "a": "It can draft the mapping, which is often the slowest part of gap analysis. A language model can read course descriptions and propose a coverage score per topic, quoting the passages it relied on. It should not have the final word: syllabi are vague, course names mislead, and a wrong cell sends a learner the wrong way. Treat AI scores as proposals that a person confirms."
    }
  ],
  "related": ["spaced-repetition-conversational-ai", "ai-study-tools-that-teach", "kano-vs-moscow-ai-features"],
  "caseStudies": ["passway"]
}
---
Curriculum gap analysis compares what a field expects you to know with what your program actually teaches, and puts the difference on one grid. For a learner, that difference is the most useful thing a learning tool can show: a map of what they still need, instead of another catalog of courses.

I built [Passway](/work/passway), a prototype engineering learning tracker, around this idea. It maps a canonical engineering curriculum and six university programs onto one grid of ten core topics. Below is the method, a worked example with made-up numbers, how to show the result, and where AI could extend it without breaking trust.

## What problem does curriculum gap analysis solve?

Engineering learners often can't see which core topics their program under-covers until it shows up in interviews. By then, the gap has already cost them something.

Two things keep the gap hidden. First, curricula aren't comparable across universities: the same material sits under different course names, gets split across semesters or folded into a broader module. Second, a list of courses tells you what exists, not what's missing. You can't notice an absence by reading a catalog.

## Why do two data sources beat one?

Passway's core decision was a two-source data model:

- **The canonical source** is the yardstick: a fixed set of core topics, each with a canonical weight for how much coverage the field expects.
- **The observed source** is reality: how much of each topic a specific program actually covers, scored from 0 to 1.

Mapping every program onto the same canonical grid is what makes programs comparable and gaps measurable. One source alone gives you either an ideal nobody teaches or a description nobody can compare.

The second decision matters just as much: coverage is weighted, not binary. "Taught / not taught" would mark a topic as covered whether a program spends a semester on it or a single week. A weight from 0 to 1 keeps partial coverage visible, and partial coverage is where I'd expect most real gaps to hide.

## The two-source gap method, step by step

1. **Fix the canonical grid.** Choose a short list of core topics and give each a canonical weight. Passway uses ten. Fewer is better than you'd think, because every topic has to be mapped for every program.
2. **Map each program onto the grid.** For each topic, estimate coverage from 0 to 1 using the best evidence you have: syllabi, course descriptions, contact hours.
3. **Compute the gap per cell.** Canonical weight minus observed coverage.
4. **Set a threshold that means "act on this".** Passway highlights a topic when coverage falls at least 0.25 below its canonical weight. A threshold turns a wall of numbers into a short list.
5. **Turn gaps into a path.** Order the flagged topics by size of gap and by prerequisites, so the learner starts with what everything else depends on.

Steps one to four are what the prototype does: a canonical matrix, per-program coverage and gap highlighting. Step five is where a gap map becomes a learning path, and it's where I'd take Passway next.

## A worked example (with made-up numbers)

To make the method concrete, here is a hypothetical program and four of its topics. The topics and numbers are invented for illustration; they are not Passway's data.

| Topic | Canonical weight | Program coverage | Gap | Flagged at 0.25? |
| --- | --- | --- | --- | --- |
| Calculus | 0.9 | 0.8 | 0.1 | No |
| Numerical methods | 0.8 | 0.4 | 0.4 | Yes |
| Materials science | 0.6 | 0.4 | 0.2 | No, but watch it |
| Signal processing | 0.5 | 0.2 | 0.3 | Yes |

Two topics cross the threshold. The path starts with numerical methods: the larger gap, on the more central topic. Signal processing comes second, unless it is a prerequisite for something the learner needs sooner. Materials science stays on a watch list — not urgent, but the first thing to recheck if the learner's goals change.

The learner's own evidence makes the map more personal still. If a short check shows they've already taught themselves numerical methods, their gap there closes even though their program's doesn't. A program's coverage is a starting estimate; what the learner can actually do is the ground truth.

## How should you show a curriculum gap?

Passway renders the comparison as a grid you can read at a glance: a heatmap. A few rules I'd apply to any gap heatmap:

- Color the gap, not the coverage, when the question is "what should I learn next?" Coverage maps make strong programs look good; gap maps make needs visible.
- Keep the canonical row on screen as the reference everything is measured against.
- Sort topics by canonical weight, so the most important gaps sit where the eye lands first.
- Use one sequential color scale and one accent for flagged cells. A rainbow scale makes every cell look like news.
- Show the number on hover or tap. Color alone fails color-blind users and hides the difference between 0.24 and 0.26 — which, with a 0.25 threshold, is the difference that matters.

## Where could AI extend it, and what guardrails does it need?

The slowest part of gap analysis is step two: reading syllabi and scoring coverage topic by topic. That is where AI could help most.

- Drafting the mapping: a language model reads course descriptions and proposes a coverage score per topic, quoting the passages it relied on.
- Recommending resources: for each flagged topic, it suggests material at the learner's level, and the learner chooses.
- Explaining the map: it answers "why is this flagged?" in plain language, using the numbers in the grid.

The guardrails matter more than the features:

1. Every AI-proposed score shows its evidence, and a person confirms it before it reaches a learner.
2. AI estimates are labeled as estimates, never presented as fact about a university.
3. Learners and instructors can flag a wrong cell, and corrections are logged.
4. The model explains the grid; it never edits it. That is the same rule I use in OopsCupid, where scores are computed deterministically and the LLM only narrates them.

It's also the invariant behind the confidence gate in my CRM automation engine: "the pipeline may be slow, never wrong." A gap map that people act on deserves the same standard.

## From gap map to learning path

A map only helps if it changes what someone studies next. Three pieces close the loop. Newly learned material fades fastest (Ebbinghaus, 1885), so a topic someone has just caught up on should feed into spaced review; I describe how in [spaced repetition meets conversational AI](/insights/spaced-repetition-conversational-ai). The study itself should make the learner do the thinking, which is the subject of [designing AI study tools that teach](/insights/ai-study-tools-that-teach). And if you're building the tool, the feature list will grow fast — AI mapping, recommendations, progress tracking — so decide what ships first with a method, not a hunch; I compare two in [Kano or MoSCoW for AI features](/insights/kano-vs-moscow-ai-features).

A gap map is honest in a way most learning products aren't: it starts from what's missing, not from what's for sale. If you're designing one, start with the two sources and the threshold. Everything else — the AI, the recommendations, the path — depends on a grid people can trust.
