'use strict';

const ShortenerFormComponent = {
  template: require('./shortener-form.html'),
  controller: 'ShortenerFormController',
  bindings: {
    shortenedUrl: '<',
    destinationUrl: '<',
    isShorteningUrl: '<',
    shorteningUrlError: '<',
    shorten: '&',
    reset: '&'
  }
};

module.exports = ShortenerFormComponent;
