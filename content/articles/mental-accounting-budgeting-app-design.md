---
{
  "title": "Mental Accounting in Budgeting Apps: Why Jars Beat Spreadsheets",
  "description": "Mental accounting app design: why labeled pots help people budget better than spreadsheets, six UI patterns built on earmarking, and where the habit backfires.",
  "topic": "fintech",
  "order": 4,
  "date": "2026-11-08",
  "keywords": ["mental accounting app design", "mental accounting examples budgeting", "envelope budgeting psychology", "earmarking money psychology", "budgeting app UX patterns"],
  "takeaways": [
    "People don't treat money as one interchangeable total; they sort it into labeled accounts, so budgeting apps work best when they offer labels, not just reports.",
    "A jar answers the question people ask at the moment of spending — can I afford this? — while a spreadsheet answers it a month too late.",
    "Show a safe-to-spend figure before the total balance: the total invites people to spend money already promised to rent and goals.",
    "Mental accounting also misleads: windfalls get spent freely and labeled pots can sit beside expensive debt, so good apps make those trade-offs visible."
  ],
  "faq": [
    {
      "q": "What is mental accounting?",
      "a": "Mental accounting is Richard Thaler's term for how people sort money into separate mental categories by source and purpose — rent money, fun money, a windfall — and treat each category differently, even though money is interchangeable (Thaler, 1985, 1999). It helps explain why labels change spending, why windfalls are spent freely and why people sometimes hold savings and debt at once."
    },
    {
      "q": "Why does envelope budgeting work psychologically?",
      "a": "Envelope budgeting turns a vague total into labeled limits that apply at the moment of spending. An envelope or jar makes the trade-off visible — this purchase comes out of that purpose — which restores some of the pain of paying that cards and phones remove (Prelec & Loewenstein, 1998). It works with mental accounting instead of asking people to ignore it."
    },
    {
      "q": "What are examples of mental accounting in budgeting apps?",
      "a": "Named savings pots, goal images on a savings account, a safe-to-spend figure instead of a raw balance, automatic splitting of income into pots on payday, a short pause before money leaves a labeled pot, and a prompt asking what to do with unexpected money. Each one uses earmarking: giving money a label and a job before it can be spent."
    },
    {
      "q": "Can mental accounting be bad for your finances?",
      "a": "Yes. Labels can keep money in the wrong place, such as an untouched vacation pot while a card balance charges interest. Windfalls also tend to be spent more freely than earned income, and small installments can slip past every budget category. Good app design keeps the benefits of labels while showing those trade-offs plainly."
    }
  ],
  "related": ["present-bias-savings-app-design", "loss-aversion-fintech-ux", "bnpl-pain-of-paying-consumer-credit-directive"],
  "caseStudies": ["costly"]
}
---
In my view, budgeting apps built around named jars or pots work better for most people than spreadsheet-style category reports, because they match how people already think about money. Nobody carries one interchangeable total in their head. We carry rent money, fun money, vacation money and money that "doesn't count" because it was a gift, and we treat each one differently. Richard Thaler called this mental accounting (Thaler, 1985, 1999).

A spreadsheet asks people to fight that habit. A jar puts it to work.

I haven't built a budgeting app, so this is design analysis rather than a case study. But I design around the same mechanism in [Costly](/work/costly), which prices losses against things people want, and the patterns below are the ones I'd ship, along with the ones I'd watch closely.

## What is mental accounting?

Mental accounting is the set of habits people use to sort, label and evaluate money. Economists call money fungible, meaning any euro can replace any other; mental accounting is the observation that people don't behave as if that's true (Thaler, 1999). Three habits matter most for app design:

1. Money is labeled by source and purpose. A tax refund, a salary and a birthday gift are the same euros, but they don't feel the same, and they don't get spent the same way.
2. Accounts are judged one at a time. People ask whether the groceries budget is fine, not whether their whole financial life is.
3. Labels create rules. Once money is "for rent," spending it on anything else feels like breaking a promise.

A budgeting app can treat these habits as errors to correct, or as the operating system it runs on. I think the second approach wins.

## Why do jars beat spreadsheets?

A spreadsheet is a report. It tells you, after the month ends, that eating out ran over budget. That's useful, but late: the decisions it describes have already been made.

A jar is a rule that's present at the moment of decision. When the eating-out jar shows €18 left on a Thursday, the trade-off is visible before you order. (The figures are hypothetical.)

There's a second reason. Cards and phones have made paying almost painless. Prelec and Loewenstein (1998) described the pain of paying and how tightly a payment is coupled to what it buys; the looser the coupling, the less spending hurts. A labeled jar re-couples a little: this purchase comes out of that purpose. That's the useful kind of pain — the kind that informs a decision instead of punishing it.

## Six patterns that put mental accounting to work

This is the table I'd hand a team designing a budgeting feature in a banking or fintech app.

| Pattern | What it does psychologically | How it can backfire |
| --- | --- | --- |
| Named pots | Turns a total into purposes; labels create rules | Too many pots become admin nobody maintains |
| Goal images | Makes a savings pot concrete and personal | A pretty picture with no plan behind it |
| Safe to spend | Separates committed money from free money | Read as an allowance to use up |
| Payday split | Allocates income once, the moment it arrives | A split that no longer fits gets quietly ignored |
| Raid pause | A brief moment naming the pot before money leaves it | Nagging that makes people hide money elsewhere |
| Windfall prompt | Gives unexpected money a job before it blends in | Feels intrusive if it fires for every small refund |

Two of these deserve more detail.

### Safe to spend, not total balance

A total balance is one of the most misleading numbers in banking. It includes rent due next week and money already promised to savings. Showing a safe-to-spend figure first — the total minus what's committed — answers the question people actually have at the checkout. Because it can read as an allowance to use up, I'd keep the committed amounts one tap away rather than hidden.

### The payday split

Allocation is a decision, and decisions are cheaper to make once than every day. Splitting income into pots the moment it arrives makes the plan the default instead of a monthly act of willpower. For why deciding early matters so much, see [present bias in savings apps](/insights/present-bias-savings-app-design).

## Where does mental accounting backfire?

Labels are powerful in both directions.

**Windfalls leak.** Money that arrives unexpectedly tends to be treated as less "real" than earned income, and spent more freely. A windfall prompt — "You received €140. Want to give it a job?" — catches that money before it blends into spending. (Hypothetical figures.)

**Labels can trap money in the wrong place.** Someone can keep a vacation pot untouched while paying interest on a card balance, because raiding a labeled pot feels worse than carrying debt. An app that sees both balances should point it out, kindly, and let the user decide.

**Small repayments slip past the accounts.** Installments spread across months don't feel like they belong to any jar, which is one reason buy-now-pay-later plans add up unnoticed. I go into that in [BNPL and the pain of paying](/insights/bnpl-pain-of-paying-consumer-credit-directive).

## A related move: pricing losses in things you want

In Costly, the mental-accounting move runs the other way. Instead of labeling where money should go, it labels what a loss costs. Every minute of doomscrolling is charged at the hourly rate the user set for their own time, and losses are framed against a five-tier ladder of things the user actually wants.

That's earmarking applied to losses. "€6 gone" is an abstract number. The same €6 measured against something on your own list is a loss from an account you care about. It also does something most people never do: it puts a price on their time. Once an hour has a rate, scrolling stops feeling free.

When a loss frame like this motivates and when it manipulates is the subject of [loss aversion in fintech UX](/insights/loss-aversion-fintech-ux).

## How I'd test a mental-accounting feature

Design opinion is cheap; behavior decides. If I were adding a safe-to-spend figure or a payday split to a banking app, I'd measure what the feature exists to change, such as overdrafts, missed bills and money that actually reaches savings, rather than taps on the feature. Engagement with jars tells you people like jars. It doesn't tell you they're better off.

Before designing the labels, I'd also interview a handful of users about how they already sort their money. People arrive with categories in their heads, in their own words. An app that adopts those words feels like it understands them; one that imposes its own taxonomy feels like homework.

People's money habits aren't bugs waiting for better data. Design with the labels people already use, show them the trade-offs those labels hide, and a budgeting app stops feeling like a report card and starts working like a set of promises the user made to themselves.
