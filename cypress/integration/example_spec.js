describe('My First Test', () => {
    it('Visits the Cypress Docs', () => {
      cy.visit('https://docs.cypress.io');
      cy.contains('Introduction').click();
      cy.url().should('include', '/guides/overview/why-cypress');
    });
  });
  