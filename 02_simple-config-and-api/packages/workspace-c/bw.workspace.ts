import { defineWorkspaceConfig } from "bun-workspaces/config";

export default defineWorkspaceConfig({
  // Alias for this workspace
  // Cannot conflict with other aliases or
  // workspace names.
  alias: "c",

  // Tags can be shared between workspaces
  // and can be referenced in workspace patterns,
  // e.g. "tag:my-tag", "tag:tag-c", "tag:tag-*"
  tags: ["my-tag", "tag-c"],
});
