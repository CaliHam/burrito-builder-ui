describe("user navigation", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders'
    })
  })
  it("Should load page", () => {
    const ingredients = [
      "beans",
      "steak",
      "carnitas",
      "sofritas",
      "lettuce",
      "queso fresco",
      "pico de gallo",
      "hot sauce",
      "guacamole",
      "jalapenos",
      "cilantro",
      "sour cream",
    ];
    cy.visit("http://localhost:3000/")
    .get('h1').should('have.text', 'Burrito Builder')
    .get('input[name="name"]').should('have.value', '')
    ingredients.map(ingredient => {
      cy.get(`button[name="${ingredient}"]`).should('have.value', `${ingredient}`)
    })
    
  });
});
