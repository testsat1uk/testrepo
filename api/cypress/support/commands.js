// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// -- Anonymous User Token
Cypress.Commands.add('anonymous_token', () =>{
		cy
			.request({
				method:'GET',
				url:'v1/api/token',
				headers:{
					'content-type':'application/json',
					'accept':'application/json'
				},
				qs:{
					'application_key':Cypress.env('iOS_key'),
					'anon_user_id':Math.floor(100000 + Math.random() * 900000)
				}
			})
			.then((response) => {
 				Cypress.env({anon_token: response.body.data.token});
		})	
})

// -- User Login Token, User Id, User Refresh Token
Cypress.Commands.add('login_token', () =>{
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
                Cypress.env({login_token:response.body.data.token});
                Cypress.env({user_id:response.body.data.id});
                Cypress.env({refresh_token:response.body.data.refresh_token});
		})	
})

// -- User Submission Id, Project Id
Cypress.Commands.add('submission_project_id', () =>{
	    cy
            .request({
                method:'GET',
                url:'v3/users/me/submissions',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
            })
            .then((response) => {
                Loop1: for (var i=0; i<response.body.data.length;i++){
                            if(response.body.data[i].status == 'final'){
                                Cypress.env({submission_id: response.body.data[i].id});
                                Cypress.env({project_id: response.body.data[i].project_id})
                                break Loop1;
                            } 
                    }
        })
})









