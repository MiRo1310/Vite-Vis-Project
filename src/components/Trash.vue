<script setup lang='ts'>
import { useIobrokerStore } from '@/store/iobrokerStore';
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { Trash2 } from 'lucide-vue-next';

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
    if (days === 1) return `border-red-500 animate-pulse`;
    if (days === 3) return `border-yellow-500`;
    return `border-green-500`;
}

const getColor = (name: string) => {
    if (name === "Papier Tonne") return `text-trashPapier`;
    if (name === "Restmüll Tonne") return `text-trashRest`;
    if (name === "Biotonne") return `text-trashBio`;
    if (name === "Gelbe Tonne") return `text-trashGelb`;
}

</script>
<template>
  <div
    v-for="event in trashEvents"
    :key="event.name"
    class=" mt-2 flex items-end"
  >
    <Trash2
      :class="getColor(event.name)"
      class="h-8 w-8"
    />
    <p
      class="border-2 rounded-full w-7 h-7 flex justify-center items-center ml-2 "
      :class="getAnimationBorder(event.daysLeft)"
    >
      {{ event.daysLeft
      }}
    </p>
    <p class="ml-2">
      {{ transformDate(event.nextDate) }}
    </p>
  </div>
</template>
