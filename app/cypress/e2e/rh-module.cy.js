describe('ModuloRhCompleto Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/erp/rh'); // Ajuste a URL conforme necessário
  });

  it('should display the main header', () => {
    cy.get('h1').should('contain', 'Módulo RH Completo');
  });

  it('should display the employee list', () => {
    cy.get('table').within(() => {
      cy.get('thead').should('contain', 'Nome');
      cy.get('thead').should('contain', 'Cargo');
      cy.get('thead').should('contain', 'Departamento');
      cy.get('thead').should('contain', 'Salário');
      cy.get('tbody tr').should('have.length.greaterThan', 0);
    });
  });

  it('should allow adding a new employee', () => {
    cy.get('button').contains('Adicionar Funcionário').click();
    cy.get('input#name').type('Novo Funcionário');
    cy.get('input#position').type('Desenvolvedor');
    cy.get('input#department').type('TI');
    cy.get('input#salary').type('5000');
    cy.get('button').contains('Salvar').click();
    cy.get('table tbody tr').should('contain', 'Novo Funcionário');
  });

  it('should allow editing an employee', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('Editar').click();
    });
    cy.get('input#name').clear().type('Funcionário Editado');
    cy.get('button').contains('Salvar').click();
    cy.get('table tbody tr').first().should('contain', 'Funcionário Editado');
  });

  it('should allow deleting an employee', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('Excluir').click();
    });
    cy.get('table tbody tr').should('have.length.lessThan', 5); // Ajuste conforme necessário
  });
});