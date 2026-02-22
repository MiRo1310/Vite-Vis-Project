<script setup lang="ts">
import { Content, createJSONEditor, JSONContent, JSONEditorPropsOptional, TextContent } from "vanilla-jsoneditor";
import { onMounted, ref } from "vue";

const props = defineProps<Omit<JSONEditorPropsOptional, "content" | "onChange">>();

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

  createJSONEditor({
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
    target,
  });
});
</script>

<template>
  <div ref="jsonEditorRef" data-component="jsonEditor" />
</template>

<style lang="scss">
.dark .jse-main {
  ::selection {
    color: yellow !important;
  }

  & > div {
    border-color: var(--accent) !important;
  }

  .jse-contents {
    border-color: var(--accent) !important;
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
      border-color: var(--accent) !important;
    }

    &-content {
      background-color: var(--popover) !important;
    }
  }
}
</style>
