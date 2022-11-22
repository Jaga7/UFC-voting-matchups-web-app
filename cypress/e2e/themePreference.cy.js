describe("Theme preference", () => {
  it("Changing theme preference", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[name=username]").type("Andrzej");
    cy.get("input[name=password]").type(`Secret{enter}`);
    cy.get(".css-17nr60j-MuiPaper-root-MuiCard-root");
    cy.get(".css-ixmyt1-MuiPaper-root-MuiCard-root").should("not.exist");
    cy.get(".MuiSwitch-input").click();
    cy.get(".MuiSwitch-input").should("be.checked");
    cy.get(".css-17nr60j-MuiPaper-root-MuiCard-root").should("not.exist");
    cy.get(".css-ixmyt1-MuiPaper-root-MuiCard-root");
    cy.get(".MuiListItemButton-root").eq(1).click();
    cy.get("input[name=username]").type("Jessika");
    cy.get("input[name=password]").type(`Volvo{enter}`);
    cy.get(".css-17nr60j-MuiPaper-root-MuiCard-root");
    cy.get(".css-ixmyt1-MuiPaper-root-MuiCard-root").should("not.exist");
    cy.get(".MuiListItemButton-root").eq(1).click();
    cy.get("input[name=username]").type("Andrzej");
    cy.get("input[name=password]").type(`Secret{enter}`);
    cy.get(".css-17nr60j-MuiPaper-root-MuiCard-root").should("not.exist");
    cy.get(".css-ixmyt1-MuiPaper-root-MuiCard-root");
    cy.get(".MuiSwitch-input").click();
  });
});
