<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeatingControlConfig from "./HeatingControlConfig.vue";
import HeatingControlPeriod from "./HeatingControlPeriod.vue";
import HeatingControlRoom from "./HeatingControlRoom.vue";
import HeatingControlRoomStatus from "./HeatingControlRoomStatus.vue";
import HeatingControlWindowStatus from "./HeatingControlWindowStatus.vue";
</script>

<template>
  <Tabs default-value="info">
    <TabsList class="mb-3">
      <TabsTrigger value="info">Info</TabsTrigger>
      <TabsTrigger value="einstellungen">Einstellungen</TabsTrigger>
    </TabsList>

    <TabsContent value="info" class="space-y-3">
      <HeatingControlRoomStatus />
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <HeatingControlWindowStatus />
        <HeatingControlRoom class="" />
      </div>
    </TabsContent>

    <TabsContent value="einstellungen" class="space-y-3">
      <HeatingControlConfig />
      <HeatingControlPeriod />
    </TabsContent>
  </Tabs>
</template>
