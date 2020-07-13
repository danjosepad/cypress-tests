/// <reference types="cypress" />

describe('Esperas...', () => {
  before(() => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html');
  })

  beforeEach(() => {
    cy.reload();
  })

  it('Should wait element be available', () => {
    cy.get('#novoCampo')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').type('funciona')
  })
  
  it('Should retry', () => {
    cy.get('#buttonDelay').click()
  })
})
