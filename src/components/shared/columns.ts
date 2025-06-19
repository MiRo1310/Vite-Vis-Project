import { RowShoppinglist } from "@/types/types.ts";
import { h } from "vue";

export const columns = [
  {
    accessorKey: "user",
    header: () => h("div", { class: "text-right" }, "User"),
    cell: ({ row }: { row: RowShoppinglist }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        row.getValue("user"),
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => h("div", { class: "text-right" }, "Amount"),
    cell: ({ row }: { row: RowShoppinglist }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
];
