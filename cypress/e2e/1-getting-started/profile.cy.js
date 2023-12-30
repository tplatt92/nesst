describe("profile page", () => {

    beforeEach(() => {
      //This is the URL of the deployed application we want to test
      cy.visit("http://nesst.vercel.app");
    });
  
    it("navigates to profile page", () => {
      //This is checking for the login button and clicking it
    cy.contains(/log in/i).click();
    // This is checking for the new URL to include /login
    cy.url().should("include", "/login");
    // This is checking for the email and password fields and typing into them
    cy.get("#email").type("gavin.yip89@gmail.com");
    cy.get("#password").type("TestAccount");
    // This is checking for the form and submitting it
    cy.get("form").submit();
    // This is checking for the new URL to include /explore
    cy.url().should("include", "/explore");
    // This is checking for the profile button and clicking it
    cy.contains(/profile/i).click();
    // This is checking for the new URL to include /profile 
    cy.url().should("include", "/profile");
    });

    it("tests the user can edit their details", () => {
      //This block of code logs into the user
      cy.contains(/log in/i).click();
      cy.get("#email").type("gavin.yip89@gmail.com");
      cy.get("#password").type("TestAccount");
      cy.get("form").submit();
      //This navigates to the profile page
      cy.contains(/profile/i).click();
      //This is clicking on the edit profile button (which is an icon hence the class name)
      cy.get('svg.w-10.h-12').click();
      cy.url().should("include", "/profile/edit");
      //This will target the input for email and check that its the correct email
      cy.get('#email').should('have.value', "gavin.yip89@gmail.com");
      //This is making sure the page has loaded before continuing
      cy.get('#firstName').should('be.visible');
      //This is waiting for 1 second to make sure the form loads and does not repeat data
      cy.wait(1000);
      //This is filling in the name field
      cy.get('#firstName')
      .clear()
      .type("Gavin");
      //This will target the input for last name and enter a last name
      cy.get('#lastName')
      .clear()
      .type("Yip");
      cy.get('#username')
      .clear()
      .type("gavinyip");
      cy.get('#bio')
      .clear()
      .type("I am a software engineer looking for a nest!");
      cy.get('#nationality')
      .clear()
      .type("British");
      cy.get('#occupation')
      .clear()
      .type("Software Engineer");
      cy.get('#hobbies')
      .clear()
      .type("Cricket Player");
      cy.get('#Location')
      .clear()
      .type("London");
      cy.get('#languages')
      .clear()
      .type("English");
      cy.get('#personality_type')
      .clear()
      .type("Defensive");
      cy.get('#star_sign')
      .clear()
      .type("Cancer");
      //This is clicking the update button
      cy.contains(/update/i).click();
      //This is checking all the data is on the page
      cy.contains('Gavin Yip').should('be.visible');
      cy.contains('gavinyip').should('be.visible');
      cy.contains('British').should('be.visible');
      cy.contains('Software Engineer').should('be.visible');
      cy.contains('Defensive').should('be.visible');
      cy.contains('Cancer').should('be.visible');
      cy.contains("I am a software engineer looking for a nest!").should('be.visible');
    });

  });

  