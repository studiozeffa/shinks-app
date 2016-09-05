'use strict';

const ShortenerService = require('./shortener.service');
const Q = require('q');

describe('Shortener', function() {
  describe('Controller', function() {
    describe('#constructor', function() {
      it('should set instance variables');
    });

    describe('#getShortenedUrl', function() {
      it('should get a shortened URL from the passed ID');
    });

    describe('#shortenUrl', function() {
      it('should shorten the URL and refresh the recent links when completed');
      it('should return an error if the response does not exist');
      it('should handle a service error when shortening the URL');
      it('should not shorten the URL if it is already shortening');
    });

    describe('#fetchRecentLinks', function() {
      it('should fetch recent links');
      it('should return an error if the response does not exist');
      it('should handle a service error when fetching recent links');
      it('should should not fetch recent links if it is already fetching');
    });

    describe('#clearCurrentShink', function() {
      it('should clear the current shink');
    });

    describe('$inject', function() {
      it('should declare the dependencies to inject');
    });
  });

  describe('Service', function() {
    describe('#constructor', function() {
      it('should set instance variables', function() {
        const $http = {};
        const config = {};

        const service = new ShortenerService($http, config);

        expect(service.$http).toBe($http);
        expect(service.config).toBe(config);
      });
    });

    describe('#shortenUrl', function() {
      it('should call API to shorten URL', function(done) {
        const mockResponse = {
          data: 'data'
        };
        const mockHttp = jasmine.createSpy().and.returnValue(Q.resolve(mockResponse));
        const config = {
          api_key: 'api_key',
          api_url: 'api_url'
        };

        const service = new ShortenerService(mockHttp, config);
        service
          .shortenUrl('url')
          .then(function(data) {
            expect(data).toEqual('data');
            expect(mockHttp).toHaveBeenCalledWith({
              method: 'POST',
              url: 'api_url/links',
              headers: {
                'X-Api-Key': 'api_key'
              },
              data: { url: 'url' }
            });
            done();
          });
      });
    });

    describe('#fetchRecentLinks', function() {
      it('should fetch recent links', function(done) {
        const mockResponse = {
          data: 'data'
        };
        const mockHttp = jasmine.createSpy().and.returnValue(Q.resolve(mockResponse));
        const config = {
          api_key: 'api_key',
          api_url: 'api_url'
        };

        const service = new ShortenerService(mockHttp, config);
        service
          .fetchRecentLinks('url')
          .then(function(data) {
            expect(data).toEqual('data');
            expect(mockHttp).toHaveBeenCalledWith({
              method: 'GET',
              url: 'api_url/links',
              headers: {
                'X-Api-Key': 'api_key'
              }
            });
            done();
          });
      });
    });

    describe('$inject', function() {
      it('should declare the dependencies to inject', function() {
        expect(ShortenerService.$inject).toEqual([
          '$http', 'ShortenerConfig'
        ]);
      });
    });
  });
});
