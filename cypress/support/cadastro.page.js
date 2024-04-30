export default class CadastroPage {
  inputName = "#name";
  inputEmail = "#email";
  buttonSubmit = 'button[type="submit"]';

  typeName(nome) {
    cy.get(this.inputName).type(nome);
  }

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  clickSubmit() {
    cy.contains("Salvar").click();
  }

  salvarUsuario(nome, email) {
    cy.visit("/users/novo");
    cy.get(this.inputName).type(nome);
    cy.get(this.inputEmail).type(email);
    cy.contains("Salvar").click();
  }
}
