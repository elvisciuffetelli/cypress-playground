describe("List item behavior", () => {
  it("Deletes an item", () => {
    cy.intercept(
      {
        method: "DELETE",
        url: "/api/todos/*",
      },
      {}
    ).as("delete");

    cy.seedAndVisit();

    cy.get(".todo-list li").as("list");

    cy.get("@list").first().find(".destroy").invoke("show").click();
    cy.wait("@delete");
    cy.get("@list").should("have.length", 2);
  });
});
