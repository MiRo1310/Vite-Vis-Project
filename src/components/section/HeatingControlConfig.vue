<script lang="ts" setup>
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { useIobrokerStore } from "@/store/iobrokerStore";

const { heating } = useIobrokerStore();
</script>
<template>
    <div class="flex items-center space-x-4">
        <Checkbox :checked="true" />
        <p>Heizperiode aktiv</p>
        <p>Gäste Anhebung</p>
        <Select />
    </div>
</template>
