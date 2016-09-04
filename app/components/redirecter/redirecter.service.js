'use strict';

class RedirecterService {
  constructor($http, config) {
    this.$http = $http;
    this.config = config;
  }

  fetchUrl(id) {
    const options = {
      method: 'GET',
      url: `${this.config.api_url}/links/${id}`,
      headers: {
        'X-Api-Key': this.config.api_key
      }
    };

    return this.$http(options).then(resp => resp.data);
  }
}

RedirecterService.$inject = ['$http', 'RedirecterConfig'];

module.exports = RedirecterService;
