/// <reference types="Cypress" />

describe('User - Answers', () => {

//Anonymous token, User Login Token, Refresh Token
    it('Anonymous token, User Login Token, User Refresh Token', () =>{
        cy.anonymous_token();
        cy.login_token();
        cy.submission_project_id();
    })


	//Submission - Answers 
    it('Submission - Answers', () => {
        cy
            .request({
                method:'GET',
                url:'v2/submissions/' + Cypress.env('submission_id')+'/answers',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                if(Array.isArray(response.body.data) && response.body.data.length>0){
                   expect(response.body.data[0]).not.to.be.empty;
                   Cypress.env({answer_id: response.body.data[0].id});
                   Cypress.env({question_id: response.body.data[0].question_id});
                }
                else
                    expect(response.body.data[0]).to.be.empty;
        })         
    })


//Submission - Answers with Page & Per_Page Parameter
    it('Submission - Answers (page, per_page)', () => {
        cy
            .request({
                method:'GET',
                url:'v2/submissions/' + Cypress.env('submission_id')+'/answers',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                qs:{
                    'page':1,
                    'per_page':25
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                if(Array.isArray(response.body.data) && response.body.data.length>0){
                   expect(response.body.data[0]).not.to.be.empty;
                   expect(response.body.meta).to.have.property('page', 1);
                   expect(response.body.meta).to.have.property('per_page', 25)
                }
                else
                    expect(response.body.data[0]).to.be.empty;
        })         
    })

//Submission - Update Answer
    it('Submission - Update Answer', () => {
        cy
            .request({
                method:'PUT',
                url:'v2/submissions/' + Cypress.env('submission_id')+'/answers/'+Cypress.env('answer_id'),
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'response_text':'Great'
                }

            })
            .then((response) => {
                expect(response.status).to.eq(200);
        })         
    })

/**************************** NEGATIVE TESTS ****************************/

//Answers - Invalid Authorization Code
    it('Answers - Invalid Authorization Code', () => {
        cy
            .request({
                method:'GET',
                url:'v2/submissions/' + Cypress.env('submission_id')+'/answers',
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

//Answers - User Not Logged In
    it('Answers - User Not Logged In', () => {
        cy
            .request({
                method:'GET',
                url:'v2/submissions/' + Cypress.env('submission_id')+'/answers',
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

//Answers - Submission Id Not Found
    it('Answers - Submission Id Not Found', () => {
        cy
            .request({
                method:'GET',
                url:'v2/submissions/' + Cypress.env('submission_id')+1+'/answers',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message', 'Submission not found for given submission id');
                expect(response.body).to.have.property('status', 'not_found');
        })         
    })

})