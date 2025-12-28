<script setup lang="ts">
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { Trash2 } from "lucide-vue-next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Days, days } from "@/defaultValues/defaultValues.ts";

const iobrokerStore = useIobrokerStore();
const { trash } = storeToRefs(iobrokerStore);

const transformDate = (date: number) => {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

interface TrashType {
  name: string;
  nextDate: number;
  _color: string;
  timestamp: string;
  daysLeft: number;
}

const trashEvents = computed<TrashType[]>(() => {
  if (trash.value.json?.val) {
    return JSON.parse(trash.value.json.val.toString());
  }
  return [];
});

const getAnimation = (days: number) => {
  if (days <= 1) return `animate-pulse`;
};

const getColor = (name: string) => {
  if (name === "Papier Tonne") return `bg-trashPapier/50 text-black`;
  if (name === "Restmüll Tonne") return `text-cardCustom-text/70 bg-black`;
  if (name === "Biotonne") return `bg-trashBio/50 text-black`;
  if (name === "Gelbe Tonne") return `bg-trashGelb/50 text-black`;
};
</script>
<template>
  <Card styling="info">
    <CardHeader>
      <CardTitle>Müllabfuhr</CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-2 gap-2">
      <div v-for="(event, index) in trashEvents" :key="index" class="bg-cardCustom-info p-2 shadow-lg">
        <div class="flex justify-between line">
          <p class="text-cardCustom-text font-bold">
            {{ event.name }}
          </p>
          <Trash2 :class="['inline-block mb-1 ml-2 p-1 rounded-md', getColor(event.name), getAnimation(event.daysLeft)]" />
        </div>
        <p class="text-xs text-cardCustom-text/70 font-bold">in {{ event.daysLeft }} Tagen</p>
        <p class="text-xs text-cardCustom-text/70 font-bold">am {{ transformDate(event.nextDate) }}</p>
        <p class="text-xs text-cardCustom-text/70 font-bold">
          {{ days[new Date(event.nextDate).getDay() as keyof Days] }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
