'use strict';

const ShortenerFormComponent = {
  template: require('./shortener-form.html'),
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
