/// <reference types="Cypress" />


describe('Cards - User, Geolocation', () => {

//Anonymous token, User Login Token, Refresh Token
    it('Anonymous token, User Login Token, User Refresh Token', () =>{
        cy.anonymous_token();
        cy.login_token();
    })

//User - All Available Cards
    it('User - All Available Cards (V7)', () => {
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
                    Cypress.env({card_id: response.body.data[0].uid});
                }
                else
                    expect(response.body.data).to.be.empty;
            })         
    })

/*/Card - Hide (Update Visibility to False)
    it('User - Hide Card', () => {
        cy

            .request({
                method:'POST',
                url:'v1/cards/'+ Cypress.env('card_id')+'/hide',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
        })         
    })


//Card - Show (Update Visibility to True)
    it('User - Show Card', () => {
        cy

            .request({
                method:'POST',
                url:'v1/cards/'+ Cypress.env('card_id')+'/show',
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
        })         
    })

*/

//User - All Available (V6)
    it('User - All Available Cards (V6)', () => {
        cy

            .request({
                method:'GET',
                url:'v6/cards',
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
                }
                else
                    expect(response.body.data).to.be.empty;
            })         
    })

//User - All Available (V5)
    it('User - All Available Cards (V5)', () => {
        cy

            .request({
                method:'GET',
                url:'v5/cards',
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
                }
                else
                    expect(response.body.data).to.be.empty;
            })         
    })


//User - All Available (V4)
    it('User - All Available Cards (V4)', () => {
        cy

            .request({
                method:'GET',
                url:'v4/cards',
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
                }
                else
                    expect(response.body.data).to.be.empty;
            })         
    })


//User - All Available (V3)
    it('User - All Available Cards (V3)', () => {
        cy

            .request({
                method:'GET',
                url:'v3/cards',
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
                }
                else
                    expect(response.body.data).to.be.empty;
            })         
    })


//User - All Available (V2)
    it('User - All Available Cards (V2)', () => {
        cy

            .request({
                method:'GET',
                url:'v2/cards',
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
                }
                else
                    expect(response.body.data).to.be.empty;
            })         
    })


//User - All Available (V1)
    it('User - All Available Cards (V1)', () => {
        cy

            .request({
                method:'GET',
                url:'v1/cards',
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
                }
                else
                    expect(response.body.data).to.be.empty;
            })         
    })

    /**************************** NEGATIVE TESTS ****************************/

//Cards - User Not Logged In
    it('Cards - User Not Logged In', () => {
        cy

            .request({
                method:'GET',
                url:'v7/cards',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+ Cypress.env('anon_token')
                },
                qs:{
                    'lat':Cypress.env('lon_latitue'),
                    'lng':Cypress.env('lon_longitude')
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
                expect(response.body).to.have.property('message', 'User is not logged in');
                expect(response.body).to.have.property('status', 'unauthorized');
        })         
    })

//Hide Card - Invalid Authorization Code
    it('Hide Card - Invalid Authorization Code', () => {
        cy

            .request({
                method:'POST',
                url:'v1/cards/'+ Cypress.env('card_id')+'/hide',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')+'Test'
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
        })         
    })

//Show Card - Invalid Authorization Code
    it('Show Card - Invalid Authorization Code', () => {
        cy

            .request({
                method:'POST',
                url:'v1/cards/'+ Cypress.env('card_id')+'/show',
                failOnStatusCode:false,
                headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'authorization':'Bearer '+ Cypress.env('login_token')+'Test'
                }
            })
            .then((response) => {
                expect(response.status).to.eq(401);
        })         
    })


})