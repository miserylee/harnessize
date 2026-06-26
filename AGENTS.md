# Agent Instructions

This repository uses harnessize for thin, progressive agent guidance.

## Start Here

1. For local repository knowledge, start at [docs/README.md](docs/README.md). Use it to find
   decision records and feature materials before making project-shaping changes.
2. For repository workflow guidance, use the root context:

   ```sh
   npx harnessize@latest context
   ```

Follow the root context to choose any focused topic supported by the current harnessize version.

When docs are added, moved, renamed, or materially changed, update the relevant index so the
retrieval chain stays complete.

Keep repository changes minimal and preserve user work. Before broad edits, inspect the existing
code and docs, then ask only for decisions that cannot be safely inferred.

Record durable discussion summaries in `docs/decisions/`. Records should capture compact turn-level
summaries, decisions, material research findings with sources, assumptions, rejected alternatives,
open questions, and follow-up items rather than raw chat transcripts.
