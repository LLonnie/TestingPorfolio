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
     * WHEN I change the sort order to be asc/desc by name or price
     * THEN the products on the page are correctly sorted.
     */
    [
      {
        sortOrder: SortOrder.Asc,
        sortDescription: "Name (A - Z)",
        sortBy: "name",
      },
      {
        sortOrder: SortOrder.Desc,
        sortDescription: "Name (Z - A)",
        sortBy: "name",
      },
      {
        sortOrder: SortOrder.Asc,
        sortDescription: "Price (Low - High)",
        sortBy: "price",
      },
      {
        sortOrder: SortOrder.Desc,
        sortDescription: "Price (High - Low)",
        sortBy: "price",
      },
    ].forEach(({ sortOrder, sortDescription, sortBy }) => {
      test(`can sort items in ${sortOrder} order by ${sortBy}`, async ({
        page,
      }) => {
        // Grab the names of the initial items on the screen
        let items = await page.locator(`[data-test="product-${sortBy}"]`);
        const preSortItems = (await items.evaluateAll((itemList) =>
          itemList.map((item) => item.textContent)
        )) as string[];

        // Select sort option
        await page.locator('[data-test="sort"]').selectOption(sortDescription);

        // Wait for the products grid to load on the page.
        await page.waitForResponse("**/products**");

        // Grab the names of the items on the screen after sort.
        items = await page.locator(`[data-test="product-${sortBy}"]`);
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
          `Expected items to be correctly sorted in ${sortOrder} order by ${sortBy}.`
        ).toBeTruthy();
      });
    });
  });

  test.describe("Search", () => {
    /**
     * GIVEN I am on the products page
     * WHEN I enter a search term "screw"
     * AND press the "Search" button
     * THEN the products on the page are correctly filtered by the search term
     * AND WHEN I click the clear search button
     * THEN the grid is correctly reset to its initial state.
     */
    test("Can search for items, and then clear the search", async ({
      page,
    }) => {
      const searchTerm = "screw";
      // Get list of initial items.
      let items = await page.locator('[data-test="product-name"]');
      const preSearchItems = (await items.evaluateAll((itemList) =>
        itemList.map((item) => item.textContent)
      )) as string[];

      // Search for "screw"
      await page.locator('[data-test="search-query"]').fill(searchTerm);
      await page.locator('[data-test="search-submit"]').click();
      await page.waitForResponse("**/search**");

      // Get list of items after searching
      items = await page.locator('[data-test="product-name"]');
      const postSearchItems = (await items.evaluateAll((itemList) =>
        itemList.map((item) => item.textContent)
      )) as string[];

      // Verify all items shown contain screw
      expect(
        postSearchItems.every((item) =>
          item.toLocaleLowerCase().includes(searchTerm)
        )
      ).toBeTruthy();

      // Clear search
      await page.locator('[data-test="search-reset"]').click();
      await page.waitForResponse("**/products**");

      // Get list of items after clearing searching
      items = await page.locator('[data-test="product-name"]');
      const postSearchClearItems = (await items.evaluateAll((itemList) =>
        itemList.map((item) => item.textContent)
      )) as string[];

      // Verify list of items reset.
      expect(
        postSearchClearItems.every((item) => preSearchItems.includes(item))
      ).toBeTruthy();
    });

    /**
     * GIVEN I am on the products page
     * WHEN I enter a search term "xxx" that has no results
     * AND press the "Search" button
     * THEN I recieve the expected "There are no products found" message.
     */
    test("Returns 'no products found' message for a search yielding no results", async ({
      page,
    }) => {
      const searchTerm = "xxx";
      // Search for "xxx"
      await page.locator('[data-test="search-query"]').fill(searchTerm);
      await page.locator('[data-test="search-submit"]').click();
      await page.waitForResponse("**/search**");

      // Get list of items after searching
      const items = await page.locator('[data-test="product-name"]');
      const postSearchItems = (await items.evaluateAll((itemList) =>
        itemList.map((item) => item.textContent)
      )) as string[];

      // Verify no products found and expected message presented.
      const noProductMessage = await page
        .locator('[data-test="no-results"]')
        .textContent();
      expect(postSearchItems).toHaveLength(0);
      expect(noProductMessage).toEqual("There are no products found.");
    });
  });

  test.describe.skip("Price Range Slider", () => {
    [
      {
        lowRange: 1,
        highRange: 10,
      },
      // {
      //   lowRange: 150,
      //   highRange: 200,
      // },
    ].forEach(({ lowRange, highRange }) => {
      test(`Products are correctly filtered by the price range slider when set to ${lowRange}-${highRange}`, async ({
        page,
      }) => {
        // // Get slider bounding box
        // // Get current value of lower bound
        // // Calculate the % of desired number in range (1-200)
        // // Select lower bound
        // // Move mouse to desired bound
        // // Let go of mouse.
        // // Get the slider bounding box
        // const sliderBound = await page.locator("ngx-slider").boundingBox();
        // // Set the lower number
        // const currentLowValue = await page.evaluate(
        //   `document.evaluate('span[aria-label="ngx-slider"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value`
        // );
        // const lowTargetX =
        //   sliderBound?.x + (sliderBound?.width * currentLowValue) / 100;
        // const lowTargetY = sliderBound?.y + sliderBound?.height / 2;
        // const lowRangeSelector = await page.locator(
        //   'span[aria-label="ngx-slider"]'
        // );
        // await lowRangeSelector.hover();
        // await page.mouse.down();
        // await lowRangeSelector.hover({
        //   position: {
        //     x: 0, //sliderBound.x + (sliderBound.width * 1) / 100
        //     y: sliderBound.y + sliderBound?.height / 2,
        //   },
        // });
        // await page.mouse.up();
        // // Set the higher number
        // const highRangeSelector = await page.locator(
        //   'span[aria-label="ngx-slider-max"]'
        // );
        // await highRangeSelector.hover();
        // await page.mouse.down();
        // await highRangeSelector.hover({ position: { x: highRange, y: 0 } });
        // await page.mouse.up();
        // // Get the items
        // // Grab the names of the initial items on the screen
        // let items = await page.locator('[data-test="product-price"]');
        // const postPriceFilterItems = (await items.evaluateAll((itemList) =>
        //   itemList.map((item) => item.textContent)
        // )) as string[];
        // console.log(postPriceFilterItems);
        // // Verify the items are in between the range set.
      });
    });
  });
});
