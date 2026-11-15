import { type useForm } from "vee-validate";
import { type LocalProductsByCodeQuery } from "@/api/gql/graphql.ts";

export type TProduct = LocalProductsByCodeQuery["foodFactsProductByCode"] | undefined;

/** vee-validate-Formular, wie es an Unterkomponenten des Produktformulars weitergereicht wird */
export type TForm = ReturnType<typeof useForm>;
