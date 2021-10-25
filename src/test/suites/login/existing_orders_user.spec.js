const HomePage = require('../../../app/pages/homePage');
const SignInPage = require('../../../app/pages/signInPage');

describe('StackDemo login', () => {

    before('Open StackDemo', async () => {
      await browser.url('');
    })

    after('clear session storage', async () => {
      await browser.execute(() => sessionStorage.clear())
    })

    it(`Login should be successful for account with username 'existing_orders_user'`, async function() {
      const homePage = new HomePage();
      await homePage.goToSignInPage();
      const signInPage = new SignInPage();
      const username = await browser.config.accounts[3].username;
      const password = await browser.config.accounts[3].password;
      await signInPage.performLogin(username, password);
      await signInPage.validateUser(username);
      await signInPage.performLogout();
    });
})
