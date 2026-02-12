import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pageObjects/login/login.page";
import { InventoryPage } from "../../pageObjects/inventory/inventory.page";

test.use({ storageState: "" });
test("Can login", { tag: ["@regression", "@smoke"] }, async ({ page }) => {
  const { username, password } = getCredentials(
    process.env.STANDARD_USER,
    process.env.PASSWORD
  );

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);

  const inventory = new InventoryPage(page);
  await page.waitForURL("/inventory.html");
  await expect(inventory.inventoryList).toBeVisible();
});

test(
  "Receives error when user is locked out",
  { tag: "@regression" },
  async ({ page }) => {
    const { username, password } = getCredentials(
      process.env.LOCKED_USER,
      process.env.PASSWORD
    );

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);

    const error = loginPage.error;
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
