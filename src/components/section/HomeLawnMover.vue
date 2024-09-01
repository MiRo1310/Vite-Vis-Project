<script setup lang="ts">
import { Card } from '@/components/ui/card';
import CardHeader from '../ui/card/CardHeader.vue';
import { landroidVison } from '@/assets/index.ts';
import CardContent from '../ui/card/CardContent.vue';
import { storeToRefs } from 'pinia';
import { useIobrokerStore } from '@/store/iobrokerStore';
import { computed } from 'vue';
import BoolIcon from '../shared/BoolIcon.vue';

const { landroid } = storeToRefs(useIobrokerStore());

const status = {
    0: "Leerlauf",
    1: "Zuhause",
    2: "Startsequenz",
    3: "Verlässt Zuhause",
    4: "Grenze folgen",
    5: "Sucht Zuhause",
    6: "Sucht Grenze",
    7: "Mäht",
    8: "Angehoben",
    9: "Blockiert",
    10: "Klinge blockiert",
    11: "Debuggen",
    12: "Fährt",
    13: "Digitaler Zaunausbruch",
    30: "Fährt nach Hause",
    31: "Zonentraining",
    32: "Grenzschnitt",
    33: "Sucht Zone",
    34: "Pause",
    100: "Kartentraining (abschließbar)",
    101: "Kartenverarbeitung",
    102: "Firmware-Upgrade",
    103: "Bewegt sich zur Zone",
    104: "Fährt nach Hause",
    105: "Bereit für Training",
    106: "Karten-Download läuft",
    107: "Karten-Upload läuft",
    108: "Kartentraining pausiert",
    109: "Kartentraining (nicht abschließbar)",
    110: "Grenzüberquerung",
    111: "Erkundet Rasen",
    112: "Bewegt sich zum Wiederherstellungspunkt",
    113: "Wartet auf Position",
    114: "Kartentraining (fahren)",
    115: "Kartentraining (Rückwärtsfahren)"
}
const error = {
    0: "Kein Fehler",
    1: "Eingeklemmt",
    2: "Angehoben",
    3: "Draht fehlt",
    4: "Außerhalb des Begrenzungsbereichs",
    5: "Regen",
    6: "Tür schließen, um Rasen zu mähen",
    7: "Tür schließen, um nach Hause zu fahren",
    8: "Klingenmotorfehler",
    9: "Radmotorfehler",
    10: "Zeitüberschreitung bei Eingeklemmt-Fehler",
    11: "Kopfüber",
    12: "Batterie schwach",
    13: "Draht umgekehrt",
    14: "Ladefehler",
    15: "Zeitüberschreitung bei der Haussuche",
    16: "WiFi gesperrt",
    17: "Batterie über Temperatur",
    18: "Dummy-Modell",
    19: "Zeitüberschreitung beim Öffnen des Batteriefachs",
    20: "Drahtsignal nicht synchronisiert",
    100: "Andockfehler an der Ladestation",
    101: "HBI-Fehler",
    102: "OTA-Upgrade-Fehler",
    103: "Kartenfehler",
    104: "Übermäßige Neigung",
    105: "Unzugängliche Zone",
    106: "Unzugängliche Ladestation",
    107: "Kalibrierung erforderlich",
    108: "Unzureichende Sensordaten",
    109: "Trainingsstart nicht erlaubt",
    110: "Kamerafehler",
    111: "Rasenexploration erforderlich",
    112: "Kartierungsexploration fehlgeschlagen",
    113: "RFID-Lesefehler",
    114: "Scheinwerferfehler",
    115: "Ladestation fehlt",
    116: "Blockierung der Klingenhöheneinstellung",
    117: "Nicht unterstützte Klingenhöhe",
    118: "Manuelles Firmware-Upgrade erforderlich",
    119: "Gebietsgrenze überschritten",
    120: "Abdockfehler an der Ladestation"
}
const infos = computed(() => [
    { title: `Akku ${landroid.value.batteryCharging ? " läd" : " ist geladen"}`, value: landroid.value.battery, unit: "%" },
    { title: "Status", value: status[landroid.value.status as keyof typeof status], unit: "" },
    { title: "Edgecut", value: landroid.value.edgecut, unit: "", type: "bool" },
    { title: "Error", value: error[landroid.value.error as keyof typeof error], unit: "" },
    { title: "Gefahren", value: landroid.value.totalDistance, unit: "m" },
    { title: "Messer in Gebrauch", value: landroid.value.totalBladeTime, unit: "min" },

]
);
</script>

<template>
    <Card>
        <CardHeader>
            <div class="flex justify-between">
                <div class="w-12">
                    <img :src="landroidVison">
                </div>
                <div>
                    <p class="text-accent-foreground/50 text-xs font-bold text-right">
                        {{ landroid.online ? 'Online' : 'Offline' }}

                    </p>
                    <p class="text-accent-foreground/50 text-xs font-bold text-right">v.{{ landroid.firmware }}</p>
                </div>
            </div>
        </CardHeader>
        <CardContent class=" text-accent-foreground/50 text-xs font-bold">

            <div v-for="(info, index) in infos"
                :class="{ 'flex justify-between items-center text-accent-foreground/50 font-bold w-full': true, 'mt-2': index > 0 }"
                :key="index">
                <p>{{ info.title }}</p>
                <p class="flex justify-end ml-4 text-right w-[6.5rem]">
                    <BoolIcon v-if="info.type === 'bool'" :value="info.value" class="mr-5" />
                    <span v-else>
                        <span>{{ info.value }}</span>
                        <span class="w-5 inline-block text-left ml-1">{{ info.unit }} </span>
                    </span>

                </p>
            </div>
        </CardContent>
    </Card>
</template>