<script setup lang="ts">
import Dialog from "@/components/shared/dialog/Dialog.vue";
import { Button } from "@/components/shared/button/";
import { Plus } from "lucide-vue-next";
import { useDynamicSubscribe } from "@/composables/dynamicSubscribe.ts";
import { styles } from "@/subscribeIds/styles.ts";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { stringToJSON } from "@/lib/string.ts";
import InputComponent from "@/pages/InputComponent.vue";
import { computed, ref } from "vue";
import { SelectOption } from "@/components/shared/select/select.vue";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { colors } from "@/config/colors.ts";

const open = defineModel<boolean>("open");

useDynamicSubscribe([styles]);

const { styles: styling } = useIobrokerStore();

const json = computed((): object => stringToJSON(styling?.calendarStyle?.val));
const newInputValue = ref<string>("");
const newInputSelected = ref<string>("");

function updateHandler(val: { input: string, select: SelectOption }) {
  newInputValue.value = val.input as string;
  newInputSelected.value = val.select.class;
}

function updateToIobroker() {
  if (newInputValue.value == "" || newInputSelected.value == "") {
    return;
  }
  const jsonCopy = { ...json.value } as Record<string, any>;
  jsonCopy[newInputValue.value] = newInputSelected.value;
  const id = styling?.calendarStyle?.id;
  if (!id) return;
  adminConnection?.setState(id, JSON.stringify(jsonCopy));
}


</script>
<template>
  <Dialog v-model:open="open" styling="default" class-content="w-3/4 max-w-3/4 max-h-100vh ">
    <template #title>
      Farben
    </template>
    <template #content>
      <Button size="icon">
        <Plus />
      </Button>
      <div v-for="(item,i) in Object.keys(json)" :key="i" class="flex space-x-2">
        <InputComponent
          :input-value="item" :selected="colors.find((i)=> i.class===json[item as keyof typeof json] )"
          @update:inputs="updateHandler($event)"
        />
        <span />
      </div>
    </template>
    <template #footer>
      <Button variant="outline">
        Schließen
      </Button>
      <Button variant="save" @click="updateToIobroker">
        Speichern
      </Button>
    </template>
  </Dialog>
</template>
