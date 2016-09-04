'use strict';

const angular = require('angular');
require('moment');
require('angular-moment');

const ShortenerRecentLinksComponent = require('./shortener-recent-links.component.js');
const ShortenerRecentLinksController = require('./shortener-recent-links.controller.js');

require('./shortener-recent-links.scss');

const shortenerRecentLinks = angular
  .module('app.components.shortener.recentLinks', [
    'angularMoment'
  ])
  .component('shortenerRecentLinks', ShortenerRecentLinksComponent)
  .controller('ShortenerRecentLinksController', ShortenerRecentLinksController);

module.exports = shortenerRecentLinks.name;
