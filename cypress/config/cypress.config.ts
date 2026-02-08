import { defineConfig } from "cypress";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
  quiet: true,
});

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    env: {
      standardUser: process.env.STANDARD_USER,
      lockedUser: process.env.LOCKED_USER,
      problemUser: process.env.PROBLEM_USER,
      performanceUser: process.env.PERFORMANCE_USER,
      errorUser: process.env.ERROR_USER,
      visualUser: process.env.VISUAL_USER,
      password: process.env.PASSWORD,
    },
    supportFile: path.resolve(__dirname, "../support/e2e.ts"),
    specPattern: path.resolve(__dirname, "../e2e/**/*.cy.ts"),
  },
});
