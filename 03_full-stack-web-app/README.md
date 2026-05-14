# `bun-workspaces` Example 03: Full Stack Web App

This is a simple example of `bun-workspaces` use in a repo that develops
a React frontend and Bun backend of a web app, with a shared workspace acting
as a common library for both.

If you're new to `bun-workspaces`, you might look at the [**01_simple-zero-config**](../01_simple-zero-config)
and [**02_simple-config-and-api**](../02_simple-config-and-api) examples first to understand the basics.

Table of Contents:

- [Getting Started](#getting-started)
- [Project Notes](#project-notes)
- [Things to Try](#things-to-try)
  - [Commands](#commands)
  - [Affected Commands](#affected-commands)
- [Further Reading](#further-reading)

## Getting Started

Requirements: [Bun](https://bun.sh/docs/installation) v1.2 or higher.

```bash
# This also installs workspaces' dependencies.
bun install
```

`bun-workspaces` doesn't know your workspace data until `bun install` is run, and you may
need to run it again if you make changes to package.json files.

## Project Notes

- There are three workspaces: web, rest-api, and shared. Shared is a dependency of both
  web and rest-api to show how a monorepo makes it easy to share internal code. The dependencies
  are explicitly defined in the apps' package.json files.
- The `bw.root.ts` file uses `workspacePatternConfigs` to set up rules for workspace dependencies,
  which helps prevent inappropriate code sharing. `bun-workspaces` commands will fail if you try to use
  "web" or "rest-api" as dependencies, the "shared" package being the only allow dependency.

## Things to Try

### Commands

This example shows the power of using your root [`package.json`](./package.json) in order to
define common bw commands that you need. See this file to see how these
scripts are defined in `"scripts"`.

Note that `bw` within the root package.json scripts can be used without having a `bw` shell alias
set up. This is thanks to it being present in `node_modules/.bin` after `bun install`.

```bash
# Scripts for all workspaces
bun run lint
bun run build
bun run dev

# Specific workspace scripts
bun run lint:rest-api
bun run lint:shared
bun run lint:web

bun run build:rest-api
bun run build:web

bun run dev:rest-api
bun run dev:web
```

### Affected Commands

Commands using bun-workspaces's affected functionality can be useful in DevOps
in order to only run commands for workspaces with a meaningful change detected via git.

In this project, if files to only the rest-api workspace are changed, then only the rest-api
workspace will be considered affected, and the web and shared workspaces will be ignored.

If the shared workspace is changed, then all workspaces will be considered
affected, since shared is a dependency of both the rest-api and web workspaces.

```bash
# See explanation for affected workspaces
bun run affected-debug

# Build only affected workspaces
bun run build:affected

# Lint only affected workspaces
bun run lint:affected
```

## Further Reading

- [bun-workspaces Documentation](https://bunworkspaces.com)
  - [CLI reference](https://bunworkspaces.com/cli)
  - [TypeScript API reference](https://bunworkspaces.com/api)
  - [Workspace Dependencies](https://bunworkspaces.com/concepts/workspace-dependencies)
  - [Configuration reference](https://bunworkspaces.com/config)
    - [Root config](https://bunworkspaces.com/config/root)
    - [Workspace config](https://bunworkspaces.com/config/workspace)
    - [Workspace inputs](https://bunworkspaces.com/config/workspace-inputs)
