(function() {
  'use strict';

  angular
    .module('yoothub')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
