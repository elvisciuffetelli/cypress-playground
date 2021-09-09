describe("Smoke test", () => {
  beforeEach(() => {
    cy.request("DELETE", "http://localhost:3030/api/todos/all");
  });

  context("No todos", () => {
    it("Adds a new todo", () => {
      cy.intercept("POST", "/api/todos").as("save");

      cy.visit("/");

      cy.get(".new-todo").type("New todo").type("{enter}");

      cy.wait("@save");

      cy.get(".todo-list li").should("have.length", 1);
    });
  });

  context("With todos", () => {
    beforeEach(() => {
      cy.fixture("todos").then((todos) => {
        cy.request("POST", "http://localhost:3030/api/todos/bulkload", {
          todos,
        });
      });

      cy.intercept("GET", "http://localhost:3030/api/todos").as("load");
      cy.visit("/");

      cy.wait("@load");
    });

    it.only("Delete todos", () => {
      cy.intercept("DELETE", "http://localhost:3030/api/todos/*").as("delete");
      cy.get(".todo-list li")
        .each(($el) => {
          cy.wrap($el).find(".destroy").invoke("show").click();

          cy.wait("@delete");
        })
        .should("not.exist");
    });
  });
});
