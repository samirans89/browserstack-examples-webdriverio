const Page = require("./basePage");
const Actions = require("../common/technical_actions");

class ConfirmationPage extends Page {
  constructor() {
    super();
    this.lblConfirmationMessage = "#confirmation-message";
    this.btnContinueShopping = "div.continueButtonContainer button";
  }

  async validateOrderSuccess(orderSuccessMesage) {
    const confirmationMessage = await Actions.getPageObject(
      this.lblConfirmationMessage
    );
    await expect(confirmationMessage).toHaveText(orderSuccessMesage);
  }

  async continueShopping() {
    await Actions.performClick(this.btnContinueShopping);
  }
}

module.exports = ConfirmationPage;
