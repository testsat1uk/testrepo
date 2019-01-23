/// <reference types="Cypress"/>
import endpoints from '../support/endpoints'

describe('Working with forgot password', () => {
	const client = Cypress.env('client')
  	const dashboard = Cypress.env('dashBoard')

  	beforeEach(() => {
			cy.visitDashboard(client, dashboard, 'data')
			cy.url().should('include', 'login?redirectTo=')

			cy.get('a.h5.mb3').click()
  	})

	context('Working with forgot password', () =>{
		//verify forgot password page
		it('verify forgot password page', () => {
			cy.get('form input.rounded.h3.mb3').should('be.visible')
			cy.get('button[type="submit"]').should('be.visible').and('be.disabled')
			cy.get('a#loginLink').should('be.visible')
			cy.get('a#signUpClick').should('be.visible')
		})

		//request reset password
		it('reset password', () => {
			cy.server()
			cy.route('POST', endpoints.password_recover(client, dashboard)).as('resetPassword')

			cy.get('form input.rounded.h3.mb3').type('satheesh@streetbees.com')
			cy.get('button[type="submit"]').click()
			cy.wait('@resetPassword').its('status').should('eq', 200)
			cy.get('div.pb3.h3.caps.heavy.center').should('be.visible').contains('Verify your e-email')
		})
	})


})