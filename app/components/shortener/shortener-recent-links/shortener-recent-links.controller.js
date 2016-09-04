'use strict';

class ShortenerRecentLinksController {
  $onInit() {
    this.fetchLinks();
  }

  $onChanges(changes) {
    if(changes.fetchingRecentLinksError) {
      this.hasError = !!changes.fetchingRecentLinksError.currentValue;
    }
  }
}

module.exports = ShortenerRecentLinksController;
