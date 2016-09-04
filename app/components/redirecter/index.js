'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

const RedirecterComponent = require('./redirecter.component.js');
const RedirecterConfig = require('./redirecter.config.js');
const RedirecterController = require('./redirecter.controller.js');
const RedirecterService = require('./redirecter.service.js');

const RedirecterView = require('./redirecter-view');

const config = angular
  .module('app.components.redirecter.config', [])
  .constant('RedirecterConfig', RedirecterConfig)
  .name;

const redirecter = angular
  .module('app.components.redirecter', [
    config,
    RedirecterView,
    uiRouter.default  // https://github.com/angular-ui/ui-router/issues/2506
  ])
  .component('redirecter', RedirecterComponent)
  .controller('RedirecterController', RedirecterController)
  .service('RedirecterService', RedirecterService)
  .config($stateProvider => {
    $stateProvider
      .state('redirecter', {
        url: '/:id?preview',
        component: 'redirecter'
      });
  });

module.exports = redirecter.name;
