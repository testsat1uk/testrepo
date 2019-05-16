function question(questType, text) {
  cy.get('.panels-sidebar-body .mb2 .btn-answerType span').contains(questType)
  cy.get('.panels-sidebar-body textarea').type(text)
  cy.get('.pl1.pr4.flex .flex-1.mr2 input').type(1)
  cy.get('.pl1.pr4.flex .flex-1:nth-child(2) input').type(20)
  cy.get('.saveQuestion button').contains('Save').click()
}

function questionText(questionType) {
  return questionType + Math.floor(Math.random()*1000)
}

describe('Working with questions', () => {
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
      cy.route('GET', '/questions*').as('questions')
      cy.menuItem('Questions')
      cy.wait('@questions').its('status').should('eq', 200)
      cy.get('.actions .btn').contains('New Question').click()
  	})

  	context('Questions', () => {
      //Verify Questions Page
      it('questions page', () => {
        cy.get('.table thead tr').should('contain', 'Questions:')
          .and('contain', 'Tags')
        cy.get('.actions .btn').should('contain', 'New Question')
      })

      //New Question - Short Text
      it('new question - short text', () => {
        const shortText = questionText('shortText')
        Cypress.env({"shortText":shortText})
        cy.server()
        cy.route('POST', '/questions').as('shortText')
        question('short text', shortText)
        cy.wait('@shortText').its('status').should('eq', 200)
      })

      //New Question- Long Text
      it('new question - long text', () => {
        const longText = questionText('longText')
        cy.log(longText)
        cy.server()
        cy.route('POST', '/questions').as('longText')
        question('long text', longText)
        cy.wait('@longText').its('status').should('eq', 200)
      })

      //New Question- Number
      it('new question - number', () => {
        const number = questionText('number')
        cy.log(number)
        cy.server()
        cy.route('POST', '/questions').as('number')
        question('number', number)
        cy.wait('@number').its('status').should('eq', 200)
      })

      //New Question- Image
      it('new question - image', () => {
        const image = questionText('image')
        cy.log(image)
        cy.server()
        cy.route('POST', '/questions').as('image')
        question('image', image)
        cy.wait('@image').its('status').should('eq', 200)
      })

      //New Question- Video
      it('new question - video', () => {
        const video = questionText('video')
        cy.log(video)
        cy.server()
        cy.route('POST', '/questions').as('video')
        question('video', video)
        cy.wait('@video').its('status').should('eq', 200)
      })

      //New Question- Select
      it('new question - select', () => {
        const select = questionText('select')
        cy.log(select)
        cy.server()
        cy.route('POST', '/questions').as('select')
        cy.get('.panels-sidebar-body .mb2 .btn-answerType.btn span').contains('select').click()
        cy.get('.panels-sidebar .panels-sidebar-body textarea').type(select)
        cy.get('.multipleOptionsEditor .multipleOptionItem .flex-1 input').type('option1')
        cy.get('.multipleOptionItem-add button').contains('Add new answer').click()
        cy.get('.multipleOptionsEditor div:nth-child(1) div:nth-child(2) div.flex-1 input').type('option2')
        cy.get('.px1 label').contains('Allow select multiple answers').click()
        cy.get('.saveQuestion button').contains('Save').click()
        cy.wait('@select').its('status').should('eq', 200)
      })

      //New Question- Slider
      it('new question - slider', () => {
        const slider = questionText('slider')
        cy.log(slider)
        cy.server()
        cy.route('POST', '/questions').as('slider')
        cy.get('.panels-sidebar-body .mb2 .btn-answerType.btn span').contains('slider').click()
        cy.get('.panels-sidebar .panels-sidebar-body textarea').type(slider)
        cy.get('.multipleOptionItem-add button').contains('Add new answer').click()
        cy.get('.multipleOptionsEditor .multipleOptionItem .flex-1 input').type('option1')
        cy.get('.multipleOptionItem-add button').contains('Add new answer').click()
        cy.get('.multipleOptionsEditor div:nth-child(1) div:nth-child(2) div.flex-1 input').type('option2')
        cy.get('.saveQuestion button').contains('Save').click()
        cy.wait('@slider').its('status').should('eq', 200)
      })

      //New Question- Select Image
      it('new question - select image', () => {
        const selectImage = questionText('selectImage')
        cy.log(selectImage)
        cy.server()
        cy.route('POST', '/questions').as('selectImage')
        cy.get('.panels-sidebar-body .mb2 .btn-answerType.btn span').contains('select image').click()
        cy.get('.panels-sidebar .panels-sidebar-body').find('textarea').type(selectImage, {force:true})
        cy.upload_image('../fixtures/thirsty.png', '#multipleOptionImage-upload')
        cy.get('.saveQuestion button').contains('Save').click()
      })

      //Verify the Question (Short text)
      it('question search', () => {
        cy.get('.master-phrase input').type(Cypress.env('shortText')).wait(500)
        cy.get('tbody .master-phrase span').contains(Cypress.env('shortText')).click()
        cy.get('.phrasingLabel.flex-1').should('contain', Cypress.env('shortText'))
      })
    })
})