<script setup lang="ts">
import Calendar from "@/components/section/home/Calendar.vue";
import Caller from "@/components/section/home/Caller.vue";
import HomeCenteredTabs from "@/components/section/home/HomeCenteredTabs.vue";
import Info from "@/components/section/home/Info.vue";
import Lists from "@/components/section/home/Lists.vue";
import Timer from "@/components/section/home/Timer.vue";
import Trash from "@/components/section/home/Trash.vue";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
</script>

<template>
  <Accordion type="single" collapsible class="w-full" default-value="info">
    <AccordionItem value="info">
      <AccordionTrigger>Informationen</AccordionTrigger>
      <AccordionContent>
        <HomeCenteredTabs />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="info2">
      <AccordionTrigger>Weiter Informationen</AccordionTrigger>
      <AccordionContent>
        <Info />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="timer">
      <AccordionTrigger>Timer</AccordionTrigger>
      <AccordionContent>
        <Timer />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="calendar">
      <AccordionTrigger>Kalender</AccordionTrigger>
      <AccordionContent>
        <Calendar />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="caller">
      <AccordionTrigger>Anrufer</AccordionTrigger>
      <AccordionContent>
        <Caller />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="trash">
      <AccordionTrigger>Müllabfuhr</AccordionTrigger>
      <AccordionContent>
        <Trash />
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="lists">
      <AccordionTrigger>Listen</AccordionTrigger>
      <AccordionContent>
        <Lists />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
