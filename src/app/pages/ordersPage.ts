import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class OrdersPage extends Page {
  /**
   * define selectors using getter methods
   */
  get allOrders(): WebdriverIO.ElementArray {
    return $$('.order')
  }

  get firstOrder(): WebdriverIO.Element {
    return $('.order')
  }

  waitforOrdersToDisplay(): void {
    this.firstOrder.waitForDisplayed({ timeout: 5000 });
  }
}
