<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { notSubscribedIds } from "@/subscribeIds/ids-not-subscribed.ts";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const handleClick = (i: number) => {
  const arrayOfIds = props.id.split(",").map((id) => id.trim());
  const key = arrayOfIds[0] as keyof typeof notSubscribedIds;
  if (!key) return;
  const subKey = arrayOfIds[1];

  if (!subKey && typeof subKey != "string") return;
  const id = (
    notSubscribedIds[key][
      subKey as keyof (typeof notSubscribedIds)[typeof key]
    ] as {
      shutterPosition: string;
    }
  ).shutterPosition;

  if (adminConnection) adminConnection.setState(id, 100 - (i - 1) * 20);
};
</script>
<template>
  <div class="flex space-x-1 -ml-1">
    <Button
      v-for="i in 6"
      :key="i"
      class="w-10 h-6 text-xs bg-accent-foreground/10 rounded-none"
      variant="outline"
      :size="'sm'"
      @click="handleClick(i)"
    >
      {{ 100 - (i - 1) * 20 }}%
    </Button>
  </div>
</template>
