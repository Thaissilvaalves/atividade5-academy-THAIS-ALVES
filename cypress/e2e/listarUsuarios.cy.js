describe("Testes de listar usuários", () => {
  beforeEach(() => {
    cy.visit("/users");
  });

  it("Listar todos os usuários cadastrados", () => {
    cy.get("#listaUsuarios").should("be.visible");
  });

  it("Deve aparecer a opção de cadastrar um usuário caso a lista seja vazia", () => {
    cy.intercept("GET", "/api/v1/users", {
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
  let buttonProxima = "#paginacaoProximo";
  it("Não deve ser possível clicar no botão próxima quando existem somente 6 usuários cadastrados", () => {
    cy.intercept("GET", "/api/v1/users", {
      fixture: "lista6Usuarios.json",
    });
    cy.get(buttonProxima).should("be.disabled");
  });

  it("Deve ser possível clicar no botão próxima quando existem 12 usuários cadastrados", () => {
    cy.intercept("GET", "/api/v1/users", {
      fixture: "lista12Usuarios.json",
    });
    cy.get(buttonProxima).should("be.enabled");
  });
});
