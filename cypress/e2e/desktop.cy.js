///<reference types='cypress' />
import '@testing-library/cypress/add-commands';

describe('YouTube App - desktop mode', () => {
  beforeEach(() => {
    cy.intercept('GET', /(popular)/g, { fixture: 'popular.json' });
    cy.intercept('GET', /(search)/g, { fixture: 'search.json' });
    cy.intercept('GET', /(related)/g, { fixture: 'related.json' });
    cy.viewport('macbook-13');
    cy.visit('/');
  });

  it('renders', () => {
    cy.findByTitle('logo').should('exist');
    cy.findByText('YouTube').should('exist');
  });

  it('shows popular video first', () => {
    cy.findByText('Popular Video').should('exist');
  });

  it('searches by keywords', () => {
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
