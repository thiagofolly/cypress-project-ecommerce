/// <reference types="cypress" />

var Chance = require('chance')
var chance = new Chance()

describe('Create New User', () => {
    it('When fill the form and submit, then the user must be created', () => {
        var email = chance.email()
        var firstName = chance.first()
        var lastName = chance.last()



        cy.visit('http://automationpractice.com/')

        cy.get('div a[class="login"]')
            .should('be.visible')
            .click()

        cy.url().should('contain', 'my-account')

        cy.get('input#email_create')
            .should('be.visible')
            .type(email)

        cy.get('button#SubmitCreate')
            .should('be.visible')
            .click()
        cy.wait(5000)
        cy.url().should('contain', 'account-creation')
        cy.get('input#email').should('have.value', email)

        cy.get(`input#id_gender${chance.integer({ min: 1, max: 2 })}`).check()
        cy.get('input#customer_firstname').type(firstName)
        cy.get('input#customer_lastname').type(lastName)
        cy.get('input#passwd').type(chance.word({ length: 5 }))
        cy.get('select#days').select(chance.integer({ min: 1, max: 28 }))
        cy.get('select#months').select(chance.month())
        cy.get('select#years').select(chance.year({ min: 1900, max: 2022 }))
        cy.get('input#newsletter').check()
        cy.get('input#optin').check()
        cy.get('input#firstname').should('have.value', firstName)
        cy.get('input#lastname').should('have.value', lastName)
        cy.get('input#company').type(chance.sentence({ words: 3 }))
        cy.get('input#address1').type(chance.street())
        cy.get('input#address2').type(chance.province())
        cy.get('input#city').type(chance.city())
        cy.get('select#id_state').select(chance.integer({ min: 1, max: 50 }))
        cy.get('input#postcode').type(chance.zip())
        cy.get('select#id_country').type('United States')
        cy.get('textarea#other').type(chance.sentence({ words: 10 }))
        cy.get('input#phone').type(chance.phone({ country: 'us' }))
        cy.get('input#phone_mobile').type(chance.phone({ country: 'us', mobile: true }))
        cy.get('input#alias').clear().type(chance.address())
        cy.get('button#submitAccount')
            .should('be.visible')
            .click()
        cy.url().should('contain', 'my-account')
    });
});