<script setup lang="ts" generic="TData, TValue">
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableData, { TableCellType } from "@/components/shared/table-cell/TableCell.vue";

export interface TableListingType {
  val: boolean | number | string | null;
  type: TableCellType;
}

const props = defineProps<{ data: TableListingType[][]; class?: string; }>();

</script>
<template>
  <Table :class="props.class">
    <TableBody>
      <TableRow v-for="(row, i) in data" :key="i">
        <TableCell v-for="(cell, index) in row" :key="index">
          <TableData :value="cell.val" :type="cell.type" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
