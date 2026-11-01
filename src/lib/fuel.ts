import { type TankerkoenigStation } from "@/types/types.ts";

export const getMaxE5Price = (stations: Array<Pick<TankerkoenigStation, "e5">>): number => Math.max(0, ...stations.map((s) => s.e5));
