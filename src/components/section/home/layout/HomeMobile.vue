<script setup lang="ts">
import CalendarPreview from "@/components/section/home/widget/CalendarPreview.vue";
import LastCall from "@/components/section/home/widget/LastCall.vue";
import HomeOverviewTabs from "@/components/section/home/overview/HomeOverviewTabs.vue";
import HomeDeviceStatus from "@/components/section/home/widget/HomeDeviceStatus.vue";
import HomeQuickActions from "@/components/section/home/widget/HomeQuickActions.vue";
import TimerGrid from "@/components/section/home/widget/TimerGrid.vue";
import TrashPickup from "@/components/section/home/widget/TrashPickup.vue";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
</script>

<template>
  <Accordion type="single" collapsible class="w-full" default-value="info">
    <AccordionItem value="info">
      <AccordionTrigger>Informationen</AccordionTrigger>
      <AccordionContent>
        <HomeOverviewTabs />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="info2">
      <AccordionTrigger>Weiter Informationen</AccordionTrigger>
      <AccordionContent>
        <HomeDeviceStatus />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="timer">
      <AccordionTrigger>Timer</AccordionTrigger>
      <AccordionContent>
        <TimerGrid />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="calendar">
      <AccordionTrigger>Kalender</AccordionTrigger>
      <AccordionContent>
        <CalendarPreview />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="caller">
      <AccordionTrigger>Anrufer</AccordionTrigger>
      <AccordionContent>
        <LastCall />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="trash">
      <AccordionTrigger>Müllabfuhr</AccordionTrigger>
      <AccordionContent>
        <TrashPickup />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="lists">
      <AccordionTrigger>Listen</AccordionTrigger>
      <AccordionContent>
        <HomeQuickActions />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
