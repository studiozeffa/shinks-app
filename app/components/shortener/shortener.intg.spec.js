'use strict';

describe('Shortener Integration', function() {
  beforeEach(module('shinks.components.shortener'));

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
});
