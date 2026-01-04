<script setup lang="ts">
import { toLocaleTime } from "@/lib/time.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Button from "../../shared/button/Button.vue";
import { X } from "lucide-vue-next";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { AlexaList } from "@/types/types.ts";

defineProps<{ list: AlexaList[] }>();

const removeItem = (id: string) => {
  if (adminConnection) adminConnection.setState(id, true);
};
</script>
<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-auto"> Pos</TableHead>
        <TableHead>Artikel</TableHead>
        <TableHead>Hinzugefügt</TableHead>
        <TableHead class="text-right" />
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow v-for="item in list" :key="item.name">
        <TableCell class="font-medium">
          {{ item.pos }}
        </TableCell>
        <TableCell>{{ item.name }}</TableCell>
        <TableCell>{{ toLocaleTime(item.time) }}</TableCell>
        <TableCell>
          <Button variant="outline" size="icon" @click="removeItem(item.buttonDeleteId)">
            <X />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
