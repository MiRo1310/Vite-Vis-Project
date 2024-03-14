<script setup lang='ts'>
import ButtonCard from '@/components/shared/ButtonCard.vue';
import { Blinds, UserRoundSearch } from 'lucide-vue-next';
import { computed } from 'vue';
import { useIobrokerStore } from '@/store/iobrokerStore';
import { useRouter } from 'vue-router';
import { adminConnection } from '@/lib/iobroker-connecter.ts'

const router = useRouter();
const iobrokerStore = useIobrokerStore();
const handleWindowClick = () => {
    router.push({ path: '/fenster' })
}
const handleHolidayClick = () => {
    adminConnection.value?.setState("0_userdata.0.Urlaub.Urlaub_aktiv", !iobrokerStore.urlaubAktiv)
}
const getWindowStyle = computed(() => {
    if (iobrokerStore.fensterOffen) return "text-red-500"
    return "text-green-500"
})
const getHoliday = computed(() => {
    if (iobrokerStore.urlaubAktiv) return "Urlaub"
    return "Kein Urlaub"
})


</script>
<template>
    <ButtonCard :icon="Blinds" :title="'Fenster'" @click="handleWindowClick" :class="getWindowStyle" />
    <ButtonCard :icon="UserRoundSearch" :title="getHoliday" @click="handleHolidayClick" />
</template>
<style lang='postcss' scoped></style>