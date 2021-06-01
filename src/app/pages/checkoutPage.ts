import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class CheckoutPage extends Page {
  /**
   * define selectors using getter methods
   */
  get firstNameInput(): WebdriverIO.Element {
    return $('#firstNameInput')
  }

  get lastNameInput(): WebdriverIO.Element {
    return $('#lastNameInput')
  }

  get addressLine1Input(): WebdriverIO.Element {
    return $('#addressLine1Input')
  }

  get provinceInput(): WebdriverIO.Element {
    return $('#provinceInput')
  }

  get postCodeInput(): WebdriverIO.Element {
    return $('#postCodeInput')
  }

  get checkoutShippingContinue(): WebdriverIO.Element {
    return $('#checkout-shipping-continue')
  }

  enterFirstName(firstName: string): void {
    this.firstNameInput.setValue(firstName);
  }

  enterLastName(lastName: string): void {
    this.lastNameInput.setValue(lastName);
  }

  enterAddressLine1(addressLine1: string): void {
    this.addressLine1Input.setValue(addressLine1);
  }

  enterProvince(province: string): void {
    this.provinceInput.setValue(province);
  }

  enterPostCode(postCode: string): void {
    this.postCodeInput.setValue(postCode);
  }

  clickSubmit(): void {
    this.checkoutShippingContinue.click();
  }

  open(): string {
    return super.open('');
  }
}
