describe('List item behavior', () => {
  it('Deletes an item', () => {
    cy.intercept({
      method: 'DELETE',
      url: '/api/todos/*'
    },
    {}
    ).as('delete')

    cy.seedAndVisit()
    
    cy.get('.todo-list li').first().find('.destroy').invoke('show').click()
    cy.wait('@delete')
    cy.get('.todo-list li').should('have.length', 2)
  })
})