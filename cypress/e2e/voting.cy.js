describe("Voting", () => {
  it("voting and unvoting matchups", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[name=username]").type("Andrzej");
    cy.get("input[name=password]").type(`Secret{enter}`);
    cy.get(".MuiListItemButton-root").eq(3).click();
    cy.contains("Sean O'Malley");
    cy.get(".MuiTypography-root").eq(8).should("have.text", "votes:0");
    cy.contains("Sean O'Malley").click();
    cy.get(".MuiTypography-root").eq(8).should("have.text", "votes:1");
    cy.contains("Sean O'Malley").click();
    cy.get(".MuiTypography-root").eq(8).should("have.text", "votes:0");
  });
});
