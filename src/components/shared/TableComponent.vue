<script setup lang="ts">
import { GlobalObject } from "@/types";
import { ref, defineProps, computed, watch, defineEmits } from "vue";
const props = defineProps({
  tableData: {
    type: Array as () => GlobalObject[],
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: false,
    default: 20,
  },
  page: {
    type: Number,
    required: false,
    default: 1,
  },
  totalItems: {
    type: Number,
    required: false,
    default: 0,
  },
});
const emit = defineEmits(["update:page", "row"]);
interface Header {
  title: string;
  entry: string;
  align: string;
}

const header: Header[] = [
  { title: "Number", entry: "id", align: "text--left" },
  { title: "Name", entry: "produkt", align: "text--left" },
  { title: "Menge", entry: "menge", align: "text--left" },
  { title: "Zeitstempel", entry: "timestamp", align: "text--right" },
];

const page = ref(props.page);
const firstPage = () => {
  page.value = 1;
};
const previousPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};
const nextPage = () => {
  if (page.value < maxpages.value) {
    page.value++;
  }
};
const lastPage = () => {
  page.value = maxpages.value;
};
const maxpages = ref(Math.round(props.totalItems / props.itemsPerPage));
const itemsPerPage = ref(props.itemsPerPage);
const pageItems = computed(() => {
  const end = page.value * itemsPerPage.value > props.totalItems ? props.totalItems : page.value * itemsPerPage.value;
  return `${page.value * itemsPerPage.value - itemsPerPage.value + 1} - ${end}`;
})

watch(page, (newVal) => {
  emit('update:page', newVal);
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(head, index) in header"
          :key="index"
          :class="`${head.align}`"
        >
          {{ head.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index1) in tableData"
        :key="index1"
        @click="$emit('row', index1 + 1)"
      >
        <td
          v-for="(head, index2) in header"
          :key="index2"
          :class="`${head.align}`"
        >
          {{ row[head.entry] }}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="text-right pr-4 py-2 table--pagination">
    <span class="table--page">{{ pageItems }}</span>
    <span> von </span>
    <span>{{ totalItems }}</span>
    <button
      class="table--pagination-item "
      :disabled="page === 1"
      :class="page === 1 ? 'cursor-default' : ''"
      @click="firstPage"
    >
      &lt;&lt;
    </button>
    <button
      class="table--pagination-item "
      :disabled="page === 1"
      :class="page === 1 ? 'cursor-default' : ''"
      @click="previousPage"
    >
      &lt;
    </button>
    <button
      class="table--pagination-item "
      :disabled="page === maxpages"
      :class="page === maxpages ? 'cursor-default' : ''"
      @click="nextPage"
    >
      &gt;
    </button>
    <button
      class="table--pagination-item "
      :disabled="page === maxpages"
      :class="page === maxpages ? 'cursor-default' : ''"
      @click="lastPage"
    >
      &gt;&gt;
    </button>
  </div>
</template>

<style lang="postcss">
.text--center {
  @apply text-center;
}

.text--right {
  @apply text-right;
}

.text--left {
  @apply text-left;
}

table {
  @apply w-full;
}

thead tr:first-child {
  @apply bg-[--neutral-90];
}

th,
td {
  @apply px-4 py-2;
}

th {
  @apply text-xl;
}

tbody tr {
  @apply border border-b w-full cursor-pointer hover:bg-gray-100;
}


td {
  @apply text-lg;
}

.table--pagination {
  @apply bg-[--neutral-90];
}

.table--pagination-item {
  @apply text-lg mx-4;
}
</style>../../helper/data