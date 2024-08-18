<script setup lang='ts'>
import { Button } from '@/components/ui/button';
import { adminConnection } from '@/lib/iobroker/connecterToIobroker';
import { notSubscribedIds } from '@/lib/iobroker/idsNotSubscribed';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})


const handleClick = (i: number) => {
  const arrayOfIds = props.id.split(",").map((id) => id.trim());
  const key = arrayOfIds[0] as keyof typeof notSubscribedIds;
  if (!key) return
  const subKey = arrayOfIds[1] as keyof typeof notSubscribedIds[typeof key]

  if (!subKey && typeof subKey != "string") return
  const id = (notSubscribedIds[key][subKey] as { shutterPosition: string }).shutterPosition;


  if (adminConnection.value)
    adminConnection.value.setState(id, 100 - (i - 1) * 20)
}
</script>
<template>
  <div class=" flex justify-between">
    <Button
      v-for="i in 6"
      :key="i"
      class="mx-1 w-10 h-6 text-xs"
      :size="'sm'"
      @click="handleClick(i)"
    >
      {{ 100 - (i - 1) * 20 }}%
    </Button>
  </div>
</template>
