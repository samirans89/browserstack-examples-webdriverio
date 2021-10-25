const HomePage = require('../../../app/pages/homePage');
const SignInPage = require('../../../app/pages/signInPage');

describe('StackDemo login', () => {

  before('Open StackDemo', async () => {
    await browser.url('');
  })

  after('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('Navigated to login on clicking favourites Nav Item', async () => {
    const homePage = new HomePage();
    await homePage.goToFavouritesPage();

    const signInPage = new SignInPage();
    signInPage.validateURL('signin?favourites=true');
  })

})
