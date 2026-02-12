import type { Locator, Page } from "@playwright/test";

export class Header {
  readonly page: Page;

  readonly menuButton: Locator;
  readonly getLink: (linkName: string) => Locator;

  constructor(page: Page) {
    this.page = page;

    this.menuButton = this.page.getByRole("button", { name: "Open Menu" });
    this.getLink = (linkName: string) =>
      this.page.getByRole("link", { name: linkName });
  }
}
