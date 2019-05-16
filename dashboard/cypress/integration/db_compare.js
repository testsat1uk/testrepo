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
        cy.chooseReactSelectOption('#react-select-5--value .Select-input', '26-35', '26-35')
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
    	})

      //Apply criteria for Comparator test
      it('apply the criteria to filter (Comparator test)', () => {
        //Set filter - 20-49% 
        cy.chooseReactSelectOption('#react-select-6--value .Select-input', '20-49', '20-49')
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })

      //Apply criteria for Comparator test2
      it('apply the criteria to filter (Comparator test 2)', () => {
        //Set filter - My parents 
        cy.chooseReactSelectOption('#react-select-7--value .Select-input', 'My parents', 'My parents')
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })

      //Apply criteria for Category2 - Filter1
      it('apply the criteria to filter (Category 2 - filter1)', () => {
        //Set filter  - Female
        cy.get('div > div:nth-child(5) button').click() 
        cy.chooseReactSelectOption('#react-select-8--value .Select-input', 'female', 'female')
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })

      //Apply criteria for Category2 - Filter 2
      it('apply the criteria to filter (Category 2 - filter2)', () => {
        //Set filter  - Nittol
        cy.get('div > div:nth-child(5) button').click() 
        cy.chooseReactSelectOption('#react-select-9--value .Select-input', 'nittol', 'nittol')
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })

      //Apply criteria for Category1 - Filter 2
      it('apply the criteria to filter (Category 1 - filter2)', () => {
        //Set filter  - Nittol 
        cy.get('div:nth-child(4) button>span').contains('category 1').click() 

        cy.chooseReactSelectOption('#react-select-9--value .Select-input', 'nittol', 'nittol')
        cy.get('button.FilterButton span:nth-child(2)').should('be.visible')
      })

  	})
})


