import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { Header } from "../shared/header.page";

export class InventoryPage {
  readonly page: Page;
  readonly header: Header;

  readonly sort: Locator;

  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemDescriptions: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);

    this.sort = this.page.getByTestId("product-sort-container");

    this.inventoryList = this.page.getByTestId("inventory-list");
    this.inventoryItems = this.page.getByTestId("inventory-item");
    this.itemNames = this.page.getByTestId("inventory-item-name");
    this.itemDescriptions = this.page.getByTestId("inventory-item-desc");
    this.itemPrices = this.page.getByTestId("inventory-item-price");
  }

  async goto() {
    await this.page.goto("/inventory.html");
    await this.page.waitForURL("/inventory.html");
    await expect(this.inventoryList).toBeVisible();
  }
}
