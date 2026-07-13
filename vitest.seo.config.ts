import { defineConfig } from "vitest/config";

// Post-build SEO checks (tests/seo/) parse dist/, so they run separately
// from the unit suite: `npm run build && npm run test:seo`.
export default defineConfig({
  test: {
    include: ["tests/seo/**/*.test.ts"],
  },
});
