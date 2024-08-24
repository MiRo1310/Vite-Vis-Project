<script setup lang='ts'>
import CardTitle from '@/components/shared/card/CardTitle.vue';
import { CardHeader } from '@/components/ui/card';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';


</script>
<template>
  <Card class="m-2 ml-0">
    <CardHeader>
      <CardTitle>
        Diagramme
      </CardTitle>
    </CardHeader>
    <CardContent>


      <iframe src="http://192.168.1.4:3000/d-solo/Biuksv-4k/strom?orgId=1&panelId=2" width="750" height="300"
        frameborder="0" />



      <iframe class="mt-4" src="http://192.168.1.4:3000/d-solo/Biuksv-4k/strom?orgId=1&refresh=5s&panelId=13"
        width="750" height="300" frameborder="0" />

    </CardContent>
  </Card>
</template>