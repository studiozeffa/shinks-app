'use strict';

// Vendor
const angular = require('angular');

// Styles
require('./app.scss');

// Config
const config = require('config');

// App
const AppComponent = require('./app.component');
const Common = require('./common');
const Components = require('./components');

const app = angular
  .module('shinks', [
    Common,
    Components
  ])
  .component('app', AppComponent)
  .config(($urlRouterProvider, $locationProvider, ShortenerConfig) => {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    Object.assign(ShortenerConfig, config);
  });

module.exports = app.name;
