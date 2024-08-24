import { computed } from 'vue'
import { useIobrokerStore } from '@/store/iobrokerStore';
import { storeToRefs } from 'pinia';

const { fenster } = storeToRefs(useIobrokerStore())



export const getWindowInfos = () => {

    const possibleSettings = ["fenster", "tuer", "ecke", "links", "mittig", "rechts", "flurFenster"]

    const getOpenWindows = computed(() => {
        let countedOpenWindows = 0
        const win = fenster.value
        Object.keys(win).forEach(key => {

            possibleSettings.forEach(window => {
                if (win[key as keyof typeof win][window as keyof typeof win[keyof typeof win]]) {
                    countedOpenWindows++
                }

            })

        })
        return countedOpenWindows
    })
    return { getOpenWindows }
}