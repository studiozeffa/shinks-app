'use strict';

const angular = require('angular');

const AppComponent = require('./app.component');
const Common = require('./common');


require('./app.scss');

const app = angular
  .module('shinks', [
    Common
  ])
  .component('app', AppComponent);

module.exports = app.name;
