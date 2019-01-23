/// <reference types="Cypress"/>
describe('User - Login', () => {

//Anonymous Token
	it('Anonymous Token', () => {
		cy.anonymous_token();
	})

//User - Login (V2)
	it('Login - V2', () => {
		cy
			.request({
				method:'POST',
				url:'v2/users/login',
				headers:{
					'content-type':'application/json',
					'accept':'application/json',
					'authorization': 'Bearer ' + Cypress.env('anon_token')
				},
				body:{
					  'user': {
    							'phone_number_country_code': 'GB',
    							'phone_number_prefix': '44',
   					            'phone_number': Cypress.env('phone_number'),
   								'password': Cypress.env('password')
  							}
				}
			})
			.then((response) => {
 				expect(response.status).to.eq(200);
 				expect(response.body).to.have.property('status','success');
 				expect(response.body.data).to.have.property('email','satheesh@streetbees.com');
                Cypress.env({login_token:response.body.data.token});
                Cypress.env({user_id:response.body.data.id});
                Cypress.env({refresh_token:response.body.data.refresh_token});
		})	
	})

//User - Login (V1)
    it('Login (V1)', () => {
        cy
            .request({
                method:'POST',
                url:'v1/users/login',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization': 'Bearer ' + Cypress.env('anon_token')
                },
                body:{
                      'user': {
                                'phone_number_country_code': 'GB',
                                'phone_number_prefix': '44',
                                'phone_number': Cypress.env('phone_number'),
                                'password': Cypress.env('password')
                            }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('status','success');
                expect(response.body.data).to.have.property('email','satheesh@streetbees.com');
                Cypress.env({login_token:response.body.data.token});
                Cypress.env({user_id:response.body.data.id});
                Cypress.env({refresh_token:response.body.data.refresh_token});
        })  
    })

//Login - Wrong Anonymous Token
    it('Login - Wrong Anonymous Token', () => {
        cy
            .request({
                method:'POST',
                url:'v2/users/login',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization': 'Bearer ' + Cypress.env('anon_token')+'Test'
                },
                body:{
                      'user': {
                                'phone_number_country_code': 'GB',
                                'phone_number_prefix': '44',
                                'phone_number': Cypress.env('phone_number'),
                                'password': Cypress.env('password')
                            }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message','Invalid Authorization');
        })  
    })

//Login - Inactive Phone Number?
    it('Login - Inactive Phone Number?', () => {
        cy
            .request({
                method:'POST',
                url:'v2/users/login',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization': 'Bearer ' + Cypress.env('anon_token')
                },
                body:{
                      'user': {
                                'phone_number_country_code': 'GB',
                                'phone_number_prefix': '44',
                                'phone_number': 7795467630,
                                'password': Cypress.env('password')
                            }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message','This phone number has not been activated for our new system. Please go to Get Started to re-activate your account.');
                expect(response.body).to.have.property('status', 'not_found')
        })  
    })

//Login - Unregistered Phone Number/ User Didn't Complete the Signup?
    it('Login - Unregistered Phone Number / User Didn\'t Complete the Signup?', () => {
        cy
            .request({
                method:'POST',
                url:'v2/users/login',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization': 'Bearer ' + Cypress.env('anon_token')
                },
                body:{
                      'user': {
                                'phone_number_country_code': 'GB',
                                'phone_number_prefix': '44',
                                'phone_number': 7777777777,
                                'password': Cypress.env('password')
                            }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(403);
                expect(response.body).to.have.property('message','This login cannot be performed because the user has not completed signup');
                expect(response.body).to.have.property('status', 'forbidden')
        })  
    })

//Login - Invalid Phone number
    it('Login - Unregistered Phone Number / User Didn\'t Complete the Signup?', () => {
        cy
            .request({
                method:'POST',
                url:'v2/users/login',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization': 'Bearer ' + Cypress.env('anon_token')
                },
                body:{
                      'user': {
                                'phone_number_country_code': 'GB',
                                'phone_number_prefix': '44',
                                'phone_number': 777777777,
                                'password': Cypress.env('password')
                            }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body).to.have.property('message','user phone number is invalid');
                expect(response.body).to.have.property('status', 'unprocessable_entity')
        })  
    })

//Login - Wrong Password
    it('Login - Wrong Password', () => {
        cy
            .request({
                method:'POST',
                url:'v2/users/login',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization': 'Bearer ' + Cypress.env('anon_token')
                },
                body:{
                      'user': {
                                'phone_number_country_code': 'GB',
                                'phone_number_prefix': '44',
                                'phone_number': Cypress.env('phone_number'),
                                'password': 'Kanishka'
                            }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body).to.have.property('message','user');
                expect(response.body).to.have.property('status','unprocessable_entity');
                expect(response.body.data.errors.password[0]).to.eq('Invalid login details. Please try again.');    
                expect(response.body.data.errors.phone_number[0]).to.eq('Invalid login details. Please try again.');
        })  
    })

//Login - Password Less Than 6 Characters
    it('Login - Password Less Than 6 Characters', () => {
        cy
            .request({
                method:'POST',
                url:'v2/users/login',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization': 'Bearer ' + Cypress.env('anon_token')
                },
                body:{
                      'user': {
                                'phone_number_country_code': 'GB',
                                'phone_number_prefix': '44',
                                'phone_number': Cypress.env('phone_number'),
                                'password': 'Kani'
                            }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body).to.have.property('message','user');
                expect(response.body).to.have.property('status','unprocessable_entity');
                expect(response.body.data.errors.password[0]).to.eq('Invalid login details. Please try again.');    
                expect(response.body.data.errors.phone_number[0]).to.eq('Invalid login details. Please try again.');    
        })  
    })


//Login - Invalid Phone Number Prefix
    it('Login - Invalid Phone Number Prefix', () => {
        cy
            .request({
                method:'POST',
                url:'v2/users/login',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization': 'Bearer ' + Cypress.env('anon_token')
                },
                body:{
                      'user': {
                                'phone_number_country_code': 'GB',
                                'phone_number_prefix': 999,
                                'phone_number': Cypress.env('phone_number'),
                                'password': Cypress.env('password')
                            }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body).to.have.property('message','user phone number is invalid');
                expect(response.body).to.have.property('status','unprocessable_entity');
                expect(response.body.data.errors.phone_number_country_code[0]).to.eq('is invalid for the given phone number prefix');   
                expect(response.body.data.errors.phone_number[0]).to.eq('is invalid');  
        })  
    })

//Login - Invalid Phone Number Country Code
    it('Login - Invalid Phone Number Country Code', () => {
        cy
            .request({
                method:'POST',
                url:'v2/users/login',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization': 'Bearer ' + Cypress.env('anon_token')
                },
                body:{
                      'user': {
                                'phone_number_country_code': 'FR',
                                'phone_number_prefix': 44,
                                'phone_number': Cypress.env('phone_number'),
                                'password': Cypress.env('password')
                            }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(422);
                expect(response.body).to.have.property('message','user phone number is invalid');
                expect(response.body).to.have.property('status','unprocessable_entity');
                expect(response.body.data.errors.phone_number_country_code[0]).to.eq('is invalid for the given phone number prefix');       
            })  
    })

})