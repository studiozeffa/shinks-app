'use strict';

const ShortenerPage = require('./page-objects/shortener.po.js');

describe('Shortener Page', function() {
  const shortenerPage = new ShortenerPage();

  beforeEach(function() {
    // Ensure we load the page before each test
    // This ensures we have a fresh slate
    browser.get('/');
  });

  it('should shorten a link', function() {
    shortenerPage.submitUrl('http://protractortest.org');

    expect(shortenerPage.form.isPresent()).toBeFalsy();
    expect(shortenerPage.results.isPresent()).toBeTruthy();
  });
});
