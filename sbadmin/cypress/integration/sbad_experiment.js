describe('Working with archive/unarchive', () => {
	const userName = Cypress.env('admin_userName')
  const password = Cypress.env('admin_password')
	const url = Cypress.env('admin_url') + '/admins/sign_in'

  	beforeEach(() => {
      cy.visit(url).wait(500)
      cy.server()
      cy.route('GET', '/experiments').as('experiments')
      cy.get('body').then(($body) => {
        if($body.text().includes('Hello, world!')){
          cy.logout()
        }
      })
      cy.adlogin(userName,password)
      cy.mainMenu('Experiments')
      cy.wait('@experiments').its('status').should('eq', 200)
  	})

    context('New Experiment', () => { 
      //Verify Experiments page 
      it('new experiment', () => {
        cy.get('div button').contains('New Experiment').should('be.visible').click({force:true})
        cy.get('.modal-body .form-group:nth-child(1) input').type('exp'+ Math.floor(Math.random() * 20))
        cy.get('.modal-body .form-group:nth-child(2) button').contains('Add group').should('be.visible').click()
        cy.get('.modal-body .form-group:nth-child(2) .form-group input').first()
          .type('grp'+Math.floor(Math.random() * 20))
        cy.get('.modal-body .form-group:nth-child(2) .form-group div:nth-child(2) select').should('be.visible')
          .select('Show Project')
        cy.get('.modal-body .form-group:nth-child(2) .form-group div:nth-child(3) input').should('be.visible')
          .type('1')
        cy.get('.modal-body button').contains('Save').should('be.visible')
           .click()
      })
    })

})

