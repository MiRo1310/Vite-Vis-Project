<script setup lang='ts'>
import { toLocaleTime } from '@/lib/time';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card';
import Button from '@/components/ui/button/Button.vue';
import { X } from 'lucide-vue-next';
import { useIobrokerStore } from '@/store/iobrokerStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch, ref } from 'vue';
import { adminConnection } from '@/lib/iobroker/connecter-to-iobroker'
import { ShoppingList } from '@/types';
const iobrokerStore = useIobrokerStore();
const { shoppingList } = storeToRefs<any>(iobrokerStore);

onMounted(() => {
  createShoppinglist()
});

const shoppingListData = ref<ShoppingList[]>([])
watch(shoppingList, () => {
  createShoppinglist()
});

const createShoppinglist = () => {
  try {
    if (shoppingList.value !== "" && typeof shoppingList.value === "string")
      shoppingListData.value = JSON.parse(shoppingList.value);
  } catch (error) {
    console.log('error', error);
  }
}

const removeItem = (id: string) => {
  if (adminConnection.value) adminConnection.value.setState(`alexa2.0.Lists.SHOPPING_LIST.items.${id}.#delete`, true)
}
</script>
<template>
  <Card class="h-[90%] overflow-y-auto">
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
        <TableRow v-for="item in shoppingListData" :key="item.name">
          <TableCell class="font-medium">
            {{ item.pos }}
          </TableCell>
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ toLocaleTime(item.time) }} </TableCell>
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
