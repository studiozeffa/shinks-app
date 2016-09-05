'use strict';

class ShortenerPage {
  constructor() {
    this.form = $('form[name="urlForm"]');
    this.urlInput = this.form.element(by.model('$ctrl.model.url'));

    this.results = $('#shortenerResults');
    this.resultsAnchors = this.results.$$('a');
    this.shortenedUrlAnchor = this.resultsAnchors.get(0);
    this.shortenedUrlPreviewAnchor = this.resultsAnchors.get(1);
    this.destinationUrlAnchor = this.resultsAnchors.get(2);
    this.shortenAnotherButton = this.results.$('button');
  }

  submitUrl(url) {
    this.urlInput.clear().sendKeys(url);
    this.form.submit();
  }

  returnToForm() {
    this.shortenAnotherButton.click();
  }
}

module.exports = ShortenerPage;
