import { computed } from "vue";
import { previousRoute } from "@/router/router.ts";

export function usePreviousRoute() {
  return {
    previousRoute: computed(() => previousRoute.value),
    previousPath: computed(() => previousRoute.value?.fullPath ?? null),
    previousName: computed(() => previousRoute.value?.name ?? null),
  };
}
