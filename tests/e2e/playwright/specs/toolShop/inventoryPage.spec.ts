import { test, expect } from "@playwright/test";
import { isSorted } from "../../helpers/common.helper";
import { SortOrder } from "../../enums/sort.enum";

test.beforeEach(async ({ page }) => {
  // Visit base page
  await page.goto("https://practicesoftwaretesting.com/");

  // Wait for the products grid to load on the page.
  await page.waitForResponse("**/products**");
});

test.describe("Inventory Page", () => {
  test.describe("Sorting", () => {
    /**
     * GIVEN I am on the products page
     * WHEN I change the sort order to be asc/desc by name
     * THEN the products on the page are correctly sorted.
     */
    [
      {
        sortOrder: SortOrder.Asc,
        sortDescription: "Name (A - Z)",
      },
      {
        sortOrder: SortOrder.Desc,
        sortDescription: "Name (Z - A)",
      },
    ].forEach(({ sortOrder, sortDescription }) => {
      test(`can sort items in ${sortOrder} order by name`, async ({ page }) => {
        // Grab the names of the initial items on the screen
        let items = await page.locator('[data-test="product-name"]');
        const preSortItems = (await items.evaluateAll((itemList) =>
          itemList.map((item) => item.textContent)
        )) as string[];

        // Select sort option
        await page.locator('[data-test="sort"]').selectOption(sortDescription);

        // Wait for the products grid to load on the page.
        await page.waitForResponse("**/products**");

        // Grab the names of the items on the screen after sort.
        items = await page.locator('[data-test="product-name"]');
        const postSortItems = (await items.evaluateAll((itemList) =>
          itemList.map((item) => item.textContent)
        )) as string[];

        // Compare pre sort items to post sort items to make sure they are different
        /**
         * .every iterates over each element and returns false as soon as the function returns false, allowing us to save some iterations if the arrays aren't equal early in the comparison.
         */
        expect(
          postSortItems.every((postSortItem) =>
            preSortItems.includes(postSortItem)
          ),
          "Expected  the pre and post sort items to be different."
        ).toBeFalsy();

        // Verify sort of items is correct.
        expect(
          isSorted(postSortItems, sortOrder),
          `Expected items to be correctly sorted in ${sortOrder} order by name.`
        ).toBeTruthy();
      });
    });

    /**
     * GIVEN I am on the products page
     * WHEN I change the sort order to be asc/desc by price
     * THEN the products on the page are correctly sorted.
     */
    [
      {
        sortOrder: SortOrder.Asc,
        sortDescription: "Price (Low - High)",
      },
      {
        sortOrder: SortOrder.Desc,
        sortDescription: "Price (High - Low)",
      },
    ].forEach(({ sortOrder, sortDescription }) => {
      test(`can sort items in ${sortOrder} order by price`, async ({
        page,
      }) => {
        // Grab the prices of the initial items on the screen
        let items = await page.locator('[data-test="product-price"]');
        const preSortItems = (await items.evaluateAll((itemList) =>
          itemList.map((item) => item.textContent)
        )) as string[];

        // Select sort option
        await page.locator('[data-test="sort"]').selectOption(sortDescription);

        // Wait for the products grid to load on the page.
        await page.waitForResponse("**/products**");

        // Grab the prices of the items on the screen after sort.
        items = await page.locator('[data-test="product-price"]');
        const postSortItems = (await items.evaluateAll((itemList) =>
          itemList.map((item) => item.textContent)
        )) as string[];

        // Compare pre sort items to post sort items to make sure they are different
        /**
         * .every iterates over each element and returns false as soon as the function returns false, allowing us to save some iterations if the arrays aren't equal early in the comparison.
         */
        expect(
          postSortItems.every((postSortItem) =>
            preSortItems.includes(postSortItem)
          ),
          "Expected the pre and post sort items to be different."
        ).toBeFalsy();

        // Verify sort of items is correct.
        expect(
          isSorted(postSortItems, sortOrder),
          `Expected items to be correctly sorted in ${sortOrder} order by price.`
        ).toBeTruthy();
      });
    });
  });
});
