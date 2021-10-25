const HomePage = require('../../../app/pages/homePage');
const SignInPage = require('../../../app/pages/signInPage');

describe('StackDemo login', () => {

  before('Open StackDemo', async () => {
    browser.url('');
  })

  after('clear sessionstorage', async () => {
    browser.execute(() => sessionStorage.clear())
  })

  it(`Login sholud not be successful for account with username 'locked_user'`, async function() {

      const homePage = new HomePage();
      await homePage.goToSignInPage();
      const signInPage = new SignInPage();
      const username = await browser.config.accounts[1].username;
      const password = await browser.config.accounts[1].password;
      await signInPage.performLogin(username, password);
      await signInPage.validateLoginFailure('Your account has been locked.');

  });
})
