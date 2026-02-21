<script setup lang="ts">
import { Content, createJSONEditor, JSONContent, TextContent } from "vanilla-jsoneditor";
import { onMounted, ref } from "vue";

const modelValue = defineModel<unknown>("modelValue", { required: false });

const jsonEditorRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!jsonEditorRef.value) {
    console.error("Target element for JSON Editor not found");
    return;
  }

  let content: { text?: TextContent["text"]; json?: JSONContent["json"] } = {
    text: undefined,
    json: undefined,
  };

  if (!modelValue.value) {
    content.text = "";
  }

  if (typeof modelValue.value === "string") {
    content.text = modelValue.value;
  } else {
    content.json = modelValue.value;
  }

  createJSONEditor({
    target: jsonEditorRef.value,
    props: {
      content,
      onChange: (updatedContent: Content) => {
        content = updatedContent;
        const isText = "text" in updatedContent;
        const isJson = "json" in updatedContent;
        const text = isText ? updatedContent.text : undefined;
        const json = isJson ? updatedContent.json : undefined;
        modelValue.value = text ?? json;
      },
    },
  });
});
</script>

<template>
  <div ref="jsonEditorRef" />
</template>
