import { describe, it, expect } from "vitest";
import { getElementByPosition } from "@/components/section/recipe-form/utils.ts";
import { type RecipeDescriptionCreateOrUpdateDtoInput } from "@/api/gql/graphql.ts";

const extraData = { header: "", text: "", id: "" };

describe("getElementByPosition", () => {
  it("returns undefined for an empty array", () => {
    const array: RecipeDescriptionCreateOrUpdateDtoInput[] = [];
    expect(getElementByPosition(2, array)).toBeUndefined();
  });

  it("returns the element at the given position", () => {
    const array: RecipeDescriptionCreateOrUpdateDtoInput[] = [
      { position: 1, ...extraData },
      { position: 3, ...extraData },
      { position: 6, header: "", text: "", id: "test" },
      { position: 2, ...extraData },
    ];
    expect(getElementByPosition(6, array)).toStrictEqual({ position: 6, header: "", text: "", id: "test" });
  });
});
