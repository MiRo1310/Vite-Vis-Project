import {
  BatteryFull,
  Blinds,
  CalendarDays,
  ChartSpline,
  CircleDot,
  Heater,
  Home,
  Info,
  LampCeiling,
  Logs,
  PlugZap,
  ScrollText,
  Utensils,
} from "lucide-vue-next";
import { NavigationType } from "@/types/types.ts";

export const navigations: NavigationType[] = [
  { icon: Home, text: "Home", link: "/" },
  { icon: Blinds, text: "Fenster", link: "/fenster" },
  { icon: ScrollText, text: "Listen", link: "/listen" },

  {
    icon: CalendarDays,
    text: "Kalendar",
    link: "/kalendar",
  },
  {
    icon: BatteryFull,
    text: "Batterie",
    link: "/battery",
  },
  {
    icon: LampCeiling,
    text: "Licht",
    link: "/light",
  },
  {
    icon: CircleDot,
    text: "Alexa",
    link: "/alexa",
  },
  {
    icon: Heater,
    text: "Heizung",
    link: "/heating",
  },
  {
    icon: PlugZap,
    text: "PV",
    link: "/pv",
  },
  {
    icon: Info,
    text: "Iobroker Info",
    link: "/iobroker-info",
  },
  {
    icon: Logs,
    text: "Logs",
    link: "/logs",
  },
  {
    icon: ChartSpline,
    text: "Diagramme",
    link: "/diagrams",
  },
  {
    icon: Utensils,
    text: "Rezepte",
    link: "/rezepte",
  },
];

export const homeNavigation: NavigationType = {
  icon: Home,
  text: "Navigation",
  link: "/index",
};
