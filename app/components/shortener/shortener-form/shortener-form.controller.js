'use strict';

class ShortenerFormController {
  onFormSubmit() {
    if(this.model.url) {
      this.shorten({ url: this.model.url });
    }
  }

  showForm() {
    this.model.url = null;
    this.reset();
  }
}

module.exports = ShortenerFormController;
