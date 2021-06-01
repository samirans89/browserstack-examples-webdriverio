import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';
describe('StackDemo login', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it(`Login sholud not be successful for account with username 'locked_user'`, function () {
    $('#signin').click();
    $('#username input').setValue(accounts[1].username + '\n');
    $('#password input').setValue(accounts[1].password + '\n');
    $('#login-btn').click();

    expect($('.api-error').getText()).to.equal('Your account has been locked.');
  });
})
