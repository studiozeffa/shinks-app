'use strict';

class ShortenerController {
  constructor(service, originUrl) {
    this.service = service;
    this.originUrl = originUrl;

    this.currentShink = null;
    this.currentShinkDestination = null;
    this.recentShinks = [];

    this.isShorteningUrl = false;
    this.isFetchingRecentLinks = false;
    this.shorteningUrlError = null;
    this.fetchingRecentLinksError = null;
  }

  getShortenedUrl(id) {
    return `${this.originUrl}/${id}`;
  }

  shortenUrl(url) {
    if(!this.isShorteningUrl) {
      this.isShorteningUrl = true;
      this.shorteningUrlError = null;

      return this.service
        .shortenUrl(url)
        .then(resp => {
          if(!resp || !resp.id) {
            throw new Error('Could not shorten link, please try again.');
          }
          this.currentShink = this.getShortenedUrl(resp.id);
          this.currentShinkDestination = resp.url;
          this.fetchRecentLinks();
        })
        .catch(err => {
          this.shorteningUrlError = err;
          throw err;
        })
        .finally(() => {
          this.isShorteningUrl = false;
        });
    }
  }

  fetchRecentLinks() {
    if(!this.isFetchingRecentLinks) {
      this.isFetchingRecentLinks = true;
      this.fetchingRecentLinksError = null;

      return this.service
        .fetchRecentLinks()
        .then(links => {
          if(!links) {
            throw new Error('Could not shorten link, please try again.');
          }
          this.recentShinks = links.map(l => {
            l.short_url = this.getShortenedUrl(l.id);
            return l;
          });
        })
        .catch(err => {
          this.fetchingRecentLinksError = err;
          throw err;
        })
        .finally(() => {
          this.isFetchingRecentLinks = false;
        });
    }
  }

  clearCurrentShink() {
    this.currentShink = null;
    this.currentShinkDestination = null;
  }
}

ShortenerController.$inject = ['ShortenerService', 'ShortenerOriginUrl'];

module.exports = ShortenerController;
