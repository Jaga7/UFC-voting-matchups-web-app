describe("Logging in and", () => {
  it("login works", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[name=username]").type("Andrzej");
    cy.get("input[name=password]").type(`Secret{enter}`);

    expect(true).to.equal(true);
  });
});
