<script setup lang="ts">
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { Button } from "@/components/shared/button";
import { Plus } from "lucide-vue-next";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { styles } from "@/subscribeIds/styles.ts";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import InputComponent from "@/components/section/calendar/InputComponent.vue";
import { computed, ref } from "vue";
import { colors } from "@/config/colors.ts";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { SelectOption } from "@/types/types.ts";
import { toJSON } from "@michaelroling/ts-library";
import { getValString } from "@/lib/object.ts";

const open = defineModel<boolean>("open");

useDynamicSubscribe(styles);

const { styles: styling } = useIobrokerStore();

export interface JSONStyle {
  name: string;
  color: string;
}

const json = computed((): JSONStyle[] => {
  return toJSON<JSONStyle[]>(getValString(styling.calendarStyle)).json ?? [];
});

const modifiedObj = ref<JSONStyle[] | undefined>(undefined);

function updateHandler(val: { input: string; select: SelectOption; index: number }) {
  if (val.select?.class === "" || !val.input || (val?.input as string) === "") {
    return;
  }

  const jsonCopy = modifiedObj.value || ([...json.value] as JSONStyle[]);
  let jsonCopyElement = jsonCopy[val.index];

  if (!jsonCopyElement && modifiedObj.value) {
    jsonCopyElement = modifiedObj.value[val.index];

    addValueToObj(jsonCopyElement, val);
    return;
  }

  addValueToObj(jsonCopyElement, val);
  modifiedObj.value = jsonCopy;
}

function addValueToObj(obj: JSONStyle, val: { input: string; select: SelectOption; index: number }) {
  obj.name = val?.input;
  obj.color = val.select?.class;
}

function updateToIobroker() {
  if (!modifiedObj.value) {
    return;
  }

  const id = styling?.calendarStyle?.id;
  if (!id) {
    return;
  }
  adminConnection?.setState(id, JSON.stringify(modifiedObj.value));
}

function reset() {
  open.value = false;
  modifiedObj.value = undefined;
}

function addNewRow() {
  const jsonCopy = [...json.value] as JSONStyle[];
  jsonCopy.push({ name: "", color: "" });
  modifiedObj.value = jsonCopy;
}

function deleteRow(index: number) {
  const jsonCopy = modifiedObj.value || ([...json.value] as JSONStyle[]);
  jsonCopy.splice(index, 1);
  modifiedObj.value = jsonCopy;
}
</script>
<template>
  <Dialog v-model:open="open" styling="default" class-content="w-3/4 max-w-3/4 h-[60vh] ">
    <template #title> Farben</template>
    <template #content>
      <Button size="icon" @click="addNewRow">
        <Plus />
      </Button>
      <div class="h-80 overflow-auto">
        <div v-for="(item, i) in modifiedObj || json" :key="i" class="flex space-x-2 space-y-0.5">
          <InputComponent
            :input-value="item.name"
            :selected="colors.find((e) => e.class === item.color)"
            :index="i"
            @update:inputs="updateHandler($event)"
            @update:delete="deleteRow"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <Button variant="default" @click="reset"> Schließen</Button>
      <Button variant="outline" @click="updateToIobroker"> Speichern</Button>
    </template>
  </Dialog>
</template>
