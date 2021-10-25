const Page = require('./basePage');
const Actions = require("../common/technical_actions");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OffersPage extends Page {
  
  constructor() {
    super();
    this.lblOffer = ".offer"; 
  }

  async setOffersLocation(browser, lat, long) {
    await Actions.setBrowserLocation(browser, lat, long);
  }

  async validateOffersCount(count) {
    const  offersOnPage = await Actions.getPageObject(this.lblOffer, true);
    await expect(offersOnPage).toHaveLength(count);
  }
}

module.exports = OffersPage;
