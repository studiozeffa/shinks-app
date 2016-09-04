'use strict';

const angular = require('angular');

const FooterComponent = require('./footer.component');

require('./footer.scss');

const footer = angular
  .module('shinks.common.footer', [])
  .component('footer', FooterComponent);

module.exports = footer.name;
