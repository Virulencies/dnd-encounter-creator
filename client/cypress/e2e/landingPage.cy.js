describe('Monster Application Test', () => {
    it('displays the title and monsters from the API', () => {
        cy.intercept('GET', '*/v1/monsters/**', { fixture: 'monsters.json' }).as('getMonsters');
        cy.visit('http://localhost:3000/');
        cy.get('h1').should('contain', 'D&D Encounter Generator');
        cy.get('input[type="text"]').eq(0)
            .should('have.attr', 'placeholder', 'Type (e.g., dragon)')
            .as('monsterTypeField');
        cy.get('input[type="text"]').eq(1)
            .should('have.attr', 'placeholder', 'CR (e.g., 7)')
            .as('crField');
        cy.get('input[type="text"]').eq(2)
            .should('have.attr', 'placeholder', 'Party Level (e.g., 5)')
            .as('partyLevelField');
        cy.get('button').contains('Filter Monsters').as('filterButton');
        cy.get('button').contains('Generate Encounter').as('generateButton');
        cy.get('@monsterTypeField').type('Dragon');
        cy.get('@crField').type('7');

    });
});
