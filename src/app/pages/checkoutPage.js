const Page = require("./basePage");
const Actions = require("../common/technical_actions");

class CheckoutPage extends Page {

  constructor() {
    super();
    this.txtFirstName = "#firstNameInput";
    this.txtlastName = "#lastNameInput";
    this.txtAddressLine1 = "#addressLine1Input";
    this.txtProvince = "#provinceInput";
    this.txtPostCode = "#postCodeInput";
    this.btnCheckout = "#checkout-shipping-continue";
  }
  
  async addCheckoutDetails(firstName, lastName, addressLine1, province, postCode) {
    await Actions.setText(this.txtFirstName, firstName);
    await Actions.setText(this.txtlastName, lastName);
    await Actions.setText(this.txtAddressLine1, addressLine1);
    await Actions.setText(this.txtProvince, province);
    await Actions.setText(this.txtPostCode, postCode);
  }

  async performCheckout() {
    await Actions.performClick(this.btnCheckout);
  }
}

module.exports = CheckoutPage;
