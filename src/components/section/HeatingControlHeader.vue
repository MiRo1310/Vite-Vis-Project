<script lang="ts" setup>
import { computed, ref } from "vue";
import { useIobrokerStore } from "../../store/iobrokerStore";
import Select from "@/components/shared/select/select.vue";
import { adminConnection } from "@/lib/iobroker/connecter-to-iobroker";

const { heating } = useIobrokerStore();

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

const roomItems = computed((): { val: string; label: string }[] => {
    return heating.heatingControl.usedRoom.val.split(";").map((item: string) => {
        return {
            label: item,
            val: item,
        };
    });
});

const selected = ref(heating.heatingControl.profile.val.toString());
const room = ref(heating.heatingControl.room.val?.toString());

function updateSelected(val: string, id: string) {
    adminConnection.value?.setState(id, val);
}
</script>

<template>
    <div class="header__container">
        <p class="header__label">Aktives Profil</p>
        <Select placeholder="Wähle ein Profil aus" :items="items" v-model:selected="selected"
            class="w-[100px] header__select"
            @update:selected="updateSelected($event, heating.heatingControl.profile.id)" />
        <p class="header__label">Raum:</p>
        <Select placeholder="Wähle einen Raum" :items="roomItems" v-model:selected="room"
            class="w-[150px] header__select"
            @update:selected="updateSelected($event, heating.heatingControl.room.id)" />
    </div>
</template>

<style scoped lang="postcss">
.header__container {
    @apply flex flex-wrap items-center space-x-4 bg-blue-600 absolute top-0 left-0 rounded-t-lg w-full h-12 pl-4;
}

.header__label {
    @apply text-sm font-semibold text-black;
}

.header__select {
    @apply bg-white rounded-lg;
}
</style>
