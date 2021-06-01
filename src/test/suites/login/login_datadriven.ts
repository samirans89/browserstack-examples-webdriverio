import { expect } from 'chai';
import * as items from '../../../../resources/data/login_cases.json';

describe('Password input validation', function () {
  items.forEach((item: { username: string; password: string; expected_message: string; }) => {

    beforeEach('Open StackDemo', () => {
      browser.url('');
    })

    afterEach('clear sessionstorage', () => {
      browser.execute(() => sessionStorage.clear())
    })

    it(`Login should not be successful for account with username ''`, () => {
      $('#signin').click();
      $('#username input').setValue(item.username + '\n');
      $('#password input').setValue(item.password + '\n');
      $('#login-btn').click();

      expect($('.api-error').getText()).to.equal(item.expected_message);
    });
  })
});
