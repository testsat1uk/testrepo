function statistics(selector){
  cy.get(selector).find('.form-group #attributes_start_date')
    .type(new Date().getFullYear()+'-01-01')
  cy.get(selector).find('.form-group #attributes_end_date').click()
    .type(new Date().getFullYear()+'-12-31')
  cy.get(selector +' h4').click()
  cy.get(selector).find('form input[type="submit"]').click()
  cy.get('.alert h4').should('contain', 'Report is generating, it will be sent to your email when done!')
}

describe('Working with statistics', () => {
  const userName = Cypress.env('admin_userName')
  const password = Cypress.env('admin_password')
  const url = Cypress.env('admin_url') + '/admins/sign_in'

    beforeEach(() => {
      cy.server()
      cy.route('GET', '/statistics').as('statistics')
      cy.visit(url).wait(500)
      cy.get('body').then(($body) => {
        if($body.text().includes('Hello, world!')){
          cy.logout()
        }
      })
      cy.adlogin(userName,password)
      cy.menuItem('Statistics')
      cy.wait('@statistics').its('status').should('eq',200)
    })

    context('Statistics', () => { 
      //Verify Statistics page 
      it('statistics configurations page', () => {
        cy.get('.container div:nth-child(3) h4').should('contain', 'Data points count')
          .get('form input[type="submit"]').should('contain', 'Generate')
        cy.get('.container div:nth-child(4) h4').should('contain', 'Paid amount')
          .get('form input[type="submit"]').should('contain', 'Generate')
      })

      //Data points count 
      it('data points count', () => {
        cy.server()
        cy.route('POST', '/data_points_count_export').as('dataPoints')
        statistics('.container div:nth-child(3)')
        cy.wait('@dataPoints').its('status').should('eq',201)
      })

      //Paid Amount 
      it('paid amount', () => {
        cy.server()
        cy.route('POST', '/submissions/paid_amount_export').as('paidAmount')
        statistics('.container div:nth-child(4)')
        cy.wait('@paidAmount').its('status').should('eq',201)
      })

    })
})