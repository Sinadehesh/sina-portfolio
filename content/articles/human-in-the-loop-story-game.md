---
{
  "title": "What a Story Game Taught Me About Being the Human in the Loop",
  "description": "Human in the loop and the future of work, felt from the inside: what designing The Loop, a story game set in 2027 to 2030, taught me about drift and incentives.",
  "topic": "automation",
  "order": 8,
  "date": "2026-11-08",
  "keywords": ["human in the loop future of work", "AI and jobs game", "the loop game", "human in the loop game", "story game about AI and work"],
  "takeaways": [
    "People rarely give up judgment to machines in one decision; they hand it over one reasonable click at a time, usually under pressure.",
    "In The Loop every scam has one tell, a reminder that review only works when the evidence is findable and someone has time to read it.",
    "If reviewers are judged only on speed, speed is what you'll get, and the oversight you designed quietly becomes a formality.",
    "Put a little of the consequence next to the decision; people who approve records rarely see who a wrong one affects."
  ],
  "faq": [
    {
      "q": "What is The Loop game about?",
      "a": "The Loop is a story game in five acts, set between 2027 and 2030, about being the human in the loop as AI takes over work. Your apartment fills the screen: the laptop where the work comes in, the phone, the fridge, the radiator and a rent day that keeps coming. Daily queues of mail, gigs and agent reports each hide one tell. Acts I to IV are playable in the browser."
    },
    {
      "q": "What does human in the loop mean for the future of work?",
      "a": "It describes work where a person reviews, approves or corrects what automated systems produce, rather than doing the whole task from scratch. The risk is that oversight becomes a formality: when queues are long and pay depends on speed, careful checking quietly turns into skimming. Good systems are designed so the person in the loop can actually exercise judgment."
    },
    {
      "q": "Can games teach people about AI risks?",
      "a": "Games can make you feel a process that articles can only describe. In The Loop you don't read about someone approving an unchecked agent report; you do it yourself, under rent pressure, and see the cost at home. That makes the slow drift from careful to careless felt rather than abstract, which is hard to achieve in other formats."
    },
    {
      "q": "Where can I play The Loop?",
      "a": "Right here on this site: The Loop's play page runs the newest version in your browser, with nothing to install. Acts I to IV are playable, Act V is planned, and there are 23 endings to find. It's made for a computer for now, so play it on a laptop or desktop, with the sound on."
    }
  ],
  "related": ["ai-agent-delegation-trust", "automation-bias-human-review-design", "variable-rewards-near-miss-ethics"],
  "caseStudies": ["the-loop"]
}
---
Designing The Loop taught me that people rarely hand their judgment to machines in one big decision. They hand it over one reasonable click at a time, usually when money is tight and the queue is long. Being the human in the loop is less about a single moment of oversight than about whether you can keep paying attention when every incentive says skim.

[The Loop](/work/the-loop) is a story game in five acts, set between 2027 and 2030, about exactly that job. Your apartment fills the screen: the laptop where the work comes in, the phone, the fridge, the radiator, and a rent day that keeps coming. Over four acts you lose your job to an AI, train the AI, make election content for it and end up reviewing what it decides for the whole city. Acts I to IV are playable in the browser now, with 23 endings to find. Here's what making it taught me about automation, incentives and drift, and how those lessons carry over to real human-in-the-loop work.

## Why make a game about the human in the loop?

Most stories about AI and the future of work are told from far away: a headline about jobs, a chart, a forecast. From that distance, the small, reasonable decisions that add up to something unreasonable are impossible to feel.

A game can put you inside them. You don't read about someone approving an agent's report without checking it. You do it yourself, at the end of a long in-game day, because rent is due. I wanted fiction for adults about AI catastrophe, told through ordinary choices rather than spectacle.

## How does The Loop work?

The core is a daily queue in the spirit of Papers, Please. Each day opens with mail, gigs, ratings and agent reports. You read, spot the tell, and accept or decline. Every scam has one tell.

Around the queue sits an economy: rent, internet bills, freelance gigs and hardware prices that follow RAM. It's set so that careful players can just make rent. Automation is available, and you can hand work to agents, but it comes at a cost.

The apartment carries the theme. The laptop is one object in the room, not the whole screen, so every decision made on it lands in the room around it: the heat, the fridge, the rent, the neighbours who knock.

## Four design rules, and what they mean for real oversight

The game rests on four rules. Each one turned out to describe something true about human-in-the-loop work outside the game.

| Rule in the game | Why it's there | What it means for real review work |
| --- | --- | --- |
| Every button makes sense at the time | Drift should feel reasonable, never cartoonish | Reviewers rarely decide to stop checking; they slide into it |
| Every scam has one tell | Fair to the player, but demanding | Review works only if the evidence is findable and someone reads it |
| Money makes shortcuts tempting | Pressure, not villainy, drives compromise | Speed targets quietly shape review quality |
| The consequence sits beside the decision | You can't look away from the cost | Real systems hide consequences far from the person deciding |

### Every button makes sense at the time

If a choice looks obviously wrong, players avoid it, and the game turns into a test of spotting the villain. Drift only works when each step is defensible on the day.

That's how automation bias works outside games, too. Skitka, Mosier and Burdick (1999) found that people working with an automated aid made two kinds of error: following its wrong advice, and missing problems it failed to flag. Nobody decides to stop thinking. They accept one more report that looks fine.

### Every scam has one tell

One tell is a fairness promise: the information was there. It's also demanding, because a single detail is easy to miss when you're moving fast.

Real review queues are similar. A wrong extraction or a bad agent action often has a tell, but only for someone looking at the evidence. That's why I argue for review screens built around evidence rather than verdicts.

### Money makes shortcuts tempting

I didn't want villains. I wanted pressure. Rent, bills and hardware prices give every shortcut a reason, so that handing a task to an agent or skimming a report reads as understandable, not lazy.

Outside the game, the pressure is quotas, queue length and speed targets. If reviewers are judged only on how many items they clear, they will clear items, and the oversight you designed becomes a formality.

### The consequence sits beside the decision

The laptop sits inside the apartment, so every choice has a visible cost at home: the heat goes off, the fridge empties, a neighbour knocks. In many real systems, the person who approves a wrong record never meets the customer it affects. Bringing a little of the consequence into view, such as who a decision touches and what happens next, is in my view an underused way to keep reviewers engaged.

## How does the game connect to real automation?

The Loop is fiction, but it sits next to real systems I've designed. My Workflow Automation Engine, where I'm the product owner, turns sales calls and emails into CRM data, with a confidence gate on every write path and one rule: the pipeline may be slow, never wrong. The game shows the same rule from the reviewer's chair: what it feels like to hold the line when the queue is long and the rent is due.

Act IV makes it literal. You become a Civic Oversight reviewer for Consensus-1, the AI that now decides for the city, because the law still says a human must review its proposals. Each one sits on your console for a few seconds, fewer as the months pass. Let the clock run out and it is approved by default, and before long the system offers to approve everything for you. It's the human in the loop reduced to a timer, which is exactly the failure good oversight design has to prevent.

If you design automations, here's what I'd take from it:

1. **Design for the hundredth decision, not the first.** Oversight that works on day one can erode by day thirty.
2. **Make the tell findable.** Put the evidence on the review screen, not behind a click.
3. **Watch the incentives.** If speed is the only thing measured, speed is what you'll get.

I go deeper into the reviewer's side in [why reviewers rubber-stamp AI](/insights/automation-bias-human-review-design), and into the delegator's side in [the psychology of handing work to an AI agent](/insights/ai-agent-delegation-trust).

## Making the mechanics visible

Games are unusually good at showing a system from the inside, which is what The Loop does with automation. Dopamine Box, my behavioral experiment on betting, uses a game loop for a different job: a mock-token spin-to-claim loop, with near-misses and scarcity tags, designed to observe how people bet compared with the Kelly criterion, the mathematically optimal stake, and which attitudes and cognitive biases pull them off course. I write about its mechanics in [variable rewards and near-misses](/insights/variable-rewards-near-miss-ethics).

The Loop is also made to travel. It plays in any browser with nothing to install, so it is easy to share; for now it's made for a computer screen. Reading text is set in Atkinson Hyperlegible, a typeface designed for legibility, and the pixel font is kept for labels and numbers: atmosphere without hurting readability.

You can [play The Loop here, in your browser](/play/the-loop). Notice the first time you skim a report because the rent is due. That moment, small, reasonable and almost invisible, is what being the human in the loop is really about.
