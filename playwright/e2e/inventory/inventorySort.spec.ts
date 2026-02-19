import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pageObjects/inventory/inventory.page";
import { itemList } from "../../constants/inventory/items.const";
import { Item } from "../../types/item.model";

[
  {
    sortOrder: "ascending",
    sortField: "name",
    labelName: "Name (A to Z)",
  },
  {
    sortOrder: "descending",
    sortField: "name",
    labelName: "Name (Z to A)",
  },
  {
    sortOrder: "ascending",
    sortField: "cost",
    labelName: "Price (low to high)",
  },
  {
    sortOrder: "descending",
    sortField: "cost",
    labelName: "Price (high to low)",
  },
].forEach(({ sortOrder, sortField, labelName }) => {
  test(
    `Sorts items by ${sortField} ${sortOrder}`,
    { tag: "@regression" },
    async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.goto();

      // Change the sort
      await inventoryPage.sort.selectOption(labelName);

      // Get items
      const items = await inventoryPage.inventoryItems.all();

      // Verify sort order
      const expectedOrder = sortItems(sortOrder, sortField, itemList);
      for (const [index, item] of items.entries()) {
        await expect(item.getByTestId("inventory-item-name")).toContainText(
          expectedOrder[index].name
        );
        await expect(item.getByTestId("inventory-item-desc")).toContainText(
          expectedOrder[index].description
        );
        await expect(item.getByTestId("inventory-item-price")).toContainText(
          expectedOrder[index].cost
        );
      }
    }
  );
});

const sortItems = (sortOrder: string, sortByField: string, items: Item[]) => {
  const sortedItems = items.sort((a, b) => {
    if (sortByField === "name") {
      return compareNames(a.name, b.name, sortOrder);
    }

    if (sortByField === "cost") {
      return compareMoney(a, b, sortOrder);
    }

    throw new Error("Sort field invalid");
  });

  return sortedItems;
};

const compareNames = (a: string, b: string, sortOrder: string) => {
  const nameA = a.toUpperCase();
  const nameB = b.toUpperCase();

  if (sortOrder === "ascending") {
    return nameA < nameB ? -1 : 1;
  } else {
    return nameA < nameB ? 1 : -1;
  }
};

const compareMoney = (a: Item, b: Item, sortOrder: string) => {
  const numA = parseFloat(a.cost.replace(/[^0-9.0]+/g, ""));
  const numB = parseFloat(b.cost.replace(/[^0-9.0]+/g, ""));

  const priceDiff = numA - numB;

  if (priceDiff !== 0) {
    if (sortOrder === "ascending") {
      return priceDiff < 0 ? -1 : 1;
    } else {
      return priceDiff < 0 ? 1 : -1;
    }
  }

  return compareNames(a.name, b.name, "ascending");
};
