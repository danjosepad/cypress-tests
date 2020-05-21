/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    before(() => {
      cy.visit('https://barrigareact.wcaquino.me/')
      cy.get('[data-test=email]').type('a@a') 
      cy.get('[data-test=passwd]').type('a')

      cy.get('.btn').click()

      cy.get('.toast-message').should('contain', 'Bem vindo')
    })
    
    it('Should enter account page', () => {
      cy.get('[data-test=menu-settings]').click()
      cy.get('[href="/contas"]').click()
    })

    it('Should create an new account', () => {
      cy.get('[data-test=nome]').type('Conta teste')
      cy.get('.btn').click()
      cy.get('.toast-message').should('contain', 'inserida com sucesso!')
    })

    it.only('Should update an account', () => {
      //cy.xpath("//table//td[contains(., 'Conta para alterar')]/..//i[@class='far fa-edit']")

    })

    it('Delete existing acccount', () => {
      cy.get(':nth-child(7) > :nth-child(2) > .fa-trash-alt').click()
      cy.get(':nth-child(7) > :nth-child(1)').should('not.contain', 'Conta teste')
    })
  })