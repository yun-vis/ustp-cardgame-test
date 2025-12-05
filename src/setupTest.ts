// src/setupTest.ts

import "@testing-library/jest-dom"; // adds custom jest DOM matchers
import { cleanup } from "@testing-library/react";

// Automatically clean up the DOM after each test
afterEach(() => {
  cleanup();
});
