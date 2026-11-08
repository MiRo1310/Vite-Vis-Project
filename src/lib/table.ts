import { h, type HTMLAttributes } from "vue";
import { ArrowUpDown } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import TableCell from "@/components/shared/table-cell/TableCell.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { clsx } from "clsx";
import { type Paths } from "@/types/types.ts";
import { cn } from "@/lib/utils.ts";

export type TableCellClass<Original> = (original: Original) => string;

export type TableCellType = "text" | "date" | "bool" | "datetime" | "time" | "number" | "component" | "html" | "checkbox" | "preCode";

export interface DatatableColumns<T> {
  accessorKey?: string;
  headerClass?: string;
  source: Paths<T>;
  labelKey: string;
  defaultVisibility?: boolean;
  unit?: string;
  hideable?: boolean;
  sortable?: boolean;
  component?: object;
  decimals?: number;
  className?: HTMLAttributes["class"];
  type?: TableCellType;
  reverse?: true;
  callback?: (params: Record<string, any>) => void;
  customValue?: CustomValue;
  cellClass?: TableCellClass<T>;
}

export type CustomValue = string | number | boolean | undefined | object;

export const getColumns = (columns: Array<DatatableColumns<any>>) => {
  return columns.map((column: DatatableColumns<any>) => {
    return {
      accessorKey: (column.accessorKey ?? column.source) || column.labelKey,
      headerClass: column.headerClass,
      source: column.source,

      defaultVisibility: column.defaultVisibility,
      header: getHeader({
        source: column.source,
        label: column.labelKey,
        sortable: column.sortable,
        className: cn(column.className),
        type: column.type ?? "text",
      }),
      cell: getCell({
        source: column.source,
        component: column.component,
        type: column.type ?? "text",
        unit: column.unit,
        className: cn(column.className),
        callback: column.callback,
        customValue: column.customValue,
        reverse: column.reverse,
        decimals: column.decimals,
        cellClass: column.cellClass,
      }),
      enableHiding: column.type === "checkbox" ? false : column.hideable,
      enableSorting: column.type !== "checkbox" && column.sortable,
    };
  });
};

const getHeader = (obj: {
  className: string | undefined;
  source: string;
  label: string | undefined;
  sortable: boolean | undefined;
  type: TableCellType;
  reverse?: boolean | undefined;
}) => {
  if (obj.sortable) {
    return ({ column }: any) => {
      return buttonSorting(column, obj);
    };
  }
  if (obj.type === "checkbox") {
    return ({ table }: any) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        "onUpdate:checked": (value: boolean) => table.toggleAllPageRowsSelected(value),
        ariaLabel: "Select all",
      });
  }

  return () => h("div", { class: clsx(obj.className) }, obj.label === "" ? "" : (obj.label ?? obj.source));
};

interface DataTableCellCreator {
  source: string;
  component?: object;
  type: TableCellType;
  className?: string;
  monoFont?: boolean;
  replacementForZero?: string | null;
  unit?: string;
  decimals?: number;
  unitAdditive?: string;
  callback?: (params: Record<string, any>) => void;
  customValue?: CustomValue;
  reverse?: boolean | undefined;
  cellClass?: TableCellClass<any>;
}

const getCell = ({
  type,
  source,
  className,
  unit,
  reverse,
  replacementForZero,
  decimals,
  unitAdditive,
  cellClass,
  component,
  customValue,
  callback,
}: DataTableCellCreator) => {
  const tableCellIncludedTypes: TableCellType[] = ["text", "date", "bool", "datetime", "time", "number", "preCode"];
  if (tableCellIncludedTypes.includes(type)) {
    return getTableCell({
      component: TableCell,
      source,
      className,
      type,
      replacementForZero,
      unit,
      decimals,
      unitAdditive,
      reverse,
      cellClass,
    });
  }
  if (type === "html") {
    return getHtml(source);
  }
  if (type === "component" && component) {
    return getComponent(component, source, className, customValue, callback, cellClass);
  }

  if (type === "checkbox") {
    return checkbox();
  }
};

const checkbox = () => {
  return ({ row }: any) =>
    h(Checkbox, {
      checked: row.getIsSelected(),
      "onUpdate:checked": (value: boolean) => row.toggleSelected(value),
      onClick: (event: Event) => {
        event.stopPropagation();
      },
      ariaLabel: "Select row",
      class: "mr-4",
    });
};

export const getHtml = (source: string) => {
  return ({ row }: any) => {
    let val = getValueByPath(row.original, source);
    if (!val) {
      return "";
    }
    val = val.replace(/(?:<br\/?>){2}/gi, "<br/>");
    return h("div", { innerHTML: val });
  };
};
const getComponent = (
  component: object,
  source: string,
  className: string | undefined,
  customValue: CustomValue | undefined,
  callback?: (params: Record<string, any>) => void,
  cellClass?: TableCellClass<any>,
) => {
  return ({ row }: any) => {
    const value = getValueByPath(row.original, source);
    return h(
      "div",
      {
        class: clsx({
          "font-medium": true,
          [className ?? ""]: true,
        }),
      },
      h(component, {
        value,
        row,
        source,
        customValue,
        cellClass,
        ...(callback ? { callback: callback } : {}),
      }),
    );
  };
};
const getTableCell = ({
  component,
  source,
  className,
  type,
  replacementForZero,
  unit,
  decimals,
  unitAdditive,
  reverse,
  cellClass,
}: {
  component: object;
  source: string;
  className: string | undefined;
  type: string;
  replacementForZero?: string | null;
  unit?: string | undefined;
  decimals?: number;
  unitAdditive?: string;
  reverse?: boolean;
  cellClass?: TableCellClass<any>;
}) => {
  return ({ row }: any) => {
    const value = getValueByPath(row.original, source);
    return h(
      "div",
      {
        class: clsx({
          "font-medium": true,
          [className ?? ""]: true,
        }),
      },
      h(component, {
        value,
        replacementForZero,
        unit,
        decimals,
        type,
        unitAdditive,
        reverse,
        cellClass,
        original: row.original,
      }),
    );
  };
};

export const getValueByPath = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => {
    const index = parseInt(part, 10);
    return isNaN(index) ? acc?.[part] : acc?.[index];
  }, obj);
};

interface DataTableHeaderCreator {
  label: string | undefined;
  source: string;
  sortable: boolean | undefined;
  className: string | undefined;
  type: TableCellType;
}

const buttonSorting = (column: any, obj: DataTableHeaderCreator) => {
  return h(
    "div",
    { class: clsx(["w-full", obj.className]) },
    h(
      Button,
      {
        variant: "ghost",
        onClick: () => {
          column.toggleSorting(column.getIsSorted() === "asc");
        },
        class: "px-0 hover:bg-accent/50",
      },
      () => [obj.label === "" ? "" : (obj.label ?? obj.source), h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
    ),
  );
};
