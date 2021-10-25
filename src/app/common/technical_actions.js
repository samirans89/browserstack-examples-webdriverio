class TechnicalActions {

    static async performClick(pageObjectSelector, matchAll = false, waitTimeout = 5000) {
        await (await this.getPageObject(pageObjectSelector)).waitForClickable({ timeout: waitTimeout });
        await  (await this.getPageObject(pageObjectSelector)).click();
    }

    static async setText(pageObjectSelector, data) {
        await (await this.getPageObject(pageObjectSelector)).setValue(data);
    }

    static async getPageObject(pageObjectSelector, matchAll = false, waitTimeout = 5000) {
        if(!matchAll) {
            await (await $(pageObjectSelector)).waitForDisplayed({ timeout: waitTimeout });
            return await $(pageObjectSelector)
        } else {
            await (await $(pageObjectSelector)).waitForDisplayed({ timeout: waitTimeout });
            return await $$(pageObjectSelector)
        }
    }

    static async getPageURL(browser, waitTimeout = 5000) {
        await browser.waitUntil(async () => {
            return await browser.getUrl();
        }, waitTimeout)
    }

    static async setBrowserLocation(browser, lat, long) {
        await browser.execute(async function() {
            window.navigator.geolocation.getCurrentPosition = function(success) {
              const position = { coords : { latitude: lat, longitude: long } }; 
              success(position);
            }
          });
    }
}

module.exports = TechnicalActions;

