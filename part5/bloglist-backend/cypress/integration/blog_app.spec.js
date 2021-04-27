describe('Note app', function () {
 beforeEach(function () {
  cy.request('POST', 'http://localhost:3005/api/testing/reset')
  cy.request('POST', 'http://localhost:3005/api/users', {
   username: 'imri', password: '123123'
  })
  cy.visit('http://localhost:3000')
 })
 it('Contains login', function () {
  cy.contains('Login')
  cy.get('#LoginForm')
 })

 describe('Login tests', function () {
  it('Login success', function () {
   cy.get('#username').type('imri')
   cy.get('#password').type('123123')
   cy.get('#loginButton').click()
   cy.contains('imri')
  })
  it('Login fail', function () {
   cy.get('#username').type('1')
   cy.get('#password').type('1')
   cy.get('#loginButton').click()
   cy.contains('Invalid credentials')
  })
 })

 describe('when logged in', function () {
  beforeEach(function () {
   cy.request('POST', 'http://localhost:3005/api/login', {
    username: 'imri', password: '123123'
   }).then(res => {
    localStorage.setItem('loggedUser', JSON.stringify(res.body))
    cy.visit('http://localhost:3000')
   })
  })
  it('create blog', function () {
   cy.contains('Create Form').click()
   cy.contains('Create new')
   cy.get('#title').type('Cypress blog')
   cy.get('#author').type('hoho')
   cy.get('#url').type('lili')
   cy.contains('Submit').click()
   cy.contains('Cypress blog')
  })
 })
})