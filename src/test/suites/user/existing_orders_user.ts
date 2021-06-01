import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo user suite', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Login with user having existing orders', () => {
    $('#signin').click();
    $('#username input').setValue(accounts[3].username + '\n');
    $('#password input').setValue(accounts[3].password + '\n');
    $('#login-btn').click();
    expect($('.username').getText()).to.equal('existing_orders_user');

    $('#orders').click();
    $(".order").waitForDisplayed({ timeout: 5000 });
    expect($$('.order')).to.have.length(5);
  })
})
