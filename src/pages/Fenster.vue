<script setup lang='ts'>
import FensterCard from '@/components/FensterCard.vue';



const windows: WindowsArray[] = [
    { name: "Fenster Schlafzimmer Fenster", shutter: true },
    { name: "Fenster Schlafzimmer Tür", shutter: true },
    { name: "Fenster Kinderzimmer", shutter: true },
    { name: "Fenster Bad", shutter: true },
    { name: "Fenster Gästezimmer", shutter: true },
    { name: "Fenster Wohnzimmer Ecke", shutter: true },
    { name: "Fenster Wohnzimmer links", shutter: true },
    { name: "Fenster Wohnzimmer mitte", shutter: true },
    { name: "Fenster Wohnzimmer rechts", shutter: true },
    { name: "Fenster Esszimmer", shutter: true },
    { name: "Fenster Küche Tür", shutter: true },
    { name: "Fenster Küche Fenster", shutter: true },

    { name: "Fenster Dachboden rechts", shutter: false },
    { name: "Fenster Dachboden links", shutter: false },
    { name: "Fenster Gäste-WC links", shutter: false },
    { name: "Fenster Gäste-WC rechts", shutter: false },
    { name: "Fenster Flur links", shutter: false },
    { name: "Fenster Flur rechts", shutter: false },
    { name: "Kellertür", shutter: false },
    { name: "Fenster Büro Keller", shutter: false },
]



</script>
<template>
    <div class=" flex flex-wrap">
        <FensterCard v-for="card in windows" :shutter="card.shutter" :key="card.name" />
    </div>
</template>
<style lang='postcss' scoped></style>