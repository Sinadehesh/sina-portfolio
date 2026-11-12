---
{
  "title": "Pukytoon's Interface, Explained: Why It Changes Who Makes Games",
  "description": "A walk through Pukytoon's interface, screen by screen: the swipe feed, the Creator Studio, readable rules, adding AI-made games and signing in only to share.",
  "topic": "games-creativity",
  "order": 7,
  "date": "2026-11-12",
  "keywords": ["Pukytoon interface", "Pukytoon UI", "game creation app design", "no-code game maker interface", "live preview game editor", "UX design for creators"],
  "takeaways": [
    "Pukytoon puts playing, making and sharing on one surface: every game is one swipe away, one tap from playing and one tap from making your own.",
    "The Creator Studio shows the game on top and the choices below, so every change is visible as you make it, with no code.",
    "Rules are readable: chips for how a game is won and lost, plus custom rules built from a few words like score, time and merges.",
    "Pukytoon asks you to sign in only when you want to share, with an emailed code instead of a password."
  ],
  "faq": [
    {
      "q": "What does Pukytoon look like?",
      "a": "Pukytoon opens on a feed with one game per screen. The top bar has the Pukytoon name, a Create button and a plus button. Each game shows its own cover with a Play button in the middle, and its name, a short description and a heart for liking it at the bottom. You swipe up for the next game, like a video feed."
    },
    {
      "q": "How does Pukytoon's Creator Studio work?",
      "a": "The top half of the screen is the game itself, playing live; the bottom half holds the choices. You pick a game type from cards that each explain it in a sentence, choose a look, tune settings with sliders and switches, and set how the game is won and lost. A Publish button sits at the top right. You never write code."
    },
    {
      "q": "Do you need an account to use Pukytoon?",
      "a": "Not to play or to make a game. Pukytoon asks you to sign in only when you want to share a game with everyone, and there's no password: you type your email and it sends you a code each time. If you're new, that same step makes your account. Pukytoon is still in development."
    },
    {
      "q": "Why is Pukytoon's design different from other game makers?",
      "a": "Most game makers are separate tools: you make a game in one place and share it somewhere else. Pukytoon puts the feed where people play, the studio where they make, and the sharing in one app, so the distance between playing a game and making your own is a single tap. It also treats games made with AI as first-class citizens of the feed."
    }
  ],
  "related": ["pukytoon-feed-of-games-anyone-can-make", "four-gates-why-customers-hesitate", "democratization-of-game-development"],
  "caseStudies": ["pukytoon"]
}
---
Pukytoon's interface puts the three parts of game culture on one surface: a feed for playing, a studio for making and a simple sheet for adding games made anywhere else. Every game is one swipe away, one tap from playing and one tap from making your own. That's why I think it's revolutionary. No single screen is the breakthrough. The breakthrough is that the distance between playing a game and making one shrinks to almost nothing.

[Pukytoon](/work/pukytoon) is my own product, and it's still in development. These are the screens of the current build, what each one does, and the psychology behind it.

## The feed: one game per screen

Pukytoon opens on a feed. Each screen is one game, showing its own cover, with a large Play button in the middle. At the bottom are the game's name, a one-line description and a heart for liking it; built-in games carry a small "Pukytoon original" tag. You swipe up for the next game, and it snaps into place like a video.

In the feed, the top bar stays the same: the Pukytoon name, a Create button and a plus button. Whatever you're playing, making is always one tap away.

The feed is designed around ability rather than motivation. BJ Fogg's behavior model says a behavior happens when motivation, ability and a prompt come together (Fogg, 2009). People are curious about games; what stops them is the effort of choosing and starting one. One game per screen means there's no grid of thumbnails to compare and no store page to read. Trying a game costs a swipe, and playing it costs a tap.

The tap matters too. A game doesn't start playing at you; you choose to play it. That keeps the feed a place where you pick something to do, not just something to watch.

## The Creator Studio: the game on top, the choices below

The Creator Studio splits the screen in two. The top half is the game you're making, live, with its title, how you lose and "Tap to play", so you can try it at any moment. The bottom half is a sheet of choices. A Publish button sits at the top right.

The choices are cards, not settings. Under Game, each type explains itself in a sentence: "Drop items in the box. Two of a kind merge into the next one." "Tap to jump over obstacles and grab treats. How far can you go?" Under Look, each look shows its own characters, such as Barnyard or Pet Pals. Below that, a merge chain shows the order in which items grow, with a Change button.

This is direct manipulation, a term Ben Shneiderman coined in the early 1980s: you act on a visible object and see the result at once, instead of typing commands. Edwin Hutchins, James Hollan and Don Norman (1985) described the two gaps such interfaces close: the gulf of execution, between what you want to do and how the system lets you do it, and the gulf of evaluation, between what the system did and what you can see. A live preview closes both for game-making. You change the look, and the game in front of you changes. There's nothing to imagine.

## Rules you can read

Rules are the heart of a game, so they get their own place. Under How to win there are chips such as Endless, Make the top item and Score 2,000. Under How to lose there are The box overflows and Overflow or 3 minutes. Each list ends with Custom.

A custom rule uses a few plain words, which the screen lists for you: score, time, merges, level, levels and overflow. You write something like score ≥ 1000 or time ≥ 90, and it's checked as you type. Above the rules, sliders and switches tune the game, such as a switch to reverse sizes so higher levels are smaller, and a "Reset to the defaults" link brings everything back.

Two things are happening here. The chips mean nobody has to write a rule to make a complete game. And a custom rule is a condition, one of the basic building blocks of programming, so people who try one are taking a first step toward programming without being asked to. The reset link matters more than it looks: when undoing is always one tap away, people experiment more, because nothing they try can break the game for good.

## Adding a game made anywhere

The Add a game sheet asks for one thing: "Drop the game's share link (best), or paste its code." Below the box sits a link for people who don't have a game yet: "No game yet? Make one in the Creator Studio."

Paste a Claude link and Pukytoon recognizes it before you commit, then tells you what will happen: a Claude link opens in a new tab on the web version, and pasting the game's code instead plays it right in the feed. You give the game a name, and you can also open a file. Then you tap Add to feed. A small "Where do I find the link?" note answers the question most people have at that moment.

I care about this screen because it tells the truth before you act. Claude, Gemini and Kimi don't let other apps embed their pages, and the sheet says so plainly instead of letting you discover it after the fact. I wrote more about this in [where AI-made games should live](/insights/ai-made-games-claude-artifacts).

## Signing in only when you share

You can play and make games without an account. Pukytoon asks you to sign in only at the moment you want to share a game with everyone, and the sheet says exactly that: "Sign in to share your game with everyone." There's no password. You type your email and tap "Email me a code," and the note underneath explains: each time, it emails you a code, and if you're new, that makes your account.

This follows the order people actually decide in. My [Four Gates model](/insights/four-gates-why-customers-hesitate) says every decision passes four doubts: understand, trust, try and commit. Most apps ask for the commitment, an account, before people have tried anything. Pukytoon lets you understand and try first, and asks for the account only when you've made something worth sharing.

## Why I think it's revolutionary

Each of these ideas exists somewhere. Feeds exist. Game makers exist. Share links exist. What hasn't existed, as far as I know, is all of them in one place, built around the step from player to maker:

| Part of game culture | How it usually works | How Pukytoon does it |
| --- | --- | --- |
| Finding games | Store pages, searches and grids of thumbnails | One game per screen, one swipe to the next |
| Making games | An engine, a tutorial and code | Choosing and tuning, with the game playing live above |
| Writing rules | Code | Chips you can read, and custom rules from a few plain words |
| Games made with AI | A share link sent to a few friends | A card in the feed, added by pasting the link |
| Sharing | Export, upload and post somewhere else | Share with everyone, or send one link, from the same app |
| Accounts | Sign up before you can do anything | Sign in only to share, with no password |

When finding, making and sharing live on the same surface, making stops being a separate hobby with its own tools. It becomes the next thing you do after playing, which is how making videos became something everyone does. I go deeper into that shift in [the democratization of game development](/insights/democratization-of-game-development).

## What's still missing

Following makers comes next, so each maker's games gather in one place. Community features and an asset library come next too. The interface will keep changing as more people try it.

Pukytoon is still in development, so it isn't open to play yet. If you'd like to know more, or to fund it, [email me](mailto:sinadehesh@gmail.com?subject=About%20Pukytoon). The best interface for making games is the one people don't notice, because they're too busy making something for someone.
