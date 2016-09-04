'use strict';

const angular = require('angular');

const RedirecterViewComponent = require('./redirecter-view.component');

const redirecterView = angular
  .module('app.components.redirecter.view', [])
  .component('redirecterView', RedirecterViewComponent);

module.exports = redirecterView.name;
