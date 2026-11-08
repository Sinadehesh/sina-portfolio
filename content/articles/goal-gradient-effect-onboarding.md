---
{
  "title": "The Goal-Gradient Effect in Onboarding: Make the Finish Feel Close",
  "description": "The goal-gradient effect in onboarding: why people speed up near the finish, how endowed progress works, and how to show progress without faking it.",
  "topic": "ai-products",
  "order": 7,
  "date": "2026-11-08",
  "keywords": ["goal gradient effect", "goal gradient effect examples onboarding", "endowed progress effect", "onboarding progress bar psychology", "goal gradient UX"],
  "takeaways": [
    "The goal-gradient effect: people work harder the closer they feel to a goal, so onboarding should make the finish visible and near from the first screen.",
    "Endowed progress works because a head start shortens the distance people feel is left. Count only steps the user has really completed.",
    "Shrink the steps, not the goal: Daily Hustle turns idea-to-first-income into a 27-day program with one concrete action per day.",
    "Progress should only go up. A streak that resets to zero turns one bad day into a loss; DeBubble counts days shown up instead.",
    "Fake progress, such as bars that crawl or finish lines that move, borrows trust you will need later."
  ],
  "faq": [
    {
      "q": "What is the goal-gradient effect?",
      "a": "The goal-gradient effect is the tendency to increase effort as a goal gets closer. Kivetz, Urminsky and Zheng (2006) showed it with a café reward card: members bought coffee more often the nearer they were to a free one. In product design, it means the perceived distance to the finish shapes how hard people try, so visible, near-feeling progress keeps them moving."
    },
    {
      "q": "What is the endowed progress effect?",
      "a": "The endowed progress effect is the boost in completion that comes from giving people a head start toward a goal. Nunes and Drèze (2006) gave car wash customers loyalty cards that required the same number of purchases; one version arrived with two stamps already filled in, and more of those customers completed the card. The head start changed how far the goal felt, not how far it was."
    },
    {
      "q": "How do you use the goal-gradient effect in onboarding?",
      "a": "Make the finish visible from the first screen, break the path into small concrete steps, count steps the user has genuinely completed, show the next action rather than just a bar, and never take earned progress away. Each move shortens the distance people feel is left. Keep it honest: every unit of progress should stand for something the user really did or really has left to do."
    },
    {
      "q": "Is the endowed progress effect manipulative?",
      "a": "It depends on whether the head start is honest. Crediting a step the user has already taken, such as creating an account, is truthful. So is a visible bonus, as long as the remaining distance is clear. Padding a progress bar with steps nobody did, or adding new steps after the user thinks they are done, is manipulation: it borrows trust the product will need later."
    }
  ],
  "related": ["gamification-overjustification-edtech", "kyc-onboarding-drop-off-psychology", "measuring-behavior-change-apps"],
  "caseStudies": ["daily-hustle", "debubble"]
}
---
The goal-gradient effect is the tendency to work harder the closer you get to a goal. In onboarding, it means people are most likely to finish when the finish looks near — so the job is to make the remaining distance feel short, clear and true.

Most onboarding does the opposite. It hides how much is left, shows a progress bar that crawls, or keeps adding "one more thing". Below is what the research says, four honest ways to make the finish feel close, examples from two of my own products, and the line where progress design turns into manipulation.

## What is the goal-gradient effect?

The idea is old: behaviorists noticed that animals speed up as they near a reward. Kivetz, Urminsky and Zheng (2006) showed the same pattern in people. Members of a café reward program bought coffee more often the closer they were to earning a free one. In another study in the same paper, people rating songs online in exchange for rewards visited more often and rated more songs as the reward came closer. Even an illusion of progress helped: a card that started with a couple of bonus stamps was completed faster.

The lesson for onboarding is that effort tracks perceived distance, not actual distance. Two flows with the same number of steps can feel very different, depending on how much of the road people can see and how much of it they feel they've already covered.

## What is the endowed progress effect?

Nunes and Drèze (2006) tested the head start directly at a car wash. Customers got loyalty cards that required the same number of purchases for a free wash, but one version arrived with two stamps already filled in. More customers with the head-start card completed it. The goal hadn't moved; only how far away it felt.

The way I read it, a head start reframes the task. You are no longer starting something; you are finishing something you've already begun, and finishing is easier to commit to.

Notice one detail, because it matters later: the head start in that study was visible and honest. Customers could see exactly how many stamps were still missing.

## Four honest ways to make the finish feel close

**1. Shrink the steps, not the goal.** Big goals stall because there is no obvious next move. Daily Hustle takes a goal as vague as "go from idea to first income" and turns it into a 27-day program with one concrete action per day. Every day becomes its own small finish line.

**2. Count what is already real.** If the user has created an account, answered a question or connected a data source, that is genuine progress. Show it as step one, done. You get the endowed progress effect without inventing anything.

**3. Show the next step, not just the bar.** A progress bar tells people how far; a next step tells them how. Implementation intentions — plans in the form "when X happens, I will do Y" — make follow-through more likely (Gollwitzer, 1999). Daily Hustle builds on them alongside chunking, and DeBubble anchors its daily routines to cues the user picks, like "when I put the kettle on".

**4. Count up, never down.** Progress that can be lost turns every slip into a reason to quit. In DeBubble, the days you showed up only ever go up. On a bad week the pixel room gets a little messy, but nothing earned is ever taken away.

## Where does progress design become manipulation?

The same mechanics that help people finish can be used to deceive them. Here is how I tell the two apart:

| Mechanic | Honest version | Manipulative version |
| --- | --- | --- |
| Head start | Credits steps the user really completed, or a visible bonus | Pads the bar with steps nobody did |
| Progress bar | Moves with the real remaining work | Jumps early, then crawls, or stalls just short of full |
| Finish line | Fixed and visible from the start | Moves: new steps appear once the user thinks they're done |
| Streak | Counts days shown up; a gap pauses it | Resets to zero to manufacture fear of loss |
| Time estimate | Based on how long people actually take | Shrunk to get the click, then quietly exceeded |

The rule underneath is what I call the honest-progress rule: every unit on a progress indicator must stand for something the user really did or really has left to do.

Fake progress works once. After that it borrows from a trust account you'll need later — at the payment step, at renewal, at the moment you ask for a review. Streak resets are a common offender because they turn loss aversion against the user. Losses loom larger than equivalent gains (Kahneman & Tversky, 1979), so a long streak becomes something to guard rather than something to enjoy, and a single miss feels like losing all of it. I go further into why that backfires in [gamification that doesn't backfire](/insights/gamification-overjustification-edtech).

## How I applied it in Daily Hustle and DeBubble

[Daily Hustle](/work/daily-hustle) is live. The trade-off I chose was a fixed daily structure over self-paced browsing: less flexibility, in exchange for a clear next step every day. Workbooks are built into the product instead of being downloadable PDFs, so progress is tracked rather than lost in a downloads folder, and a personal dashboard shows it. The program's length is known from day one — 27 days, not an open-ended course — which is the goal gradient's precondition: you can't feel close to a finish you can't see.

[DeBubble](/work/debubble), a cozy self-care app for Android that is still pre-launch, applies the same idea to a gentler goal. Each day has four tiny things — one for your body, your room, your heart and one small step outside — and progress shows up in the room itself. As you go further out of your bubble, it opens up: first a window, then a door, then the street. There are no streaks to lose.

I'm not quoting completion numbers for either product here. These are design decisions, and whether they work is a measurement question — against a baseline, over weeks, not just in the first session. That is its own discipline, which I cover in [measuring behavior change in apps](/insights/measuring-behavior-change-apps).

## How do you apply it to a long setup or verification flow?

Long, mandatory flows — identity checks, account setup, data imports — are where the goal gradient matters most, because people can't skip them and often can't see the end. A quick audit:

1. List every step between sign-up and first value, and count them.
2. Check whether the user can see that count from the first screen.
3. Mark the steps they have already done when they first meet your progress indicator, and credit them.
4. Make sure every screen names the next concrete action.
5. Look for anything earned that can be taken away, and remove it.

Verification flows add their own doubts — why do you need this, and what happens to my data? — which I'd pair with the fixes in [KYC onboarding drop-off](/insights/kyc-onboarding-drop-off-psychology).

The finish line is a design material. You decide where it sits, how visible it is and whether it ever moves. Put it close, keep it still and count only what is real, and the goal gradient works for your users instead of on them.
