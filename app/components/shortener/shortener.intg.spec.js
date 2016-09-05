'use strict';

describe('Shortener Integration', function() {
  beforeEach(module('shinks.components.shortener.config', function($provide) {
    $provide.constant('ShortenerConfig', {
      api_key: 'api_key',
      api_url: 'api_url'
    });
  }));

  beforeEach(module('shinks.components.shortener', function($provide) {
    $provide.value('ShortenerOriginUrl', 'origin_url');
  }));

  describe('Routes', function() {
    let $state, $location, $rootScope;

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    beforeEach(inject(function($injector) {
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
    }));

    it('should go to the shortener state', function() {
      goTo('/');
      expect($state.current.name).toEqual('shortener');
    });
  });

  describe('Controller', function() {
    let $http, ctrl;

    beforeEach(inject(function($injector) {
      $http = $injector.get('$httpBackend');

      const $componentController = $injector.get('$componentController');
      ctrl = $componentController('shortener');
    }));

    it('should shorten the URL', function() {
      const expectedData = {
        url: 'some_url'
      };

      const expectedHeaders = function(headers) {
        return headers['X-Api-Key'] === 'api_key';
      };

      $http
        .expectPOST('api_url/links', expectedData, expectedHeaders)
        .respond(200, {
          id: '1234',
          url: 'http://some_url'
        });

      $http
        .expectGET('api_url/links', expectedHeaders)
        .respond(200, [{
          id: 'link1'
        }, {
          id: 'link2'
        }]);

      ctrl.shortenUrl('some_url');
      $http.flush();

      expect(ctrl.currentShink).toBe('origin_url/1234');
      expect(ctrl.currentShinkDestination).toBe('http://some_url');
      expect(ctrl.recentShinks).toEqual([{
        id: 'link1',
        short_url: 'origin_url/link1'
      }, {
        id: 'link2',
        short_url: 'origin_url/link2'
      }]);
    });
  });

  describe('Component', function() {
    let $compile, $rootScope, $http;

    beforeEach(inject(function($injector) {
      $compile = $injector.get('$compile');
      $rootScope = $injector.get('$rootScope');
      $http = $injector.get('$httpBackend');
    }));

    it('should show the shortener form elements if the currentShink is not set', function() {
      $http.whenGET('api_url/links').respond([]);

      const element = $compile('<shortener></shortener>')($rootScope);
      $rootScope.$digest();
      expect(element.find('input').length).toBe(1);
      expect(element.find('button').length).toBe(1);
      expect(element.find('button').text()).toBe('Shorten');
      expect(element.find('a').length).toBe(0);
    });

    it('should show the shortener form elements if the currentShink is set', function() {
      $http.whenGET('api_url/links').respond([]);

      const element = $compile('<shortener></shortener>')($rootScope);
      const ctrl = element.controller('shortener');
      ctrl.currentShink = 'some_url';
      ctrl.currentShinkDestination = 'some_destination_url';
      $rootScope.$digest();

      expect(element.find('input').length).toBe(0);
      expect(element.find('button').length).toBe(1);
      expect(element.find('button').text()).toBe('Shorten Another');
      expect(element.find('a').length).toBe(3);
    });
  });
});
