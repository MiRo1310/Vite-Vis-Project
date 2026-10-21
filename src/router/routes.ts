import {
  AirVent,
  BatteryFull,
  Blinds,
  CalendarDays,
  ChartSpline,
  CircleDot,
  Fuel,
  Heater,
  Home,
  Info,
  LampCeiling,
  Logs,
  MonitorCog,
  Navigation,
  Plane,
  Plug,
  PlugZap,
  ScrollText,
  SunSnow,
  Utensils,
  type LucideIcon,
} from "lucide-vue-next";

export type RoutePath = (typeof routes)[keyof typeof routes]["path"];
export type TRoute = (typeof routes)[keyof typeof routes];
export type TNavigationRoute = Extract<TRoute, { addToNavigation: true }>;

// addToNavigation: true erzwingt text + icon, sonst Typfehler
type RouteDefinition =
  | { path: string; name: string; addToNavigation: true; text: string; icon: LucideIcon }
  | { path: string; name: string; addToNavigation: false; text?: string; icon?: LucideIcon };

export const routes = {
  home: { path: "/", name: "home", text: "Home", icon: Home, addToNavigation: false },
  navigation: { path: "/navigation", name: "navigation", text: "Navigation", icon: Plane, addToNavigation: false },
  airConditioner: { path: "/air-conditioner", name: "airConditioner", text: "Air Conditioner", icon: AirVent, addToNavigation: true },
  alexa: { path: "/alexa", name: "alexa", text: "Alexa", icon: CircleDot, addToNavigation: true },
  battery: { path: "/battery", name: "battery", text: "Batterie", icon: BatteryFull, addToNavigation: true },
  diagrams: { path: "/diagrams", name: "diagrams", text: "Diagramme", icon: ChartSpline, addToNavigation: true },
  lists: { path: "/listen", name: "lists", text: "Listen", icon: ScrollText, addToNavigation: true },
  window: { path: "/fenster", name: "windows", text: "Räume", icon: Blinds, addToNavigation: true },
  heating: { path: "/heating", name: "heating", text: "Heizung", icon: Heater, addToNavigation: true },
  heatingControl: { path: "/heizkoerper-steuerung", name: "heatingControl", text: "Heizkörper Steuerung", icon: SunSnow, addToNavigation: true },
  iobrokerInfo: { path: "/iobroker-info", name: "iobroker-info", text: "Iobroker Info", icon: Info, addToNavigation: true },
  calender: { path: "/kalender", name: "calender", text: "Kalendar", icon: CalendarDays, addToNavigation: true },
  light: { path: "/light", name: "light", text: "Licht", icon: LampCeiling, addToNavigation: true },
  logs: { path: "/logs", name: "logs", text: "Logs", icon: Logs, addToNavigation: true },
  notifications: { path: "/notifications", name: "notifications", text: "Benachrichtigungen", icon: Logs, addToNavigation: true },
  pv: { path: "/pv", name: "pv", text: "PV", icon: PlugZap, addToNavigation: true },
  heatPump: { path: "/heat-pump", name: "heat-pump", text: "Wärmepumpe", icon: Logs, addToNavigation: true },
  energy: { path: "/energy", name: "energy", text: "Energy", icon: PlugZap, addToNavigation: true },
  tanker_koenig: { path: "/tanker_koenig", name: "tanker-koenig", text: "Tanken", icon: Fuel, addToNavigation: true },
  maps: { path: "/karten", name: "maps", text: "Karten", icon: Navigation, addToNavigation: true },
  recipeApp: { path: "/recipe-app", name: "recipe-app", addToNavigation: false },
  recipes: { path: "/rezepte", name: "recipes", text: "Rezepte", icon: Utensils, addToNavigation: true },
  recipeDetails: { path: "/rezepte/:recipeId", name: "recipe-details", addToNavigation: false },
  products: { path: "/produkte", name: "products", addToNavigation: false },
  recipeUnits: { path: "/einheiten", name: "units", addToNavigation: false },
  recipeCategories: { path: "/rezept-kategorien", name: "recipe-categories", addToNavigation: false },
  productCategories: { path: "/produkt-kategorien", name: "product-categories", addToNavigation: false },
  newRecipe: { path: "/neues_rezepte", name: "new-recipe", addToNavigation: false },
  editRecipe: { path: "/rezepte_bearbeiten/:id?", name: "edit-recipe", addToNavigation: false },
  finance: { path: "/finance", name: "finance", addToNavigation: false },
  addresses: { path: "/adressen", name: "addresses", addToNavigation: false },
  description: { path: "/beschreibung", name: "descriptions", addToNavigation: false },
  system: { path: "/system", name: "system", text: "System", icon: MonitorCog, addToNavigation: true },
  wattPilot: { path: "/watt-pilot", name: "wattPilot", text: "Wallbox", icon: Plug, addToNavigation: true },
} as const satisfies Record<string, RouteDefinition>;
