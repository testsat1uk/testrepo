
describe('User Signup', () => {

    beforeEach(() => {
        cy.anonymous_token();
        cy.login_token();
    })

/**************************** NEGATIVE TESTS ****************************/

//Complete Signup - Not Logged in
    it('Complete Signup - Not Logged in', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/'+ Cypress.env('user_id')+ '/complete_signup',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('anon_token')
                },
                body:{
                       'user':{
                        'password': 'Kanishka27',
                        'password_confirmation': 'Kanishka27',
                        'referal_code': "1091450",
                        'email': 'satheesh@streetbees.com',
                        'date_of_birth': '1980-10-28'
                       }
                }
        })
        .then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message', 'User is not logged in');   
                expect(response.body).to.have.property('status', 'unauthorized'); 
        })
    })

//Complete Signup - Password Less Than 6 Characters
    it('Complete Signup - Password Less Than 6 Character', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/'+ Cypress.env('user_id')+ '/complete_signup',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                body:{
                       'user':{
                        'password': 'Kani',
                        'password_confirmation': 'Kanishka27$',
                        'email': 'satheesh@streetbees.com',
                       }
                }
        })
        .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body.data.errors.password[0]).to.eq('cannot be changed');   
        })
    })

/*/Complete Signup - Password Confirmation is Different: Password appears to be updated even Password & Password Confirmation do not match
    it('Complete Signup - Password Confirmation is Different', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/'+ Cypress.env('user_id')+ '/complete_signup',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                body:{
                       'user':{
                        'password': 'Kanishka27$',
                        'password_confirmation': 'Kanishka27',
                        'email': 'satheesh@streetbees.com',
                       }
                }
        })
        .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body.data.errors.password[0]).to.eq('cannot be changed');   
        })
    })*/

//Complete Signup - Invalid Email
    it('Complete Signup - Invalid Email', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/'+ Cypress.env('user_id')+ '/complete_signup',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                body:{
                       'user':{
                        'password': 'Kanishka27$',
                        'password_confirmation': 'Kanishka27$',
                        'email': 'satheesh@streetbees.com123',

                       }
                }
        })
        .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body.data.errors.email[0]).to.eq('cannot be changed');  
                expect(response.body).to.have.property('status', 'unprocessable_entity');
        })
    })

//Complete Signup - Invalid Referal Code
    it('Complete Signup - Invalid Referal Code', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/'+ Cypress.env('user_id')+ '/complete_signup',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                body:{
                       'user':{
                        'password': 'Kanishka27$',
                        'password_confirmation': 'Kanishka27$',
                        'email': 'satheesh@streetbees.com',
                        'referal_code': 'X99999X'

                       }
                }
        })
        .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body.data.errors.referal_code[0]).to.eq('cannot be changed');
                expect(response.body).to.have.property('status', 'unprocessable_entity');

        })
    })

//Verification Code - Invlid Verification Code
    it('Verification Code - Invlid Verification Code', () =>{
        cy
            .request({
                method:'GET',
                url:'v1/users/'+ Cypress.env('user_id') +'/verify',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                qs:{
                    'verification_code':310767
                }
        })
        .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body.data.errors.verification_code[0]).to.eq('is invalid');
                expect(response.body.data.errors.verification_code[1]).to.eq('already verified'); 
                expect(response.body).to.have.property('status', 'unprocessable_entity');

        })
    })

//Verification Code - Invlid Authentication Code
    it('Verification Code - Invlid Authentication Code', () =>{
        cy
            .request({
                method:'GET',
                url:'v1/users/'+ Cypress.env('user_id') +'/verify',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('anon_token')+'Test'
                },
                qs:{
                    'verification_code':310767
                }
        })
        .then((response) => {
                expect(response.status).to.eq(401);
                //expect(response.body.message).to.eq('message', 'Invalid Authorization')

        })
    })


//Verification Code - Invlid User Id
    it('Verification Code - Invlid User Id', () =>{
        cy
            .request({
                method:'GET',
                url:'v1/users/'+ 'X7' +'/verify',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('anon_token')
                },
                qs:{
                    'verification_code':310767
                }
        })
        .then((response) => {
                expect(response.status).to.eq(404);;
                expect(response.body).to.have.property('message', 'User was not found');
                expect(response.body).to.have.property('status', 'not_found');

        })
    })

/*/Verification Code - Expired Verification Code
    it('Verification Code - Expired Verification Code', () =>{
        cy
            .request({
                method:'GET',
                url:'v1/users/'+ Cypress.env('user_id') +'/verify',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                qs:{
                    'verification_code':782762
                }
        })
        .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body.data.errors.verification_code[0]).to.eq('is invalid');
                expect(response.body.data.errors.verification_code[1]).to.eq('already verified'); 
                expect(response.body).to.have.property('status', 'unprocessable_entity');

        })
    })*/

//Signup - Invalid Authorization Token
    it('Signup - Invalid Authorization Token', () => {
        cy
            .request({
                method:'POST',
                url:'v1/users/signup',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('anon_token')+'Test'
                },
                body:{
                    'user': {
                        'phone_number_country_code': 'GB',
                        'phone_number_prefix': '44',
                        'phone_number': Cypress.env('phone_number')
                    }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message','Invalid Authorization');
        })  
    })

//Signup - Invalid Phone Number
    it('Signup - Invalid Phone Number', () => {
        cy
            .request({
                method:'POST',
                url:'v1/users/signup',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('anon_token')
                },
                body:{
                    'user': {
                        'phone_number_country_code': 'GB',
                        'phone_number_prefix': '44',
                        'phone_number': 777777777
                    }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body.data.errors.phone_number[0]).to.eq('is invalid');
                expect(response.body).to.have.property('message', 'user phone number is invalid');
                expect(response.body).to.have.property('status', 'unprocessable_entity');
        })  
    })  


//Signup - Invalid Phone Number Prefix
    it('Signup - Invalid Phone Number Prefix', () => {
        cy
            .request({
                method:'POST',
                url:'v1/users/signup',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('anon_token')
                },
                body:{
                    'user': {
                        'phone_number_country_code': 'GB',
                        'phone_number_prefix': '999',
                        'phone_number': Cypress.env('phone_number')
                    }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body.data.errors.phone_number_country_code[0]).to.eq('is invalid for the given phone number prefix');
                expect(response.body).to.have.property('message', 'user phone number is invalid');
                expect(response.body).to.have.property('status', 'unprocessable_entity');
        })  
    })  

//Signup - Invalid Phone Number Country Code
    it('Signup - Invalid Phone Number Country Code', () => {
        cy
            .request({
                method:'POST',
                url:'v1/users/signup',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('anon_token')
                },
                body:{
                    'user': {
                        'phone_number_country_code': 'GB',
                        'phone_number_prefix': '999',
                        'phone_number': Cypress.env('phone_number')
                    }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body.data.errors.phone_number_country_code[0]).to.eq('is invalid for the given phone number prefix');
                expect(response.body).to.have.property('message', 'user phone number is invalid');
                expect(response.body).to.have.property('status', 'unprocessable_entity');
        })  
    })  

})

