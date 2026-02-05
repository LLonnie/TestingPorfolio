import { test, expect } from "@playwright/test";

test.use({ storageState: "" });
test("Can login", { tag: "@regression" }, async ({ page }) => {
  const { username, password } = getCredentials(
    process.env.STANDARD_USER,
    process.env.PASSWORD
  );

  await page.goto("/");

  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("login-button").click();

  await page.waitForURL("/inventory.html");
  await expect(page.getByTestId("inventory-list")).toBeVisible();
});

test(
  "Receives error when user is locked out",
  { tag: "@regression" },
  async ({ page }) => {
    const { username, password } = getCredentials(
      process.env.LOCKED_USER,
      process.env.PASSWORD
    );

    await page.goto("/");

    await page.getByTestId("username").fill(username);
    await page.getByTestId("password").fill(password);
    await page.getByTestId("login-button").click();

    const error = page.getByTestId("error");
    await expect(error).toBeVisible();
    await expect(error).toContainText("Sorry, this user has been locked out.");
    await expect(page.url()).not.toContain("/inventory.html");
  }
);

const getCredentials = (
  username: string | undefined,
  password: string | undefined
) => {
  if (!username || !password) {
    throw new Error("Unable to get username/password from env file");
  }

  return { username, password };
};
