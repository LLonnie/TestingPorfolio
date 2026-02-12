import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { Header } from "../shared/header.page";

export class InventoryPage {
  readonly page: Page;
  readonly header: Header;

  readonly inventoryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);

    this.inventoryList = this.page.getByTestId("inventory-list");
  }

  async goto() {
    await this.page.goto("/inventory.html");
    await this.page.waitForURL("/inventory.html");
    await expect(this.inventoryList).toBeVisible();
  }
}
