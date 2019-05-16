function search(selector, name){
  cy.get(selector).type(name)
  cy.get('input[name="commit"]').click()
}

describe('Working with projects', () => {
	const userName = Cypress.env('admin_userName')
  const password = Cypress.env('admin_password')
	const url = Cypress.env('admin_url') + '/admins/sign_in'

  	beforeEach(() => {
      cy.server()
      cy.route('GET', '/projects').as('projects')
      cy.visit(url).wait(500)
      cy.get('body').then(($body) => {
        if($body.text().includes('Hello, world!')){
          cy.logout()
        }
      })
      cy.adlogin(userName,password)
      cy.menuItem('Projects')
      cy.wait('@projects').its('status').should('eq', 200)
  	})

  	context('create project, update - questions, question flow etc', () => {
      //New Project - Multiple Submission
      it('new project - multi-submission', () => {
        cy.newProject('Multi-Submission', '#react-select-3--value .Select-input')
      })

      //New Project - Store
      it('new project - store', () => {
        cy.newProject('Store', '#react-select-3--value .Select-input')
      })

      //New Project - Poll
      it('new project - poll', () => {
        cy.newProject('Poll', '#react-select-3--value .Select-input')
      })

    })

})