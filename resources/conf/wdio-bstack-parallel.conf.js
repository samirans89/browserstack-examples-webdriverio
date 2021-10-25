var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  specs: ['./src/test/suites/**/*.js'],
  suites: {
    login: ['./src/test/suites/login/fav*.spec.js'],
    offers: ["./src/test/suites/offers/*.js"],
     e2e: ['./src/test/suites/e2e/*.js'],
  },
  hostname: "hub.browserstack.com",
  maxInstances: 25,
  commonCapabilities: {
    "browserstack.debug": true,
    "browserstack.video": true,
    "browserstack.networkLogs": true,
    acceptInsecureCerts: true,
    "browserstack.maskCommands": "setValues, getValues, setCookies, getCookies",
    name:
        require("minimist")(process.argv.slice(2))["bstack-session-name"] ||
        "default_name",
      build:
        process.env.BROWSERSTACK_BUILD_NAME ||
        "browserstack-examples-webdriverio" + " - " + new Date().getTime(),
  },
  capabilities: [
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "chrome",
      browser_version: "latest",
    },
    {
      device: "Samsung Galaxy S20",
      os_version: "10.0",
      real_mobile: "true",
      browserName: 'Android',
    },
    {
      device: "iPhone 12",
      os_version: "14",
      real_mobile: "true",
      browserName: 'iPhone',
    }
  ],

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
        '" }}',
      []
    );

    if (passed) {
      await (
        await browser
      ).executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}',
        []
      );
    } else {
      await (await browser).takeScreenshot();
      await (
        await browser
      ).executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}',
        []
      );
    }
  },
};

exports.config = _.defaultsDeep(overrides, defaults.config);

exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
