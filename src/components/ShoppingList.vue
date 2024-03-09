<script setup lang='ts'>
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useIobrokerStore } from '@/store/iobrokerStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch, ref } from 'vue';
const iobrokerStore = useIobrokerStore();
const { shoppingList } = storeToRefs<any>(iobrokerStore);
onMounted(() => {
    shoppingList.value = iobrokerStore.getShoppinglist
  
});

const shoppingListData = ref<ShoppingList[]>([])
watch(shoppingList, (newVal, oldVal) => {
    console.log('shoppingList changed', newVal, oldVal);
    shoppingListData.value = JSON.parse(newVal);
});
</script>
<template>
    <Table v-if="shoppingListData.length !== 0">
        <TableCaption>Einkaufsliste</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead class="w-[100px]">
                    Artikel
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead class="text-right">
                    Amount
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="item in shoppingListData" :key="item.name">
                <TableCell class="font-medium">
                    {{ item.name }}
                </TableCell>
                <TableCell>{{item.time}}</TableCell>
                <TableCell>{{item.buttondelete }}</TableCell>
                <TableCell class="text-right">
                    $250.00
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>
<style lang='postcss' scoped></style>