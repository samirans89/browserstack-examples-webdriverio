const HomePage = require('../../../app/pages/homePage');
const SignInPage = require('../../../app/pages/signInPage');

const _ = require('lodash');
const expectChai = require('chai').expect;

describe('StackDemo login', () => {

    before('Open StackDemo', async () => {
      browser.url('');
    })

    after('clear sessionstorage', async () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login should be successful for account with username 'image_not_loading_user'`, async function() {

      const homePage = new HomePage();
      await homePage.goToSignInPage();
      const signInPage = new SignInPage();
      const username = await browser.config.accounts[2].username;
      const password = await browser.config.accounts[2].password;
      await signInPage.performLogin(username, password);
      await signInPage.validateUser(username);
      await signInPage.performLogout();
    });
})
