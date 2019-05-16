function userSearch(phoneNumber){
  cy.get('.panel form.user_search').should('be.visible').within(($div) =>{
    cy.get('.form-group input#q_phone_number_prefix_cont').type(phoneNumber)
    cy.get('.form-group input[name="commit"]').click()
  })
}

describe('Working with user management', () => {
	const userName = Cypress.env('admin_userName')
  const password = Cypress.env('admin_password')
	const url = Cypress.env('admin_url') + '/admins/sign_in'

  	beforeEach(() => {
      cy.visit(url).wait(500)
      cy.get('body').then(($body) => {
        if($body.text().includes('Hello, world!')){
          cy.logout()
        }
      })
      cy.adlogin(userName,password)
      cy.mainMenu('Users management')
  	})


    context('user management', () => {
      //Users
      it('users', () => {
          cy.server()
          cy.route('GET', '/users').as('users')
          cy.menuItem('Users')
          cy.wait('@users').its('status').should('eq', 200)
          cy.get('.table').should('be.visible').within(($tr) => {
            cy.get('tr').eq(1).find('td').eq(4).invoke('text')
              .then(text => {
                const ph_num = text
                Cypress.env({'ph_num':ph_num})
              })
          })
          cy.get('.panel form.user_search').should('be.visible')
      })

      //Search User - Phone Nuumber
      it('user search - phone number', () => {
          cy.server()
          cy.route('GET', '/users').as('users')
          cy.menuItem('Users')
          cy.wait('@users').its('status').should('eq', 200)
          userSearch(Cypress.env('ph_num'))
          cy.get('.table tbody').should('be.visible').within(($tr) => {
            cy.get('tr').eq(0).find('td').eq(4).should('contain', Cypress.env('ph_num'))
          })
      })

      //User - show
      it('user  - show', () => {
          cy.server()
          cy.route('GET', '/users/*').as('user')
          cy.menuItem('Users')
          userSearch(Cypress.env('ph_num'))
          cy.get('.table tbody').should('be.visible').within(($tr) => {
            cy.get('tr').eq(0).find('td').eq(4).should('contain', Cypress.env('ph_num'))
            cy.get('tr').eq(0).find('td a').contains('Show').click()
            cy.wait('@user').its('status').should('eq', 200)
          })
        cy.get('.dl-horizontal div:nth-child(3) dd').should('contain', Cypress.env('ph_num'))
      })

      //User - update
      it('user  - update', () => {
          cy.server()
          cy.route('GET', '/users/*/edit').as('edit')
          cy.menuItem('Users')
          userSearch(Cypress.env('ph_num'))
          cy.get('.table tbody').should('be.visible').within(($tr) => {
            cy.get('tr').eq(0).find('td').eq(4).should('contain', Cypress.env('ph_num'))
            cy.get('tr').eq(0).find('td a').contains('Edit').click()
          })
        cy.get('input#user_referal_code').type('testReferal')
        cy.get('input[value="Update User"]').click()
        cy.wait('@edit').its('status').should('eq', 200)
      })

      //Admins
      it('admins', () => {
          cy.server()
          cy.route('GET', '/admins').as('admins')
          cy.menuItem('Admins')
          cy.wait('@admins').its('status').should('eq', 200)
          cy.get('.table').should('be.visible').within(($tr) => {
            cy.get('tr').eq(1).find('td').eq(0).invoke('text')
              .then(text => {
                const adminEmail = text
                Cypress.env({'adminEmail':adminEmail})
              })
          })
          cy.get('.page-header a').contains('New Admin').should('be.visible')
      })

      //Admin - Show
      it('admin - show', () => {
          cy.server()
          cy.route('GET', '/admins/*').as('admin')
          cy.menuItem('Admins')
          cy.get('.table tr').eq(1).find('td').eq(3).click()
          cy.wait('@admin').its('status').should('eq', 200)
          cy.get('.dl-horizontal dd').first().contains(Cypress.env('adminEmail'))
      })

      //Admin- update
      it('admin  - update', () => {
          cy.server()
          cy.route('GET', '/admins/*/edit').as('edit')
          cy.menuItem('Admins')
          cy.get('.table tbody').should('be.visible').within(($tr) => {
            cy.get('tr').eq(0).find('td').eq(4).click()
          })
        cy.get('input#admin_password').type('password')
        cy.get('input[value="Update Admin"]').click()
        cy.wait('@edit').its('status').should('eq', 200)
      })

    })
})