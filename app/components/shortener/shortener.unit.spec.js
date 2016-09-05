'use strict';

const ShortenerController = require('./shortener.controller');
const ShortenerService = require('./shortener.service');
const Q = require('q');

describe('Shortener', function() {
  describe('Controller', function() {
    describe('#constructor', function() {
      it('should set instance variables', function() {
        const ctrl = new ShortenerController('service', 'origin');

        expect(ctrl.service).toBe('service');
        expect(ctrl.originUrl).toBe('origin');
        expect(ctrl.currentShink).toBeNull();
        expect(ctrl.currentShinkDestination).toBeNull();
        expect(ctrl.recentShinks).toEqual([]);
        expect(ctrl.isShorteningUrl).toBe(false);
        expect(ctrl.isFetchingRecentLinks).toBe(false);
        expect(ctrl.shorteningUrlError).toBeNull();
        expect(ctrl.fetchingRecentLinksError).toBeNull();
      });
    });

    describe('#getShortenedUrl', function() {
      it('should get a shortened URL from the passed ID', function() {
        const ctrl = new ShortenerController('service', 'origin');

        const actual = ctrl.getShortenedUrl('id');
        expect(actual).toBe('origin/id');
      });
    });

    describe('#shortenUrl', function() {
      it('should shorten the URL and refresh the recent links when completed', function(done) {
        const mockResponse = {
          id: 'id',
          url: 'url'
        };
        const serviceMock = {
          shortenUrl: jasmine.createSpy().and.returnValue(Q.resolve(mockResponse))
        };

        const ctrl = new ShortenerController(serviceMock);
        spyOn(ctrl, 'getShortenedUrl').and.returnValue('shorturl');
        spyOn(ctrl, 'fetchRecentLinks');

        ctrl.shortenUrl('some_url')
          .then(function() {
            expect(ctrl.currentShink).toEqual('shorturl');
            expect(ctrl.currentShinkDestination).toEqual('url');
            expect(ctrl.service.shortenUrl).toHaveBeenCalledWith('some_url');
            expect(ctrl.getShortenedUrl).toHaveBeenCalledWith('id');
            expect(ctrl.fetchRecentLinks).toHaveBeenCalled();
            expect(ctrl.isShorteningUrl).toBe(false);
            done();
          }, done.fail);
      });

      it('should return an error if the response does not exist', function(done) {
        const serviceMock = {
          shortenUrl: jasmine.createSpy().and.returnValue(Q.resolve(null))
        };

        const ctrl = new ShortenerController(serviceMock);
        spyOn(ctrl, 'getShortenedUrl').and.returnValue('shorturl');
        spyOn(ctrl, 'fetchRecentLinks');

        ctrl.shortenUrl('some_url')
          .then(done.fail, function(err) {
            expect(ctrl.shorteningUrlError).toBe(err);
            expect(ctrl.currentShink).toBeNull();
            expect(ctrl.currentShinkDestination).toBeNull();
            expect(ctrl.getShortenedUrl).not.toHaveBeenCalled();
            expect(ctrl.fetchRecentLinks).not.toHaveBeenCalled();
            expect(ctrl.isShorteningUrl).toBe(false);
            done();
          });
      });

      it('should handle a service error when shortening the URL', function(done) {
        const serviceMock = {
          shortenUrl: jasmine.createSpy().and.returnValue(Q.reject('ERROR'))
        };

        const ctrl = new ShortenerController(serviceMock);
        spyOn(ctrl, 'getShortenedUrl').and.returnValue('shorturl');
        spyOn(ctrl, 'fetchRecentLinks');

        ctrl.shortenUrl('some_url')
          .then(done.fail, function(err) {
            expect(ctrl.shorteningUrlError).toBe(err);
            expect(ctrl.currentShink).toBeNull();
            expect(ctrl.currentShinkDestination).toBeNull();
            expect(ctrl.getShortenedUrl).not.toHaveBeenCalled();
            expect(ctrl.fetchRecentLinks).not.toHaveBeenCalled();
            expect(ctrl.isShorteningUrl).toBe(false);
            done();
          });
      });

      it('should not shorten the URL if it is already shortening', function() {
        const mockResponse = {
          id: 'id'
        };
        const serviceMock = {
          shortenUrl: jasmine.createSpy().and.returnValue(Q.resolve(mockResponse))
        };

        const ctrl = new ShortenerController(serviceMock);
        ctrl.isShorteningUrl = true;

        ctrl.shortenUrl('some_url');
        expect(ctrl.service.shortenUrl).not.toHaveBeenCalled();
      });
    });

    describe('#fetchRecentLinks', function() {
      it('should fetch recent links', function(done) {
        const mockResponse = [{
          id: 'link1'
        }, {
          id: 'link2'
        }];
        const serviceMock = {
          fetchRecentLinks: jasmine.createSpy().and.returnValue(Q.resolve(mockResponse))
        };

        const ctrl = new ShortenerController(serviceMock);
        spyOn(ctrl, 'getShortenedUrl').and.callFake(function(id) {
          return `shorturl_${id}`;
        });

        ctrl.fetchRecentLinks()
          .then(function() {
            expect(ctrl.recentShinks).toEqual([{
              id: 'link1',
              short_url: 'shorturl_link1'
            }, {
              id: 'link2',
              short_url: 'shorturl_link2'
            }]);
            expect(ctrl.service.fetchRecentLinks).toHaveBeenCalled();
            expect(ctrl.getShortenedUrl).toHaveBeenCalledWith('link1');
            expect(ctrl.getShortenedUrl).toHaveBeenCalledWith('link2');
            expect(ctrl.isFetchingRecentLinks).toBe(false);
            done();
          }, done.fail);
      });

      it('should return an error if the response does not exist', function(done) {
        const serviceMock = {
          fetchRecentLinks: jasmine.createSpy().and.returnValue(Q.resolve(null))
        };

        const ctrl = new ShortenerController(serviceMock);
        spyOn(ctrl, 'getShortenedUrl');

        ctrl.fetchRecentLinks()
          .then(done.fail, function(err) {
            expect(ctrl.fetchingRecentLinksError).toBe(err);
            expect(ctrl.recentShinks).toEqual([]);
            expect(ctrl.getShortenedUrl).not.toHaveBeenCalled();
            expect(ctrl.isFetchingRecentLinks).toBe(false);
            done();
          });
      });

      it('should handle a service error when fetching recent links', function(done) {
        const serviceMock = {
          fetchRecentLinks: jasmine.createSpy().and.returnValue(Q.reject('ERROR'))
        };

        const ctrl = new ShortenerController(serviceMock);
        spyOn(ctrl, 'getShortenedUrl');

        ctrl.fetchRecentLinks('some_url')
          .then(done.fail, function(err) {
            expect(ctrl.fetchingRecentLinksError).toBe(err);
            expect(ctrl.recentShinks).toEqual([]);
            expect(ctrl.getShortenedUrl).not.toHaveBeenCalled();
            expect(ctrl.isFetchingRecentLinks).toBe(false);
            done();
          });
      });

      it('should should not fetch recent links if it is already fetching', function() {
        const mockResponse = [{
          id: 'link1'
        }, {
          id: 'link2'
        }];
        const serviceMock = {
          fetchRecentLinks: jasmine.createSpy().and.returnValue(Q.resolve(mockResponse))
        };

        const ctrl = new ShortenerController(serviceMock);
        ctrl.isFetchingRecentLinks = true;

        ctrl.fetchRecentLinks();
        expect(ctrl.service.fetchRecentLinks).not.toHaveBeenCalled();
      });
    });

    describe('#clearCurrentShink', function() {
      it('should clear the current shink', function() {
        const ctrl = new ShortenerController();
        ctrl.currentShink = 'current_shink';
        ctrl.currentShinkDestination = 'current_shink_dest';

        ctrl.clearCurrentShink();
        expect(ctrl.currentShink).toBeNull();
        expect(ctrl.currentShinkDestination).toBeNull();
      });
    });

    describe('$inject', function() {
      it('should declare the dependencies to inject', function() {
        expect(ShortenerController.$inject).toEqual([
          'ShortenerService', 'ShortenerOriginUrl'
        ]);
      });
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
