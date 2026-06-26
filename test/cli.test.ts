import { resolve } from 'node:path';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { CliError, helpText, parseArgs, run } from '../src/cli.js';

describe('parseArgs', () => {
  it('uses the current directory as the default target', () => {
    expect(parseArgs([], '/workspace')).toEqual({
      command: 'init',
      dryRun: false,
      help: false,
      json: false,
      targetDir: '/workspace',
      version: false,
    });
  });

  it('parses a target directory and flags', () => {
    expect(parseArgs(['project', '--dry-run', '--json'], '/workspace')).toMatchObject({
      dryRun: true,
      json: true,
      targetDir: resolve('/workspace', 'project'),
    });
  });

  it('parses the context command and topic', () => {
    expect(parseArgs(['context', 'brainstorm'], '/workspace')).toMatchObject({
      command: 'context',
      contextTopic: 'brainstorm',
    });
  });

  it('rejects unknown options', () => {
    expect(() => parseArgs(['--unknown'], '/workspace')).toThrow(CliError);
  });
});

describe('helpText', () => {
  it('documents npx usage', () => {
    expect(helpText()).toContain('npx -y harnessize@latest [target] [options]');
    expect(helpText()).toContain('npx -y harnessize@latest context [topic]');
  });
});

describe('run', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('prints root context guidelines', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('# harnessize context'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('agent-facing workflow guidance'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('soft-orchestrating agent work'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Use `npx -y harnessize@latest context` as the root guideline'),
    );
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('include `-y` so package execution does not stop'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Baseline Conduct'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Application loop'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining("Evaluate the user's request and proposed approach"),
    );
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Form an explicit plan before changing durable state'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Prefer the existing path'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('rerun `npx -y harnessize@latest context`'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Evaluate user direction'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('brainstorm'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('grill'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('feature'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('conduct'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('ordinary Q&A'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Documentation Maintenance'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('docs/README.md'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Indexes MUST include concise summaries'),
    );
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Use `conduct` before production actions'),
    );
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Combine `conduct` with another focused topic'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('answer normally first'));
  });

  it('prints the brainstorm topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'brainstorm'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('# harnessize context: brainstorm'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('MUST-record obligation'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('3-6 short lines'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('material research findings'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Record Shape'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Sources: <URLs'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('50 discussion turns'));
  });

  it('prints the grill topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'grill'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('# harnessize context: grill'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('concrete plan'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Pressure-test the plan'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Recommended path'));
  });

  it('prints the feature topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'feature'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('# harnessize context: feature'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('MUST-maintain obligation'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('docs/features/<feature-slug>.md'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('docs/features/README.md'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Semantic Use Case Shape'));
  });

  it('prints the conduct topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'conduct'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('# harnessize context: conduct'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('production work'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('ordinary Q&A'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Root Baseline Dependency'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('root baseline conduct'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Production Extension'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Identify the durable surface being changed'),
    );
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Baseline conduct lives in root context'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Extension Boundary'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Domain Extension: Coding'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Add an abstraction only when'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Scale verification to risk'));
  });

  it('rejects unknown context topics', async () => {
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const stderr = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    await expect(run(['context', 'missing'], '/workspace')).resolves.toBe(1);

    expect(stderr).toHaveBeenCalledWith(expect.stringContaining('Unknown context topic: missing'));
  });

  it('keeps conduct domains inside the conduct topic', async () => {
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const stderr = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    await expect(run(['context', 'conduct-coding'], '/workspace')).resolves.toBe(1);

    expect(stderr).toHaveBeenCalledWith(
      expect.stringContaining('Unknown context topic: conduct-coding'),
    );
  });
});
