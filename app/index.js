'use strict';

const angular = require('angular');

const AppComponent = require('./app.component');

const app = angular
  .module('shinks', [])
  .component('app', AppComponent);

module.exports = app.name;
