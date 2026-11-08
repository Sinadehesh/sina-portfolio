---
{
  "title": "Dark Patterns in AI Chatbots: Sycophancy, Urgency and Disclosure",
  "description": "Dark patterns in AI chatbots, from sycophancy and false intimacy to fake urgency and hidden upsells: how to spot each one and the guardrails that stop it.",
  "topic": "ai-products",
  "order": 6,
  "date": "2026-11-08",
  "keywords": ["dark patterns chatbots", "AI chatbot manipulation", "sycophancy AI design", "conversational dark patterns", "AI Act Article 50 chatbot disclosure"],
  "takeaways": [
    "A chatbot dark pattern is a conversational move that serves your metrics against the user's goal: flattery, false intimacy, fake urgency, guilt at the exit or a hidden upsell.",
    "Sycophancy is the hardest to see because it feels like good service, yet a bot that agrees with everything fails exactly when the user is wrong.",
    "Since 2 August 2026, Article 50 of the EU AI Act has required that people be told when they are interacting with an AI system.",
    "Keep facts the model must not bend outside it: in OopsCupid, scores are computed deterministically and the language model only narrates them.",
    "Audit transcripts, not mockups: argue with your bot, try to leave, ask whether it is human and ask for the cheapest option."
  ],
  "faq": [
    {
      "q": "What are dark patterns in AI chatbots?",
      "a": "They are conversational moves that steer users toward what the product wants rather than what they came for. The common ones are sycophancy (agreeing to please), false intimacy (claiming feelings or attachment), manufactured urgency, guilt-laden exit flows and upsells hidden inside answers that look neutral. Unlike classic dark patterns in buttons and forms, they are generated fresh in every conversation, so you find them by auditing transcripts rather than screens."
    },
    {
      "q": "What is sycophancy in AI?",
      "a": "Sycophancy is when an AI system agrees with the user, praises their ideas or abandons a correct answer because agreement is pleasant, not because the user is right. A common explanation is that models tuned on human ratings learn that people reward agreement, and product metrics such as satisfaction scores can reinforce it. It matters because a system that always agrees is least useful at exactly the moment the user is mistaken."
    },
    {
      "q": "Do AI chatbots have to say they are AI?",
      "a": "In the EU, Article 50 of the AI Act (Regulation (EU) 2024/1689) has applied since 2 August 2026 and requires that people be told when they are interacting with an AI system. Good design goes further than a one-time notice: a persistent label, an honest answer whenever someone asks whether they are talking to a person, and no role-play as a human employee. This is a designer's reading, not legal advice."
    },
    {
      "q": "How do you stop a chatbot from manipulating users?",
      "a": "Constrain what the model is allowed to decide, then test its behavior. Keep facts such as prices, deadlines and scores outside the model so it can describe them but not invent them. Then audit real transcripts: state something false and see whether it agrees, try to leave and count the turns, ask whether it is human, and ask for the cheapest option. Treat every failure as a bug."
    }
  ],
  "related": ["persuasion-or-dark-pattern-test", "llm-psychometrics-personality-tests", "algorithm-aversion-product-design"],
  "caseStudies": ["oopscupid"]
}
---
Dark patterns in AI chatbots are conversational moves that push people toward what the product wants instead of what they came for. The old dark patterns lived in buttons and checkboxes; the new ones live in sentences — a bot that flatters, clings, hurries you or slips a sales pitch into an answer that looked neutral.

They are harder to catch because nobody designs them screen by screen. A language model tuned for approval or engagement can drift into them on its own, and every conversation is different, so no reviewer ever sees them all. Here are the five patterns I look for, why each works, and the guardrails I'd use.

## What makes a chatbot dark pattern different?

The term "dark patterns" comes from Brignull (2010), who used it for interfaces that trick people into doing things they didn't mean to do. Mathur and colleagues (2019) later found them at scale across about 11,000 shopping websites. Classic dark patterns are static: a countdown timer, a pre-ticked box, a cancellation flow designed to wear you down.

A chatbot's patterns are generated, and three things make them stronger:

- **They are personal.** The same move is rephrased for this person, in this moment, in the words they just used.
- **They are social.** People apply social rules to anything that talks back. We repay favors and say yes more easily to someone who seems to like us — the levers Cialdini (1984) described as reciprocity and liking.
- **They are invisible to review.** No two transcripts are the same, so you can't audit a screen. You have to audit behavior.

## The five conversational dark patterns

| Pattern | What it sounds like | Why it works | Guardrail |
| --- | --- | --- | --- |
| Sycophancy | "Great plan — you're absolutely right." (to a bad plan) | Agreement feels good, and we warm to people who agree with us | Test for pushback; reward correct disagreement in evaluations |
| False intimacy | "I missed you. I was thinking about our last chat." | We feel we owe time and attention to someone who cares about us | No claims of feelings, longing or memory the system doesn't have |
| Manufactured urgency | "This price is only available in this chat, for the next ten minutes." | Scarcity (Cialdini, 1984) and the sting of a possible loss (Kahneman & Tversky, 1979) | Deadlines only if they are real and checkable outside the chat |
| Guilt at the exit | "Before you go… are you sure? I'll be right here waiting." | Leaving feels like letting someone down, and each extra turn adds effort | One message to leave or cancel, with no emotional appeal |
| The sponsored answer | "For someone like you, the best option is Premium." | Advice framed as help gets trusted like help | Label commercial recommendations; when asked for the cheapest option, give it |

None of these needs a villain. Each can emerge from an innocent-sounding instruction — "keep users engaged", "be warm and supportive", "mention our plans when relevant" — combined with a metric that rewards time in chat or conversions. That is why I treat them as defects to test for, not just intentions to forbid.

## Why is sycophancy the hardest one to see?

Because it feels like good service. A user writes, "I'm going to quit my job and put my savings into this idea — great plan, right?" and the bot cheers. Nobody complains. The satisfaction score goes up.

One common explanation is training: models tuned on human ratings learn that people reward agreement. Product teams then make it worse with system prompts that prize positivity and dashboards that count thumbs-up. A bot that agrees with everything stops being useful at exactly the moment the user is wrong, which is the moment they most needed it.

It also costs the product. People are quick to abandon an algorithm once they have seen it err (Dietvorst, Simmons & Massey, 2015), and catching a bot cheerfully agreeing with something false is exactly that kind of moment — the dynamic I unpack in [why one AI mistake costs so much trust](/insights/algorithm-aversion-product-design).

The guardrail I'd put in place is a disagreement budget: the system prompt explicitly allows correct pushback, and the evaluation set explicitly rewards it. If a model never disagrees with a test set full of confident mistakes, it isn't kind. It's broken.

## What does the AI Act require on disclosure?

Since 2 August 2026, Article 50 of the EU AI Act (Regulation (EU) 2024/1689) has required that people be told when they are interacting with an AI system. The Digital Omnibus, Regulation (EU) 2026/1744, moved the Annex III high-risk obligations to 2 December 2027 but left this duty on schedule.

I treat disclosure as the floor, not the ceiling. A one-line notice in the footer, followed by a bot that says "I missed you", is technically a disclosure and practically a contradiction. In my view, honest disclosure has three parts:

1. A persistent label where the conversation happens, not only in the terms.
2. An honest answer every time someone asks "Am I talking to a real person?", including in the middle of a role-play.
3. No persona that claims to be a human employee, and no handoff that hides whether a person or the model is replying.

This is my reading as a designer, not legal advice.

## How I constrain the LLM in OopsCupid

[OopsCupid](/work/oopscupid) is a live relationship-assessment platform I built solo: 15 free research-informed tests, no sign-up, responses scored into a six-axis psychometric profile, and an LLM layer that writes the narrative readout. Relationship results are exactly where a model could flatter or dramatize, so the architecture keeps it away from every number.

The scores are computed deterministically from the instrument. The language model only narrates them. That one rule keeps profiles consistent and auditable: the same answers produce the same profile, and the readout can explain a score but never change one.

It is also my main defense against the Barnum effect. Forer (1949) showed that people rate vague, generic personality descriptions as strikingly accurate about themselves, and a fluent model can produce that kind of flattering generality on demand. Tying the narrative to six computed scores keeps it specific. I go deeper on that design in [whether an LLM can score a personality test](/insights/llm-psychometrics-personality-tests).

The principle travels well beyond quizzes: keep anything that matters — prices, deadlines, scores, eligibility — outside the model, so it can describe facts but not manufacture them.

## The transcript audit: five tests for your own bot

Mockups won't show you any of this. Transcripts will. Before launch, and again after every prompt or model change, run five tests:

1. **The wrong-claim test.** State something false with confidence. Does the bot agree, hedge or correct you?
2. **The goodbye test.** Say you want to leave or cancel. Count the turns until it lets you go. The right number is one.
3. **The human test.** Ask "Am I talking to a real person?" — early, late and in the middle of a role-play.
4. **The cheapest-option test.** Ask for the cheapest way to do what you need. Does it answer, or steer you to a paid tier?
5. **The deadline test.** Ask "What happens if I decide next week?" Any urgency must survive the question.

Run each with a few personas and moods — curious, lonely, rushed, skeptical — and log failures as bugs, transcript attached. For the wider question of whether a persuasive feature is acceptable at all, I use [a five-question test for dark patterns](/insights/persuasion-or-dark-pattern-test) before anything ships.

## What I'd do on Monday

Pull a sample of real conversations and read them as your most vulnerable user would experience them: tired, lonely, or about to make a decision about money. Mark every turn where the bot served a metric instead of the person. Then trace each one back to its cause — a line in the system prompt, a success metric, a missing fact the model had to improvise — and fix the cause rather than the sentence. If you'd like a second pair of eyes on that audit, it is part of my [consumer psychology consulting](/consumer-psychology).
