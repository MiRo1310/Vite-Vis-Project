<script setup lang='ts'>
import FensterCard from '@/components/FensterCard.vue';
import { computed } from 'vue';
import { useIobrokerStore } from '@/store/iobrokerStore';
import { storeToRefs } from 'pinia';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
const iobrokerStore = useIobrokerStore();
const { fensterOffen, fenster } = storeToRefs<any>(iobrokerStore)

const windows: WindowsObject[] = [
    { name: "Schlafzimmer Fenster", shutter: true, id: "schlafen,fenster" },
    { name: "Schlafzimmer Tür", shutter: true, id: "schlafen,tuer" },
    { name: "Kinderzimmer", shutter: true, id: "kinderzimmer,fenster" },
    { name: "Bad", shutter: true, id: "bad,fenster" },
    { name: "Gästezimmer", shutter: true, id: "gaestezimmer,fenster" },
    { name: "Wohnzimmer Ecke", shutter: true, id: "wohnzimmer,ecke" },
    { name: "Wohnzimmer links", shutter: true, id: "wohnzimmer,links" },
    { name: "Wohnzimmer mitte", shutter: true, id: "wohnzimmer,mittig" },
    { name: "Wohnzimmer rechts", shutter: true, id: "wohnzimmer,rechts" },
    { name: "Esszimmer", shutter: true, id: "esszimmer,links", id2: "esszimmer,rechts" },
    { name: "Küche Tür", shutter: true, id: "kueche,tuer" },
    { name: "Küche Fenster", shutter: true, id: "kueche,fenster" },
    { name: "Abstellraum OG links", shutter: true, id: "abstellraumog,links" },
    { name: "Abstellraum OG rechts", shutter: true, id: "abstellraumog,rechts" },

    { name: "Abstellraum", shutter: false, id: "abstellraum,fenster" },
    { name: "Dachboden rechts", shutter: false, id: "dachboden,rechts" },
    { name: "Dachboden links", shutter: false, id: "dachboden,links" },
    { name: "Gäste-WC links", shutter: false, id: "gaesteWc,links" },
    { name: "Gäste-WC rechts", shutter: false, id: "gaesteWc,rechts" },
    { name: "Flur links", shutter: false, id: "flur,links" },
    { name: "Flur rechts", shutter: false, id: "flur,rechts" },
    { name: "Kellertür", shutter: false, id: "keller,tuer" },
    { name: "Keller Flur", shutter: false, id: "keller,flurFenster" },
    { name: "Büro Keller", shutter: false, id: "buero,fenster" },
]
const possibleWindows = ["fenster", "tuer", "ecke", "links", "mittig", "rechts", "flurFenster"]

const getOpenWindows = computed(() => {
    let countedOpenWindows = 0
    Object.keys(fenster.value).forEach(key => {
        possibleWindows.forEach(window => {
            if (fenster.value[key][window] === true) {
                countedOpenWindows++
            }
        })
        console.log(countedOpenWindows)

    })
    return countedOpenWindows
})

</script>
<template>
    <div class="pt-2 pb-1 pl-1 fixed right-2 left-52 z-10 background">
        <Card>
            <CardHeader class="p-2">
                <CardTitle class=" flex justify-between">
                    <p>Fensterstatus</p>
                    <p v-show="getOpenWindows === 1" class="flex "> Ein Fenster ist
                        <span :class="fensterOffen ? 'text-red-500 animate-pulse' : ''" class="ml-1 ">offen </span>
                    </p>

                    <p v-show="getOpenWindows !== 1"> {{ getOpenWindows ? getOpenWindows : "Alle" }} Fenster sind
                    <p :class="fensterOffen ? 'text-red-500' : ''">{{
                        fensterOffen ?
                            'offen' : 'geschlossen' }}</p>
                    </p>
                    <p>Sonnenuntergang: {{ iobrokerStore.sonnenuntergang }}</p>
                </CardTitle>
            </CardHeader>
        </Card>
    </div>
    <div class=" flex flex-wrap pt-12">
        <FensterCard v-for="card in windows" :shutter="card.shutter" :key="card.name" :title="card.name" :id="card.id"
            :id2="card.id2" />
    </div>
</template>
<style scoped>
.background {
    background-color: #0a1a58;
}
</style>
