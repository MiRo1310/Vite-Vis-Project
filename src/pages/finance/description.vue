<script setup lang="ts">
import { DatatableColumns, getColumns } from "@/lib/table.ts";
import { Card } from "@/components/shared/card";
import Navigation from "@/components/section/finance/Navigation.vue";
import TableBasic from "@/components/shared/table/TableBasic.vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import AddDescription from "@/components/section/finance/AddDescription.vue";
import DescriptionAction from "@/components/section/finance/DescriptionAction.vue";
import DescriptionColumn from "@/components/section/finance/DescriptionColumn.vue";
import { DescriptionsQuery } from "@/api/gql/graphql.ts";

const { result } = useQuery(
  graphql(`
    query Descriptions {
      description {
        text
        id
      }
    }
  `),
);

const columns: DatatableColumns<DescriptionsQuery["description"][number]>[] = [
  {
    source: "text",
    labelKey: "Beschreibung",
    type: "component",
    component: DescriptionColumn,
  },
  {
    source: "id",
    labelKey: "Aktionen",
    className: "text-right",
    type: "component",
    component: DescriptionAction,
  },
];
</script>

<template>
  <div class="description">
    <h1 class="description__title">Beschreibungen</h1>
    <Navigation />
    <AddDescription />
    <Card class="p-4">
      <TableBasic :columns="getColumns(columns)" :data="result?.description ?? []" />
    </Card>
  </div>
</template>

<style scoped lang="scss">
.description {
  @apply m-4;

  &__title {
    @apply text-2xl font-bold mb-4;
  }
}
</style>
