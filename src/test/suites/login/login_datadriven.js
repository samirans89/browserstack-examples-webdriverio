const items = require('../../../../resources/data/login_cases.json')
const HomePage = require('../../../app/pages/homePage');
const SignInPage = require('../../../app/pages/signInPage');

describe('Password input validation', function () {
  items.forEach((item) => {

    beforeEach('Open StackDemo', async () => {
      await browser.url('');
    })

    afterEach('clear sessionstorage', async () => {
      await browser.execute(() => sessionStorage.clear())
    })

    it(`Login should not be successful for account with username ''`, async () => {

      const homePage = new HomePage();
      await homePage.goToSignInPage();
      const signInPage = new SignInPage();
      const username = item.username;
      const password = item.password;
      await signInPage.performLogin(username, password);
      await signInPage.validateLoginFailure(item.expected_message);
    });
  })
});
