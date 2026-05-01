<script setup lang="ts">
import EnergyFlowCard from "@/components/shared/energy-flow/EnergyFlowCard.vue";
import AnimatedLine from "@/components/shared/energy-flow/AnimatedLine.vue";
import AnimatedLine2 from "@/components/shared/energy-flow/AnimatedLine2.vue";
</script>

<template>
  <div class="grid grid-cols-4 gap-4 relative">
    <EnergyFlowCard />
    <EnergyFlowCard />
    <EnergyFlowCard />
    <EnergyFlowCard />
    <EnergyFlowCard />
    <EnergyFlowCard />
    <EnergyFlowCard />
    <AnimatedLine :start="{ x: 100, y: 100 }" :end="{ x: 1000, y: 400 }" :duration="100" color="green" :width="1500" :height="500" />
    <animated-line2
      :points="[
        { x: 100, y: 100 },
        { x: 1000, y: 400 },
      ]"
    />
    <AnimatedLine2
      :points="[
        { x: 0, y: 0 },
        { x: 120, y: 0 },
        { x: 120, y: 100 },
        { x: 260, y: 100 },
      ]"
      animation="dots"
      reverse
      :duration="20"
      flow-color="#60a5fa"
      track-color="#1e293b"
    />
  </div>
</template>
