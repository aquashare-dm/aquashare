describe('Input form', () => {
    it('focuses on form when loaded', () => {
        cy.visit('http://localhost:3000/create-request')

        cy.focused()
            .should('have.class', 'ui labeled input labeledInputBox')
    })
    it('accepts input', () => {
        const typedText = "1"
        cy.visit('http://localhost:3000/create-request')
        cy.get('.ui labeled input labeledInputBox')
            .type(typedText)
            .should('have.value', typedText)
    })

})

describe('Create ride request', () => {
    beforeEach(() => {
        cy.visit("localhost:3000/create-request");
    });

    it("Loads create a request page", () => {
        cy.get("mapRightCont")
            .should("exist")
    });

    it("Click on create a request button", () => {
        cy.get("ui inverted blue button")
            .click();
        cy.get("./rider-dashboard/ride-requests")
            .should("exist")

    })
})

describe('Form Submission', () => {
    it('Creates a new ride request', () => {
        cy.get('.ui inverted blue button')
            .type('{enter}')
    })
})