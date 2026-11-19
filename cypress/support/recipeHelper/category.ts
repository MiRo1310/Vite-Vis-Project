import { routes } from "@/router/routes.ts";
import { dataSel } from "../utils.ts";

const add = (categoryName: string) => {
  cy.visit(routes.productCategories.path);
  cy.wait("@ProductCategories");
  cy.getBySel("product-categories-input").type(categoryName);
  cy.getBySel("product-categories-add").then(($btn) => {
    if ($btn.is(":enabled")) {
      cy.wrap($btn).click();
    }
  });
  cy.contains(dataSel("product-categories-item"), categoryName).should("exist");
};

export const categoryHelper = { add };
