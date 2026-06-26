# Agent Instructions

This repository uses harnessize for thin, progressive agent guidance.

For analysis, research, discussion, clarification, or ideation work, use:

```sh
npx harnessize@latest context brainstorm
```

For pressure-testing a concrete plan, design, architecture, PRD, or implementation approach before
execution, use:

```sh
npx harnessize@latest context grill
```

Keep repository changes minimal and preserve user work. Before broad edits, inspect the existing
code and docs, then ask only for decisions that cannot be safely inferred.

Record durable discussion summaries in `docs/decisions/`. Records should capture compact turn-level
summaries, decisions, material research findings with sources, assumptions, rejected alternatives,
open questions, and follow-up items rather than raw chat transcripts.
