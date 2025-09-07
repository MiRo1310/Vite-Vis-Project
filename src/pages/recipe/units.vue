<script setup lang="ts">
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { graphql } from "@/api/gql";
import { useQuery } from "@vue/apollo-composable";
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import Header from "@/components/section/header/Header.vue";
import AddUnit from "@/components/section/recipe/Units/AddUnit.vue";
import UnitAction from "@/components/section/recipe/Units/UnitAction.vue";
import { GetUnitsQuery } from "@/api/gql/graphql.ts";

const { result } = useQuery(
  graphql(`
    query GetUnits {
      units {
        name
        id
      }
    }
  `),
);

const columns: DatatableColumns<GetUnitsQuery["units"][number]>[] = [
  { source: "name", labelKey: "Name" },
  { source: "id", labelKey: "ID" },
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
