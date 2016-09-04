'use strict';

const angular = require('angular');
const Shortener = require('./shortener');
const Redirecter = require('./redirecter');

const components = angular
  .module('app.components', [
    Shortener,
    Redirecter
  ]);

module.exports = components.name;
