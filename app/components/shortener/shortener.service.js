'use strict';

class ShortenerService {
  constructor($timeout) {
    this.$timeout = $timeout;
  }
  shortenUrl(url) {
    console.log('You asked me to shorten a URL!');
    return this.$timeout(function() {
      console.log('And, now Im returning!');
      return {
        data: {
          id: '1234',
          url: url
        }
      };
    }, 1000);
  }
}

ShortenerService.$inject = ['$timeout'];

module.exports = ShortenerService;
