// Protractor configuration
// https://github.com/angular/protractor/blob/master/referenceConf.js

'use strict';

const SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:8080',


  // The timeout in milliseconds for each script run on the browser. This should
  // be longer than the maximum time your application needs to stabilize between
  // tasks.
  allScriptsTimeout: 30000,

  // list of files / patterns to load in the browser
  specs: [
    'spec/e2e/**/*.e2e.spec.js'
  ],

  // Patterns to exclude.
  exclude: [],

  // ----- The test framework -----
  //
  // Jasmine and Cucumber are fully supported as a test and assertion framework.
  // Mocha has limited beta support. You will need to include your own
  // assertion framework if working with mocha.
  framework: 'jasmine',

  // Remove the other reporter
  jasmineNodeOpts: {
    print: function() {}
  },

  // Boolean. If true, Protractor will connect directly to the browser Drivers
  // at the locations specified by chromeDriver and firefoxPath. Only Chrome
  // and Firefox are supported for direct connect.
  directConnect: false,

  // ----- Capabilities to be passed to the webdriver instance ----
  //
  // For a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  capabilities: {
    'browserName': 'chrome'
  },

  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
