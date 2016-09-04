'use strict';

const angular = require('angular');

const Header = require('./header');
const Footer = require('./footer');

const common = angular
  .module('shinks.common', [
    Header,
    Footer
  ]);

module.exports = common.name;
