'use strict';

const RedirecterViewComponent = {
  template: require('./redirecter-view.html'),
  bindings: {
    url: '<',
    isPreview: '<'
  }
};

module.exports = RedirecterViewComponent;
