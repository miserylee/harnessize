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

  it('lists context topics', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('brainstorm'));
  });

  it('prints the brainstorm topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'brainstorm'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('# harnessize context: brainstorm'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('50 discussion turns'));
  });

  it('rejects unknown context topics', async () => {
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const stderr = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    await expect(run(['context', 'missing'], '/workspace')).resolves.toBe(1);

    expect(stderr).toHaveBeenCalledWith(expect.stringContaining('Unknown context topic: missing'));
  });
});
