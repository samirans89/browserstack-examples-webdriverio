import { Page } from "./basePage";
let phoneName = '';
/**
 * sub page containing specific selectors and methods for a specific page 
*/
export class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  get signInLink(): WebdriverIO.Element {
    return $('#signin')
  }

  get ordersLink(): WebdriverIO.Element {
    return $('#orders')
  }

  get iPhoneXSElement(): WebdriverIO.Element {
    return $("//p[text() = 'iPhone XS']/../div[@class = 'shelf-item__buy-btn']")
  }

  get phonesBuyButton(): WebdriverIO.Element {
    return $("//p[text() = '" + phoneName + "']/../div[@class = 'shelf-item__buy-btn']")
  }

  get cartCloseButton(): WebdriverIO.Element {
    return $('.float-cart__close-btn')
  }

  get buyButton(): WebdriverIO.Element {
    return $('.buy-btn')
  }

  navigateToSignIn(): void {
    this.signInLink.click();
  }

  navigateToOrders(): void {
    this.ordersLink.click();
  }

  selectPhone(phoneToSelect: string): void {
    phoneName = phoneToSelect;
    this.phonesBuyButton.click();
  }

  closeCartModal(): void {
    this.cartCloseButton.click();
  }

  clickBuyButton(): void {
    this.buyButton.waitForClickable({ timeout: 5000 });
    this.buyButton.click();
  }

  open(): string {
    return super.open('');
  }
}
