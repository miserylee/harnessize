# Changelog

All notable changes to this project will be documented in this file.

## 0.5.1

- Refine `brainstorm` recording rules so agents choose records by subject relevance, start separate
  records for new issues, and treat the 50-turn split as a length limit for one coherent subject.

## 0.5.0

- Add `harnessize context review` for findings-first review of production materials and worktree
  changes.
- Route review requests and production material handoff, stage transition, or external effect to the
  `review` topic.
- Document focused topic admission criteria so future topics need clear non-default value,
  cross-repository portability, clear triggers, and low overlap with existing topics.
- Refine the README promotional illustration cutout.

## 0.4.0

- Add `harnessize context caseset` for semantic use case set maintenance inside feature specs.
- Add `harnessize context verify` for quality-gate evidence selection, checks, self-healing, and
  escalation.
- Simplify feature spec guidance into clearer information responsibilities and delegate semantic
  use case maintenance to `caseset`.
- Add unit-test management guidance inside the coding extension of `conduct`.
- Add a promotional README illustration for the project identity.

## 0.3.1

- Make all recommended `npx` invocations non-interactive with `npx -y harnessize@latest`.
- Require root context as session bootstrap and recovery after conversation compaction.
- Move the single authoritative baseline conduct contract into root context.
- Change `conduct` to extend root baseline conduct for production and domain-specific work instead
  of duplicating the baseline.
- Add critical evaluation guidance so agents investigate user requests and proposed solutions before
  executing.

## 0.3.0

- Add `harnessize context conduct` for baseline agent behavior guidelines and coding conduct.
- Add `harnessize context feature` for feature lifecycle design and authoritative feature
  production materials.
- Tighten `feature` guidance so feature-level changes create or update feature specs and the feature
  index.
- Add `harnessize context grill` for pressure-testing concrete plans before execution.
- Make root `harnessize context` output agent-facing workflow guidelines instead of only a topic
  list.
- Clarify that `brainstorm` should keep sourced turn-level discussion summaries, not only final
  decisions.

## 0.2.0

- Add the first dogfooded context topic: `brainstorm`.
- Add `harnessize context [topic]` for progressive agent-facing guidance.
- Add thin repository-level `AGENTS.md` guidance for this project.

## 0.1.0

- Initial CLI package scaffold.
