import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it(`Login should be successful for account with username 'image_not_loading_user'`, function () {
    $('#signin').click();
    $('#username input').setValue(accounts[2].username + '\n');
    $('#password input').setValue(accounts[2].password + '\n');
    $('#login-btn').click();

    expect($('.username').getText()).to.equal(accounts[2].username);
    $('#logout').click();
  });
})
