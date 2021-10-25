const HomePage = require('../../../app/pages/homePage');
const SignInPage = require('../../../app/pages/signInPage');
const CheckoutPage = require('../../../app/pages/checkoutPage');
const ConfirmationPage = require('../../../app/pages/confirmationPage');
const OrdersPage = require('../../../app/pages/ordersPage');

describe('Order a product', () => { 
  
  const homePage = new HomePage();

  before('Open StackDemo', async () => {
    await browser.url('');
  })

  after('clear session storage', async () => {
    await browser.execute(() =>  sessionStorage.clear())
  })

  it('Perform Login', async () => {
    
    await homePage.goToSignInPage();
    const signInPage = new SignInPage();
    const username = await browser.config.accounts[0].username;
    const password = await browser.config.accounts[0].password;
    await signInPage.performLogin(username, password);
    await signInPage.validateUser(username) ;

  })

  it('Add Items to Cart', async () => {
    await homePage.addItemsToCart('iPhone XS', 'Galaxy S20');
    await homePage.buyPhones();

  })

  it('Perform checkout', async () => {
    const checkoutPage = new CheckoutPage();
    await checkoutPage.addCheckoutDetails('firstname', 'lastname', 'address', 'state', '12345');
    await checkoutPage.performCheckout();

  })

  it('Validate order confirmed', async () => {
    const confirmationPage = new ConfirmationPage();
    await confirmationPage.validateOrderSuccess('Your Order has been successfully placed.');
    await confirmationPage.continueShopping();
    
    await homePage.goToOrdersPage();
    const ordersPage = new OrdersPage();
    await expect(await ordersPage.waitforAllOrdersToDisplay()).toHaveLength(1);
  })
})