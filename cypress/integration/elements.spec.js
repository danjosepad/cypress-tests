/// <reference types="cypress" />

describe('Work with basic elements', () => {
  beforeEach(() => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html');
  })

  it('text', () => {
    cy.get('body').should('contain', 'Cuidado')     
    // Mais restritivo
    cy.get('span').should('contain', 'Cuidado')     
    cy.get('.facilAchar')
      .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
  })

  it('links', () => {
    cy.get('#resultado').should('have.not.text', 'Voltou!');

    cy.contains('Voltar').click();
    cy.get('#resultado').should('have.text', 'Voltou!');
  })
})