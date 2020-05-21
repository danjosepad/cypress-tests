// Permite o vs entender os params do cypress
/// <reference types="cypress" />

it('Equality', () => {
  const a = 1;

  expect(a).equal(1);
  
  //Exibe uma mensagem para erro e falha
  expect(a, 'Deveria ser 1').not.to.be.equal(2);
})

it('Truthy', () => {
  const a = true;
  const b = null;
  let c;

  expect(a).to.be.true;
  expect(true).to.be.true;
  expect(b).to.be.null;
  expect(a).not.to.be.null;
  expect(c).to.be.undefined;
})

it('Object Equality', () => {
  const obj = {
    a: 1,
    b: 2
  }

  // Funcionam da mesma forma
  expect(obj).equal(obj);
  expect(obj).equals(obj);
  expect(obj).eq(obj);
  expect(obj).to.be.equal(obj);

  // Errado pois apresentam referencias distintas
  // expect(obj).to.be.equal({ a: 1, b: 2 })

  expect(obj).to.be.deep.equal({ a: 1, b: 2 })
  expect(obj).eql({ a: 1, b: 2 })
  expect(obj).include({ a: 1})
  expect(obj).to.have.property('b')

  // Verifica se existe a propriedade, e o valor da mesma
  expect(obj).to.have.property('b', 2)

  expect(obj).to.not.be.empty
  expect({}).to.be.empty
})


it('Arrays', () => {
  const arr = [1,2,3];

  expect(arr).to.have.members([1, 2, 3])
  expect(arr).to.include.members([1, 3])
  expect(arr).to.not.be.empty
  expect([]).to.be.empty
})

it('Types', () => {
  const num = 1;
  const str = 'String';

  expect(num).to.be.a('number')
  expect(str).to.be.a('string')
  expect({}).to.be.an('object')
  expect([]).to.be.an('array')
})

it('String', () => {
  const str = 'String de teste';

  expect(str).to.be.equal('String de teste')
  expect(str).to.have.length(15)
  expect(str).to.contains('de')

  // Também pode usar regex
  expect(str).to.match(/^String/)
  expect(str).to.match(/teste$/)
  expect(str).to.match(/.{15}/)
  expect(str).to.match(/\w+/)
  expect(str).to.match(/\D+/)
})

it('Number', () => {
  const number = 4;
  const float = 5.21;

  expect(number).to.be.equal(4)
  expect(number).to.be.above(3)
  expect(number).to.be.below(7)
  expect(float).to.be.equal(5.21)

  // Para dizimas 
  expect(float).to.be.closeTo(5.2, 0.1)

  expect(float).to.be.above(5)
})