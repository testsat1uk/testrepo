
describe('Recover Password', () => {

    beforeEach(() => {
        cy.anonymous_token();
        cy.login_token();
    })

//Recover Password
    it('Recover Password', () =>{
        cy
            .request({
                method:'POST',
                url:'v1/users/recover_password',
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'phone_number_country_code':'GB',
                        'phone_number_prefix':'44',
                        'phone_number':Cypress.env('phone_number')
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status', 'success');
        })
    })


/**************************** NEGATIVE TESTS ****************************/

//Recover Password - Invalid Autorization Token
    it('Recover Password - Invalid Autorization Token', () =>{
        cy
            .request({
                method:'POST',
                url:'v1/users/recover_password',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')+'Test'
                },
                body:{
                    'user':{
                        'phone_number_country_code':'GB',
                        'phone_number_prefix':'44',
                        'phone_number':Cypress.env('phone_number')
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('message', 'Invalid Authorization');
        })
    })

//Recover Password - Invalid Phone Number
    it('Recover Password - Invalid Phone Number', () =>{
        cy
            .request({
                method:'POST',
                url:'v1/users/recover_password',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'phone_number_country_code':'GB',
                        'phone_number_prefix':'44',
                        'phone_number':7777777777
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body).to.have.property('message', 'This login cannot be performed because the user has not completed signup');
            expect(response.body).to.have.property('status', 'forbidden');
        })
    })

//Recover Password - Unregistered Phone Number
    it('Recover Password - Unregistered Phone Number', () =>{
        cy
            .request({
                method:'POST',
                url:'v1/users/recover_password',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'phone_number_country_code':'GB',
                        'phone_number_prefix':'44',
                        'phone_number':7795467637
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', 'phone number not registered');
            expect(response.body).to.have.property('status', 'not_found');
        })

    })

//Recover Password - Incomplete Signup 
    it('Recover Password - Incomplete Signup', () =>{
        cy
            .request({
                method:'POST',
                url:'v1/users/recover_password',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'phone_number_country_code':'GB',
                        'phone_number_prefix':'44',
                        'phone_number':7795467635
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body).to.have.property('message', 'This login cannot be performed because the user has not completed signup');
            expect(response.body).to.have.property('status', 'forbidden');
        })
    })

//Recover Password - Invalid Phone Number Country Code
    it('Recover Password - Invalid Phone Number Country Code', () =>{
        cy
            .request({
                method:'POST',
                url:'v1/users/recover_password',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'phone_number_country_code':'FR',
                        'phone_number_prefix':'44',
                        'phone_number':Cypress.env('phone_number')
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body).to.have.property('message', 'user phone number is invalid');
            expect(response.body).to.have.property('status', 'unprocessable_entity');
            expect(response.body.data.errors.phone_number_country_code[0]).to.eq('is invalid for the given phone number prefix');       
            })  
        })

    //Recover Password - Invalid Phone Number Prefix
    it('Recover Password - Invalid Phone Number Prefix', () =>{
        cy
            .request({
                method:'POST',
                url:'v1/users/recover_password',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'phone_number_country_code':'GB',
                        'phone_number_prefix':'999',
                        'phone_number':Cypress.env('phone_number')
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body).to.have.property('message', 'user phone number is invalid');
            expect(response.body).to.have.property('status', 'unprocessable_entity');
            expect(response.body.data.errors.phone_number_country_code[0]).to.eq('is invalid for the given phone number prefix');   
            expect(response.body.data.errors.phone_number[0]).to.eq('is invalid');      
            })  
        })

})