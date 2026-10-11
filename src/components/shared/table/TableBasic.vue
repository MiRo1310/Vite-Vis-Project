<script setup lang="ts" generic="TData extends RowData">
import type { ColumnDef, RowData } from "@tanstack/vue-table";
import { FlexRender, useTable } from "@tanstack/vue-table";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableCell from "@/components/shared/table/TableCell.vue";
import Skeleton from "@/components/shared/skeleton/Skeleton.vue";
import { appTableFeatures, type AppTableFeatures } from "@/lib/table-features";
import { toRef } from "vue";

type CustomColumnDef<TData extends RowData> = ColumnDef<AppTableFeatures, TData, any> & {
  width?: string;
  headerClass?: string;
};
const props = defineProps<{
  columns: Array<CustomColumnDef<TData>>;
  data: TData[];
  class?: string;
  wrapperClass?: string;
  loading: boolean;
}>();

const table = useTable<AppTableFeatures, TData>({
  features: appTableFeatures,
  data: toRef(props, "data"),
  columns: toRef(props, "columns"),
});
</script>
<template>
  <Table :class="props.class" :wrapper-class="props.wrapperClass">
    <TableHeader class="sticky top-0 z-10 bg-card">
      <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <TableHead
          v-for="(header, index) in headerGroup.headers"
          :key="header.id"
          :class="[columns[index].width ? `w-[${columns[index].width}]` : '', columns[index].headerClass]"
        >
          <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="table.getRowModel().rows?.length && !loading">
        <TableRow v-for="row in table.getRowModel().rows" :key="row.id" :data-state="row.getIsSelected() ? 'selected' : undefined">
          <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" size="small">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </TableCell>
        </TableRow>
      </template>
      <template v-else-if="loading">
        <TableRow v-for="i in 10" :key="i">
          <TableCell colspan="100">
            <Skeleton :loading class="h-5 w-full" single-skeleton />
          </TableCell>
        </TableRow>
      </template>
      <template v-else>
        <TableRow>
          <TableCell :col-span="columns.length" class="h-24 text-center"> Keine Ergebnisse. </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>
