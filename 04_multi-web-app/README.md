# `bun-workspaces` Example 04: Multiple Web Apps

This example shows `bun-workspaces` use in a repo with multiple full-stack applications.

The workspaces are organized into nested directories
(`packages/applications/<app>/<workspace>` and `packages/libraries/<library>` for
app-agnostic shared code), and the
project's `bw.root.ts` assigns tags by path and uses workspace dependency rules to enforce
the boundaries between apps, libraries, and the web/backend split.

If you're new to `bun-workspaces`, you might look at [**01_simple-zero-config**](../01_simple-zero-config)
and [**02_simple-config-and-api**](../02_simple-config-and-api) first for the basics, and
[**03_full-stack-web-app**](../03_full-stack-web-app), which is a one-app project that
may be simpler to understand and describes some DevOps practices.

Table of Contents:

- [Getting Started](#getting-started)
- [Project Notes](#project-notes)
- [Things to Try](#things-to-try)
  - [Commands](#commands)
  - [Affected Commands](#affected-commands)
- [Further Reading](#further-reading)

## Getting Started

Requirements: [Bun](https://bun.sh/docs/installation) v1.3 or higher.

```bash
# This also installs workspaces' dependencies.
bun install
```

`bun-workspaces` doesn't know your workspace data until `bun install` is run, and you may
need to run it again if you make changes to package.json files.

## Project Notes

- The root [`package.json`](./package.json) `"workspaces"` field defines the workspaces and catalogs for centralized dependency versions:
  - `packages/applications/*/*` matches each app's `web`, `rest-api`, and `shared` workspaces.
  - `packages/libraries/*` matches the shared libraries.
  - The `web` catalog helps share React versions across web dependencies, which reference it
    in their package.json files as `"catalog:web"`.
- There are two applications, `a` and `b`, each with three workspaces (`web`, `rest-api`,
  `shared`) using scoped names (e.g. `@app-a/web`, `@app-b/rest-api`). Each app's structure
  mirrors [example 03](../03_full-stack-web-app).
- Three cross-app libraries live under `packages/libraries`:
  - `common-utils`: neutral helpers usable from anywhere.
  - `backend-utils`: backend-only helpers, depends on `common-utils`.
  - `web-utils`: frontend-only helpers, depends on `common-utils`.
- Each app workspace has short aliases configured in `bw.workspace.ts`
  (e.g. `a-web`, `a-api`, `a-shared`, `b-web`, ...) so they can be referenced
  in patterns without the scope prefix.
- [`bw.root.ts`](./bw.root.ts) uses `workspacePatternConfigs` to assign workspace tags by path/name (`app-a`, `app-b`, `app-specific`, `library`, `common`, `web`, `backend`, `generic`) and uses `rules.workspaceDependencies`
  to enforce:
  - App workspaces may only depend on workspaces in their own app group or `generic` libraries.
  - `tag:web` workspaces may not depend on `tag:backend` workspaces (and vice versa).
  - `tag:common` workspaces (the app `shared` packages and `common-utils`) may not depend on
    `tag:web`, `tag:backend`, or `tag:app-specific` workspaces.
  - `bw` scripts will throw an error if any dependency violations are detected.

## Things to Try

### Commands

The root [`package.json`](./package.json) defines `bw` passthrough scripts so you don't
need a shell alias. `bw` is available because it's in `node_modules/.bin` after install.

```bash
# Runs each script across every workspace that has it
bun run lint
bun run build
bun run dev

# Scripts for app groups
bun run build:app-a
bun run build:app-b

bun run dev:app-a
bun run dev:app-b

# Scripts for specific workspaces
bun run build:app-a:web
bun run build:app-a:api

bun run build:app-b:web
bun run build:app-b:api

bun run dev:app-a:web
bun run dev:app-a:api

bun run dev:app-b:web
bun run dev:app-b:api
```

### Affected Commands

Affected workspaces can be useful for detecting only workspaces that have meaningfully changed. For example, if `web-utils` changes, only `web` workspaces and `web-utils` itself
are affected: The rest-api workspaces and `backend-utils` are not.

```bash
# See why each workspace is affected vs. the configured base ref (default "main")
bun run affected-debug

# Build/lint only affected workspaces
bun run build:affected
bun run lint:affected
```

## Further Reading

- [bun-workspaces Documentation](https://bunworkspaces.com)
  - [CLI reference](https://bunworkspaces.com/cli)
  - [Configuration reference](https://bunworkspaces.com/config)
    - [Root config](https://bunworkspaces.com/config/root)
    - [Workspace config](https://bunworkspaces.com/config/workspace)
    - [Workspace pattern configs](https://bunworkspaces.com/config/workspace-pattern-configs)
  - [Workspace patterns](https://bunworkspaces.com/concepts/workspace-patterns)
  - [Workspace dependencies](https://bunworkspaces.com/concepts/workspace-dependencies)
