'use strict';

const angular = require('angular');

const ShortenerForm = require('./shortener-form');

const ShortenerComponent = require('./shortener.component');


const app = angular
  .module('shinks.components.shortener', [
    ShortenerForm
  ])
  .component('shortener', ShortenerComponent);

module.exports = app.name;
