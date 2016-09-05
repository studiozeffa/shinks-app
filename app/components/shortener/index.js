'use strict';

const angular = require('angular');

const ShortenerForm = require('./shortener-form');

const ShortenerComponent = require('./shortener.component');
const ShortenerController = require('./shortener.controller');
const ShortenerService = require('./shortener.service');

const app = angular
  .module('shinks.components.shortener', [
    ShortenerForm
  ])
  .component('shortener', ShortenerComponent)
  .controller('ShortenerController', ShortenerController)
  .service('ShortenerService', ShortenerService)
  .config(($provide, $windowProvider) => {
    const $window = $windowProvider.$get();
    $provide.value('ShortenerOriginUrl', $window.location.origin);
  });

module.exports = app.name;
