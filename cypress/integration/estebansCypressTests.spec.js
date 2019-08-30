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
        cy.get("[data-cy-btn]:first")
        .click();

        //Assert if proper page load occured
        cy.get(".startPagesH2")
        .should("exist")
    });

    
    it("Rider login display username input box", () => {
        cy.get("[data-cy-btn]:first")
        .click();

        cy.get("[data-cy-btn]:first")
        .click();

        //Assert if proper page load occured
        cy.get("#rider-login-input-one")
        .should("exist")
    });

    it("Rider login display password input box", () => {
        cy.get("[data-cy-btn]:first")
        .click();

        cy.get("[data-cy-btn]:first")
        .click();

        //Assert if proper page load occured
        cy.get("#rider-login-input-two")
        .should("exist")
    });

    it("riderLogin with wrong username/no pass", () => {
        const wrongUsername = ";lkddajfda;slvhj";

        cy.get("[data-cy-btn]:first")
        .click();

        cy.get("[data-cy-btn]:first")
        .click();

        //Assert if proper page load occured
        cy.get("#rider-login-input-one")
        .type(wrongUsername)

        cy.get("#rider-login-button")
        .click();

        cy.wait(1000);
        //Should remain on page after incorrect login
        cy.get(".startPagesH2")
        .should("exist")
    })

  });