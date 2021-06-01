import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it(`Login sholud be successful for account with username 'fav_user'`, function () {
    $('#signin').click();
    $('#username input').setValue(accounts[0].username + '\n');
    $('#password input').setValue(accounts[0].password + '\n');
    $('#login-btn').click();

    expect($('.username').getText()).to.equal(accounts[0].username);
    $('#logout').click();
  });
})
