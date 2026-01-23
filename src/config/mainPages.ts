import { Home, Plane, ScrollText } from "lucide-vue-next";
import { NavigationType } from "@/types/types.ts";
import { routes } from "@/router/routes.ts";

type Navigations = "home" | "navigation" | "lists";

export const mainPages: Record<Navigations, NavigationType> = {
  home: { icon: Home, text: "Home", to: routes.home.path },
  navigation: { icon: Plane, text: "Navigation", to: routes.navigation.path },
  lists: { icon: ScrollText, text: "Listen", to: routes.lists.path },
};
