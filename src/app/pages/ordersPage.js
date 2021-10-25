const Page = require('./basePage');
const Actions = require("../common/technical_actions");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OrdersPage extends Page {
  
  constructor() {
    super();
    this.sectionOrders = '.order';
  }

  async waitforAllOrdersToDisplay() {
    const orders = await Actions.getPageObject(this.sectionOrders, true);
    return orders;
    
  }
}

module.exports = OrdersPage;
