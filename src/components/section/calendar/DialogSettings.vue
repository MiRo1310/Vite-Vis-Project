<script setup lang="ts">
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { Button } from "@/components/shared/button/button.variants";
import { Plus } from "lucide-vue-next";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import InputComponent from "@/components/section/calendar/InputComponent.vue";
import { computed, ref } from "vue";
import { colors } from "@/config/colors";
import { type SelectOption, type JSONStyle } from "@/types/types.ts";

const open = defineModel<boolean>("open");

const { iobroker } = useIobrokerStore();

const json = computed(() => iobroker.styles.calendarStyle.parsed([]));

const modifiedObj = ref<JSONStyle[] | undefined>(undefined);

function updateHandler(val: { input: string; select: SelectOption; index: number }) {
  if (val.select.class === "" || !val.input || val.input === "") {
    return;
  }

  const jsonCopy = modifiedObj.value ?? [...json.value];
  let jsonCopyElement = jsonCopy[val.index] as JSONStyle | undefined;

  if (!jsonCopyElement && modifiedObj.value) {
    jsonCopyElement = modifiedObj.value[val.index];

    addValueToObj(jsonCopyElement, val);
    return;
  }
  if (jsonCopyElement) {
    addValueToObj(jsonCopyElement, val);
  }
  modifiedObj.value = jsonCopy;
}

function addValueToObj(obj: JSONStyle, val: { input: string; select: SelectOption; index: number }) {
  obj.name = val.input;
  obj.color = val.select.class ?? "";
}

function updateToIobroker() {
  if (!modifiedObj.value) {
    return;
  }

  iobroker.styles.calendarStyle.setState(JSON.stringify(modifiedObj.value));
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
  const jsonCopy = modifiedObj.value ?? ([...json.value] as JSONStyle[]);
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
