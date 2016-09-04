'use strict';

class ShortenerService {
  constructor($http, config) {
    this.$http = $http;
    this.config = config;
  }

  shortenUrl(url) {
    return this._request({
      method: 'POST',
      data: { url }
    });
  }

  /** private methods **/

  _request(options) {
    options.url = `${this.config.api_url}/links`;
    options.headers = {
      'X-Api-Key': this.config.api_key
    };

    return this.$http(options).then(resp => resp.data);
  }
}

ShortenerService.$inject = ['$http', 'ShortenerConfig'];

module.exports = ShortenerService;
