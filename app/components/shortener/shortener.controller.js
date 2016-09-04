'use strict';

class ShortenerController {
  constructor(service) {
    this.service = service;
    this.service.sayHello();
  }

  shortenUrl(url) {
    console.log('You asked to shorten ' + url);
    this.currentShink = 'shortened_url';
    this.currentShinkDestination = url;
  }

  clearCurrentShink() {
    this.currentShink = null;
    this.currentShinkDestination = null;
  }
}

ShortenerController.$inject = ['ShortenerService'];

module.exports = ShortenerController;
