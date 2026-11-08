---
{
  "title": "The EU AI Act in Education: Proctoring, Grading and Emotion AI",
  "description": "The EU AI Act in education: the emotion recognition ban, which EdTech uses count as high-risk, the new December 2027 date and what builders should do now.",
  "topic": "ai-education",
  "order": 3,
  "date": "2026-11-08",
  "keywords": ["EU AI Act education", "AI Act high risk education", "emotion recognition ban education AI Act", "AI proctoring EU AI Act", "AI Act EdTech compliance", "Digital Omnibus AI Act education"],
  "takeaways": [
    "Since 2 February 2025, the EU AI Act has prohibited emotion recognition in educational institutions, except for medical or safety reasons.",
    "Four education uses are high-risk under Annex III: admission or access, evaluating learning outcomes, assessing the appropriate level of education and monitoring prohibited behavior during tests.",
    "The Digital Omnibus, Regulation (EU) 2026/1744, moved those high-risk obligations to 2 December 2027; chatbot transparency under Article 50 has applied since 2 August 2026.",
    "Use the extra time to design teacher oversight into grading and proctoring flows now; oversight bolted on late tends to become a rubber stamp."
  ],
  "faq": [
    {
      "q": "Is AI in education high-risk under the EU AI Act?",
      "a": "Some of it. Annex III of the AI Act lists four education uses as high-risk: deciding admission or access, evaluating learning outcomes (including when that steers the learning process), assessing the appropriate level of education, and monitoring prohibited behavior during tests. Many other tools, such as a chatbot that answers study questions, are not on that list but still carry transparency duties. This is not legal advice."
    },
    {
      "q": "Is emotion recognition banned in schools under the AI Act?",
      "a": "Yes. Among the AI Act's prohibited practices, which have applied since 2 February 2025, is emotion recognition in workplaces and educational institutions, except where it is used for medical or safety reasons. In product terms, features that infer whether students are bored, stressed or engaged from their faces or voices deserve legal review before anyone builds them, and existing ones should be reviewed now. This is not legal advice."
    },
    {
      "q": "When do the AI Act high-risk rules apply to EdTech?",
      "a": "The Annex III high-risk obligations, which include the four listed education uses, were originally due on 2 August 2026. The Digital Omnibus on AI, Regulation (EU) 2026/1744, in force since 27 July 2026, moved them to 2 December 2027. Some rules already apply: the emotion recognition ban and Article 4 on AI literacy since 2 February 2025, and Article 50 transparency since 2 August 2026. This is not legal advice."
    },
    {
      "q": "Is AI proctoring allowed under the EU AI Act?",
      "a": "Proctoring is not banned as such. AI used to monitor and detect prohibited behavior during tests is listed as high-risk in Annex III, with obligations, including human oversight under Article 14, now applying from 2 December 2027. A proctoring feature that infers students' emotions in an educational institution is a different matter: emotion recognition there has been prohibited since 2 February 2025, except for medical or safety reasons. This is not legal advice."
    }
  ],
  "related": ["ai-feedback-student-writing-teacher-in-loop", "ai-act-life-health-insurance-pricing", "ai-study-tools-that-teach"],
  "caseStudies": ["recallmate", "passway"]
}
---
The EU AI Act regulates education in layers. Emotion recognition in educational institutions has been prohibited since 2 February 2025. AI used for admissions, evaluating learning, placement and exam monitoring is high-risk, with those obligations now applying from 2 December 2027. And since 2 August 2026, people have had to be told when they are interacting with an AI system.

I'm a product builder, not a lawyer. I've designed learning products — [RecallMate](/work/recallmate), an AI-assisted study app, and [Passway](/work/passway), a curriculum-gap tracker — and this is how I'd sort education features before anyone writes code. The law is Regulation (EU) 2024/1689, and the details of any real product belong with counsel.

## What does the AI Act ban in education?

The prohibited practices in Article 5 have applied since 2 February 2025. One of them is aimed squarely at schools and workplaces: emotion recognition in workplaces and educational institutions is banned, except where it is used for medical or safety reasons.

In product terms, the features to scrutinize often go by friendlier names: "engagement analytics" that read students' faces on a webcam, or a tutor that claims to hear frustration in a student's voice.

My rule is blunt. If a feature infers how students feel from their faces or voices and it will be used in a school, don't build it without legal review — and if it already exists, review it now. Whether a specific feature meets the legal definition is a question for a lawyer, and nothing here is legal advice.

## Which education uses are high-risk?

Annex III lists four uses in education as high-risk:

1. Admission and access — AI used to decide who gets into an institution or program.
2. Evaluating learning outcomes — including when that evaluation is used to steer a person's learning process.
3. Assessing the appropriate level of education a person will receive or be able to access.
4. Monitoring and detecting prohibited behavior during tests — in other words, AI proctoring.

High-risk systems carry obligations that include human oversight (Article 14), and Article 86 gives people a right to an explanation of certain high-risk decisions about them. The Digital Omnibus on AI, Regulation (EU) 2026/1744, published on 24 July 2026 and in force since 27 July 2026, moved the Annex III high-risk obligations from 2 August 2026 to 2 December 2027.

Look closely at the second category. "Steering the learning process" sounds abstract, but it can describe everyday adaptive learning: an engine that scores a student's answers and decides which unit comes next. Teams rarely think of that as evaluating learning outcomes, which is exactly why it's worth asking the question early.

## The EdTech risk map

Here is how I'd place common features. "Likely zone" is a builder's first pass, not a legal conclusion.

| Feature | Likely zone | Applies | What I'd do now |
| --- | --- | --- | --- |
| Webcam or voice analysis that infers students' emotions in class | Prohibited: emotion recognition in educational institutions | Since 2 Feb 2025 | Don't build it; review anything similar already live |
| AI proctoring that flags suspicious behavior | High-risk: monitoring prohibited behavior during tests | From 2 Dec 2027 | A human reviews every flag; no automatic sanctions |
| Essay scoring that counts toward grades | High-risk: evaluating learning outcomes | From 2 Dec 2027 | The teacher decides the grade; AI drafts feedback |
| Adaptive engine that scores answers and picks the next unit | Possibly high-risk: evaluation used to steer learning | From 2 Dec 2027 | Ask counsel early; log decisions; let teachers override |
| Placement test that sets a student's level | High-risk: appropriate level of education | From 2 Dec 2027 | Plain-language explanations and a way to appeal |
| Admissions screening | High-risk: admission and access | From 2 Dec 2027 | A human makes the decision and records the reasons |
| Study chatbot for students | Transparency (Article 50) | Since 2 Aug 2026 | Tell students clearly, and persistently, that it's an AI |
| Any AI tool staff use | AI literacy (Article 4) | Since 2 Feb 2025 | Train teachers on what the tool can and can't do |

The map makes one thing obvious: the question is never "is this AI?" It is "does this decide something about a student?" Admission, grades, level, sanctions — that is where the Act concentrates its obligations, and where design has the most work to do. Which zone a real feature falls into depends on facts only a lawyer can weigh; treat the table as a starting point, not legal advice.

## How I'd place RecallMate and Passway on the map

RecallMate is a concept and Figma prototype from my research internship at the University of Milano-Bicocca: conversational AI that drafts and explains flashcards, with a simplified SM-2 scheduler deciding when each card comes back. The conversational layer is the easy part. Students need to know they are talking to an AI, which a well-designed tutor should make obvious anyway — one of the patterns in [designing AI study tools that teach](/insights/ai-study-tools-that-teach).

The scheduler is the interesting part. It evaluates recall and steers what a learner reviews next. For someone studying on their own, that's a study aid. If a university adopted it to evaluate students and steer their coursework, I'd want a lawyer's view on the "evaluating learning outcomes" category before launch.

Passway is a prototype that compares 10 core engineering topics across 6 university programs, using a two-source model: a canonical curriculum against what programs actually teach. It evaluates programs, not people. The moment a tool like it starts scoring an individual learner and deciding which level or program they can access, the question changes. Both are judgment calls I'd put to counsel, not legal conclusions.

## Why the delay to December 2027 isn't a reason to wait

The Omnibus gave EdTech more time. I'd spend it designing, for three reasons.

Oversight is a design property, not a document. In my view, human oversight only means something if the product gives the human real material to oversee: the evidence, a clear decision point, and the time and authority to disagree. Retrofitting that into a grading flow means rebuilding the interface and the teacher's workload.

Rubber stamps are the default. People over-rely on automated aids, both by missing problems the system doesn't flag and by following its wrong advice (Skitka, Mosier & Burdick, 1999). A teacher approving AI scores at the end of a long day is exactly the setting where that happens. I set out a workflow that designs against it in [AI feedback on student writing, with the teacher in the loop](/insights/ai-feedback-student-writing-teacher-in-loop).

Some rules already apply. The emotion recognition ban, Article 4 on AI literacy and Article 50 transparency are not waiting for 2027. The same oversight questions are playing out elsewhere, too — see [the AI Act's high-risk rules for life and health insurance pricing](/insights/ai-act-life-health-insurance-pricing).

## What EdTech builders should do this quarter

1. **Inventory** every feature that decides something about a student: admission, grade, level, next unit, sanction.
2. **Remove, or get legal review for,** anything that infers emotions from faces or voices in school settings.
3. **Label** every AI interaction for students and teachers, in the interface rather than the terms.
4. **Design teacher review** into grading and proctoring flows, with the evidence on screen and a cheap way to disagree.
5. **Write explanations** a student can understand for any decision that affects them.
6. **Train teachers** honestly on what each tool can and can't do.
7. **Keep a decision log:** what the system recommended, what the person decided, and why.

None of this replaces legal advice for your specific product, but every item is good design whatever the regulation says. If you only do one thing this quarter, start the inventory. That is often where the surprises are: features nobody thought of as evaluation can turn out to be steering students' learning every day.
