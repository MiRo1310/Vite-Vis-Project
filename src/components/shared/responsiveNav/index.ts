import { RouteParamsRawGeneric } from "vue-router";

export interface INavigation {
  label: string;
  routeName?: string;
  params?: RouteParamsRawGeneric;
  externalLink?: boolean;
  href?: string;
  class?: string;
  disabled?: boolean;
}
