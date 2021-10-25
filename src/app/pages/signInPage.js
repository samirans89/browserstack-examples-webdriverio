const Page = require('./basePage');
const Actions = require("../common/technical_actions");

class SignInPage extends Page {

  constructor() {
    super();
    this.txtUsername = '#username input';
    this.txtPassword = '#password input';
    this.btnLogin = '#login-btn';
    this.lblUsername = '.username';
    this.lnkLogout = '#logout';
    this.lblApiError = '.api-error';
  }

  async performLogin(username, password) {
    await Actions.setText(this.txtUsername, username + '\n')
    await Actions.setText(this.txtPassword, password + '\n')
    await Actions.performClick(this.btnLogin);
  }

  async performLogout() {
    await Actions.performClick(this.lnkLogout);
  }

  async validateURL(param) {
    const pageURL = await Actions.getPageURL();
    return pageURL.indexOf(param) > -1
  }

  async getLoggedInUsername() {
    return await Actions.getPageObject(this.lblUsername);
  }

  async validateUser(username) {
    await expect(await this.getLoggedInUsername()).toHaveText(username);
  }

  async validateLoginFailure(message) {
    await expect(await (await Actions.getPageObject(this.lblApiError))).toHaveText(message);
  }
}

module.exports = SignInPage;
