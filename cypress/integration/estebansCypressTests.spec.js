describe ('Rider Login and Signup', () => {
    
    beforeEach(() => {
        cy.visit("localhost:3000/login");
    });

    it("Loads all both login and signup buttons", () => {
        cy.get("[data-cy-btn]")
        .should("exist")
        .should("have.length", 2);
    });

    //Check for button click and page load

    it("Click on rider login button", () => {
        cy.get("#rider-login-button")
        .click();

        //Assert if proper page load occured
        cy.get("#rider-login-h2-title")
        .should("exist")
    });

  });