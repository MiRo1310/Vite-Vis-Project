<script setup lang="ts">
import { toLocaleTime } from "@/lib/time.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/shared/card";
import Button from "../ui/button/Button.vue";
import { X } from "lucide-vue-next";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { AlexaList } from "@/types/types.ts";

defineProps<{ list: AlexaList[] }>();

const removeItem = (id: string) => {
  if (adminConnection) adminConnection.setState(id, true);
};
</script>
<template>
  <Card class="h-[90%] overflow-y-auto bg-white p-2 m-0" styling="light">
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
            <Button variant="outline" class="w-8 h-8 p-0" @click="removeItem(item.buttonDeleteId)">
              <X class="w-4 h-4" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
