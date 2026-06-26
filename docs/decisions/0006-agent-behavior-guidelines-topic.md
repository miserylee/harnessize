# Decision 0006: Agent Behavior Guidelines Topic

Date: 2026-06-27

Status: Baseline and coding domain implemented

## Context

Harnessize may need a focused topic for agent behavior guidelines.

The topic name is:

```sh
npx harnessize@latest context conduct
```

The scope is intentionally not settled yet. Candidate areas include conversation style, design
judgment, coding behavior, testing behavior, implementation restraint, communication density, and
cross-agent portability.

This topic should not become a giant always-on manual. It should preserve harnessize's progressive
context model: root context routes intent, then focused topics provide only the relevant guidance.

## Initial Research Findings

### Ponytail

Ponytail is a behavior skill centered on implementation restraint. Its core pattern is a decision
ladder: question whether the work needs to exist, reuse existing code, prefer standard library and
native platform features, use installed dependencies before adding new ones, and only then write the
minimum code that works.

Useful ideas for harnessize:

- Behavior guidelines can encode engineering taste as ordered decision gates, not just prose values.
- "Do less" still requires understanding the real code path first.
- A behavior topic needs explicit boundaries so restraint does not remove validation, security,
  accessibility, or user-requested scope.
- Behavior guidelines can include intensity levels, but harnessize may not need that complexity
  initially.

### Caveman

Caveman is primarily a communication compression skill. It reduces filler, pleasantries, hedging,
tool narration, decorative formatting, and long logs while preserving technical accuracy and the
user's language.

Useful ideas for harnessize:

- Communication behavior is separable from build behavior.
- Terse output needs safety valves: security warnings, destructive actions, ambiguous multi-step
  sequences, and clarification requests should drop compression when clarity matters.
- "Short" should mean less cognitive load, not missing technical substance.

### Skills And Portability

The Agent Skills model uses progressive disclosure: lightweight metadata is discoverable up front,
full instructions load only when triggered, and additional files/resources load as needed.

Ponytail's portability docs separate core behavior from host-specific adapters. That matches
harnessize's direction: keep repository injection thin and keep behavior guidance in harnessize
contexts rather than copying large manuals into user repositories.

## Early Synthesis

The likely harnessize topic should use a layered shape:

1. Baseline behavior contract: general expectations that apply across agent work.
2. Domain behavior extensions: focused additions for domains such as conversation, design, coding,
   testing, research, or documentation.

The baseline should not try to encode every domain-specific behavior. It should define durable
defaults and routing expectations. Domain extensions can then refine behavior without bloating the
base topic.

The topic should separate at least three concerns:

1. Behavioral judgment: what the agent should prefer or avoid while producing work.
2. Communication contract: how much and what kind of information the agent should send to the user.
3. Activation boundaries: when this topic should apply, when another topic is more specific, and
   when ordinary repository-aware behavior is enough.

The main risk is scope creep. "Agent behavior guidelines" can absorb everything. The topic needs a
clear first version, probably as a compact baseline behavior contract rather than an exhaustive
engineering handbook.

## Candidate V1 Baseline Conduct

The first version should stay small and domain-neutral:

Application loop:

1. Inspect enough context to avoid guessing.
2. Form an explicit plan before changing durable state.
3. Confirm the plan with the user when shape, impact, or risk cannot be safely inferred.
4. Choose the existing or simplest sufficient path.
5. Move in focused, reversible steps.
6. Verify what changed.
7. Report the outcome, limits, and any needed user decision concisely.

Baseline rules:

1. Understand before acting: inspect available context before broad changes or confident claims.
2. Prefer the existing path: reuse repository patterns, local helpers, platform features, and
   already-available dependencies before adding new machinery.
3. Prefer the simplest sufficient explanation or solution: do not choose a more complex model,
   architecture, process, or rule when a simpler one handles the evidence and requirements.
4. Calibrate confidence: distinguish observed facts, inferences, assumptions, and uncertainty when
   the difference matters.
5. Plan before changing: do not edit durable state before the intended approach is clear.
6. Prefer reversible movement: preserve user work, avoid destructive actions by default, and choose
   changes that are easy to inspect or undo when practical.
7. Prefer useful small steps: keep changes, questions, and user-facing messages focused.
8. Preserve user agency: ask only for decisions that cannot be safely inferred or discovered.
9. Avoid unnecessary work: do not add abstractions, files, dependencies, or rules without a concrete
   reason.
10. Verify before closing: run relevant checks or clearly report what could not be verified.
11. Communicate with low cognitive load: keep replies concise, concrete, and localized to the user's
    language context; compress filler, not necessary technical content.
12. Keep guidance positive and necessary: avoid defensive prohibitions unless they prevent likely,
    material harm.

Domain extensions can later refine this baseline for coding, testing, design, documentation,
research, or release work.

## Conduct Domain Extensions

Domain extensions belong inside the `conduct` topic, not as independent root topics.

The first domain extension is coding conduct. Use it for implementation, refactoring, and review
work. It extends the baseline with coding-specific behavior around repository fit, restraint,
correctness, verification, and handoff.

It should stay focused on coding conduct. Testing, design, documentation, research, and release
behavior can become separate domain extensions when needed.

## Prompt Design Pitfall

A recent harnessize discussion produced a useful bad case: adding an explicit "do not generate
documentation indexes during init" rule after the user clarified that index files should be created
later by agents.

That wording was too defensive. Since `init` had no default index-generation behavior, the better
prompt design was to avoid encoding the negative rule and keep root context focused on the positive
behavior: create and maintain indexes progressively when durable documentation domains exist.

Guideline for this topic:

- Prefer positive, necessary, observable behavior rules.
- Do not add defensive prohibitions for behavior that is not otherwise likely from the workflow.
- If a rule exists only to prevent a single recent mistake, consider whether the real fix is a
  clearer boundary, a narrower trigger, or no rule at all.
- Avoid turning behavior guidance into a scar-tissue list of "do not" statements.

## Sources

- Ponytail skill:
  `https://raw.githubusercontent.com/DietrichGebert/ponytail/main/skills/ponytail/SKILL.md`
- Ponytail portability:
  `https://raw.githubusercontent.com/DietrichGebert/ponytail/main/docs/agent-portability.md`
- Caveman skill:
  `https://raw.githubusercontent.com/juliusbrussee/caveman/main/skills/caveman/SKILL.md`
- Caveman "skill, not agent" discussion:
  `https://github.com/JuliusBrussee/caveman/issues/56`
- Anthropic Agent Skills overview:
  `https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview`

## Discussion Record

### Turn 1 - Research behavior guideline precedents - 2026-06-27 03:06 +08:00

- User signal: The user proposed the next topic as agent behavior guidelines, potentially covering
  conversation, design, coding, testing, and other agent behavior areas. The user suggested
  researching Ponytail and Caveman first, with room to expand to related approaches.
- Agent work: Public sources were reviewed for Ponytail, Caveman, agent skill progressive
  disclosure, and portability patterns. The initial synthesis separated implementation restraint,
  communication compression, and trigger/distribution mechanics.
- Sources:
  - `https://raw.githubusercontent.com/DietrichGebert/ponytail/main/skills/ponytail/SKILL.md`
  - `https://raw.githubusercontent.com/DietrichGebert/ponytail/main/docs/agent-portability.md`
  - `https://raw.githubusercontent.com/juliusbrussee/caveman/main/skills/caveman/SKILL.md`
  - `https://github.com/JuliusBrussee/caveman/issues/56`
  - `https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview`
- Decisions: No topic name or scope decision yet.
- Open questions:
  - Should this become one baseline behavior topic or several narrower topics?
  - Should communication style live in the same topic as coding/design/testing behavior?
  - What parts should be always-on root guidance versus focused topic guidance?

### Turn 2 - Layer baseline and domain behavior - 2026-06-27 03:11 +08:00

- User signal: The user chose a layered direction: baseline behavior guidelines plus
  domain-specific behavior extensions. The user also pointed to the recent over-defensive prompt
  rule as a bad case to incorporate.
- Agent work: The synthesis was updated to separate baseline contract from domain extensions, and a
  prompt design pitfall was recorded: avoid adding negative guardrails when the better fix is simply
  not making that behavior part of the workflow.
- Sources:
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
  - `docs/decisions/0003-root-context-guidelines.md`
  - `src/context.ts`
- Decisions: The behavior topic should be layered: baseline behavior first, domain extensions later.
  It should prefer positive, necessary, observable rules over defensive prohibitions.
- Open questions:
  - What should the topic be named?
  - Which domain extension should be first, if any?

### Turn 3 - Recommend topic name - 2026-06-27 03:13 +08:00

- User signal: The user asked for a naming recommendation.
- Agent work: Candidate names were evaluated against the intended layered scope. `conduct` was
  recommended because it can cover baseline behavior and domain-specific behavior extensions without
  sounding like only communication style, only engineering practice, or a heavy governance policy.
- Sources:
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: Recommend `conduct` as the topic name for further discussion.
- Open questions: Whether the user accepts `conduct`, or prefers a more explicit name such as
  `behavior`.

### Turn 4 - Choose `conduct` - 2026-06-27 03:14 +08:00

- User signal: The user accepted `conduct` as the topic name.
- Agent work: The decision record was updated so future implementation can treat `conduct` as the
  chosen command topic name.
- Sources:
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: Use `npx harnessize@latest context conduct` for the behavior guidelines topic.
- Open questions:
  - What should the first baseline conduct rules include?
  - Which domain conduct extensions should ship in the first implementation?

### Turn 5 - Start baseline conduct scope - 2026-06-27 03:16 +08:00

- User signal: The user agreed to move on to discussing the first version of the `conduct` baseline.
- Agent work: A candidate v1 baseline was drafted around small, cross-domain rules: understand
  before acting, keep steps focused, preserve user agency, avoid unnecessary work, verify before
  closing, communicate with low cognitive load, and avoid defensive prompt rules.
- Sources:
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
  - `docs/decisions/0002-brainstorm-topic.md`
  - `docs/decisions/0003-root-context-guidelines.md`
- Decisions: No final rule set yet.
- Open questions: Whether v1 should ship only this baseline or include one domain extension.

### Turn 6 - Absorb precedents without copying - 2026-06-27 03:18 +08:00

- User signal: The user agreed that Ponytail and Caveman refinements can be absorbed, but should not
  be copied directly.
- Agent work: The candidate baseline was revised to express the reusable ideas in harnessize terms:
  prefer existing paths before adding machinery, avoid unnecessary work, and reduce filler without
  dropping necessary technical content.
- Sources:
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
  - `https://raw.githubusercontent.com/DietrichGebert/ponytail/main/skills/ponytail/SKILL.md`
  - `https://raw.githubusercontent.com/juliusbrussee/caveman/main/skills/caveman/SKILL.md`
- Decisions: Conduct v1 should absorb the refined ideas from Ponytail and Caveman as generalized
  harnessize behavior rules, not as copied wording or structure.
- Open questions: Whether this candidate baseline is compact enough for implementation.

### Turn 7 - Add Occam's razor - 2026-06-27 03:19 +08:00

- User signal: The user added Occam's razor as another principle for the behavior guidelines.
- Agent work: The principle was translated into an engineering behavior rule: prefer the simplest
  sufficient explanation or solution, and avoid more complex models, architectures, processes, or
  rules when a simpler one fits the evidence and requirements.
- Sources:
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: Include an Occam-style simplicity rule in the candidate baseline conduct.
- Open questions: Whether this should be merged with the "avoid unnecessary work" rule or remain a
  distinct principle.

### Turn 8 - Add confidence and reversibility - 2026-06-27 03:20 +08:00

- User signal: The user asked whether anything else should be added to the conduct baseline.
- Agent work: The candidate baseline was reviewed for cross-domain gaps. Two additions were judged
  worth including without bloating the topic: calibrated confidence and reversible movement.
- Sources:
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
  - `docs/decisions/0003-root-context-guidelines.md`
- Decisions: Add candidate baseline rules for distinguishing facts, inferences, assumptions, and
  uncertainty; and for preserving user work while preferring inspectable or reversible changes.
- Open questions: Whether the candidate baseline is now ready to implement as `conduct` v1.

### Turn 9 - Accept baseline scope - 2026-06-27 03:22 +08:00

- User signal: The user accepted the current baseline scope.
- Agent work: The baseline was treated as sufficient for v1 discussion: no further cross-domain
  rules should be added before implementation unless a concrete gap appears.
- Sources:
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: The `conduct` v1 baseline can proceed with the current candidate rule set.
- Open questions: Whether to implement `conduct` now or discuss the first domain extension first.

### Turn 10 - Implement baseline before domains - 2026-06-27 03:24 +08:00

- User signal: The user decided to implement the baseline first and add domain-specific behavior
  extensions later.
- Agent work: `npx harnessize@latest context conduct` was implemented as a baseline-only topic. Root
  context routing, README, changelog, tests, and the context topics feature spec were updated.
- Sources:
  - `src/context.ts`
  - `test/cli.test.ts`
  - `README.md`
  - `CHANGELOG.md`
  - `docs/features/context-topics.md`
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: Ship `conduct` v1 as baseline conduct only. Do not include coding, testing, design, or
  other domain conduct extensions in this first implementation.
- Open questions: Which domain conduct extension should be designed first after baseline usage.

### Turn 11 - Make baseline more executable - 2026-06-27 03:33 +08:00

- User signal: The user asked to improve `conduct` before moving on.
- Agent work: The current dogfood `dist` output and decision record were reviewed. The improvement
  target was narrowed to usability: the baseline was reorganized from a flat rule list into an
  application loop plus grouped baseline rules, without adding domain extensions.
- Sources:
  - `node dist/cli.js context conduct`
  - `src/context.ts`
  - `test/cli.test.ts`
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: `conduct` should present a short application loop before baseline rules so agents can
  apply the behavior in order.
- Open questions: Whether future refinements should reduce the rule count further before adding
  domain extensions.

### Turn 12 - Add coding domain conduct - 2026-06-27 03:37 +08:00

- User signal: The user asked to continue adding domain behavior.
- Agent work: The first attempt incorrectly implemented coding conduct as a separate
  `conduct-coding` root topic.
- Sources:
  - `src/context.ts`
  - `test/cli.test.ts`
  - `README.md`
  - `CHANGELOG.md`
  - `docs/features/context-topics.md`
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: Superseded by Turn 13.
- Open questions: None.

### Turn 13 - Keep domains inside conduct - 2026-06-27 03:39 +08:00

- User signal: The user corrected that domain extensions should not be added as separate topics.
- Agent work: The independent `conduct-coding` topic and root routing were removed. Coding conduct
  was moved inside the `conduct` topic as a domain extension, and tests were updated to reject
  `conduct-coding` as an unknown root topic.
- Sources:
  - `src/context.ts`
  - `test/cli.test.ts`
  - `README.md`
  - `CHANGELOG.md`
  - `docs/features/context-topics.md`
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: Domain behavior extensions belong inside `context conduct`; they should not create new
  root topics unless a future discussion explicitly changes the topic model.
- Open questions: Which domain extension should be added next inside `conduct`.

### Turn 14 - Plan before change - 2026-06-27 03:48 +08:00

- User signal: The user clarified that the bad case is not coding-specific. Any change behavior
  needs a plan first; making changes before the approach is settled is wrong.
- Agent work: The principle was reframed from a narrow "clarify shape for special cases" rule into
  a general conduct principle: every change needs a plan before action. The remaining question is
  when that plan must be discussed with the user versus safely inferred and executed.
- Sources:
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: Conduct should distinguish "must have a plan" from "must ask the user". All changes
  require an internal plan; user confirmation is needed when the plan cannot be safely inferred, has
  materially different valid shapes, changes durable/public boundaries, or carries meaningful risk.
- Open questions: How to phrase this in the distributed `conduct` guidance without encouraging
  excessive confirmation for trivial edits.

### Turn 15 - Distribute plan-before-change rule - 2026-06-27 03:52 +08:00

- User signal: The user asked to land the plan-before-change principle into the actual rules and
  audit distributed content so it does not contain personal or current-repository internal content.
- Agent work: The conduct application loop and baseline rules were updated with a distributable
  plan-before-change formulation. Distributed README and changelog wording were reviewed and
  dogfood/internal phrasing was removed.
- Sources:
  - `src/context.ts`
  - `test/cli.test.ts`
  - `README.md`
  - `CHANGELOG.md`
  - `package.json`
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: Distributed conduct should say: form an explicit plan before changing durable state,
  and confirm it with the user when shape, impact, or risk cannot be safely inferred.
- Open questions: None.

### Turn 16 - Keep public manifest metadata - 2026-06-27 03:54 +08:00

- User signal: The user pointed out that open-source manifest metadata should not be treated as
  internal content.
- Agent work: `package.json` was checked. Public package metadata such as repository, bugs,
  homepage, license, package name, and publish configuration remained intact.
- Sources:
  - `package.json`
  - `README.md`
  - `CHANGELOG.md`
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: Distribution audits should distinguish private/internal leakage from legitimate public
  package metadata. Public open-source manifest fields must not be removed merely because they name
  the repository or maintainer-owned project URL.
- Open questions: None.

### Turn 17 - Avoid over-cleaning public project context - 2026-06-27 03:55 +08:00

- User signal: The user pointed out that removing `dogfood` and scaffold-era wording from
  README/CHANGELOG was also over-cleaning.
- Agent work: The distribution audit boundary was corrected again. Public, accurate, useful project
  context is not private/internal leakage merely because it describes project history or dogfood
  status.
- Sources:
  - `README.md`
  - `CHANGELOG.md`
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: Distribution audits should remove private/personal/current-workspace leakage and
  non-user-facing implementation accidents, but should preserve public project history and accurate
  open-source context when it helps users understand the package.
- Open questions: Whether to restore the removed README/CHANGELOG wording exactly or rewrite it into
  clearer public-facing language.
