'use strict';

class ShortenerController {
  constructor() {
    // this.currentShink = 'some_shink';
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

module.exports = ShortenerController;
