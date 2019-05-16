//DASHLORD (DASHBOARD) COMMMANDS
import endpoints from './endpoints'

Cypress.Commands.add("login", (client,dashboard) =>{
	const baseUrl = Cypress.env('api_url')
	const loginUrl = endpoints.login(client, dashboard)

	cy.request({
		method: 'POST',
		url: baseUrl + '/' + loginUrl,
		body:{
			user: {
				email: Cypress.env('dl_userName'),
				password: Cypress.env('dl_password')
			}
		}

	})
	.then((resp) => {
		const { body: { user } } = resp
		cy.setCookie('api-token', user.token)
	})
})

Cypress.Commands.add('visitDashboard', (client, dashboard, route) => {
	const dlWeb_url = Cypress.env('dashlord_url')
	const apiBaseUrl = Cypress.env('api_url')
	const dashboardUrl = endpoints.project(client, dashboard)

	const apiUrl = apiBaseUrl + '/' + dashboardUrl
	//cy.log(apiUrl)
	let url = `/${client}/${dashboard}`

	if (route) {
		url += '/' + route
	}

	//cy.log(url)
	cy.server()
	cy.route(apiUrl).as('dashboard')

	cy.visit(dlWeb_url+url)
	cy.wait('@dashboard')

	//Accept the popup
	cy.get('.CookiesPopup button').click()
	cy.wait(1000)
})

Cypress.Commands.add('waitAndAssertStatus', (alias, status) => {
	cy.wait(alias).its('status').should('eq', status)
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
