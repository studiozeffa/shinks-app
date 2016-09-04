'use strict';

const angular = require('angular');

require('./app.scss');

const AppComponent = require('./app.component');
const Common = require('./common');
const Components = require('./components');

const app = angular
  .module('shinks', [
    Common,
    Components
  ])
  .component('app', AppComponent);

module.exports = app.name;
