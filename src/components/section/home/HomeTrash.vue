<script setup lang="ts">
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { Trash2 } from "lucide-vue-next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Trash from "@/components/section/home/HomeTrash.vue";
import CardTitle from "@/components/shared/card/CardTitle.vue";

const iobrokerStore = useIobrokerStore();
const { trash } = storeToRefs<any>(iobrokerStore);

const transformDate = (date: number) => {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

interface Trash {
  name: string;
  nextDate: number;
  _color: string;
  timestamp: string;
  daysLeft: number;
}

const trashEvents = ref<Trash[]>([]);

watch(trash, (newVal) => {
  trashEvents.value = JSON.parse(newVal);
});
onMounted(() => {
  const value = iobrokerStore.getTrash;
  if (typeof value === "string") trashEvents.value = JSON.parse(value);
});
const getAnimation = (days: number) => {
  if (days <= 1) return `animate-pulse`;
};

const getColor = (name: string) => {
  if (name === "Papier Tonne") return `bg-trashPapier/50`;
  if (name === "Restmüll Tonne") return `text-black bg-accent-foreground/50`;
  if (name === "Biotonne") return `bg-trashBio/50 `;
  if (name === "Gelbe Tonne") return `bg-trashGelb/50 `;
};

interface Days {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
}

const days: Days = {
  0: "Sonntag",
  1: "Montag",
  2: "Dienstag",
  3: "Mittwoch",
  4: "Donnerstag",
  5: "Freitag",
  6: "Samstag"
};

</script>
<template>
  <Card class="m-2">
    <CardHeader>
      <CardTitle>Müllabfuhr</CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-2 gap-8">
      <div v-for="(event, index) in trashEvents" :key="index">
        <div class="flex justify-between ">
          <p class="text-accent-foreground/40 font-bold">
            {{ event.name }}
          </p>
          <Trash2
            :class="['inline-block mb-3 ml-2 p-1 rounded-md', getColor(event.name), getAnimation(event.daysLeft)]"
          />
        </div>
        <p class="text-xs text-accent-foreground font-bold">
          in {{ event.daysLeft }} Tagen
        </p>
        <p class="text-xs text-accent-foreground/40 font-bold">
          am {{ transformDate(event.nextDate) }}
        </p>
        <p class="text-xs text-accent-foreground/40 font-bold">
          {{ days[new Date(event.nextDate).getDay() as keyof Days]
          }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
```
