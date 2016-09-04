'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

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
    ShortenerForm,
    uiRouter.default  // https://github.com/angular-ui/ui-router/issues/2506
  ])
  .component('shortener', ShortenerComponent)
  .controller('ShortenerController', ShortenerController)
  .service('ShortenerService', ShortenerService)
  .config(($provide, $windowProvider, $stateProvider) => {
    const $window = $windowProvider.$get();
    $provide.value('ShortenerOriginUrl', $window.location.origin);

    $stateProvider
      .state('shortener', {
        url: '/',
        component: 'shortener'
      });
  });

module.exports = app.name;
