<script setup lang="ts">
import { DescriptionsQuery } from "@/api/gql/graphql.ts";
import { ITableColumn } from "@/types/types.ts";
import { onMounted, ref, watch } from "vue";

const props = defineProps<ITableColumn<string, DescriptionsQuery["description"][number]>>();

const column = ref<null | HTMLElement>(null);

onMounted(() => {
  watch(
    () => props.value,
    (value) => {
      if (!column.value) {
        return;
      }
      const tr = column.value.closest("tr");
      if (!tr) {
        return;
      }
      const columns = tr.querySelectorAll(".text-muted-foreground, [data-type='number'], button");

      if (value.toLocaleLowerCase().includes("fahrtkosten")) {
        setColor(columns, tr, "text-orange-400");
      }

      if (value.toLocaleLowerCase().includes("rechnung")) {
        setColor(columns, tr, "text-blue-400");
      }
    },
    { immediate: true },
  );
});

const setColor = (columns: NodeListOf<Element> | undefined, _tr: HTMLElement, color: string) => {
  columns?.forEach((col) => {
    if (!(col instanceof HTMLElement)) {
      return;
    }

    col.classList.remove("text-muted-foreground");
    col.classList.add(color);
  });
};
</script>

<template>
  <div class="description-colum" ref="column">
    <pre><code class="font-sans text-muted-foreground">{{value}}</code></pre>
  </div>
</template>
