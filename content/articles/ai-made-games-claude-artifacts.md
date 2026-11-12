---
{
  "title": "Where AI-Made Games Should Live: Claude Artifacts and the Feed",
  "description": "People make games with Claude, Gemini and Kimi every day, then share a link nobody browses. What AI-made games need to find players, and how to design for it.",
  "topic": "games-creativity",
  "order": 4,
  "date": "2026-11-12",
  "keywords": ["AI-made games", "games made with Claude", "Claude artifact games", "share a game made with AI", "where to share AI games", "AI game creators"],
  "takeaways": [
    "A game made with an AI chatbot usually ends at a share link, and share links are made for sending, not for finding.",
    "An AI-made game needs four things a link can't give it: a place to be found, its maker's name, a way to be answered and a safe place to run.",
    "A platform that runs other people's games must keep each one sealed off from the app, from players' accounts and from the other games.",
    "Most AI games that work on a phone share the same traits: portrait screen, one thumb, a goal you understand in seconds and a clear ending."
  ],
  "faq": [
    {
      "q": "Can you make a game with Claude?",
      "a": "Yes. Describe the game you want, and Claude can build a small playable version as an artifact you play right in the chat, then change it by asking for changes. You can share it with a link. Gemini and Kimi can do similar things. The results are usually small games, which suits games made for friends, a class or a single joke."
    },
    {
      "q": "Where can I share a game I made with AI?",
      "a": "The simplest way is the share link the AI tool gives you, sent to friends or posted on social media. That reaches people who already know you, but strangers rarely find it. A feed made for games, where each game shows its maker and can be liked, shared and answered, is what I'm designing Pukytoon for; it's still in development."
    },
    {
      "q": "Are games made with AI safe to play?",
      "a": "A game is code, and code from an unknown maker can misbehave, so the safety comes from where it runs. A good platform runs each game sealed off from the app, from players' accounts and from other games, lets people report problems, and limits what can be shared with everyone until it can check shared code. Be careful with games that ask for personal information."
    },
    {
      "q": "Why can't apps embed games made in Claude or Gemini?",
      "a": "Many web services don't let other sites show their pages inside a frame, a common protection against tricks where a page is hidden inside another page. Claude, Gemini and Kimi don't let other apps embed their pages, so in Pukytoon a game added by its link opens full screen in the app's own view instead. Pasting the game's code lets it play right in the feed."
    }
  ],
  "related": ["pukytoon-feed-of-games-anyone-can-make", "democratization-of-game-development", "how-to-make-a-game-without-coding"],
  "caseStudies": ["pukytoon"]
}
---
AI-made games should live where people already look for something to play: a feed, with the maker's name on every game and a way to answer it. Today most of them live behind share links. Someone describes a game to Claude, Gemini or Kimi, plays it, sends the link to a friend or two, and that's the end of its life.

I'm designing [Pukytoon](/work/pukytoon), a feed of games anyone can make, partly to fix this. It's still in development. Here's why the share link is a dead end, what an AI-made game needs instead, and what makes a game made this way worth playing.

## How do people make games with AI today?

The pattern is simple. You describe a game in plain words, for example a cat that jumps over cucumbers, faster every ten seconds. The AI writes the code and shows you a playable version, which Claude calls an artifact. You play it, ask for changes, and play again. For small games, the gap between having an idea and playing it has shrunk from weeks to minutes.

That's a real shift in who gets to make games, and I wrote about it in [the democratization of game development](/insights/democratization-of-game-development). But making a game is only half of what a maker wants. The other half is someone playing it.

## Why is a share link a dead end?

A link is made for sending, not for finding. It reaches the people you already know and decide to send it to, and stops there. Nobody browses share links looking for something to play.

A link also carries almost nothing social. It doesn't show who made the game unless you tell people. It can't be liked, so you never learn whether strangers enjoyed it. It can't be answered with another game, so nobody builds on it. And it gives the maker no audience, which is the main reason people make a second game. I go deeper into that in [the social side of making games](/insights/social-side-of-making-games).

## What does an AI-made game need to find players?

I use a four-part test for any home for games made by players. I call it found, known, answered and safe:

| Need | The question | What a share link gives | What a feed for games can give |
| --- | --- | --- | --- |
| Found | Can strangers come across it? | Only the people you send it to | A place where new games show up for people looking to play |
| Known | Does it carry its maker's name? | Only if you say so | The maker's name and @handle on every game |
| Answered | Can people respond to it? | A message back, at best | Likes, sharing and making your own version |
| Safe | Can it run without risk? | It runs wherever the link opens | Each game runs sealed off, with reports and hiding |

A good home for games passes all four. A share link passes none of them on its own.

## How should a platform run games it didn't make?

Every game is code, and a platform that shows games made by thousands of strangers is running thousands of strangers' code. That only works if each game is kept apart: from the app, from players' accounts and from the other games. If one game misbehaves, it should only be able to break itself.

Sharing needs the same care. Opening everything to everyone from day one invites spam, copies and worse. It's better to share less at first and open up as the checks get better, even though that's slower.

## How I'm designing for AI-made games in Pukytoon

In Pukytoon you copy the share link of a game you made as a Claude artifact, or with Gemini or Kimi, and paste it in. Pukytoon recognizes the link and the game becomes a card in the feed. Claude, Gemini and Kimi don't let other apps embed their pages, so a link game opens full screen in the app's own view; on the web version, it opens in a new tab. If you paste the game's code instead, it plays right inside the feed.

Every pasted game runs sealed off from the app and from the other games, and people can report and hide what they don't want to see. Until the safety checks for shared code are ready, only Studio games and links to Claude, Gemini or Kimi can be shared with everyone. Every shared game carries its maker's name and @handle, and following makers comes next.

I explain the rest of the product, including the no-code Creator Studio, in [why I'm building Pukytoon](/insights/pukytoon-feed-of-games-anyone-can-make). It's still in development, so it isn't open to play yet. If you'd like to know more, or to fund it, [email me](mailto:sinadehesh@gmail.com?subject=About%20Pukytoon).

## How do you make an AI game people actually finish?

Making a game with AI is easy; making one that strangers play to the end takes a little design. These are the rules I use when I review a game:

1. Make it portrait and one-thumb. Most people will play on a phone, held in one hand.
2. Make the goal clear in five seconds. If a new player can't tell what to do almost at once, they swipe away. That's my rule of thumb, not a law, but it's rarely wrong.
3. Keep a round short. A minute or two is plenty for a game in a feed.
4. Give every action feedback. A sound, a flash or a number that jumps tells the player their tap mattered.
5. Make the ending count. People judge an experience heavily by its peak and its end (Kahneman, Fredrickson, Schreiber & Redelmeier, 1993), so a satisfying finish is worth more than another level.
6. Test it with a few people before you share it widely. Watch them play without explaining anything; where they hesitate is where your game needs work.

If you'd like a step-by-step version of this, from the first idea to the first player, I wrote [how to make a game without coding](/insights/how-to-make-a-game-without-coding).

The tools for making games have arrived faster than the places to share them. Every AI-made game deserves at least a chance at a stranger who plays it, likes it and makes their own version. That's the place I'm building.
