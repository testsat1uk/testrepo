/// <reference types="Cypress" />

describe('Projects - User Location', () => {

//Anonymous token, User Login Token, Refresh Token
    it('Anonymous token, User Login Token, User Refresh Token, Submission Id, Project Id', () =>{
        cy.anonymous_token();
        cy.login_token();
        cy.submission_project_id();
    })


//Project Location List 
    it('Projects - User Location', () => {
        cy
            .request({
                method:'GET',
                url:'v1/projects/' + Cypress.env('project_id') +'/locations',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                if(Array.isArray(response.body.data) && response.body.data.length>0)
                   expect(response.body.data[0]).not.to.be.empty;
                else
                    expect(response.body.data[0]).to.be.empty;
        })         
    })

/**************************** NEGATIVE TESTS ****************************/

//Project Location - User Not Logged In 
    it('Project Locations - User Not Logged In', () => {
        cy
            .request({
                method:'GET',
                url:'v1/projects/' + Cypress.env('project_id') +'/locations',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('anon_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message', 'User is not logged in');   
           		expect(response.body).to.have.property('status', 'unauthorized');  

        })         
    })

//Project Location - Invalid Authorization Code
    it('Project Locations - Invalid Authorization Code', () => {
        cy
            .request({
                method:'GET',
                url:'v1/projects/' + Cypress.env('project_id') +'/locations',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')+'Test'
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401); 
        })         
    })

//Project Location - Project Not Found For the Given Id
    it('Project Locations - Project Not Found', () => {
        cy
            .request({
                method:'GET',
                url:'v1/projects/' + Cypress.env('project_id') +1 +'/locations',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(404); 
                expect(response.body).to.have.property('message', 'Project not found for given project id');   
           		expect(response.body).to.have.property('status', 'not_found'); 
        })         
    })

})