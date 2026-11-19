import { dataSel } from "../utils.ts";
import { routes } from "@/router/routes.ts";

const add = (productName: string, categoryName: string, unit: string) => {
  cy.visit(routes.products.path);
  cy.getBySel("products-add").click();
  cy.wait("@Units");

  cy.getBySel("product-name").should("exist").type(productName);
  cy.getBySel("product-category").should("exist").click();
  cy.getBySel(`product-category-${categoryName}`).click();
  cy.getBySel("product-nutrients").find(dataSel("input-with-options")).should("exist").type(unit);
  cy.getBySel("btn-submit").click();

  cy.contains("Das Produkt wurde erfolgreich erstellt").should("exist");
  cy.contains(dataSel("product-card"), productName).should("exist");
};

export const productHelper = { add };
