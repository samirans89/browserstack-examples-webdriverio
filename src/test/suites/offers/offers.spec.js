const HomePage = require('../../../app/pages/homePage');
const SignInPage = require('../../../app/pages/signInPage');
const OffersPage = require('../../../app/pages/offersPage');

describe("StackDemo Offers", async () => {
  before("Open StackDemo", async () => {
    await browser.url("");
  });

  after("clear sessionstorage", async () => {
    await browser.execute(() => sessionStorage.clear());
  });

  it("Check offers for India", async () => {
    const homePage = new HomePage();
    await homePage.goToSignInPage();
    const signInPage = new SignInPage();
    const username = await browser.config.accounts[0].username;
    const password = await browser.config.accounts[0].password;
    await signInPage.performLogin(username, password);

    const offersPage = new OffersPage();

    await offersPage.setOffersLocation(browser, "1", "103");

    await homePage.goToOffersPage();

    await offersPage.validateOffersCount(3);
  });
});
