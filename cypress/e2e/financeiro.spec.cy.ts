describe('Finance Module', () => {
  beforeEach(() => {
    // Visitar a página onde o componente FinanceModule está localizado
    cy.visit('http://localhost:3000/erp/financeiro'); // Atualize para o caminho correto
    cy.get('body').should('be.visible'); // Ensure the page has fully loaded
  });

  it('should render the title and buttons', () => {
    cy.get('h1').contains('Finanças'); // Verifica se o título está presente
    cy.get('button').contains('Nova Transação').should('be.visible');
    cy.get('button').contains('Gerar Relatório').should('be.visible');
  });

    it('should switch between tabs', () => {
    cy.get('[role="tablist"]').within(() => {
      cy.get('[role="tab"]').contains('Visão Geral').click();
    });
    cy.contains('Saldo Total').should('be.visible'); // Verifica conteúdo da aba Visão Geral
  
    cy.get('[role="tablist"]').within(() => {
      cy.get('[role="tab"]').contains('Transações').click();
    });
    cy.contains('Transações Recentes').should('be.visible'); // Verifica conteúdo da aba Transações
  
    cy.get('[role="tablist"]').within(() => {
      cy.get('[role="tab"]').contains('Relatórios').click();
    });
    cy.contains('Relatórios Financeiros').should('be.visible'); // Verifica conteúdo da aba Relatórios
  });

   it('should display recent transactions', () => {
    cy.get('[role="tablist"]').within(() => {
      cy.get('[role="tab"]').contains('Transações').click();
    });
    cy.contains('Transações Recentes').should('be.visible'); // Verifica conteúdo da aba Transações
  
    cy.get('table').within(() => {
      cy.get('tbody tr').should('have.length.greaterThan', 0); // Verifica se há transações listadas
      cy.contains('Venda de Produto A').should('be.visible'); // Verifica se uma transação específica está visível
    });
  });

   it('should generate a report', () => {
    cy.get('[role="tablist"]').within(() => {
      cy.get('[role="tab"]').contains('Relatórios').click();
    });
    cy.contains('Relatórios Financeiros').should('be.visible'); // Verifica conteúdo da aba Relatórios
  
    cy.get('#report-type').select('Demonstração de Resultados'); // Seleciona um tipo de relatório
    cy.get('#start-date').type('2023-01-01'); // Define a data inicial
    cy.get('#end-date').type('2023-12-31'); // Define a data final
    cy.get('button').contains('Gerar e Baixar Relatório').click(); // Clica para gerar o relatório
  
    // Aqui, você pode verificar se uma ação ocorreu, como um download ou um alerta
    // Isso pode variar dependendo de como seu aplicativo lida com downloads
  });
});