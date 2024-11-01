<script lang="ts" setup>
import { computed, ref } from "vue";
import { useIobrokerStore } from "../../store/iobrokerStore";
import Select from "@/components/shared/select/select.vue";

const { heating, idsToControl } = useIobrokerStore();

const items = computed((): { val: string; label: string }[] => {
    return heating.heatingControl.profileText.val
        .split(";")
        .map((item: string, index: number) => {
            return {
                label: item,
                val: heating.heatingControl.profileValue.val.split(";")[index],
            };
        });
});
const selected = ref("");
console.log(idsToControl);
// adminConnection.value?.setState();
</script>

<template>
    <Select placeholder="Wähle ein Profil aus" :items="items" :selected="selected" />
</template>
