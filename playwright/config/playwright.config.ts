import { defineConfig, devices } from "@playwright/test";
import path from "path";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "../e2e",
  fullyParallel: true,
  globalSetup: require.resolve("./global-setup.ts"),
  reporter: [["html", { outputFolder: "../reports" }]],
  use: {
    baseURL: "https://www.saucedemo.com/",
    testIdAttribute: "data-test",
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testDir: "../.auth",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: path.resolve(__dirname, "../.auth/standard_user.json"),
      },
      dependencies: ["setup"],
    },
    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     storageState: path.resolve(__dirname, "../.auth/standard_user.json"),
    //   },
    //   dependencies: ["setup"],
    // },
    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //     storageState: path.resolve(__dirname, "../.auth/standard_user.json"),
    //   },
    //   dependencies: ["setup"],
    // },
  ],
});
