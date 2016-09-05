'use strict';

describe('Shortener Page', function() {
  it('should shorten a link', function() {
    browser.get('/');

    const form = element(by.css('form[name="urlForm"]'));
    const urlInput = form.element(by.model('$ctrl.model.url'));

    const results = element(by.css('#shortenerResults'));

    urlInput.clear().sendKeys('http://protractortest.org');
    form.submit();

    expect(form.isPresent()).toBeFalsy();
    expect(results.isPresent()).toBeTruthy();
  });
});
