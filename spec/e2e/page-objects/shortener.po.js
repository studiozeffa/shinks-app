'use strict';

class ShortenerPage {
  constructor() {
    this.form = $('form[name="urlForm"]');
    this.urlInput = this.form.element(by.model('$ctrl.model.url'));

    this.results = $('#shortenerResults');
  }

  submitUrl(url) {
    this.urlInput.clear().sendKeys(url);
    this.form.submit();
  }
}

module.exports = ShortenerPage;
