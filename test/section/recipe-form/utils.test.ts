import { describe, it, expect } from "vitest";
import { getElementByPosition } from "../../../src/components/section/recipe-form/utils";
import { RecipeDescriptionCreateOrUpdateDtoInput } from "../../../src/api/gql/graphql";

const extraData = { header: "", text: "", id: "" };

describe("getElementByPosition", () => {
  it("should get undefined on an empty array", () => {
    const array: RecipeDescriptionCreateOrUpdateDtoInput[] = [];
    expect(getElementByPosition(2, array)).toBeUndefined();
  });

  it("should get element", () => {
    const array: RecipeDescriptionCreateOrUpdateDtoInput[] = [
      { position: 1, ...extraData },
      { position: 3, ...extraData },
      { position: 6, header: "", text: "", id: "test" },
      { position: 2, ...extraData },
    ];
    expect(getElementByPosition(6, array)).toStrictEqual({ position: 6, header: "", text: "", id: "test" });
  });
});
