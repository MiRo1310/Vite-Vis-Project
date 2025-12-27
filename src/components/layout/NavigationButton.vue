<script setup lang="ts">
import { Card, CardHeader, CardTitle } from "@/components/shared/card";
import { NavigationType } from "@/types/types.ts";

defineProps<{ navigation: NavigationType }>();
</script>

<template>
  <Card styling="blueDark" class="navigation__card">
    <RouterLink :to="navigation.link">
      <CardHeader>
        <CardTitle styling="shadcn">
          <div class="navigation__title-inner">
            <span>{{ navigation.text }}</span>
            <Component :is="navigation.icon" class="navigation__icon" />
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
  }

  &__title-inner {
    @apply flex justify-between;
  }

  &__icon {
    @apply w-12 h-12;
  }
}
</style>
