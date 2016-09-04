'use strict';

class ShortenerFormController {
  onFormSubmit() {
    if(this.model.url) {
      this.shorten({ url: this.model.url });
    }
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
