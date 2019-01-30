
describe('User - Activities', () => {
//Anonymous token, User Login Token, Refresh Token
    it('Anonymous token, User Login Token, User Refresh Token, Submission Id, Project Id', () =>{
        cy.anonymous_token();
        cy.login_token();
        cy.submission_project_id();
    })

//User Activities
    it('User - Activities', () => {
        cy
            .request({
                method:'GET',
                url:'v1/activities',
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



})