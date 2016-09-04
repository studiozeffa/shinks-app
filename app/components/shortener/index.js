'use strict';

const angular = require('angular');

const ShortenerForm = require('./shortener-form');

const ShortenerComponent = require('./shortener.component');
const ShortenerController = require('./shortener.controller');

const app = angular
  .module('shinks.components.shortener', [
    ShortenerForm
  ])
  .component('shortener', ShortenerComponent)
  .controller('ShortenerController', ShortenerController);

module.exports = app.name;
