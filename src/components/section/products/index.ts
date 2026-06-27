import { type LocalProductsByCodeQuery } from "@/api/gql/graphql.ts";

export type TProduct = LocalProductsByCodeQuery["foodFactsProductByCode"] | undefined;
