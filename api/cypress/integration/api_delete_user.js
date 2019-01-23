/// <reference types="Cypress" />

describe('Delete User', () => {

//Anonymous Token
	it('Anonymous Token, Login Token, Refresh Token', () => {
		cy.anonymous_token();
		cy.login_token();
	})


/**************************** NEGATIVE TESTS ****************************/

//Delete - User Not Logged In
    it('Delete - User Not Logged In', () =>{
        cy
            .request({
                method:'DELETE',
                url:'v1/users/me',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('anon_token')
                }
        })
        .then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('message', 'User is not logged in');   
            expect(response.body).to.have.property('status', 'unauthorized'); 
        })
    })

//Delete - Invalid Authorization Token
    it('Delete - Invalid Authorization Token', () =>{
        cy
            .request({
                method:'DELETE',
                url:'v1/users/me',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')+'Test'
                }
        })
        .then((response) => {
            expect(response.status).to.eq(401);
            //expect(response.message).to.eq('Invalid Authorization');    
        })
    })

})