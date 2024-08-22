<script setup lang='ts'>
import Time from '@/components/section/HomeCardInfoTime.vue';
import { storeToRefs } from 'pinia';
import { useIobrokerStore } from "@/store/iobrokerStore";
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import CardTitle from '@/components/shared/card/CardTitle.vue';


const iobrokerStore = useIobrokerStore();
const { iobrokerValues: io } = storeToRefs<any>(iobrokerStore);

</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>
        Infos
      </CardTitle>
    </CardHeader>
    <CardContent class="text-xs">
      <Time />
      <p class="mt-4 text-accent-foreground/50 font-bold">Aussentemperatur {{ io.Aussentemperatur }}°C </p>
    </CardContent>
  </Card>
</template>