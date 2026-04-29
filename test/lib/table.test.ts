import { describe, it, expect } from "vitest";
import { getValueByPath, getHtml, getColumns } from "../../src/lib/table";

describe("getValueByPath", () => {
  it("resolves nested properties and numeric indices", () => {
    const obj = { a: { b: [{ name: "first" }, { name: "second" }] }, c: 1 };
    expect(getValueByPath(obj, "a.b.0.name")).toBe("first");
    expect(getValueByPath(obj, "a.b.1.name")).toBe("second");
    expect(getValueByPath(obj, "c")).toBe(1);
    expect(getValueByPath(obj, "missing.path")).toBeUndefined();
  });
});

describe("getHtml", () => {
  it("returns a vnode with innerHTML where consecutive <br> are collapsed to single <br/>", () => {
    const renderer = getHtml("html");
    const row = { original: { html: "first<br><br>second<br/>third<br/><br/>fourth" } };
    const vnode: any = renderer({ row });
    // innerHTML should have consecutive <br> collapsed to single <br/>
    expect(vnode.props).toBeDefined();
    expect(vnode.props.innerHTML).toContain("first<br/>second");
    expect(vnode.props.innerHTML).toContain("third<br/>fourth");
  });

  it("returns empty string when value falsy", () => {
    const renderer = getHtml("html");
    const vnode = renderer({ row: { original: { html: "" } } });
    expect(vnode).toBe("");
  });
});

describe("getColumns (structure)", () => {
  it("builds columns with header and cell renderers and correct flags", () => {
    const columns = [
      { source: "name", labelKey: "Name", type: "text", className: "cls", sortable: true, hideable: true },
      { source: "sel", labelKey: "Select", type: "checkbox" },
    ] as any;

    const res = getColumns(columns);
    expect(res).toHaveLength(2);

    const first = res[0];
    expect(first.accessorKey).toBe("Name");
    expect(typeof first.header).toBe("function");
    expect(typeof first.cell).toBe("function");
    expect(first.enableHiding).toBe(true);
    expect(first.enableSorting).toBe(true);

    const second = res[1];
    expect(second.accessorKey).toBe("Select");
    // checkbox columns should disable hiding and sorting
    expect(second.enableHiding).toBe(false);
    expect(second.enableSorting).toBe(false);
  });
});

