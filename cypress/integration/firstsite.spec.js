/// <reference types="cypress" />

describe('Cypress basics', () => {
  it('Should visit a page and assert title', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  
    // C/ encadeamento
    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .and('contain', 'Campo')
  })

  it('Should find and interact with an element', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    cy.get('#buttonSimple')
      .click()
      .should('have.value', 'Obrigado!')
  })
})

