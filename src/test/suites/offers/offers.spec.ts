import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';

describe('StackDemo Offers', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Check offers for India', () => {
    $('#signin').click();
    $('#username input').setValue(accounts[0].username + '\n');
    $('#password input').setValue(accounts[0].password + '\n');
    $('#login-btn').click();

    browser.execute(function () {
      window.navigator.geolocation.getCurrentPosition = function (success) {
        const position: GeolocationPosition = { coords: { latitude: 1, longitude: 103, accuracy: 20, altitude: null, altitudeAccuracy: null, heading: null, speed: null }, timestamp: Date.now() };
        success(position);
      }
    });
    $('#offers').click();

    $(".offer").waitForDisplayed({ timeout: 5000 });
    expect($$('.offer')).to.have.length(3);
  })
})

