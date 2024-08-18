<script setup lang='ts'>
import { useIobrokerStore } from '@/store/iobrokerStore';
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { Trash2 } from 'lucide-vue-next';
import { Card, CardContent } from '@/components/ui/card';

const iobrokerStore = useIobrokerStore();
const { trash } = storeToRefs<any>(iobrokerStore);

const transformDate = (date: number) => {
  const d = new Date(date);
  const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  return `${weekdays[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}`;
}
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
})
onMounted(() => {
  const value = iobrokerStore.getTrash
  if (typeof value === "string") trashEvents.value = JSON.parse(value);
})
const getAnimationBorder = (days: number) => {
  if (days <= 1) return `border-red-500 animate-pulse`;
  if (days <= 3) return `border-yellow-500`;
  return `border-green-500`;
}

const getColor = (name: string) => {
  if (name === "Papier Tonne") return `bg-trashPapier`;
  if (name === "Restmüll Tonne") return `bg-trashRest `;
  if (name === "Biotonne") return `bg-trashBio`;
  if (name === "Gelbe Tonne") return `bg-trashGelb `;
}

</script>
<template>
  <Card>
    <CardContent class="flex py-2 px-1">
      <div v-for="event in trashEvents" :key="event.name" class="flex relative px-1 h-[6.9rem]">
        <div :class="getColor(event.name)" class="px-2 pt-2 pb-12 rounded  ">
          <Trash2 class="h-10 w-12 text-white" />
        </div>
        <div class="top-[3.3rem] absolute text-center w-full pr-2">
          <p class="border-2 rounded-full w-7 h-7 flex justify-center items-center  bg-white ml-auto mr-auto"
            :class="getAnimationBorder(event.daysLeft)">
            {{ event.daysLeft
            }}
          </p>
          <p class="w-auto text-sm text-gray-800 bg-gray-200  m-1 rounded-sm">
            {{ transformDate(event.nextDate) }}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
```
