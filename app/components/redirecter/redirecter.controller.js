'use strict';

class RedirecterController {
  constructor(service, $stateParams, $window) {
    this.service = service;
    this.$stateParams = $stateParams;
    this.$window = $window;
  }

  $onInit() {
    this.linkId = this.$stateParams.id;
    this.service
      .fetchUrl(this.linkId)
      .then(resp => {
        if(!resp || !resp.url) {
          throw new Error('No URL with the passed link ID was found');
        }

        this.url = resp.url;
        this.$window.location.replace(resp.url);
      });
  }
}

RedirecterController.$inject = ['RedirecterService', '$stateParams', '$window'];

module.exports = RedirecterController;
