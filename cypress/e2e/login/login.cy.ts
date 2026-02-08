it("Can login", () => {
  cy.env(["standardUser", "password"]).then(({ standardUser, password }) => {
    cy.visit("/");

    cy.findByTestId("username").type(standardUser);
    cy.findByTestId("password").type(password);
    cy.findByTestId("login-button").click();

    cy.url().should("contain", "/inventory.html");
    cy.findByTestId("inventory-list").should("be.visible");
  });
});

it("Receives error when user is locked out", () => {
  cy.env(["lockedUser", "password"]).then(({ lockedUser, password }) => {
    cy.visit("/");

    cy.findByTestId("username").type(lockedUser);
    cy.findByTestId("password").type(password);
    cy.findByTestId("login-button").click();

    cy.findByTestId("error")
      .should("be.visible")
      .and("contain.text", "Sorry, this user has been locked out.");
    cy.url().should("not.contain", "/inventory.html");
  });
});
