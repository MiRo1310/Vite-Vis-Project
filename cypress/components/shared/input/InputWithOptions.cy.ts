import { InputOption } from "../../../../src/types/types";
import InputWithOptions from "../../../../src/components/shared/input/InputWithOptions.vue";
import { variantsInputWithOptions } from "../../../../src/components/shared/input/input.variants";

const options: InputOption[] = [
  { value: 111, name: "Option 1" },
  { value: 112, name: "Option 2" },
  { value: 113, name: "Option 3" },
  { value: 114, name: "Option 4" },
];

describe("<InputWithOptions />", () => {
  it("Should return all typed values", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: false,
        modelValue: "",
        "onUpdate:modelValue": onUpdate,
      },
    });

    cy.getBySel("input-with-options").as("input");

    cy.get("@input").should("not.have.class", variantsInputWithOptions.success).should("not.have.class", variantsInputWithOptions.destructive);

    cy.get("@input").type("Test");
    cy.get("@updateSpy").should("have.been.calledWith", "Test");

    cy.get("@input").clear();

    cy.get("@input").type("Option 1");
    cy.get("@updateSpy").should("have.been.calledWith", 111);

    cy.get("@input").should("not.have.class", variantsInputWithOptions.success).should("not.have.class", variantsInputWithOptions.destructive);
  });

  it("Should have value from modelValue with non exactOption", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: false,
        modelValue: "Abc",
        "onUpdate:modelValue": onUpdate,
      },
    });
    cy.getBySel("input-with-options").as("input");
    cy.get("@input").should("not.have.class", variantsInputWithOptions.success).should("not.have.class", variantsInputWithOptions.destructive);

    cy.get("@input").should("have.value", "Abc");

    cy.get("@input").should("not.have.class", variantsInputWithOptions.success).should("not.have.class", variantsInputWithOptions.destructive);
  });

  it("Should return name by set option alwaysReturnName and non exactOption", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
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

    cy.get("@input").should("not.have.class", variantsInputWithOptions.success).should("not.have.class", variantsInputWithOptions.destructive);
  });

  it("Should have correct label filter by modelValue with non exactOption", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: false,
        e2e: "input-with-options",
        modelValue: 111,
        "onUpdate:modelValue": onUpdate,
      },
    });
    cy.getBySel("input-with-options").as("input");
    cy.get("@input").should("not.have.class", variantsInputWithOptions.success).should("not.have.class", variantsInputWithOptions.destructive);

    cy.get("@input").should("have.value", "Option 1");

    cy.get("@updateSpy").should("not.have.been.calledWith", "Option 1");
  });

  it("Should return only exact values", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
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
    cy.get("@input").should("have.class", variantsInputWithOptions.destructive);

    cy.get("@input").clear();

    cy.get("@input").type("Option 1");
    cy.get("@updateSpy").should("have.been.calledWith", 111);
    cy.get("@input").should("have.class", variantsInputWithOptions.success);

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
    cy.get("@input").should("have.class", variantsInputWithOptions.destructive);
  });

  it("Should return only exact values, with none case sensitive", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
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

    cy.get("@input").type("option 1");
    cy.get("@updateSpy").should("have.been.calledWith", 111);
    cy.get("@input").should("have.class", variantsInputWithOptions.success);
  });

  it("Should have correct datalist options", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
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

    cy.mountE2E(InputWithOptions as any, {
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
    cy.get("@input").should("have.class", variantsInputWithOptions.success);
  });

  it("Should reset internalValue if modelValue has been reset", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
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
        cy.get("@input").should("have.class", variantsInputWithOptions.success);
      });
    });
  });

  it("Should have no Icon if internalValue is empty", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
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

    cy.get("@input").should("not.have.class", variantsInputWithOptions.success).should("not.have.class", variantsInputWithOptions.destructive);
  });

  it("Should return name by set option alwaysReturnName and exactOption", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
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

    cy.get("@input").should("have.class", variantsInputWithOptions.success);
  });

  it("Should not have X button", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
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
    cy.getBySel("reset").should("not.exist");

    cy.mountE2E(InputWithOptions as any, {
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
    cy.getBySel("reset").should("not.exist");
  });

  it("Should have X button with exactOption", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: true,
        alwaysReturnName: true,
        e2e: "input-with-options",
        modelValue: "test",
        "onUpdate:modelValue": onUpdate,
      },
    });
    // Should not exist because it is not a correct option
    cy.getBySel("reset").should("not.exist");

    cy.getBySel("input-with-options").type("Option 1");

    cy.getBySel("reset").should("exist").click();
    cy.getBySel("reset").should("not.exist");
    cy.get("@updateSpy").should("have.been.calledWith", "");
    cy.getBySel("input-with-options").type("Option 1");
    cy.getBySel("reset").should("exist");
  });

  it("Should have X button with non exactOption", () => {
    const onUpdate = cy.spy().as("updateSpy");

    cy.mountE2E(InputWithOptions as any, {
      props: {
        options,
        optionId: "test-id",
        exactOptionRequired: false,
        alwaysReturnName: true,
        e2e: "input-with-options",
        modelValue: "test",
        "onUpdate:modelValue": onUpdate,
      },
    });
    cy.getBySel("reset").should("exist").click();
    cy.getBySel("reset").should("not.exist");
    cy.get("@updateSpy").should("have.been.calledWith", "");
    cy.getBySel("input-with-options").type("Option 1");
    cy.getBySel("reset").should("exist");
  });

  it("Should find option if option has description", () => {
    const onUpdate = cy.spy().as("updateSpy");
    const optionsWithDescription: InputOption[] = [
      { value: 111, name: "Option 1", description: "Test" },
      { value: 112, name: "Option 2", description: "Test" },
      { value: 113, name: "Option 3", description: "Test" },
      { value: 114, name: "Option 4", description: "Test" },
    ];
    cy.mountE2E(InputWithOptions as any, {
      props: {
        options: optionsWithDescription,
        optionId: "test-id",
        exactOptionRequired: true,
        alwaysReturnName: false,
        e2e: "input-with-options",
        modelValue: 111,
        "onUpdate:modelValue": onUpdate,
      },
    });

    cy.getBySel("input-with-options").should("have.value", "Option 1");
    cy.getBySel("reset").should("exist").click();
    cy.getBySel("input-with-options")
      .parent()
      .find("option")
      .first()
      .invoke("text")
      .then((text) => {
        cy.getBySel("input-with-options").type(text);
        cy.get("@updateSpy").should("have.been.calledWith", 111);
      });
    cy.getBySel("reset").should("exist");
  });
});
