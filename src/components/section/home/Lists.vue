<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import NavActionsShoppingCard from "@/components/section/home/NavActionsShopping.vue";
import NavActionsMichaelsTodos from "@/components/section/home/NavActionsMichaelsTodos.vue";
import { UserRoundSearch } from "lucide-vue-next";
import ButtonCard from "@/components/shared/ButtonCard.vue";
import { adminConnection } from "@/lib/connecter-to-iobroker.ts";
import { computed } from "vue";
import { useIobrokerStore } from "@/store/iobrokerStore.ts";
import { Button } from "@/components/shared/button";

const iobrokerStore = useIobrokerStore();

const handleHolidayClick = () => {
  adminConnection?.setState("0_userdata.0.Urlaub.Urlaub_aktiv", !iobrokerStore.holiday.urlaubAktiv);
};

const getHoliday = computed(() => {
  if (iobrokerStore.holiday.urlaubAktiv) return "Urlaub";
  return "Kein Urlaub";
});
</script>

<template>
  <Card color="primary" styling="small">
    <CardHeader>
      <CardTitle>Listen</CardTitle>
    </CardHeader>
    <CardContent class="text-xs">
      <CardSubcard class="mt-2">
        <NavActionsShoppingCard />
        <NavActionsMichaelsTodos />
        <Button class="text-accent-foreground/70" class-card=" ml-1" @click="handleHolidayClick"><UserRoundSearch /> {{ getHoliday }}</Button>
      </CardSubcard>
    </CardContent>
  </Card>
</template>
