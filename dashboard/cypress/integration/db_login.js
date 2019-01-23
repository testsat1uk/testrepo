/// <reference types="Cypress"/>
import endpoints from '../support/endpoints'

describe('Working with login', () => {
	const client = Cypress.env('client')
  	const dashboard = Cypress.env('dashBoard')

	context('Unauthorised', () =>{
		//must be authorized to access any URL on the app
		it('is redirected to the login', () => {
			cy.visitDashboard(client, dashboard, 'data')

			cy.url().should('include', 'login?redirectTo=')
		})
	})

	context('When logging in with success', () => {
		const userName = Cypress.env('userName')
		const password = Cypress.env('password')

		it('should login', () => {
			cy.server()
			cy.route('POST', endpoints.login(client, dashboard))
			  .as('postLogin')

			cy.visitDashboard(client, dashboard)

			cy.get('input[type="text"]').type(userName)
			cy.get('input[type="password"]').type(password)
			cy.get('button[type="submit"]').click()

			cy.wait('@postLogin').its('status').should('eq', 200)
			cy.wait(5000)
		})
	})

	context('When logging in with invalid password', () =>{
		const userName = Cypress.env('userName')
		const password = 'asdad'

		it('should not login', () =>{
			cy.server()
			cy.route('POST', endpoints.login(client,dashboard)).as('postLogin')

			cy.visitDashboard(client,dashboard)

			cy.get('input[type="text"]').type(userName)
			cy.get('input[type="password"]').type(password)
			cy.get('button[type="submit"]').click()

			cy.wait('@postLogin').its('status').should('eq', 422)
		})
	})

	context('When logging in with invalid userName', () =>{
		const userName = 'test@test.com'
		const password = Cypress.env('password')

		it('should not login', () =>{
			cy.server()
			cy.route('POST', endpoints.login(client,dashboard)).as('postLogin')

			cy.visitDashboard(client,dashboard)

			cy.get('input[type="text"]').type(userName)
			cy.get('input[type="password"]').type(password)
			cy.get('button[type="submit"]').click()
			cy.get('div.semibold').contains('Login is invalid')

			cy.wait('@postLogin').its('status').should('eq', 422)
		})
	})

	context('When logging in with no credentials', () =>{
		const userName = ''
		const password = ''

		it('should not login', () =>{
			cy.server()
			cy.route('POST', endpoints.login(client,dashboard)).as('postLogin')

			cy.visitDashboard(client,dashboard)

			cy.get('button[type="submit"]').click()
			cy.get('div.semibold').contains('Login is invalid')

			cy.wait('@postLogin').its('status').should('eq', 422)
		})
	})

})