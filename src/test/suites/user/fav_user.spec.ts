import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('User with favourites should see 5 items', () => {
    $('#signin').click();
    $('#username input').setValue(accounts[0].username + '\n');
    $('#password input').setValue(accounts[0].password + '\n');
    $('#login-btn').click();

    $('#favourites').click();

    browser.waitUntil(() => {
      const pageUrl = browser.getUrl();
      return pageUrl.indexOf('favourites') > -1
    }, { timeout: 5000 })

    expect($$('.shelf-item')).to.have.length(5);
  })
})
