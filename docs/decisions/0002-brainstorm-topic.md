# Decision 0002: Brainstorm Topic

Date: 2026-06-27

## Context

Harnessize will dogfood its first context topic as `brainstorm`.

This topic is active when the user's intent is analysis, research, discussion, clarification, or
ideation. The purpose is to help the user's agent reduce cognitive load while moving ambiguous work
toward clear decisions.

## Decisions

The `brainstorm` topic should optimize for concise, rigorous, low-volume interaction.

Default user-facing replies in `brainstorm` should be short enough to scan quickly. Prefer 3-6 short
lines plus the localized template. Do not provide broad rationale, multi-part roadmaps, or long
explanations unless the user asks for them.

The topic is exposed through:

```sh
npx -y harnessize@latest context brainstorm
```

Each assistant turn should focus on one key point or one tightly scoped decision area. A turn may
contain more than one question only when those questions belong to the same decision area.

The agent should do reasonable background work before asking the user to decide. Background work may
include inspecting repository files, searching existing documentation, checking external sources, or
retrieving relevant knowledge-base context when available.

The agent should ask the user only for information that cannot be safely inferred or discovered, and
should keep the decision burden low.

Before asking, the agent should check the current conversation and active subject record for settled
answers, assumptions, constraints, and open questions. Prior answers should be reused as constraints.
The agent should ask again only when the prior answer is missing, ambiguous, stale, or contradicted
by new evidence, and should say why the question is being reopened.

Entering `brainstorm` creates a MUST-record obligation. The agent must maintain a durable record of
the discussion flow while the topic is active. The durable record should capture turn-level
summaries, user intent and constraints, agent research and reasoning, sources, decisions, material
research findings, assumptions, open questions, rejected alternatives, and follow-up items rather
than copying the full conversation.

Material research findings are recordable when they influence topic selection, product direction,
implementation strategy, risk assessment, or a later decision. The record should include enough
source or context information for a future agent to understand why the finding mattered.

Research records must keep information sources. For web research, include the title or source name
and URL. For repository research, include the file path. For knowledge-base or tool research, include
the retrievable resource identifier when available.

Brainstorm records should include explicit date and time information. Use a concise numeric timezone
offset such as `2026-06-27 00:12 +08:00`. This makes later review, freshness checks, and
time-sensitive decisions easier to audit.

Brainstorm records are not only final conclusions. They should preserve compact per-turn summaries
of important question-and-answer flow so future agents can understand how decisions were reached.

When the user briefly interrupts with unrelated work, the agent may temporarily step out of
`brainstorm` behavior. The agent should return to the main brainstorm thread unless the user clearly
exits or redirects the topic.

When leaving a brainstorm thread, the agent should decide whether the discussion needs to be
distilled into a durable document, knowledge base entry, or another long-lived carrier. The exact
carrier will be integrated with future harnessize topics later.

Long-running brainstorm records should be split after 50 discussion turns. This prevents a single
log from becoming expensive for agents to read and keeps future retrieval focused. The split policy
should preserve chronology and link related parts together.

A later refinement in [Decision 0010](0010-brainstorm-record-subject-boundaries.md) clarifies that
record selection is subject-based. Agents should continue an existing brainstorm record only when the
current discussion belongs to the same coherent issue, capability, product question, or decision
thread. New issues should start separate records even when the same broad `brainstorm` topic remains
active. The 50-turn split is a length rule for one coherent subject, not a replacement for
subject-based separation.

## Working Guidance

A `brainstorm` response should usually:

1. State the current focus briefly.
2. Share only the minimum useful conclusion from investigation.
3. Check the current conversation and active subject record before asking the user.
4. Ask for the next human decision only when needed and not already answered.
5. Record the key turn summary, settled decisions, material research findings, rejected alternatives,
   and important open questions with date and time.
6. Keep the visible answer small; move supporting detail into the record when it matters later.

If no durable record location exists yet, the agent should create or choose one before continuing
the brainstorm, or explicitly tell the user that recording is blocked.

The agent should avoid:

1. Sending broad multi-module analysis unless explicitly requested.
2. Asking questions before doing cheap investigation.
3. Treating every user interruption as a permanent topic change.
4. Recording raw chat as durable project knowledge.
5. Waiting until the end of a long discussion to record research findings that are already shaping
   decisions.
6. Sending long answers that make the user work to find the key point.
7. Repeating a question that was already answered unless the prior answer is missing, ambiguous,
   stale, or contradicted by new evidence.
8. Continuing in `brainstorm` without a known place to record.

## Response Template

Brainstorm turns should end with a clear, compact template when a decision or clarification is
needed:

```text
Focus: <one current decision area>
Settled: <what is already decided, if anything>
Need from you: <one low-burden decision or clarification>
```

The template may be shortened when no user decision is needed, but the final response should still
make the current state and next step obvious.

Use a record field only when there was an actual write, a record location changed, a log split
occurred, content was promoted into long-lived knowledge, or recording failed:

```text
Record: <only when relevant, include location and timestamp when applicable>
```

The template should be localized to the user's current language context. The structure should remain
consistent, but labels and prose should follow the language the user is using unless the user asks
otherwise.

## Additional Recommendation

The first implementation should distinguish between a working decision log and permanent project
knowledge.

During an active brainstorm, the agent may update a lightweight decision note. At topic exit, the
agent should promote only durable conclusions and necessary supporting rationale into the
appropriate long-lived document. This keeps the repository useful without turning it into a raw
transcript archive.

If an investigation materially changes the discussion, the agent should update the working record
near that point in the conversation. Deferring all recording until topic exit risks losing the
reasoning chain.

Discussion records should use a compact structure similar to:

```text
## Turn <n> - <focus> - <YYYY-MM-DD HH:mm +08:00>

- User signal: <key user intent, constraint, correction, or answer>
- Agent work: <important investigation, reasoning, or synthesis>
- Sources: <URLs, file paths, resource ids, or "none">
- Decisions: <settled decisions, if any>
- Open questions: <remaining uncertainty, if any>
```

Brainstorm record files should have a practical maximum of 50 discussion turns. When that threshold
is reached, the agent should continue in a new file and leave clear cross-links between the previous
and next parts.

## Open Questions

Where should active brainstorm notes live before future knowledge-base topics are designed?

What threshold should trigger automatic distillation when the user exits or redirects the topic?

## Discussion Record

### Turn 1 - Fix brainstorm recording model - 2026-06-27 01:24 +08:00

- User signal: The user clarified that brainstorm records must keep sources, include key discussion
  turns, and preserve decision logic rather than only final conclusions.
- Agent work: The record model was changed to sourced turn-level summaries with user signal, agent
  work, sources, decisions, and open questions.
- Sources:
  - `docs/decisions/0002-brainstorm-topic.md`
  - `src/context.ts`
- Decisions: `brainstorm` records are compact discussion logs, not just conclusion notes.
- Open questions: Where active brainstorm notes should live before a future knowledge-base topic.

### Turn 2 - Expose execution defects - 2026-06-27 01:35 +08:00

- User signal: The user pointed out three defects: the latest discussion was not recorded, generated
  `AGENTS.md` must point only to root context, and brainstorm answers were too verbose.
- Agent work: The guidance was tightened so brainstorm responses stay brief, and the init discussion
  was backfilled into `0001`.
- Sources:
  - `docs/decisions/0001-thin-agent-facing-harness.md`
  - `docs/decisions/0002-brainstorm-topic.md`
- Decisions: Brainstorm visible replies should default to 3-6 short lines plus template, with
  durable detail stored in records when needed.
- Open questions: None.

### Turn 3 - Make recording mandatory - 2026-06-27 01:44 +08:00

- User signal: The user clarified that entering `brainstorm` should mean recording is mandatory.
- Agent work: The brainstorm guidance was tightened from conditional recording to a MUST-record
  obligation whenever the topic is active.
- Sources:
  - `docs/decisions/0002-brainstorm-topic.md`
  - `src/context.ts`
- Decisions: `brainstorm` cannot continue without a known durable record location; if recording is
  blocked, the agent must say so.
- Open questions: None.

### Turn 4 - Avoid repeated questions in brainstorm - 2026-06-29 15:39 +08:00

- User signal: The user observed that agents sometimes ask questions during `brainstorm` that were
  already discussed earlier.
- Agent work: Existing brainstorm guidance was reviewed. It requires background work, low-burden
  questions, and compact turn-level records, but it does not explicitly require agents to consult
  settled decisions and open questions before asking again.
- Sources:
  - `node dist/bin.js context brainstorm`
  - `src/context.ts`
  - `docs/features/context-topics.md`
  - `docs/decisions/0002-brainstorm-topic.md`
- Decisions: No runtime rule change yet. The likely fix is to make each brainstorm question pass a
  memory check: consult the active subject record and conversation context first; reuse settled
  answers as constraints; ask again only when the prior answer is missing, ambiguous, stale, or
  contradicted by new evidence.
- Open questions: Whether to implement this as a brainstorm operating rule, a response-template
  expectation, or both.

### Turn 5 - Implement brainstorm question memory check - 2026-06-29 15:40 +08:00

- User signal: The user asked to implement the repeated-question fix and release it.
- Agent work: `brainstorm` operating rules were updated so agents check current conversation and the
  active subject record before asking, reuse prior answers as constraints, and reopen a question
  only when the prior answer is missing, ambiguous, stale, or contradicted by new evidence. Tests and
  the context topics feature spec were updated to protect the behavior.
- Sources:
  - `src/context.ts`
  - `test/cli.test.ts`
  - `docs/features/context-topics.md`
  - `docs/features/README.md`
  - `docs/decisions/0002-brainstorm-topic.md`
  - `docs/decisions/README.md`
- Decisions: Implement repeated-question avoidance as a `brainstorm` operating rule and working
  guidance expectation, not a new topic or separate process.
- Open questions: None.
