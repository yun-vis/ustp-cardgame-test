// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    // setupFiles: "src/setupTests.ts",
    outputFile: "test-results/results.xml",
    reporters: ["default", "junit"],
  },
});