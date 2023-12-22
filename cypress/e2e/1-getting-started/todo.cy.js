describe("site renders", () => {
  beforeEach(() => {
    cy.visit("https://nesst.vercel.app/");
  });

  it("click the login button", () => {
    cy.get("h1").should("contain", "NESST");
    cy.contains(/log in/i).click();
    cy.url().should("include", "/login");

    cy.get("#email").type("gavin.yip89@gmail.com");
    cy.get("#password").type("TestAccount");
    cy.get("form").submit();
    cy.url().should("include", "/explore");
  });
});
