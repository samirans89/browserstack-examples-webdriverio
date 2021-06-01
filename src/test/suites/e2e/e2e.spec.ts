import { HomePage } from '../../../app/pages/homePage';
import { SignInPage } from '../../../app/pages/signInPage';
import { CheckoutPage } from '../../../app/pages/checkoutPage';
import { ConfirmationPage } from '../../../app/pages/confirmationPage';
import { OrdersPage } from '../../../app/pages/ordersPage';
import { expect } from 'chai';
import * as accounts from '../../../../resources/data/user.json';


describe('Order a product', () => {

  beforeEach('Open StackDemo', () => {
    browser.url('');
  })

  afterEach('clear sessionstorage', () => {
    browser.execute(() => sessionStorage.clear())
  })

  it('Login and order a product', () => {

    const homePage = new HomePage();
    homePage.navigateToSignIn();

    const signInPage = new SignInPage();
    signInPage.login(accounts[0].username, accounts[0].password);
    expect(signInPage.getSignedInUsername().getText()).to.equal(accounts[0].username);

    homePage.selectPhone('iPhone XS');
    homePage.closeCartModal();
    homePage.selectPhone('Galaxy S20');
    homePage.clickBuyButton();

    const checkoutPage = new CheckoutPage();

    checkoutPage.enterFirstName('firstname');
    checkoutPage.enterLastName('lastname');
    checkoutPage.enterAddressLine1('address');
    checkoutPage.enterProvince('state');
    checkoutPage.enterPostCode('12345');
    checkoutPage.clickSubmit();

    const confirmationPage = new ConfirmationPage();

    confirmationPage.waitForConfirmationToBeDisplayed();
    expect(confirmationPage.confirmationMessage.getText()).to.equal('Your Order has been successfully placed.');
    confirmationPage.clickContinueShoppingButton();

    homePage.navigateToOrders();

    const ordersPage = new OrdersPage();
    ordersPage.waitforOrdersToDisplay();
    expect(ordersPage.allOrders).to.have.length(1);
  })
})

