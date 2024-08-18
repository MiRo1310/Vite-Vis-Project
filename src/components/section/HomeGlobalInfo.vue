<script setup lang='ts'>
import Time from '@/components/section/HomeGlobalInfoTime.vue';
import { storeToRefs } from 'pinia';
import { useIobrokerStore } from "@/store/iobrokerStore";
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';


const iobrokerStore = useIobrokerStore();
const { iobrokerValues: io } = storeToRefs<any>(iobrokerStore);

</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>
        Aussentemperatur {{ io.Aussentemperatur }}°C
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Time />
    </CardContent>
  </Card>
</template>