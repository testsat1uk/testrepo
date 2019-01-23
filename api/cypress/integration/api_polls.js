/// <reference types="Cypress" />

describe('User - Polls', () => {

//Anonymous token, User Login Token, Refresh Token
    it('Anonymous token, User Login Token, User Refresh Token, Submission Id, Project Id', () =>{
        cy.anonymous_token();
        cy.login_token();
        cy.submission_project_id();
    })

/*/Polls  - Id
    it('Polls - Id', () => {
        cy
            .request({
                method:'GET',
                url:'v1/polls/' + Cypress.env('poll_id'),
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
        })         
    })*/


    //Polls - Invalid Authorization Code
    it('Polls - Invalid Authorization Code', () => {
        cy
            .request({
                method:'GET',
                url:'v1/polls/' + Cypress.env('project_id'),
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')+'Test'
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
        })         
    })

/*/Polls - Not Found For the Given Id
    it('Poll - Not Found For the Given Id', () => {
        cy
            .request({
                method:'GET',
                url:'v1/polls/' + Cypress.env('project_id')+1,
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(404);
        })         
    })*/
})