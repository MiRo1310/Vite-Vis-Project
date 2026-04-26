<script setup lang="ts">
import { DescriptionsQuery } from "@/api/gql/graphql.ts";
import { ITableColumn } from "@/types/types.ts";
import { onMounted, ref, watch } from "vue";

const props = defineProps<ITableColumn<string, DescriptionsQuery["description"][number]>>();

// textColor removed: wir setzen Farbe per JS direkt wenn nötig
const column = ref<null | HTMLElement>(null);
const coloredRowText = "text-black";
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
        tr?.classList.add("bg-orange-100");

        setColor(columns, tr);
      }

      if (value.toLocaleLowerCase().includes("rechnung")) {
        tr?.classList.add("bg-blue-100");
        setColor(columns, tr);
      }
      const hoverClass = "text-muted-foreground";
      tr.addEventListener("mouseenter", () => {
        columns.forEach((c) => c.classList.add(hoverClass));
        columns.forEach((c) => c.classList.remove(coloredRowText));
      });

      tr.addEventListener("mouseleave", () => {
        columns.forEach((c) => c.classList.remove(hoverClass));
        columns.forEach((c) => c.classList.add(coloredRowText));
      });
    },
    { immediate: true },
  );
});

const setColor = (columns: NodeListOf<Element> | undefined, _tr: HTMLElement) => {
  columns?.forEach((col) => {
    if (!(col instanceof HTMLElement)) {
      return;
    }

    col.classList.remove("text-muted-foreground");
    col.classList.add(coloredRowText);
  });
};
</script>

<template>
  <div class="description-colum" ref="column">
    <pre><code class="font-sans text-muted-foreground">{{value}}</code></pre>
  </div>
</template>
