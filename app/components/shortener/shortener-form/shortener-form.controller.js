'use strict';

class ShortenerFormController {
  onFormSubmit() {
    if(this.model.url) {
      this.shorten({ url: this.model.url });
    }
  }
}

module.exports = ShortenerFormController;
