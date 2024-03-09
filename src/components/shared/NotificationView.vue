<script setup lang="ts">
import { ref, defineProps, watch, defineEmits, onBeforeUnmount } from 'vue';

const props = defineProps({
    position: {
        type: String,
        default: '',
        validator: (value: string) => {
            return ['top', 'bottom', 'left', 'right'].includes(value)
        }
    },
    duration: {
        type: Number,
        default: 3000
    },
    bgColor: {
        type: String,
        default: 'bg-black'
    },
    color: {
        type: String,
        default: 'text-white'
    },
    show: {
        type: Boolean,
        default: false
    }
})

let element: HTMLElement | null = null
let keyframesOut = {}
let keyframesIn = {}
const floating = ref('top-[-100px]')
const emit = defineEmits(['update:show'])
let positions: Positions

interface Position {
    in: {
        from: string;
        to: string;
    };
    position: string;
    translate: string;
}
interface Positions {
    [key: string]: Position;
}



let options = {
    duration: 2000, // Dauer der Animation in Millisekunden
    iterations: 1, // Anzahl der Wiederholungen der Animation
    easing: 'ease-in-out', // Art der Animation
    fill: 'forwards' // Füllmodus der Animation
};

watch(() => props.show, (val) => {
    console.log(val)
    if (val) {
        element = document.getElementById('notification--card');
        const elementHeight = element?.clientHeight || 0
        const elementWidth = element?.clientWidth || 0

        positions = {
            top: {
                in: { from: `translateY(${-elementHeight - 5}px) translateX(-50%)`, to: 'translateY(8px) translateX(-50%)' },
                position: 'left-[50%]', translate: '-translate-x-1/2'
            },
            bottom: {
                in: { from: `translateY(${window.innerHeight + elementHeight + 5}px) translateX(-50%)`, to: `translateY(${window.innerHeight - elementHeight - 8}px) translateX(-50%)` },
                position: 'left-[50%]', translate: '-translate-x-1/2'
            },
            left: {
                in: { from: `translateX(${-elementWidth - 5}px) translateY(-50%)`, to: `translateX(${8}px) translateY(-50%)` },
                position: 'top-[50%]', translate: '-translate-y-1/2'
            },
            right: {
                in: { from: `translateX(${window.innerWidth + elementWidth + 5}px) translateY(-50%)`, to: `translateX(${window.innerWidth - elementWidth - 8}px) translateY(-50%)` },
                position: 'top-[50%]', translate: '-translate-y-1/2'
            },

        }
        if (props.position) {
            keyframesIn = [
                { transform: `${positions[props.position].in.from}` },
                { transform: `${positions[props.position].in.to}` }
            ];
            keyframesOut = [
                { transform: `${positions[props.position].in.to}` },
                { transform: `${positions[props.position].in.from}` }
            ];
        }

        const classes = ` ${positions[props.position].position} ${positions[props.position].translate} ${props.bgColor}`
        floating.value = classes
        timeout(classes)


        if (element)
            (element as any).animate(keyframesIn, options);
    }
})
let timeout1: number, timeout2: number
onBeforeUnmount(() => {
    clearTimeout(timeout1)
    clearTimeout(timeout2)
})


const timeout = (val: string) => {
    timeout1 = window.setTimeout(() => {
        floating.value = val
        if (element)
            (element as any).animate(keyframesOut, options);
        timeout2 = window.setTimeout(() => {
            emit('update:show', false);
            clearTimeout(timeout2)
        }, 2000)
        clearTimeout(timeout1)
    }, props.duration)
}

</script>

<template>
  <div
    id="notification--card"
    class="z-10 absolute  shadow-md"
    :class="floating"
  >
    <div class="px-4 py-2">
      <slot />
    </div>
  </div>
</template>

<style>
body {
    overflow: hidden;
}
</style>
