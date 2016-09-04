'use strict';

const ShortenerRecentLinksComponent = {
  template: require('./shortener-recent-links.html'),
  controller: 'ShortenerRecentLinksController',
  bindings: {
    links: '<',
    isFetching: '<',
    fetchingError: '<',
    fetchLinks: '&'
  }
};

module.exports = ShortenerRecentLinksComponent;
