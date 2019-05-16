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


//B2C APIs COMMANDS
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

//User - Cards in Progress
Cypress.Commands.add('progressCard', () => {
        cy
            .request({
                method:'GET',
                url:'v7/cards',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                },
                qs:{
                    'lat':Cypress.env('lon_latitue'),
                    'lng':Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                if(Array.isArray(response.body.data) && response.body.data.length>0)
                {
                    expect(response.body.data).not.to.be.empty;
                    Loop1: for (var i=0; i<response.body.data.length;i++){
                            if(response.body.data[i].project.user_submission.status == 'progress'){
                                cy.log(response.body.data[i].project.user_submission.id)
                                Cypress.env({progress_submission_id: response.body.data[i].project.user_submission.id});
                                Cypress.env({progress_project_id: response.body.data[i].project_id})
                                break Loop1;
                            } 
                        }
                }
                else
                    expect(response.body.data).to.be.empty;
            })         
    })

// Project id, Chart Survey Item Id
Cypress.Commands.add('project_submissions', () => {

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
            expect(response.status).to.eq(200);
            if(Array.isArray(response.body.data) && response.body.data.length>0)
                Loop1: for (var i=0; i<response.body.data.length;i++){
                    Cypress.env({proj_id: response.body.data[i].project_id})
                    Cypress.env({submission_id: response.body.data[i].id})
                    cy.log(response.body.data[i].project_id)
                    cy.log(response.body.data[i].id)
                    cy
                        .request({
                            method:'GET',
                            url:'v2/submissions/' + response.body.data[i].id +'/answers',
                            headers:{
                                'content-type':'application/json',
                                'accept':'application/json',
                                'authorization':'Bearer '+Cypress.env('login_token')
                            }
                        })
                        .then((response) => {
                            expect(response.status).to.eq(200);
                            if(Array.isArray(response.body.data) && response.body.data.length>0){
                                Loop2: for (var i=0;i<response.body.data.length;i++){
                                    if (response.body.data[i].response_type == 'radio' || response.body.data[i].response_type == 'checkbox'){
                                        Cypress.env({surey_item_id: response.body.data[i].survey_item_id})
                                        Cypress.env({question_id: response.body.data[i].question_id})
                                        break Loop2;
                                    }
                                }
                            }
                            else
                                expect(response.body.data[0]).to.be.empty;
                        })  
                        break Loop1;                       
            }
            else
                expect(response.body.data).to.be.empty;
        })         

})


