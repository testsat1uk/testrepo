
describe('Projects', () => {

    beforeEach(() => {
        cy.anonymous_token();
        cy.login_token();
        cy.project_submissions();
    })

//Projects - User Geolocation (V5)
    it('Projects - User Geolocation (V5)', () => {
        cy
            .request({
                method:'GET',
                url:'v5/projects/' + Cypress.env('proj_id'),
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                
                if(Array.isArray(response.body.data.questions) && response.body.data.questions.length>0){
                   expect(response.body.data.questions[0]).not.to.be.empty;
                   Cypress.env({question_id: response.body.data.questions[0].id});
                }
                else
                    expect(response.body.data[0]).to.be.empty;
        })         
    })

//Projects - User Geolocation (V4)
    it('Projects - User Geolocation (V4)', () => {
        cy
            .request({
                method:'GET',
                url:'v4/projects/' + Cypress.env('proj_id'),
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                
                if(Array.isArray(response.body.data.questions) && response.body.data.questions.length>0){
                   expect(response.body.data.questions[0]).not.to.be.empty;
                }
                else
                    expect(response.body.data[0]).to.be.empty;
        })         
    })

//Projects - User Geolocation (V3)
    it('Projects - User Geolocation (V3)', () => {
        cy
            .request({
                method:'GET',
                url:'v3/projects/' + Cypress.env('proj_id'),
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                
                if(Array.isArray(response.body.data.questions) && response.body.data.questions.length>0){
                   expect(response.body.data.questions[0]).not.to.be.empty;
                }
                else
                    expect(response.body.data[0]).to.be.empty;
        })         
    })

//Projects - User Geolocation (V2)
    it('Projects - User Geolocation (V2)', () => {
        cy
            .request({
                method:'GET',
                url:'v2/projects/' + Cypress.env('proj_id'),
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                
                if(Array.isArray(response.body.data.questions) && response.body.data.questions.length>0){
                   expect(response.body.data.questions[0]).not.to.be.empty;
                }
                else
                    expect(response.body.data[0]).to.be.empty;
        })         
    })

//Projects - User Geolocation (V1)
    it('Projects - User Geolocation (V1)', () => { 
        cy
            .request({
                method:'GET',
                url:'v1/projects/' + Cypress.env('proj_id'),
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                
                if(Array.isArray(response.body.data.questions) && response.body.data.questions.length>0){
                   expect(response.body.data.questions[0]).not.to.be.empty;
                }
                else
                    expect(response.body.data[0]).to.be.empty;
        })         
    })

//Projects - Chart Image URL for answers of a Question and Project
    it('Projects - Chart Image URL', () => {
        cy
            .request({
                method:'GET',
                url:'v1/projects/' + Cypress.env('proj_id') + '/questions/' 
                        + Cypress.env('surey_item_id') + '/chart',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.image.url).not.to.be.empty
                expect(response.body.data.image.url).to.contain('https://charts.streetbees.com/i/');
        })         
    })

//Projects - Chart Image URL for answers of a Survey Item and Project
    it('Projects - Survey Item - Chart Image URL', () => {
        cy
            .request({
                method:'GET',
                url:'v1/projects/' + Cypress.env('proj_id') + '/survey_items/' 
                        + Cypress.env('surey_item_id') + '/chart',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.image.url).not.to.be.empty
                expect(response.body.data.image.url).to.contain('https://charts.streetbees.com/i/');
        })         
    })

/**************************** NEGATIVE TESTS ****************************/

//Projects - Invalid Authorization Code
    it('Projects - Invalid Authorization Code', () => {
        cy
            .request({
                method:'GET',
                url:'v5/projects/' + Cypress.env('proj_id'),
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')+'Test'
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
        })         
    })

//Projects - Not Found for Given Id
    it('Projects - User Can\'t Access', () => {
        cy
            .request({
                method:'GET',
                url:'v5/projects/' + Cypress.env('proj_id')+1,
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message', 'Project not found for given project id');   
           		expect(response.body).to.have.property('status', 'not_found');  

        })         
    })


//Chart Image URL - Question Not Found for Given Id
    it('Chart Image URL - Question Not Found for Given Id', () => {
        cy
            .request({
                method:'GET',
                url:'v1/projects/' + Cypress.env('proj_id') + '/questions' + '/1/chart',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message', 'Question not found for given question id');   
           		expect(response.body).to.have.property('status', 'not_found');  
        })         
    })

//Chart Image URL - Invalid Authorization Code
    it('Chart Image URL - Invalid Authorization Code', () => {
        cy
            .request({
                method:'GET',
                url:'v1/projects/' + Cypress.env('proj_id') + '/questions' + '/1/chart',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')+'Test'
                },
                qs:{
                    'lat': Cypress.env('lon_latitue'),
                    'lng': Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
        })         
    })
})