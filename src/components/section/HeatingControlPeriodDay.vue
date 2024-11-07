<script lang="ts" setup>
import { Input } from "@/components/ui/input";
import Select from "@/components/shared/select/select.vue";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { tempArray } from "@/lib/object";
import { computed } from "vue";
import { adminConnection } from "@/lib/iobroker/connecter-to-iobroker";

defineProps<{
    day: { val: string; label: string };
}>();
const { heating } = useIobrokerStore();

const profile = computed(() => {
    return heating?.heatingControlProfile;
});

function updateData(id: string, value: string) {
    adminConnection.value?.setState(id, { val: value, ack: false });
}
</script>
<template>
    <div>
        <p class="day__label">{{ day.label }}</p>
        <div class="day__container">
            <div>
                <p>ab</p>
                <Input v-for="i in 5" :key="i" type="time"
                    :model-value="profile[`${day.val}.${i}.time` as keyof typeof profile]?.val" class="day__input"
                    @update:model-value="updateData(profile[`${day.val}.${i}.time` as keyof typeof profile]?.id, $event.toString())" />
            </div>
            <div>
                <p>°C</p>
                <Select v-for="i in 5" :key="i" :items="tempArray()"
                    :selected="profile[`${day.val}.${i}.temp` as keyof typeof profile]?.val?.toString()" class="p-0"
                    @update:selected="updateData(profile[`${day.val}.${i}.temp` as keyof typeof profile]?.id, $event.toString())" />
            </div>
        </div>
    </div>
</template>
<style scoped lang="postcss">
.day__label {
    @apply text-center;
}

.day__container {
    @apply flex;
}

:deep(button[role="combobox"]) {
    @apply h-6 shadow-none border-2 border-t-0 border-x-0 rounded-none min-w-[4rem];
}

.day__input {
    @apply h-6 shadow-none border-2 border-t-0 border-x-0 rounded-none;
}
</style>
