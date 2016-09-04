'use strict';

class RedirecterController {
  constructor(service) {
    this.service = service;
  }
}

RedirecterController.$inject = ['RedirecterService'];

module.exports = RedirecterController;
