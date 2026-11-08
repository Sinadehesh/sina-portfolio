---
{
  "title": "LLM-Assisted Thematic Analysis: Faster Coding Without Losing Rigor",
  "description": "Thematic analysis with ChatGPT or another LLM, done rigorously: where AI helps in Braun and Clarke's six phases, where it fails, and a workflow you can verify.",
  "topic": "research",
  "order": 2,
  "date": "2026-11-08",
  "keywords": ["thematic analysis with ChatGPT", "LLM qualitative coding", "AI thematic analysis interviews", "AI qualitative data analysis", "Braun and Clarke thematic analysis with AI", "coding interviews with AI"],
  "takeaways": [
    "LLMs help with the mechanical parts of thematic analysis, such as first-pass coding, finding quotes and flagging counter-examples. Interpretation stays with the researcher.",
    "Make every AI-suggested code carry a verbatim quote and its location, and check mechanically that the quote exists. No quote, no code.",
    "Code a sample yourself before you see the model's output, then compare. If you never disagree with the model, you aren't reviewing it.",
    "Use the model against your themes as well as for them: ask it for the quotes that contradict what you think you've found.",
    "Interview transcripts are personal data. De-identify them before anything leaves your machine, and check that consent and provider terms cover AI processing."
  ],
  "faq": [
    {
      "q": "Can ChatGPT do thematic analysis?",
      "a": "It can do parts of it well: summarizing transcripts for navigation, applying a codebook in a first pass, finding quotes and proposing candidate groupings. It can't do the interpretive work that Braun and Clarke (2006) put at the center of the method, which is deciding what a pattern means and why it matters for your question. Use it as a fast, checkable assistant, never as the analyst."
    },
    {
      "q": "How do you check LLM qualitative coding for accuracy?",
      "a": "Use three checks. Require a verbatim quote for every code and verify mechanically that it appears in the transcript. Code a random sample yourself, blind to the model's output, and compare agreement code by code. Then track how often you change the model's suggestions, because a reviewer who never disagrees is probably rubber-stamping. Refine the codebook wherever disagreements cluster."
    },
    {
      "q": "Is it safe to upload interview transcripts to an AI tool?",
      "a": "Only after checking three things: that participants consented to this kind of processing, that the provider's terms fit your data-protection obligations, and that the transcripts are de-identified before upload. Remove names, employers, places and anything that could identify someone in context. For sensitive studies, prefer setups where data isn't retained or used for training. This is not legal advice."
    },
    {
      "q": "What are the six phases of thematic analysis?",
      "a": "Braun and Clarke (2006) describe six: familiarizing yourself with the data, generating initial codes, searching for themes, reviewing themes, defining and naming themes, and producing the report. The process is recursive rather than strictly linear. In an LLM-assisted workflow, the model helps most with generating codes and with checking themes against the data, while familiarization and interpretation stay human."
    }
  ],
  "related": ["interviews-and-logistic-regression", "jobs-to-be-done-market-fit-interviews", "automation-bias-human-review-design"],
  "caseStudies": ["recallmate", "musicity"]
}
---
You can use ChatGPT or another LLM for thematic analysis of interviews, but only for the parts of the method that are mechanical and checkable. LLMs are fast at first-pass coding, finding quotes and spotting counter-examples. They are unreliable at the part that makes it analysis: deciding what a pattern means.

I've coded interviews thematically to drive product decisions, in the RecallMate research and in Musicity's market-fit work. Below is the workflow I'd use to bring an LLM into that kind of project: where it helps, where it fails, and the checks that keep the speed from costing you rigor.

## Where can an LLM help in thematic analysis?

Braun and Clarke (2006) set out thematic analysis in six phases. They also make a point that matters even more with AI: themes don't simply "emerge" from data. The researcher actively identifies and shapes them. So the useful question isn't "can the model do thematic analysis?" but "which phases can it assist without taking over the judgment?"

| Phase | What it involves | How an LLM can help | Who decides |
| --- | --- | --- | --- |
| 1. Familiarization | Reading and rereading | Summaries for navigation, never instead of reading | You |
| 2. Initial codes | Labeling meaningful segments | A first pass against your codebook, with quotes | You verify |
| 3. Searching for themes | Grouping codes into patterns | Proposing candidate groupings | You |
| 4. Reviewing themes | Checking themes against the data | Finding quotes that contradict a theme | You |
| 5. Defining and naming | Saying what each theme is | Very little; this is interpretation | You |
| 6. Producing the report | Writing the argument | Locating the strongest verbatim quotes | You |

The pattern is consistent. The model is strongest where its work can be checked against the transcript, and weakest where nothing but your judgment can check it.

## Where does an LLM fall short?

Four places:

- **Interpretation.** A model can tell you that seven participants mentioned price. It can't tell you that, for this product, talk about price was really talk about trust.
- **Absence.** Some of the most important findings are what nobody said. A model codes what's in the text.
- **Tone and hesitation.** Transcripts flatten sarcasm, pauses and the half-laugh before "it's fine". The interviewer remembers them; the model never saw them.
- **Fluent invention.** Models can produce plausible quotes that don't exist, or blend two participants into one. Fluency isn't accuracy.

There's a reviewer problem too. People tend to over-trust automated suggestions, a pattern known as automation bias (Skitka, Mosier & Burdick, 1999), and a neat table of confidently labeled codes invites approval. I cover the design side of that problem in [why reviewers rubber-stamp AI](/insights/automation-bias-human-review-design).

## How do you use an LLM for qualitative coding without losing rigor?

I call this the two-key workflow, because nothing becomes a finding without both the model's evidence and a human decision:

1. **Prepare the data.** De-identify the transcripts: names, employers, places, anything identifying in context. Keep the key that links IDs to people offline.
2. **Read everything yourself.** Familiarization stays human. Draft the codebook from a subset: code name, definition, when to apply it, when not to, and one example quote.
3. **Run a constrained first pass.** Give the model the codebook and one transcript at a time. Ask for structured output: code, verbatim quote, participant ID, position in the transcript. Allow "no code applies". New code ideas go into a separate suggestions list and are never applied directly.
4. **Verify every quote mechanically.** A short script checks that each quote appears word for word in its transcript. Anything that fails is discarded, not repaired.
5. **Double-code a sample blind.** Code a random subset yourself before you look at the model's output, then compare code by code. Where you disagree, sharpen the codebook definition and rerun. An agreement statistic such as Cohen's kappa makes the comparison explicit.
6. **Build themes yourself, then attack them.** Group codes into themes by hand. Then ask the model for the strongest quotes against each theme, and for the participants who don't fit.
7. **Keep an audit trail.** Prompts, model and version, codebook versions, raw outputs and every human change. Anyone should be able to trace a sentence in the report back to quotes.

Step four is the one I'd never skip. I think of it as "no quote, no code": it turns invention from a hidden risk into a visible, countable failure. The same principle runs through the automation I've built. My CRM automation engine sends ambiguous extractions to a person for review instead of writing them, on the rule that the pipeline may be slow, never wrong. Research deserves at least that standard.

If you plan to turn codes into variables for a statistical model, the codebook has to be stricter still; I explain why in [interviews plus logistic regression](/insights/interviews-and-logistic-regression).

## How I'd apply it to real interview projects

Two projects shaped how I think about this.

For [RecallMate](/work/recallmate), an AI-assisted learning app whose concept I led as a research intern at the University of Milano-Bicocca, I designed and ran multi-round user interviews and coded them thematically. The coding fed a decision: a ranked backlog of pain points that went into MoSCoW prioritization, where AI-assisted card creation and conversational review became must-haves.

For [Musicity](/work/musicity), a music platform, interviews with artists, listeners and venues were coded into a ranked jobs-to-be-done view to decide which segment to win first. There the codes had to separate what people said they wanted from what their behavior showed they needed. A model will blur that distinction unless the codebook spells it out.

In both, the coding served a decision, and that's the principle I'd carry into any LLM workflow: code for the decision. A codebook built around "what would change what we build or launch first" is far easier to apply consistently, for a person or a model, than one built to describe everything. The market-fit version is in [jobs-to-be-done interviews for market fit](/insights/jobs-to-be-done-market-fit-interviews).

## How do you protect interview data when using AI?

Interview transcripts are personal data, often sensitive, and participants agreed to talk to you, not necessarily to your software vendors. Before any transcript leaves your machine:

- Check that your consent form covers processing by third-party tools, or ask again.
- Read the provider's terms: whether inputs are retained, whether they're used for training, and where they're processed.
- De-identify first, and send only the sections the task needs.
- For sensitive studies, prefer setups where data isn't retained, or models you can run locally.
- Delete what you no longer need, including model outputs that contain quotes.

This is not legal advice; data-protection obligations depend on your jurisdiction and your study, so check with whoever is responsible for them in your organization.

## Does it actually save time?

In my view, it moves time more than it removes it. You spend less on first-pass labeling and hunting for quotes, and more on the codebook and on verification. That trade is worth making, because the codebook and the checks are exactly where rigor comes from. If verification starts to feel like a waste of the time you saved, treat that feeling as automation bias rather than efficiency.

Treat the model like a fast, literal-minded research assistant that never gets tired and sometimes makes things up. Give it a precise codebook, demand a quote for every claim, check its work on a sample, and keep the interpretation for yourself. The coding gets faster; the thinking stays yours.
