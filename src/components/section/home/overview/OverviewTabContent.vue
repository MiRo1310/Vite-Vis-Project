<script setup lang="ts">
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/shared/button/button.variants";
import type { RoutePath } from "@/router/routes.ts";

defineProps<{ value: string; to: RoutePath; label: string }>();
</script>

<template>
  <TabsContent :value class="flex-1 min-h-0 overflow-auto space-y-3 max-[600px]:flex-none max-[600px]:overflow-visible">
    <div class="flex justify-end">
      <Button variant="ghost" class="h-auto px-1 py-0 text-xs text-muted-foreground" as-child>
        <RouterLink :to>→ {{ label }} Seite</RouterLink>
      </Button>
    </div>

    <slot />
  </TabsContent>
</template>
