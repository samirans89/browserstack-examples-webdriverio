const Page = require("./basePage");
const Actions = require("../common/technical_actions");
/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  constructor() {
    super();
    this.lnkSignIn = "#signin";
    this.lnkOrders = "#orders";
    this.lnkFavourites = '#favourites';
    this.lnkOffers = '#offers';
    this.btnBuyIPhoneXS =
      "//p[text() = 'iPhone XS']/../div[@class = 'shelf-item__buy-btn']";
    this.btnBuyDynamicLocator =
      "//p[text() = '{dynamicPhoneName}']/../div[@class = 'shelf-item__buy-btn']";
    this.btnCartClose = ".float-cart__close-btn";
    this.btnBuy = ".buy-btn";
    this.btnCheckout = "#checkout-shipping-continue";
    this.bag = ".bag.bag--float-cart-closed"
  }

  async goToSignInPage() {
    await Actions.performClick(this.lnkSignIn);
  }

  async goToOrdersPage() {
    await Actions.performClick(this.lnkOrders);
  }

  async goToFavouritesPage() {
    await Actions.performClick(this.lnkFavourites);
  }

  async goToOffersPage() {
    await Actions.performClick(this.lnkOffers);
  }

  async addItemsToCart(...items) {
    for (const item of items) {
      const phoneName = item;
      const btnLocalLocator = this.btnBuyDynamicLocator.replace(
        "{dynamicPhoneName}",
        phoneName
      );
      await Actions.performClick(btnLocalLocator);
      await Actions.performClick(this.btnCartClose);
    }
  }

  async buyPhones() {
    await Actions.performClick(this.bag);
    await Actions.performClick(this.btnBuy);
  }
}

module.exports = HomePage;
