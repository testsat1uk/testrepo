import endpoints from '../support/endpoints'

describe('Working with tabs and subtabs', () => {
	const client = Cypress.env('client')
  	const dashboard = Cypress.env('dashBoard')

  	beforeEach(() => {
  		cy.server()
  		cy.login(client, dashboard)
  		cy.visitDashboard(client, dashboard, 'data')
  	})

  	context('Tabs', () => {
  		it('verify tabs', () => {
	        var header = ['A. Column','B. Stacked', 'C. Pie Chart', 'D. Heatmaps', 'E. Line Charts', 'F. Text Widget', 
	        			  'G. Analytics & Images', 'H. Table', 'I. Maps', 'J. Interactivity']

	  		//cy.get('.Dashboard__Content.flex > div > div > div:nth-child(1) > div:nth-child(1) > div')
	  		  //.wait(500)
	  		  cy.screenshot({ x: 145, y: 201, width: 812.406255, height: 453.71875})
	  		  // cy.get('div.Dashboard__Content.flex .DataContent > div > div:nth-child(1) > div:nth-child(1) div.WidgetContainer > div > div > div:nth-child(2) > svg')
	  		  // 	.wait(500).screenshot('AA1')

	  		  //cy.screenshot({ x: 20, y: 20, width: 400, height: 300 })

	  	})
	})
})