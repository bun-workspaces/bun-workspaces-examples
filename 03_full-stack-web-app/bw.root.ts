import { defineRootConfig } from "bun-workspaces/config";

export default defineRootConfig({
  workspacePatternConfigs: [
    // Merge transformations of workspace configs in bulk.
    //
    // Workspaces' individual bw.workspace.ts files are pre-applied,
    // which is why we can reference the tags they define.
    {
      patterns: ["*"],
      config: {
        rules: {
          // bun-workspaces will throw when reading the project
          // if these dependency rules are violated.
          //
          // Below, the given allowPatterns and denyPatterns have
          // similar effects if the other was omitted in this specific case.
          workspaceDependencies: {
            // apps shouldn't be used as dependencies
            denyPatterns: ["tag:app"],
            // only libraries are allowed to be used as dependencies
            allowPatterns: ["tag:library"],
          },
        },
      },
    },
  ],
});
