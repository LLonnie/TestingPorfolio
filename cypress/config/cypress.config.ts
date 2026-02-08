import { defineConfig } from "cypress";
import path from "path";

require("dotenv").config();

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    supportFile: path.resolve(__dirname, "../support/e2e.ts"),
    specPattern: path.resolve(__dirname, "../e2e/**/*.cy.ts"),
    setupNodeEvents(on, config) {
      config.env.STANDARD_USER = process.env.STANDARD_USER;
      config.env.LOCKED_USER = process.env.LOCKED_USER;
      config.env.PROBLEM_USER = process.env.PROBLEM_USER;
      config.env.PERFORMANCE_USER = process.env.PERFORMANCE_USER;
      config.env.ERROR_USER = process.env.ERROR_USER;
      config.env.VISUAL_USER = process.env.VISUAL_USER;
      config.env.PASSWORD = process.env.PASSWORD;
    },
  },
});
