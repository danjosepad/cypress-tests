/// <reference types="cypress" />

describe('Helpers', () => {
  it('Wrap', () => {
    const obj = { nome: "User", idade: 20 }
    expect(obj).to.have.property('nome')

    /*
    Ao tentar fazer:

    obj.should('have.property', 'nome')

    Ele não funcionará, e isso porque o objeto não possui
    essa função, ela existe na api do cypress.
    Nesses casos, podemos usar o Wrap
    */

    cy.wrap(obj).should('have.property', 'nome')

    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    cy.get('#formNome').type('funciona?')
    cy.get('#formNome').then($el => {
      // $el.val('funciona via jquery') vai funcionar porque reconhece o jquery
      // Mas não é isso que queremos alcançar 
      // Para isso

      cy.wrap($el).type('funciona via cypress')
    })

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10)
      }, 500)
    })

    cy.get('#buttonSimple').then(() => console.log('Found the first button'))
    promise.then(num => console.log(num)) // 10
    cy.get('#buttonList').then(() => console.log('Found the second button'))

    /* Ao executar, retornará na seguinte ordem
    CONSOLE
    10
    Found the first button
    Fount the secont button

    Como elas estão em linhas separadas, elas não estão sincronizadas

    E para fazer com que ele gerencie, usaremos o wrap novamente
    */
    cy.get('#buttonSimple').then(() => console.log('Found the first button'))
    cy.wrap(promise).then(num => console.log(num))
    cy.get('#buttonList').then(() => console.log('Found the second button'))

    // Agora ela virá na ordem correta

    cy.wrap(1).then(num => {
      return 2
    }).should('be.equal', 2)

    // Irá funcionar, pois o then retornará o valor sugerido pela função

    cy.wrap(1).should(num => {
      return 2
    }).should('be.equal', 2)

    // Usando o should isso nao será possível, pois o retorno será o 1, que seria
    // o parâmetro passado para o should
  })

  it('Its', () => {
    const obj = { name: 'User', age: 20 }
    cy.wrap(obj).should('have.property', 'name', 'User')

    // O its permite que selecionemos a propriedade do argumento passado
    cy.wrap(obj).its('name').should('be.equal', 'User')

    const obj2 = { name: 'User', age: 20, address: { street: 'Test'} }

    // Podemos encadear os its
    cy.wrap(obj2).its('address').its('street').should('be.equal', 'Test')

    // Ou se quisermos simplificar
    cy.wrap(obj2).its('address.street').should('be.equal', 'Test')

    // Veja outro exemplo

    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
      cy.title().its('length').should('be.equal', 20)
    // Assim é possível acessar a propriedade length do argumento passado

     
  })
})