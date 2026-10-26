<script setup lang="ts">
import HomeStatusBar from "@/components/section/home/layout/HomeStatusBar.vue";
import HomeMobile from "../../components/section/home/layout/HomeMobile.vue";
import HomeDesktop from "../../components/section/home/layout/HomeDesktop.vue";
</script>

<template>
  <div class="h-full flex flex-col gap-2 pb-0">
    <HomeStatusBar />

    <!-- Hauptgrid -->
    <HomeDesktop />

    <div class="sm:hidden block">
      <HomeMobile />
    </div>
  </div>
</template>
