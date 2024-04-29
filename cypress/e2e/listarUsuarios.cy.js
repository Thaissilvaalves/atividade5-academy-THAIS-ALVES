describe("Testes de rotas / list users", () => {
  beforeEach(() => {
    cy.visit("/users");
  });

  it("Listar todos os usuários cadastrados", () => {
    cy.get("#listaUsuarios").should("be.visible");
  });

  it("Deve aparecer a opção de cadastrar um usuário caso a lista seja vazia", () => {
    cy.intercept("GET", "", {
      statusCode: 200,
      body: [],
    });
    cy.contains("Ops! Não existe nenhum usuário para ser exibido.").should(
      "be.visible"
    );
    cy.contains("Cadastre um novo usuário").should("be.visible");

    cy.contains("a", "Cadastre um novo usuário").click();

    cy.url("").should(
      "equal",
      "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo"
    );
  });
});
