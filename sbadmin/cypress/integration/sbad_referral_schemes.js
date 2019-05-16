describe('Working with Referral Schemes', () => {
  const userName = Cypress.env('admin_userName')
  const password = Cypress.env('admin_password')
  const url = Cypress.env('admin_url') + '/admins/sign_in'

    beforeEach(() => {
      cy.server()
      cy.route('GET', '/referral_schemes').as('rSchemes')
      cy.visit(url).wait(500)
      cy.get('body').then(($body) => {
        if($body.text().includes('Hello, world!')){
          cy.logout()
        }
      })
      cy.adlogin(userName,password)
      cy.menuItem('Referral Schemes')
      cy.wait('@rSchemes').its('status').should('eq', 200)
    })

    context('Referral Schemes', () => { 
      //Verify Country Configurations page 
      it('country configurations page', () => {
        cy.get('.page-header h1').should('contain', 'Referral Schemes')
        cy.get('.col-md-8  div button').first().should('contain', 'Add New Scheme')
      })
    })
})