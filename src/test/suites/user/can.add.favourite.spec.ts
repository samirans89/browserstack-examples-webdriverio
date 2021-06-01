import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Logged in user should be able to add favourite', () => {
    $('#signin').click();
    $('#username input').setValue(accounts[3].username + '\n');
    $('#password input').setValue(accounts[3].password + '\n');
    $('#login-btn').click();

    $("//p[text() = 'iPhone 12']/../div/button").waitForDisplayed({ timeout: 5000 });
    $("//p[text() = 'iPhone 12']/../div/button").click();

    $('#favourites').click();

    browser.waitUntil(() => {
      const pageUrl = browser.getUrl();
      return pageUrl.indexOf('favourites') > -1
    }, { timeout: 5000 })
    browser.pause(5000)
    expect($$('p.shelf-item__title').map(e => e.getText())).to.contain('iPhone 12');
  })
})
