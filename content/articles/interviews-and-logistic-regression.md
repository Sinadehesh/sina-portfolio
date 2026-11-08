---
{
  "title": "From 200 Interviews to One Model: Interviews Plus Logistic Regression",
  "description": "How to analyze interview data statistically with binary logistic regression: codable interview design, the outcome, sample size per predictor and odds ratios.",
  "topic": "research",
  "order": 1,
  "date": "2026-11-08",
  "keywords": ["binary logistic regression interviews", "mixed methods interview analysis", "analyze interview data statistically", "logistic regression on interview data", "coding interviews into variables", "how to interpret odds ratios"],
  "takeaways": [
    "Binary logistic regression turns structured interviews into evidence about which factors travel with a yes-or-no outcome, holding the others constant.",
    "Design the interview for the model before the first conversation: a fixed, codable core for the variables and open questions for the why.",
    "Your predictor budget is set by the smaller outcome group, not the total sample; a common rule of thumb is about ten events per predictor.",
    "An odds ratio of 2 doubles the odds, not the probability. Translate results into plain probabilities before showing them to a product team.",
    "Regression shows which factors move with the outcome; the interview stories explain why. You need both, and neither proves causation."
  ],
  "faq": [
    {
      "q": "Can you use logistic regression on interview data?",
      "a": "Yes, if the interviews are structured so that answers can be coded into variables and there is a clear yes-or-no outcome, such as whether someone renewed, bought or dropped out. You need a fixed core of questions asked the same way to everyone, a written codebook, and enough people in the smaller outcome group to support the number of predictors you want to test."
    },
    {
      "q": "How many interviews do you need for logistic regression?",
      "a": "It depends on the smaller of your two outcome groups, not the total. A common rule of thumb asks for roughly ten people in that smaller group for each predictor, though methodologists treat it as a rough guide. With 150 interviews and only 40 people who canceled, you can support about four predictors. With far fewer, stick to thematic analysis."
    },
    {
      "q": "What is mixed methods interview analysis?",
      "a": "It combines a statistical analysis of coded interview answers with a qualitative analysis of what people said. The regression shows which factors are associated with an outcome, and thematic analysis of the open answers explains the mechanism behind each association. Each checks the other: a strong odds ratio without a story is suspicious, and a vivid story without the numbers may be an outlier."
    },
    {
      "q": "How do you interpret an odds ratio from logistic regression?",
      "a": "An odds ratio above 1 means the factor is associated with higher odds of the outcome; below 1, lower odds. An odds ratio of 2 doubles the odds, which is not the same as doubling the probability. Read it with its confidence interval, and for stakeholders, convert it into predicted probabilities for realistic cases. In SPSS, the odds ratio is the Exp(B) column."
    }
  ],
  "related": ["llm-assisted-thematic-analysis", "jobs-to-be-done-market-fit-interviews", "within-subjects-ux-experiments"],
  "caseStudies": []
}
---
You can analyze interview data statistically, and binary logistic regression is one of the most useful ways to do it. When interviews are structured so that answers can be coded into variables, the model tells you which factors travel with a yes-or-no outcome, holding the others constant. The interviews then tell you why.

I've used this combination at volume. In 2018, as a volunteer researcher at the Salami Rehabilitation Center in Shiraz, I conducted 200 semi-structured interviews and analyzed them with binary logistic regression in SPSS. This piece is about the method, not that study's question or findings, and about what product teams can borrow from it when they want numbers from interviews.

## When does logistic regression make sense for interviews?

Logistic regression answers a specific kind of question: what is associated with whether something happened? Did the customer renew? Did the trial user upgrade? Did the member come back after the first month?

It fits interview research when three things are true:

- **The outcome is binary and observable.** Renewed or not, bought or not, ideally checked against records rather than only self-reported.
- **You can ask the same core questions of everyone.** The model needs the same variables for every person.
- **You have enough people in both outcome groups.** This is the constraint teams underestimate, and I come back to it below.

If any of these fail, don't force it. Thematic analysis on its own is a perfectly good method, and a well-coded qualitative study beats a regression with too little data.

## How do you design interviews you can code?

Decide what the model needs before the first conversation. I think of a codable interview as three layers:

| Layer | What you ask | Example (hypothetical subscription app) | Becomes |
| --- | --- | --- | --- |
| 1. Facts | Closed questions, same wording for everyone | "How did you first hear about us?" | Categorical variables |
| 2. Judgments | Ratings on a fixed scale | "How easy was setup, from 1 to 5?" | Ordinal or numeric variables |
| 3. Stories | Open prompts and follow-ups | "Tell me about the last time you almost canceled." | Themes, coded afterwards |

Layers one and two give the model its predictors directly. Layer three is what makes it a semi-structured interview rather than a survey read aloud. It produces the explanations, and a recurring theme can also become a predictor, coded present or absent for each person.

Two rules keep the variables honest. Ask layers one and two the same way every time, because a fixed core is worthless if the wording drifts across conversations. And code layer three with a written codebook, ideally without knowing each person's outcome, so the outcome can't steer the coding. The coding itself follows standard thematic analysis (Braun & Clarke, 2006).

## How many interviews do you need?

In my view, this is where interview-to-model projects most often go wrong. The limit isn't your total sample; it's the number of people in the smaller outcome group.

A common rule of thumb asks for roughly ten events, meaning people in that smaller group, per predictor. Methodologists treat it as a rough guide rather than a law, but it's a good brake on enthusiasm. Here's a hypothetical: you interview 150 trial users, and 40 of them upgraded. Your budget is about four predictors, not fifteen. Code fifteen variables anyway and the model will happily fit noise, with odds ratios that look precise and mean little.

Small samples cause a second, sneakier problem called separation. If everyone in one category had the same outcome, the model can't estimate that effect, and you'll see huge coefficients with enormous standard errors. It's common with categories coded from interviews, so merge sparse categories before you model, not after.

## Which assumptions should you check?

Logistic regression is forgiving, but not infinitely. My checklist before trusting any output:

1. **One row per person.** Observations must be independent, so nobody appears twice.
2. **No severe multicollinearity.** Two predictors that measure the same thing, such as time with the product and number of sessions, will steal each other's effect. Check correlations and collinearity diagnostics.
3. **Linearity in the log-odds** for numeric predictors. A quick check is to add each predictor's interaction with its own natural log, the Box-Tidwell approach.
4. **No single case driving the result.** Look at residuals and influence statistics for the people the model fits worst.
5. **Predictors chosen in advance.** Pick them from the research question and the layer-three themes before running anything, so you're not shopping for significance.

SPSS gives you most of the rest in its standard output: the omnibus test, pseudo-R² values, the Hosmer-Lemeshow test if you request it, and a classification table. Read the classification table with care. With an unbalanced outcome, a model that predicts the bigger group for everyone can look impressive.

## How do you read an odds ratio?

The number people misread most is the odds ratio, the Exp(B) column in SPSS. An odds ratio of 2 means the odds of the outcome double for a one-unit change in that predictor, holding the others constant. Odds aren't probabilities. If one in five people in a group upgrades, their odds are 1 to 4. Doubling the odds gives 2 to 4, which is one in three, not two in five.

Three habits make the results usable:

- **Report the confidence interval every time.** With interview-sized samples, intervals are wide, and an odds ratio of 3 with an interval from 0.9 to 10 is a shrug, not a finding.
- **Translate into probabilities for realistic cases.** "Among users like these, roughly one in three upgrades if setup was hard, and about one in two if it wasn't" is something a product team can act on.
- **Say "associated with", not "causes".** Interviews aren't randomized. People who struggled with setup may differ in ten other ways.

## What 200 interviews taught me about the method

What carries over from the Salami Rehabilitation Center work is the method's discipline, not its findings, which I'm leaving out of this piece.

Two hundred semi-structured interviews give small inconsistencies plenty of room to compound. The value of the fixed core comes from asking it identically every time, and the value of the model comes from choosing the outcome and the predictors before the data has a chance to suggest them. Nearly everything that makes the analysis trustworthy is decided before the first interview.

The qualitative half of the method runs through my later product research. How I'd speed up the coding without losing rigor is in [LLM-assisted thematic analysis](/insights/llm-assisted-thematic-analysis). When the outcome is which customer segment to build for, the interviews follow a different structure, described in [jobs-to-be-done interviews for market fit](/insights/jobs-to-be-done-market-fit-interviews).

## What should product teams take from this?

If you want numbers from interviews, here is the short version:

1. Decide the yes-or-no outcome first, and check it against records where you can.
2. Count your smaller outcome group and set your predictor budget before writing questions.
3. Build a fixed, identically worded core, and keep the stories open.
4. Code open answers with a codebook, blind to the outcome if possible.
5. Report odds ratios with intervals, translated into plain probabilities.
6. Use the stories to explain every association you report, and treat any association you can't explain as a question for the next round, not a finding.

When the question is causal, such as whether a change will make people upgrade, stop interviewing and run an experiment. [Within-subjects UX experiments](/insights/within-subjects-ux-experiments) are a good place to start when samples are small, and designing studies like these is part of the consumer research in my [consumer psychology consulting](/consumer-psychology).

The combination works because each half keeps the other honest. A model without stories is a list of numbers nobody believes, and stories without a model are anecdotes with good lighting. Design for both from the first question, and two hundred conversations become one argument you can defend.
