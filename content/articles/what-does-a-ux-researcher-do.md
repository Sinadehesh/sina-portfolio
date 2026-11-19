---
{
  "title": "What Does a UX Researcher Do? Methods, Deliverables, Hiring",
  "description": "What does a UX researcher do? The job step by step, which UX research methods answer which question, how many users you need, and when to hire one.",
  "topic": "research",
  "order": 6,
  "date": "2026-11-19",
  "keywords": ["what does a ux researcher do", "ux researcher", "ux research methods", "freelance ux researcher", "ux researcher vs ux designer", "user researcher"],
  "takeaways": [
    "A UX researcher turns questions about users into evidence: framing the decision, choosing a method, recruiting, running sessions, analyzing them and making sure findings change what gets built.",
    "Pick the method from the question: interviews for why, usability tests for where people get stuck, experiments for whether A beats B, surveys for how many.",
    "Five users per round is a rule for finding problems in qualitative tests, not for measuring. NN/g has recommended 40 participants for quantitative studies since 2021.",
    "A UX researcher studies users and tests ideas; a UX designer shapes the flows and the interface. The roles overlap, but they start from different questions.",
    "Hire a UX researcher when a big decision rests on the answer, your team lacks the method, or it's too close to its own design to stay neutral."
  ],
  "faq": [
    {
      "q": "What does a UX researcher do day to day?",
      "a": "Most days mix planning, talking to users and analysis: writing a study plan or a screener, running interviews or usability sessions, coding notes and recordings, and sharing findings with designers, product managers and engineers. A less visible part of the job is follow-through: helping the team turn findings into priorities, then checking in the next round whether the changes worked."
    },
    {
      "q": "Is a UX researcher the same as a UX designer?",
      "a": "No, although the roles overlap and small teams often combine them. A UX researcher studies users and tests ideas: interviews, usability tests, surveys and experiments. A UX designer shapes the product: flows, wireframes, interfaces and prototypes. I'm a UX researcher and behavioral scientist, not a UX/UI designer: I plan and run the research and design the behavior change, and I work with designers and engineers who own the interface and the code."
    },
    {
      "q": "What are the main UX research methods?",
      "a": "Common methods include user interviews, usability tests, surveys, card sorting, diary studies, analytics and A/B tests or other experiments. Christian Rohrer's NN/g overview, updated in 2022, maps 20 methods on three dimensions: attitudinal versus behavioral (what people say versus what they do), qualitative versus quantitative, and how the product is used during the study. Choose the method by the question you need answered."
    },
    {
      "q": "Is five users enough for a usability test?",
      "a": "For finding problems in a qualitative test, five users per round is a good return on effort: Nielsen and Landauer's model estimated that five comparable users uncover about 85% of the problems. It isn't enough to measure anything, it assumes similar users, and results vary between groups of five. Run several small rounds, fixing problems in between, and test three or four people from each distinct user group."
    },
    {
      "q": "Should I hire a freelance UX researcher or an in-house one?",
      "a": "A freelance or contract UX researcher suits a defined study with a clear decision attached: interviews before a roadmap, usability tests before a launch, or an experiment to settle a disagreement. An in-house researcher suits teams that need research continuously, across several products. Either way, ask candidates to walk you through one study from question to decision, and what changed because of it."
    }
  ],
  "related": ["within-subjects-ux-experiments", "llm-assisted-thematic-analysis", "kano-vs-moscow-ai-features"],
  "caseStudies": ["recallmate", "interview-simulation-study", "passway"]
}
---
A UX researcher finds out what users need, what they actually do and where a product fails them, and makes sure that evidence changes what the team builds. The job runs from framing the question to recruiting, running sessions, analysis and following the findings into decisions.

The UK government's Digital and Data Profession Capability Framework has a clear definition: "User researchers plan, design and carry out research activities with users that help teams get a deep understanding of the people that use government services." Swap "government services" for your product and it fits almost anywhere. I'm a UX researcher and behavioral scientist in Milan, and this is the job as I practice it.

## What does a UX researcher do on a project?

A study runs in seven steps, from question to decision:

1. **Frame the question.** Turn "we need research" into the decision it serves, and agree on what answer would change the team's mind.
2. **Choose the method.** Match it to the question: what people say or what they do, why or how many.
3. **Recruit.** Screen for people who match the real users. Colleagues and friends are too kind and know too much.
4. **Run the sessions.** Pilot first to catch broken tasks and leading questions, then moderate neutrally.
5. **Analyze.** Code notes and recordings into themes (Braun & Clarke, 2006), count what can be counted, and use statistics where a number has to hold up.
6. **Share.** Ranked findings, with the evidence, in a form the team will read.
7. **Follow through.** Turn findings into priorities, check that the changes ship, and test again.

In my experience the last step is the one most often skipped, and the one that justifies the role. On a large study, [LLM-assisted thematic analysis](/insights/llm-assisted-thematic-analysis) can speed up step five without handing over the judgment.

## Which UX research methods answer which questions?

The clearest map I know is Christian Rohrer's Nielsen Norman Group (NN/g) article "When to Use Which User-Experience Research Methods," updated in 2022. It places 20 methods on three dimensions: attitudinal versus behavioral ("what people say" versus "what people do"), qualitative versus quantitative, and the context of use, from natural use of the product through scripted and limited use to none at all.

I pick the method from the question:

| If you need to know… | Method | Says or does |
| --- | --- | --- |
| What people need and why, in their words | Semi-structured interviews | Says |
| Where people get stuck | Moderated usability test | Does |
| How people would group your content | Card sorting | Says |
| How common a need or opinion is | Survey | Says |
| What people do over days or weeks | Diary study | Says what they did |
| What people do in the live product | Analytics and session recordings | Does |
| Whether design A beats design B | A/B test or controlled experiment | Does |

When a decision is big, I combine one "says" method with one "does" method, because the two often disagree.

## How many users do you need for UX research?

For qualitative usability testing, the well-known answer is five. Nielsen and Landauer (1993) modeled how many problems a test finds: in the projects they studied, a single user revealed 31% of the problems on average, and at that rate five users uncover about 85%. Nielsen (2000) drew the practical conclusion: instead of one test with 15 users, run three rounds of five and fix problems between rounds.

The five-user rule has limits, often dropped when it's quoted:

- **It's for finding problems, not measuring.** For quantitative studies, NN/g has recommended 40 participants since 2021; for card sorting, it recommends 15 per user group.
- **It assumes comparable users.** When groups differ substantially, test three or four people from each.
- **The average hides variation.** Faulkner (2003) drew random sets of five from 60 users and found anywhere from 55% to 99% of the problems.
- **It's a return on effort per round**, not a promise that nothing is left.

Experiments need more: my thesis compared three conditions with 96 participants, each seeing all three, a design I explain in [within-subjects UX experiments](/insights/within-subjects-ux-experiments).

## How do you measure usability?

ISO 9241-11:2018 defines usability as the "extent to which a system, product or service can be used by specified users to achieve specified goals with effectiveness, efficiency and satisfaction in a specified context of use." Each part points to a measure: effectiveness is whether people complete the task correctly, efficiency is the time or effort it takes, and satisfaction is how it felt. The word "specified" matters too: nothing is usable in general, only for particular people, goals and contexts.

For satisfaction, a common tool is the System Usability Scale (Brooke, 1996): ten statements rated on a five-point scale, converted, summed and multiplied by 2.5 to give a score from 0 to 100. Jeff Sauro (2011) analyzed 500 studies with more than 5,000 users and found an average of 68. A SUS score isn't a percentage: 68 is roughly the 50th percentile, and 80.3 or above roughly the top 10%.

## Which UX research deliverables actually get used?

A finding nobody acts on costs as much as one that changes the roadmap; the format often decides which it becomes. What gets used, and what it replaces:

- **A one-page summary** that starts with the decision, instead of a long deck read once.
- **Problems ranked by severity and frequency**, each with a fix and an owner, instead of every observation weighted equally.
- **Short clips of real users** stuck on real tasks, instead of quotes picked to win an argument.
- **Personas built from evidence** and tied to decisions, instead of assumptions with invented hobbies.
- **A prioritized backlog** using Kano or MoSCoW, instead of recommendations with no owner. (I compare them in [Kano or MoSCoW](/insights/kano-vs-moscow-ai-features).)

## What's the difference between a UX researcher, a UX designer and a market researcher?

The roles overlap, and small teams often combine two. The clearest difference is the starting question:

| | UX researcher | UX designer | Market researcher |
| --- | --- | --- | --- |
| Starts from | What do users need, and where does the product fail them? | How should this work, look and feel? | Who will buy, how many, at what price? |
| Typical work | Interviews, usability tests, experiments | Flows, wireframes, interfaces, prototypes | Surveys, panels, sizing, segmentation |
| Main output | Evidence, and the decisions it supports | A design ready to build | A picture of the market |

To be plain: I'm a UX researcher and behavioral scientist, not a UX/UI designer. I plan and run the research and design the behavior change, such as which step to remove or what to ask first, and I work with designers and engineers who own the interface and the code. For the market side, see [how market insights differ from market research](/insights/what-are-market-insights).

## What UX research looks like in my work

I've run more than 240 interviews and usability tests across my research. Three projects show different parts of the job.

[RecallMate](/work/recallmate) was an AI-assisted learning app I worked on as a research intern at the University of Milano-Bicocca in 2025. I designed and ran multi-round user interviews and coded them thematically, made Figma prototypes of the full student journey to test, ran pilot studies and usability tests, and turned the results into MoSCoW priorities. It stayed a prototype, so the output was a research-backed scope, not a launch.

My M.Sc. thesis was a [controlled experiment with 96 participants](/work/interview-simulation-study), each taking an automated interview in three formats: self-view, an AI avatar and text only. A repeated-measures ANOVA with Holm-corrected post hoc tests showed that candidates were significantly more expressive with the AI avatar than when they saw themselves, p = .009. My interpretation is that seeing yourself can make you self-conscious, while an avatar gives you someone to talk to. Either way, an interface detail changed behavior.

Passway was a team project with engineer friends, where I worked on product and behavioral design. Its map only worked if students entered what their courses covered, and they weren't entering enough. I suggested the swipe from dating apps, changed to fit data entry, and in a test with engineering students they entered much more data and enjoyed it more.

## When should you hire a UX researcher instead of doing it yourself?

Plenty of research doesn't need a specialist. If the question is narrow, such as whether people can find the export button, a product manager or designer can watch five people try, fix what breaks and test again.

Bring in a UX researcher, freelance or in-house, when:

- a big decision rests on the answer, such as a redesign or a new audience;
- you need a method the team doesn't have, such as an experiment, a psychometric scale or statistics that will hold up;
- the team is too close to its own design to run a neutral session;
- research has to run in several languages or markets;
- findings keep ending up in decks instead of on the roadmap.

I work on [UX research](/ux-research) projects in Milan, Turin, across Europe and remotely, in four languages, and I'm open to in-house and contract roles. Whoever runs your next study, start it with one question: what will we do differently if the answer surprises us?
