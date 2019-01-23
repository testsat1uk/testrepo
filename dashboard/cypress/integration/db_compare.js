/// <reference types="Cypress"/>
import endpoints from '../support/endpoints'

describe('Working with Compare', () => {
	const client = Cypress.env('client')
  const dashboard = Cypress.env('dashBoard')

  	beforeEach(() => {
  		cy.server()
  		cy.login(client, dashboard)
  		cy.visitDashboard(client, dashboard, 'data')

      //compare sidebar open
      cy.get('.DashboardHeader__Actions button').children().contains('Compare').click()
      cy.wait(500)
  	})

  	context('When applying a filter', () => {
      //Compare side close 
  		it('verify filters sidebar close when clicked', () => {
  			cy.get('.SidebarWrapper--compare .SidebarWrapper-header button').click()
  			cy.wait(500)
  		})

      //Apply criteria for Age Group
     	it('apply the criteria to filter (Age Group)', () => {
     		//Set filter - 26-35 (26) 

        const select = cy.get('#react-select-5--value > div.Select-placeholder')
      	select.click().wait(500).get('.Select-menu-outer').children().first().click({})
        //select.click().get('.Select-menu-outer').children().find('.Select-option').contains('26-35 (26)').click()
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
    	})

      //Apply criteria for Comparator test
      it('apply the criteria to filter (Comparator test)', () => {
        //Set filter - 20-49% 

        const select = cy.get('#react-select-6--value > div.Select-placeholder')

        select.click().wait(500).get('.Select-menu-outer').children().find('.Select-option').contains('20-49%').click()
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })

      //Apply criteria for Comparator test2
      it('apply the criteria to filter (Comparator test 2)', () => {
        //Set filter - My parents 

        const select = cy.get('#react-select-7--value > div.Select-placeholder')

        select.click().wait(500).get('.Select-menu-outer').children().find('.Select-option').contains('My parents').click()
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })

      //Apply criteria for Category 
      it('apply the criteria to filter (Category 1)', () => {
        //Set filter 2 - Yay 
      
        const select = cy.get('div > div:nth-child(5) > button').click()
                         .get('.Select-multi-value-wrapper .Select-placeholder').contains('filter 2')
        
        select.click().wait(500).get('.Select-menu-outer').children().find('.Select-option').contains('Yay').click()                 
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })
  	})
})


