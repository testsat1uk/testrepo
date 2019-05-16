//STREETBEES ADMIN
Cypress.Commands.add('adlogin', (userName, password) => {
	cy.get('input#admin_email').type(userName)
	cy.get('input#admin_password').type(password)
	cy.get('input[type="submit"]').click()
})

Cypress.Commands.add('logout', () => {
    cy.get('a.logout').should('be.visible').click()
    cy.url().should('include', '/admins/sign_in')
})

Cypress.Commands.add('menuItem', (option) => {
    cy.get('ul.dropdown-menu li a').should('contain', option).contains(option)
      .click({force:true})
    cy.wait(500)
})

Cypress.Commands.add('mainMenu', (option) => {
    cy.get('ul.nav li a').should('contain', option).contains(option)
      .click({force:true})
    cy.wait(500)
})

Cypress.Commands.add('projectSearch', (name) => {
          cy.get('input#q_name_cont').type(name)
          cy.get('input[name="commit"]').click()
})

//Archive Project
Cypress.Commands.add('archive', () => {
        cy.newProject('Single Submission', '#react-select-3--value .Select-input')
        cy.projectSearch(Cypress.env('proj_name'))
        cy.get('.table tbody tr').eq(0).find('td').contains('Archive').click()
})

Cypress.Commands.add("projCode", (selector, text, option) => {
  cy
    .get(`${selector} input`)
    .first()
    .click({ force: true })
    .type(text, { force: true })
    .get('.select2-results__options')
    .contains(option)
    .click()
})

Cypress.Commands.add("chooseCode", (selector, text) => {
  cy
    .get(`${selector} input`)
    .first()
    .click({ force: true })
    .type(text + '{enter}', {force:true})
})

Cypress.Commands.add("questionSet", (name) =>{
    cy.server()
    cy.route('POST', '/question_sets').as('qsets')
    cy.get('.questionsSearchList-header .searchQuestionInput input').type('how {enter}')
    cy.get('.p2 .questionResult').find('button').first().click({force:true})
    cy.get('.questionsSearchList-actions button').contains('Save').click()
    cy.wait("@qsets").its('status').should('eq', 200)
    cy.get('.questionsSearchList-header .searchQuestionInput input').type('what {enter}')
    cy.get('.p2 .questionResult').find('button').first().click({force:true})
    cy.get('.questionsSearchList-actions button').contains('Save').click()
    cy.get('.panels-sidebar-header input').click().clear().type(name)
    cy.get('.questionsSearchList-actions button').contains('Save').click()
})

Cypress.Commands.add('newProject', (projType, selector) => {
        cy.server()
        cy.route('GET', '/projects/new').as('new')
        cy.get('a[href="/projects/new"]').should('be.visible').click()
        cy.get('div.col-md-12').first().should('be.visible')

        const proj_name = 'project' + Math.floor(Math.random()*10000)//Date.now()
        Cypress.env({'proj_name': proj_name})
        const slug = 'slug' + Math.floor(Math.random()*10000)
        Cypress.env({'slug': slug})
        const proj_code = 'TCODE018' 
        Cypress.env({'proj_code': proj_code})
        const internal_ref = 'Launch Wildflower'
        Cypress.env({'internal_ref': internal_ref})

        cy.get('input#project_name').should('be.visible').type(proj_name)
        cy.get('input#project_slug').should('be.visible').type(slug)
        cy.get('input#project_summary').should('be.visible').type('Tell us more about your habits!')
        cy.get('textarea#project_description').should('be.visible').type('Tell us more about your habits!')
        cy.get('input#project_high_priority').should('be.visible').click()
        cy.chooseCode('#react-select-2--value .Select-input', proj_code)
        cy.get('input#project_internal_ref').should('be.visible').type('Launch Wildflower')
        cy.chooseReactSelectOption(selector, projType, projType)

        cy.upload_image('../fixtures/thirsty.png', 'input#project_image')
        cy.get('input#project_duration_time').type('3')
        cy.get('input#project_restricted_clients').first().click()
        cy.get('button#project-save-button').click()
        cy.wait('@new').its('status').should('eq', 200)
        cy.get('.alert').should('contain', 'Project was successfully created')
        cy.get('table.table tbody>tr').eq(0).find('td').eq(5).should('be.visible').and('contain', proj_name)
        cy.get('table.table tbody>tr').eq(0).find('td').eq(3).should('be.visible').and('contain', proj_code)
        cy.get('table.table tbody>tr').eq(0).find('td').eq(4).should('be.visible').and('contain', internal_ref)
})
       
//FILE UPLOAD
Cypress.Commands.add('upload_file', (fileName, selector) => {
    return cy.get(selector).then(subject => {
        return cy.fixture(fileName, 'base64')
        .then(Cypress.Blob.base64StringToBlob)
        .then(blob => {
            const el = subject[0]
            const testFile = new File([blob], fileName, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            const dataTransfer = new DataTransfer()
            dataTransfer.items.add(testFile)
            el.files = dataTransfer.files
            return subject;
        })
    })
})

//IMAGE UPLOAD
Cypress.Commands.add('upload_image', (fileUrl, selector) => {
    return cy.get(selector).then(subject => {
      return cy
        .fixture(fileUrl, 'base64')
        .then(Cypress.Blob.base64StringToBlob)
        .then(blob => {
          return cy.window().then(win => {
            const el = subject[0]
            const nameSegments = fileUrl.split('/')
            const name = nameSegments[nameSegments.length - 1]
            const testFile = new win.File([blob], name, {type:'image/png'})
            const dataTransfer = new DataTransfer()
            dataTransfer.items.add(testFile)
            el.files = dataTransfer.files
            return subject
        	})
        })
    })
})

//REACT SELECT
Cypress.Commands.add("chooseReactSelectOption", (selector, text, option) => {
  cy
    .get(`${selector} input`)
    .first()
    .click({ force: true })
    .type(text, { force: true })
    .get('.Select-menu-outer')
    .contains(option)
    .click();
})

Cypress.Commands.add("scrollMacro", (navText, elementId, offset) => {
      cy
        .contains('.searchQuestionList', navText)
        .click({force:true})
        .wait(1200)
        .contains('.searchQuestionList', navText).parent().should('have.class', 'questionsSearchList-body')
        .get(elementId).then ((ele) => {
        	cy
            .get('body').should('have.prop', 'scrollTop').and('equal', ele[0].offsetTop - offset)
        })   
})

