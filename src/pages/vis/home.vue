<script setup lang="ts">
import NavigationRow from "@/components/section/home/NavigationRow.vue";
import MobileHome from "../../components/section/home/MobileHome.vue";
import TabletDesktopHome from "./TabletDesktopHome.vue";
</script>

<template>
  <div class="h-full flex flex-col gap-2 pb-0">
    <NavigationRow />

    <!-- Hauptgrid -->
    <TabletDesktopHome />

    <div class="sm:hidden block">
      <MobileHome />
    </div>
  </div>
</template>
