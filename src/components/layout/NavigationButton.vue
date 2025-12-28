<script setup lang="ts">
import { Card, CardHeader, CardTitle } from "@/components/shared/card";
import { NavigationType } from "@/types/types.ts";
import Badge from "@/components/shared/badge/Badge.vue";

defineProps<{ navigation: NavigationType }>();
</script>

<template>
  <Card styling="blueDark" class="navigation__card">
    <RouterLink :to="navigation.link">
      <CardHeader>
        <CardTitle styling="shadcn">
          <div class="navigation__title-inner">
            <span>{{ navigation.text }}</span>
            <span class="relative">
              <Badge v-if="navigation.badge?.value" :value="navigation.badge.value" :color="navigation.badge.color" class="absolute right-0" />
              <Component :is="navigation.icon" class="navigation__icon" />
            </span>
          </div>
        </CardTitle>
      </CardHeader>
    </RouterLink>
  </Card>
</template>

<style scoped lang="scss">
.navigation {
  &__card {
    @apply col-span-1;

    &:hover {
      @apply bg-cardCustom/70 border-cardCustom-border;
    }
  }

  &__title-inner {
    @apply flex justify-between;
  }

  &__icon-wrapper {
    @apply relative;
  }

  &__icon {
    @apply w-12 h-12;
  }

  &__badge {
    @apply absolute right-0;
  }
}
</style>
