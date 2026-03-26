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
import { Button } from "@/components/shared/button";
import { Menu } from "lucide-vue-next";
import { INavigation } from "@/components/shared/responsiveNav/index.ts";
import { useRoute } from "vue-router";

const route = useRoute();

defineProps<{ navigations: INavigation[] }>();
</script>

<template>
  <div class="lg:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" size="icon"> <Menu /> </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56" align="start">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuGroup>
          <template v-for="(navigation, index) in navigations" :key="index">
            <DropdownMenuItem v-if="navigation.externalLink">
              <a :href="navigation.href" target="_blank" :class="navigation.class">
                {{ navigation.label }}
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem v-else
              ><RouterLink :to="{ name: navigation.routeName }" :class="route.name === navigation.routeName ? 'underline text-yellow-500' : ''">{{
                navigation.label
              }}</RouterLink>
            </DropdownMenuItem>
          </template>
          <slot />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div class="hidden lg:flex gap-2 items-center">
    <div v-for="(navigation, index) in navigations" :key="index">
      <RouterLink v-if="!navigation.externalLink" :to="{ name: navigation.routeName }">
        <Button :variant="route.name === navigation.routeName ? 'default' : 'outline'">{{ navigation.label }}</Button>
      </RouterLink>
      <a v-if="navigation.externalLink" :href="navigation.href" target="_blank">
        <Button as="div" variant="outline" :class="navigation.class">
          {{ navigation.label }}
        </Button>
      </a>
    </div>
    <slot />
  </div>
</template>
