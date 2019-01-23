/// <reference types="Cypress"/>
import endpoints from '../support/endpoints'

describe('Working with sidebar', () => {
	const client = Cypress.env('client')
  	const dashboard = Cypress.env('dashBoard')

  	beforeEach(() => {
  		cy.server()
  		cy.login(client, dashboard)
  		cy.visitDashboard(client, dashboard, 'data')
  	})

  	context('Sidebar', () => {
  		it('verify sidebar - client logo, analytics, photos, summary, contact', () => {
	        var sidebar = ['analytics', 'photos', 'summary']

	        //client logo
	  		cy.get('.DashboardNavigation div.client_logo').find('img').should('be.visible')
	  		  .and('have.attr', 'src', 'http://i.imgur.com/5ISoSD5.jpg')
	  		
	  		//analytics, photos, summary
	  		cy.server()
	  		cy.route('GET', endpoints.images(client,dashboard)+'*').as('postImages')
	  		cy.route('GET', endpoints.summary(client,dashboard)+'*').as('postSummary')

	  		cy.get('.DashboardNavigation ul>li').each(($li, i) => {
	  			cy.wrap($li).should('be.visible').click()
	  			cy.wait(500)

	  		//contact
	  		cy.get('button.contact_button').should('be.visible')
	  		  .find('span.p05').should('contain', 'Contact')

	  		//branding
	  		cy.get('div.branding img').should('be.visible').and('have.attr', 'src', '/bundles/images/sb_bee.svg')
	  		})
	  		
	    })

    })
})