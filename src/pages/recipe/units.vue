<script setup lang="ts">
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { type DatatableColumns, getColumns } from "@/lib/table.ts";
import AddUnit from "@/components/section/recipe/units/AddUnit.vue";
import UnitAction from "@/components/section/recipe/units/UnitAction.vue";
import { type UnitsQuery } from "@/api/gql/graphql.ts";
import { useUnits } from "@/composables/querys/units.ts";
import { Card, CardContent } from "@/components/ui/card";

const { result, loading } = useUnits();

const columns: Array<DatatableColumns<UnitsQuery["units"][number]>> = [
  { source: "name", labelKey: "Name" },
  { source: "id", labelKey: "", type: "component", component: UnitAction },
];
</script>

<template>
  <div class="overflow-y-auto h-full pb-4 space-y-3">
    <p class="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Einheiten</p>
    <Card class="py-0 gap-0">
      <CardContent class="px-3 pt-2 pb-3">
        <div class="mb-3">
          <AddUnit />
        </div>
        <TableBasic :columns="getColumns(columns)" :data="result?.units ?? []" :loading wrapper-class="overflow-visible" />
      </CardContent>
    </Card>
  </div>
</template>
