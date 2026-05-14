import { defineRootConfig } from "bun-workspaces/config";

export default defineRootConfig({
  workspacePatternConfigs: [
    {
      patterns: ["path:packages/applications/a/**/*"],
      config: {
        tags: ["app-a", "app-specific"],
        rules: {
          workspaceDependencies: {
            allowPatterns: ["tag:app-a", "tag:generic"],
          },
        },
      },
    },
    {
      patterns: ["path:packages/applications/b/**/*"],
      config: {
        tags: ["app-b", "app-specific"],
        rules: {
          workspaceDependencies: {
            allowPatterns: ["tag:app-b", "tag:generic"],
          },
        },
      },
    },
    {
      patterns: ["path:packages/libraries/**/*"],
      config: {
        tags: ["generic"],
      },
    },
    {
      patterns: ["re:shared", "path:packages/libraries/**/*"],
      config: {
        tags: ["library"],
      },
    },
    {
      patterns: ["re:shared", "common-utils"],
      config: {
        tags: ["common"],
        rules: {
          workspaceDependencies: {
            denyPatterns: ["tag:web", "tag:backend", "tag:app-specific"],
          },
        },
      },
    },
    {
      patterns: ["web-utils", "re:/web$"],
      config: {
        tags: ["web"],
      },
    },
    {
      patterns: ["backend-utils", "re:/rest-api$"],
      config: {
        tags: ["backend"],
      },
    },
    {
      patterns: ["tag:web"],
      config: {
        rules: {
          workspaceDependencies: {
            denyPatterns: ["tag:backend"],
          },
        },
      },
    },
    {
      patterns: ["tag:backend"],
      config: {
        rules: {
          workspaceDependencies: {
            denyPatterns: ["tag:web"],
          },
        },
      },
    },
  ],
});
