'use strict';

const angular = require('angular');

const ShortenerFormComponent = require('./shortener-form.component');

const app = angular
  .module('shinks.components.shortener.form', [])
  .component('shortenerForm', ShortenerFormComponent);

module.exports = app.name;
