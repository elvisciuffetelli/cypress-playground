describe("App initialization", () => {

  it("Display todos from API on load", () => {
    cy.seedAndVisit()
    cy.get('.todo-list li').should('have.length', 3)
  })
})