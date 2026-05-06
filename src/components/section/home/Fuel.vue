<script setup lang="ts">
import CardSubcard from "@/components/shared/card/CardSubcard.vue";
import CardSubcardHeader from "@/components/shared/card/CardSubcardHeader.vue";
import TextSeparator from "@/components/shared/text/TextSeparator.vue";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { getValNumber, getValString } from "@/lib/object.ts";
import { routes } from "@/router/routes.ts";
const { tankerKoenig } = useIobrokerStore();
</script>

<template>
  <router-link :to="routes.tanker_koenig.path">
    <CardSubcard class="mt-2">
      <CardSubcardHeader>Günstigster Spritpreis </CardSubcardHeader>
      <TextSeparator />
      <p class="text-[0.7rem]">{{ getValString(tankerKoenig.cheapestName) }}</p>
      <p class="text-[0.7rem]">{{ getValString(tankerKoenig.cheapestFullStreet) }}</p>
      <p>
        Preis Super E5: <span class="text-foreground">{{ getValNumber(tankerKoenig.cheapestPrice) }} €</span>
      </p>
      <p v-if="tankerKoenig.cheapestPrice?.ts">Letzte Aktualisierung: {{ new Date(tankerKoenig.cheapestPrice?.ts)?.toLocaleString() }}</p>
    </CardSubcard>
  </router-link>
</template>
