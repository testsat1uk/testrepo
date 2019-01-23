/// <reference types="Cypress"/>
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

	  		cy.get('li.level-0').each(($li, i) => {
	  			cy.wrap($li).should('be.visible').and('contain', header[i])
	  			   .click()
	  			cy.wait(500)
	        })
	    })

  		//subtabs for A.Column
  		it('verify subtabs of A.Column', () => {
	        var header = ['AA. No Weights','AA. No Weights Data2', 'AB. Weights', 'AC. Options', 'ACB. Calculations', 
	        'ACC. Calculations - data3', 'AD. Grouping', 'AE. Group Percentages']

	  		cy.get('li.level-1').each(($li, i) => {
	  			cy.wrap($li).should('be.visible').and('contain', header[i])
	  			   .click()
	  			cy.wait(500)
	        })
	    })

	    //subtabs for B. Stacked
  		it('verify subtabs of B. Stacked', () => {
	        var header = ['BA. No Weights','BB. Weights', 'BC. Options', 'BD. Options 2', 'BE. Widget Condition']

	        cy.get('li.level-0:nth-child(2) > a').click()

	  		cy.get('li.level-1').each(($li, i) => {
	  			cy.wrap($li).should('be.visible').and('contain', header[i])
	  			   .click()
	  			cy.wait(500)
	        })
	    })

	    //subtabs for C. Pie Chart
  		it('verify subtabs of C. Pie Chart', () => {
	        var header = ['CA. No Weights','CB. Weights']

	        cy.get('li.level-0:nth-child(3) > a').click()

	  		cy.get('li.level-1').each(($li, i) => {
	  			cy.wrap($li).should('be.visible').and('contain', header[i])
	  			   .click()
	  			cy.wait(500)
	        })
	    })

	    //subtabs for D. Heatmaps
  		it('verify subtabs of D. Heatmaps', () => {
	        var header = ['DA. No Weights','DB. Weights', 'DC. Indexes']

	        cy.get('li.level-0:nth-child(4) > a').click()

	  		cy.get('li.level-1').each(($li, i) => {
	  			cy.wrap($li).should('be.visible').and('contain', header[i])
	  			   .click()
	  			cy.wait(500)
	        })
	    })

	    //subtabs for E. Line Charts
  		it('verify subtabs of E. Line Charts', () => {
	        var header = ['EA. No Weights']

	        cy.get('li.level-0:nth-child(5) > a').click()

	  		cy.get('li.level-1').each(($li, i) => {
	  			cy.wrap($li).should('be.visible').and('contain', header[i])
	  			   .click()
	  			cy.wait(500)
	        })
	    })

	    //subtabs for F. Text Widget
  		it('verify subtabs of F. Text Widget', () => {
	        var header = ['FA. Classic', 'FB. Markdown', 'FC. Markdown Advanced', 'FD. Wordcloud & Verbatim', 
	        			  'FE. Video Widget']

	        cy.get('li.level-0:nth-child(6) > a').click()

	  		cy.get('li.level-1').each(($li, i) => {
	  			cy.wrap($li).should('be.visible').and('contain', header[i])
	  			   .click()
	  			cy.wait(500)
	        })
	    })

	    //subtabs for G. Analytics & Images
  		it('verify subtabs of G. Analytics & Images', () => {
	        var header = ['GA. No Weights', 'GB. Weights']

	        cy.get('li.level-0:nth-child(7) > a').click()

	  		cy.get('li.level-1').each(($li, i) => {
	  			cy.wrap($li).should('be.visible').and('contain', header[i])
	  			   .click()
	  			cy.wait(500)
	        })
	    })

	    //subtabs for I. Maps
  		it('verify subtabs of I. Maps', () => {
	        var header = ['IA. Maps', 'IB. World Map', 'HB. table 2']

	        cy.get('li.level-0:nth-child(9) > a').click()

	  		cy.get('li.level-1').each(($li, i) => {
	  			cy.wrap($li).should('be.visible').and('contain', header[i])
	  			   .click()
	  			cy.wait(500)
	        })
	    })

	    //subtabs for J. Interactivity
  		it('verify subtabs of J. Interactivity', () => {
	        var header = ['JA. Interactivity', 'JB. Photos']

	        cy.get('li.level-0:nth-child(10) > a').click()

	  		cy.get('li.level-1').each(($li, i) => {
	  			cy.wrap($li).should('be.visible').and('contain', header[i])
	  			   .click()
	  			cy.wait(500)
	        })
	    })


    })
})