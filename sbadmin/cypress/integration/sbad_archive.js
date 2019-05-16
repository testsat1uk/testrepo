function archive() {
    cy.newProject('Single Submission', '#react-select-3--value .Select-input')
    cy.menuItem('Projects')
    cy.get('.table tbody tr').eq(0).find('td').contains('Archive').click()
}

function tickProject(){
    cy.get('.table tbody tr:first').find('td input').click()
    cy.get('#open_bulk_actions_modal_link').should('be.enabled').click()
}

describe('Working with archive/unarchive', () => {
	const userName = Cypress.env('admin_userName')
  const password = Cypress.env('admin_password')
	const url = Cypress.env('admin_url') + '/admins/sign_in'

  	beforeEach(() => {
      cy.visit(url).wait(500)
      cy.server()
      cy.route('GET', '/projects/archive').as('arcList')
      cy.get('body').then(($body) => {
        if($body.text().includes('Hello, world!')){
          cy.logout()
        }
      })
      cy.adlogin(userName,password)
      cy.menuItem('Archive')
  	})

  	context('Archive', () => {
      //Archive 
      it('archive', () => {
        archive()
        cy.get('.alert').should('contain', 'Project was archived.')
      })

      //Archive Projects List
      it('archived list', () => {
        cy.get('.page-header').should('contain', 'Archived projects').and('contain', 'total:')
          .and('contain', 'Bulk actions').and('contain', 'Export for payment').and('contain', 'New Project')
      })

      //Bulk Actions -Unarchive
      it('bulk actions - unarchive', () => {
        cy.server()
        cy.route('POST', '/projects/unarchive').as('unarchive')
        tickProject()
        cy.get('select#project_bulk_action_event').select('Unarchive')
        cy.get('.modal-footer button span').contains('OK').click()
        cy.wait('@unarchive').its('status').should('eq', 200)
        cy.get('.alert').should('contain', 'Projects were successfully unarchived.')
      })

      //Bulk Actions - Export Submissions
      it('bulk actions - export submissions', () => {
        cy.server()
        cy.route('POST', '/projects/export_submissions').as('export')
        cy.menuItem('Projects')
        archive()
        cy.menuItem('Archive')
        tickProject()
        cy.get('select#project_bulk_action_event').select('export_submissions')
        cy.get('.modal-footer button span').contains('OK').click()
        cy.wait('@export').its('status').should('eq', 200)
        cy.get('.alert').should('contain', 'Working on the export, check the exports area for the status.')
      })

      //Bulk Actions - Export for Logging Tasks
      it('bulk actions - export for logging tasks', () => {
        cy.server()
        cy.route('POST', '/projects/export_submissions_statuses').as('tasks')
        tickProject()
        cy.get('select#project_bulk_action_event').select('export_submissions_statuses')
        cy.get('.modal-footer button span').contains('OK').click()
        cy.wait('@tasks').its('status').should('eq', 200)
        cy.get('.alert').should('contain', 'Working on the export, check your email in a couple of minutes.')
      })

      //Unarchive a Project
      it('unarchive project', () => {
        cy.get('.table tbody tr:first').find('td').contains('Unarchive').click()
        cy.get('.alert').should('contain', 'Project was unarchived.')
      })
    })
})