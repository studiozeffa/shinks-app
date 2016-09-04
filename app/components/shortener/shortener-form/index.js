'use strict';

const angular = require('angular');

const ShortenerFormComponent = require('./shortener-form.component');
const ShortenerFormController = require('./shortener-form.controller');

const app = angular
  .module('shinks.components.shortener.form', [])
  .component('shortenerForm', ShortenerFormComponent)
  .controller('ShortenerFormController', ShortenerFormController);

module.exports = app.name;
