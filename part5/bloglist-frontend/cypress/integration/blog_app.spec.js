const cy = require('cypress')

describe('Blog app', function () {
 it('login form shows', function () {
  cy.visit('http://localhost:3000')
  cy.contains('Login')
 })
})