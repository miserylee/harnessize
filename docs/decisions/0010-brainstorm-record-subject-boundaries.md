# Decision 0010: Brainstorm Record Subject Boundaries

Date: 2026-06-29

Status: Implemented.

## Context

The `brainstorm` topic already requires durable records, sourced turn summaries, explicit dates, and
50-turn splitting for long-running discussions.

That guidance left an important ambiguity: agents could keep appending new, unrelated discussions to
the latest brainstorm record because it was already open. This makes later retrieval noisy and makes
it harder for agents to understand the decision logic for one coherent issue.

## Decision

Brainstorm record selection is subject-based.

When entering or continuing `brainstorm`, the agent should choose the durable record by relevance to
the current discussion subject, not by recency. Continue an existing record only when the current
discussion belongs to the same coherent topic, decision thread, or feature question.

Start a separate record when the user introduces a new issue, capability, product question, or
decision area, even if the broad harnessize topic remains `brainstorm`.

Do not append unrelated discussion to the latest or currently open record merely because it exists.

The 50-turn split remains useful, but it is only a length limit for one coherent subject. It does not
replace subject-based record separation. If the subject changes before 50 turns, create or choose a
different record. If one subject exceeds 50 turns, split that subject chronologically and link the
parts.

## Implementation

The runtime `brainstorm` topic now instructs agents to:

- choose record locations by subject relevance rather than recency;
- continue an existing record only for the same coherent topic, decision thread, or feature
  question;
- start a separate record for new issues, capabilities, product questions, or decision areas;
- avoid appending unrelated discussions to the latest open record;
- treat 50-turn splitting as a length rule for one coherent subject.

The context-topics feature spec and CLI tests were updated to make the rule part of the authoritative
feature material and regression coverage.

## Discussion Record

### Turn 1 - Require subject-based brainstorm records - 2026-06-29 00:25 +08:00

- User signal: The user clarified that when brainstorm discussion moves to a new issue, the agent
  should create a separate document instead of continuing to append to the previous document. The
  agent must judge content relevance.
- Agent work: Existing `brainstorm` guidance, decision records, context topic feature material, and
  CLI tests were reviewed. The rule was framed as subject-based record selection, distinct from the
  existing 50-turn split rule.
- Sources:
  - `node dist/cli.js context`
  - `node dist/cli.js context brainstorm`
  - `node dist/cli.js context conduct`
  - `node dist/cli.js context feature`
  - `docs/decisions/0002-brainstorm-topic.md`
  - `docs/features/context-topics.md`
  - `src/context.ts`
  - `test/cli.test.ts`
- Decisions:
  - Brainstorm records should be selected by subject relevance, not recency.
  - New issues, capabilities, product questions, or decision areas should start separate records.
  - The 50-turn split is a length limit for one coherent subject, not permission to mix subjects.
- Open questions: None.
