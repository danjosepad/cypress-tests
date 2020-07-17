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
    cy.get('#novoCampo').should('not.exist')
    
    /*
    Cuidado ao user pipe (encadeamento)
    o retorno de uma funcao, será passada para a próxima
    a ser chamada, sendo assim, esse exemplo não funcionaria:

    cy.get('#novoCampo')
      .should('not.exist')
      .should('exist')

    Porque o retorno da funcao should not exist retornará nulo.
    Isso ocorre porque o campo existe, e como não houve resultado à função
    será passada à proxima, que por sua vez não funcionará já que o valor retornado
    foi nulo
    */

    cy.get('#novoCampo')
      .should('exist') // Retorna o campo
      .type('funciona') // Retorna o campo
  })

  it('find usage', () => {
    // Mesmo que o elemento saia do dom, o cypress tentará instanciar novamente afim
    // de achar o arquivo
    cy.get('#buttonList').click()
    cy.get('#lista li')
      .find('span')
      .should('contain', 'Item 1')

    cy.get('#lista li span')
      .should('contain', 'Item 2')
      
  })

  it('timeout usage', () => {
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('exist')

    //Timeout
    // cy.get('#novoCampo', { timeout: 1000 }).should('exist')

    /*
    É possível definir um timeout padrão para cada comando, para isso:
    cypress.json -> 
    {
      "defaultCommandTimeout": 1000
    }
    */
    cy.get('#buttonlistDOM').click()
    // Se quiser parar o script por um tempo, independente da velocidade da aplicação
    cy.wait(5000)

    cy.get('#lista li span', { timeout: 10000 })
      .should('have.length', 2)
    
    // O timeout define um tempo que espera até dar erro, ou seja
    // Se o componente desejado carregar antes, ele já dará continuidade
  })

  it('click retry', () => {
    // Nem todos possuem o retry

    // O valor a seguir passa de 1, e depois se altera para 11, clicando mais uma vez
    // Será passado para 111

    cy.get('#buttonCount')
      .click() // Nesse momento, ele processará o 1, e logo mais será atualizado para 11
      .should('have.value', '11') 
      // Se colocarmos aqui, o tempo para alterar o clique
      // Já vai ser o suficiente para que o valor se torne 11

      cy.get('#buttonCount')
      .click()
      .click()
      .should('have.value', '11') 
      // Com mais um clique, esse valor será atualizado e se tornará 111
  })

  // Todas as buscas do cypress são Promisses

  /*
    Tanto o then quanto o should tratam promisses

    DIFERENÇAS
    
    Then => 
    - Aguarda que a funcao seja concluida para prosseguir
    - Pode retornar um valor, já que é uma função
    - Se necesário fazer mais de uma busca após receber o elemento, use o Then e evite retries
    Should => 
    - Fica sendo executado ao longo da espera, com retries
    - Sempre retorna o elemento

    Na maioria das vezes acaba sendo mais performático e útil usar o Then
    mas caso necessite de retries o should é uma ótima opção
  */

  it('should vs then', () => {
    cy.get('#buttonListDOM').click()
    cy.get('#lista li span').then($el => {
      //should('have.length', 1)
      console.log($el) // Then só retorna um, Should retorna vários
      expect($el).to.have.length(1)
      return 2
    }).and('eq', 2)
      .and('not.have.id', 'buttonListDOM')
  })
})
