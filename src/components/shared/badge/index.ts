export interface Badge {
  size?: BadgeSize;
  color?: BadgeColor;
}
type BadgeSize = keyof typeof badgeVariants.size;
type BadgeColor = keyof typeof badgeVariants.color;

export const badgeVariants = {
  size: {
    small: "h-4 min-w-4 px-1 text-2xs font-bold",
    default: "h-5 min-w-5 px-1 text-xs font-bold",
    large: "h-7 min-w-7 px-3 text-base font-bold",
  },
  color: {
    blue: "border-blue-500 bg-blue-200 text-blue-900",
    gray: "border-gray-500 bg-gray-200 text-gray-900",
    green: "border-success bg-success/40 text-white",
    red: "border-destructive bg-destructive/50 text-white",
    yellow: "border-yellow-500 bg-yellow-200 text-yellow-900",
    purple: "border-purple-500 bg-purple-200 text-purple-900",
    pink: "border-pink-500 bg-pink-200 text-pink-900",
    teal: "border-teal-500 bg-teal-200 text-teal-900",
    orange: "border-orange-500 bg-orange-200 text-orange-900",
  },
};
