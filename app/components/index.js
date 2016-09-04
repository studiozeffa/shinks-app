'use strict';

const angular = require('angular');

const Shortener = require('./shortener');

const components = angular
  .module('shinks.components', [
    Shortener
  ]);

module.exports = components.name;
