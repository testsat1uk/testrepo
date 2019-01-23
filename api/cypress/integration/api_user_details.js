/// <reference types="Cypress" />

describe('User Details - Get, Update', () => {

//Anonymous Token
	it('Anonymous Token', () => {
		cy.anonymous_token();
		cy.login_token();
	})

//User - Verify Accepted Consents
    it('Verify User Accepted Consents', () => {
        cy
            .request({
                method:'GET',
                url:'v1/users/me/check',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization': 'Bearer ' + Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('status', 'success');
                expect(response.body.data).to.have.property('token_status', 'normal_bee');

        })  
    })

//Current User Details
    it('User Details', () =>{
        cy
            .request({
                method:'GET',
                url:'v1/users/me',
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.data).to.have.property('country', 'GB');
            expect(response.body.data.id).to.eq(Cypress.env('user_id'));
            expect(response.body.data.phone_number).to.eq(Cypress.env('phone_number'));
        })
    })

//Update Current User
    it('Update User', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/me',
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'first_name':'Satheesh',
                        'last_name':'Chintala',
                        'country':'GB',
                        'language':'en',
                        'email':'satheesh@streetbees.com',
                        'paypal_email':'satish_c99@yahoo.com',
                        'avatar_url':'eu-west-1:d4ac9cef-1f87-42b4-8675-a2e09be70172/profile.jpg'
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.data.id).to.eq(Cypress.env('user_id'));
        })
    })

//User Earnings and Tasks Summary
    it('User Summary - Earnings & Tasks', () =>{
        cy
            .request({
                method:'GET',
                url:'v1/users/me/summary',
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.data).to.have.property('payout_currency','GBP');
            expect(response.body.data).to.have.property('payout_currency_symbol','£');        
        })
    })

//User Consents
    it('User Consents', () =>{
        cy
            .request({
                method:'POST',
                url:'v1/users/consents/bulk',
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'consents':[{
                        'code':'terms_and_conditions',
                        'status':'agreed'
                    },
                    {
                        'code':'privacy_policy',
                        'status':'agreed'
                    },
                    {
                        'code':'phone_number',
                        'status':'agreed'
                    },
                    {
                        'code':'email',
                        'status':'not agreed'
                    }]
                }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.data).to.have.length.of.at.most(4);
            expect(response.body.data[0]).to.have.property('code', 'email');
            expect(response.body.data[0]).to.have.property('status', 'rejected');
        })
    })

//User Assets Token
    it('Check User Token', () =>{
        cy
            .request({
                method:'GET',
                url:'v1/users/assets_token',
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body.data.token).to.exist;
            expect(response.body.data.expires_at).to.exist;
            expect(response.body.data.identity_id).to.exist;
            expect(response.body.message).to.be.empty;

        })
    })
      
//User - New Authorization Token
    it('Existing User - New Authorization Token', () => {
        cy
            .request({
                method:'POST',
                url:'v1/users/refresh',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'refresh_token': Cypress.env('refresh_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('status','success');
        })  
    })  

//User - Authorization Token For Push Notifications
    it('User - Authorization Token For Push Notifications', () => {
        cy
            .request({
                method:'POST',
                url:'v1/users/authorization_token',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'authorization_token':{
                        'provider': 'firebase',
                        'token': 'token',
                        'platform': 'ios'
                    }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('status','success');
                Cypress.env({puh_token: response.body.data.token})
        })  
    })  

/**************************** NEGATIVE TESTS ****************************/

//Current User Details - User Not Logged in
        it('Current User Details - User Not Logged in', () =>{
        cy
            .request({
                method:'GET',
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

//Update Current User - Not Logged In
    it('Update Current User - Not Logged In', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/me',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('anon_token')
                },
                body:{
                    'user':{
                        'first_name':'Satheesh',
                        'last_name':'Chintala',
                        'country':'GB',
                        'language':'en',
                        'email':'satheesh@streetbees.com',
                        'paypal_email':'satish_c99@yahoo.com',
                        'avatar_url':'eu-west-1:d4ac9cef-1f87-42b4-8675-a2e09be70172/profile.jpg'
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('message', 'User is not logged in');   
            expect(response.body).to.have.property('status', 'unauthorized'); 
        })
    })

//Update Current User - Invalid Authorization Token
    it('Update Current User - Invalid Authorization Token', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/me',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('anon_token')
                },
                body:{
                    'user':{
                        'first_name':'Satheesh',
                        'last_name':'Chintala',
                        'country':'GB',
                        'language':'en',
                        'email':'satheesh@streetbees.com',
                        'paypal_email':'satish_c99@yahoo.com',
                        'avatar_url':'eu-west-1:d4ac9cef-1f87-42b4-8675-a2e09be70172/profile.jpg'
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('message', 'User is not logged in');   
            expect(response.body).to.have.property('status', 'unauthorized'); 
        })
    })

//Update Current User - Gender
    it('Update Current User - Gender', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/me',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'gender':'female'
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body).to.have.property('status', 'unprocessable_entity'); 
            expect(response.body.data.errors.gender[0]).to.eq('cannot be changed'); 
        })
    })

//Update Current User - Invalid Paypal Email
    it('Update Current User - Invalid Paypal Email', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/me',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'paypal_email':'satish_c99@yahoo.com12',
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body).to.have.property('status', 'unprocessable_entity'); 
            expect(response.body.data.errors.paypal_email[0]).to.eq('is invalid');  
        })
    })

//Update Current User - Invalid Email
    it('Update Current User - Invalid Email', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/me',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'email':'satheesh@streetbees.com12',
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body).to.have.property('status', 'unprocessable_entity'); 
            expect(response.body.data.errors.email[0]).to.eq('is invalid'); 
        })
    })

//Update Current User - Date of Birth
    it('Update Current User - Date of Birth', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/me',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'date_of_birth':'18-11-1976',
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body).to.have.property('status', 'unprocessable_entity'); 
            expect(response.body.data.errors.date_of_birth[0]).to.eq('cannot be changed');  
        })
    })

//Update Current User - Password
    it('Update Current User - Password', () =>{
        cy
            .request({
                method:'PUT',
                url:'v1/users/me',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'user':{
                        'password':'Kani',
                    }
                }
        })
        .then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body).to.have.property('status', 'unprocessable_entity'); 
            expect(response.body.data.errors.password[0]).to.eq('is too short (minimum is 6 characters)');  
        })
    })

//User Earnings and Tasks Summary - User Not Logged In
    it('User Summary - User Not Logged In', () =>{
        cy
            .request({
                method:'GET',
                url:'v1/users/me/summary',
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

//User Earnings and Tasks Summary - Invalid Authorization Token
    it('User Summary - Invalid Authorization Token', () =>{
        cy
            .request({
                method:'GET',
                url:'v1/users/me/summary',
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

//New Authorization Token - Invalid Refresh Token
    it('Existing User - New Authorization Token', () => {
        cy
            .request({
                method:'POST',
                url:'v1/users/refresh',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{'refresh_token': 'Test'}
            })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('message','invalid refresh_token');
                expect(response.body).to.have.property('status','bad_request');
        })  
    })  
    
//Authorization Token For Push Notifications - User Not Logged In
    it('Authorization Token For Push Notifications - User Not Logged In', () => {
        cy
            .request({
                method:'POST',
                url:'v1/users/authorization_token',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('anon_token')
                },
                body:{
                    'provider': 'firebase',
                    'token': 'token007',
                    'platform': 'ios'
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message', 'User is not logged in');   
                expect(response.body).to.have.property('status', 'unauthorized'); 
        })  
    })

//Assets Token - User Not Logged In
    it('Assets Token - User Not Logged In', () =>{
        cy
            .request({
                method:'GET',
                url:'v1/users/assets_token',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')+'Test'
                }
        })
        .then((response) => {
                expect(response.status).to.eq(401);
                //expect(response.message).to.eq('Invalid Authorization');  
        })
    })

})