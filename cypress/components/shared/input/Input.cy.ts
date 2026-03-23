import Input from "../../../../src/components/shared/input/Input.vue";

describe("<Input />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mountE2E(Input);
  });

  it("zeigt das Input-Feld an", () => {
    cy.mountE2E(Input);
    cy.get("input").should("exist");
  });

  it("setzt modelValue bei Eingabe", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(Input, {
      props: {
        modelValue: "",
        "onUpdate:modelValue": onUpdate,
        e2e: "input",
      },
    });

    cy.getBySel("input").type("Hallo");

    cy.get("@updateSpy").should("have.been.calledWith", "Hallo");
  });
});
