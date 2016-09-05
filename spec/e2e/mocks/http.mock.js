/* global document, angular */

'use strict';

/**
 * This exported script is run by protractor inside
 * the running instance of the app, which is why
 * we can access document and angular.
 *
 * We use it to inject the angular-mocks script, and
 * create a mock backend for the API to use.
 */
module.exports = function() {
  var addScript = function(url) {
    var script = document.createElement('script');
    script.src = url;
    script.async = false;
    document.head.appendChild(script);
  };

  addScript('node_modules/angular-mocks/angular-mocks.js');

  angular
    .module('httpMocker', ['ngMockE2E'])
    .run(function($httpBackend) {
      $httpBackend
        .whenGET('https://api.shinks.com/v1/links')
        .respond([{
          id: '1234',
          created_at: new Date(),
          url: 'http://somelongurl.com'
        }]);

      $httpBackend
        .whenPOST('https://api.shinks.com/v1/links')
        .respond(function(method, url, data) {
          // For some reason we are passed the stringified
          // form of the data, so we must parse it here
          // to get the original url
          data = JSON.parse(data);
          return [200, {
            id: '1234',
            url: data.url
          }];
        });
    });
};
