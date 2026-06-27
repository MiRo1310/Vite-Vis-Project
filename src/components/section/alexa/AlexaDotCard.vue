<script setup lang="ts">
import { DataCard } from "@/components/shared/card";
import { Switch } from "@/components/ui/switch";
import { type AlexaDotAction } from "@/pages/vis/alexa.vue";
import { ref, watch } from "vue";

const props = defineProps<{ dot: AlexaDotAction }>();
const emit = defineEmits<{ update: [source: string, value: boolean | number] }>();

const bell = ref(props.dot.bell ?? false);
const bellVolume = ref(props.dot.bellVolume ?? 40);
const washer = ref(props.dot.washer ?? false);
const washerVolume = ref(props.dot.washerVolume ?? 40);
const tel = ref(props.dot.tel ?? false);
const telVolume = ref(props.dot.telVolume ?? 40);

watch(
  () => props.dot,
  (d) => {
    bell.value = d.bell ?? false;
    bellVolume.value = d.bellVolume ?? 40;
    washer.value = d.washer ?? false;
    washerVolume.value = d.washerVolume ?? 40;
    tel.value = d.tel ?? false;
    telVolume.value = d.telVolume ?? 40;
  },
  { deep: true },
);

function toggle(source: string, current: boolean) {
  emit("update", source, !current);
}

function updateVolume(source: string, val: string | number | undefined) {
  const n = Number(val);
  if (!isNaN(n)) {
    emit("update", source, n);
  }
}
</script>

<template>
  <DataCard :title="dot.name" content-class="space-y-2">
    <div class="flex items-center justify-between gap-2">
      <span class="text-xs text-foreground flex-1">Klingel</span>
      <Switch v-model:checked="bell" @click="toggle('bell', bell)" />
      <input
        v-model.number="bellVolume"
        type="number"
        :step="10"
        :min="0"
        :max="100"
        class="w-14 h-6 rounded-md border border-input bg-transparent text-xs text-center focus:outline-none focus:ring-1 focus:ring-ring"
        @change="updateVolume('bellVolume', bellVolume)"
      />
    </div>
    <div class="flex items-center justify-between gap-2">
      <span class="text-xs text-foreground flex-1">Waschmaschine</span>
      <Switch v-model:checked="washer" @click="toggle('washer', washer)" />
      <input
        v-model.number="washerVolume"
        type="number"
        :step="10"
        :min="0"
        :max="100"
        class="w-14 h-6 rounded-md border border-input bg-transparent text-xs text-center focus:outline-none focus:ring-1 focus:ring-ring"
        @change="updateVolume('washerVolume', washerVolume)"
      />
    </div>
    <div class="flex items-center justify-between gap-2">
      <span class="text-xs text-foreground flex-1">Telefon</span>
      <Switch v-model:checked="tel" @click="toggle('tel', tel)" />
      <input
        v-model.number="telVolume"
        type="number"
        :step="10"
        :min="0"
        :max="100"
        class="w-14 h-6 rounded-md border border-input bg-transparent text-xs text-center focus:outline-none focus:ring-1 focus:ring-ring"
        @change="updateVolume('telVolume', telVolume)"
      />
    </div>
  </DataCard>
</template>
