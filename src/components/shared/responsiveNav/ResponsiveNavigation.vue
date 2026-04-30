<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/shared/button/button.variants";
import { Menu } from "lucide-vue-next";
import { INavigation } from "@/components/shared/responsiveNav/index.ts";
import { useRoute } from "vue-router";

const route = useRoute();

defineProps<{ navigations: INavigation[] }>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon">
        <Menu />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-auto" align="start">
      <DropdownMenuLabel>Navigation</DropdownMenuLabel>
      <DropdownMenuGroup class="grid lg:grid-cols-3 grid-cols-1 gap-2 lg:mx-2">
        <template v-for="(nav, index) in navigations" :key="index">
          <DropdownMenuItem class="lg:w-auto lg:h-20 lg:bg-accent lg:text-center lg:text-lg">
            <a v-if="nav.externalLink" :href="nav.href" target="_blank" :class="[nav.class, 'lg:text-center text-lg w-full']">
              <Button variant="ghost" as="div">{{ nav.label }}</Button>
            </a>
            <RouterLink
              v-else
              :to="{ name: nav.routeName, params: { ...nav.params } }"
              :class="['w-full', route.name === nav.routeName ? 'underline text-yellow-500' : '']"
            >
              <Button :disabled="nav.disabled" variant="ghost">
                {{ nav.label }}
              </Button>
            </RouterLink>
          </DropdownMenuItem>
        </template>
        <slot />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
