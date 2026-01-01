<script setup lang="ts">
import PaginationStatus from "@/components/shared/pagination/PaginationStatus.vue";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

import { computed } from "vue";
import { PaginationList, PaginationListItem } from "radix-vue";

interface PaginationProps {
  autoHidePagination: boolean;
  totalCount: number;
  itemsPerPage: number;
  siblingCount: number;
  activePage: number;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  autoHidePagination: false,
  totalCount: 0,
  itemsPerPage: 20,
  siblingCount: 2,
});

const showPagination = computed(() => {
  if (!props.autoHidePagination) {
    return true;
  }

  if (props.totalCount) {
    return props.totalCount > props.itemsPerPage;
  }
  return false;
});

const emit = defineEmits(["update:activePage"]);

const updateHandler = (page: number) => {
  emit("update:activePage", page);
};
</script>

<template>
  <Pagination
    v-if="showPagination"
    class="mt-4 mr-4"
    :total="totalCount"
    :sibling-count="siblingCount"
    show-edges
    :default-page="activePage"
    :items-per-page="itemsPerPage"
    @update:page="updateHandler($event)"
  >
    <PaginationList
      v-slot="{ items }"
      class="flex items-center justify-end gap-1"
    >
      <PaginationStatus
        :items-per-page="itemsPerPage"
        :actual-page="activePage"
        :total-pages="totalCount || 0"
      />
      <slot />
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === activePage ? 'secondary' : 'outline-solid'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
