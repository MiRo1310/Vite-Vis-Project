<script setup lang="ts">
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import BoolIcon from "@/components/shared/BoolIcon.vue";
import { Entries } from "@/types";

const props = defineProps<{ entries: Entries[]; title: string; class?: string }>();
</script>
<template>
    <Card class="inline-block" :class="[props.class, 'mx-1 mt-2']">
        <CardHeader>
            <CardTitle>{{ title }}</CardTitle>
        </CardHeader>
        <CardContent>
            <div v-for="entry in entries"
                class="flex justify-between items-center text-accent-foreground/50 font-bold text-xs">
                <div>
                    <p>{{ entry.title }}</p>
                </div>
                <div class="ml-4 pb-0">
                    <BoolIcon v-if="entry.type === 'boolean'" :value="entry.value as boolean" />
                    <span v-else>{{ entry.value }} <span>{{ entry.unit }}</span></span>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
