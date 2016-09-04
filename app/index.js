'use strict';

const angular = require('angular');

require('./app.scss');

const AppComponent = require('./app.component');
const Common = require('./common');

const app = angular
  .module('shinks', [
    Common
  ])
  .component('app', AppComponent);

module.exports = app.name;
