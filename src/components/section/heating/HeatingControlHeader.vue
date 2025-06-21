<script lang="ts" setup>
import { computed, ref } from "vue";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import Select, { SelectOption } from "@/components/shared/select/select.vue";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";

const { heatingControl } = useIobrokerStore();

const items = computed((): SelectOption[] => {
  if (!heatingControl.profileText?.val) {
    return [];
  }
  return heatingControl.profileText?.val?.split(";").map((item: string, index: number) => {
    return {
      label: item,
      val: heatingControl.profileValue?.val?.split(";")[index] || "",
    };
  });
});

const roomItems = computed((): { val: string; label: string }[] => {
  if (!heatingControl.usedRoom?.val) {
    return [];
  }
  return heatingControl.usedRoom?.val?.split(";").map((item: string) => {
    return {
      label: item,
      val: item,
    };
  });
});

const selected = ref(heatingControl.profile?.val?.toString());
const room = ref(heatingControl.room?.val?.toString());

function updateSelected(val: string | undefined, id: string | undefined) {
  if (!id) {
    return;
  }
  adminConnection?.setState(id, val);
}
</script>

<template>
  <div class="header__container">
    <div class="mt-1 mx-1 p-1 bg-backgroundHeader flex flex-wrap items-center space-x-4">
      <p class="header__label">Aktives Profil</p>
      <Select
        v-model:selected="selected"
        placeholder="Wähle ein Profil aus"
        :items="items"
        class="w-[100px] header__select"
        @update:selected="updateSelected($event, heatingControl.profile?.id)"
      />
      <p class="header__label">Raum:</p>
      <Select
        v-model:selected="room"
        placeholder="Wähle einen Raum"
        :items="roomItems"
        class="w-[150px] header__select"
        @update:selected="updateSelected($event, heatingControl.room?.id)"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.header__container {
  @apply bg-backgroundColor absolute top-0 left-0  w-full h-12;
}

.header__label {
  @apply text-sm font-semibold text-black;
}

.header__select {
  @apply bg-white;
}
</style>
