'use strict';

const angular = require('angular');

const ShortenerForm = require('./shortener-form');

const ShortenerConfig = require('./shortener.config');

const ShortenerComponent = require('./shortener.component');
const ShortenerController = require('./shortener.controller');
const ShortenerService = require('./shortener.service');

const config = angular
  .module('shinks.components.shortener.config', [])
  .constant('ShortenerConfig', ShortenerConfig);

const app = angular
  .module('shinks.components.shortener', [
    config.name,
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
