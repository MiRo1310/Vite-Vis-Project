export const dataSel = (sel: string) => {
  return `[data-e2e='${sel}']`;
};

/**
 *  Assigns an alias to each GraphQL request based on its operationName, so tests can wait for it with cy.wait("@<operationName>")
 * use it like cy.wait("@Addresses");
 */
export const aliasGraphqlOperations = () => {
  cy.intercept("POST", "**", (req) => {
    const operationName = (req.body as { operationName?: string } | undefined)?.operationName;
    if (operationName) {
      req.alias = operationName;
    }
  });
};

export const clickESC = (alias: string) => {
  cy.get(alias).trigger("keydown", { key: "Escape" });
};
