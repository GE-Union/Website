// @ts-check
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default tseslint.config(
  {
    ignores: [
      "node_modules/",
      "dist/",
      ".astro/",
      "reference/",
      "playwright-report/",
      "test-results/",
      "reports/",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    // Node-side code: build/check scripts and config files.
    files: ["scripts/**/*.mjs", "*.config.{mjs,ts}", "eslint.config.mjs"],
    languageOptions: { globals: globals.node },
  },
  {
    // Browser-side code: page scripts shipped to the client.
    files: ["src/scripts/**/*.ts"],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      // Allow intentionally unused parameters when prefixed with "_".
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Remote strings must never reach innerHTML unsanitized (CLAUDE.md security
      // rule). This flags every use so a human reviews each one.
      "no-restricted-properties": [
        "error",
        {
          property: "innerHTML",
          message:
            "Do not set innerHTML with remote data. Use textContent/DOM nodes, or sanitize with DOMPurify and disable this rule locally with a justification.",
        },
        {
          property: "outerHTML",
          message: "Use DOM node creation instead of outerHTML.",
        },
      ],
    },
  },
);
