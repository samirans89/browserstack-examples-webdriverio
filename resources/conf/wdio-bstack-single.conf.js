var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  specs: [
    './src/test/suites/e2e/e2e.spec.js'
  ],
  hostname: 'hub.browserstack.com',
  capabilities: [{
    maxInstances: 1,
    'browserstack.maskCommands':'setValues, getValues, setCookies, getCookies',
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.networkLogs': true,
    os: "OS X",
    os_version: "Catalina",
    browserName: 'Chrome',
    browser_version: "latest",
    acceptInsecureCerts: true,
    name: (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
    build: process.env.BROWSERSTACK_BUILD_NAME || 'browserstack-examples-webdriverio' + " - " + new Date().getTime()
  }],

  before: async function (capabilities, specs, browser) {
    global.specFilePath = await specs[0];
  },
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    const specFileName = /[^/]*$/.exec(specFilePath)[0];
    await (
      await browser
    ).executeScript(
      'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
        specFileName +
        '" }}', []
    );

    if (passed) {
      await (
        await browser
      ).executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}', []
      );
    } else {
      await (await browser).takeScreenshot();
      await (
        await browser
      ).executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}', []
      );
    }
  },
};

exports.config = _.defaultsDeep(overrides, defaults.config);
