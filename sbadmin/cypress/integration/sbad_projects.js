function search(selector, name){
  cy.get(selector).type(name)
  cy.get('input[name="commit"]').click()
}

describe('Working with projects', () => {
	const userName = Cypress.env('admin_userName')
  const password = Cypress.env('admin_password')
	const url = Cypress.env('admin_url') + '/admins/sign_in'

  	beforeEach(() => {
      cy.server()
      cy.route('GET', '/projects').as('projects')
      cy.visit(url).wait(500)
      cy.get('body').then(($body) => {
        if($body.text().includes('Hello, world!')){
          cy.logout()
        }
      })
      cy.adlogin(userName,password)
      cy.menuItem('Projects')
      cy.wait('@projects').its('status').should('eq', 200)
  	})

  	context('create project, update - questions, question flow etc', () => {
      //New Project - Single Submission
  		it('new project - single submission', () => {
        cy.newProject('Single Submission', '#react-select-3--value .Select-input')
      })
        
     //Search by Project Name
        it('search by project name', () => {
          search('input#q_name_cont', Cypress.env('proj_name'))
          cy.get('table.table tbody tr').each(($tr) => {
            cy.wrap($tr).invoke('show').find('td').eq(5).contains(Cypress.env('proj_name'))
            cy.wait(500)
          })
      })

     //Search by Project Code
      it('search by project code', () => {
        search('input#q_code_cont',Cypress.env('proj_code'))
        cy.get('table.table tbody tr').first().find('td').eq(3).contains(Cypress.env('proj_code'))
      })

      //Search by Internal Ref
      it('search by project internal ref', () => {
        search('input#q_internal_ref_cont', Cypress.env('internal_ref'))
        cy.get('table.table tbody tr').first().find('td').eq(4).contains(Cypress.env('internal_ref'))
      })

      //Update Project
      it('update project', () => {
        cy.server()
        cy.route('GET', '/projects/*/edit').as('projEdit')
        search('input#q_name_cont', Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })
        cy.get('input#project_summary').type(', Be realistic')
          .should('have.value', 'Tell us more about your habits!, Be realistic')
        cy.get('input#project_prize_description').type('iPad').should('have.value', 'iPad')
        cy.get('button#project-save-button').click()
        cy.wait('@projEdit').its('status').should('eq', 200)
        cy.get('table.table tbody>tr:nth-child(1)').invoke('show')
          .find('td').eq(5).contains(Cypress.env('proj_name'))
      })

      //Project - Add Location
      it('project - add location', () => {
        cy.server()
        cy.route('GET', '/projects/*/edit').as('projEdit')
        search('input#q_name_cont',Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })
        cy.get('button.btn-sm').click()
        cy.get('.modal-body .form-group:nth-child(1)>input').type('Gallows Corner Tesco')
        cy.get('.modal-body .form-group:nth-child(2)>input').type('Romfor Tesco store')
        cy.get('.modal-body > div:nth-child(3) input[type="checkbox"]').click()
        cy.get('.modal-body .col-md-6>input').type('2')
        cy.chooseReactSelectOption('.modal-body .col-md-6:nth-child(2) .Select-control','GBP', 'GBP (£)')
        cy.get('.modal-footer:first button.btn-primary').click()
        cy.get('button#project-save-button').click()
        cy.wait('@projEdit').its('status').should('eq', 200)
      })

      //Project - Add Translation
      it('project - add translation', () => {
        cy.server()
        cy.route('GET', '/projects/*/edit').as('projEdit')
        search('input#q_name_cont',Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })
        cy.chooseReactSelectOption('#locations-area>div:nth-child(3) div.form-group','Spanish', 'es | Spanish')
        cy.get('button#project-save-button').click()
        cy.wait('@projEdit').its('status').should('eq', 200)
      })

      //Project - Open Translations
      it('project - open translations', () => {
        cy.server()
        cy.route('GET', '/projects/*/edit').as('projEdit')
        search('input#q_name_cont',Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })
        cy.get('button#translate').click()

        cy.get('div.modal-body table.table:nth-child(1)>tbody').within(($td) => {
          cy.get('tr:nth-child(1) td>input').type('név testProject855')
          cy.get('tr:nth-child(2) td>input').type('összefoglalás Mondjon el többet a szokásairól !, Legyen reális')
          cy.get('tr:nth-child(3) td>input').type('leírás Mondjon el többet a szokásairól!')
          cy.get('tr:nth-child(4) td>input').type('prize_description iPad')
        })

          cy.get('div.modal-body table.table:nth-child(2)>tbody').within(($td) => {
          cy.get('tr:nth-child(1) td>input').type('név Gallows Corner Tesco')
          cy.get('tr:nth-child(2) td>input').type('részletek Romfor Tesco áruház')
        })

        cy.get('div.modal-footer>button').contains('Close').click()
        cy.get('button#project-save-button').click()
        cy.wait('@projEdit').its('status').should('eq', 200)
      })

      //Project - Add Dependent Projects
      it('add dependent project', () => {
        cy.server()
        cy.route('GET', '/projects/*/edit').as('projEdit')
        search('input#q_name_cont',Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })
        cy.chooseReactSelectOption('.col-md-12 #details>div .Select:nth-child(1) .Select-control',
                  'Complete', 'Complete Any')
        cy.get('.col-md-12 #details>div .Select:nth-child(2) .Select-control input').first().click({ force: true })
          .type(' ', { force: true }).get('.Select-menu-outer').first().click();
        cy.get('button#project-save-button').click()
        cy.wait('@projEdit').its('status').should('eq', 200)
      })

      //Project - Add Experiments
      it('add experiments', () => {
        cy.server()
        cy.route('GET', '/projects/*/edit').as('projEdit')
        search('input#q_name_cont',Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })
        cy.chooseReactSelectOption('.col-md-12 #locations-area>div:nth-child(2) .Select-control',
                  'exp', 'exp')  
        cy.get('button#project-save-button').click({force:true})
        cy.wait('@projEdit').its('status').should('eq', 200)
      })

      //Questions - Add Question
      it('questions - add question', () => {
        cy.log(Cypress.env('proj_name'))
        search('input#q_name_cont', Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })
        cy.get('.page-header .nav-tabs').within(($li) => {
          cy.get('li>a').contains('Questions').click()
          })      

        var question = 'what'
        cy.get('.add-question-item-actions button:nth-child(1)').contains('Question').click()
        cy.get('.searchQuestionInput input').first().type(question).wait(500)
        cy.get('.iconButton').contains('Keyword').click()
        cy.get('.searchQuestionList').first().within(($li) => {
          cy.get('.questionResult').find('button').contains('Use').click({force:true})
          cy.wait(500)
        })    
      })

      //Question Set
      it('question set', () => {
        const qset = 'qset' + Math.floor(Math.random()*1000)
        cy.log(qset)
        cy.server()
        cy.route('GET', '/question_sets*').as('questSet')
        cy.menuItem('Question Sets')
        cy.wait('@questSet').its('status').should('eq', 200)
        cy.get('.actions .btn').contains('New Set').click()
        cy.questionSet(qset)
        cy.menuItem('Projects')
        search('input#q_name_cont',Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })
        cy.get('.page-header .nav-tabs').within(($li) => {
          cy.get('li>a').contains('Questions').click().wait(500)
        }) 
        cy.get('.add-question-item .add-question-item-actions').first().trigger('mouseover')
          .find('button').contains('Question Set').click({force:true})
        cy.log(qset)
        cy.get('.searchQuestionInput input').type(qset+'{enter}')

        cy.get('.searchQuestionList .p2:nth-child(1)').within(($li) => {
          cy.get('.questionSetResult').find('button').contains('Use').click({force:true})
          cy.wait(500)
        })    
      })     

      //Questions - Add Instruction
      it('questions - add instruction', () => {
        cy.server()
        cy.route('POST', '/questions*').as('questions')
        cy.route('POST', '/phrases*').as('phrases')
        search('input#q_name_cont',Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })

        cy.get('.page-header .nav-tabs').within(($li) => {
          cy.get('li>a').contains('Questions').click()
          })      
        var instruction = 'Hello welcome back!'
        cy.get('.add-question-item > .add-question-item-actions').first().trigger('mouseover').first()
          .find('button').contains('Instruction').focus().trigger('click')
        cy.get('.notranslate>div>div')
          .first().find('div').type(instruction)
        cy.get('.instruction-form div>button.btn').contains('Save').click()
        cy.wait('@questions').its('status').should('eq', 200)
        cy.wait('@phrases').its('status').should('eq', 201)
        cy.get('.instruction-form .right-align .btn').should('be.visible')
        cy.get('.instruction-form div.draft-editor').should('contain', instruction)
      })

      //Questions - Add Image
      it('questions - add image', () => {
        cy.server()
        cy.route('GET', '/projects/*/edit').as('edit')
        cy.route('GET', '/projects/*/questions').as('question')
        cy.route('GET', '/projects/*/survey_items').as('si')
        cy.route('GET', '/projects/*/locations').as('location')
        search('input#q_name_cont',Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })

        cy.get('.page-header .nav-tabs').within(($li) => {
          cy.get('li>a').contains('Questions').click().wait(500)
          }) 
        cy.get('.add-question-item .add-question-item-actions').first().trigger('mouseover')
          .find('button').contains('Image').click({force:true})
        cy.upload_image('../fixtures/thirsty.png', '#question-upload')        
        cy.get('.video-form .right-align button').contains('Save').click({force:true})
        cy.wait('@edit').its('status').should('eq', 200)
        cy.wait('@question').its('status').should('eq', 200)
        cy.wait('@si').its('status').should('eq', 200)
        cy.wait('@location').its('status').should('eq', 200)
      })  

      //Question Flow
      it('question flow', () => {
        search('input#q_name_cont',Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })
        cy.get('.page-header .nav-tabs').within(($li) => {
          cy.get('li>a').contains('Question Flow').click().wait(500)
        }) 
        cy.get('input').contains('Reset Question Flow').first().click()
        cy.get('.swal2-actions button.swal2-confirm').click()  
      })  

      //Translations Summary
      it('translations summary', () => {
        search('input#q_name_cont',Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })
        cy.get('.page-header .nav-tabs').within(($li) => {
          cy.get('li>a').contains('Translations Summary').click().wait(500)
        }) 
        cy.get('tfoot tr.cypherLinks').should('contain', 'Cypher') 
      })    

      //Share
      it('share', () => {
        search('input#q_name_cont',Cypress.env('proj_name'))
        cy.get('table.table tbody tr').within(($td) => {
          cy.get('td>a').contains('Edit').click()
        })
        cy.get('.page-header .nav-tabs').within(($li) => {
          cy.get('li>a').contains('Share').click().wait(500)
        }) 
        cy.get('.admin_share_survey_bar').should('contain', 'Survey Link:') 
        cy.get('.admin_share_survey_bar').should('contain', 'Survey Code:') 
      })   
    })
})