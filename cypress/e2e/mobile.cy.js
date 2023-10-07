///<reference types='cypress' />
import '@testing-library/cypress/add-commands';

describe('YouTube App - mobile mode', () => {
  beforeEach(() => {
    cy.intercept('GET', /(popular)/g, { fixture: 'popular.json' });
    cy.intercept('GET', /(search)/g, { fixture: 'search.json' });
    cy.intercept('GET', /(related)/g, { fixture: 'related.json' });
    cy.viewport('iphone-8');
    cy.visit('/');
  });

  it('renders', () => {
    cy.findByTitle('logo').should('exist');
    cy.findByText('YouTube').should('exist');
    cy.findByTestId('mobile search').should('be.visible');
    cy.findByTitle('close').should('not.exist');
    cy.findByPlaceholderText('Search...').should('not.be.visible');
    cy.findByTestId('search').should('not.be.visible');
  });

  it('shows popular video first', () => {
    cy.findByText('Popular Video').should('exist');
  });

  it('shows the search form when you click search button', () => {
    cy.findByTestId('mobile search').click();

    cy.findByTitle('close').should('exist');
    cy.findByPlaceholderText('Search...').should('be.visible');
    cy.findByTestId('search').should('be.visible');
  });

  it('hides the search form when you click close button', () => {
    cy.findByTestId('mobile search').click();
    cy.findByTitle('close').click();

    cy.findByTestId('mobile search').should('be.visible');
    cy.findByTitle('close').should('not.exist');
    cy.findByPlaceholderText('Search...').should('not.be.visible');
    cy.findByTestId('search').should('not.be.visible');
  });

  it('searches by keywords in search area', () => {
    cy.findByTestId('mobile search').click();

    cy.findByPlaceholderText('Search...').type('bts');
    cy.findByTestId('search').click();

    cy.findByText('Search Video').should('exist');
  });

  it('goes to the detail page when the video is clicked', () => {
    cy.findAllByRole('listitem').first().click();

    cy.findByTitle('Popular Video').should('exist');
    cy.findByText('Popular Video').should('exist');
    cy.findByAltText('Channel Title');
    cy.findByText('Channel Title');
    cy.findByText('This is a description of a popular video.');
    cy.findByText('Related Video').should('exist');
  });
});
