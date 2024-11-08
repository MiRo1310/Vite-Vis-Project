import { subscribeStates, unSubscribeStates } from "@/lib/iobroker/connecter-to-iobroker"
import { onUnmounted, onMounted } from 'vue';
import { IdToSubscribe } from '@/types';

export const useDynamicSubscribe = (states: IdToSubscribe<any>[]) => {
    let subscribedStates: IdToSubscribe<any>[] | null = null
    onMounted(() => {
        subscribeStates(states)

        subscribedStates = states
    }
    )

    onUnmounted(() => {
        console.log("unsubscribe")
        if (subscribedStates) {
            unSubscribeStates(subscribedStates)
        }
    })
}