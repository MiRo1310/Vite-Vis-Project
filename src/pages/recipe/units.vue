<script setup lang="ts">
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import Header from "@/components/section/header/Header.vue";
import AddUnit from "@/components/section/recipe/units/AddUnit.vue";
import UnitAction from "@/components/section/recipe/units/UnitAction.vue";
import { UnitsQuery } from "@/api/gql/graphql.ts";
import { useUnits } from "@/composables/querys/units.ts";

const { result } = useUnits();

const columns: DatatableColumns<UnitsQuery["units"][number]>[] = [
  { source: "name", labelKey: "Name" },
  { source: "id", labelKey: "", type: "component", component: UnitAction },
];
</script>

<template>
  <Header title="Einheiten" />
  <div class="px-2">
    <AddUnit :units="result?.units ?? []" />
    <TableBasic :columns="getColumns(columns)" :data="result?.units ?? []" />
  </div>
</template>
