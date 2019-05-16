

describe('User - Activities', () => {

    beforeEach(() => {
        cy.anonymous_token();
        cy.login_token();
        cy.project_submissions();
    })

///User Activities
    it('User - Activities', () => {
        const query = `query AllHistory {
                submissions(first: 50, status:[draft, reserved, progress, ineligible, incomplete, completed, resubmit,
                not_approved, unpaid, final, resign]) {
                    id,
                    status,
                    payoutValue,
                    payoutCurrency,
                    project {
                        id,
                        name,
                        forPayment
                    },
                    rejectReason,
                    createdAt,
                    userPayoutCurrencyValue
        }}`;
        cy
            .request({
                method:'POST',
                url:'/graphql',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    'Authorization':'Bearer '+ Cypress.env('login_token')
                },
                body:{ query }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                if(Array.isArray(response.body.data.submissions) && response.body.data.submissions.length>0){
                    expect(response.body.data.submissions).not.to.be.empty;
                }
                else
                    expect(response.body.data.submissions).to.be.empty;
            })         
    })

/**************************** NEGATIVE TESTS ****************************/

//User Activities
    it('User - Activities', () => {
        const query = `query AllHistory {
                submissions(first: 50, status:[incomplete]) {
                    id,
                    status,
                    payoutValue,
                    payoutCurrency,
                    project {
                        id,
                        name,
                        forPayment
                    },
                    rejectReason,
                    createdAt,
                    userPayoutCurrencyValue
        }}`;
        cy
            .request({
                method:'POST',
                url:'/graphql',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    'Authorization':'Bearer '+ Cypress.env('login_token')+'Test'
                },
                body:{ query },
                failOnStatusCode:false
            })
            .then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message', 'Invalid Authorization');
            })                
    })




})