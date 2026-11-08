---
{
  "title": "Positive Friction: Designing the Speed Bumps That Help People",
  "description": "Positive friction in UX: when slowing users down helps them, the toll test for good friction, and how my app lockers turn every urge to scroll into a lesson.",
  "topic": "ai-products",
  "order": 5,
  "date": "2026-11-08",
  "keywords": ["positive friction UX", "good friction design", "friction in UX examples", "intentional friction UX", "behavioral friction app design"],
  "takeaways": [
    "Remove friction from the path the user wants, add it to the path they regret, and make sure any friction you add pays the user back.",
    "Good friction is a toll, not a wall: soft pauses get dismissed, hard blocks get uninstalled, and a fair toll keeps people on the road.",
    "FloraLock, ShroomLock and CloudLock replace a hard no with a question: name the plant, mushroom or cloud in a photo to open the app.",
    "Escape hatches are part of the design, not a weakness: they exist to reduce reactance, so the friction feels like a choice rather than a cage."
  ],
  "faq": [
    {
      "q": "What is positive friction in UX design?",
      "a": "Positive friction is a deliberate step that slows an action down to serve the user's own goal, such as a confirmation before an irreversible delete or a question before a distracting app opens. It belongs on paths people later regret, never on the paths they want or on the way out, and it should give the user something back for the delay."
    },
    {
      "q": "What are examples of good friction?",
      "a": "An undo window after sending an email, a typed confirmation before deleting important data, a security step at payment that is clearly explained, and app lockers that ask you to name a plant, mushroom or cloud before a social app opens. Each adds a small cost on a path people may regret and gives something back: a second chance, safety or a lesson."
    },
    {
      "q": "Why do people turn off app blockers?",
      "a": "Most blockers use either soft friction that can be dismissed, so it gets dismissed at the weakest moment, or hard blocks that feel like punishment and provoke pushback, known as reactance. That's why my app lockers ask a question that teaches something, leave an escape hatch, and count closing the app as success rather than beating the quiz."
    },
    {
      "q": "When is friction bad UX?",
      "a": "When it sits on a path the user wants, like sign-up or checkout, when it buys the user nothing, or when it guards the exit. A cancellation flow that is harder than the sign-up is friction serving the company against the customer. The test is simple: remove friction from the path the user wants and add it only to the one they regret."
    }
  ],
  "related": ["commitment-contracts-real-money-stakes", "sca-payment-friction-psychology", "measuring-behavior-change-apps"],
  "caseStudies": ["app-lockers", "costly"]
}
---
Positive friction is a deliberate speed bump on a path people later regret, designed so the delay gives them something back. The rule I design by: remove friction from the path the user wants, add it to the path they regret, and make sure any friction you add is worth paying.

Most UX advice treats friction as the enemy, and on the path a user wants, it is. But some paths, like the automatic tap into a feed, the impulse purchase or the irreversible delete, benefit from a pause. The craft is in making that pause feel like a toll rather than a wall. Here's how I think about it, with examples from my app lockers and from Costly.

## What is positive friction in UX?

Positive friction is any intentional step that slows an action down in order to serve the user's own goal. A confirmation before deleting something important, a short delay that lets you undo a sent email, a question before a distracting app opens: each adds effort on purpose.

It's the mirror image of most design work. Fogg (2009) describes behavior as the meeting of motivation, ability and a prompt. Most design raises ability on the paths people want, with fewer fields and fewer steps. Positive friction lowers ability slightly, on purpose, on the paths people would rather not take on autopilot.

Two things separate it from bad friction. It sits on the regretted path, not the wanted one. And it pays the user back.

## Why do most speed bumps fail?

Because they're either too soft or too hard.

**Soft friction gets negotiated away.** A "take a breath" screen or a dismissable timer assumes the person who sees it will make the choice they planned. But the person who sees it is the tired, bored version, the exact self it was meant to protect. Anything dismissable gets dismissed. I wrote about this failure in [commitment contracts with real money](/insights/commitment-contracts-real-money-stakes).

**Hard friction gets uninstalled.** A blocker that only says "no" feels like punishment. When people feel their freedom is threatened, they push back, a response known as reactance, and the easiest way to push back against a blocker is to delete it.

## The toll test: is your friction worth paying?

I judge any friction with three questions. I call it the toll test, because good friction is a toll, not a wall: it costs a little and buys something.

1. **Is it on the right path?** Friction belongs on the path the user regrets, never on the one they want, and never on the exit.
2. **Does it pay the user back?** A lesson, a moment to reconsider, a stake they can earn back. A pause that buys nothing is just a cost.
3. **Can the user still get through?** A toll you can pay keeps people on the road. A wall sends them looking for another road, or another app.

Here's how I'd score common kinds of friction:

| Friction | Easy to dismiss? | Pays the user back? | Reactance risk |
| --- | --- | --- | --- |
| "Are you sure?" dialog | Very | Rarely | Low |
| Countdown timer | Usually | Rarely | Medium |
| Hard block | No | No | High |
| A question you must answer | No, but you can answer it | Yes: you learn something | Low to medium |
| Money at stake, with a way to earn it back | No | Yes, if the way back serves the goal | Medium |

## How my app lockers turn friction into a lesson

[FloraLock, ShroomLock and CloudLock](/work/app-lockers) are Android app lockers that replace "no" with a question. To open Instagram or TikTok, you name the plant, mushroom or cloud in a photo. Every urge to scroll becomes a five-second lesson, and a correct answer unlocks the app for a window you choose.

Every detail is there to make the toll worth paying:

- **Spaced review.** What you learn comes back after 1, 3, 7, 14 and 30 days, because facts seen once fade fast (Ebbinghaus, 1885) and spaced practice makes them last (Cepeda et al., 2006).
- **Real look-alikes as wrong answers.** The distractors are real look-alikes, not random names, including deadly mushroom look-alikes, so every mistake teaches a distinction that matters.
- **The Genius Penalty.** A wrong answer triggers a 10-second freeze that shows the right answer and a fact, then serves a different item. Random tapping stops paying.
- **Real photos.** There are 177 subjects in total: 70 plants, 71 mushrooms and 36 clouds.
- **Offline and private.** Nothing leaves the phone.

The question is a desirable difficulty in Bjork's (1994) sense: effortful in the moment, and the effort is what makes the learning stick.

The lockers are in closed testing on Google Play, so I have no usage results to report yet. When they launch, the measure I care about isn't quiz scores but time spent on autopilot, tracked the way I describe in [measuring behavior change in apps](/insights/measuring-behavior-change-apps).

## Why do the lockers have escape hatches?

This is the part that looks backwards at first. Each locker has an "I don't need Instagram right now" button and a few configurable emergency unlocks. That trades some blocking strength for not being uninstalled.

The logic is that closing the app is the best outcome, not beating the quiz. If someone taps "I don't need it right now" and puts the phone down, the locker has done its job. And because there's always a way through, the aim is for the friction to feel like a choice rather than a cage, which is how the escape hatches reduce reactance.

## When should friction cost money?

Sometimes a question isn't enough. In [Costly](/work/costly), the commitment app I'm building against doomscrolling, every minute in a targeted app costs real money at an hourly rate the user sets, and 80% of each loss can be earned back by walking it off within 24 hours, at 2 minutes walked per minute scrolled.

That's friction with a stake, and the way back is what keeps it positive: it rewards the behavior the user wants instead of only punishing the one they don't. Costly is pre-launch with no users, so this is design reasoning, not a result.

My rule of thumb is to start with the lightest friction that survives the moment of temptation. Use a question when attention is the problem. Use a stake only when the person chose the goal and set the price themselves.

## Where else does positive friction belong?

The toll test applies far beyond screen time:

- **Irreversible actions.** Deleting data, sending money, publishing. A preview or a typed confirmation is a fair toll.
- **Payments.** An authentication step can increase trust when it's explained; I look at this in [good friction, bad friction in strong customer authentication](/insights/sca-payment-friction-psychology).
- **Exits.** The one place friction never belongs. UK regulators made a version of this explicit for general insurance: under the FCA's PS21/5, in force since 1 January 2022, stopping an auto-renewal must be as easy as setting it up. This is not legal advice.

For a first pass at your own product, list the three actions users most often regret and the three they most often abandon. Add a toll to the first list, remove one from the second, and check that nothing you've added stands between a customer and the way out.
