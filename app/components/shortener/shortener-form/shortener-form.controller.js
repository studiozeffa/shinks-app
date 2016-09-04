'use strict';

class ShortenerFormController {
  onFormSubmit() {
    if(this.model.url) {
      this.shorten({
        url: this.ensurePrefix(this.model.url)
      });
    }
  }

  ensurePrefix(url) {
    if(!(/^(?:http|https):\/\/.*/i).test(url)) {
      url = `http://${url}`;
    }
    return url;
  }

  $onChanges(changes) {
    if(changes.shorteningUrlError) {
      this.hasError = !!changes.shorteningUrlError.currentValue;
    }
  }

  showForm() {
    this.model.url = null;
    this.reset();
  }
}

module.exports = ShortenerFormController;
