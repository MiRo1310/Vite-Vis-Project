import Input from "./Input.vue";
import { vE2E } from "@/directives/directives.ts";

describe("<Input />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Input);
  });

  it("zeigt das Input-Feld an", () => {
    cy.mount(Input);
    cy.get("input").should("exist");
  });

  it("setzt modelValue bei Eingabe", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mount(Input, {
      global: {
        directives: {
          e2e: vE2E,
        },
      },
      props: {
        modelValue: "",
        "onUpdate:modelValue": onUpdate,
        e2e: "input",
      },
    });

    cy.get("input").type("Hallo");

    cy.get("@updateSpy").should("have.been.calledWith", "Hallo");
  });
});
