import { LocalProductsByCodeQuery } from "@/api/gql/graphql.ts";

export type TProduct = NonNullable<NonNullable<LocalProductsByCodeQuery["localProducts"]>["items"]>[number] | undefined;
