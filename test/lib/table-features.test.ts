import { describe, expect, it } from "vitest";
import { useTable } from "@tanstack/vue-table";
import { appTableFeatures } from "@/lib/table-features";

describe("appTableFeatures", () => {
  const createTable = () =>
    useTable({
      features: appTableFeatures,
      data: [{ name: "b" }, { name: "c" }, { name: "a" }],
      columns: [{ accessorKey: "name", header: "Name" }],
    });

  it("sorts rows when sorting is toggled", () => {
    const table = createTable();
    table.getColumn("name")?.toggleSorting(false);
    expect(table.getRowModel().rows.map((row) => row.original.name)).toEqual(["a", "b", "c"]);
  });

  it("provides visible cells and row selection", () => {
    const table = createTable();
    const row = table.getRowModel().rows[0];
    expect(row.getVisibleCells()).toHaveLength(1);
    row.toggleSelected(true);
    expect(table.getRowModel().rows[0].getIsSelected()).toBe(true);
  });
});
