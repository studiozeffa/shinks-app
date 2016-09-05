'use strict';

const ShortenerPage = require('./page-objects/shortener.po.js');

describe('Shortener Page', function() {
  const shortenerPage = new ShortenerPage();
  let originUrl;

  beforeEach(function(done) {
    // Ensure we load the page before each test
    // This ensures we have a fresh slate
    browser.get('/');
    browser.getCurrentUrl().then(url => {
      originUrl = url;
      done();
    });
  });

  it('should shorten a link', function() {
    shortenerPage.submitUrl('http://protractortest.org');

    expect(shortenerPage.form.isPresent()).toBeFalsy();
    expect(shortenerPage.results.isPresent()).toBeTruthy();

    expect(shortenerPage.shortenedUrlAnchor.getText()).toMatch(new RegExp(`^${originUrl}[a-zA-Z0-9]+$`));
    expect(shortenerPage.shortenedUrlPreviewAnchor.getText()).toMatch(new RegExp(`^${originUrl}[a-zA-Z0-9]+\\?preview$`));
    expect(shortenerPage.destinationUrlAnchor.getText()).toEqual('http://protractortest.org');
  });

  it('should add http:// to the user input when shortening a link if none exists', function() {
    shortenerPage.submitUrl('protractortest.org');

    expect(shortenerPage.form.isPresent()).toBeFalsy();
    expect(shortenerPage.results.isPresent()).toBeTruthy();

    expect(shortenerPage.shortenedUrlAnchor.getText()).toMatch(new RegExp(`^${originUrl}[a-zA-Z0-9]+$`));
    expect(shortenerPage.shortenedUrlPreviewAnchor.getText()).toMatch(new RegExp(`^${originUrl}[a-zA-Z0-9]+\\?preview$`));
    expect(shortenerPage.destinationUrlAnchor.getText()).toEqual('http://protractortest.org');
  });

  it('should not submit a shorten request if nothing was filled in to the url box', function() {
    shortenerPage.submitUrl('');

    expect(shortenerPage.form.isPresent()).toBeTruthy();
    expect(shortenerPage.results.isPresent()).toBeFalsy();
  });

  it('should return to the link shortener when the user selects the Shorten Another button', function() {
    shortenerPage.submitUrl('protractortest.org');
    expect(shortenerPage.form.isPresent()).toBeFalsy();
    expect(shortenerPage.results.isPresent()).toBeTruthy();

    shortenerPage.returnToForm();
    expect(shortenerPage.form.isPresent()).toBeTruthy();
    expect(shortenerPage.results.isPresent()).toBeFalsy();
  });
});
