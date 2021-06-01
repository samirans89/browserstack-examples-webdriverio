import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class SignInPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername(): WebdriverIO.Element {
    return $('#username input')
  }

  get inputPassword(): WebdriverIO.Element {
    return $('#password input')
  }

  get btnSubmit(): WebdriverIO.Element {
    return $('#login-btn')
  }

  get signedInUsername(): WebdriverIO.Element {
    return $('.username')
  }

  login(username: string, password: string): void {
    this.inputUsername.setValue(username + '\n');
    this.inputPassword.setValue(password + '\n');
    this.btnSubmit.click();
  }

  getSignedInUsername(): WebdriverIO.Element {
    return this.signedInUsername;
  }


}
