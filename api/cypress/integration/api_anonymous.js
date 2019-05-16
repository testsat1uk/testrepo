
describe('Anonymous User', () => {

//Anonymous User - Authorization Token
	it('Anonymous User - Authorization Token', () => {
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
 				expect(response.status).to.eq(200);
 				expect(response.body).to.have.property('status','success');
 				expect(response.body).to.have.property('message','');
 				Cypress.env({anon_token: response.body.data.token});
		})	
	})

/**************************** NEGATIVE TESTS ****************************/

//Anonymous User Token - Wrong Applcation_Key
    it('Anonymous User Token - Wrong Applcation_Key', () => {
        cy
            .request({
                method:'GET',
                url:'v1/api/token',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json'
                },
                qs:{
                    'application_key':Cypress.env('android_key')+'Test',
                    'anon_user_id':Math.floor(100000 + Math.random() * 900000)
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message', 'invalid application_key');
                expect(response.body).to.have.property('status', 'unauthorized');

        })  
    })

})