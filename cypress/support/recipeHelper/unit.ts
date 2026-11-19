import { routes } from "@/router/routes.ts";
import { dataSel } from "../utils.ts";

const add = (unit: string) => {
  cy.visit(routes.recipeUnits.path);

  cy.wait("@Units");
  cy.getBySel("units-input").type(unit);
  cy.getBySel("units-add").then(($btn) => {
    if ($btn.is(":enabled")) {
      cy.wrap($btn).click();
    }
  });

  cy.contains(dataSel("units-item"), new RegExp(`^\\s*${unit}\\s*$`)).should("exist");
};

export const unitHelper = { add };
