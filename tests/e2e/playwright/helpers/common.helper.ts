import { SortOrder } from "../enums/sort.enum";

export const isSorted = (arr: string[], sortOrder = SortOrder.Asc) => {
  if (sortOrder === SortOrder.Asc) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
  } else {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < arr[i + 1]) {
        return false;
      }
    }
    return true;
  }
};
