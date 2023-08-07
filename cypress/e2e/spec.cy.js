describe("user navigation", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders'
    })
  })
  it("Should load page", () => {
    cy.visit("http://localhost:3000/")
    .get('h1').should('have.text', 'Burrito Builder')
    .get('input[name="name"]').should('have.value', '')
    
  });
});
