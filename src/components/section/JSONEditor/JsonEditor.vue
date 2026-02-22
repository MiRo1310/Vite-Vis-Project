<script setup lang="ts">
import { Content, createJSONEditor, JSONContent, JSONEditorPropsOptional, Mode, TextContent } from "vanilla-jsoneditor";
import { onMounted, ref } from "vue";

const modelValue = defineModel<unknown>("modelValue", { required: false });

const jsonEditorRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  // use a local const so TypeScript can narrow the nullable type
  const target = jsonEditorRef.value as HTMLDivElement | undefined;
  if (!target) {
    // eslint-disable-next-line no-console
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

  const props: JSONEditorPropsOptional = {
    statusBar: false,
    mode: Mode.text,
    mainMenuBar: false,
    navigationBar: false,
    readOnly: false,
  };

  createJSONEditor({
    target,
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
      ...props,
    },
  });
});
</script>

<template>
  <div ref="jsonEditorRef" data-component="jsonEditor" />
</template>

<style lang="scss">
.dark .jse-main {
  & > div {
    border-color: red !important;
  }

  .jse-contents {
    border-color: red !important;
  }

  .cm {
    &-editor {
      //ObjectKey
      .ͼo {
        color: var(--popover-foreground) !important;
      }

      //// ObjectValue string
      //.ͼr {
      //  color: green !important;
      //}

      //// ObjectValue number
      //.ͼp {
      //  color: red !important;
      //}
      //
      //// ObjectValue boolean
      //.ͼq {
      //  color: red !important;
      //}
    }

    &-scroller {
      color: #0074d9 !important;
    }

    &-gutters {
      background-color: var(--popover) !important;
      border-color: red !important;
    }

    &-content {
      background-color: var(--popover) !important;
    }
  }
}
</style>
