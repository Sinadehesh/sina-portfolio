---
{
  "title": "Spaced Repetition Meets Conversational AI: Designing Around SM-2",
  "description": "Spaced repetition with AI, designed around SM-2: how the algorithm schedules reviews, where a chatbot helps, and why the learner must still do the recalling.",
  "topic": "ai-education",
  "order": 1,
  "date": "2026-11-08",
  "keywords": ["spaced repetition AI", "SM-2 algorithm", "AI flashcards spaced repetition chatbot", "SM-2 ease factor", "spaced repetition app design"],
  "takeaways": [
    "Spaced repetition works; the tools often lose learners because the effort, from setup to card authoring, comes up front while the memory benefit arrives weeks later.",
    "SM-2 keeps three pieces of state per card — ease factor, interval and repetition count — and stretches the gap between reviews after every successful recall.",
    "Let AI write the cards and explain the misses, but keep every recall attempt the learner's own, or the testing effect is outsourced to the model.",
    "Choose a scheduler you can explain. RecallMate's design uses a simplified SM-2 to stay transparent, accepting a small loss in scheduling precision."
  ],
  "faq": [
    {
      "q": "How does the SM-2 algorithm work?",
      "a": "SM-2 tracks an ease factor, an interval and a repetition count for each card. After each review you grade your recall from 0 to 5. A pass (3 or more) sets the next gap to one day, then six days, then the previous gap multiplied by the ease factor, which starts at 2.5 and never drops below 1.3. A grade below 3 restarts the card."
    },
    {
      "q": "Can AI make flashcards for spaced repetition?",
      "a": "Yes, and it removes one of the most effortful steps: turning notes into cards. The design rule I took from RecallMate is to let the AI draft and explain cards while keeping every recall attempt the learner's own. Drafted cards still need a quick human check, because a wrong card that gets reviewed on schedule is a wrong fact that gets memorized on schedule."
    },
    {
      "q": "Is SM-2 still worth using?",
      "a": "For many products, yes. Newer schedulers can model forgetting more precisely, but SM-2 is simple, well documented and easy to explain to a learner who asks why a card came back. RecallMate's design uses a simplified SM-2 for exactly that reason, accepting a small loss in scheduling precision. If your product cannot explain its schedule, the extra precision may cost more trust than it earns."
    },
    {
      "q": "Why do learners abandon spaced repetition apps?",
      "a": "Usually not because spacing fails. The costs come first — building a deck, writing cards, learning the settings — and the benefit compounds weeks later. When I benchmarked Anki and Quizlet for RecallMate, the trade-off was clear: Anki offers mature SM-2-family scheduling but heavy setup and card authoring, while Quizlet is low-friction but less rigorous about long-term scheduling. The opportunity is rigor without the setup."
    }
  ],
  "related": ["testing-effect-ai-tutors", "kano-vs-moscow-ai-features", "ai-study-tools-that-teach"],
  "caseStudies": ["recallmate"]
}
---
Spaced repetition and conversational AI work best together when each does the job it is good at: the algorithm decides when you review, the AI removes the work of making cards, and you do the remembering. Blur those roles and you get a friendly chatbot that feels helpful while memory quietly fades.

I learned this designing [RecallMate](/work/recallmate), an AI-assisted learning app whose concept and UX research I led as a research intern at the University of Milano-Bicocca. It pairs a simplified SM-2 scheduler with conversational AI. RecallMate is a concept and Figma prototype, not a launched app, so this is a design article rather than a results one: how SM-2 works, where AI fits around it, and the rules I'd keep.

## Why does spaced repetition work?

Ebbinghaus (1885) tested his own memory with nonsense syllables and found that forgetting is steep at first and slower later — the forgetting curve. He also noticed that spreading repetitions over time worked better than massing them together. Research since has confirmed it many times over. Cepeda and colleagues' (2006) meta-analysis found that spaced practice beats massed practice for retention, and that the best gap between sessions grows with how long you need to remember. Dunlosky and colleagues (2013) rated distributed practice as one of only two high-utility learning techniques, alongside practice testing.

So the science is not the problem. The problem is the timing of costs and benefits: the effort arrives on day one, the payoff compounds over weeks, and many people quit in between.

## How does the SM-2 algorithm work?

SM-2 was created by Piotr Woźniak for SuperMemo in the late 1980s, and SM-2-family schedulers still sit inside popular tools such as Anki. It keeps three pieces of state for every card: a repetition count, an interval (the gap until the next review) and an ease factor (how quickly the gaps grow).

After each review, you grade your recall from 0 to 5. Then:

| Grade | Meaning | Ease factor | Next gap |
| --- | --- | --- | --- |
| 5 | Perfect recall | Rises by 0.1 | Previous gap × ease factor |
| 4 | Correct, after a hesitation | Unchanged | Previous gap × ease factor |
| 3 | Correct, with serious difficulty | Falls by 0.14 | Previous gap × ease factor |
| 0–2 | Failed | Handling varies by implementation | Start again at one day |

Two details complete it. The first two successful reviews use fixed gaps of one day and six days; only after that does the multiplication start. And the ease factor starts at 2.5 and never drops below 1.3, so even a hard card keeps moving forward.

A worked example: grade a new card 4 every time and the ease factor stays at 2.5, so the gaps run one day, six days, 15 days, then about 38 days. Grade it 3 a few times and the gaps stretch more slowly. Fail it once and it starts again at one day. The schedule adapts to each card instead of treating every fact as equally hard.

## Why do learners abandon spaced repetition tools?

When I benchmarked the incumbents for RecallMate, the trade-off was stark. Anki has mature SM-2-family scheduling and deep customization, but heavy setup, card-authoring friction and a steep onboarding. Quizlet has low-friction study modes and broad shared content, but less rigorous long-term scheduling. One asks for effort before it gives you anything; the other gives you ease without the rigor that makes memory last.

The hypothesis I took into the research was that setup and card-authoring friction, not motivation, drives early abandonment. I explored it through multi-round semi-structured interviews, coded thematically (Braun & Clarke, 2006), and prioritized the findings with MoSCoW. The themes shaped the backlog: AI-assisted card creation and conversational review became Must-haves, while social features waited for evidence. I compare that method with the Kano model in [Kano or MoSCoW for AI features](/insights/kano-vs-moscow-ai-features).

## Where does conversational AI fit, and where doesn't it?

The principle I'd defend is a strict division of labor:

| Job | Who does it | Why |
| --- | --- | --- |
| Turning notes into cards | The AI drafts; the learner checks | Authoring costs effort that doesn't build memory |
| Deciding when to review | SM-2 | Predictable, and explainable to the learner |
| Recalling the answer | The learner, always | Retrieval is what strengthens memory (Roediger & Karpicke, 2006) |
| Explaining a miss | The AI, after the attempt | An explanation means more once you've tried |

In RecallMate, the conversational layer drafts and explains cards, while recall attempts stay user-generated so the testing effect is not outsourced to the model. That one rule carries most of the design. Working memory is limited, and effort spent on the wrong things crowds out learning (Sweller, 1988); formatting a card is the wrong thing. Retrieving an answer is the right thing, even when it feels hard — Bjork (1994) calls that a desirable difficulty.

The temptation in a chat interface is to let the model answer the card for you, because answering is what chat is for. It is also exactly how you end up with a pleasant conversation and no memory. I make that case at length in [why AI tutors should quiz you, not explain to you](/insights/testing-effect-ai-tutors).

## Why a simplified SM-2 instead of a newer scheduler?

Newer schedulers can model forgetting more precisely. RecallMate's design deliberately uses a simplified SM-2 — ease factor, interval, repetition count — to keep the model explainable and easy to implement, accepting a small loss in scheduling precision.

In a conversational product, explainability is a feature. Sooner or later a learner asks the bot, "Why am I seeing this again?" A good answer is short and true: "You found it hard last time, so it's back sooner." A scheduler nobody on the team can explain produces either silence or an invented reason, and a tutor that invents reasons is worse than one that says nothing.

There is a second reason. The schedule should be the one thing the chat cannot bend. If the conversational layer can pull cards forward to keep someone talking, engagement has quietly replaced learning as the goal.

## Five rules for an AI spaced-repetition app

1. **Remove the effort of making; keep the effort of remembering.**
2. **Ask before you explain.** In a review, the AI's first move is a question, never the answer.
3. **Make the schedule boring and visible.** "Next review in six days" builds trust.
4. **Let cards fail cheaply.** A reset to one day is information, not punishment.
5. **Check the AI's cards.** RecallMate's own benchmark lists AI output quality as a gap that needs ongoing evaluation, and a wrong card reviewed on schedule is a wrong fact memorized on schedule.

Fixed schedules have their place too. In my [app lockers](/work/app-lockers), reviews follow a fixed ladder of days 1, 3, 7, 14 and 30 — simple to explain, and in my view fine for short, similar items like naming a plant from a photo. SM-2 earns its extra state when cards vary a lot in difficulty, which describes most real study material.

What RecallMate produced was not a retention statistic but something earlier: a validated MVP scope, a full interactive Figma prototype and an SM-2 scheduling spec, built from interview evidence rather than feature guesses. If you're building in this space, start where it started — find out what makes your learners quit before you decide what the AI should do — and read [how to design AI study tools that teach](/insights/ai-study-tools-that-teach) before the chatbot gets its first prompt.
