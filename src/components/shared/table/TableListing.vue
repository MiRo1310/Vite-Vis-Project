<script setup lang="ts">
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableData from "@/components/shared/table-cell/TableCell.vue";
import { type TableCellClass, type TableCellType } from "@/lib/table.ts";

export interface TableListingType {
  val: boolean | number | string | null;
  type: TableCellType;
}

const props = defineProps<{ data: TableListingType[][]; class?: string; cellClass?: TableCellClass<any> }>();
</script>
<template>
  <Table :class="props.class">
    <TableBody>
      <TableRow v-for="(row, i) in data" :key="i">
        <TableCell v-for="(cell, index) in row" :key="index">
          <TableData :value="cell.val" :type="cell.type" :cell-class="cellClass" :original="row" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
