import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pageObjects/inventory/inventory.page";
import { itemList } from "../../constants/inventory/items.const";

test(
  "Loads the correct items into the inventory list.",
  { tag: "@regression" },
  async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    // Verify expected number of items
    expect
      .poll(async () => await inventoryPage.inventoryItems.all())
      .toHaveLength(6);

    // Verify expected items
    const expectedNames = itemList.map((item) => item.name);
    await expect(inventoryPage.itemNames).toHaveText(expectedNames);

    const expectedDescriptions = itemList.map((item) => item.description);
    await expect(inventoryPage.itemDescriptions).toHaveText(
      expectedDescriptions
    );

    const expectedCosts = itemList.map((item) => item.cost);
    await expect(inventoryPage.itemPrices).toHaveText(expectedCosts);
  }
);
