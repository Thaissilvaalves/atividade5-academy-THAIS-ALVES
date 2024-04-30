import { fakerPT_BR } from "@faker-js/faker";
import CadastroPage from "../support/cadastro.page";

var cadastroPage = new CadastroPage();
var nome = fakerPT_BR.person.fullName();
var email = fakerPT_BR.internet.email();

describe("Testes de criação de usuário", () => {
  beforeEach(() => {
    cy.visit("/users/novo");
  });

  it("Deve ser possível cadastrar um usuário com nome e e-mail válidos", () => {
    cadastroPage.typeName(nome);
    cadastroPage.typeEmail(email);
    cadastroPage.clickSubmit();
    cy.contains("Usuário salvo com sucesso!").should("be.visible");
  });

  it("Não deve ser possível fazer um cadastro sem um e-mail", () => {
    cadastroPage.typeName(nome);
    cadastroPage.clickSubmit();
    cy.contains("O campo e-mail é obrigatório.").should("be.visible");
  });

  it("Não deve ser possível fazer um cadastro sem um nome", () => {
    cadastroPage.typeEmail(email);
    cadastroPage.clickSubmit();
    cy.contains("O campo nome é obrigatório.").should("be.visible");
  });

  it("Não deve ser possível cadastrar um usuário com e-mail em uso", () => {
    var emailUtilizado = email;
    cadastroPage.typeName(nome);
    cadastroPage.typeEmail(emailUtilizado);
    cadastroPage.clickSubmit();

    cy.get(".go3958317564").should(
      "contain.text",
      "Usuário salvo com sucesso!"
    );

    cadastroPage.typeName(nome);
    cadastroPage.typeEmail(emailUtilizado);
    cadastroPage.clickSubmit();

    cy.contains("Este e-mail já é utilizado por outro usuário.").should(
      "be.visible"
    );
  });

  it("Não deve ser possível cadastrar um usuário com e-mail inválido", () => {
    var emailInvalido = "thaisgmail.com";
    cadastroPage.typeName(nome);
    cadastroPage.typeEmail(emailInvalido);
    cadastroPage.clickSubmit();
    cy.contains("Formato de e-mail inválido").should("be.visible");
  });

  it("Não deve ser possível cadastrar um nome com 101 caracteres", () => {
    cy.fixture("limitesUsuario").then((limitesUsuario) => {
      cadastroPage.typeName(limitesUsuario.nomeGrande);
      cadastroPage.typeEmail(email);
      cadastroPage.clickSubmit();
      cy.contains("Informe no máximo 100 caracteres para o nome").should(
        "be.visible"
      );
    });
  });

  it.only("Não deve ser possível cadastrar um e-mail com 61 caracteres", () => {
    cy.fixture("limitesUsuario").then((limitesUsuario) => {
      cadastroPage.typeName(nome);
      cadastroPage.typeEmail(limitesUsuario.emailGrande);
      cadastroPage.clickSubmit();
      cy.contains("Informe no máximo 60 caracteres para o e-mail").should(
        "be.visible"
      );
    });
  });
});
