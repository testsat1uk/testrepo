describe('User - Submissions', () => {

    beforeEach(() => {
        cy.anonymous_token();
        cy.login_token();
    })

	//All User Submissions
    it('User - All Submissions', () => {
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
                    Loop1: for (var i=0; i<response.body.data.length;i++){
                            if(response.body.data[i].status == 'final'){
                                Cypress.env({submission_id: response.body.data[i].id});
                                Cypress.env({project_id: response.body.data[i].project_id})
                                break Loop1;
                            } 
                        }
                if(Array.isArray(response.body.data) && response.body.data.length>0)
                   expect(response.body.data).not.to.be.empty;
                else
                    expect(response.body.data).to.be.empty;
        })         
    })

//Specific User Submission
    it('Specific Submission', () => {
        cy
            .request({
                method:'GET',
                url:'v3/submissions/' + Cypress.env('submission_id'),
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

//Poll Submission - POST /v1/polls/{poll_id}/submissions

//Project Submission - POST /v3/projects/{project_id}/submissions,  /v2/projects/{project_id}/submissions, POST /v1/projects/{project_id}/submissions

/*/Submission - Update
    it('Submission - Update', () => {
        cy
            .request({
                method:'PUT',
                url:'v3/submissions/' + Cypress.env('submission_id'),
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'submission':{
                        'status_event':'complete'
                    }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
        })         
    })*/

//Change Status of Submission - PUT /v3/submissions/{id}/resolve_conflict,  /v2/submissions/{id}/resolve_conflict


/**************************** NEGATIVE TESTS ****************************/

//All User Submissions
    it('User - All Submissions', () => {
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
                Loop1: for (var i=0; i<response.body.data.length;i++){
                        if(response.body.data[i].status === 'final'){
                                Cypress.env({submission_id: response.body.data[i].id});
                                Cypress.env({project_id: response.body.data[i].project_id})
                                break Loop1;
                            }
                    }
                //Cypress.env({submission_id: response.body.data[0].id})
                if(Array.isArray(response.body.data) && response.body.data.length>0)
                   expect(response.body.data).not.to.be.empty;
                else
                    expect(response.body.data).to.be.empty;
        })         
    })

//User Submissions - Invalid Authorization Code
    it('User Submissions - Invalid Authorization Code', () => {
        cy
            .request({
                method:'GET',
                url:'v3/users/me/submissions',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')+'Test'
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
        })         
    })

//Submission - User Not Logged In
    it('Submission - User Not Logged In', () => {
        cy
            .request({
                method:'GET',
                url:'v3/submissions/' + Cypress.env('submission_id'),
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')+'Test'
                }
            })
            .then((response) => {
            	cy.log(Cypress.env('submission_id')+1);
                expect(response.status).to.eq(401);
        })         
    })

//Submission - Not Found for Given Id
    it('Submission -  Not Found for Given Id', () => {
        cy
            .request({
                method:'GET',
                url:'v3/submissions/' + Cypress.env('submission_id')+1,
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message', 'Submission not found for given submission id');
                expect(response.body).to.have.property('status', 'not_found');

        })    
    })

//Update Submission - User Not Logged In
    it('Update Submission - User Not Logged In', () => {
        cy
            .request({
                method:'PUT',
                url:'v3/submissions/' + Cypress.env('submission_id'),
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('anon_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message', 'User is not logged in');   
           		expect(response.body).to.have.property('status', 'unauthorized');  

        })         
    })


//Update Submission - Not Found for Given Id
    it('Update Submission - Not Found for Given Id', () => {
        cy
            .request({
                method:'PUT',
                url:'v3/submissions/' + Cypress.env('submission_id')+1,
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('message', 'Submission not found for given submission id');   
           		expect(response.body).to.have.property('status', 'not_found');  

        })         
    })

//Submission - Update Already Completed
    it('Submission - Update Already Completed', () => {
        cy
            .request({
                method:'PUT',
                url:'v3/submissions/' + Cypress.env('submission_id'),
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+Cypress.env('login_token')
                },
                body:{
                    'submission':{
                        'status_event':'complete'
                    }
                }
            })
            .then((response) => {
                expect(response.status).to.eq(403);
                expect(response.body).to.have.property('message', 'User cannot change this Submission');   
           		expect(response.body).to.have.property('status', 'forbidden');  
        })         
    })


})