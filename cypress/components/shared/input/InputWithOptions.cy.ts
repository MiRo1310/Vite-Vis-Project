import { InputOption } from "../../../../src/types/types";
import InputWithOptions from "../../../../src/components/shared/input/InputWithOptions.vue";
const options: InputOption[] = [
  { value: 111, name: "Option 1" },
  { value: 112, name: "Option 2" },
  { value: 113, name: "Option 3" },
  { value: 114, name: "Option 4" },
];

describe("<InputWithOptions />", () => {
  it("Should return all typed values", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: false,
        e2e: "input-with-options",
        modelValue: "",
        "onUpdate:modelValue": onUpdate,
      },
    });

    cy.getBySel("state-icon").should("not.exist");

    cy.getBySel("input-with-options").as("input");

    cy.get("@input").type("Test");
    cy.get("@updateSpy").should("have.been.calledWith", "Test");

    cy.get("@input").clear();

    cy.get("@input").type("Option 1");
    cy.get("@updateSpy").should("have.been.calledWith", 111);

    cy.getBySel("state-icon").should("not.exist");
  });

  it("Should have value from modelValue with non exactOption", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: false,
        e2e: "input-with-options",
        modelValue: "Abc",
        "onUpdate:modelValue": onUpdate,
      },
    });

    cy.getBySel("state-icon").should("not.exist");

    cy.getBySel("input-with-options").should("have.value", "Abc");

    cy.getBySel("state-icon").should("not.exist");
  });

  it("Should return name by set option alwaysReturnName and non exactOption", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: false,
        alwaysReturnName: true,
        e2e: "input-with-options",
        modelValue: "",
        "onUpdate:modelValue": onUpdate,
      },
    });
    cy.getBySel("input-with-options").as("input");
    cy.get("@input").type("Option 1");

    cy.getBySel("input-with-options").should("have.value", "Option 1");

    cy.getBySel("state-icon").should("not.exist");
  });

  it("Should have correct label filter by modelValue with non exactOption", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: false,
        e2e: "input-with-options",
        modelValue: 111,
        "onUpdate:modelValue": onUpdate,
      },
    });

    cy.getBySel("state-icon").should("not.exist");

    cy.getBySel("input-with-options").should("have.value", "Option 1");

    cy.get("@updateSpy").should("not.have.been.calledWith", "Option 1");
  });

  it("Should return only exact values", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: true,
        e2e: "input-with-options",
        modelValue: "",
        "onUpdate:modelValue": onUpdate,
      },
    });

    cy.getBySel("input-with-options").as("input");

    cy.get("@input").type("Test");
    cy.get("@updateSpy").should("not.have.been.calledWith", "Test");
    cy.getBySel("state-icon-x").should("exist");

    cy.get("@input").clear();

    cy.get("@input").type("Option 1");
    cy.get("@updateSpy").should("have.been.calledWith", 111);
    cy.getBySel("state-icon-x").should("not.exist");
    cy.getBySel("state-icon-check").should("exist");

    cy.get("@input").clear();

    cy.get("@input").type("Option 4");
    cy.get("@updateSpy").should("have.been.calledWith", 114);

    cy.get("@input").clear();

    cy.get("@input").type("Option 45");
    cy.get("@updateSpy").should("have.been.calledWith", 114);
    cy.get("@input").should("have.value", "Option 4");

    cy.get("@input").clear();

    cy.get("@input").type("Option");
    cy.get("@updateSpy").should("not.have.been.calledWith", "Option");
    cy.getBySel("state-icon-x").should("exist");
  });

  it("Should have correct datalist options", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: true,
        e2e: "input-with-options",
        modelValue: 111,
        "onUpdate:modelValue": onUpdate,
      },
    });

    cy.getBySel("input-with-options").as("input");

    cy.get("@input").should("have.value", "Option 1");
  });

  it("Should set the correct label from options", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: true,
        e2e: "input-with-options",
        modelValue: 111,
        "onUpdate:modelValue": onUpdate,
      },
    });

    cy.getBySel("input-with-options").as("input");
    cy.get("@input").should("have.value", "Option 1");
    cy.getBySel("state-icon-x").should("not.exist");
  });

  it("Should reset internalValue if modelValue has been reset", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: true,
        e2e: "input-with-options",
        modelValue: "",
        "onUpdate:modelValue": onUpdate,
      },
    }).then(({ wrapper }) => {
      cy.getBySel("input-with-options").as("input");

      wrapper.setProps({ modelValue: "" }).then(() => {
        cy.get("@input").should("have.value", "");
        cy.getBySel("state-icon-x").should("exist");
      });
    });
  });

  it("Should have no Icon if internalValue is empty", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: true,
        e2e: "input-with-options",
        modelValue: "",
        "onUpdate:modelValue": onUpdate,
      },
    });
    cy.getBySel("input-with-options").as("input");

    cy.getBySel("state-icon").should("not.exist");
  });

  it("Should return name by set option alwaysReturnName and exactOption", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: true,
        alwaysReturnName: true,
        e2e: "input-with-options",
        modelValue: "",
        "onUpdate:modelValue": onUpdate,
      },
    });
    cy.getBySel("input-with-options").as("input");
    cy.get("@input").type("Option 1");

    cy.getBySel("input-with-options").should("have.value", "Option 1");

    cy.getBySel("state-icon").should("exist");
  });
});
