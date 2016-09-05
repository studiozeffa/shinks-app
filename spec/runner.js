'use strict';

var Jasmine = require('jasmine');
var SpecReporter = require('jasmine-spec-reporter');

var options = {
  displayStacktrace: 'all'
};

var jasmine = new Jasmine();
jasmine.loadConfigFile(`${__dirname}/jasmine.json`);
jasmine.addReporter(new SpecReporter(options));
jasmine.execute();
