import { test as setup, expect } from "@playwright/test";
import path from "path";

const users = [
  process.env.STANDARD_USER,
  process.env.PROBLEM_USER,
  process.env.PERFORMANCE_USER,
  process.env.ERROR_USER,
  process.env.VISUAL_USER,
];

for (const username of users) {
  setup(`authenticate ${username}`, async ({ page }) => {
    const authFile = path.join(__dirname, `${username}.json`);
    const password = process.env.PASSWORD;

    if (!username || !password) {
      throw new Error("Username or password are undefined");
    }

    await page.goto("/");
    await page.getByTestId("username").fill(username);
    await page.getByTestId("password").fill(password);
    await page.getByTestId("login-button").click();

    await page.waitForURL("/inventory.html");

    await page.context().storageState({ path: authFile });
  });
}
