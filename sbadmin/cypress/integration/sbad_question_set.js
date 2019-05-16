function addQuestion(quesText) {
  cy.get('.questionsSearchList-header .searchQuestionInput input').type(quesText)
  cy.get('.p2 .questionResult').find('button').first().click({force:true})
  cy.get('.questionsSearchList-actions button').contains('Save').click()
}

describe('Working with question sets', () => {
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

      cy.server()
      cy.route('GET', '/question_sets*').as('questSet')
      cy.menuItem('Question Sets')
      cy.wait('@questSet').its('status').should('eq', 200)
      cy.get('.actions .btn').contains('New Set').click()
  	})

  	context('Question Set', () => { 
      //Verify Question set page
      it('questions page', () => {
        cy.get('thead th.name').should('contain', 'Sets')
        cy.get('.panels-sidebar-header input').should('have.value', 'New Question Set')
        cy.get('.panels-sidebar-header span').invoke('show').should('contain', 'Add A Question')
      })

      //New Question Set
      it('new question set', () => {
        const qset = 'qset' + Math.floor(Math.random()*1000)
        cy.server()
        cy.route('POST', '/question_sets').as('qsets')
        addQuestion('how {enter}')
        cy.wait("@qsets").its('status').should('eq', 200)
        addQuestion('what {enter}')
        cy.get('.panels-sidebar-header input').click().clear().type(qset)
        cy.get('.questionsSearchList-actions button').contains('Save').click()
      })

      //Delete Question set
      it('delete question set', () => {
        const qset = 'qset' + Math.floor(Math.random()*1000)
        cy.server()
        cy.route('POST', '/question_sets').as('qsets')
        cy.route('PUT', '/question_sets/*').as('put')
        addQuestion('how {enter}')
        cy.wait("@qsets").its('status').should('eq', 200)
        addQuestion('what {enter}')
        cy.get('.panels-sidebar-header input').click().clear().type(qset)
        cy.get('.questionsSearchList-actions button').contains('Save').click()
        cy.wait("@put").its('status').should('eq', 200)
        cy.get('.questionsSearchList-actions button').contains('Delete').click()
        cy.get('.swal2-container div .swal2-actions button').contains('Yes, delete it').click()
      })


    })
})