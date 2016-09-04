'use strict';

const angular = require('angular');

const HeaderComponent = require('./header.component');

const header = angular
  .module('shinks.common.header', [])
  .component('header', HeaderComponent);

module.exports = header.name;
