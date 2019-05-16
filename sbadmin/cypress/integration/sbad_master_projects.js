describe('Working with master projects', () => {
	const userName = Cypress.env('admin_userName')
  const password = Cypress.env('admin_password')
	const url = Cypress.env('admin_url') + '/admins/sign_in'

  	beforeEach(() => {
      cy.server()
      cy.route('GET', '/master_projects').as('mProjects')
      cy.visit(url).wait(500)
      cy.get('body').then(($body) => {
        if($body.text().includes('Hello, world!')){
          cy.logout()
        }
      })
      cy.adlogin(userName,password)
      cy.menuItem('Master projects')
      cy.wait('@mProjects').its('status').should('eq', 200)
  	})

  	context('Master Projects', () => {
      //Navigate to Master Projects
      it('master projects page', () => {
        cy.get('.page-header').should('contain', 'Master projects')
          .get('a').should('contain', 'ungrouped project(s)')
        cy.get('.list-group').should('be.visible')
      })

      //Open a Master Project
      it('open master project', () => {
        cy.server()
        cy.route('GET', '/master_projects/*').as('mProject')
        cy.route('GET', '/projects/*').as('project')
        if(parseInt(cy.get('.list-group a').its('length')) === 0){
          cy.get('.page-header a').contains('ungrouped project(s)').click()
        }
        else {
          cy.get('.list-group a:first').click()
          cy.wait('@mProject').its('status').should('eq', 200)
          cy.get('.page-header').should('contain', 'Master projects').and('contain', 'Back to all')
          cy.get('.list-group a:first').click()
          cy.wait('@project').its('status').should('eq', 200)
          cy.get('.page-header').should('contain', 'Show project')
        }
      })
    })
})