/// <reference types="Cypress"/>
import endpoints from '../support/endpoints'

describe('Working with header', () => {
	const client = Cypress.env('client')
  	const dashboard = Cypress.env('dashBoard')

  	beforeEach(() => {
  		cy.server()
  		cy.login(client, dashboard)
  		cy.visitDashboard(client, dashboard, 'data')
  	})

  	context('Dashboard header', () => {
  		it('verify header - filters, compare, project title, dashboard name', () => {
        var header = ['Filters','Compare']

  			cy.get('.DashboardHeader__Actions button span').each(($span, i) => {
          expect($span).to.contain(header[i])
        })

        //Project title
        //cy.get('.DashboardHeader__ProjectTitle div.bold.pl2.right.truncate').should('be.visible').and('contain', 'Project Project')

        //Dashboard Name
        cy.get('.DashboardHeader.px3 div.DashboardHeader__Title div.overflow-hidden div').should('be.visible').and('contain', 'DemoBoardTest')
      })

      //logout
      it('logout from dashboard', () => {
        const select = cy.get('div.DropdownMenu button.DropdownMenu__NoButton')
        select.click().wait(300).get('div.DropdownOptions ul.DropdownMenu_Content').children()
              .contains('Logout').click()
        cy.url().should('contain', '/login')
      })


    })
})