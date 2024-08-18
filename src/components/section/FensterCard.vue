<script setup lang='ts'>
import { computed } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FensterButtons from '@/components/section/FensterCardButtons.vue';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import FensterOpenClose from '@/components/section/FensterCardOpenClose.vue';
import { useIobrokerStore } from '@/store/iobrokerStore';
import { storeToRefs } from 'pinia';
import { adminConnection } from '@/lib/iobroker/connecterToIobroker'
import { getID } from '@/lib/utilities'
import windowOpen from '@/assets/window_open.png'
import windowClosed from '@/assets/window_closed.png'
import { blinds100, blinds90, blinds80, blinds0, blinds10, blinds20, blinds30, blinds40, blinds50, blinds60, blinds70 } from '@/assets/index.ts'
import { SubKeyAdditive } from '@/types.ts';
const iobrokerStore = useIobrokerStore();
const { fenster, rolladen, shutterAutoDownTime, idsToControl, shutterAutoUp } = storeToRefs<any>(iobrokerStore)
const props = defineProps({
  shutter: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  id2: {
    type: String,
    required: false,
    default: null
  },
  cl: {
    type: String,
    required: false,
    default: null

  }
})


const getIsWindowOpen = computed(() => {
  const arrayOfIds = props.id.split(',').map(id => id.trim())
  const value = fenster.value?.[arrayOfIds[0]]?.[arrayOfIds[1]]
  if (!value && value != false) {
    return null
  }
  return value
})
const getIsSecondWindowOpen = computed(() => {
  if (!props.id2) return false
  const arrayOfIds = props.id2.split(',').map(id => id.trim())
  const value = fenster.value?.[arrayOfIds[0]]?.[arrayOfIds[1]]
  if (!value && value != false) {
    return null
  }
  return value
})

const getShutterPosition = computed(() => {
  const arrayOfIds = props.id.split(',').map(id => id.trim())
  const value = rolladen.value?.[arrayOfIds[0]]?.[arrayOfIds[1]]
  if (!value && value != 0) {
    return "n/a "
  }
  return value
})

const getAutoCloseDelay = computed(() => {
  const arrayOfIds = props.id.split(',').map(id => id.trim())
  return shutterAutoDownTime.value?.[arrayOfIds[0]]?.[arrayOfIds[1] + 'Delay']
})
const getAutoClose = computed(() => {
  const arrayOfIds = props.id.split(',').map(id => id.trim())
  return shutterAutoDownTime.value?.[arrayOfIds[0]]?.[arrayOfIds[1] + 'Auto']
})
const getAutoOpen = computed(() => {
  const arrayOfIds = props.id.split(',').map(id => id.trim())
  return shutterAutoUp.value?.[arrayOfIds[0]]?.[arrayOfIds[1] + 'AutoUp']
})
const getAutoUpTime = computed(() => {
  const arrayOfIds = props.id.split(',').map(id => id.trim())
  return shutterAutoUp.value?.[arrayOfIds[0]]?.[arrayOfIds[1] + 'AutoUpTime']
})

const getShutterImage = computed(() => {
  const position = getShutterPosition.value
  if (position === 0) {
    return blinds100
  }
  else if (position <= 10) {
    return blinds90
  } else if (position <= 20) {
    return blinds80
  } else if (position <= 30) {
    return blinds70
  } else if (position <= 40) {
    return blinds60
  } else if (position <= 50) {
    return blinds50
  } else if (position <= 60) {
    return blinds40
  } else if (position <= 70) {
    return blinds30
  } else if (position <= 80) {
    return blinds20
  } else if (position <= 90) {
    return blinds10
  } else
    return blinds0
})
const updateHandler = (value: number | string | boolean, type: SubKeyAdditive) => {
  if (adminConnection.value) {
    adminConnection.value.setState(getID(type, props.id, idsToControl), value)
  }
}


</script>
<template>
  <Card
    class="w-[32.5%] m-1 relative"
    :class="`${props.cl}`"
  >
    <CardHeader class="pb-0 pt-2 px-2">
      <CardTitle class="flex ">
        <p>{{ props.title }}</p>
      </CardTitle>
    </CardHeader>
    <CardContent class="px-2 pb-2">
      <div class="flex items-center justify-between">
        <div class=" flex">
          <div>
            <img
              v-show="getIsWindowOpen"
              class="w-8 h-6 mt-1"
              :src="windowOpen"
              alt="FensterAufZu"
            >
            <img
              v-show="!getIsWindowOpen"
              class="w-8 h-6 mt-1"
              :src="windowClosed"
              alt="FensterAufZu"
            >
          </div>
          <div v-if="props.id2">
            <img
              v-show="getIsSecondWindowOpen"
              class="w-8 h-6 mt-1"
              :src="windowOpen"
              alt="FensterAufZu"
            >
            <img
              v-show="!getIsSecondWindowOpen"
              class="w-8 h-6 mt-1"
              :src="windowClosed"
              alt="FensterAufZu"
            >
          </div>
        </div>

        <FensterOpenClose
          v-if="!props.shutter"
          class="text"
          :window-open="props.id2 ? getIsWindowOpen || getIsSecondWindowOpen : getIsWindowOpen"
        />
      </div>
      <div v-if="props.shutter">
        <div class="flex">
          <img
            class="window--img"
            :src="getShutterImage"
            alt="FensterRollade"
          >
          <div class=" w-full">
            <FensterOpenClose
              :window-open="props.id2 ? getIsWindowOpen || getIsSecondWindowOpen : getIsWindowOpen"
              class="text"
            />
            <p
              class="text"
              :class="getShutterPosition === 'n/a ' ? 'text-red-500 animate-bounce' : ''"
            >
              Rollade {{ getShutterPosition }}% offen
            </p>

            <div class="absolute top-2 right-2">
              <div class="flex items-center justify-between ">
                <div class="w-11">
                  <Switch
                    :checked="getAutoClose"
                    @update:checked="updateHandler($event, 'Auto')"
                  />
                  <p class="text-[0.5rem]">
                    Auto runter
                  </p>
                </div>
                <div class="relative">
                  <Input
                    type="number"
                    step="1"
                    class="w-[5.8rem] pr-8"
                    :model-value="getAutoCloseDelay"
                    @update:model-value="updateHandler($event, 'Delay')"
                  />
                  <div class=" absolute text-sm top-2 right-2">
                    min
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2 mt-2">
                <div class="w-11">
                  <Switch
                    :checked="getAutoOpen"
                    @update:checked="updateHandler($event, 'AutoUp')"
                  />
                  <p class=" text-[0.5rem]">
                    Auto hoch
                  </p>
                </div>
                <p>
                  <Input
                    type="time"
                    :model-value="getAutoUpTime"
                    @update:model-value="updateHandler($event, 'AutoUpTime')"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <FensterButtons :id="props.id" />
      </div>
    </CardContent>
  </Card>
</template>

<style lang='postcss' scoped>
.window--img {
  @apply w-8 h-12;
}

.window--img-openClose {
  @apply w-8 h-6 mt-1;
}

.text {
  @apply text-[0.68rem] mt-1 ml-1 font-bold
}
</style>