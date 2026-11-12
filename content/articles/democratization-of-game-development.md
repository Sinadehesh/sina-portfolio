---
{
  "title": "The Democratization of Game Development: Anyone Can Make a Game",
  "description": "The democratization of game development, explained: why making games is following making videos, what AI changes, and why the social side decides who joins.",
  "topic": "games-creativity",
  "order": 1,
  "date": "2026-11-12",
  "keywords": ["democratization of game development", "democratization of creativity", "anyone can make a game", "make a game without coding", "AI game maker", "user-generated games"],
  "takeaways": [
    "The democratization of game development means making a game is becoming like making a video: something anyone can do in minutes, for friends as much as for strangers.",
    "Every medium opened up once three things arrived: a tool beginners can use, a stage where work gets seen and a crowd that answers. Games are getting all three now.",
    "AI solves the tool problem, but a game made with a chatbot still ends at a share link nobody browses. The stage and the crowd are what's missing.",
    "Good game-making tools have a low floor, a high ceiling and wide walls, so beginners start in minutes and keep finding new things to make.",
    "People value what they make themselves, which is why making a first game matters more than playing a hundred."
  ],
  "faq": [
    {
      "q": "What is the democratization of game development?",
      "a": "It's the shift from games made by specialists to games anyone can make. Level editors and engines lowered the cost first; now AI chat tools and no-code game makers let a beginner make a small, playable game in minutes. It follows the path writing, photography, music and video already took: once the tools are easy and there's a place to share, making becomes something people do for each other."
    },
    {
      "q": "Can you make a game without coding?",
      "a": "Yes. A no-code game maker lets you pick a game type, a look and the rules, and tune them while the game plays. AI chat tools like Claude, Gemini or Kimi can also turn a short description into a small playable game. The results are usually simple, which suits the games people make for each other: small, personal and meant for friends."
    },
    {
      "q": "How is AI changing who makes games?",
      "a": "AI has made the first version of a small game nearly free: describe it, and you can play it a minute later, which is a form of what Andrej Karpathy called vibe coding in 2025. That removes the skills barrier for beginners. What AI doesn't give a game is an audience. A game made in a chat usually ends at a share link, and nobody browses share links."
    },
    {
      "q": "What is Pukytoon?",
      "a": "Pukytoon is a feed of games anyone can make, which I'm designing and which is still in development. You swipe through games like short videos, make your own in a no-code Creator Studio, or paste the link of a game you made with Claude, Gemini or Kimi so it becomes a card in the feed. If you'd like to know more, or to fund it, email me."
    }
  ],
  "related": ["social-side-of-making-games", "gamification-overjustification-edtech", "goal-gradient-effect-onboarding"],
  "caseStudies": ["pukytoon"]
}
---
The democratization of game development means that making a game is becoming like making a video: something anyone can do in an afternoon, for one friend or for strangers. AI chat tools and no-code game makers have made the first version of a small game almost free. What's still missing is the social part that turned video into everyone's medium.

I'm designing [Pukytoon](/work/pukytoon), a feed of games anyone can make, because I believe games are the next medium to open up, and because I think the tools are the easy half. Here's how I see the shift, the psychology underneath it, and what has to be true before everyone makes games.

## How did creativity become something everyone does?

Every medium I can think of opened up the same way. Writing went from scribes to printing presses to blogs. Photography went from studios to film cameras to the phone in your pocket. Music went from recording studios to laptops in bedrooms. Video went from broadcasters to YouTube, then to TikTok, where the camera, the editing and the audience live in one app.

Each time, three things had to arrive before ordinary people joined in. I use them as a test, and I call it the tool, stage and crowd test:

| Test | The question | When video passed it | Where games are today |
| --- | --- | --- | --- |
| Tool | Can a beginner make something good enough in minutes? | Phones shot decent video and apps did the editing | Passing: AI chat tools and no-code makers turn a description or a few choices into a playable game |
| Stage | Does your work get seen without an audience of your own? | Feeds started showing videos from strangers | Mostly missing: AI-made games sit behind share links nobody browses |
| Crowd | Do people answer what you make, so making turns social? | Likes, comments, duets and follows | Mostly missing: few places let you answer a game with a game |

Only the first row is about technology. The other two are about people.

## Why were games the last medium to open up?

A video records something; a game is a system. Even a tiny game needs rules, feedback, a difficulty that rises at the right pace, pictures, sound and code that runs on any phone. Each of those used to be its own skill, which is why games were made by teams.

Games have opened up in steps before. Level editors let players build on top of someone else's game: LittleBigPlanet came out in 2008 with the promise "Play, Create, Share." Scratch taught a generation of children to make games by snapping blocks together instead of typing code. Roblox and Minecraft turned players into builders of whole worlds. Each was a real step, but each asks you to learn its tools and to play inside its world, and what you make there mostly stays there.

## What does AI change, and what doesn't it?

AI passes the tool test almost overnight. In February 2025 Andrej Karpathy coined "vibe coding" for making software by describing it to an AI, and by November Collins had made it its word of the year. For games, it means anyone can ask Claude, Gemini or Kimi for a game and play the result a minute later. For small games, the skills barrier that kept most people out is close to gone.

What AI doesn't change is the stage and the crowd. A game made in a chat ends at a share link. People don't browse share links; they send one to a friend or two, who play once. There's no feed where strangers find it, no way to answer it and little reason to make a second one. I think that's why so many of these games are played a few times and forgotten: not because they're bad, but because almost nobody sees them.

Video taught the same lesson. In my view, cheap cameras didn't turn everyone into a filmmaker; a feed full of other people's videos did, because watching gave people ideas and an audience gave them a reason to post.

## What makes a game-making tool good for beginners?

The best design rule I know for creative tools comes from education. Seymour Papert argued that a good tool for programming has a low floor, so anyone can start, and a high ceiling, so people can keep growing. Mitchel Resnick and colleagues (2009), describing Scratch, added wide walls: room for many kinds of projects, so people with different interests all find something to make. They also set out to make Scratch more tinkerable, more meaningful and more social than the tools that came before it.

That's the rule I used for Pukytoon's Creator Studio:

- Low floor: you pick a game type and a look, and a live preview plays while you tune it. No blank page and no code.
- High ceiling: you can take a preset for how a game is won and lost, or write your own rule, like score ≥ 1000 or time ≥ 90, checked as you type.
- Wide walls: four game types (drop and merge, endless runner, match-3 and whack-a-mole), six looks and 74 pictures to swap in make hundreds of different games. A game made anywhere else with Claude, Gemini or Kimi can join the feed by its link.

A Studio game is saved as a few hundred bytes of data, the game type, settings, look and rules, so it loads instantly, works offline and can be shared and remixed safely.

## Why does making your own game matter so much?

The psychology of making is, to me, the strongest argument for opening game development to everyone. Norton, Mochon and Ariely (2012) found that people value things more when they've put them together themselves, an effect they named after IKEA. A simple game you made means more to you than a polished game you only played, and the friend you made it for knows it was made for them.

Self-determination theory explains why making keeps people coming back (Ryan & Deci, 2000). People need autonomy, competence and relatedness. A good tool gives all three: the choices are yours, the game works on the first try, and someone plays it. Take the audience away and the third need goes unmet, which is why I think the social side decides whether people make a second game.

BJ Fogg's behavior model makes the same point from another side: a behavior happens when motivation, ability and a prompt come together (Fogg, 2009). Plenty of people already want to make things. Raising their ability, so the first game takes minutes instead of months, does more than any amount of encouragement.

## How I'm applying this in Pukytoon

[Pukytoon](/work/pukytoon) is my attempt to pass all three tests at once. The feed is the stage: one game per screen, swiped like short videos, so trying a game costs one swipe. The Creator Studio and pasting a link are the tool. The crowd comes from everything around a game: sign in with just your email to share it with everyone, like other people's games, send any game to a friend with one link, or make your own version of someone else's. Every shared game carries its maker's name and @handle. Following makers, community features and an asset library come next.

Pukytoon is still in development, so it isn't open to play yet. If you'd like to know more, or to fund it, [email me](mailto:sinadehesh@gmail.com?subject=About%20Pukytoon).

## What could go wrong when everyone can make games?

Opening a medium to everyone brings everyone's problems with it: spam, copies, unsafe code and people who are unkind to beginners. I'd rather design for them from the start than add them later. In Pukytoon every pasted game runs sealed off from the app and from the other games, people can report and hide what they don't want to see, and until the safety checks for shared code are ready, only Studio games and links to Claude, Gemini or Kimi can be shared with everyone.

Rewards need the same care. Points and badges for publishing can crowd out the fun of making, which is the overjustification effect I cover in [gamification that doesn't backfire](/insights/gamification-overjustification-edtech). The social side needs even more thought, and I go through it piece by piece in [the social side of making games](/insights/social-side-of-making-games).

If making games goes the way of making videos, the games that matter most won't be the biggest ones. They'll be small: a game for a friend's birthday, a quiz only one class can pass, a remix of a remix that started as a joke. The tools are nearly ready. What's left is the place where people make games for each other, and that's what I'm building.
