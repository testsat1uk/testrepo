/// <reference types="Cypress"/>
import endpoints from '../support/endpoints'

describe('Working with filters', () => {
	const client = Cypress.env('client')
  const dashboard = Cypress.env('dashBoard')

  	beforeEach(() => {
  		cy.server()
  		cy.login(client, dashboard)
  		cy.visitDashboard(client, dashboard, 'data')

      //filter sidebar open
      cy.get('.DashboardHeader__Actions button').first().click()
  	})

  	context('When applying a filter', () => {


      //filter side close 
  		it('verify filters sidebar close when clicked', () => {
  			cy.get('.SidebarWrapper--filters .SidebarWrapper-header button').click()
  			cy.wait(500)
  		})

      //Apply criteria for Age Group
     	it('apply the criteria to filter (Age Group)', () => {
     		//Set filter - 26-35 (26) 
        cy.chooseReactSelectOption('#react-select-2--value .Select-input', '26-35', '26-35')
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
    	})

      //Apply criteria for Comparator test
      it('apply the criteria to filter (Comparator test)', () => {
        //Set filter - 20-49% 
         cy.chooseReactSelectOption('#react-select-3--value .Select-input', '20-49', '20-49')       
         cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })

      //Apply criteria for Comparator test2
      it('apply the criteria to filter (Comparator test 2)', () => {
        //Set filter - My parents 
        cy.chooseReactSelectOption('#react-select-4--value .Select-input', 'My parents', 'My parents')
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })

      //Apply criteria for Category 1
      it('apply the criteria to filter (Category 1 - filter2)', () => {
        //Set filter 2 - Nittol 
        cy.get('div:nth-child(3) > button span').contains('category 1').click()
        cy.chooseReactSelectOption('#react-select-9--value .Select-input', 'nittol', 'nittol')                 
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })

      //Apply criteria for Category2 - Filter 2
      it('apply the criteria to filter (Category 2 - filter2)', () => {
        //Set filter  - Nittol
        cy.get('div > div:nth-child(4) button').contains('category 2').click() 
        cy.chooseReactSelectOption('#react-select-9--value .Select-input', 'nittol', 'nittol')
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })

  	})
})


