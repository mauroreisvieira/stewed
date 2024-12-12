/* eslint-disable jsdoc/require-jsdoc */
import { sortData, SortDirection } from "../index";

interface Item {
  id: number;
  name: string;
  createdAt: Date;
}

describe("sortData", () => {
  const items: Item[] = [
    { id: 3, name: "Charlie", createdAt: new Date("2023-03-01") },
    { id: 1, name: "Alice", createdAt: new Date("2023-01-01") },
    { id: 2, name: "Bob", createdAt: new Date("2023-02-01") }
  ];

  it("should sort by a numeric column in ascending order", () => {
    const sorted = sortData({
      items,
      column: "id",
      direction: SortDirection.ASC
    });

    expect(sorted).toEqual([
      { id: 1, name: "Alice", createdAt: new Date("2023-01-01") },
      { id: 2, name: "Bob", createdAt: new Date("2023-02-01") },
      { id: 3, name: "Charlie", createdAt: new Date("2023-03-01") }
    ]);
  });

  it("should sort by a numeric column in descending order", () => {
    const sorted = sortData({
      items,
      column: "id",
      direction: SortDirection.DESC
    });

    expect(sorted).toEqual([
      { id: 3, name: "Charlie", createdAt: new Date("2023-03-01") },
      { id: 2, name: "Bob", createdAt: new Date("2023-02-01") },
      { id: 1, name: "Alice", createdAt: new Date("2023-01-01") }
    ]);
  });

  it("should sort by a string column in ascending order", () => {
    const sorted = sortData({
      items,
      column: "name",
      direction: SortDirection.ASC
    });

    expect(sorted).toEqual([
      { id: 1, name: "Alice", createdAt: new Date("2023-01-01") },
      { id: 2, name: "Bob", createdAt: new Date("2023-02-01") },
      { id: 3, name: "Charlie", createdAt: new Date("2023-03-01") }
    ]);
  });

  it("should sort by a string column in descending order", () => {
    const sorted = sortData({
      items,
      column: "name",
      direction: SortDirection.DESC
    });

    expect(sorted).toEqual([
      { id: 3, name: "Charlie", createdAt: new Date("2023-03-01") },
      { id: 2, name: "Bob", createdAt: new Date("2023-02-01") },
      { id: 1, name: "Alice", createdAt: new Date("2023-01-01") }
    ]);
  });

  it("should sort by a date column in ascending order", () => {
    const sorted = sortData({
      items,
      column: "createdAt",
      direction: SortDirection.ASC
    });

    expect(sorted).toEqual([
      { id: 1, name: "Alice", createdAt: new Date("2023-01-01") },
      { id: 2, name: "Bob", createdAt: new Date("2023-02-01") },
      { id: 3, name: "Charlie", createdAt: new Date("2023-03-01") }
    ]);
  });

  it("should sort by a date column in descending order", () => {
    const sorted = sortData({
      items,
      column: "createdAt",
      direction: SortDirection.DESC
    });

    expect(sorted).toEqual([
      { id: 3, name: "Charlie", createdAt: new Date("2023-03-01") },
      { id: 2, name: "Bob", createdAt: new Date("2023-02-01") },
      { id: 1, name: "Alice", createdAt: new Date("2023-01-01") }
    ]);
  });

  it("should handle empty values by sorting them after other values in ascending order", () => {
    const itemsWithEmpty: Item[] = [
      { id: 1, name: "Alice", createdAt: new Date("2023-01-01") },
      { id: 2, name: "", createdAt: new Date("2023-02-01") },
      { id: 3, name: "Charlie", createdAt: new Date("2023-03-01") }
    ];

    const sorted = sortData({
      items: itemsWithEmpty,
      column: "name",
      direction: SortDirection.ASC
    });

    expect(sorted).toEqual([
      { id: 2, name: "", createdAt: new Date("2023-02-01") },
      { id: 1, name: "Alice", createdAt: new Date("2023-01-01") },
      { id: 3, name: "Charlie", createdAt: new Date("2023-03-01") }
    ]);
  });

  it("should handle empty arrays without errors", () => {
    const sorted = sortData({
      items: [],
      column: "name",
      direction: SortDirection.ASC
    });

    expect(sorted).toEqual([]);
  });
});
