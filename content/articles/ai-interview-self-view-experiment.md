---
{
  "title": "Self-View vs. an AI Avatar: An N = 96 AI Interview Experiment",
  "description": "An AI interview experiment (N = 96): candidates were more expressive with an AI avatar than when they saw themselves. The design, results, limits and lessons.",
  "topic": "ai-products",
  "order": 3,
  "date": "2026-11-08",
  "keywords": ["AI interview simulation study", "self view video interview effect", "AI avatar interview", "automated interview candidate behavior", "AI interview UX fairness", "within-subjects interview experiment"],
  "takeaways": [
    "In an automated interview experiment (N = 96, within-subjects), candidates were significantly more expressive with an AI avatar on screen than when they saw themselves: p = .009.",
    "Interface choices in AI interviews are not cosmetic: a default self-view, as in video calls, may suppress expressiveness, and what candidates see can change what the system measures.",
    "Apply the mirror rule: if you wouldn't hang a mirror behind the interviewer for half your candidates, keep your interface identical for everyone.",
    "A p-value shows a difference is unlikely to be chance, not that it matters; one simulated study needs replication before anyone builds policy on it."
  ],
  "faq": [
    {
      "q": "Does seeing yourself on video change interview behavior?",
      "a": "In my within-subjects experiment with 96 participants in an automated interview simulation, yes: candidates were significantly more expressive with an AI avatar on screen than when they could see themselves, p = .009. It's one study in a simulated setting, so it should be replicated, but it shows that what candidates see on screen is not neutral, and that a default self-view may hold people back."
    },
    {
      "q": "What is an AI interview simulation study?",
      "a": "It is an experiment in which participants answer interview questions from an automated system while the researcher varies one element of the setup, such as what appears on screen, and measures how behavior changes. Mine compared three formats, self-view, an AI avatar and text only, with every participant experiencing all three, and analyzed the results with repeated-measures ANOVA and Holm-corrected post hoc tests."
    },
    {
      "q": "Is it fair to use AI for job interviews?",
      "a": "It can only be fair if every candidate is assessed under the same conditions and knows they are dealing with an AI system. My research suggests that interface details, such as whether candidates see themselves or an AI avatar, change behavior, so they should be fixed, disclosed and tested. Anything that infers emotions needs careful legal review in the EU. This is not legal advice."
    },
    {
      "q": "Why use a within-subjects design for this kind of study?",
      "a": "Because each participant experiences every condition, they act as their own comparison, which removes much of the variation between people. That gives a moderate sample far more statistical power than splitting participants into separate groups. The trade-off is carryover from one condition to the next, which is why order effects have to be controlled."
    }
  ],
  "related": ["within-subjects-ux-experiments", "algorithm-aversion-product-design", "ai-feedback-student-writing-teacher-in-loop"],
  "caseStudies": ["interview-simulation-study"]
}
---
Seeing yourself on screen changes how you behave in an interview. In my M.Sc. thesis experiment, an automated interview simulation with 96 participants, candidates were significantly more expressive with an AI avatar on screen than when they could see themselves, p = .009.

That matters because AI-led interviews are spreading while little is known about how their interfaces shape candidate behavior. Many video tools show people their own image by default. If what a candidate sees on screen changes how they present themselves, interface choices are not cosmetic. They can change what the system measures, and potentially who gets through.

## What did the experiment test?

The question was simple: does what candidates see on screen in an automated interview change how they present themselves? My hypothesis was that what candidates see of themselves on screen changes how expressive they are.

The thesis is titled "The Psychological Effects of Self-Referential Information in Asynchronous Automated Interviews: A Comparison of Self-View, Avatar, and Text-Only Formats", and the subtitle is the design. Asynchronous means there is no live interviewer: the system asks pre-set questions and the candidate answers. Candidates answered in three formats: self-view, where they could see their own image; an AI avatar; and text only. Every participant went through all three, a within-subjects design, with order effects controlled across conditions. Each person served as their own comparison, which gives a moderate sample much more statistical power than splitting 96 people into three separate groups.

I analyzed the results with a repeated-measures ANOVA, followed by Holm-corrected post hoc tests to compare the formats pair by pair. The Holm correction adjusts for running several comparisons at once, so a difference isn't declared just because one test out of several came up lucky. The study is summarized on its [case page](/work/interview-simulation-study).

## What did I find?

The key contrast was self-view against the AI avatar. Candidates were significantly more expressive with the avatar than when they saw themselves, p = .009. Text only was the third format; the result I report here is the contrast between self-view and the avatar.

Two cautions on reading that. A p-value of .009 says a difference this large would be unlikely if the formats made no real difference; it doesn't say how big the effect is in practical terms. And "more expressive" is a description, not a verdict. Whether it's better depends entirely on what an interview is trying to measure.

## Why would seeing yourself change your behavior?

What follows is my interpretation, not something the design can prove. The idea is self-awareness. When something turns your attention onto yourself, like a mirror or a camera preview, you start checking yourself against how you want to come across. That inward attention can make people more self-conscious and more guarded: part of the effort goes into watching yourself instead of talking.

An avatar changes where attention points. It gives candidates a social presence to talk to, something closer to a listener than to a mirror, so attention can stay on the conversation. In this experiment, the evidence fits that reading: candidates were more expressive facing the avatar than facing their own image.

What the design can't settle is the mechanism. Self-awareness is the explanation I find most convincing, but comparing formats shows that what candidates saw changed their behavior, not exactly why.

## What does this mean for AI interview design?

If I had to compress the implications into one rule, it would be what I call the mirror rule: if you wouldn't hang a mirror behind the interviewer for half your candidates, don't let your interface do the equivalent. My result suggests the mirror itself deserves scrutiny: a default self-view, as in most video calls, may suppress expressiveness.

In practice:

1. **Treat self-view as a design decision, not a default.** Many video tools show it automatically. In an automated interview, whether candidates see themselves is a choice, and in my experiment it went with less expressiveness than an AI avatar.
2. **Keep conditions identical across candidates.** If mobile users see themselves and desktop users don't, or some candidates hide the preview, you've introduced variation that has nothing to do with the job.
3. **Find out whether your scoring is sensitive to expressiveness.** If an AI system rates anything like communication or engagement, the interface may move the score. That's my inference from the result, and it's the kind of thing to test rather than assume away.
4. **Test interface variants on people, not just models.** It's easy to validate a scoring model carefully and ship the screen around it untested. A within-subjects study like this one is a practical check; I explain the method in [within-subjects UX experiments](/insights/within-subjects-ux-experiments).
5. **Tell candidates what they'll see and why.** Predictability is part of fairness, and an avatar should never leave anyone unsure whether a person is watching.

The same lesson applies wherever AI output passes through a person: how something is shown shapes what people do with it. I look at that case for teachers in [AI feedback on student writing, with the teacher in the loop](/insights/ai-feedback-student-writing-teacher-in-loop).

## Fairness, transparency and the rules

If interface choices change candidate behavior, they can change outcomes too. A candidate assessed through a different screen isn't being assessed on the same terms, and that's a fairness problem even if every model downstream is sound.

Candidates' trust matters as well. People lose confidence in an algorithm quickly after seeing it err (Dietvorst, Simmons & Massey, 2015), a pattern I discuss in [algorithm aversion](/insights/algorithm-aversion-product-design). Predictable, explained conditions help keep that trust from being lost in the first place.

In the EU there's also a legal dimension. The AI Act's transparency rules in Article 50, which have applied since 2 August 2026, include telling people when they are interacting with an AI system. And since 2 February 2025, the Act has prohibited emotion recognition in workplaces, except for medical or safety reasons, so any interview product that infers emotions from faces or voices needs careful legal review. This is not legal advice.

## What can't this study tell you?

Honest limits matter more than the p-value:

- **It was a simulation.** Real interviews carry real stakes, which could strengthen or weaken the effect.
- **Expressiveness is one outcome.** The result I'm reporting is about expressiveness, not hiring decisions, and more expressive isn't automatically better.
- **It's one study.** Different interfaces, avatars, populations or cultures could behave differently, so the result needs replication.
- **Order effects were controlled, not erased.** Within-subjects designs trade some risk of carryover for statistical power.
- **The mechanism is inferred.** The design shows an effect of what candidates saw, not what caused it inside people's heads.

## How would you test your own interview interface?

You don't need a thesis to check whether your interface shifts behavior. A small within-subjects test is a good first check:

1. **Pick one visual element.** Self-view, an avatar or a countdown timer, one at a time.
2. **Decide the outcome in advance.** Name the behavior that matters to your scoring, and how you'll measure it, before you see any data.
3. **Give every participant every version,** in varied order, so each person is their own comparison and order effects can be controlled.
4. **Hold everything else fixed.** Same questions, same timing, and the same device where possible.
5. **Read the size, not just the p-value.** A tiny but significant difference may not matter; a large one in a small pilot deserves a proper study.

If you build or buy an AI interview tool, run this before your next release. If candidates behave differently across versions, you've learned something your scoring model could never tell you on its own. The interface is part of the instrument.
