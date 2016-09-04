'use strict';

class ShortenerController {
  constructor(service, originUrl) {
    this.service = service;
    this.originUrl = originUrl;
  }

  getShortenedUrl(id) {
    return `${this.originUrl}/${id}`;
  }

  shortenUrl(url) {
    console.log('You asked to shorten ' + url);
    this.isShorteningUrl = true;
    this.shorteningUrlError = null;

    this.service.shortenUrl(url)
      .then(resp => {
        this.currentShink = this.getShortenedUrl(resp.data.id);
        this.currentShinkDestination = resp.data.url;
      })
      .catch(err => {
        this.shorteningUrlError = err;
      })
      .finally(() => {
        this.isShorteningUrl = false;
      });
  }

  clearCurrentShink() {
    this.currentShink = null;
    this.currentShinkDestination = null;
  }
}

ShortenerController.$inject = ['ShortenerService', 'ShortenerOriginUrl'];

module.exports = ShortenerController;
