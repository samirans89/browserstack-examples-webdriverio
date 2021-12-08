var fs = require("fs");
const mergeResults = require("wdio-mochawesome-reporter/mergeResults");
const accounts = require("../data/user.json");

exports.config = {
  accounts: accounts,
  runner: "local",
  specs: [""],
  capabilities: [
    {
      browserName: "chrome",
      acceptInsecureCerts: true,
    },
  ],
  specFileRetries: 1,
  specFileRetriesDelay: 0,
  specFileRetriesDeferred: false,
  logLevel: "warn",
  coloredLogs: true,
  bail: 0,
  baseUrl: "https://bstackdemo.com/",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  chromeOptions: {
    prefs: {
      "profile.default_content_setting_values.geolocation": 1,
    },
  },
  framework: "mocha",
  reporters: [
    [
      "junit",
      {
        outputDir: "junit-results",
        outputFileFormat: function (options) {
          return `results-${options.cid}.xml`;
        },
        errorOptions: {
          error: "message",
          failure: "message",
          stacktrace: "stack",
        },
      },
    ],
    [
      "mochawesome",
      {
        outputDir: "./mochawesome-report",
        outputFileFormat: function (opts) {
          return `results-${opts.cid}.json`;
        },
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  beforeSession: async function (config, capabilities) {},
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (error) {
      await browser.takeScreenshot();
    }
  },
  onComplete: async function () {
    mergeResults("./mochawesome-report", "results-*");
  },
};
