import { BookOpen, type LucideIcon, Plus, Settings2, ShoppingBasket } from "@lucide/vue";
import { routes } from "@/router/routes.ts";

/** Akzentfarben der Rezept-App, Werte als CSS-Variablen in `assets/css/style.css` (hell + dunkel). */
export const recipeAccents = ["tomato", "mango", "basil", "teal", "berry", "lavender"] as const;

export type RecipeAccent = (typeof recipeAccents)[number];
export type RecipeAccentKey = RecipeAccent | "primary";

export interface RecipeAccentClasses {
  /** Kräftige Fläche, z. B. Icon-Kreis oder aktiver Punkt */
  solid: string;
  /** Pastell- bzw. transparente Fläche mit passendem Text */
  soft: string;
  /** Nur Textfarbe für farbige Schrift auf neutralem Hintergrund */
  text: string;
  /** Rahmenfarbe */
  border: string;
  /** Verlauf für Karten-Köpfe und Hero-Bereiche */
  gradient: string;
  /** Aktiver Zustand für reka-ui-Elemente mit `data-state=active|on|checked` (Tabs, Toggles) */
  active: string;
}

// Klassen müssen als vollständige Strings dastehen, damit Tailwind sie beim Build findet.
export const recipeAccentClasses: Record<RecipeAccentKey, RecipeAccentClasses> = {
  primary: {
    solid: "bg-recipe-primary text-white",
    soft: "bg-recipe-primary-soft text-recipe-primary-fg",
    text: "text-recipe-primary-fg",
    border: "border-recipe-primary/50",
    gradient: "from-recipe-primary/30 via-recipe-mango/15 to-transparent",
    active: "data-[state=active]:bg-recipe-primary-soft data-[state=active]:text-recipe-primary-fg data-[state=on]:bg-recipe-primary-soft data-[state=on]:text-recipe-primary-fg",
  },
  tomato: {
    solid: "bg-recipe-tomato text-white",
    soft: "bg-recipe-tomato-soft text-recipe-tomato-fg",
    text: "text-recipe-tomato-fg",
    border: "border-recipe-tomato/50",
    gradient: "from-recipe-tomato/30 via-recipe-primary/10 to-transparent",
    active: "data-[state=active]:bg-recipe-tomato-soft data-[state=active]:text-recipe-tomato-fg data-[state=on]:bg-recipe-tomato-soft data-[state=on]:text-recipe-tomato-fg",
  },
  mango: {
    solid: "bg-recipe-mango text-black",
    soft: "bg-recipe-mango-soft text-recipe-mango-fg",
    text: "text-recipe-mango-fg",
    border: "border-recipe-mango/50",
    gradient: "from-recipe-mango/35 via-recipe-primary/10 to-transparent",
    active: "data-[state=active]:bg-recipe-mango-soft data-[state=active]:text-recipe-mango-fg data-[state=on]:bg-recipe-mango-soft data-[state=on]:text-recipe-mango-fg",
  },
  basil: {
    solid: "bg-recipe-basil text-white",
    soft: "bg-recipe-basil-soft text-recipe-basil-fg",
    text: "text-recipe-basil-fg",
    border: "border-recipe-basil/50",
    gradient: "from-recipe-basil/30 via-recipe-teal/10 to-transparent",
    active: "data-[state=active]:bg-recipe-basil-soft data-[state=active]:text-recipe-basil-fg data-[state=on]:bg-recipe-basil-soft data-[state=on]:text-recipe-basil-fg",
  },
  teal: {
    solid: "bg-recipe-teal text-white",
    soft: "bg-recipe-teal-soft text-recipe-teal-fg",
    text: "text-recipe-teal-fg",
    border: "border-recipe-teal/50",
    gradient: "from-recipe-teal/30 via-recipe-basil/10 to-transparent",
    active: "data-[state=active]:bg-recipe-teal-soft data-[state=active]:text-recipe-teal-fg data-[state=on]:bg-recipe-teal-soft data-[state=on]:text-recipe-teal-fg",
  },
  berry: {
    solid: "bg-recipe-berry text-white",
    soft: "bg-recipe-berry-soft text-recipe-berry-fg",
    text: "text-recipe-berry-fg",
    border: "border-recipe-berry/50",
    gradient: "from-recipe-berry/30 via-recipe-lavender/10 to-transparent",
    active: "data-[state=active]:bg-recipe-berry-soft data-[state=active]:text-recipe-berry-fg data-[state=on]:bg-recipe-berry-soft data-[state=on]:text-recipe-berry-fg",
  },
  lavender: {
    solid: "bg-recipe-lavender text-white",
    soft: "bg-recipe-lavender-soft text-recipe-lavender-fg",
    text: "text-recipe-lavender-fg",
    border: "border-recipe-lavender/50",
    gradient: "from-recipe-lavender/30 via-recipe-berry/10 to-transparent",
    active: "data-[state=active]:bg-recipe-lavender-soft data-[state=active]:text-recipe-lavender-fg data-[state=on]:bg-recipe-lavender-soft data-[state=on]:text-recipe-lavender-fg",
  },
};

export type Nutrient = "kcal" | "carbs" | "fat" | "protein" | "sugar" | "salt";

/** Feste Farbe je Nährwert – überall gleich (Badges, Balken, Detailansicht). */
export const nutrientAccent: Record<Nutrient, RecipeAccentKey> = {
  kcal: "primary",
  carbs: "mango",
  fat: "berry",
  protein: "basil",
  sugar: "lavender",
  salt: "teal",
};

export const nutrientLabel: Record<Nutrient, string> = {
  kcal: "Kalorien",
  carbs: "Kohlenhydrate",
  fat: "Fett",
  protein: "Protein",
  sugar: "Zucker",
  salt: "Salz",
};

export interface RecipeNavItem {
  label: string;
  routeName: string;
  icon: LucideIcon;
  accent: RecipeAccentKey;
  /** Weitere Routen, bei denen der Eintrag als aktiv gilt (z. B. Detailseite unter „Rezepte“) */
  activeFor: string[];
}

/** Hauptnavigation der Rezept-App – Top-Bar (Desktop) und Bottom-Tab-Bar (Mobil). */
export const recipeNavItems: RecipeNavItem[] = [
  { label: "Rezepte", routeName: routes.recipes.name, icon: BookOpen, accent: "primary", activeFor: [routes.recipeDetails.name] },
  { label: "Neu", routeName: routes.newRecipe.name, icon: Plus, accent: "basil", activeFor: [] },
  { label: "Einkauf", routeName: routes.shoppingList.name, icon: ShoppingBasket, accent: "teal", activeFor: [] },
  { label: "Verwaltung", routeName: routes.recipeManage.name, icon: Settings2, accent: "lavender", activeFor: [] },
];

export type RecipeManageTab = "products" | "units" | "productCategories" | "recipeCategories";

export const recipeManageTabs: Array<{ value: RecipeManageTab; label: string; accent: RecipeAccentKey }> = [
  { value: "products", label: "Produkte", accent: "basil" },
  { value: "units", label: "Einheiten", accent: "teal" },
  { value: "productCategories", label: "Produkt-Kategorien", accent: "mango" },
  { value: "recipeCategories", label: "Rezept-Kategorien", accent: "berry" },
];
