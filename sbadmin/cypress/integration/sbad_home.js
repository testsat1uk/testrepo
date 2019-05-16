describe('Working with home', () => {
	const userName = Cypress.env('admin_userName')
  	const password = Cypress.env('admin_password')
  	const url = Cypress.env('admin_url')

  	beforeEach(() => {
      cy.visit(url)
      cy.get('body').then(($body) => {
        if($body.text().includes('Hello, world!')){
          cy.logout()
        }
      })
      cy.adlogin(userName,password)
      cy.wait(500)
  	})

  	context('verify main menu, links', () => {
      //Page Header
      it('verify the header', () => {
        var menu = ['Users management', 'Projects management', 'System management']
        cy.get('div#navbar').should('be.visible')
        cy.get('div#navbar ul.nav').first().get('li.dropdown').each(($li,i) => {
          cy.wrap($li).should('be.visible').and('contain', menu[i])
          cy.wait(500)
        })
        cy.get('a[href="/experiments"]').should('contain', 'Experiments').and('be.visible')
        cy.get('a[href="/posts"]').should('contain', 'Posts').and('be.visible')
      })

      //User Management - Users
      it('user management - users', () => {
        cy.server()
        cy.route('GET', '/users').as('users')
        cy.menuItem('Users')
        cy.wait('@users').its('status').should('eq', 200)
        cy.get('table.table').should('be.visible')
        cy.get('form.user_search').should('be.visible')
      })

      //User Management - Admins
      it('user management - admins', () => {
        cy.server()
        cy.route('GET', '/admins').as('admins')
        cy.menuItem('Admins')
        cy.wait('@admins').its('status').should('eq', 200)
        cy.get('a[href="/admins/new"]').should('be.visible')
        cy.get('table.table').should('be.visible')
      })

      //Project Management - Projects
      it('project management - projects', () => {
        cy.server()
        cy.route('GET', '/projects').as('projects')
        cy.menuItem('Projects')
        cy.wait('@projects').its('status').should('eq', 200)
        cy.get('form.form-inline').should('be.visible')
        cy.get('table.table').should('be.visible')
      })

      //Project Management - Questions
      it('project management - questions', () => {
        cy.server()
        cy.route('GET', '/questions').as('questions')
        cy.menuItem('Questions')
        cy.wait('@questions').its('status').should('eq', 200)
        cy.get('ul.nav-tabs').should('be.visible')
        cy.get('table.table').should('be.visible')
      })

      //Project Management - Question Sets
      it('project management - question sets', () => {
        cy.server()
        cy.route('GET', '/question_sets').as('qsets')
        cy.menuItem('Question Sets')
        cy.wait('@qsets').its('status').should('eq', 200)
        cy.get('ul.nav-tabs').should('be.visible')
        cy.get('table.table').should('be.visible')
      })

      //Project Management - Country Configurations
      it('project management - country configurations', () => {
        cy.server()
        cy.route('GET', '/country_configurations').as('country')
        cy.menuItem('Country Configurations')
        cy.wait('@country').its('status').should('eq', 200)
        cy.get('a[href="/country_configurations/new"]').contains('New Country Configuration').should('be.visible')
        cy.get('table.table').should('be.visible')
      })

      //Project Management - Archive 
      it('project management - archive', () => {
        cy.server()
        cy.route('GET', '/projects/archive').as('archive')
        cy.menuItem('Archive')
        cy.wait('@archive').its('status').should('eq', 200)
        cy.get('a[href="/projects/new"]').contains('New Project').should('be.visible')
        cy.get('a#open-export-for-payment-modal-link').contains('Export for paymen').should('be.visible')
        cy.get('form#project_search').should('be.visible')
      })

      //Project Management - Statistics
      it('project management - statistics', () => {
        cy.server()
        cy.route('GET', '/statistics').as('statistics')
        cy.menuItem('Statistics')
        cy.wait('@statistics').its('status').should('eq', 200)
        cy.get('form.simple_form.attributes').contains('Start date').should('be.visible')
      })

      //Project Management - Experiments
      it('project management - experiments', () => {
        cy.server()
        cy.route('GET', '/experiments').as('experiments')
        cy.mainMenu('Experiments')
        cy.wait('@experiments').its('status').should('eq', 200)
        cy.get('button.btn').contains('New Experiment').should('be.visible')
      })

      //Project Management - Posts
      it('project management - posts', () => {
        cy.server()
        cy.route('GET', '/posts').as('posts')
        cy.mainMenu('Posts')
        cy.wait('@posts').its('status').should('eq', 200)
        cy.get('button.btn').contains('New post').should('be.visible')
      })

      //System Management - Roles & Permissions
      it('system management - roles & permissions', () => {
        cy.server()
        cy.route('GET', '/system/roles_x_authorisation').as('permissions')
        cy.menuItem('Roles & Permissions')
        cy.wait('@permissions').its('status').should('eq', 200)
        cy.get('.panel-body span').contains('GOD').should('be.visible')
      })

      //Logout
      it('logout', () => {
        cy.get('a.logout').should('be.visible').click()
        cy.url().should('include', '/admins/sign_in')
      })


    })
})
