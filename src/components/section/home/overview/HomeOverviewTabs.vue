<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PvTab from "./PvTab.vue";
import EnergyTab from "./EnergyTab.vue";
import HeatingTab from "./HeatingTab.vue";
import PoolTab from "./PoolTab.vue";
import SystemTab from "./SystemTab.vue";
</script>

<template>
  <Tabs default-value="pv" class="h-full flex flex-col max-[600px]:h-auto">
    <TabsList class="shrink-0 w-full">
      <TabsTrigger value="pv" class="flex-1 text-[11px] px-1">PV</TabsTrigger>
      <TabsTrigger value="energy" class="flex-1 text-[11px] px-1">Energie</TabsTrigger>
      <TabsTrigger value="heizung" class="flex-1 text-[11px] px-1">Heizung</TabsTrigger>
      <TabsTrigger value="pool" class="flex-1 text-[11px] px-1">Pool</TabsTrigger>
      <TabsTrigger value="system" class="flex-1 text-[11px] px-1">System</TabsTrigger>
    </TabsList>

    <PvTab value="pv" />
    <EnergyTab value="energy" />
    <HeatingTab value="heizung" />
    <PoolTab value="pool" />
    <SystemTab value="system" />
  </Tabs>
</template>
