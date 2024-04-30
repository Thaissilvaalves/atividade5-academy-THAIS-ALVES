import { fakerPT_BR } from "@faker-js/faker";
import CadastroPage from "../support/cadastro.page";

var cadastroPage = new CadastroPage();
var nome = fakerPT_BR.person.fullName();
var email = fakerPT_BR.internet.email();

describe("Testes de pesquisa de usuários", () => {
  before(() => {
    cadastroPage.salvarUsuario(nome, email);
    cy.get(".go3958317564").should(
      "contain.text",
      "Usuário salvo com sucesso!"
    );
  });

  var pesquisarEmail = email;
  var pesquisarNome = nome;

  beforeEach(() => {
    cy.visit("/users");
  });

  it("Deve ser possível pesquisar um usuário por nome", () => {
    cy.get(".sc-gsFSXq.mUpIH").type(pesquisarNome);
    cy.contains("Ver detalhes").click();
    cy.get("#userName").should("have.value", nome).and("be.visible");
  });

  it("Deve ser possível pesquisar um usuário pelo e-mail", () => {
    cy.get(".sc-gsFSXq.mUpIH").type(pesquisarEmail);
    cy.contains("Ver detalhes").click();
    cy.get("#userEmail").should("have.value", email).and("be.visible");
  });

  it("Deve aparecer mensagem de alerta ao não localizar um usuário", () => {
    cy.get(".sc-gsFSXq.mUpIH").type("erro");
    cy.contains("Ops! Não existe nenhum usuário para ser exibido.").should(
      "be.visible"
    );
  });
});
