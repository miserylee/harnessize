#!/usr/bin/env node
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

import {
  formatContextTopic,
  formatRootContext,
  getContextTopic,
  UnknownContextTopicError,
} from './context.js';
import { createHarnessPlan, formatHarnessPlan } from './index.js';

const require = createRequire(import.meta.url);
const packageJson = require('../package.json') as { version: string };

export type CliCommand = 'context' | 'init';

export interface CliOptions {
  command: CliCommand;
  contextTopic?: string;
  dryRun: boolean;
  help: boolean;
  json: boolean;
  targetDir: string;
  version: boolean;
}

export class CliError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CliError';
  }
}

export function parseArgs(args: string[], cwd = process.cwd()): CliOptions {
  const options: CliOptions = {
    command: 'init',
    dryRun: false,
    help: false,
    json: false,
    targetDir: cwd,
    version: false,
  };

  const positional: string[] = [];

  for (const arg of args) {
    switch (arg) {
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--json':
        options.json = true;
        break;
      case '-h':
      case '--help':
        options.help = true;
        break;
      case '-v':
      case '--version':
        options.version = true;
        break;
      default:
        if (arg.startsWith('-')) {
          throw new CliError(`Unknown option: ${arg}`);
        }
        positional.push(arg);
        break;
    }
  }

  if (positional[0] === 'context') {
    options.command = 'context';

    if (positional.length > 2) {
      throw new CliError('Expected at most one context topic.');
    }

    if (positional[1]) {
      options.contextTopic = positional[1];
    }

    return options;
  }

  if (positional[0] === 'init') {
    options.command = 'init';
    positional.shift();
  }

  if (positional.length > 1) {
    throw new CliError('Expected at most one target directory.');
  }

  if (positional[0]) {
    options.targetDir = resolve(cwd, positional[0]);
  }

  return options;
}

export function helpText(): string {
  return `harnessize

Usage:
  npx -y harnessize@latest [target] [options]
  npx -y harnessize@latest context [topic]

Options:
  --dry-run      Preview planned harnessization steps without writing files.
  --json         Print the plan as JSON.
  -h, --help     Show this help text.
  -v, --version  Show the package version.
`;
}

export async function run(args: string[], cwd = process.cwd()): Promise<number> {
  let options: CliOptions;

  try {
    options = parseArgs(args, cwd);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`harnessize: ${message}\n`);
    process.stderr.write('Run `npx -y harnessize@latest --help` for usage.\n');
    return 1;
  }

  if (options.help) {
    process.stdout.write(helpText());
    return 0;
  }

  if (options.version) {
    process.stdout.write(`${packageJson.version}\n`);
    return 0;
  }

  if (options.command === 'context') {
    if (!options.contextTopic) {
      process.stdout.write(`${formatRootContext()}\n`);
      return 0;
    }

    try {
      process.stdout.write(`${formatContextTopic(getContextTopic(options.contextTopic))}\n`);
      return 0;
    } catch (error) {
      if (error instanceof UnknownContextTopicError) {
        process.stderr.write(`harnessize: ${error.message}\n`);
        process.stderr.write(`${formatRootContext()}\n`);
        return 1;
      }

      throw error;
    }
  }

  const plan = createHarnessPlan({
    dryRun: options.dryRun,
    targetDir: options.targetDir,
  });

  if (options.json) {
    process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
    return 0;
  }

  process.stdout.write(`${formatHarnessPlan(plan)}\n`);
  return 0;
}

function isDirectRun(): boolean {
  const entrypoint = process.argv[1];
  return Boolean(entrypoint && import.meta.url === pathToFileURL(entrypoint).href);
}

if (isDirectRun()) {
  process.exitCode = await run(process.argv.slice(2));
}
