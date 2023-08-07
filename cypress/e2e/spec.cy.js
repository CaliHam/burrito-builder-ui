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
    .get('.order').should('have.length', 2)
    .get('section').find('div').first().find('h3').should('have.text', 'Lydia')
    .get('.ingredient-list').find('li').first().should('have.text', 'carnitas')
    .get('section').find('div').last().find('h3').should('have.text', 'Bobby')
    .get('.ingredient-list').find('li').last().should('have.text', 'cheese')
  });
  it('Should allow user to add a new order', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'newOrder'
    }).as('postNewOrder')
    cy.visit("http://localhost:3000/")
    .wait('@allOrders')
    .get('input[name="name"]').type('Sam').should('have.value', 'Sam')
    .get('button[name="steak"]').click()
    cy.get('button[name="hot sauce"]').click()
    cy.get('header').find('p').should('have.text', 'Order: steak, hot sauce')
    .get('button').contains('Submit Order').click()
    cy.wait('@postNewOrder')
    .get('input[name="name"]').should('have.value', '')
    .get('header').find('p').should('have.text', 'Order: Nothing selected')
    .get('section').find('div').first().find('h3').should('have.text', 'Lydia')
    .get('section').find('div').last().find('h3').should('have.text', 'Sam')
    .get('.ingredient-list').find('li').last().should('have.text', 'hot sauce')
  })
  it.only('Should show form error if name is empty or if no ingredients are selected', () => {
    cy.visit("http://localhost:3000/")
    .wait('@allOrders')
    .get('input[name="name"]').type('Sam')
    .get('button').contains('Submit Order').click()
    cy.get('.form-error').should('have.text', 'Please enter your name and select your ingredients!')
    .get('.order').should('have.length', 2)
    .get('input[name="name"]').clear()
    .get('button[name="steak"]').click()
    cy.get('header').find('p').last().should('have.text', 'Order: steak')
    .get('button').contains('Submit Order').click()
    .get('.form-error').should('have.text', 'Please enter your name and select your ingredients!')
    .get('.order').should('have.length', 2)
  })
});
