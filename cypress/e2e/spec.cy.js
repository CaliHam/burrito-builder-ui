describe("user navigation", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders'
    }).as('allOrders')
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
    cy.wait('@allOrders')
    .get('h1').should('have.text', 'Burrito Builder')
    .get('input[name="name"]').should('have.value', '')
    ingredients.map(ingredient => {
      cy.get(`button[name="${ingredient}"]`).should('have.value', `${ingredient}`)
    })
    cy.get('header').find('p').should('have.text', 'Order: Nothing selected')
    .get('header').find('button').last().should('have.text', 'Submit Order')
    .get('section').find('div').first().find('h3').should('have.text', 'Lydia')
    .get('.ingredient-list').find('li').first().should('have.text', 'carnitas')
    .get('section').find('div').last().find('h3').should('have.text', 'Bobby')
    .get('.ingredient-list').find('li').last().should('have.text', 'cheese')
  });
});
