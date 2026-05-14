import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    name: "webConfig",
    files: ["packages/web/src/**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
    ...reactPlugin.configs.flat.recommended,
    ...reactHooksPlugin.configs.flat.recommended,
  },
);
