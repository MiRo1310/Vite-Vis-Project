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
  Tractor,
  WavesLadder,
} from "lucide-vue-next";

export type RoutePath = (typeof routes)[keyof typeof routes]["path"];
export type TRoute = (typeof routes)[keyof typeof routes];
export type TNavigationRoute = Extract<TRoute, { text: string; icon: LucideIcon }>;

// addToNavigation: true erzwingt text + icon, sonst Typfehler
type RouteDefinition = { path: string; name: string; hideOnNavigation: true; text?: string; icon?: LucideIcon } | RouteWithIconAndText;

export type RouteWithIconAndText = { path: string; name: string; hideOnNavigation?: false; text: string; icon: LucideIcon };

export const routes = {
  home: { path: "/", name: "home", text: "Home", icon: Home, hideOnNavigation: true },
  navigation: { path: "/navigation", name: "navigation", text: "Navigation", icon: Plane, hideOnNavigation: true },
  airConditioner: { path: "/air-conditioner", name: "airConditioner", text: "Air Conditioner", icon: AirVent },
  alexa: { path: "/alexa", name: "alexa", text: "Alexa", icon: CircleDot },
  battery: { path: "/battery", name: "battery", text: "Batterie", icon: BatteryFull },
  diagrams: { path: "/diagrams", name: "diagrams", text: "Diagramme", icon: ChartSpline },
  lists: { path: "/listen", name: "lists", text: "Listen", icon: ScrollText },
  window: { path: "/fenster", name: "windows", text: "Räume", icon: Blinds },
  heating: { path: "/heating", name: "heating", text: "Heizung", icon: Heater },
  heatingControl: { path: "/heizkoerper-steuerung", name: "heatingControl", text: "Heizkörper Steuerung", icon: SunSnow },
  iobrokerInfo: { path: "/iobroker-info", name: "iobroker-info", text: "Iobroker Info", icon: Info },
  pageDetails: { path: "/page-info", name: "page-info", text: "Seiten Info", icon: Info },
  calender: { path: "/kalender", name: "calender", text: "Kalendar", icon: CalendarDays },
  light: { path: "/light", name: "light", text: "Licht", icon: LampCeiling },
  logs: { path: "/logs", name: "logs", text: "Logs", icon: Logs },
  notifications: { path: "/notifications", name: "notifications", text: "Benachrichtigungen", icon: Logs },
  pv: { path: "/pv", name: "pv", text: "PV", icon: PlugZap },
  heatPump: { path: "/heat-pump", name: "heat-pump", text: "Wärmepumpe", icon: Logs },
  energy: { path: "/energy", name: "energy", text: "Energy", icon: PlugZap },
  tanker_koenig: { path: "/tanker_koenig", name: "tanker-koenig", text: "Tanken", icon: Fuel },
  maps: { path: "/karten", name: "maps", text: "Karten", icon: Navigation },
  recipeApp: { path: "/recipe-app", name: "recipe-app", hideOnNavigation: true },
  recipes: { path: "/rezepte", name: "recipes", text: "Rezepte", icon: Utensils },
  recipeDetails: { path: "/rezepte/:recipeId", name: "recipe-details", hideOnNavigation: true },
  products: { path: "/produkte", name: "products", hideOnNavigation: true },
  recipeUnits: { path: "/einheiten", name: "units", hideOnNavigation: true },
  recipeCategories: { path: "/rezept-kategorien", name: "recipe-categories", hideOnNavigation: true },
  productCategories: { path: "/produkt-kategorien", name: "product-categories", hideOnNavigation: true },
  newRecipe: { path: "/neues_rezepte", name: "new-recipe", hideOnNavigation: true },
  editRecipe: { path: "/rezepte_bearbeiten/:id?", name: "edit-recipe", hideOnNavigation: true },
  finance: { path: "/finance", name: "finance", hideOnNavigation: true },
  addresses: { path: "/adressen", name: "addresses", hideOnNavigation: true },
  description: { path: "/beschreibung", name: "descriptions", hideOnNavigation: true },
  system: { path: "/system", name: "system", text: "System", icon: MonitorCog },
  wattPilot: { path: "/watt-pilot", name: "wattPilot", text: "Wallbox", icon: Plug },
  lawnMover: { path: "/rasenmaeher", name: "lawnMower", text: "Rasenmäher", icon: Tractor },
  pool: { path: "/pool", name: "pool", text: "Pool", icon: WavesLadder },
} as const satisfies Record<string, RouteDefinition>;
