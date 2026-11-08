---
{
  "title": "Why AI Tutors Should Quiz You, Not Explain to You",
  "description": "The testing effect, applied to AI tutor design: why retrieval practice beats explanation, what the GPT-4 classroom evidence shows, and a quiz-first tutor loop.",
  "topic": "ai-education",
  "order": 2,
  "date": "2026-11-08",
  "keywords": ["testing effect", "retrieval practice AI tutor", "AI tutor design learning science", "retrieval practice", "desirable difficulties"],
  "takeaways": [
    "The testing effect: trying to recall something strengthens memory more than rereading it, even though rereading feels more productive at the time.",
    "AI tutors default to explaining because explaining feels helpful. Good tutors ask first, hint second and explain only after the learner has tried.",
    "In a field experiment, unrestricted GPT-4 access improved practice performance but students did worse once access was removed; a guardrailed tutor version largely avoided the harm.",
    "Judge a tutor by what students can do after it is switched off, not by how well they perform while it is on."
  ],
  "faq": [
    {
      "q": "What is the testing effect?",
      "a": "The testing effect is the finding that practicing retrieval — trying to recall information — produces better long-term memory than spending the same time restudying it. Roediger and Karpicke (2006) found that restudying looked better on a test minutes later, but students who had practiced recall remembered more days later. It is also called retrieval practice, and in their study it worked even without feedback on the answers."
    },
    {
      "q": "Does using ChatGPT for homework hurt learning?",
      "a": "It can, depending on the design. In a field experiment in Turkish high-school math classes, Bastani and colleagues found that unrestricted GPT-4 access improved students' performance on practice problems, but they did worse once access was removed. A tutor version with guardrails largely avoided the harm. The lesson is that the design around the model, not the model alone, decides whether students learn."
    },
    {
      "q": "How should an AI tutor be designed?",
      "a": "Around attempts, not answers. Start each exchange by asking the learner to try, offer the smallest useful hint when they are stuck, explain only after an attempt, and bring the idea back days later as a question. Allow a full worked solution after a genuine attempt so learners don't go elsewhere. Then judge the tutor by delayed performance without it, not by satisfaction scores."
    },
    {
      "q": "What are desirable difficulties?",
      "a": "Desirable difficulties, a term from Bjork (1994), are conditions that make learning feel harder during practice but improve long-term retention — retrieving instead of rereading, spacing sessions apart, mixing problem types. They are desirable because the extra effort goes into building memory. The design challenge is to keep these difficulties while removing the ones that teach nothing, like confusing interfaces or busywork."
    }
  ],
  "related": ["spaced-repetition-conversational-ai", "illusion-of-understanding-ai-explanations", "ai-study-tools-that-teach"],
  "caseStudies": ["recallmate"]
}
---
An AI tutor should quiz you before it explains anything, because the act of retrieving an answer is what makes it stick. Researchers call this the testing effect, and it is one of the most dependable findings in learning science. Many AI tutors do the opposite: you ask, they explain beautifully, and you leave feeling you've learned more than you have.

I don't think that's a model problem. It's a design default. Here is the evidence, the tutor loop I'd build instead, and one question handled both ways.

## What is the testing effect?

Roediger and Karpicke (2006) asked students to learn short prose passages. Some restudied the text; others practiced recalling it. On a test five minutes later, restudying looked better. Days later, the students who had practiced recall remembered more. The students who restudied also predicted they would remember more — the strategy that felt better was the one that worked worse.

That pattern runs through the research. Dunlosky and colleagues (2013) reviewed ten common learning techniques and rated only two as high utility: practice testing and distributed practice. Rereading and highlighting, techniques many students rely on, were rated low. Bjork (1994) calls conditions like testing and spacing desirable difficulties: they make learning feel slower and harder, and they make it last.

## Why do AI tutors default to explaining?

Three forces push them there. Explaining is what language models do best: fluent, structured, endlessly patient prose. Learners tend to like explanations, because being explained to feels like progress. And product teams measure what is easy to measure — satisfaction, session length, thumbs-up — all of which reward the tutor for explaining and penalize it for making someone struggle.

The cost shows up later. Bastani and colleagues (2024–25) ran a field experiment in Turkish high-school math classes. Unrestricted GPT-4 access improved students' performance on practice problems, but they did worse once access was removed. A tutor version with guardrails largely avoided the harm.

My reading: the unrestricted version let students skip the retrieval, so practice looked productive without building what they needed once the AI was gone. The hopeful part is the guardrailed version. The same kind of model, with different defaults, did far less damage.

## The attempt-first loop: ask, hint, explain, return

AI tutoring pitches lean on Bloom's (1984) "two-sigma problem" — the observation that one-to-one tutoring far outperformed classroom teaching, though the size of that effect is debated. Whatever the true size, good tutoring is not a lecture. Here is the loop I'd build into any AI tutor, with one job per move:

1. **Ask.** Before any explanation, the tutor asks for an attempt: recall a definition, predict a result, take the first step. A wrong attempt isn't wasted; it shows the tutor and the learner exactly where the gap is.
2. **Hint.** If the learner is stuck, give the smallest hint that keeps them doing the thinking, and escalate one level at a time.
3. **Explain.** Only after an attempt, and aimed at the specific mistake rather than the whole topic.
4. **Return.** Bring the idea back days later as a question, not a summary. Spacing makes it last (Cepeda et al., 2006).

In practice, the loop becomes a handful of rules in the tutor's instructions. Never give the final answer in the first reply. If the learner asks for the answer outright, ask once for their attempt. After two hint levels, walk through a similar problem rather than this one, then hand the original back. End every explanation with a question the learner has to answer. None of these rules needs a better model; they need a team willing to trade some satisfaction for learning.

One escape hatch matters: after a genuine attempt, let the learner see the full worked solution. A tutor that refuses everything doesn't create learning; it creates a tab switch to a tool that will answer. I built escape hatches into my app lockers for a related reason — strict blockers get uninstalled — and the same logic applies to strict tutors.

## One question, two tutors

A student types: "How do I solve 3x + 5 = 20?"

The explaining tutor replies in one message: subtract 5 from both sides to get 3x = 15, then divide by 3, so x = 5. It is correct, clear and kind. The student did nothing.

The attempt-first tutor runs the loop:

- Tutor: "What's stopping x from being on its own right now?"
- Student: "The 5 and the 3?"
- Tutor: "Right. Which would you undo first?"
- Student: "Divide by 3?"
- Tutor: "You could, but then the 5 gets divided too. What if you dealt with the + 5 first?"
- Student: "Subtract 5… so 3x = 15, and x = 5."
- Tutor: "Yes. Check it: 3 × 5 + 5 = 20. Why did removing the 5 first make it easier?"

Two days later, before the next session: "Quick one: solve 4x − 3 = 13."

The second version takes longer and feels less helpful in the moment. It is also the only one where the student retrieved anything, and the only one that checks, days later, whether it stuck.

## How I applied it in RecallMate

[RecallMate](/work/recallmate), the AI-assisted learning app whose concept I led as a research intern at the University of Milano-Bicocca, started from a literature review on active recall, spaced repetition and conversational AI. The design decision that followed is simple to state: the conversational AI lowers the effort of creating and understanding cards, but recall attempts stay user-generated, so the testing effect is not outsourced to the model.

It is a concept and prototype, not a launched app, so I can't report learning outcomes. The design challenge it leaves is one every AI tutor faces: making "try first" feel like help rather than an exam. I describe the scheduler behind it in [spaced repetition meets conversational AI](/insights/spaced-repetition-conversational-ai).

## What should you measure instead of satisfaction?

If you only measure how students feel during a session, the explaining tutor will usually win. Measure learning where it shows up — later, and without the tool:

- **Delayed performance without AI.** A short quiz days later, with the tutor switched off.
- **Attempt rate.** How often the learner tried before seeing an explanation.
- **Hint depth.** How many hint levels it took to get there; in my view, falling depth over weeks is a good sign.
- **Return accuracy.** How often ideas brought back days later are answered correctly.

The gap between practice performance and delayed performance is the clearest warning sign you have. Fluent explanations widen it by making people feel they understand; I unpack why in [AI explanations and the illusion of understanding](/insights/illusion-of-understanding-ai-explanations).

If you're building a tutor, change one default this week: make its first reply to any problem a question. It will cost you some satisfaction points in the short run, and that cost is the sound of students doing the thinking. For the full product checklist, from hints to teacher views, start with [designing AI study tools that teach](/insights/ai-study-tools-that-teach).
