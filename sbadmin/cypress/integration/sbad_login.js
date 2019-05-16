describe('Working with login', () => {
	const userName = Cypress.env('admin_userName')
  	const password = Cypress.env('admin_password')
  	const url = Cypress.env('admin_url') + '/admins/sign_in'


  	beforeEach(() => {
      cy.visit(url)
      cy.get('body').then(($body) => {
      	if($body.text().includes('Hello, world!')){
      		cy.logout()
      	}
      })
  	})

  	//Login - Valid Credentials
  	context('When logging in with success', () => {
		it('login', () => {
			cy.get('input#admin_email').type(userName)
			cy.get('input#admin_password').type(password)
			cy.get('input[type="submit"]').click()

			cy.get('div.alert.alert-success.alert-dismissable')
			  .should('contain','Signed in successfully.').and('be.visible')
			cy.get('div.jumbotron h1').should('contain', 'Hello, world!').and('be.visible')
		})

		//Login - Invalid Password
		it('login - invalid password', () => {
			cy.get('input#admin_email').type(userName)
			cy.get('input#admin_password').type('asdasd')
			cy.get('input[type="submit"]').click()

			cy.get('div.alert.alert-success.alert-dismissable')
			  .should('contain','Invalid email or password.').and('be.visible')
		})

		//Login - Invalid User Name
		it('login - invalid user name', () => {
			cy.get('input#admin_email').type('test@streetbees.com')
			cy.get('input#admin_password').type(password)
			cy.get('input[type="submit"]').click()

			cy.get('div.alert.alert-success.alert-dismissable')
			  .should('contain','Invalid email or password.').and('be.visible')
		})

	})
})