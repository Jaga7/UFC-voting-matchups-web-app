describe("Viewing", () => {
  it("viewing top-voted matchups", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[name=username]").type("Andrzej");
    cy.get("input[name=password]").type(`Secret{enter}`);
    cy.contains("Top-Voted Matchups");
    cy.contains("Mateusz Gamrot");
    cy.contains("Justin Gaethje");
    cy.contains("Ciryl Gane");
    cy.contains("Marcin Tybura");
  });
  it("viewing matchups of different weightclasses", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[name=username]").type("Andrzej");
    cy.get("input[name=password]").type(`Secret{enter}`);
    cy.get(".MuiListItemButton-root").eq(3).click();
    cy.contains("Bantamweight");
    cy.contains("Marlon Vera");
    cy.get(".MuiButton-sizeSmall").click();
    cy.contains("Lightweight").click();
    cy.contains("Lightweight");
    cy.contains("Mateusz Gamrot");
  });
});
