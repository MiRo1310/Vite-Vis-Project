<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

withDefaults(defineProps<{ styling?: keyof typeof style, showFooter?: boolean }>(), {
  styling: "default",
  showFooter: true
});

const style = {
  default: "",
  blue: "bg-backgroundCards"
};
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <slot name="trigger" />
    </SheetTrigger>
    <SheetContent :class="[style[$props.styling as keyof typeof style]]">
      <SheetHeader>
        <SheetTitle>
          <slot name="title" />
        </SheetTitle>
        <SheetDescription>
          <slot name="description" />
        </SheetDescription>
      </SheetHeader>
      <slot name="content" />
      <SheetFooter v-if="showFooter">
        <SheetClose as-child>
          <Button
            type="submit"
            class="mt-4"
          >
            Close
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>