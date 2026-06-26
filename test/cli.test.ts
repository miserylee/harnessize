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
    expect(helpText()).toContain('npx harnessize [target] [options]');
    expect(helpText()).toContain('npx harnessize context [topic]');
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
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('brainstorm'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('grill'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('feature'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('ordinary Q&A'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Documentation Maintenance'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Indexes MUST include concise summaries'),
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
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('docs/features/<feature-slug>.md'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Semantic Use Case Shape'));
  });

  it('rejects unknown context topics', async () => {
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const stderr = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    await expect(run(['context', 'missing'], '/workspace')).resolves.toBe(1);

    expect(stderr).toHaveBeenCalledWith(expect.stringContaining('Unknown context topic: missing'));
  });
});
