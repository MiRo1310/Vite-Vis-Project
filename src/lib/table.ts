import { h, HTMLAttributes } from "vue";
import { ArrowUpDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import TableCell from "@/components/shared/table-cell/TableCell.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { clsx } from "clsx";

export interface DatatableColumns {
  accessorKey: string;
  headerClass?: string;
  source: string;
  labelKey: string;
  defaultVisibility?: boolean;
  unit?: string;
  hideable?: boolean;
  sortable?: boolean;
  component?: object;
  className?: HTMLAttributes["class"];
  type: "text" | "date" | "bool" | "datetime" | "time" | "number" | "component" | "html" | "checkbox";
  callback?: () => void;
  deepNestedProp?: string;
  customValue?: CustomValue;
}

type CustomValue = string | number | boolean

export const getColumns = (columns: DatatableColumns[]) => {
  return columns.map((column: DatatableColumns) => {
    return {
      accessorKey: column.accessorKey || column.labelKey || column.source,
      headerClass: column.headerClass,
      source: column.source,

      defaultVisibility: column.defaultVisibility,
      header: getHeader({
        source: column.source,
        label: column.labelKey,
        sortable: column?.sortable,
        className: column?.className,
        type: column.type

      }),
      cell: getCell({
        source: column.source,
        component: column.component,
        type: column.type,
        unit: column.unit,
        className: column.className,
        callback: column.callback,
        deepNestedProp: column.deepNestedProp,
        customValue: column.customValue
      }),
      enableHiding: column.type === "checkbox" ? false : column.hideable,
      enableSorting: column.type !== "checkbox" && column.sortable
    };
  });
};

const getHeader = (obj: {
  className: string | undefined;
  source: string;
  label: string | undefined;
  sortable: boolean | undefined;
  type: "text" | "date" | "bool" | "datetime" | "time" | "number" | "component" | "html" | "checkbox";
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
        ariaLabel: "Select all"
      });
  }

  return () => h("div", { class: clsx(obj.className) }, obj.label === "" ? "" : obj.label ?? obj.source);
};

interface DataTableCellCreator {
  source: string;
  component?: object;
  type: "text" | "date" | "bool" | "datetime" | "time" | "number" | "component" | "html" | "checkbox";
  className?: string;
  monoFont?: boolean;
  replacementForZero?: string | null;
  unit?: string;
  decimal?: boolean;
  unitAdditive?: string;
  callback?: () => void;
  deepNestedProp?: string;
  customValue?: CustomValue;
}

const getCell = (obj: DataTableCellCreator) => {
  if (obj.deepNestedProp && !obj.component) {
    return getDeepNestedProp(obj, TableCell);
  }
  if (["text", "date", "bool", "datetime", "time", "number"].includes(obj.type)) {
    return getTableCell(
      TableCell,
      obj.source,
      obj.className,
      obj.type,
      obj.replacementForZero,
      obj.unit,
      obj.decimal,
      obj.unitAdditive
    );
  }
  if (obj.type === "html") {
    return getHtml(obj.source);
  }
  if (obj.type === "component" && obj.component) {
    return getComponent(obj.component, obj.source, obj.className, obj.customValue, obj.callback);
  }

  if (obj.type === "checkbox") {
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
      class: "mr-4"
    });
};

const getHtml = (source: string) => {
  return ({ row }: any) => {
    let val = "";
    if (row.original[source]) {
      val = row.original[source];
    }
    val = val.replace(/(?:<br\/?>){2}/gi, "<br/>");
    return h("div", { innerHTML: val });
  };
};
const getTableCell = (
  component: object,
  source: string,
  className: string | undefined,
  type: string,
  replacementForZero?: string | null,
  unit?: string | undefined,
  decimal?: boolean | undefined,
  unitAdditive?: string
) => {
  return ({ row }: any) => {
    const value = row.original[source];
    return h(
      "div",
      {
        class: clsx({
          "font-medium": true,
          [className || ""]: true
        })
      },
      h(component, {
        value,
        replacementForZero,
        unit,
        decimal,
        type,
        unitAdditive
      })
    );
  };
};
const getComponent = (
  component: object,
  source: string,
  className: string | undefined,
  customValue: CustomValue | undefined,
  callback?: () => void | undefined
) => {
  return ({ row }: any) => {
    const value = row.original[source] || row.original;
    return h(
      "div",
      {
        class: clsx({
          "font-medium": true,
          [className || ""]: true
        })
      },
      h(component, {
        value,
        row,
        source,
        customValue,
        deepNestedProp: getValueByPath(row.original, source),
        ...(callback ? { callback: callback } : {})
      })
    );
  };
};
const getDeepNestedProp = ({
                             className,
                             source,
                             replacementForZero,
                             unit,
                             decimal,
                             type,
                             unitAdditive
                           }: DataTableCellCreator, component: object) => {
  return ({ row }: any) => {
    const value = getValueByPath(row.original, source);
    return h(
      "div",
      {
        class: clsx({
          "font-medium": true,
          [className || ""]: true
        })
      },
      h(component, {
        value,
        replacementForZero,
        unit,
        decimal,
        type,
        unitAdditive
      })
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
  type: "text" | "date" | "bool" | "datetime" | "time" | "number" | "component" | "html" | "checkbox";
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
          obj.sortable
            ? column.toggleSorting(column.getIsSorted() === "asc", obj.label)
            : column.toggleSortingHandler(column.getIsSorted() === "asc", obj.label);
        },
        class: "px-0 hover:bg-accent/50"
      },
      () => [obj.label === "" ? "" : obj.label ?? obj.source, h(ArrowUpDown, { class: "ml-2 h-4 w-4 " })]
    )
  );
};