import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pageObjects/login/login.page";
import { InventoryPage } from "../../pageObjects/inventory/inventory.page";

test("Can logout", { tag: ["@regression", "@smoke"] }, async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.goto();

  await inventoryPage.header.menuButton.click();
  await inventoryPage.header.getLink("Logout").click();

  await page.waitForURL("/");
  await expect(inventoryPage.inventoryList).not.toBeVisible();

  const loginPage = new LoginPage(page);
  await expect(loginPage.username).toBeVisible();
});
