# Decision 0004: Grill Topic

Date: 2026-06-27

## Context

Harnessize needs a topic for challenging a concrete plan before execution.

This behavior was considered as part of `brainstorm`, but the interaction shape is different.
`brainstorm` reduces ambiguity and helps ideas take shape. `grill` pressure-tests a plan that
already exists.

## Discussion Record

### Turn 1 - Research "grill me" - 2026-06-27 01:21 +08:00

- User signal: The user asked to research "grill me" as a possible reference for harnessize topics.
- Agent work: Existing "grill me" style workflows were reviewed as a reference pattern. The useful
  behavior was not the branding, but the interaction shape: challenge a specific plan, ask one
  focused question at a time, investigate available context before asking the user, and keep pushing
  until the plan's assumptions and risks are clearer.
- Sources:
  - Matt Pocock skills repository:
    `https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md`
  - AI Hero skill page: `https://www.aihero.dev/skills-grill-me`
  - Reddit discussion:
    `https://www.reddit.com/r/codex/comments/1s8xlja/i_tried_the_grillme_skill_and_it_completely/`
- Decisions: Keep `grill` separate from `brainstorm`.
- Open questions: None for the topic name after the user chose `grill`.

### Turn 2 - Decide relation to brainstorm - 2026-06-27 01:24 +08:00

- User signal: The user asked what would go wrong if `grill` were merged into `brainstorm`.
- Agent work: The modes were compared by intent, template, record shape, cognitive load, and exit
  behavior. `brainstorm` is a low-pressure exploration mode; `grill` intentionally creates focused
  pressure on a concrete proposal.
- Sources: Conversation synthesis; no new external source.
- Decisions: Do not merge `grill` into `brainstorm`. Let root context route between them.
- Open questions: None.

### Turn 3 - Root routing and implementation - 2026-06-27 01:24 +08:00

- User signal: The user asked how root context should guide agents to choose the two topics, then
  chose `grill` as the topic name and asked to implement it.
- Agent work: Root routing was defined by artifact maturity: ambiguous exploration uses
  `brainstorm`; concrete proposals that need critique use `grill`; unsure cases start with
  `brainstorm`.
- Sources: Conversation synthesis; no new external source.
- Decisions: Add `harnessize context grill`; update root context routing; version the package as
  `0.3.0`.
- Open questions: None.

## Decisions

The topic name is:

```sh
npx harnessize@latest context grill
```

Use `grill` when the user already has a concrete plan, design, architecture, PRD, or implementation
approach and wants it challenged before execution.

Do not use `grill` for vague questions or early exploration. If the idea is still ambiguous, start
with `brainstorm`.

The topic should pressure-test without becoming hostile. It should be strict, concrete, and concise.

Each turn should focus on one risk area or one decision area.

The agent should inspect available repository context before asking the user for information.

The agent should ask only questions that materially change the plan, scope, risk, or implementation
path.

When possible, the agent should provide a recommended answer or default path so the user can respond
quickly.

The agent should stop grilling when the remaining questions no longer change the likely plan.

## Root Routing

The root context should guide agents to choose between `brainstorm` and `grill`:

1. Use `brainstorm` for exploration, research, clarification, discussion, and early shaping.
2. Use `grill` for pressure-testing a concrete proposal before execution.
3. If unsure, start with `brainstorm`.
4. Switch to `grill` only after a concrete proposal exists or the user asks for critique.

## Response Template

The default `grill` response shape is:

```text
Focus: <one plan area being pressure-tested>
Risk: <the concrete risk, gap, or assumption>
Recommended path: <the agent's current best default, if clear>
Need from you: <one low-burden decision or clarification>
```

The template should be localized to the user's current language context.

Use a record field only when there was an actual write, a record location changed, content was
promoted into long-lived knowledge, or recording failed.

## Exit Behavior

When the pressure test ends, summarize the strongest surviving plan, the main risks accepted, and
the verification or rollback expectations.

Record durable decisions when the discussion creates project knowledge.
