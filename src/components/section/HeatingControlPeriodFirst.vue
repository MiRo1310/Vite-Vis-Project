<script lang="ts" setup></script>
<template>
    <div class="w-12 mt-5">
        <p class="mb-1">Per.</p>
        <p class="row" v-for="i in 5">{{ i }}</p>
    </div>
</template>
<style scoped lang="postcss">
.row {
    @apply h-6;
}
</style>
