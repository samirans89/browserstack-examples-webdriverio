import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class ConfirmationPage extends Page {
  /**
   * define selectors using getter methods
   */
  get confirmationMessage(): WebdriverIO.Element {
    return $('#confirmation-message')
  }

  get continueShoppingButton(): WebdriverIO.Element {
    return $('div.continueButtonContainer button')
  }

  clickContinueShoppingButton(): void {
    this.continueShoppingButton.click();
  }

  waitForConfirmationToBeDisplayed(): void {
    this.confirmationMessage.waitForDisplayed({ timeout: 5000 });
  }

}
