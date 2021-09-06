describe("Form input", () => {
  beforeEach(() => {
    cy.seedAndVisit('emptyArray')
  });
  it("Focus the input on load", () => {
    cy.focused().should("have.class", "new-todo");
  });

  it("Types in the input field", () => {
    const typedText = "New todo";
    cy.get(".new-todo").type(typedText).should("have.value", typedText);
  });
});
