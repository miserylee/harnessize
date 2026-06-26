import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { CliError, helpText, parseArgs } from '../src/cli.js';

describe('parseArgs', () => {
  it('uses the current directory as the default target', () => {
    expect(parseArgs([], '/workspace')).toEqual({
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

  it('rejects unknown options', () => {
    expect(() => parseArgs(['--unknown'], '/workspace')).toThrow(CliError);
  });
});

describe('helpText', () => {
  it('documents npx usage', () => {
    expect(helpText()).toContain('npx harnessize [target] [options]');
  });
});
