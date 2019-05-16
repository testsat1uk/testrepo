describe('Working with country configurations', () => {
  const userName = Cypress.env('admin_userName')
  const password = Cypress.env('admin_password')
  const url = Cypress.env('admin_url') + '/admins/sign_in'

    beforeEach(() => {
      cy.server()
      cy.route('GET', '/country_configurations').as('country')
      cy.visit(url).wait(500)
      cy.get('body').then(($body) => {
        if($body.text().includes('Hello, world!')){
          cy.logout()
        }
      })
      cy.adlogin(userName,password)
      cy.menuItem('Country Configurations')
      cy.wait('@country').its('status').should('eq', 200)
    })

    context('Country Configurations', () => { 
      //Verify Country Configurations page 
      it('country configurations page', () => {
        cy.get('.page-header h1').should('contain', 'Listing Country Configurations')
        cy.get('.page-header a').should('contain', 'New Country Configuration')
      })
    })
})