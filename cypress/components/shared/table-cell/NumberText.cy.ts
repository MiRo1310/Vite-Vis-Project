import NumberText from "@/components/shared/table-cell/NumberText.vue";

describe("<NumberText />", () => {
  it("zeigt den Wert im deutschen Format mit der übergebenen Einheit", () => {
    cy.mount(NumberText, { props: { value: 12.5, unit: "g" } });
    cy.get("p").should("have.text", "12,5 g");
  });

  it("formatiert auch Zahlen als String", () => {
    cy.mount(NumberText, { props: { value: "49.12", unit: "°C" } });
    cy.get("p").should("have.text", "49,12 °C");
  });

  it("zeigt die Einheit auch beim Wert 0", () => {
    cy.mount(NumberText, { props: { value: 0, unit: "€" } });
    cy.get("p").should("have.text", "0,00 €");
  });
});
