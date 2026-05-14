# `bun-workspaces` Example 05: Node Wrapper

This is essentially the same example as [01_simple-zero-config](../01_simple-zero-config), but Node
is used to run the `"main"` scripts for each workspace instead of Bun. See that example for
more details on the project structure and the commands you can run, which are the same here.

## Interoperability

Bun can be used as a package manager for Node projects, and since
`bun-workspaces` interops with only the package management layer, it is compatible
with Node projects in the same way.

After all, `package.json` scripts can be arbitrary shell commands, and Bun's workspace
resolution links workspaces in `node_modules` in a way that is Node-compatible, so
workspace dependencies still resolve.

### When the Bun runtime is required

Note that if you're using the `bun-workspaces` TypeScript/JavaScript API
(anytime you use imports from `"bun-workspaces"` in JS/TS files), scripts
must be ran via Bun.

## Requirements

- Node.js 24 or higher
- Bun 1.3 or higher
