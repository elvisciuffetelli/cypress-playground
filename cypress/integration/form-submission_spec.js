describe('Form submisison', () => {
  it('Adds a new todo item', () => {
    const newTodo = 'Buy milk'
    cy.intercept({
      method: 'POST',
      url: '/api/todos'
    },
    {id: 123, name: newTodo, isComplete: false}
    ).as('save')

    cy.seedAndVisit()

    cy.get('.new-todo').type(newTodo).type('{enter}')

    cy.wait('@save')

    cy.get('.todo-list li').should('have.length', 4)

  })

  it.only('Show an error message for a failed form submission', () => {
    const newTodo = 'Test'
    cy.intercept('POST', '/api/todos',
      {
        statusCode: 500,
        body: {}
      }).as('save')
    
    cy.seedAndVisit()

    cy.get('.new-todo')
      .type(newTodo).type('{enter}')
    
    cy.wait('@save')

    cy.get('.todo-list li').should('have.length', 3)

    cy.get('.error').should('be.visible')

  })
})