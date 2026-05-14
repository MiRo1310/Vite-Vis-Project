import { type LatLngTuple } from "leaflet";

export interface Markers {
  coordinates: LatLngTuple;
  tooltip?: string;
}
