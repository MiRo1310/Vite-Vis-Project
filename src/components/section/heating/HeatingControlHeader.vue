<script lang="ts" setup>
import { computed, ref } from "vue";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import Select from "@/components/shared/select/Select.vue";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { RoomItems, SelectOption } from "@/types/types.ts";
import { updateRoomInHeatingControl } from "@/composables/heatingControl.ts";

const { heatingControl } = useIobrokerStore();

const items = computed((): SelectOption[] => {
  if (!heatingControl.profileText?.val) {
    return [];
  }
  return heatingControl.profileText?.val?.split(";").map((item: string, index: number) => {
    return {
      label: item,
      value: heatingControl.profileValue?.val?.split(";")[index] || "",
    };
  });
});

const roomItems = computed((): SelectOption[] => {
  if (!heatingControl.usedRoom?.val) {
    return [];
  }
  return heatingControl.usedRoom?.val?.split(";").map((item: string) => {
    return {
      label: item,
      value: item,
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
  <div class="bg-backgroundColor absolute top-0 left-0 w-full h-12">
    <div class="mt-1 mx-1 p-1 bg-backgroundHeader flex flex-wrap items-center space-x-4">
      <p class="text-sm font-semibold text-popover-foreground">Aktives Profil</p>
      <Select
        v-model:model-value="selected"
        placeholder="Wähle ein Profil aus"
        :items="items"
        class="w-25"
        @update:model-value="updateSelected($event, heatingControl.profile?.id)"
      />
      <p class="header__label">Raum:</p>
      <Select
        v-model:model-value="room"
        placeholder="Wähle einen Raum"
        :items="roomItems"
        class="w-37.5"
        @update:model-value="updateRoomInHeatingControl(($event as RoomItems) ?? null)"
      />
    </div>
  </div>
</template>
