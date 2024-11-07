<script lang="ts" setup>
import { Input } from "@/components/ui/input";
import Select from "@/components/shared/select/select.vue";
import { useIobrokerStore } from "@/store/iobrokerStore";
import { tempArray } from "@/lib/object";
import { computed } from "vue";

defineProps<{
    day: { val: string; label: string };
}>();
const { heating } = useIobrokerStore();

const profile = computed(() => {
    return heating?.heatingControlProfile;
});
</script>
<template>
    <div>
        <p class="text-center">{{ day.label }}</p>
        <div class="flex">
            <div>
                <p>ab</p>
                <Input v-for="i in 5" :key="i" type="time"
                    :model-value="profile[`${heating.heatingControl.profile.val}.${heating.heatingControl.room.val}.${day.val}.${i}.time` as keyof typeof profile]?.val"
                    class="h-6 shadow-none border-2 border-t-0 border-x-0 rounded-none" />
            </div>
            <div>
                <p>°C</p>
                <Select v-for="i in 5" :key="i" :items="tempArray()"
                    :selected="profile[`${heating.heatingControl.profile.val}.${heating.heatingControl.room.val}.${day.val}.${i}.temp` as keyof typeof profile]?.val?.toString()"
                    class="p-0" placeholder="" />
            </div>
        </div>
    </div>
</template>
<style scoped lang="postcss">
:deep(button[role="combobox"]) {
    @apply h-6 shadow-none border-2 border-t-0 border-x-0 rounded-none min-w-[4rem];
}
</style>
