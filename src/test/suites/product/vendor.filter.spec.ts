import { expect } from 'chai';

describe('StackDemo filters', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Apply vendor filter', () => {
    $("input[value='Apple'] + span").click();
    browser.pause(5000)                                               // Example for static wait
    const all_phones = $$(".shelf-item__title").map(function (element) {
      return element.getText()
    });
    expect(all_phones.filter(x => x.includes('iPhone')).length).to.equal(all_phones.length, "Vendor filter is not applied");
  })
})
