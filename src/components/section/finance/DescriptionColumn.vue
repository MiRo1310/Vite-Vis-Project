<script setup lang="ts">
import { type DescriptionsQuery } from "@/api/gql/graphql.ts";
import { type ITableColumn } from "@/types/types.ts";
import { onMounted, ref, watch } from "vue";

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<ITableColumn<string, DescriptionsQuery["description"][number]>>();

const column = ref<null | HTMLElement>(null);

function isAnyUnchecked(tr: any) {
  return tr.querySelector(".isValid[data-state='unchecked']") || tr.querySelector(".hasInvoice[data-state='unchecked']");
}

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
      const columns = tr.querySelectorAll(".listing__cell *");

      if (isAnyUnchecked(tr)) {
        setColor(columns, tr, "text-red-300!");
        return;
      }
      colorMapping.forEach(([keyword, color]) => {
        if (value.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())) {
          setColor(columns, tr, color);
          return;
        }
      });
    },
    { immediate: true },
  );
});

const colorMapping = [
  ["fahrtkosten", "text-green-400!"],
  ["rechnung", "text-blue-400!"],
];

const setColor = (columns: NodeListOf<Element> | undefined, _tr: HTMLElement, color: string) => {
  columns?.forEach((col) => {
    if (!(col instanceof HTMLElement)) {
      return;
    }

    col.classList.add(color);
  });
};
</script>

<template>
  <div class="description-colum" ref="column">
    <pre><code class="font-sans text-muted-foreground">{{value}}</code></pre>
  </div>
</template>
