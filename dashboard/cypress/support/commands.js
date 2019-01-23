//import Cookies from 'js-cookie'
import endpoints from './endpoints'

Cypress.Commands.add("login", (client,dashboard) =>{
	const baseUrl = Cypress.env('api_url')
	const loginUrl = endpoints.login(client, dashboard)

	cy.request({
		method: 'POST',
		url: baseUrl + '/' + loginUrl,
		body:{
			user: {
				email: Cypress.env('userName'),
				password: Cypress.env('password')
			}
		}

	})
	.then((resp) => {
		const { body: { user } } = resp
		cy.setCookie('api-token', user.token)
	})
})


Cypress.Commands.add('visitDashboard', (client, dashboard, route) => {
	const apiBaseUrl = Cypress.env('api_url')
	const dashboardUrl = endpoints.project(client, dashboard)

	const apiUrl = apiBaseUrl + '/' + dashboardUrl
	//cy.log(apiUrl)
	let url = `${client}/${dashboard}`

	if (route) {
		url += '/' + route
	}

	//cy.log(url)
	cy.server()
	cy.route(apiUrl).as('dashboard')

	cy.visit(url)
	cy.wait('@dashboard')

	//Accept the popup
	cy.get('.CookiesPopup button').click()
	cy.wait(1000)
})

Cypress.Commands.add('waitAndAssertStatus', (alias, status) => {
	cy.wait(alias).its('status').should('eq', status)
})