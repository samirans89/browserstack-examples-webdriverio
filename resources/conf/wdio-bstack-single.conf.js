var defaults = require("./wdio.conf.js");
var _ = require("lodash");

const buildTS = new Date().getTime();

var overrides = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  specs: ["./src/test/suites/e2e/e2e.spec.js"],
  hostname: "hub.browserstack.com",
  commonCapabilities: {
    "bstack:options": {
      projectName: "browserstack-examples-webdriverio",
      buildName:
        process.env.BROWSERSTACK_BUILD_NAME ||
        "browserstack-examples-webdriverio-" + buildTS,
      sessionName: require("minimist")(process.argv.slice(2))[
        "bstack-session-name"
      ],
      debug: true,
      video: true,
      networkLogs: true,
      maskCommands: "setValues, getValues, setCookies, getCookies",
      appiumVersion: "1.21.0",
      local: "false",
    },
  },
  capabilities: [
    {
      "bstack:options": {
        os: "Windows",
        osVersion: "10",
      },
      browserName: "Chrome",
      browserVersion: "latest",
    },
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
      await browser.executeScript(
      'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
        specFileName +
        '" }}',
      []
    );

    if (passed) {
        await browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}',
        []
      );
    } else {
      await browser.takeScreenshot();
      const reason = error
        .toString()
        .replace(/[^a-zA-Z0-9.]/g, " ")
        .substring(0, 255);
      await browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "' +
          reason +
          '"}}',
        []
      );
    }
  },
};

exports.config = _.defaultsDeep(overrides, defaults.config);

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  Object.assign(caps, exports.config.commonCapabilities);
});
