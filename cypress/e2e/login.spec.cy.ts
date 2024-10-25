describe('Login Form', () =>{
    beforeEach(() => {
        cy.visit('hhtp://localhost:3000/login');
        cy.get('body').should('be.visible');
    });
})