import { test as setup, expect } from "@playwright/test";
import path from "path";

const users = [
  process.env.STANDARD_USER,
  process.env.PROBLEM_USER,
  process.env.ERROR_USER,
  process.env.VISUAL_USER,
];

const __dirname = path.dirname(new URL(import.meta.url).pathname);

for (const username of users) {
  setup(`authenticate ${username}`, async ({ page }) => {
    const authFile = path.join(__dirname, `${username}.json`);
    const password = process.env.PASSWORD;

    if (!username || !password) {
      throw new Error("Unable to get username/password from env file");
    }

    await page.goto("/");
    await page.getByTestId("username").fill(username);
    await page.getByTestId("password").fill(password);
    await page.getByTestId("login-button").click();

    await page.waitForURL("/inventory.html");
    await expect(page.getByTestId("title")).toBeVisible();
    await expect(page.getByTestId("title")).toContainText("Products");

    await page.context().storageState({ path: authFile });
  });
}
