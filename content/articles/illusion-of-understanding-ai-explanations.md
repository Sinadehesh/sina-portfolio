---
{
  "title": "AI Explanations and the Illusion of Understanding",
  "description": "The illusion of explanatory depth meets AI: why fluent AI explanations make learners overconfident, and three checks that turn reading into understanding.",
  "topic": "ai-education",
  "order": 6,
  "date": "2026-11-08",
  "keywords": ["illusion of explanatory depth", "AI explanations learning overconfidence", "metacognition AI learning", "fluency illusion learning", "explain it back technique"],
  "takeaways": [
    "A fluent AI explanation can make you feel you understand something you couldn't explain yourself. The feeling and the understanding are different things.",
    "The illusion of explanatory depth: people overrate how well they understand how things work until they try to explain it step by step.",
    "The cure is generation: explain it back, predict before you check, and test yourself again after a delay.",
    "End AI explanations with a question the learner must answer, never with \"Does that make sense?\""
  ],
  "faq": [
    {
      "q": "What is the illusion of explanatory depth?",
      "a": "It is the tendency to believe you understand how something works in far more detail than you do. Rozenblit and Keil (2002) asked people to rate their understanding of everyday devices such as zippers and flush toilets, then to write step-by-step explanations. After trying to explain, people's ratings of their own understanding dropped. Knowing what something does feels like knowing how it works."
    },
    {
      "q": "Do AI explanations make students overconfident?",
      "a": "They can. A fluent, well-structured explanation is easy to read, and ease feels like understanding. Reading also isn't recalling: Roediger and Karpicke (2006) found that restudying felt more effective than practicing recall, yet produced worse memory days later. Bastani and colleagues found that unrestricted GPT-4 access improved practice performance but students did worse once access was removed; a guardrailed tutor version largely avoided the harm."
    },
    {
      "q": "How can you check whether you really understand something?",
      "a": "Close the explanation and try to produce it yourself. Explain the idea in your own words without looking, apply it to a new example and write down your prediction before checking, then try again a day or two later. Where you stall is the gap. If you can only recognize the explanation when you see it, you have read it, not learned it."
    },
    {
      "q": "What is metacognitive calibration in learning?",
      "a": "Calibration is how well your confidence matches your actual performance. A well-calibrated learner who feels sure is usually right, and one who feels unsure usually needs more practice. Fluent explanations can push confidence up without improving performance, which can lead people to stop studying too early. Asking learners to predict their answer and their confidence, then showing the result, is one of the simplest ways to recalibrate."
    }
  ],
  "related": ["testing-effect-ai-tutors", "ai-study-tools-that-teach", "algorithm-aversion-product-design"],
  "caseStudies": ["recallmate", "debubble"]
}
---
A clear AI explanation can leave you feeling you understand something you couldn't explain yourself. The feeling is real; the understanding often isn't. Researchers call the gap the illusion of explanatory depth, and AI tutors — built to be fluent, patient and instant — can make it wider.

That matters for anyone learning with AI and anyone building tools for it. Below is what the illusion is, why AI explanations feed it, a simple test that catches it, and three checks I'd build into any learning product.

## What is the illusion of explanatory depth?

Rozenblit and Keil (2002) asked people to rate how well they understood everyday devices — zippers, flush toilets, cylinder locks. Then they asked them to write step-by-step explanations of how those devices work. After trying, people rated their own understanding lower. Nothing had changed about what they knew. They had simply found its edges.

The illusion comes from a confusion that feels natural: knowing what something does, and recognizing its parts, feels like knowing how it works. You can't feel the missing step until you try to produce it.

## Why do AI explanations make it worse?

Four features of AI explanations feed the illusion. None of them is a bug; they are exactly what makes AI explanations pleasant.

| Trap | What it feels like | What is actually happening |
| --- | --- | --- |
| Fluency | "That was so clear, I get it." | Easy reading is mistaken for understanding |
| Borrowed structure | "I followed every step." | Following steps isn't producing them |
| No retrieval | "I've been studying for an hour." | Reading isn't recalling, so memory is never tested |
| Instant availability | "I can always ask again." | You never discover what you can't do alone |

The first two traps work together. A numbered, well-formatted explanation looks like a procedure you could run yourself, and recognizing each step as it goes past feels like being able to produce it. But recognition and recall are different skills, and an exam, a client or a broken machine will ask for recall.

The evidence on the third trap is the strongest. Roediger and Karpicke (2006) found that students who restudied a text predicted they would remember it better than students who practiced recalling it — and then remembered less days later. Feeling productive and being productive came apart.

The fourth trap fits what Bastani and colleagues (2024–25) found in a field experiment in Turkish high-school math classes: unrestricted GPT-4 access improved performance on practice problems, but students did worse once access was removed, while a tutor version with guardrails largely avoided the harm.

There is also an authority effect. People often give more weight to advice when they believe it comes from an algorithm (Logg, Minson & Moore, 2019), so a confident machine explanation may get less scrutiny than the same words from a classmate. Trust can swing hard the other way after a visible mistake, which I cover in [why one AI mistake costs so much trust](/insights/algorithm-aversion-product-design). Neither extreme is calibrated.

## The close-the-tab test

Here is the simplest check I know, for learners and for anyone testing a learning product:

1. Read the AI's explanation once, properly.
2. Close it.
3. Explain the idea in your own words, in three or four sentences, as if to a friend.
4. Apply it to a new case you haven't seen, and write down your prediction before checking.
5. Reopen the explanation and compare. Where you stalled is the gap.
6. Try step three again tomorrow.

If you can only recognize the explanation when you see it, you've read it, not learned it. The test takes a few minutes, and it is the same move as Rozenblit and Keil's experiment, applied to yourself.

## Three calibration checks to build into AI learning tools

Calibration means your confidence matches your accuracy. Fluent explanations push confidence up without moving accuracy, and an overconfident learner tends to stop studying too early. Learning tools can correct this by design.

**1. Explain it back.** After an explanation, the tool asks the learner to restate the idea, compares their version with the source and points to the step that's missing. Generation exposes the gap that reading hides.

**2. Predict, then check.** Before revealing an answer, ask for a prediction and a confidence rating. Show the result, and over time show learners their own calibration: how often they were right when they felt sure. Keep it light. A three-point scale — guessing, fairly sure, certain — is enough, because the point is the comparison, not the score.

I use a version of this device outside learning. In [DeBubble](/work/debubble), my self-care app, every outside mission has a prediction-versus-outcome check: you guess how it will go, then record how it went. There, the job is to correct fear, because anxiety overestimates how hard things will be. In learning, the same device corrects the opposite error: overconfidence.

**3. Come back later.** Ask again days later, without the explanation on screen. Forgetting is steepest soon after learning (Ebbinghaus, 1885), so a delayed question is the honest measure of what stuck, and spacing the questions out strengthens what's there (Cepeda et al., 2006).

## What should replace "Does that make sense?"

A common last line of an AI explanation invites a yes that costs nothing. It is the opposite of a calibration check. Swap it for a question that makes the learner produce something:

| Instead of | Ask |
| --- | --- |
| "Does that make sense?" | "Explain the key step in your own words." |
| "Want me to go deeper?" | "Before I go on, what do you predict happens if we change this?" |
| "Here's a summary." | "Try summarizing it in two sentences; I'll fill in what's missing." |
| "Any questions?" | "Here's a similar problem. What's your first move?" |

It's a small change in a prompt and a large change in what the learner does next. I make the wider case for asking before explaining in [why AI tutors should quiz you, not explain to you](/insights/testing-effect-ai-tutors).

## How this applies to RecallMate

In [RecallMate](/work/recallmate), the AI-assisted learning app whose concept I led during my research internship at the University of Milano-Bicocca, the conversational AI drafts and explains cards, but recall attempts stay the learner's own. That split was designed around the testing effect, and it guards against this illusion too: an explanation the learner has read is not yet a memory they can retrieve.

The rule I'd hold any AI learning tool to is simple: no full explanation until there has been an attempt, and no explanation that ends without a question back. If you build with AI for learners, the most useful thing to measure isn't how clear your explanations are. It's how well your learners can explain them back with the tab closed. For the product patterns that follow, see [designing AI study tools that teach](/insights/ai-study-tools-that-teach).
