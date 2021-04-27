describe('Note app', function () {
 beforeEach(function () {
  cy.request('POST', 'http://localhost:3005/api/testing/reset')
  cy.visit('http://localhost:3000')
 })
 it('Contains login', function () {
  cy.contains('Login')
  cy.get('#LoginForm')
 })
})