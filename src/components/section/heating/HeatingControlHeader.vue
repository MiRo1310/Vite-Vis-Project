<script lang="ts" setup>
import { computed, ref } from "vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import SelectComponent from "@/components/shared/select/SelectComponent.vue";
import { type RoomItems, type SelectOption } from "@/types/types.ts";

const { iobroker } = useIobrokerStore();

const profiles = computed((): SelectOption[] => {
  const heatingControl = iobroker.heatingControl;
  if (!heatingControl.profileText.val) {
    return [];
  }
  return heatingControl.profileText.value.split(";").map((item: string, index: number) => {
    return {
      label: item,
      value: heatingControl.profileValue.value.split(";")[index] || "",
    };
  });
});

const roomItems = computed((): SelectOption[] => {
  const heatingControl = iobroker.heatingControl;
  if (!heatingControl.usedRoom.val) {
    return [];
  }
  return heatingControl.usedRoom.val.split(";").map((item: string) => {
    return {
      label: item,
      value: item,
    };
  });
});

const selected = ref(iobroker.heatingControl.profile.value.toString());
const room = ref(iobroker.heatingControl.room.value.toString());

function updateSelected(val: string | undefined) {
  iobroker.heatingControl.profile.setState(val ?? null);
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <p class="text-sm font-semibold text-popover-foreground">Aktives Profil</p>
    <SelectComponent
      v-model:model-value="selected"
      placeholder="Wähle ein Profil aus"
      :items="profiles"
      class="w-auto"
      @update:model-value="updateSelected($event)"
    />
    <p class="header__label">Raum:</p>
    <SelectComponent
      v-model:model-value="room"
      placeholder="Wähle einen Raum"
      :items="roomItems"
      class="w-auto"
      @update:model-value="iobroker.heatingControl.room.setState(($event as RoomItems) ?? null)"
    />
  </div>
</template>
