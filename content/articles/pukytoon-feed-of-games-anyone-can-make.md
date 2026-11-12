---
{
  "title": "Pukytoon: Why I'm Building a Feed of Games Anyone Can Make",
  "description": "Pukytoon is a feed of games anyone can make, share and play, now in development. Why I'm building it, the design decisions so far, and what comes next.",
  "topic": "games-creativity",
  "order": 3,
  "date": "2026-11-12",
  "keywords": ["Pukytoon", "Pukytoon app", "feed of games", "app to make and share games", "game creation app", "swipe feed of games"],
  "takeaways": [
    "Pukytoon is a feed of games anyone can make: swipe games like short videos, make your own without code, or add one made with Claude, Gemini or Kimi by link.",
    "Three problems shaped it: AI-made games are stranded behind share links, making a game is harder than making a video, and an unshared game stays a private toy.",
    "A game made in Pukytoon's Creator Studio is a few hundred bytes of data, so it loads instantly, works offline and can be shared and remixed safely.",
    "Pukytoon is in development. Following makers, community features and an asset library come next."
  ],
  "faq": [
    {
      "q": "What is Pukytoon?",
      "a": "Pukytoon is a feed of games anyone can make, share and play. You swipe through games one per screen, like short videos; you can make your own in a Creator Studio without writing code; and you can paste the link of a game you made with Claude, Gemini or Kimi so it becomes a card in the feed. It's designed by Sina Dehesh and is still in development."
    },
    {
      "q": "Can I play Pukytoon yet?",
      "a": "Not yet. Pukytoon is still in development, with a web build and an Android test build, so it isn't open to the public. If you'd like to know more about it, or to fund it, email me at sinadehesh@gmail.com. I'm glad to talk about where it's going and what's working so far."
    },
    {
      "q": "How do you make a game in Pukytoon?",
      "a": "In the Creator Studio you pick a game type (drop and merge, endless runner, match-3 or whack-a-mole), choose one of six looks, swap in any of 74 pictures and tune it while a live preview plays. Then you set how it's won and lost, with a preset or your own rule like score ≥ 1000, and publish it. No code is needed."
    },
    {
      "q": "Can I add a game I made with Claude to Pukytoon?",
      "a": "Yes. Copy the share link of a game you made as a Claude artifact, or with Gemini or Kimi, and paste it in: Pukytoon recognizes it and adds it to the feed as a card. Those services don't let other apps embed their pages, so a link game opens full screen in the app's own view. If you paste the game's code instead, it plays right in the feed."
    },
    {
      "q": "Who is behind Pukytoon?",
      "a": "I am. I'm Sina Dehesh, an applied psychologist and consumer psychology consultant in Milan, Italy, and Pukytoon is my own product: I'm its founder and I design it. I've also designed games like Gem Jar, Zombie Bomber and The Loop, and apps like OopsCupid and Costly."
    }
  ],
  "related": ["democratization-of-game-development", "social-side-of-making-games", "ai-made-games-claude-artifacts"],
  "caseStudies": ["pukytoon"]
}
---
Pukytoon is a feed of games anyone can make. You swipe through games like short videos, one per screen. You can make your own in a Creator Studio without writing a line of code. And if you've made a game with Claude, Gemini or Kimi, you can paste its link and it becomes a card in the feed, next to everyone else's.

I'm Sina Dehesh, an applied psychologist and consumer psychology consultant in Milan, and [Pukytoon](/work/pukytoon) is my own product. It's still in development. This is why I'm building it, the decisions I've made so far, and what comes next.

## Why build Pukytoon?

I believe making games will go the way making videos went. Twenty years ago, making a video people would watch took equipment and skill; now anyone does it on a phone, for friends or for strangers. Games are the last big medium still made mostly by specialists, and I wrote about why in [the democratization of game development](/insights/democratization-of-game-development).

I also believe the social platforms of the future will be gamified. Instead of posting a photo, you'll post a game. Instead of commenting, you'll make your own version. Pukytoon is my bet on both ideas at once.

## What problems is it solving?

Three problems shaped every decision.

The first is that AI-made games are stranded. People make small games with AI chatbots every day, and they're often good. But they stay behind share links, and nobody browses share links. A game played by its maker and two friends is a game that mostly disappears.

The second is that making a game is still far harder than making a video. Even a small game needs rules, pictures, feedback and code. Most people who'd enjoy making one never start.

The third is that a game nobody can find or share stays a private toy. Without names, likes, links and a way to answer a game with another game, there's no reason to make a second one.

## Why a feed?

A feed cuts the cost of trying a game to one swipe. Pukytoon shows one game per screen with video-style snapping, and each game waits under its cover. Tap Play and it takes the whole screen; swipe up and the next one is already there.

The psychology here is ability more than motivation. BJ Fogg's behavior model says a behavior happens when motivation, ability and a prompt come together (Fogg, 2009). People are curious about games; what stops them is the effort of finding and starting one. A feed removes almost all of that effort.

I've also designed [Costly](/work/costly), an app that puts a real-money price on doomscrolling, so I don't take feeds lightly. The difference I'm designing for is direction. Pukytoon's feed is meant to lead somewhere: from playing a game, to liking it, to making your own version, to making your own game.

## How does the Creator Studio work?

The Creator Studio replaces coding with choosing and tuning. You pick one of four game types: drop and merge, endless runner, match-3 or whack-a-mole. You choose one of six looks and swap in any of 74 pictures, and a live preview plays while you tune it, so you see each change as you make it.

Then you decide how the game is won and lost. You can take a preset (make the top item, score 2,000, or 25 moves) or write your own rule, like score ≥ 1000 or time ≥ 90, checked as you type. Four types, six looks, 74 pictures and your own rules add up to hundreds of different games.

When you publish, the whole game is saved as a few hundred bytes of data: the game type, settings, look and rules. That's why a Studio game loads instantly, works offline and can be shared and remixed safely.

## How do games made with AI get in?

You copy the share link of a game you made as a Claude artifact, or with Gemini or Kimi, and paste it into Pukytoon. It recognizes the link and adds the game to the feed as a card. If you paste the game's code instead, it plays right inside the feed.

There are honest limits, and I'd rather name them than hide them. I've written more about them in [where AI-made games should live](/insights/ai-made-games-claude-artifacts).

| Decision | Why I made it | What it means for you |
| --- | --- | --- |
| Link games open full screen | Claude, Gemini and Kimi don't let other apps embed their pages | You leave the feed for a moment to play |
| Pasted code runs sealed off | So it stays apart from the app and from the other games | You can paste a game's code and play it right in the feed |
| Studio games are data, not code | They load instantly, work offline and are safe to share and remix | Studio games come in four types, six looks and 74 pictures |
| Sharing with everyone is limited | The safety checks for shared code aren't ready yet | For now, only Studio games and Claude, Gemini or Kimi links can be shared with everyone |

## What makes it social?

Sign in with just your email, with no password, and you can share your games with everyone, like other people's and send any game to a friend with one link. Every shared game carries its maker's name and @handle, and anyone can make their own version of a shared Studio game. People can report and hide what they don't want to see.

I think the social layer matters more than the tools, and I go through why, piece by piece, in [the social side of making games](/insights/social-side-of-making-games).

## What comes next?

Following makers comes next, so each maker's games gather in one place and a new game reaches the people who enjoyed the last one. Community features and an asset library come next too. Each one serves the same idea: making a game should feel as natural as posting a video, and making one for someone else should feel even better.

Pukytoon is still in development, so it isn't open to play yet. If you'd like to know more, or to fund it, [email me](mailto:sinadehesh@gmail.com?subject=About%20Pukytoon). I'm looking for people who believe, as I do, that the next thing everyone makes will be games.
