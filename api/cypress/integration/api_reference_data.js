
describe('Reference Data', () => {

    beforeEach(() => {
        cy.anonymous_token();
        cy.login_token();
    })

//Countries
    it('Countries', () => {
        cy
            .request({
                method:'GET',
                url:'v1/reference_data/countries',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.length.of.at.most(249);   
        })   
    })
    
//Languages
    it('Languages', () => {
        cy
            .request({
                method:'GET',
                url:'v1/reference_data/languages',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.length.of.at.most(185);
        })  
    })

})