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
    cy.contains('Create Form').click()
    cy.contains('Create new')
    cy.get('#title').type('Cypress blog #1')
    cy.get('#author').type('hoho')
    cy.get('#url').type('lili')
    cy.contains('Submit').click()
   })

  })
  it('create blog', function () {
   cy.contains('Cypress blog #1')
  })
  it('like blog', function () {
   cy.contains('Like').click()
   cy.contains('Unlike')
  })
  it('delete blog', function () {
   cy.contains('Cypress blog #1').should('exist')
   cy.contains('Delete').click()
   cy.contains('Cypress blog #1').should('not.exist')
  })
  it('likes arragement', function () {
   cy.intercept({
    method: "POST",
    url: "http://localhost:3005/api/blogs",
   }).as("blogsPost");

   cy.intercept({
    method: "PUT",
    url: "http://localhost:3005/api/blogs",
   }).as("blogLikes");

   cy.contains('Like').click()
   cy.contains('Create Form').click()
   cy.get('#title').clear().type('Cypress blog #2')
   cy.get('#author').type('Imri ')
   cy.get('#url').type('lurlili')

   cy.contains('Submit').click()

   cy.contains('Cypress blog #1').contains('Unlike').click()
   cy.contains('Cypress blog #2').contains('Like').click()

   cy.wait('@blogsPost')
   cy.reload()
   cy.get('li').first().contains('Cypress blog #2')
  })
 })
})