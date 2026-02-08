it("Can login", () => {
  cy.visit("/");

  cy.findByTestId("username").type(Cypress.expose("STANDARD_USER"));
  cy.findByTestId("password").type(Cypress.expose("PASSWORD"));
  cy.findByTestId("login-button").click();

  cy.url().should("contain", "/inventory.html");
  cy.findByTestId("inventory-list").should("be.visible");
});
