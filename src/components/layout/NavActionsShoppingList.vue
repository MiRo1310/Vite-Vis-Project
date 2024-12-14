<script setup lang="ts">
import { toLocaleTime } from "@/lib/time.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/shared/card";
import Button from "../ui/button/Button.vue";
import { X } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { adminConnection } from "@/lib/iobroker/connecter-to-iobroker.ts";
import { ShoppingList } from "@/types.ts";
import { stringToJSON } from "@/lib/string.ts";

const iobrokerStore = useIobrokerStore();
const { shoppingList } = storeToRefs<any>(iobrokerStore);

const createShoppinglist = computed((): ShoppingList[] => {
  return stringToJSON(shoppingList.value);
});

const removeItem = (id: string) => {
  if (adminConnection.value) adminConnection.value.setState(`alexa2.0.Lists.SHOPPING_LIST.items.${id}.#delete`, true);
};
</script>
<template>
  <Card class="h-[90%] overflow-y-auto" styling="blue">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-auto">
            Pos
          </TableHead>
          <TableHead>Artikel</TableHead>
          <TableHead>Hinzugefügt</TableHead>
          <TableHead class="text-right" />
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="item in createShoppinglist" :key="item.name">
          <TableCell class="font-medium">
            {{ item.pos }}
          </TableCell>
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ toLocaleTime(item.time) }}</TableCell>
          <TableCell>
            <Button variant="outline" class="w-8 h-8 p-0" @click="removeItem(item.id)">
              <X class="w-4 h-4" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
